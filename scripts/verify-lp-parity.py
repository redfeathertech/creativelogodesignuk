"""Prove the /lp rebuild says everything the live page says.

    npm run build
    node scripts/capture-rendered.mjs https://creativelogodesign.co.uk/lp/ \
      page-source-lp.html
    python scripts/verify-lp-parity.py

Same two checks as `verify-ldo-parity.py`, and the same reasoning:

  FORWARD   every copy string in content/landing/lp.ts appears on the live
            page  ->  catches a rewording

  REVERSE   every text run on the live page appears in the prerendered
            .next/server/app/lp.html  ->  catches a drop

As with /logo-design-offer, "the live page" means its DOM after hydration: the
served HTML is a 3.8KB shell whose body is `<div id="root"></div>`, so `curl`
returns none of the copy. Captured with `scripts/capture-rendered.mjs`.

/lp is worse than /logo-design-offer in one specific way, and it is why the
CAROUSEL_ONLY list below is long: the page has a six-tab pricing strip AND a
four-slide project carousel AND a three-review carousel. A single capture can
only ever hold one pricing group, one project and two reviews. Everything the
capture cannot reach is listed here and was verified against the string
literals in the live bundle (`/lp/static/js/main.2c8a8db3.js`) by hand.

Exits non-zero on any unexplained deviation.
"""
import html as H
import pathlib
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = pathlib.Path(__file__).resolve().parent.parent
LIVE = REPO / "page-source-lp.html"
BUILT = REPO / ".next" / "server" / "app" / "lp.html"
MODULE = REPO / "content" / "landing" / "lp.ts"

# ---------------------------------------------------------------------------
# Strings the live DOM has no version of. Each is either a fix recorded in
# docs/CONTENT-PARITY.md or a value that is not copy at all.
# ---------------------------------------------------------------------------
AUTHORED = {
    # Labels for controls the live page renders unnamed.
    "Rated on Trustpilot",
    "Read our Trustpilot reviews",
    "Close",
    "Request a Quote",
    # Form outcome. The live page has no success state in the document — it
    # navigates the browser to thanks.php instead.
    "Thanks — your request is in.",
    # The three credibility marks, shipped as alt="Description 1..3".
    "Google Premier Partner",
    "Inc. 5000",
    "Forbes",
    # Award names, read off the badge artwork. The live page ships them as
    # alt="Logo 1" ... alt="Logo 7" and names none of them.
    "Best Design Awards 2022 — DesignRush",
    "CSS Design Awards",
    "Best Social Media Marketing Agencies — DesignRush",
    "CrowdReviews.com Top 25 for Web Development, based on client reviews",
    "Local Excellence 2023 Winner — Los Angeles",
    # Accessible names for the footer's three icon-only social links, which the
    # live page ships with no name at all. NB "Facebook", "LinkedIn" and
    # "Instagram" would pass the forward check anyway, but only by colliding
    # with the "Facebook Banner Design" / "LinkedIn Banner Design" package
    # features and the SMM posting lines — so all three are listed.
    "Facebook",
    "LinkedIn",
    "Instagram",
    # alt text for the four project screenshots. All four ship as the same
    # placeholder, alt="Project example".
    "Hospital management platform shown on a laptop",
    "Corporate website homepage shown on a laptop",
    "Online learning platform shown on a laptop",
    "Custom e-commerce storefront shown on a laptop",
    "Food delivery app shown on two phones",
    # Platform names for the marquee, whose live alt text is "React Logo",
    # "NOP Logo", "Woo Logo" and so on. Only the ones the live strings do not
    # already contain are listed; the rest pass FORWARD unchanged.
    "nopCommerce",
    "WooCommerce",
    "Vue.js",
}

NOT_COPY = re.compile(r"^(src|href|icon|id|width|height|image|addressHref)$|Href$|Alt$")

# ---------------------------------------------------------------------------
# Copy that IS on the live page, but only as pixels, so a captured DOM cannot
# contain it as text.
#
#   £199    saleprice.webp        the hero's headline price (alt="199")
#   £1199   inline base64 PNG     the All-In-One Combo price (alt="Combo Icon")
# ---------------------------------------------------------------------------
FROM_BITMAP = {"£199", "£1199"}

# ---------------------------------------------------------------------------
# Behind the project carousel, so absent from any single capture. Every entry
# was verified against the string literals in the live bundle.
#
# NB the six pricing tabs are NOT listed: react-bootstrap mounts every tab pane,
# so all eighteen cards are in the rendered DOM even though only three are
# visible. They are invisible to a *user* without a click, not to the capture.
# The project carousel is a `setInterval` that swaps one object for another, so
# it genuinely holds one slide at a time — hence the three below.
# ---------------------------------------------------------------------------
CAROUSEL_ONLY = {
    # Project slides 1, 3 and 4 (the capture caught slide 2).
    "Healthcare",
    "Management System",
    "The project focuses on creating a robust platform for hospitals, clinics, and healthcare providers to manage their operations and patient data securely. It features online appointment scheduling, secure patient record management compliant with HIPAA and GDPR, and telemedicine integrations for virtual consultations. The system includes doctor and department directories, automated reminders for follow-ups and prescriptions, and health tracking dashboards for patients.",
    "Learning",
    "Management System (LMS)",
    "This project involved developing an LMS for educational institutions and corporate training programs to deliver courses online. It includes user registration and role management, a searchable course catalog, interactive lessons with videos, quizzes, and assignments, and progress tracking. The system supports payment gateway integration, mobile-friendly design, and third-party tool integrations like Zoom and Google Meet for live sessions. Built with React, Node.js, and MongoDB, it offers a scalable and user-friendly platform for online learning.",
    "Custom E-commerce",
    "Website",
    "E-commerce platform designed to help businesses sell products or services online. The project features a unique design aligned with the brand identity, advanced product search and filtering, secure checkout, and streamlined inventory and order management. It includes integrations with CRM and ERP systems, supports multi-vendor functionality, and is SEO-optimized for enhanced online visibility and growth.",
}

# Live runs the rebuild deliberately does not reproduce.
REPLACED = {
    # ------------------------------------------------------------------
    # The old landline. The client replaced it site-wide with +44 7853 354207
    # (2026-08); every page, the JSON-LD and all four landing pages print the
    # new number from `contact` in content/site.ts. The live pages still show
    # the old one, so the reverse check sees it as dropped copy — it is a
    # deliberate business change, recorded in docs/CONTENT-PARITY.md.
    # ------------------------------------------------------------------
    "0204-511-2054",
    # Live placeholders. The rebuild gives every input a real <label> instead
    # (Field.tsx floats the label; a placeholder-only input fails WCAG 3.3.2),
    # and the module records the placeholders separately.
    "Enter your name*",
    "Enter your number*",
    "Enter your email*",
    "Your full name*",
    "E-mail address*",
    "Phone Number*",
    "Your message*",
    "Message",
    # The live "Submitting..." button state. The rebuild says "Sending…".
    "Submitting...",
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
        .replace(" ", " ")
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
