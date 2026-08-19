/**
 * Prove the homepage renders every string in `content/home.ts`.
 *
 *     npm run build && node scripts/verify-home-parity.mjs
 *
 * Closes a real gap. The 36 service pages and all 4 landing pages are parity
 * gated; the homepage — the page this rebuild exists to protect most — never
 * was. The 19 Aug redesign rebuilt seven of its sections and added two more,
 * in place, without one.
 *
 * WHAT THIS CHECKS
 *
 *   FORWARD   every copy string in content/home.ts appears in the prerendered
 *             .next/server/app/index.html  ->  catches copy dropped by a
 *             component, which is the failure mode a redesign actually has
 *
 * `content/home.ts` is the right side to walk. docs/CONTENT-PARITY.md already
 * settles which wording ships — each reverted line is marked `[live]` in the
 * module — so the module IS the approved copy. What no one can check by
 * reading is whether a rebuilt component still puts all of it on the page.
 *
 * WHAT THIS DOES NOT CHECK
 *
 * There is no REVERSE direction here, unlike the landing-page scripts. That
 * one walks the captured live page and asserts every run of its text survived,
 * and it needs `page-source.html` in the repo root — gitignored, and not in a
 * fresh checkout. Re-capture it with
 *
 *     curl -sSL https://creativelogodesign.co.uk/ -o page-source.html
 *
 * and the reverse check is worth writing; it is the direction that catches a
 * whole section going missing. Until then this gate is forward-only, and that
 * limit is the point of this paragraph.
 *
 * WHY NODE, WHEN THE OTHER SIX GATES ARE PYTHON
 *
 * Because it has to be runnable to be run. This is a Next.js repo, so Node is
 * guaranteed present; Python is not, and is absent from at least one machine
 * this was written on. The logic, the folding rules and the report format are
 * the same as scripts/verify-landing-parity.py, deliberately — read that one
 * for the reasoning behind each rule.
 *
 * Matching folds case, whitespace, curly quotes and dashes, and pads every
 * comparison so a match has to land on word boundaries — without that, a
 * heading split as `{titleLead}<span>{titleAccent}</span>` would satisfy a
 * plain substring test even if the two halves rendered glued together.
 *
 * Exits non-zero on any string that is missing.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MODULE = path.join(REPO, "content", "home.ts");
/* Defaults to the prerendered homepage. The optional argument exists so the
   gate can be pointed at a deliberately damaged copy and proved to fail — a
   parity script that passes trivially is worse than none. */
const BUILT =
    process.argv[2] ?? path.join(REPO, ".next", "server", "app", "index.html");

/*
 * Keys whose values are URLs, filenames, dimensions or machine ids rather than
 * copy. The first group is shared with the landing-page scripts; the rest are
 * fields `content/home.ts` alone carries, all added by the 19 Aug redesign:
 *
 *   art artW artH thumb photo frame background bg   artwork and its box
 *   accent                                          a sampled hex colour
 *   category                                        a Portfolio filter id,
 *                                                   matched against the
 *                                                   filters' `id`, never shown
 *   vimeoId                                         an embed id; the iframe is
 *                                                   mounted on click, so it is
 *                                                   correctly absent from the
 *                                                   prerendered HTML
 */
const NOT_COPY =
    /^(src|href|buyHref|image|icon|avatar|alt|id|width|height|w|h|art|artW|artH|thumb|photo|frame|background|bg|accent|category|vimeoId)$|Href$|Alt$|Anchor$/;

/*
 * Strings that are in `content/home.ts` and legitimately not in the prerendered
 * HTML. Two only, both declared with their evidence — this set is the place a
 * deviation gets ARGUED, not the place it gets hidden. Adding to it without a
 * reason of this kind defeats the gate.
 */
const NOT_RENDERED = new Map([
    [
        // Orphaned copy, and NOT a redesign regression — check before deleting
        // it. `about.badge` was already inside a `{/* … */}` block in
        // components/home/About.tsx as of a00cdfe^; the 18 Aug About rewrite
        // only removed the dead markup around it. So the string has not been on
        // the page for some time and no ranking depends on it.
        //
        // Left in content/home.ts on purpose: deleting homepage copy is a
        // content decision (AGENTS.md), not a cleanup. Either restore the
        // availability pill in About.tsx or drop the key — but decide it, do
        // not let it rot.
        "Taking on new projects",
        "about.badge — commented out of About.tsx since before the redesign",
    ],
    [
        // The lightbox's close button. components/home/VideoLightbox.tsx mounts
        // on click and nothing before it, which is the whole point of that
        // section's design (no third-party bytes until a visitor asks), so this
        // label cannot appear in static HTML. Nothing a crawler needs.
        "Close video",
        "videoTestimonials.close — client-only, inside the lightbox",
    ],
]);

const NAMED = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    rsquo: "’",
    lsquo: "‘",
    ldquo: "“",
    rdquo: "”",
    mdash: "—",
    ndash: "–",
    pound: "£",
    hellip: "…",
};

/** The entities React actually emits, plus every numeric form. */
function unescapeHtml(s) {
    return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, body) => {
        if (body[0] === "#") {
            const code =
                body[1] === "x" || body[1] === "X"
                    ? parseInt(body.slice(2), 16)
                    : parseInt(body.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
        }
        return NAMED[body.toLowerCase()] ?? whole;
    });
}

function fold(s) {
    return s
        .normalize("NFKC")
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/[—–]/g, "-")
        .replace(/ /g, " ")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

/**
 * All readable text on a page: body copy plus the head's metadata values.
 *
 * `<meta content="…">` and `<title>` have to be pulled out before the tags are
 * stripped, or the description and the OG title — both of them copy, and both
 * load-bearing for search — would read as missing.
 */
function pageText(file) {
    let raw = readFileSync(file, "utf8");
    raw = raw.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, " ");
    raw = raw.replace(/<!--[\s\S]*?-->/g, " ");

    const grab = (re) => [...raw.matchAll(re)].map((m) => m[1]).join(" ");
    const meta = grab(/<meta[^>]+content="([^"]*)"/gi);
    const titles = grab(/<title[^>]*>([\s\S]*?)<\/title>/gi);
    // Attributes a person or a machine reads: placeholders, accessible names,
    // and `<time datetime>`. The homepage needs all of them — `recentWork.title`
    // and `videoTestimonials.title` are section accessible names rendered only
    // as `aria-label`, the video cards' `durationSpoken` is sr-only text on a
    // control, and every testimonial's `dateISO` reaches the page only as the
    // `datetime` of its `<time>` (components/home/TestimonialCard.tsx). Without
    // `datetime` here, all ten testimonial dates read as dropped.
    const attrs = grab(
        /\b(?:placeholder|aria-label|alt|title|datetime)="([^"]*)"/gi,
    );

    const body = raw.replace(/<[^>]+>/g, " ");
    return fold(unescapeHtml(`${body} ${meta} ${titles} ${attrs}`));
}

/**
 * [key, value] for every string literal in the content module.
 *
 * A regex rather than a parser: the module is many named exports plus
 * TypeScript types, so it is not JSON, and the shape being checked is "did this
 * exact sentence survive" — which the literals answer directly.
 */
function* moduleStrings(file) {
    let src = readFileSync(file, "utf8");
    src = src.replace(/\/\*[\s\S]*?\*\//g, "");
    src = src.replace(/^[ \t]*\/\/.*$/gm, "");

    for (const m of src.matchAll(/(?:(\w+)\s*:\s*)?"((?:[^"\\]|\\.)*)"/g)) {
        const key = m[1] ?? "";
        if (key && NOT_COPY.test(key)) continue;
        // Only the escapes the module actually uses.
        const value = m[2]
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, "\\")
            .replace(/\\n/g, "\n");
        // Paths, URLs, anchors, hex colours and `@/…` import specifiers.
        if (/^(\/|https?:|#|@\/|tel:|mailto:)/.test(value)) continue;
        yield [key, value];
    }
}

function main() {
    for (const file of [BUILT, MODULE]) {
        if (!existsSync(file)) {
            console.log(`MISSING: ${file}`);
            if (file === BUILT) console.log("  run `npm run build` first");
            return 2;
        }
    }

    // Padded, and every comparison is padded too, so a match has to land on
    // word boundaries. See the header for why that is not a nicety.
    const built = ` ${pageText(BUILT)} `;

    let checked = 0;
    const misses = [];
    for (const [key, value] of moduleStrings(MODULE)) {
        if (NOT_RENDERED.has(value)) continue;
        const folded = fold(value);
        // Sub-3-char values are separators and single glyphs ("?", "+", "×").
        if (folded.length < 3) continue;
        checked += 1;
        if (!built.includes(` ${folded} `)) misses.push([key, value]);
    }

    console.log(
        `FORWARD  ${checked} strings from content/home.ts checked against the build`,
    );
    for (const [key, value] of misses) {
        console.log(`       ! ${key || "(anon)"}: ${value.slice(0, 110)}`);
    }

    // Printed every run, not tucked away: an exemption nobody sees becomes an
    // exemption nobody revisits.
    console.log(`DECLARED ${NOT_RENDERED.size} string(s) knowingly not rendered`);
    for (const [, why] of NOT_RENDERED) console.log(`       - ${why}`);

    console.log(`\n${misses.length} deviation(s)`);
    return misses.length ? 1 : 0;
}

process.exit(main());
