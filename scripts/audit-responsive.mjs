/**
 * Measure real layout over CDP instead of eyeballing a screenshot.
 *
 * Drives headless Chrome directly — no puppeteer, no new dependency. For every
 * URL x viewport width it reports horizontal overflow on the document and names
 * the specific elements sticking out, which is the only way to tell a genuinely
 * broken page from one that merely looks tight.
 *
 * THREE INDEPENDENT DEFECT CLASSES, because for a long time this script only
 * checked the first one and reported "12 widths clean" on a hero whose primary
 * CTA hung 59px off the side of a 320px phone:
 *
 *   1. SCROLL   the document scrolls sideways. Ruins a page on a phone.
 *   2. CUT      real content — text, a link, a button — sticks out past the
 *               viewport but an ancestor with `overflow: hidden` swallows it,
 *               so the document never grows and check 1 stays silent. The
 *               content is simply *gone*. This is the blind spot that let the
 *               hero CTA ship broken: `.hero { overflow-hidden }` hid it from
 *               the only check that existed.
 *   3. COLLIDE  two in-flow siblings overlap. Nothing leaves the viewport and
 *               nothing is clipped, so checks 1 and 2 both pass while the text
 *               of one flex item runs straight through its neighbour. This is
 *               what "the three badges are mingled into one another" looks
 *               like to a machine.
 *
 * A scroll-snap rail's slides and a marquee's track are *supposed* to leave the
 * viewport — that is what a carousel is — so an element clipped by an ancestor
 * that actually scrolls (`overflow-x: auto/scroll`) is counted as `contained`
 * and is not a defect. `hidden`/`clip` cannot be scrolled to, so anything
 * meaningful behind one is counted as CUT.
 *
 * Usage: node audit-responsive.mjs <baseUrl> <path> [path...]
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DEFAULT_WIDTHS = [320, 360, 390, 414, 480, 600, 768, 834, 1024, 1280, 1440, 1920];

const argv = process.argv.slice(2);
/* The twelve default widths are device sizes, not breakpoints, so a layout can
   break across a whole band between two of them and audit clean — a rail that
   collided from 992px to 1200px passed because the grid jumps 834 -> 1024 ->
   1280. Pass `--widths=` to sweep the edges of anything you have just changed. */
const widthArg = argv.find((a) => a.startsWith("--widths="));
const WIDTHS = widthArg
    ? widthArg.slice(9).split(",").map(Number).filter((n) => n > 0)
    : DEFAULT_WIDTHS;

/* Comfortably past `Counter`'s 1400ms run and the `reveal` transitions. */
const settleArg = argv.find((a) => a.startsWith("--settle="));
const SETTLE_MS = settleArg ? Number(settleArg.slice(9)) : 1900;

const [base, ...paths] = argv.filter((a) => !a.startsWith("--"));
if (!base || !paths.length || !WIDTHS.length) {
    console.error("usage: node audit-responsive.mjs [--widths=320,360,...] <baseUrl> <path> [path...]");
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

/** Runs inside the page. See the three defect classes in the header. */
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
  const SCROLLABLE = new Set(["auto", "scroll"]);
  const CLIPPING = new Set(["hidden", "clip"]);

  const name = (el) => el.tagName.toLowerCase()
    + (el.id ? "#" + el.id : "")
    + (typeof el.className === "string" && el.className
        ? "." + el.className.trim().split(/\\s+/).slice(0, 3).join(".")
        : "");

  const skip = (el) => {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || s.position === "fixed") return true;
    if (el.closest('[aria-hidden="true"], [hidden], [inert]')) return true;
    return false;
  };

  /* The nearest ancestor that constrains this element horizontally AND is
     itself inside the viewport — so whatever escapes stops at its edge. */
  const clipperOf = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (!SCROLLABLE.has(ox) && !CLIPPING.has(ox)) continue;
      const pr = p.getBoundingClientRect();
      if (pr.right <= vw + 1 && pr.left >= -1) return { el: p, ox };
    }
    return null;
  };

  /* Content a user would miss if it vanished. A decorative glow clipped by a
     hero is fine; a button clipped by a hero is a bug. */
  const MEANINGFUL = new Set(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "LABEL"]);
  const isMeaningful = (el) =>
    MEANINGFUL.has(el.tagName)
    || (el.textContent || "").trim().length > 0
    || !!el.closest("a, button");

  /* A marquee track is wider than its mask on purpose and is clipped by
     overflow:hidden like any other, but it is not hidden — the animation
     walks it past the mask. Anything animating between the element and its
     clipper gets the same benefit of the doubt a scrollable rail does. */
  const animatedUpTo = (el, stop) => {
    for (let p = el; p && p !== stop; p = p.parentElement) {
      if (getComputedStyle(p).animationName !== "none") return true;
    }
    return false;
  };

  /* getBoundingClientRect on a rotated element is the AXIS-ALIGNED box around
     the rotated shape, which is taller and wider than the shape itself — a
     157px line rotated 4deg gains 11px of height it does not occupy. Stacked
     children of a rotated parent therefore "overlap" by ~7px while looking
     perfect. Tailwind v4 rotates with the standalone rotate property, not
     transform, so both have to be read. */
  const transformed = (el) => {
    const s = getComputedStyle(el);
    return (s.transform && s.transform !== "none")
      || (s.rotate && s.rotate !== "none")
      || (s.scale && s.scale !== "none");
  };
  const transformedUpTo = (el, stop) => {
    for (let p = el; p && p !== stop; p = p.parentElement) if (transformed(p)) return true;
    return false;
  };

  /* Union of an element's own box with every in-flow descendant's box: where
     its ink actually lands, including text that has spilled out of it.

     Descendants sitting behind a clipper *inside* the subtree are skipped —
     that clipper's own box is already in the union, and what it hides cannot
     collide with anything. Without this the walk reports a phantom collision
     on the hero, whose form card clips its own contents.

     A closed <details> is the same situation with no element to point at: the
     clip lives on the ::details-content pseudo-element, so the collapsed panel
     is a real in-flow child reporting its full intrinsic rect while painting
     nothing. Unhandled, the eight-item FAQ reports ~16 phantom collisions at
     every width and buries the real ones. */
  const inkBox = (el) => {
    const r = el.getBoundingClientRect();
    const es = getComputedStyle(el);
    if (es.overflowX !== "visible" || es.overflowY !== "visible")
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };

    const closedPanel = (d) => {
      let child = d;
      for (let p = d.parentElement; p; child = p, p = p.parentElement) {
        if (p.tagName === "DETAILS" && !p.open && child.tagName !== "SUMMARY") return true;
        if (p === el) return false;
      }
      return false;
    };

    let left = r.left, right = r.right, top = r.top, bottom = r.bottom;
    for (const d of el.querySelectorAll("*")) {
      const cs = getComputedStyle(d);
      if (cs.position === "absolute" || cs.position === "fixed") continue;
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      /* Same inflated-AABB problem as above — a rotated child would grow the
         ink box by geometry it does not actually paint into. */
      if (transformed(d)) continue;
      let clipped = false;
      for (let p = d.parentElement; p && p !== el; p = p.parentElement) {
        const ps = getComputedStyle(p);
        if (ps.overflowX !== "visible" || ps.overflowY !== "visible") { clipped = true; break; }
      }
      if (clipped || closedPanel(d)) continue;
      const dr = d.getBoundingClientRect();
      if (!dr.width && !dr.height) continue;
      if (dr.left < left) left = dr.left;
      if (dr.right > right) right = dr.right;
      if (dr.top < top) top = dr.top;
      if (dr.bottom > bottom) bottom = dr.bottom;
    }
    return { left, right, top, bottom };
  };

  const scroll = [];   /* pushes the document sideways */
  const cut = [];      /* meaningful content swallowed by overflow:hidden */
  let contained = 0;   /* legitimately parked in a scrollable rail */
  let clippedDecor = 0;

  for (const el of document.querySelectorAll("body *")) {
    if (skip(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right <= vw + 1 && r.left >= -1) continue;

    const clip = clipperOf(el);
    const entry = {
      el: name(el),
      left: Math.round(r.left),
      right: Math.round(r.right),
      w: Math.round(r.width),
      past: Math.round(Math.max(r.right - vw, -r.left)),
      text: (el.textContent || "").trim().slice(0, 40),
    };
    if (!clip) { scroll.push(entry); continue; }
    if (SCROLLABLE.has(clip.ox) || animatedUpTo(el, clip.el)) { contained++; continue; }
    if (isMeaningful(el)) { entry.clippedBy = name(clip.el); cut.push(entry); }
    else clippedDecor++;
  }

  /* Two in-flow siblings whose ink overlaps on BOTH axes. Only flex and grid
     containers are examined: in normal flow, boxes cannot collide without a
     negative margin, and every negative margin on this site is deliberate. */
  const collide = [];
  for (const box of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(box);
    if (!/flex|grid/.test(cs.display)) continue;
    if (skip(box)) continue;
    /* Every rect below this point would be an inflated axis-aligned box. */
    if (transformedUpTo(box, null)) continue;
    const kids = [...box.children].filter((k) => {
      const ks = getComputedStyle(k);
      return ks.position !== "absolute" && ks.position !== "fixed"
        && ks.display !== "none" && ks.visibility !== "hidden"
        && !k.hasAttribute("hidden")
        && !transformed(k);
    });
    if (kids.length < 2 || kids.length > 24) continue;
    const boxes = kids.map(inkBox);
    for (let i = 0; i < kids.length; i++) {
      for (let j = i + 1; j < kids.length; j++) {
        const a = boxes[i], b = boxes[j];
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 2 && oy > 2) {
          collide.push({
            parent: name(box),
            a: name(kids[i]),
            b: name(kids[j]),
            overlapX: Math.round(ox),
            overlapY: Math.round(oy),
            text: (kids[j].textContent || "").trim().slice(0, 40),
          });
        }
      }
    }
  }

  const uniq = (arr, key) => {
    const seen = new Set();
    return arr.filter((o) => !seen.has(key(o)) && seen.add(key(o)));
  };

  return JSON.stringify({
    vw,
    scrollW: de.scrollWidth,
    overflow: de.scrollWidth - vw,
    scrollN: scroll.length,
    cutN: cut.length,
    collideN: collide.length,
    contained,
    clippedDecor,
    worstScroll: uniq(scroll, (o) => o.el).slice(0, 6),
    worstCut: uniq(cut, (o) => o.el).slice(0, 6),
    worstCollide: uniq(collide, (o) => o.parent + o.a + o.b).slice(0, 6),
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
        /* Measure at REST, not on arrival. This used to be 250ms, and 250ms is
           mid-animation for `Counter`, which runs for 1400ms: "1,000+" is 95px
           wide on the way up and 112px when it lands. Sampling early made the
           hero stat rail look 50px narrower than it is and scored a rail whose
           badges overlapped by 24px as clean. Anything that animates its own
           size has to be allowed to finish before it is measured. */
        await sleep(SETTLE_MS);

        const { result } = await cdp.send("Runtime.evaluate",
            { expression: PROBE, returnByValue: true }, sessionId);
        const r = JSON.parse(result.value);

        const bad = r.overflow > 0 || r.scrollN > 0 || r.cutN > 0 || r.collideN > 0 || r.h1 !== 1;
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
        for (const r of bad) {
            console.log(`      ${r.vw}px  scroll=${r.overflow}(${r.scrollN})  cut=${r.cutN}  collide=${r.collideN}  contained=${r.contained}  h1=${r.h1}`);
            for (const w of r.worstScroll)
                console.log(`         SCROLL  ${w.el}  left=${w.left} right=${w.right} w=${w.w}`);
            for (const w of r.worstCut)
                console.log(`         CUT     ${w.el}  right=${w.right} past=${w.past} by=${w.clippedBy}  "${w.text}"`);
            for (const w of r.worstCollide)
                console.log(`         COLLIDE ${w.a} x ${w.b}  ${w.overlapX}x${w.overlapY}px  in ${w.parent}  "${w.text}"`);
        }
    }
}
console.log(`\n${rows.length} measurements, ${fails} failing`);
process.exit(fails ? 1 : 0);
