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

FORWARD, FIELDS and SCHEMA need only the live capture and the content module —
not a build — so this script runs, and gates Task 2, before either page exists
as a route. Only REVERSE needs the build.

Exit codes:
  0  clean — every page was checked and matched in both directions
  1  every page could be checked, but at least one deviation was found
  2  fatal — a live capture or a content module is missing for some page, so
     that page could not be checked at all. A missing build alone is not
     fatal: REVERSE is skipped for that page and counted as one deviation.
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
# module_strings() only reads content/landing/<page>.ts, so ADDED can only ever
# hold strings that function can produce — never a live <title> (checked
# separately below, against routes.ts) and never text that lives in component
# or action code ("Sending…" lives in the submit button; the success message
# and "Creative Logo Design" live in app/actions/forms.ts and the shared brief
# shell). Listing those here would be inert: they can never be the source of a
# FORWARD miss, so their presence would silently stop meaning anything.
ADDED = {
    "website-brief": {
        # Form outcome. The live form posts to email.php and navigates away,
        # so the live document has no success state.
        "Brief received",
    },
    "logo-brief": {
        # THE declared content addition. Approved 4 Aug 2026.
        "Email Address",
        "Enter your email address",
        "UK logo design brief form. Tell us about your business, your style "
        "preferences and how to reach you, and our designers will come back to "
        "you within one working day.",
        "Brief received",
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
ROUTES = REPO / "content" / "routes.ts"

# Parsed the same way scripts/gen-routes-table.mjs reads content/routes.ts:
# a regex over the literal entry shape, since it's TypeScript and this runs
# without a build step.
ROUTE_ENTRY = re.compile(
    r'\{\s*path:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)*)",\s*group:\s*"(\w+)",\s*indexable:\s*(true|false),',
)


def route_titles() -> dict[str, str]:
    """path -> title, from content/routes.ts."""
    src = ROUTES.read_text(encoding="utf-8")
    return {
        path: title.replace('\\"', '"')
        for path, title, _group, _indexable in ROUTE_ENTRY.findall(src)
    }


def module_title(path: pathlib.Path) -> str | None:
    """`meta.title` out of a content module."""
    src = path.read_text(encoding="utf-8")
    m = re.search(r'export const meta = \{.*?title:\s*"((?:[^"\\]|\\.)*)"', src, flags=re.S)
    return m.group(1).replace('\\"', '"') if m else None


def live_title(path: pathlib.Path) -> str | None:
    """`<title>` out of a live capture."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    m = re.search(r"<title[^>]*>(.*?)</title>", raw, flags=re.S | re.I)
    return H.unescape(m.group(1)).strip() if m else None

# Keys in the content modules that are plumbing, not copy.
NOT_COPY = re.compile(r"^(kind|name|autoComplete|inputMode|type|rows|path)$")

# A string on the right of `===`/`!==` is a discriminant being compared, not
# copy — `field.kind === "checkboxes"`. Same class of false positive as the
# import specifiers skipped below.
COMPARISON = re.compile(r"[=!]==\s*$")

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
        if COMPARISON.search(src[: m.start()]):
            continue
        value = value.replace('\\"', '"').replace("\\\\", "\\").replace("\\n", "\n")
        # "./" matters: both modules open with `from "./brief-types"`, and that
        # specifier would otherwise be checked as copy and always miss.
        if value.startswith(("/", "http", "#", "@/", "./")):
            continue
        yield key or "", value


FIELD_TAG = re.compile(
    r'<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"', flags=re.I
)


def live_field_names(path: pathlib.Path):
    """Every name= the live FORM posts, [] stripped.

    Anchored on the control tags rather than a bare `name=` scan: `<meta
    name="viewport">` and friends are not form fields, and counting them made
    the check permanently unsatisfiable.
    """
    raw = path.read_text(encoding="utf-8", errors="replace")
    for name in FIELD_TAG.findall(raw):
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
    # Both `key: value` and shorthand `key,` — lib/validation.ts uses shorthand
    # for the shared `email`/`phone` primitives, and a colon-only pattern reads
    # those schemas as missing a field they validate. Anchored on 4 spaces —
    # the schema object's own indent level — not `\s*`: an unanchored pattern
    # also matches a nested key inside a chained `.refine(fn, { message: … })`,
    # which sits deeper. That over-read fails OPEN: a real content-module field
    # coincidentally named `message` would be reported as validated when it
    # is not.
    return set(re.findall(r"^ {4}(\w+)\s*[,:]", body, flags=re.M))


def check(page) -> tuple[bool, int]:
    """Returns (fatal, deviations). fatal means a file that must exist for
    this page to be checked at all — the live capture or the content module —
    does not; no comparison runs for that page. A missing build is not fatal:
    REVERSE alone is skipped and counted as one deviation."""
    slug = page["slug"]
    added = {fold(s) for s in ADDED[slug]}
    replaced = {fold(s) for s in REPLACED[slug]}

    fatal = False
    for path in (page["live"], page["module"]):
        if not path.is_file():
            print(f"MISSING: {path}")
            if path == page["live"]:
                print("  see the docstring for the capture command")
            fatal = True
    if fatal:
        return True, 0

    has_build = page["built"].is_file()

    live_text = f" {page_text(page['live'])} "

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
    if has_build:
        built_text = f" {page_text(page['built'])} "
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

    # ---- TITLE -------------------------------------------------------
    # The docstring and the plan both promise this: the live <title>, the
    # routes.ts entry for this path, and the content module's meta.title all
    # have to agree. Nothing enforced that until now — a change to any one of
    # the three would have gone undetected.
    live_t = live_title(page["live"])
    route_t = route_titles().get(f"/{slug}")
    module_t = module_title(page["module"])
    title_ok = live_t is not None and live_t == route_t == module_t
    title_mismatch = 0 if title_ok else 1

    print(f"\n== /{slug}")
    print(f"FORWARD  {checked} module strings checked against the live page")
    for key, value in forward_misses:
        print(f"       ! {key or '(anon)'}: {value[:110]}")
    if has_build:
        print(f"REVERSE  {runs} distinct live runs checked against the build")
        for run in reverse_misses:
            print(f"       ! {run[:110]}")
    else:
        print("REVERSE  skipped — no build (run `npm run build`)")
    print(f"FIELDS   {len(live_names)} live name= attributes")
    for name in dropped:
        print(f"       ! dropped: {name}")
    print(f"SCHEMA   {len(keys)} keys in {page['schema']}")
    for name in unvalidated:
        print(f"       ! not validated: {name}")
    print(f"ADDED    {len(ADDED[slug])} declared additions")
    if title_ok:
        print(f"TITLE    match — {live_t!r}")
    else:
        print(
            f"TITLE  ! mismatch — live={live_t!r} routes.ts={route_t!r} "
            f"meta.title={module_t!r}"
        )

    deviations = (
        len(forward_misses)
        + len(reverse_misses)
        + len(dropped)
        + len(unvalidated)
        + title_mismatch
    )
    if not has_build:
        deviations += 1
    return False, deviations


def main() -> int:
    if not VALIDATION.is_file():
        print(f"MISSING: {VALIDATION}")
        return 2
    if not ROUTES.is_file():
        print(f"MISSING: {ROUTES}")
        return 2
    any_fatal = False
    total = 0
    for p in PAGES:
        fatal, deviations = check(p)
        any_fatal = any_fatal or fatal
        total += deviations
    print(f"\n{total} deviation(s)")
    if any_fatal:
        return 2
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
