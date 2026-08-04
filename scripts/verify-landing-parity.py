"""Prove the /creative-logo-design rebuild says everything the live page says.

    npm run build && python scripts/verify-landing-parity.py

Two checks, in both directions, because each catches a different mistake:

  FORWARD   every copy string in content/landing/creative-logo-design.ts
            appears on the live page  ->  catches a rewording

  REVERSE   every text run on the live page appears in the prerendered
            .next/server/app/creative-logo-design.html  ->  catches a drop

The reverse check is the one that matters most and the one a careful read
cannot do: it is easy to notice you changed a sentence, and very hard to notice
you left one out of a 1,600-line rebuild.

Matching folds case, whitespace, curly quotes and dashes. Anything that fails a
comparison this loose is a genuine difference, not a formatting choice.

Needs the captured live page at `page-source-creative-logo-design.html` in the
repo root (gitignored, like `page-source.html`). Re-capture with:

    curl -sSL https://creativelogodesign.co.uk/creative-logo-design/ \
      -o page-source-creative-logo-design.html

Exits non-zero on any unexplained deviation.
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
LIVE = REPO / "page-source-creative-logo-design.html"
BUILT = REPO / ".next" / "server" / "app" / "creative-logo-design.html"
MODULE = REPO / "content" / "landing" / "creative-logo-design.ts"

# ---------------------------------------------------------------------------
# Strings the live page has no version of. Each is either a fix recorded in
# docs/CONTENT-PARITY.md or a value that is not copy at all.
# ---------------------------------------------------------------------------
AUTHORED = {
    # The one added heading: the live services section has no <h2> above its
    # four cards, so the outline jumps a level with nothing to anchor it.
    "Everything your brand needs, in one place",
    # Alt text. The live grid ships one alt attribute across ten images and
    # "Client 5" four times over; alt text is an a11y and image-SEO signal.
    "A designer on a video consultation call with a client",
    # Labels for controls the live page renders as unnamed <a href="javascript:;">
    # or as text baked into a bitmap.
    "Rated on Trustpilot",
    "Read our Trustpilot reviews",
    "Close",
    # Form outcomes. The live page reloads into a separate thank-you page.
    "Thanks — we’ve got your details",
    "Thanks — we’ll call you back",
}

# ---------------------------------------------------------------------------
# Copy that IS on the live page, but only as pixels — text baked into a bitmap,
# where no crawler and no screen reader can reach it. Transcribed into HTML by
# the rebuild, which is why these do not appear in the live page's text.
#
#   Mega Saver Deal      images/mega-offer.webp        (hero form sticker)
#   Special offer / 70%  images/cta-center-img.webp    (discount band medallion)
#   Complete Branding    images/tag-01.webp            (combo tag)
#   £1599                images/tag-01.webp            (the combo price — the
#                                                       page states it nowhere
#                                                       else, in any form)
# ---------------------------------------------------------------------------
FROM_BITMAP = {
    "Mega Saver Deal",
    "Special offer",
    "Complete Branding",
    "£1599",
}

# ---------------------------------------------------------------------------
# Live strings the rebuild deliberately supersedes. Each is form plumbing, not
# page copy — nothing here is indexed, and every one of them is replaced by
# something that does the same job better. Reasons in docs/CONTENT-PARITY.md.
# ---------------------------------------------------------------------------
REPLACED = {
    # Client-side validation text, shown by the live page's inline jQuery.
    # Validation is a Server Action with zod here, and the messages come from
    # `lib/validation.ts` so the browser can never disagree with the server.
    "Not allowed more than 50 characters and it must be in alphabet",
    "Please enter a valid email address.",
    "Please enter a valid phone number (between 10 to 15 digits, optional '+').",
    "Not allowed more than 2000 characters in message text field",
    "Please enter your name in alphabets",
    "Please enter a valid phone number",
    # Submit state. `useActionState` drives a disabled button reading "Sending…".
    "Submitting... Please be patient.",
    # Placeholders on inputs that have no <label> at all on the live page. The
    # rebuild's floating <label> carries the field name instead — see the note
    # on `quoteDialog` in the content module.
    "Your Full Name",
    "Your Email",
    "Your Phone Number",
    "Write your message here..",
    "Enter your name",
    # The dialog's own heading. It is mounted on open rather than shipped
    # hidden in the HTML, which is what keeps focusable content out of an
    # `aria-hidden` subtree — see components/landing/cld/QuoteDialog.tsx.
    "Avail 70% Discount",
}

# Keys whose values are URLs, filenames or dimensions rather than copy.
NOT_COPY = re.compile(
    r"^(src|href|buyHref|image|icon|avatar|alt|id|width|height|w|h)$|Href$|Alt$"
)


def fold(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = (
        s.replace("’", "'")
        .replace("‘", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("—", "-")
        .replace("–", "-")
        .replace(" ", " ")
    )
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def page_text(path: pathlib.Path) -> str:
    """All readable text on a page: body copy plus the head's metadata values.

    `<meta content="…">` and `<title>` have to be pulled out before the tags are
    stripped, or the description and the OG title — both of them copy, and both
    load-bearing for search — would read as missing from every page.
    """
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)

    meta = " ".join(re.findall(r'<meta[^>]+content="([^"]*)"', raw, flags=re.I))
    titles = " ".join(re.findall(r"<title[^>]*>(.*?)</title>", raw, flags=re.S | re.I))
    # Attributes a person can read or hear: placeholders and accessible names.
    # Without these, the rail's "Next — Client reviews" would read as a drop of
    # the live carousel's visually-hidden "Next", and vice versa.
    attrs = " ".join(
        re.findall(r'\b(?:placeholder|aria-label|alt|title)="([^"]*)"', raw, flags=re.I)
    )

    body = re.sub(r"<[^>]+>", " ", raw)
    return fold(H.unescape(f"{body} {meta} {titles} {attrs}"))


def live_runs(path: pathlib.Path):
    """Every visible text run on the live page, in document order."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<(script|style|svg|noscript)\b.*?</\1>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)
    raw = re.sub(r"<head\b.*?</head>", " ", raw, flags=re.S | re.I)
    for chunk in re.split(r"<[^>]+>", raw):
        text = H.unescape(chunk).strip()
        if text:
            yield text


def module_strings(path: pathlib.Path):
    """(key, value) for every string literal in the content module.

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
        # "£1599" into "Â£1599" and every curly quote into mojibake.
        value = value.replace('\\"', '"').replace("\\\\", "\\").replace("\\n", "\n")
        # Paths, URLs, anchors and `@/…` import specifiers are not copy.
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
                print("  see the docstring for the curl command")
            return 2

    # Padded, and every comparison is padded too, so a match has to land on word
    # boundaries. Without this, JSX that glues two text nodes together —
    # `{lead}<span>{trail}</span>` rendering "Packagefor" — still satisfies a
    # plain substring test for both halves, and the check passes on a page that
    # reads wrong. That is not hypothetical; it is how this rule got written.
    live_text = f" {page_text(LIVE)} "
    built_text = f" {page_text(BUILT)} "

    # ---- FORWARD ---------------------------------------------------------
    checked = 0
    forward_misses = []
    for key, value in module_strings(MODULE):
        if value in AUTHORED or value in FROM_BITMAP:
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
        # Sub-3-char runs are punctuation and separators ("|", "×", "/").
        if len(folded) < 3 or folded in seen:
            continue
        seen.add(folded)
        runs += 1
        if f" {folded} " not in built_text:
            reverse_misses.append(run)

    print(f"FORWARD  {checked} module strings checked against the live page")
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
