"""Prove the /seo-services rebuild says everything the live page says — except
what it was deliberately changed to stop saying.

    npm run build
    curl -sSL https://creativelogodesign.co.uk/seo-services/index.php \
      -o page-source-seo-services.html
    python scripts/verify-seo-services-parity.py

Same two directions as the other three landing-page checks:

  FORWARD   every copy string in content/landing/seo-services.ts appears on the
            live page  ->  catches an accidental rewording

  REVERSE   every text run on the live page appears in the prerendered
            .next/server/app/seo-services.html  ->  catches a drop

Unlike /logo-design-offer and /lp, the live page is server-rendered: `curl`
returns the whole document, so no headless capture is needed.

WHAT MAKES THIS PAGE DIFFERENT
------------------------------
The other three checks allow a handful of fixes. This one allows a *rebrand*,
because the live page is an un-rebranded third-party template: it names another
agency ("TinyBull") ten times, prices in US dollars, names its tiers after bull
breeds, and quotes US geography and US healthcare law.

That is only defensible because the page has no ranking equity to lose — it
canonicals to the homepage, ships no meta description and no robots tag, and
has never ranked in its own right. See docs/CONTENT-PARITY.md.

So REBRAND below is the *whole* list of deliberate wording changes, and it is
the point of this file: a string that changes without an entry here fails the
check in both directions. Approved 3 Aug 2026.

Exits non-zero on any unexplained deviation.
"""
import html as H
import pathlib
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = pathlib.Path(__file__).resolve().parent.parent
LIVE = REPO / "page-source-seo-services.html"
BUILT = REPO / ".next" / "server" / "app" / "seo-services.html"
MODULE = REPO / "content" / "landing" / "seo-services.ts"

# ---------------------------------------------------------------------------
# British/American spelling is folded rather than enumerated.
#
# The live page is US English end to end; the rest of this site is British (178
# -ise/-isation against 56 -ize/-ization across content/). Converting the page
# is part of the rebrand, but listing forty mechanical -ize -> -ise swaps would
# bury the ten changes that actually alter meaning. Both sides normalise to the
# American form before comparison, exactly as content/services/index.ts already
# folds -ise/-ize out of its title check.
#
# Applied word-wise after folding, so "size" and "prize" are never touched.
# ---------------------------------------------------------------------------
SPELLING = {
    "optimisation": "optimization",
    "optimisations": "optimizations",
    "optimise": "optimize",
    "optimised": "optimized",
    "optimises": "optimizes",
    "optimising": "optimizing",
    "canonicalisation": "canonicalization",
    "specialise": "specialize",
    "specialised": "specialized",
    "specialises": "specializes",
    "specialising": "specializing",
    "speciality": "specialty",
    "specialities": "specialties",
    "analyse": "analyze",
    "analysed": "analyzed",
    "analyses": "analyzes",
    "analysing": "analyzing",
    "organisation": "organization",
    "organise": "organize",
    "customise": "customize",
    "customised": "customized",
    "behaviour": "behavior",
    "behaviours": "behaviors",
    "colour": "color",
    "colours": "colors",
    "centre": "center",
    "catalogue": "catalog",
}

# ---------------------------------------------------------------------------
# THE REBRAND. live wording -> rebuild wording.
#
# Every entry is a deliberate change recorded in docs/CONTENT-PARITY.md. The
# FORWARD pass skips the right-hand side; the REVERSE pass skips the left.
# Both sides are folded before use, so punctuation and case do not matter.
# ---------------------------------------------------------------------------
REBRAND = {
    # -- the template agency's name, all ten occurrences --------------------
    "Don’t see what you need? TinyBull provides fully custom SEO plans!":
        "Don't see what you need? Creative Logo Design provides fully custom SEO plans!",
    "— TINYBULL SEO TEAM": "— CREATIVE LOGO DESIGN SEO TEAM",
    "THE TINYBULL APPROACH": "OUR APPROACH",
    "WHY TINYBULL": "WHY CREATIVE LOGO DESIGN",
    "THE TINYBULL DIFFERENCE": "THE CREATIVE LOGO DESIGN DIFFERENCE",
    "THE TINYBULL EXPERIENCE": "THE CREATIVE LOGO DESIGN EXPERIENCE",
    "Effective SEO has three interconnected pillars. Neglect any one of them and your "
    "rankings suffer. TinyBull builds all three simultaneously — which is why our clients "
    "see lasting results instead of short-term spikes.":
        "Effective SEO has three interconnected pillars. Neglect any one of them and your "
        "rankings suffer. We build all three simultaneously — which is why our clients "
        "see lasting results instead of short-term spikes.",
    "Big agencies charge big agency prices and assign your account to a junior account "
    "manager you've never met. TinyBull is different — and we think that difference matters.":
        "Big agencies charge big agency prices and assign your account to a junior account "
        "manager you've never met. We're different — and we think that difference matters.",
    "New to SEO or looking to outrank your competition? Either way, TinyBull can help. "
    "Get started today or run a free SEO report on your site.":
        "New to SEO or looking to outrank your competition? Either way, we can help. "
        "Get started today or run a free SEO report on your site.",
    # The footer's entire About paragraph is an explanation of the template
    # agency's name. There is no version of it that survives the rebrand.
    "Some of you may be wondering, what is TinyBull? Well, a bull is symbolic for "
    "determination, strength, and helpfulness. Like a bull, we have the skills and "
    "determination needed to help your business succeed.":
        "Creative Logo Design is a UK-based full-service design & development agency "
        "delivering web design, logo design, branding & digital marketing solutions.",

    # -- the bull wordplay the tier names hung off --------------------------
    "PICK YOUR BULL": "CHOOSE YOUR PLAN",
    # Keyed on the second half only: the live <h2> carries a <br>, so `live_runs`
    # yields the two halves separately, and the module splits them the same way
    # into titleLead/titleTrail. "Straightforward Pricing." is unchanged and
    # passes both directions on its own.
    "No Hidden Fees. No Bull.": "No Hidden Fees. No Surprises.",
    "All plans are month-to-month. No long-term contracts. No bull.":
        "All plans are month-to-month. No long-term contracts. No surprises.",

    # -- pricing tiers, named after bull breeds -----------------------------
    # NB the currency change ($799 -> £799) needs no entry: fold() strips
    # non-alphanumerics, so both sides reduce to "799 mo".
    "LONGHORN": "LAUNCH",
    "BRAHMA": "GROWTH",
    "EL GRAN TORO": "ENTERPRISE",
    # These two referenced plan names that appear nowhere on the live page,
    # because its own tiers are named after cattle. They resolve now.
    "Everything in Starter": "Everything in Launch",
    "Everything in Premium": "Everything in Growth",

    # -- claims that are false about this business --------------------------
    "7 in-house team members — no outsourcing, no offshore work":
        "A dedicated in-house team across our UK, US and Dubai offices",

    # -- US law, US geography -----------------------------------------------
    "Dental practices, med spas, chiropractors, and healthcare clinics. We understand "
    "HIPAA-sensitive content, patient intent keywords, and the trust signals that "
    "medical SEO requires.":
        "Dental practices, med spas, chiropractors, and healthcare clinics. We understand "
        "GDPR-sensitive content, patient intent keywords, and the trust signals that "
        "medical SEO requires.",
    "Your Business | Best HVAC in Lynchburg, VA": "Your Business | Best HVAC in London",
    "Trusted HVAC experts serving Lynchburg since 2010. 5-star rated, licensed & insured. "
    "Free estimates.":
        "Trusted HVAC experts serving London since 2010. 5-star rated, fully accredited & "
        "insured. Free estimates.",
    'SEO stands for Search Engine Optimization. In plain terms, it\'s the process of making '
    'your website show up when potential customers search for what you offer on Google. When '
    'someone in your area types "HVAC repair near me" or "best plumber in Lynchburg," SEO '
    'determines whether your business appears — or your competitor\'s does.':
        'SEO stands for Search Engine Optimisation. In plain terms, it\'s the process of making '
        'your website show up when potential customers search for what you offer on Google. When '
        'someone in your area types "HVAC repair near me" or "best plumber in Manchester," SEO '
        'determines whether your business appears — or your competitor\'s does.',
    # The paragraph above is a single-quoted TS string (it contains double
    # quotes), so `module_strings` never sees it whole — its regex matches the
    # two double-quoted fragments *inside* it. The full-sentence entry above
    # still carries REVERSE, where the live run is the whole paragraph; this
    # fragment pair is what carries FORWARD.
    '"best plumber in Lynchburg,"': '"best plumber in Manchester,"',
    "best dentist in Lynchburg VA": "best dentist in London",
    "moving company Lynchburg": "moving company Manchester",
    "custom home builder VA": "custom home builder Surrey",
    # Crawl spaces are a US construction feature; damp proofing is the UK search.
    "crawl space repair cost": "damp proofing cost",
    "google.com/search?q=best+HVAC+company+near+me":
        "google.com/search?q=best+hvac+company+near+me",
}

# ---------------------------------------------------------------------------
# Strings the live page has no version of at all — not changed, added.
# ---------------------------------------------------------------------------
AUTHORED = {
    # The live <head> has a <title> and nothing else. No description, no OG.
    "UK SEO agency delivering technical SEO, on-page optimisation, Google Business Profile "
    "management and link building. Month-to-month plans from £799, no long-term contracts.",
    # The dialog behind the twelve dead href="#" CTAs, and its labels.
    "Request a Quote",
    "Tell us about your business and we'll come back within one working day.",
    "SEO Services",
    "Free SEO Report",
    "Close",
    # Form outcome. The live form posts to PHPMailer and navigates away, so the
    # document has no success state.
    "Thanks — your enquiry is in.",
    # Accessible names for icon-only links the live page ships unnamed.
    "Facebook",
    "Instagram",
    "X",
    "Creative Logo Design logo",
    # Footer legal links. The live footer has none — its logo and both legal
    # destinations are href="#".
    "Privacy Policy",
    "Terms And Conditions",
}

NOT_COPY = re.compile(
    r"^(src|href|icon|id|width|height|image|accent|tone|amount|period|featured)$"
    r"|Href$|Alt$|Icon$"
)

# ---------------------------------------------------------------------------
# Live runs the rebuild deliberately does not reproduce, beyond the rebrand.
# ---------------------------------------------------------------------------
REPLACED = {
    # Bootstrap's client-side validation messages. The rebuild validates on the
    # server with zod and renders zod's messages instead.
    "Please enter a valid first name.",
    "Please enter a valid last name.",
    "Please enter a valid email address.",
    "Please enter a subject.",
    "Please enter a valid phone number.",
    "Please enter your message.",
    # The live FAQ accordion's "+" glyph, drawn as text. The rebuild rotates a
    # real icon inside <summary>.
    "+",
    # The live ranking card's check glyph, part of the string rather than markup.
    "✓ 18 keywords moved to page 1 this month",
}

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
    s = " ".join(SPELLING.get(w, w) for w in WORD.findall(s))
    return s.strip()


REBRAND_NEW = {fold(v) for v in REBRAND.values()}
REBRAND_OLD = {fold(k) for k in REBRAND}
AUTHORED_F = {fold(v) for v in AUTHORED}
REPLACED_F = {fold(v) for v in REPLACED}


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
        folded = fold(value)
        if folded in REBRAND_NEW or folded in AUTHORED_F:
            continue
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
        folded = fold(run)
        if folded in REBRAND_OLD or folded in REPLACED_F:
            continue
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

    print(f"REBRAND  {len(REBRAND)} declared wording changes, {len(AUTHORED)} authored strings")

    total = len(forward_misses) + len(reverse_misses)
    print(f"\n{total} deviation(s)")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
