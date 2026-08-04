/**
 * Capture a page's DOM *after* JavaScript has run.
 *
 * `curl` is enough for every Laravel page and for /creative-logo-design, because
 * those ship their content in the HTML. It is useless for /logo-design-offer:
 * that page is a Create React App bundle whose served body is
 * `<div id="root"></div>` and nothing else, so `curl` captures 3KB of shell and
 * none of the copy. The only way to read what it says is to run it.
 *
 * Drives headless Chrome over CDP — no puppeteer, no new dependency, the same
 * approach as `audit-responsive.mjs`.
 *
 * Usage: node scripts/capture-rendered.mjs <url> <outFile> [settleMs]
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const [, , url, outFile, settleArg] = process.argv;
if (!url || !outFile) {
    console.error("usage: node scripts/capture-rendered.mjs <url> <outFile> [settleMs]");
    process.exit(2);
}
/* Long enough for the bundle to fetch, hydrate and paint. The page has no
   loading state, so there is nothing to poll for — a settle wait is the honest
   mechanism, and it is checked below by asserting the body is not empty. */
const SETTLE = Number(settleArg ?? 9000);

const port = 9222 + (process.pid % 500);
const profile = mkdtempSync(join(tmpdir(), "cdp-"));

const chrome = spawn(CHROME, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function endpoint() {
    for (let i = 0; i < 100; i++) {
        try {
            const j = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
            if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl;
        } catch {}
        await sleep(150);
    }
    throw new Error("Chrome did not expose a debugging endpoint");
}

class CDP {
    constructor(ws) {
        this.ws = ws;
        this.id = 0;
        this.pending = new Map();
        ws.addEventListener("message", (e) => {
            const m = JSON.parse(e.data);
            if (m.id && this.pending.has(m.id)) {
                const { resolve, reject } = this.pending.get(m.id);
                this.pending.delete(m.id);
                if (m.error) reject(new Error(JSON.stringify(m.error)));
                else resolve(m.result);
            }
        });
    }
    send(method, params = {}, sessionId) {
        const id = ++this.id;
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.ws.send(JSON.stringify({ id, method, params, sessionId }));
        });
    }
}

let code = 0;
try {
    const ws = new WebSocket(await endpoint());
    await new Promise((r) => ws.addEventListener("open", r));
    const cdp = new CDP(ws);

    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);
    await cdp.send(
        "Emulation.setDeviceMetricsOverride",
        { width: 1440, height: 2000, deviceScaleFactor: 1, mobile: false },
        sessionId,
    );
    await cdp.send("Page.navigate", { url }, sessionId);
    await sleep(SETTLE);

    const read = async (expr) =>
        (await cdp.send("Runtime.evaluate", { expression: expr, returnByValue: true }, sessionId))
            .result.value;

    const html = await read("document.documentElement.outerHTML");
    const textLength = await read("document.body.innerText.trim().length");

    /* A capture of an un-hydrated shell looks like a successful run and would
       quietly turn every parity check into a no-op. */
    if (textLength < 500) {
        throw new Error(`page rendered only ${textLength} chars of text — did it finish loading?`);
    }

    writeFileSync(outFile, html);
    console.log(`captured ${html.length} bytes (${textLength} chars of text) -> ${outFile}`);
    ws.close();
} catch (error) {
    console.error(String(error?.message ?? error));
    code = 1;
} finally {
    chrome.kill();
    /* Chrome unmaps its crashpad file a moment after the kill, so on Windows
       this races and throws EBUSY. The capture is already written by then —
       failing the run over a temp directory would be a lie about the result. */
    try {
        rmSync(profile, { recursive: true, force: true });
    } catch {}
}

process.exit(code);
