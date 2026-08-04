"""Prove the /website-brief and /logo-brief rebuilds say what the live pages say.

    npm run build
    curl -sSL https://creativelogodesign.co.uk/website-brief/index.php -o page-source-website-brief.html
    curl -sSL https://creativelogodesign.co.uk/logo-brief/index.php   -o page-source-logo-brief.html
    python scripts/verify-brief-parity.py

Two directions, as with the other landing-page checks:

  FORWARD   every copy string in content/landing/<page>.ts appears on the live
            page  ->  catches an accidental rewording

  REVERSE   every text run AND every placeholder/label on the live page appears
            in the prerendered .next/server/app/<page>.html  ->  catches a drop

Unlike the other four landing pages, most of the logo brief's visible copy is
in `placeholder=` attributes rather than in text nodes, so REVERSE reads both.

ADDED is the whole list of deliberate additions, and it is the point of this
file: a string that appears without an entry there fails the check. The only
entry is the logo brief's Email Address field, approved 4 Aug 2026 — the live
page collects no email, which is why it could send no confirmation.

Exits non-zero on any unexplained deviation.
"""
import html as H
import pathlib
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = pathlib.Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------------------
# Strings the live pages have no version of at all — not changed, added.
# ---------------------------------------------------------------------------
ADDED = {
    "website-brief": {
        # The live <head> has a title and a description and nothing else.
        "Website Brief Form",
        # Form outcome. The live form posts to email.php and navigates away,
        # so the live document has no success state.
        "Thanks — we've got your details and will be in touch within one working day.",
        "Brief received",
        "Sending…",
        "Creative Logo Design",
    },
    "logo-brief": {
        # THE declared content addition. Approved 4 Aug 2026.
        "Email Address",
        "Enter your email address",
        # The live <head> has a title and no description.
        "Logo Design Brief Form",
        "UK logo design brief form. Tell us about your business, your style "
        "preferences and how to reach you, and our designers will come back to "
        "you within one working day.",
        "Thanks — we've got your details and will be in touch within one working day.",
        "Brief received",
        "Sending…",
        "Creative Logo Design",
    },
}

# ---------------------------------------------------------------------------
# Live runs the rebuild deliberately does not reproduce.
# ---------------------------------------------------------------------------
REPLACED = {
    "website-brief": {
        # The live js/script.js validation messages. The rebuild validates on
        # the server with zod and renders zod's messages instead.
        "Please enter your full name",
        "Company name is required",
        "Enter a valid email address",
        "Enter a valid phone number",
        "Please tell us about your business",
        "Please select at least one website goal",
    },
    "logo-brief": {
        "Please enter your full name",
        "Business name is required",
        "Please describe your business",
        "Please select business stage",
        "Please select logo style",
        "Please select contact method",
        "Please enter contact information",
    },
}

PAGES = [
    {
        "slug": "website-brief",
        "live": REPO / "page-source-website-brief.html",
        "built": REPO / ".next" / "server" / "app" / "website-brief.html",
        "module": REPO / "content" / "landing" / "website-brief.ts",
        "schema": "websiteBriefSchema",
    },
    {
        "slug": "logo-brief",
        "live": REPO / "page-source-logo-brief.html",
        "built": REPO / ".next" / "server" / "app" / "logo-brief.html",
        "module": REPO / "content" / "landing" / "logo-brief.ts",
        "schema": "logoBriefSchema",
    },
]

VALIDATION = REPO / "lib" / "validation.ts"

# Keys in the content modules that are plumbing, not copy.
NOT_COPY = re.compile(r"^(kind|name|autoComplete|inputMode|type|rows|path)$")

WORD = re.compile(r"[a-z0-9]+")


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
    return " ".join(WORD.findall(s)).strip()


def page_text(path: pathlib.Path) -> str:
    """Everything a reader sees, folded — body text, meta, title, and the
    attributes that carry copy on these two pages."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)

    meta = " ".join(re.findall(r'<meta[^>]+content="([^"]*)"', raw, flags=re.I))
    titles = " ".join(re.findall(r"<title[^>]*>(.*?)</title>", raw, flags=re.S | re.I))
    attrs = " ".join(
        re.findall(
            r'\b(?:placeholder|aria-label|alt|title|value)="([^"]*)"', raw, flags=re.I
        )
    )

    body = re.sub(r"<[^>]+>", " ", raw)
    return fold(H.unescape(f"{body} {meta} {titles} {attrs}"))


def live_runs(path: pathlib.Path):
    """Text nodes, plus the attributes that carry copy. The <head> is dropped —
    title and description are checked separately, against routes.ts."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<(script|style|svg|noscript)\b.*?</\1>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)
    body = re.sub(r"<head\b.*?</head>", " ", raw, flags=re.S | re.I)

    # Attributes first — on the logo brief these ARE the copy.
    for attr in re.findall(
        r'\b(?:placeholder|aria-label|alt)="([^"]*)"', body, flags=re.I
    ):
        text = H.unescape(attr).strip()
        if text:
            yield text

    # <option> values that carry no text node of their own.
    for value in re.findall(r'<option[^>]+value="([^"]+)"', body, flags=re.I):
        text = H.unescape(value).strip()
        if text:
            yield text

    for chunk in re.split(r"<[^>]+>", body):
        text = H.unescape(chunk).strip()
        if text:
            yield text


def module_strings(path: pathlib.Path):
    src = path.read_text(encoding="utf-8")
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    src = re.sub(r"^\s*//.*$", "", src, flags=re.M)

    for m in re.finditer(r'(?:(\w+)\s*:\s*)?"((?:[^"\\]|\\.)*)"', src):
        key, value = m.group(1), m.group(2)
        if key and NOT_COPY.search(key):
            continue
        value = value.replace('\\"', '"').replace("\\\\", "\\").replace("\\n", "\n")
        # "./" matters: both modules open with `from "./brief-types"`, and that
        # specifier would otherwise be checked as copy and always miss.
        if value.startswith(("/", "http", "#", "@/", "./")):
            continue
        yield key or "", value


def live_field_names(path: pathlib.Path):
    """Every name= the live form posts, [] stripped."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    for name in re.findall(r'\bname="([^"]+)"', raw):
        yield name.replace("[]", "")


def module_field_names(path: pathlib.Path):
    src = path.read_text(encoding="utf-8")
    for name in re.findall(r'\bname:\s*"([^"]+)"', src):
        yield name.replace("[]", "")


def schema_keys(name: str) -> set[str]:
    """The keys of one zod object in lib/validation.ts."""
    src = VALIDATION.read_text(encoding="utf-8")
    m = re.search(rf"export const {name} = z\.object\(\{{(.*?)\n\}}\);", src, flags=re.S)
    if not m:
        return set()
    body = re.sub(r"/\*.*?\*/", "", m.group(1), flags=re.S)
    body = re.sub(r"^\s*//.*$", "", body, flags=re.M)
    return set(re.findall(r"^\s*(\w+)\s*:", body, flags=re.M))


def check(page) -> int:
    slug = page["slug"]
    added = {fold(s) for s in ADDED[slug]}
    replaced = {fold(s) for s in REPLACED[slug]}

    for path in (page["live"], page["built"], page["module"]):
        if not path.is_file():
            print(f"MISSING: {path}")
            if path == page["built"]:
                print("  run `npm run build` first")
            if path == page["live"]:
                print("  see the docstring for the capture command")
            return 2

    live_text = f" {page_text(page['live'])} "
    built_text = f" {page_text(page['built'])} "

    # ---- FORWARD ---------------------------------------------------------
    checked = 0
    forward_misses = []
    for key, value in module_strings(page["module"]):
        folded = fold(value)
        if folded in added or len(folded) < 3:
            continue
        checked += 1
        if f" {folded} " not in live_text:
            forward_misses.append((key, value))

    # ---- REVERSE ---------------------------------------------------------
    runs = 0
    reverse_misses = []
    seen = set()
    for run in live_runs(page["live"]):
        folded = fold(run)
        if folded in replaced or len(folded) < 3 or folded in seen:
            continue
        seen.add(folded)
        runs += 1
        if f" {folded} " not in built_text:
            reverse_misses.append(run)

    # ---- FIELD NAMES -----------------------------------------------------
    live_names = {n for n in live_field_names(page["live"])}
    module_names = set(module_field_names(page["module"]))
    dropped = sorted(live_names - module_names)

    # ---- SCHEMA ----------------------------------------------------------
    keys = schema_keys(page["schema"])
    unvalidated = sorted(module_names - keys)

    print(f"\n== /{slug}")
    print(f"FORWARD  {checked} module strings checked against the live page")
    for key, value in forward_misses:
        print(f"       ! {key or '(anon)'}: {value[:110]}")
    print(f"REVERSE  {runs} distinct live runs checked against the build")
    for run in reverse_misses:
        print(f"       ! {run[:110]}")
    print(f"FIELDS   {len(live_names)} live name= attributes")
    for name in dropped:
        print(f"       ! dropped: {name}")
    print(f"SCHEMA   {len(keys)} keys in {page['schema']}")
    for name in unvalidated:
        print(f"       ! not validated: {name}")
    print(f"ADDED    {len(ADDED[slug])} declared additions")

    return len(forward_misses) + len(reverse_misses) + len(dropped) + len(unvalidated)


def main() -> int:
    if not VALIDATION.is_file():
        print(f"MISSING: {VALIDATION}")
        return 2
    total = sum(check(p) for p in PAGES)
    print(f"\n{total} deviation(s)")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
