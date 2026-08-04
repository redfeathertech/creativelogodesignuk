/**
 * Measure real layout over CDP instead of eyeballing a screenshot.
 *
 * Drives headless Chrome directly — no puppeteer, no new dependency. For every
 * URL x viewport width it reports horizontal overflow on the document and names
 * the specific elements sticking out, which is the only way to tell a genuinely
 * broken page from one that merely looks tight.
 *
 * Usage: node audit.mjs <baseUrl> <path> [path...]
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const WIDTHS = [320, 360, 390, 414, 480, 600, 768, 834, 1024, 1280, 1440, 1920];

const [, , base, ...paths] = process.argv;
if (!base || !paths.length) {
    console.error("usage: node audit.mjs <baseUrl> <path> [path...]");
    process.exit(2);
}

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
            const r = await fetch(`http://127.0.0.1:${port}/json/version`);
            const j = await r.json();
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
        this.sessions = new Map();
        ws.addEventListener("message", (e) => {
            const m = JSON.parse(e.data);
            if (m.id && this.pending.has(m.id)) {
                const { resolve, reject } = this.pending.get(m.id);
                this.pending.delete(m.id);
                if (m.error) reject(new Error(JSON.stringify(m.error)));
                else resolve(m.result);
            }
            if (m.method === "Page.loadEventFired") {
                const w = this.sessions.get(m.sessionId);
                if (w) w();
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

/**
 * Runs inside the page. Anything wider than the viewport is a real defect.
 *
 * Skips the closed off-canvas drawer and lead panel: both are legitimately
 * parked outside the viewport and both sit under `aria-hidden="true"`, so they
 * would otherwise report ~100 phantom overflows on every mobile width.
 */
/**
 * Two different questions, deliberately answered separately.
 *
 * `overflow` is the document's own horizontal scroll — the thing that ruins a
 * page on a phone.
 *
 * `count` is elements sticking out past the viewport, which is what tells you
 * *which* element is at fault. But a scroll-snap rail's slides and a marquee's
 * track are supposed to stick out — that is what a carousel is — so an element
 * whose box escapes the viewport while an ancestor clips or scrolls it is
 * counted as `contained` instead. Without that split every page with a carousel
 * reports 12/12 failures, including the homepage, and the signal is worthless.
 */
const PROBE = `(() => {
  const de = document.documentElement;
  /* documentElement.clientWidth, NOT window.innerWidth.

     Under Emulation.setDeviceMetricsOverride with mobile:true, Chrome expands
     the *layout viewport* to fit content that overflows it. So on exactly the
     pages this script exists to catch, window.innerWidth grows to match the
     overflowing content and scrollWidth - innerWidth is always 0 — the check
     silently passed every mobile width on a page overflowing by 147px.
     clientWidth stays pinned to the emulated width, so the comparison stays
     meaningful.

     Found 3 Aug 2026 on /seo-services, whose hero grid measured 447px at a
     320px viewport and still audited "12 widths clean". */
  const vw = de.clientWidth;
  const SCROLLS = new Set(["auto", "scroll", "hidden", "clip"]);

  /* True when some ancestor both (a) clips or scrolls horizontally and (b) sits
     inside the viewport itself — so whatever escapes stops at its edge. */
  const isContained = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (!SCROLLS.has(getComputedStyle(p).overflowX)) continue;
      const pr = p.getBoundingClientRect();
      if (pr.right <= vw + 1 && pr.left >= -1) return true;
    }
    return false;
  };

  const over = [];
  let contained = 0;
  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || s.position === "fixed") continue;
    if (el.closest('[aria-hidden="true"], [hidden], [inert]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      if (isContained(el)) { contained++; continue; }
      const id = el.tagName.toLowerCase()
        + (el.id ? "#" + el.id : "")
        + (typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\\s+/).slice(0, 3).join(".")
            : "");
      over.push({ el: id, left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) });
    }
  }
  const seen = new Set();
  const uniq = over.filter(o => !seen.has(o.el) && seen.add(o.el)).slice(0, 8);
  return JSON.stringify({
    vw,
    scrollW: de.scrollWidth,
    overflow: de.scrollWidth - vw,
    count: over.length,
    contained,
    worst: uniq,
    h1: document.querySelectorAll("h1").length,
    imgsNoDim: [...document.images].filter(i => !i.getAttribute("width") || !i.getAttribute("height")).length,
  });
})()`;

const wsUrl = await endpoint();
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
const cdp = new CDP(ws);

const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
await cdp.send("Page.enable", {}, sessionId);

let fails = 0;
const rows = [];

for (const path of paths) {
    const url = base.replace(/\/$/, "") + path;
    for (const width of WIDTHS) {
        await cdp.send("Emulation.setDeviceMetricsOverride",
            { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 }, sessionId);

        const loaded = new Promise((r) => cdp.sessions.set(sessionId, r));
        await cdp.send("Page.navigate", { url }, sessionId);
        await Promise.race([loaded, sleep(15000)]);
        await sleep(250);

        const { result } = await cdp.send("Runtime.evaluate",
            { expression: PROBE, returnByValue: true }, sessionId);
        const r = JSON.parse(result.value);

        const bad = r.overflow > 0 || r.count > 0 || r.h1 !== 1;
        if (bad) fails++;
        rows.push({ path, width, ...r, bad });
    }
}

ws.close();
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch {}

const byPath = new Map();
for (const r of rows) {
    if (!byPath.has(r.path)) byPath.set(r.path, []);
    byPath.get(r.path).push(r);
}

for (const [path, rs] of byPath) {
    const bad = rs.filter((r) => r.bad);
    const h1s = [...new Set(rs.map((r) => r.h1))];
    const noDim = Math.max(...rs.map((r) => r.imgsNoDim));
    const held = Math.max(...rs.map((r) => r.contained));
    if (!bad.length) {
        console.log(
            `OK   ${path}  ${rs.length} widths clean  h1=${h1s.join("/")}` +
            `  imgsMissingDim=${noDim}  containedInRails=${held}`);
    } else {
        console.log(`FAIL ${path}  ${bad.length}/${rs.length} widths  h1=${h1s.join("/")}`);
        for (const r of bad.slice(0, 4)) {
            console.log(`      ${r.vw}px overflow=${r.overflow} elems=${r.count} contained=${r.contained} h1=${r.h1}`);
            for (const w of r.worst) console.log(`         ${w.el}  left=${w.left} right=${w.right} w=${w.w}`);
        }
    }
}
console.log(`\n${rows.length} measurements, ${fails} failing`);
process.exit(fails ? 1 : 0);
