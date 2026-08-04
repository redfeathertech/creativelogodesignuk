"""Prove the /logo-design-offer rebuild says everything the live page says.

    npm run build
    node scripts/capture-rendered.mjs \
      https://creativelogodesign.co.uk/logo-design-offer/ \
      page-source-logo-design-offer.html
    python scripts/verify-ldo-parity.py

Same two checks as `verify-landing-parity.py`, and the same reasoning:

  FORWARD   every copy string in content/landing/logo-design-offer.ts
            appears on the live page  ->  catches a rewording

  REVERSE   every text run on the live page appears in the prerendered
            .next/server/app/logo-design-offer.html  ->  catches a drop

One thing differs, and it is the whole reason this is a separate script: **there
is no live HTML to compare against.** The live page is a Create React App bundle
that serves `<div id="root"></div>` and builds every word in the browser, so
`curl` returns 3KB of shell with none of the copy in it. "The live page" here
means its DOM after hydration, captured with `scripts/capture-rendered.mjs`.

That also makes the REVERSE check weaker than it looks on its own: the live page
holds one carousel slide at a time, so a single capture can only ever contain
one of the four portfolio sets. The four sets, and the strings only reachable
from the JS bundle, are listed in `CAROUSEL_ONLY` below and checked against the
bundle by hand — see docs/CONTENT-PARITY.md.

Exits non-zero on any unexplained deviation.
"""
import html as H
import pathlib
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = pathlib.Path(__file__).resolve().parent.parent
LIVE = REPO / "page-source-logo-design-offer.html"
BUILT = REPO / ".next" / "server" / "app" / "logo-design-offer.html"
MODULE = REPO / "content" / "landing" / "logo-design-offer.ts"

# ---------------------------------------------------------------------------
# Strings the live DOM has no version of. Each is either a fix recorded in
# docs/CONTENT-PARITY.md or a value that is not copy at all.
# ---------------------------------------------------------------------------
AUTHORED = {
    # Labels for controls the live page renders unnamed, and for images it
    # ships with alt="Logo 1" … alt="Logo 7".
    "Rated on Trustpilot",
    "Read our Trustpilot reviews",
    "Close",
    "Request a Callback",
    # Form outcome. The live page has no success state in the document.
    "Thanks — your request is in.",
    # Award and press names, read off the badge artwork. The live page names
    # none of them; see docs/CONTENT-PARITY.md.
    "Best Design Awards 2022 — DesignRush",
    "CSS Design Awards",
    "Best Social Media Marketing Agencies — DesignRush",
    "CrowdReviews.com Top 25 for Web Development, based on client reviews",
    "Local Excellence 2023 Winner — Los Angeles",
    "BuzzFeed",
    "The Huffington Post",
    "Just Creative",
    "Entrepreneur",
    "Inc.",
    # Accessible names for the footer's three icon-only social links, which the
    # live page ships with no name at all. NB "Facebook" and "LinkedIn" would
    # pass the forward check anyway, but only by colliding with the "Facebook
    # Banner Design" and "LinkedIn Banner Design" package features — so all
    # three are listed, not just the one that failed.
    "Facebook",
    "Instagram",
    "LinkedIn",
}

# Client names read off the 3x3 logo bitmaps. All 36 exist on the live page only
# as pixels inside four composite images, so none of them is text anywhere.
# Detected structurally rather than listed: every logo entry is one line, and it
# is the only place the module interpolates `${WORK}`.
LOGO_LINE = "${WORK}/"

# ---------------------------------------------------------------------------
# Copy that IS on the live page, but only as pixels or only inside the JS
# bundle, so a captured DOM cannot contain it.
#
#   £19     price.webp                  the hero's headline price
#   £1199   price1199.svg               the All-In-One Combo price
# ---------------------------------------------------------------------------
FROM_BITMAP = {"£19", "£1199"}

# The three portfolio sets that were not the one on screen when the capture was
# taken. Verified against the string literals in the live bundle
# (`static/js/main.896806be.js`), not invented.
CAROUSEL_ONLY = {
    "Pet Care Logo Design",
    "Our Pet Care Logo Design services in the UK, led by expert pet logo designers, specialise in crafting unique, playful, and memorable logos that reflect the heart and care of your pet business. Whether you're a pet groomer, pet store, or veterinary clinic, we create logos that resonate with pet owners and build brand loyalty.",
    "Bespoke Logo Designs for Construction Companies",
    "We have proudly served construction companies by designing custom logos that reflect their expertise, reliability, and strength. Our logos are crafted to stand out in the industry, creating strong brand identities that resonate with clients and help businesses make a lasting impression.",
    "Logo Design Solutions Across Every Industry",
    "At Logos from All Around, we’ve proudly designed logos for every industry, from healthcare to tech, retail to construction. Our diverse expertise allows us to create unique, memorable logos that reflect the essence of each business, helping them stand out and thrive in their respective markets.",
}

# Live runs the rebuild deliberately does not reproduce.
REPLACED = {
    # The cookie banner is the live page's own third-party widget.
    "This website uses cookies to improve your experience.",
    "Decline",
    "Accept",
    # Live placeholders. The rebuild gives every input a real <label> instead
    # (Field.tsx floats the label; a placeholder-only input fails WCAG 3.3.2).
    "Enter your name*",
    "Enter your number*",
    "Enter your email*",
    # The live tab strip. All three groups are rendered at once here, so the
    # tab labels are the group headings — same words, checked by FORWARD.
}

NOT_COPY = re.compile(r"^(src|href|icon|alt|id|width|height)$|Href$|Alt$")


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
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)

    meta = " ".join(re.findall(r'<meta[^>]+content="([^"]*)"', raw, flags=re.I))
    titles = " ".join(re.findall(r"<title[^>]*>(.*?)</title>", raw, flags=re.S | re.I))
    attrs = " ".join(
        re.findall(r'\b(?:placeholder|aria-label|alt|title)="([^"]*)"', raw, flags=re.I)
    )

    body = re.sub(r"<[^>]+>", " ", raw)
    return fold(H.unescape(f"{body} {meta} {titles} {attrs}"))


def live_runs(path: pathlib.Path):
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<(script|style|svg|noscript)\b.*?</\1>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)
    raw = re.sub(r"<head\b.*?</head>", " ", raw, flags=re.S | re.I)
    for chunk in re.split(r"<[^>]+>", raw):
        text = H.unescape(chunk).strip()
        if text:
            yield text


def module_strings(path: pathlib.Path):
    src = path.read_text(encoding="utf-8")
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    src = re.sub(r"^\s*//.*$", "", src, flags=re.M)
    # Drop the 36 client-logo lines wholesale: their `name` is alt text read off
    # a bitmap, so there is nothing on the live page to compare it against.
    src = "\n".join(line for line in src.splitlines() if LOGO_LINE not in line)

    for m in re.finditer(r'(?:(\w+)\s*:\s*)?"((?:[^"\\]|\\.)*)"', src):
        key, value = m.group(1), m.group(2)
        if key and NOT_COPY.search(key):
            continue
        value = value.replace('\\"', '"').replace("\\\\", "\\").replace("\\n", "\n")
        if value.startswith(("/", "http", "#", "@/")):
            continue
        yield key or "", value


def main() -> int:
    for path in (LIVE, BUILT, MODULE):
        if not path.is_file():
            print(f"MISSING: {path}")
            if path is BUILT:
                print("  run `npm run build` first")
            if path is LIVE:
                print("  see the docstring for the capture command")
            return 2

    live_text = f" {page_text(LIVE)} "
    built_text = f" {page_text(BUILT)} "

    # ---- FORWARD ---------------------------------------------------------
    checked = 0
    forward_misses = []
    for key, value in module_strings(MODULE):
        if value in AUTHORED or value in FROM_BITMAP or value in CAROUSEL_ONLY:
            continue
        folded = fold(value)
        if len(folded) < 3:
            continue
        checked += 1
        if f" {folded} " not in live_text:
            forward_misses.append((key, value))

    # ---- REVERSE ---------------------------------------------------------
    runs = 0
    reverse_misses = []
    seen = set()
    for run in live_runs(LIVE):
        if run in REPLACED:
            continue
        folded = fold(run)
        if len(folded) < 3 or folded in seen:
            continue
        seen.add(folded)
        runs += 1
        if f" {folded} " not in built_text:
            reverse_misses.append(run)

    print(f"FORWARD  {checked} module strings checked against the live (rendered) page")
    for key, value in forward_misses:
        print(f"       ! {key or '(anon)'}: {value[:110]}")

    print(f"REVERSE  {runs} distinct live text runs checked against the build")
    for run in reverse_misses:
        print(f"       ! {run[:110]}")

    total = len(forward_misses) + len(reverse_misses)
    print(f"\n{total} deviation(s)")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
