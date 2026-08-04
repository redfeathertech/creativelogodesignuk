/**
 * Rewrite the route tables in docs/ROUTES.md from content/routes.ts.
 *
 *   node scripts/gen-routes-table.mjs          # rewrite in place
 *   node scripts/gen-routes-table.mjs --check  # exit 1 if stale, change nothing
 *
 * ROUTES.md told the reader to "regenerate the tables below" without shipping
 * anything that could. So they were hand-maintained, and drifted: every service
 * row still read `no (stub)` long after the flip, and the titles went stale
 * again the moment `<title>` parity was restored. A table that can disagree
 * with `content/routes.ts` is worse than no table.
 *
 * Only the rows between each `## <Group>` heading's table markers are touched —
 * the prose around them is hand-written and stays.
 */
import { readFileSync, writeFileSync } from "node:fs";

const DOC = "docs/ROUTES.md";
const SRC = "content/routes.ts";

/* routes.ts is TypeScript, and this runs without a build step, so the entries
   are read with a regex rather than an import. Anchored on the full entry shape
   so a partial match cannot silently drop a route — the count is asserted. */
const src = readFileSync(SRC, "utf8");
const entries = [...src.matchAll(
    /\{\s*path:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)*)",\s*group:\s*"(\w+)",\s*indexable:\s*(true|false),/g,
)].map(([, path, title, group, indexable]) => ({
    path,
    title: title.replace(/\\"/g, '"'),
    group,
    indexable: indexable === "true",
}));

const declared = (src.match(/^\s*path: "/gm) || []).length;
if (entries.length !== declared) {
    console.error(`Parsed ${entries.length} of ${declared} routes from ${SRC} — the entry shape changed.`);
    process.exit(2);
}

const GROUPS = [
    ["Core", "core"],
    ["Landing", "landing"],
    ["Service", "service"],
    ["Legal", "legal"],
];

function table(group) {
    const rows = entries.filter((r) => r.group === group);
    if (!rows.length) return null;
    return [
        "| URL | Title | Indexable |",
        "|---|---|---|",
        ...rows.map((r) => `| \`${r.path}\` | ${r.title} | ${r.indexable ? "**yes**" : "no (stub)"} |`),
    ].join("\n");
}

const current = readFileSync(DOC, "utf8");
/* The docs are CRLF on this checkout; normalise for matching and put the
   original ending back at the end, so this never shows up as a whole-file diff. */
const eol = current.includes("\r\n") ? "\r\n" : "\n";
const lines = current.split(/\r?\n/);
let replaced = 0;

/* Line-based on purpose: find the `## Heading`, take the first run of `|` lines
   after it, swap that run out. A regex spanning the prose is brittle against
   whichever blank lines happen to sit between heading and table. */
for (const [heading, group] of GROUPS) {
    const body = table(group);
    if (body === null) continue;

    const at = lines.indexOf(`## ${heading}`);
    if (at === -1) {
        console.error(`No "## ${heading}" heading in ${DOC}.`);
        process.exit(2);
    }

    let start = at + 1;
    while (start < lines.length && !lines[start].startsWith("|")) {
        if (lines[start].startsWith("## ")) {
            console.error(`No table under "## ${heading}" in ${DOC}.`);
            process.exit(2);
        }
        start++;
    }
    let end = start;
    while (end < lines.length && lines[end].startsWith("|")) end++;

    lines.splice(start, end - start, ...body.split("\n"));
    replaced++;
}

const doc = lines.join(eol);
const stale = doc !== current;

if (process.argv.includes("--check")) {
    console.log(stale ? `${DOC} is STALE — run: node scripts/gen-routes-table.mjs` : `${DOC} is up to date.`);
    process.exit(stale ? 1 : 0);
}

if (stale) writeFileSync(DOC, doc);
console.log(
    `${stale ? "Rewrote" : "No change to"} ${replaced} tables in ${DOC} ` +
        `(${entries.length} routes: ${GROUPS.map(([, g]) => `${entries.filter((r) => r.group === g).length} ${g}`).join(", ")}).`,
);
