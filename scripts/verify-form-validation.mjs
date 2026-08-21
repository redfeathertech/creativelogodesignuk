/**
 * The gate on browser-side form validation.
 *
 * Every form on the site shares one hook (`useFormEngagement`) reading one rule
 * set (`lib/form-rules.ts`), so the thing worth checking is not the rules — the
 * Zod schemas already hold those — but the *behaviour* the visitor meets, which
 * exists only once JavaScript has run and cannot be seen in the source:
 *
 *   • the platform's own error bubbles are off (`noValidate`), so every message
 *     on the site is one of ours, in one voice, in one place
 *   • a submission that would fail never leaves the browser
 *   • nothing is said while a field is being typed for the first time
 *   • a message appears when the field is left, and clears on the keystroke
 *     that fixes it, not on the next blur
 *   • the two controls the platform cannot see into — the custom dropdown and a
 *     checkbox group — are caught in the browser like everything else, and a
 *     failed dropdown sends focus to its trigger, which can actually take it
 *   • a phone number is accepted in every shape one is written in, and is
 *     tidied rather than rejected — the whole point of the 2026-08 relaxation
 *   • a field that is answered and right says so, and a rejected submit costs
 *     the visitor nothing: no value cleared, no button disabled, focus on the
 *     first thing to fix
 *
 * Drives headless Chrome over CDP — no puppeteer, no new dependency, the same
 * approach as `capture-rendered.mjs` and `audit-responsive.mjs`.
 *
 * Usage:
 *   npm run build && npx next start -p 3100
 *   node scripts/verify-form-validation.mjs http://127.0.0.1:3100
 *
 * It has to run against a *served* build. The forms are client components; a
 * fetched page carries the markup but none of this behaviour.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const base = process.argv[2] ?? "http://127.0.0.1:3100";

/* Long enough for the route's JS to fetch and hydrate. There is no loading
   state to poll for, and every assertion below asserts against a hydrated
   page — a form that never hydrated fails them rather than skipping them. */
const HYDRATE = 3500;

const port = 9222 + (process.pid % 500);
const profile = mkdtempSync(join(tmpdir(), "cdp-forms-"));
const chrome = spawn(
    CHROME,
    [
        "--headless=new",
        `--remote-debugging-port=${port}`,
        `--user-data-dir=${profile}`,
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
    ],
    { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function endpoint() {
    for (let i = 0; i < 100; i++) {
        try {
            const j = await (
                await fetch(`http://127.0.0.1:${port}/json/version`)
            ).json();
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

const results = [];
const check = (name, pass, detail) => {
    results.push({ name, pass });
    console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
};

/**
 * Injected ahead of every assertion.
 *
 * `set` writes through the native value setter and dispatches `input`, which is
 * what a keystroke does — assigning `.value` directly is invisible to React and
 * would test nothing.
 */
const HELPERS = `
  const form = document.querySelector(SEL);
  const q = (n) => form.querySelector('[name="' + n + '"]');
  const msgs = () => Array.from(
      form.querySelectorAll('[id$="-error"], p.text-red-600, span.text-red-600'))
    .map((e) => e.textContent.trim()).filter(Boolean);
  const errFor = (n) => {
    const el = q(n); if (!el) return "NO FIELD " + n;
    const id = el.getAttribute("aria-describedby");
    const box = id && document.getElementById(id);
    return box ? box.textContent.trim() : "";
  };
  const set = (n, v) => {
    const el = q(n);
    const proto = el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(el, v);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const blur = (n) => {
    const el = q(n); el.focus();
    el.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
  };
`;

let code = 0;
try {
    const ws = new WebSocket(await endpoint());
    await new Promise((r) => ws.addEventListener("open", r));
    const cdp = new CDP(ws);

    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", {
        targetId,
        flatten: true,
    });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);

    const read = async (expr) => {
        const r = await cdp.send(
            "Runtime.evaluate",
            { expression: `(() => { ${expr} })()`, returnByValue: true, awaitPromise: true },
            sessionId,
        );
        if (r.exceptionDetails) {
            throw new Error(r.exceptionDetails.exception?.description ?? "eval failed");
        }
        return r.result.value;
    };
    const go = async (path) => {
        await cdp.send("Page.navigate", { url: base + path }, sessionId);
        await sleep(HYDRATE);
    };

    /* ------------------------------ 1. the homepage card: the whole lifecycle */
    await go("/");
    const home = `const SEL = 'form:has([name="full_name"])';`;

    check(
        "home: the platform's own bubbles are off",
        (await read(`${home}${HELPERS} return form.noValidate === true`)) === true,
    );

    const empty = await read(`${home}${HELPERS}
        form.querySelector('button[type=submit]').click();
        return new Promise((r) => setTimeout(() => r(msgs()), 400));`);
    check(
        "home: an empty submit is answered inline, not by a round trip",
        Array.isArray(empty) && empty.length >= 3,
        JSON.stringify(empty),
    );
    check(
        "home: the submission never left the browser",
        (await read(
            `${home}${HELPERS} return document.body.innerText.includes("Sending") === false`,
        )) === true,
    );

    await read(`${home}${HELPERS} location.reload(); return true;`);
    await sleep(HYDRATE);

    const midTyping = await read(`${home}${HELPERS}
        set("email", "a");
        return new Promise((r) => setTimeout(() => r(errFor("email")), 300));`);
    check("home: silent while a field is first being typed", midTyping === "", `got "${midTyping}"`);

    const onBlur = await read(`${home}${HELPERS}
        blur("email");
        return new Promise((r) => setTimeout(() => r(errFor("email")), 300));`);
    check(
        "home: the message arrives when the field is left",
        onBlur === "Enter a valid email address like name@example.com",
        `got "${onBlur}"`,
    );

    const fixed = await read(`${home}${HELPERS}
        set("email", "someone@example.com");
        return new Promise((r) => setTimeout(() => r(errFor("email")), 300));`);
    check("home: and clears on the keystroke that fixes it", fixed === "", `got "${fixed}"`);

    const nameRule = await read(`${home}${HELPERS}
        set("full_name", "John 3rd"); blur("full_name");
        return new Promise((r) => setTimeout(() => r(errFor("full_name")), 300));`);
    check(
        "home: the name rule is the shared one",
        nameRule === "Please use letters and spaces only",
        `got "${nameRule}"`,
    );

    const phoneRule = await read(`${home}${HELPERS}
        set("phone", "020 79"); blur("phone");
        return new Promise((r) => setTimeout(() => r(errFor("phone")), 300));`);
    check(
        "home: the phone rule is the shared one",
        phoneRule.startsWith("Enter a valid phone number"),
        `got "${phoneRule}"`,
    );

    /* The whole point of the 2026-08 relaxation: a number typed the way it is
       printed on a business card is a valid number, in every shape. */
    const PHONE_SHAPES = [
        "+44 7853 354207",
        "+447853354207",
        "07853354207",
        "(020) 7946 0018",
        "+1 (415) 555-2671",
    ];
    for (const shape of PHONE_SHAPES) {
        const out = await read(`${home}${HELPERS}
            set("phone", ${JSON.stringify(shape)}); blur("phone");
            return new Promise((r) => setTimeout(() => r(errFor("phone")), 300));`);
        check(`home: phone accepts ${JSON.stringify(shape)}`, out === "", `got "${out}"`);
    }

    /* Blur tidies the whitespace and leaves the separators alone — the box the
       visitor is looking at must not be rewritten out from under them. */
    const tidied = await read(`${home}${HELPERS}
        set("phone", "  +44  7853   354207  "); blur("phone");
        set("full_name", "  Jane   Doe  "); blur("full_name");
        return new Promise((r) => setTimeout(
            () => r({ phone: q("phone").value, name: q("full_name").value }), 300));`);
    check(
        "home: blur trims and collapses, without mangling the number",
        tidied.phone === "+44 7853 354207" && tidied.name === "Jane Doe",
        JSON.stringify(tidied),
    );

    /* A field that is answered and right says so, and only once it has been
       left — a tick on a box nobody has been in is decoration, not feedback.
       On a clean page: every field above has been blurred by now. */
    await read(`${home}${HELPERS} location.reload(); return true;`);
    await sleep(HYDRATE);
    const success = await read(`${home}${HELPERS}
        const before = q("email").hasAttribute("data-valid");
        set("email", "someone@example.com");
        const typing = q("email").hasAttribute("data-valid");
        blur("email");
        return new Promise((r) => setTimeout(() => r({
          before, typing, after: q("email").hasAttribute("data-valid"),
          onEmptyOptional: q("required_service").hasAttribute("data-valid"),
        }), 300));`);
    check(
        "home: a correct answer gets a success state, on blur and not before",
        success.before === false && success.typing === false &&
            success.after === true && success.onEmptyOptional === false,
        JSON.stringify(success),
    );

    /* A rejected submit must cost the visitor nothing: every value stays, and
       focus lands on the first thing to fix rather than the top of the form. */
    await read(`${home}${HELPERS} location.reload(); return true;`);
    await sleep(HYDRATE);
    const kept = await read(`${home}${HELPERS}
        set("full_name", "Jane Doe");
        set("phone", "07853354207");
        set("email", "not-an-email");
        set("project_goals", "  We need a rebrand.  ");
        const button = form.querySelector('button[type=submit]');
        button.click();
        return new Promise((r) => setTimeout(() => r({
          disabled: button.disabled,
          name: q("full_name").value,
          phone: q("phone").value,
          goals: q("project_goals").value,
          focused: document.activeElement.getAttribute("name"),
          emailError: errFor("email"),
        }), 500));`);
    check(
        "home: the submit button is never disabled for being invalid",
        kept.disabled === false,
        `disabled=${kept.disabled}`,
    );
    check(
        "home: a rejected submit keeps every value and normalises them",
        kept.name === "Jane Doe" && kept.phone === "07853354207" &&
            kept.goals === "We need a rebrand.",
        JSON.stringify(kept),
    );
    check(
        "home: and focus lands on the first invalid field",
        kept.focused === "email" && kept.emailError.startsWith("Enter a valid email"),
        JSON.stringify({ focused: kept.focused, emailError: kept.emailError }),
    );

    /* WCAG 3.3.1 / 3.3.3: the message is not just red text near the box, it is
       named by the control that is wrong. */
    const wired = await read(`${home}${HELPERS}
        const el = q("email");
        const id = el.getAttribute("aria-describedby");
        return {
          invalid: el.getAttribute("aria-invalid"),
          describes: Boolean(id && document.getElementById(id)),
        };`);
    check(
        "home: the failing field is aria-invalid and points at its message",
        wired.invalid === "true" && wired.describes === true,
        JSON.stringify(wired),
    );

    /* ------------------------------------- 2. /logo-brief: the custom dropdown */
    await go("/logo-brief");
    const brief = `const SEL = 'form:has([name="business_stage"])';`;

    const noChoice = await read(`${brief}${HELPERS}
        set("full_name", "Jane Doe"); set("email", "jane@example.com");
        set("business_name", "Acme Ltd");
        set("business_description", "We sell widgets to the trade.");
        set("contact_info", "jane@example.com");
        form.querySelector('button[type=submit]').click();
        return new Promise((r) => setTimeout(() => r({
          msgs: msgs(), focus: document.activeElement.getAttribute("role"),
        }), 500));`);
    check(
        "logo-brief: an unanswered dropdown is caught in the browser",
        noChoice.msgs.includes("Please select an option"),
        JSON.stringify(noChoice.msgs),
    );
    check(
        "logo-brief: focus lands on the trigger, not the hidden input",
        noChoice.focus === "combobox",
        `role=${noChoice.focus}`,
    );

    await read(`${brief}${HELPERS} form.querySelector('[role=combobox]').click(); return true;`);
    await sleep(500);
    await read(`${brief}${HELPERS}
        const option = form.querySelector('[role=listbox]:not([hidden]) [role=option]');
        if (!option) return "no open listbox";
        option.click();
        return "clicked";`);
    await sleep(600);

    /* The page has three dropdowns and only one has been answered, so this
       asserts on that one's own message — not on the absence of the string. */
    const chosen = await read(`${brief}${HELPERS}
        const trigger = form.querySelector('[role=combobox]');
        const id = trigger.getAttribute("aria-describedby");
        const own = id && document.getElementById(id);
        return {
          value: q("business_stage").value,
          ownMessage: own ? own.textContent.trim() : "",
          remaining: msgs().filter((m) => m === "Please select an option").length,
        };`);
    check(
        "logo-brief: choosing an option clears that dropdown's message",
        chosen.value !== "" && chosen.ownMessage === "" && chosen.remaining === 2,
        JSON.stringify(chosen),
    );

    /* ------------------------------- 3. /website-brief: the checkbox group */
    await go("/website-brief");
    const site = `const SEL = 'form:has([name="client_name"])';`;

    const groupEmpty = await read(`${site}${HELPERS}
        form.querySelector('button[type=submit]').click();
        return new Promise((r) => setTimeout(() => r(msgs()), 600));`);
    check(
        "website-brief: the required checkbox group is caught in the browser",
        groupEmpty.includes("Please select at least one option"),
        JSON.stringify(groupEmpty),
    );
    /* Sixty controls, five of them required: a flood here would mean the engine
       is holding optional fields to a rule the action does not. */
    check(
        "website-brief: the fifty-odd optional fields stay quiet",
        groupEmpty.length <= 6,
        `${groupEmpty.length} messages`,
    );

    const ticked = await read(`${site}${HELPERS}
        form.querySelector('input[type=checkbox][data-required=true]').click();
        return new Promise((r) => setTimeout(() => r(msgs()), 400));`);
    check(
        "website-brief: ticking one box answers the group",
        !ticked.includes("Please select at least one option"),
        JSON.stringify(ticked),
    );

    /* ------------------ 4. every other form family gets the same treatment */
    const REST = [
        ["/creative-logo-design", "full_name"],
        ["/logo-design-offer", "full_name"],
        ["/lp", "full_name"],
        ["/seo-services", "first_name"],
    ];
    for (const [path, firstField] of REST) {
        await go(path);
        const sel = `const SEL = 'form:has([name="${firstField}"])';`;
        const out = await read(`${sel}${HELPERS}
            if (!form) return { missing: true };
            form.querySelector('button[type=submit]').click();
            return new Promise((r) => setTimeout(
                () => r({ noValidate: form.noValidate, msgs: msgs() }), 500));`);
        check(
            `${path}: an empty submit is answered inline`,
            out && !out.missing && out.noValidate === true && out.msgs.length >= 2,
            JSON.stringify(out),
        );
    }

    ws.close();
} catch (error) {
    console.error("ERROR", String(error?.stack ?? error));
    code = 1;
} finally {
    chrome.kill();
    /* Chrome unmaps its crashpad file a moment after the kill, so on Windows
       this races and throws EBUSY. The run is already decided by then. */
    try {
        rmSync(profile, { recursive: true, force: true });
    } catch {}
}

const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(code || (failed ? 1 : 0));
