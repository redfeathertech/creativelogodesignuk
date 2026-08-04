# Brief Form Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the two remaining live PHP pages — `/website-brief/index.php` and `/logo-brief/index.php` — to static Next.js routes at `/website-brief` and `/logo-brief`, with every word of their copy preserved and one declared addition (an email field on the logo brief).

**Architecture:** Both render under the existing `app/(landing)/` route group, which supplies `<main id="main">` and no site chrome. All copy lives in two new `content/landing/*.ts` modules; two client form components consume shared presentational primitives; two new Server Actions reuse the existing guard/validate/mail pipeline. Correctness is enforced by a new two-directional parity script, not by unit tests — this repo has no test runner and its established verification pattern is `scripts/verify-*-parity.py` plus `npm run build`.

**Tech Stack:** Next.js 16.2.12 (App Router, Turbopack), React 19.2, TypeScript strict, Tailwind v4 (CSS-first, tokens in `app/globals.css`), zod 4, nodemailer, Python 3 for the parity scripts.

## Global Constraints

- **Layout is free to change. Content is not.** No body or heading copy, page title, meta description, or URL may change. See `docs/CONTENT-PARITY.md`.
- **Exactly one declared content change:** an Email Address field added to the logo brief after the name field. It is an addition — no existing string is edited, moved or removed.
- Live label text is transcribed **byte for byte**, including `Tell us about your business*` (no space before the asterisk) and the US spelling `Color Preferences`.
- All copy lives in `content/`, never inline in a component.
- Server Components by default; `"use client"` only on the two form components.
- Tailwind utilities only. No new hand-written CSS, no `tailwind.config.ts` (it does not exist — tokens are in the `@theme` block of `app/globals.css`).
- Every image goes through `next/image` with explicit `width`/`height`. `priority` is deprecated in Next 16 — use `preload`.
- Indent width is 4 (`.editorconfig`).
- `npm run build` must leave both new routes `○ (Static)`.
- Never edit an existing `path` in `content/routes.ts`.
- Responsive down to 320px is a requirement, not a nicety.

## File Structure

| File | Responsibility |
|---|---|
| `content/landing/website-brief.ts` | Create — all website-brief copy: meta, intro, sections, fields, options, submit label |
| `content/landing/logo-brief.ts` | Create — the same for the logo brief |
| `content/landing/brief-types.ts` | Create — the `BriefField` / `BriefSection` discriminated union shared by both modules |
| `scripts/verify-brief-parity.py` | Create — FORWARD + REVERSE parity, schema-key check, declared-addition allowlist |
| `content/routes.ts` | Modify — two entries in the landing block |
| `next.config.ts` | Modify — two 308 redirects |
| `docs/ROUTES.md` | Regenerate |
| `lib/validation.ts` | Modify — `websiteBriefSchema`, `logoBriefSchema` |
| `app/actions/forms.ts` | Modify — `submitWebsiteBrief`, `submitLogoBrief` |
| `components/landing/brief/fields.tsx` | Create — `BriefInput`, `BriefTextarea`, `BriefSelect`, `BriefCheckboxGroup` |
| `components/landing/brief/BriefShell.tsx` | Create — gradient canvas, white card, logo, title, intro |
| `components/landing/brief/WebsiteBriefForm.tsx` | Create — `"use client"` |
| `components/landing/brief/LogoBriefForm.tsx` | Create — `"use client"` |
| `app/(landing)/website-brief/page.tsx` | Create — metadata + JSON-LD + composition |
| `app/(landing)/logo-brief/page.tsx` | Create — the same |
| `.gitignore` | Already modified — the two `page-source-*.html` captures |

---

### Task 1: Reference captures and the parity script

The executable spec. It fails now and stays the gate for every later task.

**Files:**
- Create: `scripts/verify-brief-parity.py`
- Capture (gitignored): `page-source-website-brief.html`, `page-source-logo-brief.html`

**Interfaces:**
- Consumes: nothing.
- Produces: `python scripts/verify-brief-parity.py`, exit 0 only when both pages match. Later tasks are graded by it.

- [ ] **Step 1: Capture the live pages**

```bash
curl -sSL https://creativelogodesign.co.uk/website-brief/index.php -o page-source-website-brief.html
curl -sSL https://creativelogodesign.co.uk/logo-brief/index.php   -o page-source-logo-brief.html
```

Both are server-rendered plain HTML — no `capture-rendered.mjs` needed. Expect roughly 13.7 KB and 6.5 KB. They are already listed in `.gitignore`.

- [ ] **Step 2: Write the parity script**

Model it on `scripts/verify-seo-services-parity.py` — read that file first. Three differences matter, and they are the reason this cannot be a copy:

1. **Placeholders are copy on these pages.** The logo brief's visible text is almost entirely `placeholder=` attributes. `live_runs()` in the SEO script only yields text *between* tags, so it would check none of them. This script adds `live_attrs()` and folds those into REVERSE.
2. **`name=` attributes are a contract.** The team's inbox depends on them. The script asserts every live `name=` is still declared in the new content module.
3. **Two pages, one script**, driven by a table.

Create `scripts/verify-brief-parity.py`:

```python
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
```

- [ ] **Step 3: Run it to verify it fails**

```bash
python scripts/verify-brief-parity.py
```

Expected: `MISSING: …content/landing/website-brief.ts`, exit code 2. That is the red state — the script cannot pass until Tasks 2, 4, 6 and 7 land.

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-brief-parity.py
git commit -m "test: two-directional parity check for the two brief pages"
```

---

### Task 2: Content modules

**Files:**
- Create: `content/landing/brief-types.ts`
- Create: `content/landing/website-brief.ts`
- Create: `content/landing/logo-brief.ts`
- Test: `python scripts/verify-brief-parity.py` (FORWARD only — REVERSE still needs a build)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type BriefField`, `type BriefSection` from `brief-types.ts`
  - `meta: { title: string; description: string }`, `intro: { title: string; description?: string }`, `sections: BriefSection[]`, `submitLabel: string`, `successTitle: string` from each page module.
  - `CHECKBOX_OPTIONS: ReadonlyMap<string, ReadonlySet<string>>` from `website-brief.ts` — Task 4's server action matches against it.

- [ ] **Step 1: Write the shared types**

Create `content/landing/brief-types.ts`:

```ts
/**
 * Field descriptors for the two brief forms.
 *
 * These two pages are ~60 controls of pure copy between them, so the copy is
 * data rather than markup — that is what lets scripts/verify-brief-parity.py
 * diff two files instead of scraping rendered output.
 *
 * `label` and `placeholder` are transcribed byte for byte from the live pages,
 * including "Tell us about your business*" (no space before the asterisk) and
 * the US spelling "Color Preferences". Both rank; neither may be tidied.
 */

interface BriefFieldBase {
    /** The posted `name`. Must match the live form's own attribute. */
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
}

export type BriefField =
    | (BriefFieldBase & { kind: "text" | "email" | "tel" | "url" })
    | (BriefFieldBase & { kind: "textarea"; rows?: number })
    | (BriefFieldBase & { kind: "select"; options: readonly string[] })
    /** `name` carries the `[]` suffix the live form posts. */
    | (BriefFieldBase & { kind: "checkboxes"; options: readonly string[] });

export interface BriefSection {
    /** Rendered as an <h2>. The live pages use <h3> with no <h1> above it. */
    title: string;
    fields: readonly BriefField[];
}
```

The first entry of a `select`'s `options` is its empty-value placeholder
(`Select`, `Select stage`, …). `BriefFieldControl` in Task 5 gives that entry
`value=""` by index; nothing else needs to know.

- [ ] **Step 2: Write the website-brief module**

Create `content/landing/website-brief.ts`. Every string below is transcribed from `page-source-website-brief.html` — do not retype from memory, and do not correct anything.

```ts
import type { BriefSection } from "./brief-types";

/**
 * `/website-brief` — copy transcribed from the live
 * `https://creativelogodesign.co.uk/website-brief/index.php`.
 *
 * Required-versus-optional is taken from the live `js/script.js`, not from the
 * asterisks in the labels: the script requires client_name (min 3), company,
 * email, business_overview (min 5) and at least one website goal, and accepts
 * an empty phone but rejects one under 7 characters. Everything else is
 * optional. See docs/superpowers/specs/2026-08-04-brief-form-pages-design.md.
 */

export const meta = {
    title: "Website Brief Form",
    description:
        "Creative Logo Design is a UK based design agency specializing in custom logo design services. Our expert logo designers are ready to give your brand an identity.",
};

export const intro = {
    title: "Website Design Brief",
    description:
        "Please complete this form so we can better understand your business and website requirements.",
};

export const submitLabel = "Submit Website Brief";
export const successTitle = "Brief received";

export const sections: readonly BriefSection[] = [
    {
        title: "Client Details",
        fields: [
            {
                kind: "text",
                name: "client_name",
                label: "Full Name *",
                required: true,
                autoComplete: "name",
            },
            {
                kind: "text",
                name: "company",
                label: "Company Name *",
                required: true,
                autoComplete: "organization",
            },
            {
                kind: "email",
                name: "email",
                label: "Email Address *",
                required: true,
                autoComplete: "email",
            },
            {
                kind: "tel",
                name: "phone",
                label: "Phone / WhatsApp",
                autoComplete: "tel",
            },
        ],
    },
    {
        title: "Business Overview",
        fields: [
            {
                kind: "textarea",
                name: "business_overview",
                label: "Tell us about your business*",
                required: true,
                rows: 4,
            },
            {
                kind: "textarea",
                name: "products_services",
                label: "What products or services do you offer?",
                rows: 4,
            },
            {
                kind: "textarea",
                name: "business_difference",
                label: "What makes your business different from competitors?",
                rows: 4,
            },
            {
                kind: "select",
                name: "business_age",
                label: "How long have you been operating?",
                options: [
                    "Select",
                    "Less than 1 year",
                    "1-3 years",
                    "3-5 years",
                    "5-10 years",
                    "10+ years",
                ],
            },
        ],
    },
    {
        title: "Target Audience",
        fields: [
            {
                kind: "textarea",
                name: "ideal_customers",
                label: "Who are your ideal customers?",
                rows: 4,
            },
            {
                kind: "text",
                name: "locations_served",
                label: "Locations Served",
            },
            {
                kind: "text",
                name: "target_industries",
                label: "Target Industries",
            },
        ],
    },
    {
        title: "Website Goals *",
        fields: [
            {
                kind: "checkboxes",
                name: "website_goals[]",
                label: "Website Goals *",
                required: true,
                options: [
                    "Generate Leads",
                    "Receive Enquiries",
                    "Book Appointments",
                    "Sell Products Online",
                    "Showcase Portfolio",
                    "Build Brand Credibility",
                ],
            },
        ],
    },
    {
        title: "Services / Products",
        fields: [
            {
                kind: "textarea",
                name: "main_services_products",
                label: "List your main services or products",
                rows: 4,
            },
        ],
    },
    {
        title: "Competitors & Inspiration",
        fields: [
            { kind: "url", name: "competitor_1", label: "Competitor Website #1" },
            { kind: "url", name: "competitor_2", label: "Competitor Website #2" },
            { kind: "url", name: "competitor_3", label: "Competitor Website #3" },
            { kind: "url", name: "competitor_4", label: "Competitor Website #4" },
        ],
    },
    {
        title: "Website Features",
        fields: [
            {
                kind: "checkboxes",
                name: "website_features[]",
                label: "Website Features",
                options: [
                    "Contact Form",
                    "Online Booking",
                    "Online Payments",
                    "Quote Request Form",
                    "Gallery / Portfolio",
                    "Testimonials",
                    "Blog",
                    "Live Chat",
                    "Newsletter Signup",
                    "Membership Area",
                ],
            },
        ],
    },
    {
        title: "Pages Required",
        fields: [
            {
                kind: "checkboxes",
                name: "pages_required[]",
                label: "Pages Required",
                options: [
                    "Home",
                    "About Us",
                    "Services",
                    "Portfolio",
                    "Testimonials",
                    "Blog",
                    "FAQ",
                    "Contact",
                ],
            },
        ],
    },
    {
        title: "Additional Information",
        fields: [
            {
                kind: "textarea",
                name: "additional_notes",
                label: "Additional Notes",
                rows: 4,
            },
        ],
    },
];

/**
 * The three checkbox groups, as `Set`s the server action matches against.
 *
 * Same guard and the same reasoning as `LANDING_PACKAGES` in
 * `app/actions/forms.ts`: these values are visitor-editable and they land in an
 * email, so they are matched rather than echoed. Built from `sections` rather
 * than retyped, so adding an option can never leave it unrecognised. A `Map` of
 * `Set`s, not object literals — neither inherits `constructor`, which would
 * otherwise survive the membership test.
 */
export const CHECKBOX_OPTIONS: ReadonlyMap<string, ReadonlySet<string>> = new Map(
    sections
        .flatMap((section) => section.fields)
        .filter((field) => field.kind === "checkboxes")
        .map((field) => [field.name, new Set(field.options)] as const),
);
```

- [ ] **Step 3: Write the logo-brief module**

Create `content/landing/logo-brief.ts`. Note two things: the live page renders **one** section heading — `About You & Your Business`. Three more (`Your Vision & Preferences`, `Branding & Design Needs`, `Communication`) exist in the source but are HTML-commented out, so they are **not** live copy and must not be added. And the Email Address field is the one declared addition.

```ts
import type { BriefSection } from "./brief-types";

/**
 * `/logo-brief` — copy transcribed from the live
 * `https://creativelogodesign.co.uk/logo-brief/index.php`.
 *
 * TWO THINGS THAT LOOK LIKE MISTAKES AND ARE NOT:
 *
 * 1. One section heading, not four. The live source carries three more
 *    ("Your Vision & Preferences", "Branding & Design Needs",
 *    "Communication") commented out in the HTML, so they are not on the page
 *    and are not copy. Do not add them.
 * 2. "Color Preferences" is the live US spelling on an otherwise British site.
 *    The page ranks; the spelling stays.
 *
 * The `email` field is the ONE declared addition to either page — the live form
 * collects no email address, which is why it could never send a confirmation.
 * Declared in scripts/verify-brief-parity.py and approved 4 Aug 2026.
 *
 * Required-versus-optional is the live `js/script.js`: full_name (min 3),
 * business_name, business_description (min 5), business_stage, logo_style,
 * contact_method and contact_info (min 5). The live page marks none of them
 * visibly, so the rebuild marks them with `required` + `aria-required` and
 * changes no label text.
 */

export const meta = {
    title: "Logo Design Brief Form",
    description:
        "UK logo design brief form. Tell us about your business, your style preferences and how to reach you, and our designers will come back to you within one working day.",
};

export const intro = {
    title: "Logo Design Brief",
};

export const submitLabel = "Submit";
export const successTitle = "Brief received";

export const sections: readonly BriefSection[] = [
    {
        title: "About You & Your Business",
        fields: [
            {
                kind: "text",
                name: "full_name",
                label: "Your Full Name",
                placeholder: "Enter your full name",
                required: true,
                autoComplete: "name",
            },
            /* The declared addition. Placed after the name so the form still
               reads the way the live one does. */
            {
                kind: "email",
                name: "email",
                label: "Email Address",
                placeholder: "Enter your email address",
                required: true,
                autoComplete: "email",
            },
            {
                kind: "text",
                name: "business_name",
                label: "Business Name",
                placeholder: "Enter your business name",
                required: true,
                autoComplete: "organization",
            },
            {
                kind: "textarea",
                name: "business_description",
                label: "Business Description",
                placeholder: "Describe what your business does",
                required: true,
                rows: 4,
            },
            {
                kind: "select",
                name: "business_stage",
                label: "Business Stage",
                required: true,
                options: [
                    "Select stage",
                    "Starting Out",
                    "Growing Business",
                    "Established Business",
                ],
            },
            {
                kind: "text",
                name: "existing_presence",
                label: "Existing Website or Social Media",
                placeholder: "Website or social links (if any)",
            },
            {
                kind: "text",
                name: "brand_message",
                label: "Message or Feeling for the Logo",
                placeholder: "Example: Luxury, trust, reliability",
            },
            {
                kind: "text",
                name: "logo_inspiration",
                label: "Logos or Brands You Like",
                placeholder: "Share brands you like",
            },
            {
                kind: "select",
                name: "logo_style",
                label: "Logo Style Preference",
                required: true,
                options: [
                    "Select style",
                    "Icon + Text",
                    "Text Only",
                    "Icon Only",
                    "Badge / Emblem",
                ],
            },
            {
                kind: "text",
                name: "color_preferences",
                label: "Color Preferences",
                placeholder: "Example: Gold, Silver, Black",
            },
            {
                kind: "text",
                name: "font_preferences",
                label: "Font Preferences",
                placeholder: "Example: Elegant, Modern, Serif",
            },
            {
                kind: "text",
                name: "avoid",
                label: "Anything to Avoid",
                placeholder: "Example: Bright colours",
            },
            {
                kind: "text",
                name: "tagline",
                label: "Slogan / Tagline",
                placeholder: "Optional tagline",
            },
            {
                kind: "text",
                name: "logo_usage",
                label: "Main Logo Usage",
                placeholder: "Example: Website, uniforms, invoices",
            },
            {
                kind: "text",
                name: "branding_materials",
                label: "Other Branding Materials Needed",
                placeholder: "Example: Business cards, letterhead",
            },
            {
                kind: "select",
                name: "contact_method",
                label: "Preferred Contact Method",
                required: true,
                options: ["Select contact method", "WhatsApp", "Email", "Phone"],
            },
            {
                kind: "text",
                name: "contact_info",
                label: "Contact Information",
                placeholder: "Phone or email",
                required: true,
            },
            {
                kind: "select",
                name: "schedule_call",
                label: "Schedule a Quick Call?",
                options: ["Select option", "Yes", "No"],
            },
        ],
    },
];
```

- [ ] **Step 4: Run the parity check**

```bash
npx tsc --noEmit
python scripts/verify-brief-parity.py
```

Expected: `tsc` exits 0. The parity script now gets past the module check and reports **FORWARD 0 misses** for both pages, then stops at `MISSING: .next/server/app/website-brief.html` with exit 2 — the build has no such route yet. If FORWARD reports misses, a string was mistyped: fix the module, not the script.

- [ ] **Step 5: Commit**

```bash
git add content/landing/brief-types.ts content/landing/website-brief.ts content/landing/logo-brief.ts
git commit -m "feat: content modules for the website and logo brief pages"
```

---

### Task 3: Routes and redirects

**Files:**
- Modify: `content/routes.ts` — landing block, after the `/seo-services` entry
- Modify: `app/sitemap.ts:6` — the route-count comment
- Modify: `next.config.ts` — `redirects()`
- Modify: `docs/ROUTES.md` — regenerated, not hand-edited
- Test: `node scripts/gen-routes-table.mjs --check`

**Interfaces:**
- Consumes: nothing.
- Produces: `routeByPath.get("/website-brief")` and `routeByPath.get("/logo-brief")` resolve. Tasks 6 and 7 throw at module scope without them.

Nothing asserts that a route in `content/routes.ts` has a matching page file, so registering these two before the pages exist is safe — the sitemap lists them for one commit.

- [ ] **Step 1: Add the two route entries**

In `content/routes.ts`, immediately after the `/seo-services` entry and before the `/* ---- service hubs & children ---- */` divider:

```ts
    /* The two brief forms the sales team sends to clients. Live URLs are
       `/website-brief/index.php` and `/logo-brief/index.php`; like
       `/seo-services`, Next cannot serve a `.php` path from a static route
       folder, so the clean path is canonical and both `index.php` forms 308 to
       it (declared in next.config.ts). The slash forms need no entry —
       `trailingSlash: false` handles them.

       Indexed despite being intake forms: Search Console shows both ranking.
       Priority 0.7 rather than the other landing pages' 0.9 — they rank, but
       they are not where the ad spend points. */
    {
        path: "/website-brief",
        title: "Website Brief Form",
        group: "landing",
        indexable: true,
        priority: 0.7,
    },
    {
        path: "/logo-brief",
        title: "Logo Design Brief Form",
        group: "landing",
        indexable: true,
        priority: 0.7,
    },
```

`title` is each live `<title>` verbatim. The root layout's `%s | Creative Logo Design` template appends the suffix.

- [ ] **Step 2: Update the two stale route counts**

`content/routes.ts:14` reads `All 44 are \`true\``; `app/sitemap.ts:6` reads `All 44 now are`. Both become `46`.

- [ ] **Step 3: Add the redirects**

In `next.config.ts`, inside the array returned by `redirects()`, after the `/seo-services/index.php` entry:

```ts
            // The two brief forms' live URLs. Same reasoning as
            // `/seo-services/index.php` above: standalone PHP folders, so their
            // addresses carry a file name, and there is no PHP left on the site.
            {
                source: "/website-brief/index.php",
                destination: "/website-brief",
                permanent: true,
            },
            {
                source: "/logo-brief/index.php",
                destination: "/logo-brief",
                permanent: true,
            },
```

- [ ] **Step 4: Regenerate the routes table and verify**

```bash
node scripts/gen-routes-table.mjs
node scripts/gen-routes-table.mjs --check
npx tsc --noEmit
```

Expected: the generator reports 46 routes (6 landing), `--check` prints `docs/ROUTES.md is up to date.` and exits 0, `tsc` exits 0. If the generator reports `Parsed 44 of 46`, the new entries do not match its anchored regex — the key order must be exactly `path`, `title`, `group`, `indexable`.

- [ ] **Step 5: Commit**

```bash
git add content/routes.ts app/sitemap.ts next.config.ts docs/ROUTES.md
git commit -m "feat: register /website-brief and /logo-brief, 308 the index.php URLs"
```

---

### Task 4: Validation schemas and Server Actions

**Files:**
- Modify: `lib/validation.ts` — append after `seoEnquirySchema`
- Modify: `app/actions/forms.ts` — append after `submitSeoEnquiry`
- Test: `python scripts/verify-brief-parity.py` (SCHEMA and FIELDS sections)

**Interfaces:**
- Consumes: `BriefSection` and `CHECKBOX_OPTIONS` from Task 2; `guard(formData, action)`, `submissionMeta(formName)`, `GENERIC_ERROR`, `SUCCESS`, `firstNameOf(fullName)`, `sendAdminNotification`, `sendUserConfirmation`, `MailField` — all already in `app/actions/forms.ts` / `lib/mail.ts`.
- Produces:
  - `websiteBriefSchema`, `logoBriefSchema`, `WebsiteBriefInput`, `LogoBriefInput` from `lib/validation.ts`
  - `submitWebsiteBrief(prev: FormState, formData: FormData): Promise<FormState>`
  - `submitLogoBrief(prev: FormState, formData: FormData): Promise<FormState>`
  - reCAPTCHA action names `"website_brief"` and `"logo_brief"` — Tasks 6 and 7 must pass these to `<Recaptcha action=…>` or every submission is rejected.

- [ ] **Step 1: Add the schemas**

Append to `lib/validation.ts`, after `seoEnquirySchema`:

```ts
/* ---------------------------------------------- the two brief forms -- */

/** Optional single-line field. Longer cap than `optionalText`: these ask for
    lists of industries, locations and brand names, not job titles. */
const briefLine = z.string().trim().max(200).optional().or(z.literal(""));
/** Optional multi-line field. */
const briefBlock = z.string().trim().max(2000).optional().or(z.literal(""));

/**
 * `/website-brief`.
 *
 * Required-versus-optional is the live `js/script.js`, not the asterisks in the
 * labels — a visitor who can submit the live form can still submit this one.
 *
 * `client_name` is `z.string`, not the shared `name` primitive: the live check
 * is "at least 3 characters" and the field is asked as "Full Name", so a name
 * carrying a digit or an accent must not be rejected where it is accepted
 * today. Same for `phone`, which the live script accepts empty.
 *
 * The three checkbox arrays are NOT validated for membership here — the action
 * matches them against `CHECKBOX_OPTIONS` before they reach an email. This
 * schema only bounds their size.
 */
export const websiteBriefSchema = z.object({
    client_name: z.string().trim().min(3, "Please enter your full name").max(80),
    company: z.string().trim().min(1, "Company name is required").max(120),
    email,
    phone: z
        .string()
        .trim()
        .max(32)
        .refine((v) => v === "" || /^[+()\d\s-]{7,}$/.test(v), {
            message: "Enter a valid phone number",
        })
        .optional()
        .or(z.literal("")),
    business_overview: z
        .string()
        .trim()
        .min(5, "Please tell us about your business")
        .max(2000),
    products_services: briefBlock,
    business_difference: briefBlock,
    business_age: briefLine,
    ideal_customers: briefBlock,
    locations_served: briefLine,
    target_industries: briefLine,
    website_goals: z
        .array(z.string().max(60))
        .min(1, "Please select at least one website goal")
        .max(6),
    main_services_products: briefBlock,
    competitor_1: briefLine,
    competitor_2: briefLine,
    competitor_3: briefLine,
    competitor_4: briefLine,
    website_features: z.array(z.string().max(60)).max(10).optional().default([]),
    pages_required: z.array(z.string().max(60)).max(8).optional().default([]),
    additional_notes: briefBlock,
});

/**
 * `/logo-brief`.
 *
 * `email` is the one field the live form does not have — see
 * `content/landing/logo-brief.ts` for why it was added.
 *
 * `contact_info` is free text by design: the live field is labelled "Contact
 * Information" and placeheld "Phone or email", so it is bounded, not typed.
 */
export const logoBriefSchema = z.object({
    full_name: z.string().trim().min(3, "Please enter your full name").max(80),
    email,
    business_name: z.string().trim().min(1, "Business name is required").max(120),
    business_description: z
        .string()
        .trim()
        .min(5, "Please describe your business")
        .max(2000),
    business_stage: z.string().trim().min(1, "Please select business stage").max(60),
    existing_presence: briefLine,
    brand_message: briefLine,
    logo_inspiration: briefLine,
    logo_style: z.string().trim().min(1, "Please select logo style").max(60),
    color_preferences: briefLine,
    font_preferences: briefLine,
    avoid: briefLine,
    tagline: briefLine,
    logo_usage: briefLine,
    branding_materials: briefLine,
    contact_method: z
        .string()
        .trim()
        .min(1, "Please select contact method")
        .max(60),
    contact_info: z
        .string()
        .trim()
        .min(5, "Please enter contact information")
        .max(200),
    schedule_call: briefLine,
});

export type WebsiteBriefInput = z.infer<typeof websiteBriefSchema>;
export type LogoBriefInput = z.infer<typeof logoBriefSchema>;
```

- [ ] **Step 2: Add the Server Actions**

Add to the imports at the top of `app/actions/forms.ts`:

```ts
import {
    websiteBriefSchema,
    logoBriefSchema,
} from "@/lib/validation";
import {
    CHECKBOX_OPTIONS,
    sections as websiteBriefSections,
} from "@/content/landing/website-brief";
import { sections as logoBriefSections } from "@/content/landing/logo-brief";
```

Merge the two schema names into the existing `@/lib/validation` import rather than adding a second import statement.

Append to the end of `app/actions/forms.ts`:

```ts
/* --------------------------------------- /website-brief and /logo-brief -- */

/**
 * Keep only the checkbox values the page actually offers.
 *
 * Same guard and the same reasoning as `LANDING_PACKAGES` above: these arrive
 * from visitor-editable checkboxes and land in an email, so they are matched
 * against a `Set` built from the content module rather than echoed. A `Set`,
 * not an object literal — `"constructor"` would otherwise survive the test.
 * Unrecognised values are dropped silently; there is nothing useful to tell a
 * caller who is hand-crafting a POST.
 */
function allowedChoices(formData: FormData, field: string): string[] {
    const allowed = CHECKBOX_OPTIONS.get(field);
    if (!allowed) return [];
    return formData
        .getAll(field)
        .map(String)
        .filter((value) => allowed.has(value));
}

/**
 * Build the notification body in the page's own section order.
 *
 * Driven by the content module rather than a second hand-written list, so a
 * field cannot be added to a page and quietly go missing from the email. The
 * mail layer already drops empty values, so optional fields cost nothing.
 */
function briefFields(
    sections: readonly { fields: readonly { name: string; label: string }[] }[],
    values: Record<string, unknown>,
): MailField[] {
    return sections
        .flatMap((section) => section.fields)
        .map((field) => {
            const key = field.name.replace("[]", "");
            const value = values[key];
            return {
                label: field.label.replace(/\s*\*$/, ""),
                value: Array.isArray(value) ? value.join(", ") : String(value ?? ""),
            };
        });
}

/** `/website-brief` — the long website discovery form. */
export async function submitWebsiteBrief(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "website_brief");
    if (blocked) return blocked;

    const parsed = websiteBriefSchema.safeParse({
        client_name: formData.get("client_name"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        business_overview: formData.get("business_overview"),
        products_services: formData.get("products_services"),
        business_difference: formData.get("business_difference"),
        business_age: formData.get("business_age"),
        ideal_customers: formData.get("ideal_customers"),
        locations_served: formData.get("locations_served"),
        target_industries: formData.get("target_industries"),
        website_goals: allowedChoices(formData, "website_goals[]"),
        main_services_products: formData.get("main_services_products"),
        competitor_1: formData.get("competitor_1"),
        competitor_2: formData.get("competitor_2"),
        competitor_3: formData.get("competitor_3"),
        competitor_4: formData.get("competitor_4"),
        website_features: allowedChoices(formData, "website_features[]"),
        pages_required: allowedChoices(formData, "pages_required[]"),
        additional_notes: formData.get("additional_notes"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const d = parsed.data;
    /* `sendAdminNotification` builds its subject from the "Name" field, so the
       brief's own "Full Name" label is restated here rather than relied on. */
    const fields: MailField[] = [
        { label: "Name", value: d.client_name },
        ...briefFields(websiteBriefSections, d),
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: "New website brief",
                fields,
                meta: await submissionMeta("Website brief form"),
                replyTo: d.email,
            }),
            sendUserConfirmation({
                to: d.email,
                firstName: firstNameOf(d.client_name),
            }),
        ]);
    } catch (error) {
        console.error("[forms] website brief delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}

/** `/logo-brief` — the logo discovery form. */
export async function submitLogoBrief(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "logo_brief");
    if (blocked) return blocked;

    const parsed = logoBriefSchema.safeParse({
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        business_name: formData.get("business_name"),
        business_description: formData.get("business_description"),
        business_stage: formData.get("business_stage"),
        existing_presence: formData.get("existing_presence"),
        brand_message: formData.get("brand_message"),
        logo_inspiration: formData.get("logo_inspiration"),
        logo_style: formData.get("logo_style"),
        color_preferences: formData.get("color_preferences"),
        font_preferences: formData.get("font_preferences"),
        avoid: formData.get("avoid"),
        tagline: formData.get("tagline"),
        logo_usage: formData.get("logo_usage"),
        branding_materials: formData.get("branding_materials"),
        contact_method: formData.get("contact_method"),
        contact_info: formData.get("contact_info"),
        schedule_call: formData.get("schedule_call"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const d = parsed.data;
    const fields: MailField[] = [
        { label: "Name", value: d.full_name },
        ...briefFields(logoBriefSections, d),
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: "New logo design brief",
                fields,
                meta: await submissionMeta("Logo brief form"),
                replyTo: d.email,
            }),
            sendUserConfirmation({
                to: d.email,
                firstName: firstNameOf(d.full_name),
            }),
        ]);
    } catch (error) {
        console.error("[forms] logo brief delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}
```

Note `firstNameOf` is declared partway down the file, above `submitLandingQuote`; it is a `const` arrow function, so these appended callers see it fine at call time.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run lint
python scripts/verify-brief-parity.py
```

Expected: `tsc` and `lint` exit 0. The parity script still stops at `MISSING: .next/server/app/website-brief.html`, but if you comment nothing out and simply read its output after Task 6, the `SCHEMA` line must report **0 "not validated"** entries for both pages. To check that now without a build, run:

```bash
python -c "import runpy,sys; m=runpy.run_path('scripts/verify-brief-parity.py'); print(sorted(set(m['module_field_names'](m['PAGES'][0]['module'])) - m['schema_keys']('websiteBriefSchema'))); print(sorted(set(m['module_field_names'](m['PAGES'][1]['module'])) - m['schema_keys']('logoBriefSchema')))"
```

Expected: two empty lists. A non-empty list names a field the form posts and the schema drops.

- [ ] **Step 4: Commit**

```bash
git add lib/validation.ts app/actions/forms.ts
git commit -m "feat: validation and server actions for the two brief forms"
```

---

### Task 5: Presentational primitives

**Files:**
- Create: `components/landing/brief/fields.tsx`
- Create: `components/landing/brief/BriefShell.tsx`

**Interfaces:**
- Consumes: `BriefField` from `content/landing/brief-types`, `cn` from `@/lib/cn`.
- Produces, all default-exported from `fields.tsx` as named exports:
  - `BriefFieldControl({ field, errors }: { field: BriefField; errors?: string[] })` — renders label + control + error for any `BriefField` kind.
  - `BriefSectionBlock({ section, errors }: { section: BriefSection; errors?: Record<string, string[]> })` — heading + its fields.
  - `BriefShell({ title, description, children }: { title: string; description?: string; children: React.ReactNode })` from `BriefShell.tsx`.

Both files are server-safe (no `"use client"`); they are imported by the client form components, which is fine — a Server Component module rendered inside a Client Component becomes part of the client bundle, and these carry no server-only imports.

- [ ] **Step 1: Write the shell**

Create `components/landing/brief/BriefShell.tsx`:

```tsx
import Image from "next/image";

/**
 * The card both brief pages sit in.
 *
 * The live pages are a white card on a violet gradient with no header, footer
 * or navigation — deliberate: these are links the sales team sends to a named
 * client, and every exit is the submit button. That shape is kept; what
 * changes is that it is now built on the site's own tokens rather than a
 * standalone stylesheet, and the logo is a real `next/image` rather than an
 * unsized `<img>`.
 *
 * `<h1>` here, `<h2>` per section. The live pages open at `<h2>` and use `<h3>`
 * for sections, with no `<h1>` at all. Heading LEVELS may change where the text
 * does not — see docs/CONTENT-PARITY.md.
 */
export default function BriefShell({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,var(--color-violet-500)_0%,var(--color-ink-900)_100%)] px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-[0_30px_80px_-30px_rgb(7_2_15/0.6)] sm:p-10">
                <div className="flex justify-center">
                    <Image
                        src="/assets/img/logo.webp"
                        alt="Creative Logo Design"
                        width={220}
                        height={56}
                        preload
                        className="h-11 w-auto"
                    />
                </div>

                <h1 className="mt-6 text-center font-display text-h4 font-bold text-onlight">
                    {title}
                </h1>

                {description && (
                    <p className="mx-auto mt-3 max-w-xl text-center text-sm text-onlight-muted">
                        {description}
                    </p>
                )}

                <div className="mt-8">{children}</div>
            </div>
        </div>
    );
}
```

`font-display`, `text-h4`, `text-onlight`, `text-onlight-muted`, `mist-*`, `magenta-*`, `violet-500` and `ink-900` are all defined in the `@theme` block of `app/globals.css` (lines 13–120). Do not add a token.

- [ ] **Step 2: Write the field primitives**

Create `components/landing/brief/fields.tsx`:

```tsx
import { cn } from "@/lib/cn";
import type { BriefField, BriefSection } from "@/content/landing/brief-types";

/**
 * Controls for the two brief pages.
 *
 * Deliberately NOT `components/forms/Field.tsx`: that is a floating-label
 * control on dark glass, sized for four-field forms. These two pages render
 * about sixty controls on a white card with static labels above each input.
 * Reusing it would mean threading a tone and a label-position variant through a
 * component three other forms depend on.
 *
 * Labels are rendered exactly as the content module gives them, asterisks
 * included. Where the live page marks nothing — the whole logo brief — the
 * field gets `required`/`aria-required` and no visible change.
 */

const control =
    "w-full min-w-0 rounded-lg border border-mist-300 bg-white px-3.5 py-2.5 text-sm text-onlight " +
    "placeholder:text-mist-500 focus:border-magenta-500 focus:outline-none " +
    "focus:ring-2 focus:ring-magenta-500/30 disabled:opacity-50";

const invalid = "border-red-500 focus:border-red-500 focus:ring-red-500/30";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-onlight">
            {children}
        </label>
    );
}

function Errors({ id, errors }: { id: string; errors?: string[] }) {
    if (!errors?.length) return null;
    return (
        <p id={id} className="mt-1.5 text-xs text-red-600">
            {errors[0]}
        </p>
    );
}

export function BriefFieldControl({
    field,
    errors,
}: {
    field: BriefField;
    errors?: string[];
}) {
    const id = `brief-${field.name.replace("[]", "")}`;
    const errorId = `${id}-error`;
    const bad = Boolean(errors?.length);
    const described = bad ? errorId : undefined;

    if (field.kind === "checkboxes") {
        return (
            <fieldset>
                <legend className="text-sm font-semibold text-onlight">
                    {field.label}
                </legend>
                <div
                    className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3"
                    aria-describedby={described}
                >
                    {field.options.map((option) => (
                        <label
                            key={option}
                            className="flex min-w-0 items-center gap-2.5 text-sm text-onlight"
                        >
                            <input
                                type="checkbox"
                                name={field.name}
                                value={option}
                                className="size-4 shrink-0 accent-magenta-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta-500/40"
                            />
                            <span className="min-w-0">{option}</span>
                        </label>
                    ))}
                </div>
                <Errors id={errorId} errors={errors} />
            </fieldset>
        );
    }

    return (
        <div>
            <Label htmlFor={id}>{field.label}</Label>
            <div className="mt-1.5">
                {field.kind === "textarea" ? (
                    <textarea
                        id={id}
                        name={field.name}
                        rows={field.rows ?? 4}
                        placeholder={field.placeholder}
                        required={field.required}
                        aria-required={field.required}
                        aria-invalid={bad || undefined}
                        aria-describedby={described}
                        className={cn(control, "resize-y", bad && invalid)}
                    />
                ) : field.kind === "select" ? (
                    <select
                        id={id}
                        name={field.name}
                        required={field.required}
                        aria-required={field.required}
                        aria-invalid={bad || undefined}
                        aria-describedby={described}
                        defaultValue=""
                        className={cn(control, "appearance-none pr-9", bad && invalid)}
                    >
                        {field.options.map((option, index) => (
                            <option
                                key={option}
                                value={index === 0 ? "" : option}
                                disabled={index === 0 && field.required}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={id}
                        type={field.kind}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        aria-required={field.required}
                        aria-invalid={bad || undefined}
                        aria-describedby={described}
                        autoComplete={field.autoComplete}
                        className={cn(control, bad && invalid)}
                    />
                )}
            </div>
            <Errors id={errorId} errors={errors} />
        </div>
    );
}

/**
 * A section and its fields.
 *
 * The "Website Goals *" section on the website brief is a heading whose only
 * child is a checkbox group carrying the same label, so the group's `<legend>`
 * is hidden from sight there — rendering both would show the words twice. It
 * stays in the accessibility tree via sr-only, so the group is still named.
 */
export function BriefSectionBlock({
    section,
    errors,
}: {
    section: BriefSection;
    errors?: Record<string, string[]>;
}) {
    const duplicateLegend =
        section.fields.length === 1 && section.fields[0].label === section.title;

    return (
        <section className="mt-9 first:mt-0">
            <h2 className="border-b border-mist-200 pb-2 font-display text-lg font-bold text-onlight">
                {section.title}
            </h2>
            <div className={cn("mt-5 grid gap-5", duplicateLegend && "[&_legend]:sr-only")}>
                {section.fields.map((field) => (
                    <BriefFieldControl
                        key={field.name}
                        field={field}
                        errors={errors?.[field.name.replace("[]", "")]}
                    />
                ))}
            </div>
        </section>
    );
}
```

`min-w-0` on the grid children is not decoration: grid and flex items default to `min-width: auto` and refuse to shrink below their longest word, which is the cause of essentially every horizontal-overflow bug on this site. The checkbox labels ("Build Brand Credibility") are exactly the kind of content that triggers it at 320px.

- [ ] **Step 3: Verify it compiles**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit 0. Nothing renders these yet.

- [ ] **Step 4: Commit**

```bash
git add components/landing/brief/fields.tsx components/landing/brief/BriefShell.tsx
git commit -m "feat: shared card and field primitives for the brief pages"
```

---

### Task 6: The `/website-brief` page

**Files:**
- Create: `components/landing/brief/WebsiteBriefForm.tsx`
- Create: `app/(landing)/website-brief/page.tsx`
- Test: `npm run build` then `python scripts/verify-brief-parity.py`

**Interfaces:**
- Consumes: `submitWebsiteBrief` (Task 4), the `website-brief` content module (Task 2), `BriefShell`/`BriefSectionBlock` (Task 5), `routeByPath` (Task 3), and the existing `buildMetadata`, `pageGraph`, `JsonLd`, `FormStatus`, `HoneypotFields`, `useFormEngagement`, `Recaptcha`, `btn`.
- Produces: a prerendered `/website-brief` route. Task 8 audits it.

- [ ] **Step 1: Write the form component**

Create `components/landing/brief/WebsiteBriefForm.tsx`:

```tsx
"use client";

import { useActionState } from "react";

import { submitWebsiteBrief } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import {
    FormStatus,
    HoneypotFields,
    useFormEngagement,
} from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { BriefSectionBlock } from "@/components/landing/brief/fields";
import { sections, submitLabel, successTitle } from "@/content/landing/website-brief";

/**
 * The website brief's nineteen fields and three checkbox groups.
 *
 * Everything visible is driven by `sections`, so the copy has exactly one home
 * and scripts/verify-brief-parity.py has one file to diff.
 *
 * The `action` passed to `<Recaptcha>` MUST stay `website_brief` — it is what
 * `submitWebsiteBrief` asks siteverify to echo back, and a mismatch rejects
 * every submission with a message that blames the visitor's browser.
 */
export default function WebsiteBriefForm() {
    const [state, formAction, pending] = useActionState(
        submitWebsiteBrief,
        initialFormState,
    );
    const { engaged, engagementProps } = useFormEngagement();

    if (state.status === "success") {
        return (
            <div className="rounded-xl border border-emerald-600/40 bg-emerald-50 p-6 text-center">
                <p className="font-display text-lg font-bold text-onlight">
                    {successTitle}
                </p>
                <p className="mt-2 text-sm text-onlight-muted">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative" {...engagementProps}>
            <HoneypotFields />

            {sections.map((section) => (
                <BriefSectionBlock
                    key={section.title}
                    section={section}
                    errors={state.errors}
                />
            ))}

            <div className="mt-8 grid gap-4">
                <Recaptcha active={engaged} action="website_brief" />
                <FormStatus state={state} tone="light" />
                <button
                    type="submit"
                    disabled={pending}
                    className={btn("primary", "lg", "w-full")}
                >
                    {pending ? "Sending…" : submitLabel}
                </button>
            </div>
        </form>
    );
}
```

- [ ] **Step 2: Write the page**

Create `app/(landing)/website-brief/page.tsx`:

```tsx
import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { intro, meta } from "@/content/landing/website-brief";
import BriefShell from "@/components/landing/brief/BriefShell";
import WebsiteBriefForm from "@/components/landing/brief/WebsiteBriefForm";

const PATH = "/website-brief";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Website Design Brief", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * The live page canonicals to the **homepage**. That is the same bug the other
 * four landing pages shipped and the client confirmed on 1 Aug 2026 is not to
 * be carried over — see docs/SEO-PLAYBOOK.md. Self-canonical here.
 *
 * The description is the live `<meta name="description">` verbatim.
 */
export const metadata: Metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: PATH,
    index: route.indexable,
});

export default function WebsiteBriefPage() {
    return (
        <>
            <JsonLd data={pageGraph(PATH, route.title, meta.description, TRAIL)} />
            <BriefShell title={intro.title} description={intro.description}>
                <WebsiteBriefForm />
            </BriefShell>
        </>
    );
}
```

`pageGraph` is positional — `(path, title, description, trail, extraNodes?)`, see `lib/seo.ts:230`. It normalises the title suffix itself, so passing `route.title` bare is correct. No `extraNodes`: a `WebPage` and a breadcrumb are all these pages warrant, and there is no schema type for "a form".

- [ ] **Step 3: Build and run the parity check**

```bash
npx next typegen
npm run build
python scripts/verify-brief-parity.py
```

Expected from the build: `/website-brief` listed as `○ (Static)`. Expected from the parity script: the `== /website-brief` block reports FORWARD 0, REVERSE 0, FIELDS 0 dropped, SCHEMA 0 unvalidated. `/logo-brief` still reports `MISSING` — that is Task 7.

If REVERSE names a string, do not add it to `ADDED` in the script. `ADDED` is the list of *approved* differences and has exactly one entry for a reason; a new miss means the page dropped copy.

- [ ] **Step 4: Commit**

```bash
git add components/landing/brief/WebsiteBriefForm.tsx "app/(landing)/website-brief/page.tsx"
git commit -m "feat: /website-brief"
```

---

### Task 7: The `/logo-brief` page

**Files:**
- Create: `components/landing/brief/LogoBriefForm.tsx`
- Create: `app/(landing)/logo-brief/page.tsx`
- Test: `npm run build` then `python scripts/verify-brief-parity.py`

**Interfaces:**
- Consumes: `submitLogoBrief` (Task 4), the `logo-brief` content module (Task 2), the Task 5 primitives.
- Produces: a prerendered `/logo-brief` route.

- [ ] **Step 1: Write the form component**

Create `components/landing/brief/LogoBriefForm.tsx`. It is the website brief's twin with three differences: a different action, a different reCAPTCHA action name, and a different content module. The code is repeated rather than shared because the two differ only in imports and would need a props-drilling wrapper to unify — not worth it for two call sites.

```tsx
"use client";

import { useActionState } from "react";

import { submitLogoBrief } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import {
    FormStatus,
    HoneypotFields,
    useFormEngagement,
} from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { BriefSectionBlock } from "@/components/landing/brief/fields";
import { sections, submitLabel, successTitle } from "@/content/landing/logo-brief";

/**
 * The logo brief's eighteen fields, one section.
 *
 * The `action` passed to `<Recaptcha>` MUST stay `logo_brief` — it is what
 * `submitLogoBrief` asks siteverify to echo back.
 */
export default function LogoBriefForm() {
    const [state, formAction, pending] = useActionState(
        submitLogoBrief,
        initialFormState,
    );
    const { engaged, engagementProps } = useFormEngagement();

    if (state.status === "success") {
        return (
            <div className="rounded-xl border border-emerald-600/40 bg-emerald-50 p-6 text-center">
                <p className="font-display text-lg font-bold text-onlight">
                    {successTitle}
                </p>
                <p className="mt-2 text-sm text-onlight-muted">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative" {...engagementProps}>
            <HoneypotFields />

            {sections.map((section) => (
                <BriefSectionBlock
                    key={section.title}
                    section={section}
                    errors={state.errors}
                />
            ))}

            <div className="mt-8 grid gap-4">
                <Recaptcha active={engaged} action="logo_brief" />
                <FormStatus state={state} tone="light" />
                <button
                    type="submit"
                    disabled={pending}
                    className={btn("primary", "lg", "w-full")}
                >
                    {pending ? "Sending…" : submitLabel}
                </button>
            </div>
        </form>
    );
}
```

- [ ] **Step 2: Write the page**

Create `app/(landing)/logo-brief/page.tsx`:

```tsx
import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { intro, meta } from "@/content/landing/logo-brief";
import BriefShell from "@/components/landing/brief/BriefShell";
import LogoBriefForm from "@/components/landing/brief/LogoBriefForm";

const PATH = "/logo-brief";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Logo Design Brief", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * Self-canonical, like every other rebuilt page — the live one points at the
 * homepage. This is also the first version of the page with a meta description:
 * the live `<head>` is a title, a viewport, three OG tags and that canonical.
 */
export const metadata: Metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: PATH,
    index: route.indexable,
});

export default function LogoBriefPage() {
    return (
        <>
            <JsonLd data={pageGraph(PATH, route.title, meta.description, TRAIL)} />
            <BriefShell title={intro.title}>
                <LogoBriefForm />
            </BriefShell>
        </>
    );
}
```

- [ ] **Step 3: Build and run the full parity check**

```bash
npx next typegen
npm run build
python scripts/verify-brief-parity.py
```

Expected: both routes `○ (Static)`; the script prints two blocks, `0 deviation(s)`, and exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/landing/brief/LogoBriefForm.tsx "app/(landing)/logo-brief/page.tsx"
git commit -m "feat: /logo-brief, with the declared email address field"
```

---

### Task 8: Responsive audit and final verification

**Files:**
- Modify: whichever of the Task 5 / 6 / 7 files the audit implicates
- Modify: `docs/PROGRESS.md` — mark the port complete
- Modify: `AGENTS.md:32` — `43 URLs` is stale

**Interfaces:**
- Consumes: everything above.
- Produces: a shippable branch.

- [ ] **Step 1: Serve the production build**

```bash
npm run build
npx next start -p 3100
```

Leave it running in a second shell.

- [ ] **Step 2: Audit both pages across 12 widths**

```bash
node scripts/audit-responsive.mjs http://127.0.0.1:3100 /website-brief
node scripts/audit-responsive.mjs http://127.0.0.1:3100 /logo-brief
```

Expected: no horizontal overflow at any width, 320 included. The likely offenders, in order: a checkbox label that will not wrap (fix with `min-w-0` on the grid child — the default `min-width: auto` is why), the `max-w-3xl` card against `px-4`, and `<select>` option text on narrow viewports.

- [ ] **Step 3: Check the two pages by eye at 320px and 1440px**

Confirm: the logo is not stretched; labels are legible against white (the `text-onlight` token, not a `/40` white); focus rings are visible on every control including checkboxes; the submit button is full-width and reachable.

- [ ] **Step 4: Update the two stale counts in the docs**

`AGENTS.md:32` says `Any of the 43 URLs` — it is now 46. In `docs/PROGRESS.md`, move the two brief pages into the completed set and add the two capture commands to the "Reference material" table:

```markdown
| `page-source-website-brief.html` (repo root) | The **live** `/website-brief/index.php`. Server-rendered, so a plain fetch is enough. Read by `scripts/verify-brief-parity.py`. Gitignored; re-capture with `curl -sSL https://creativelogodesign.co.uk/website-brief/index.php -o page-source-website-brief.html` |
| `page-source-logo-brief.html` (repo root) | The **live** `/logo-brief/index.php`. Same. Re-capture with `curl -sSL https://creativelogodesign.co.uk/logo-brief/index.php -o page-source-logo-brief.html` |
```

- [ ] **Step 5: Run the full verification sweep**

```bash
npx tsc --noEmit
npm run lint
npm run build
node scripts/gen-routes-table.mjs --check
python scripts/verify-content-parity.py
python scripts/verify-landing-parity.py
python scripts/verify-ldo-parity.py
python scripts/verify-lp-parity.py
python scripts/verify-seo-services-parity.py
python scripts/verify-brief-parity.py
```

Every one must exit 0. The five pre-existing parity scripts are in the list because Task 4 edited `lib/validation.ts` and `app/actions/forms.ts`, which the other landing pages share.

- [ ] **Step 6: Commit**

```bash
git add docs/PROGRESS.md AGENTS.md components/landing/brief
git commit -m "chore: responsive fixes and docs for the two brief pages"
```

---

## Verification Summary

| Check | Command | Gate |
|---|---|---|
| Types | `npx tsc --noEmit` | exit 0 |
| Lint | `npm run lint` | exit 0 |
| Build | `npm run build` | both routes `○ (Static)` |
| Routes table | `node scripts/gen-routes-table.mjs --check` | 46 routes, up to date |
| Content parity | `python scripts/verify-brief-parity.py` | `0 deviation(s)` |
| Regression | the other five `verify-*.py` | exit 0 |
| Responsive | `node scripts/audit-responsive.mjs …` ×2 | no overflow at 320px |

## Known Interim States

- After Task 3 the sitemap lists two URLs whose pages do not exist yet. Nothing asserts route-to-file correspondence, so the build passes; Tasks 6 and 7 close it.
- The parity script exits 2 (not 1) until a build exists. That is `MISSING`, not a failure of parity.
- SMTP is not configured locally. `lib/mail.ts` logs the payload instead of throwing, so a local submit succeeds and prints the email — that is the expected local behaviour, not a bug.
