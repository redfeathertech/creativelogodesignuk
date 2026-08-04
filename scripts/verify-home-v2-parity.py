"""Prove a rendered homepage still says everything content/home.ts says.

    node scripts/capture-rendered.mjs http://127.0.0.1:3100/home-v2 out.html
    python scripts/verify-home-v2-parity.py out.html

Closes a real pre-existing gap. The 36 service pages and all four landing
pages are parity-gated; **the homepage never was**. The v2 redesign rests
entirely on the claim that every ranking string survived a rebuild of all
fifteen sections, and that claim deserves to be asserted mechanically rather
than by careful reading.

Deliberately one-directional. The landing-page scripts also run a REVERSE
check (every run on the live page appears in the rebuild), because there the
live HTML is the authority. Here it is not: `content/home.ts` IS the source of
truth — it is what both v1 and v2 render from — so "did every string in the
module reach the page" is the whole question. A reverse check would only
rediscover that the redesign added sections, which is the point of it.

Matching folds case, whitespace, curly quotes and dashes. Anything failing a
comparison this loose is a genuine difference, not a formatting choice.

Works against EITHER homepage. Run it on the current one to prove the script
itself is sound before trusting it on the redesign:

    node scripts/capture-rendered.mjs http://127.0.0.1:3100/ v1.html
    python scripts/verify-home-v2-parity.py v1.html      # must PASS

Exits non-zero on any missing string.
"""
import html as H
import pathlib
import re
import sys
import unicodedata

# Windows consoles default to cp1252, which cannot print "£" or a curly quote —
# and a parity report that crashes on the first deviation is no report at all.
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = pathlib.Path(__file__).resolve().parent.parent
MODULE = REPO / "content" / "home.ts"

# Keys whose values are asset paths, URLs or numbers rather than copy.
NOT_COPY = re.compile(
    r"^(src|href|img|icon|image|art|bg|frame|shot|mark|logo|orbitIcons"
    r"|value|suffix|stars|width|height|w|h)$|Href$|Icons$"
)

# ---------------------------------------------------------------------------
# Strings in content/home.ts that the page is not expected to render.
#
# Each needs a reason. "It was failing" is not one — a string that should be on
# the page and is not is exactly what this script exists to catch.
# ---------------------------------------------------------------------------
NOT_RENDERED = {
    # Commented out in components/home/About.tsx, and therefore deliberately
    # not rendered by components/home2/About.tsx either. Live copy that was
    # switched off; re-enabling it under cover of a redesign would be a content
    # change nobody approved.
    "Taking on new projects",
}


def fold(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = (
        s.replace("’", "'")
        .replace("‘", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("—", "-")
        .replace("–", "-")
        .replace(" ", " ")
    )
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def page_text(path: pathlib.Path) -> str:
    """All readable text on a page: body copy plus the head's metadata values.

    `<meta content="…">` and `<title>` have to be pulled out before the tags
    are stripped, or the description and the OG title — both copy, and both
    load-bearing for search — would read as missing.
    """
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)

    meta = " ".join(re.findall(r'<meta[^>]+content="([^"]*)"', raw, flags=re.I))
    titles = " ".join(re.findall(r"<title[^>]*>(.*?)</title>", raw, flags=re.S | re.I))
    # Attributes a person can read or hear: placeholders and accessible names.
    attrs = " ".join(
        re.findall(r'\b(?:placeholder|aria-label|alt|title)="([^"]*)"', raw, flags=re.I)
    )

    body = re.sub(r"<[^>]+>", " ", raw)
    return fold(H.unescape(f"{body} {meta} {titles} {attrs}"))


def module_strings(path: pathlib.Path):
    """(key, value) for every copy string literal in content/home.ts.

    A regex rather than a parser: the module is many named exports plus
    TypeScript types, so it is not JSON, and the shape being checked is "did
    this exact sentence survive" — which the literals answer directly.
    """
    src = path.read_text(encoding="utf-8")
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    src = re.sub(r"^\s*//.*$", "", src, flags=re.M)

    for m in re.finditer(r'(?:(\w+)\s*:\s*)?"((?:[^"\\]|\\.)*)"', src):
        key, value = m.group(1), m.group(2)
        if key and NOT_COPY.search(key):
            continue
        # Only the escapes the module actually uses. `unicode_escape` would
        # decode these but re-interpret every UTF-8 byte as latin-1, turning
        # every curly quote into mojibake.
        value = value.replace('\\"', '"').replace("\\\\", "\\").replace("\\n", "\n")
        # Paths, URLs, anchors and `@/…` import specifiers are not copy.
        if value.startswith(("/", "http", "#", "@/")):
            continue
        yield key or "", value


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: python scripts/verify-home-v2-parity.py <rendered.html>")
        return 2

    page = pathlib.Path(sys.argv[1])
    for path in (MODULE, page):
        if not path.is_file():
            print(f"MISSING: {path}")
            if path is page:
                print("  capture it with scripts/capture-rendered.mjs first")
            return 2

    # Padded, and every comparison is padded too, so a match has to land on
    # word boundaries. Without this, JSX that glues two text nodes together —
    # `{lead}<span>{trail}</span>` rendering "Packagefor" — still satisfies a
    # plain substring test for both halves, and the check passes on a page that
    # reads wrong.
    text = f" {page_text(page)} "

    checked = 0
    misses = []
    for key, value in module_strings(MODULE):
        if value in NOT_RENDERED:
            continue
        folded = fold(value)
        # Below three characters a "match" is noise: "UK" appears in any page.
        if len(folded) < 3:
            continue
        checked += 1
        if f" {folded} " not in text:
            misses.append((key, value))

    print(f"content/home.ts -> {page.name}")
    print(f"  {checked} copy strings checked, {len(misses)} missing")

    if misses:
        print("\nMISSING FROM THE PAGE:")
        for key, value in misses:
            shown = value if len(value) <= 96 else value[:93] + "..."
            print(f"  [{key or '-'}] {shown}")
        print(
            "\nFix the component, never this script. A string in content/home.ts\n"
            "that no longer reaches the page is dropped copy, and every page on\n"
            "this site ranks."
        )
        return 1

    print("\nPASS — every copy string in content/home.ts is on the page.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
