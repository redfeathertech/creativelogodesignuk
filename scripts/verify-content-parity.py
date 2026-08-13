"""Prove every ported string still exists on the live page.

    python scripts/verify-content-parity.py

Content parity is the one rule of this migration (docs/CONTENT-PARITY.md), and
"it was transcribed carefully" is not evidence. This walks ALL 36 service
modules — the 19 ported from Blade and the 17 ported from
`clduk/config/services_content/*.php` — and checks every copy string against
the captured live HTML.

Matching is whitespace- and case-insensitive and folds curly quotes and dashes,
because the port deliberately sentence-cases SHOUTED source labels. Anything
that fails a check this loose is a genuine rewording, not a formatting choice.

Needs the Laravel repo beside this one, for
`clduk/_migration_backup/baseline/*.html`. Exits non-zero on any deviation.

Three are expected and documented in CONTENT-PARITY.md — each is a label the
rebuilt components always render that one live page happens to omit:
  corporate-blog-design-services  solutions.eyebrow
  page-speed-optimisation         howItWorks.workHeading
  laravel-developers              howItWorks.workHeading
"""
import json
import os
import re
import sys
import unicodedata

import pathlib
REPO = str(pathlib.Path(__file__).resolve().parent.parent)
BASE = str(pathlib.Path(REPO).parent / "clduk" / "_migration_backup" / "baseline")

# content/services/<key>.ts  ->  baseline/<slug>.html
#
# Keys differ from the URL slug where the Laravel registry key did
# ("content-marketing" -> "/content-marketing-services"), so the mapping is
# explicit rather than derived. `assert_covers_every_module` below fails if a
# module in content/services/ is missing from this table.
PAGES = {
    # --- ported from the per-service Blade views -----------------------------
    "web-development": "web-development",
    "app-development": "app-development",
    "website-redesign-services": "website-redesign-services",
    "responsive-website-design-and-development": "responsive-website-design-and-development",
    "magento-design-and-development-service": "magento-design-and-development-service",
    "corporate-blog-design-services": "corporate-blog-design-services",
    "seo-audit-service": "seo-audit-service",
    "social-media-management": "social-media-management",
    "content-marketing": "content-marketing-services",
    "influencer-marketing": "influencer-marketing",
    "ecommerce-development": "ecommerce-website-development",
    "wordpress-development": "wordpress-development",
    "amp-web-design": "amp-web-design",
    "page-speed-optimisation": "page-speed-optimisation",
    "shopify-developers": "shopify-developers",
    "magento-development": "magento-development",
    "laravel-developers": "laravel-developers",
    "contentful-developers": "contentful-developers",
    "custom-3d-configurators": "custom-3d-product-configurators",

    # --- ported from clduk/config/services_content/*.php ---------------------
    "web-designing": "web-designing",
    "website-maintenance": "website-maintenance",
    "ui-ux-design": "ui-ux-design",
    "ui-and-ux-analysis": "ui-and-ux-analysis",
    "digital-marketing": "digital-marketing",
    "seo": "seo",
    "aeo": "aeo",
    "ppc": "ppc",
    "branding": "branding",
    "content-management-systems": "content-management-systems",
    "custom-wordpress-developement": "custom-wordpress-developement",
    "shopify-web-design": "shopify-web-design",
    "amazon-seo": "amazon-seo-and-product-optimisation-service",
    "conversion-rate": "conversion-rate-optimisation",
    "email-marketing": "email-marketing-management-services",
    "google-analytics": "google-analytics",
    "marketing-and-sales-automation": "marketing-and-sales-automation",
}

# Dotted paths whose value the spec explicitly asks the author to compose,
# because the live page has no equivalent. Everything else must be verbatim.
AUTHORED = {
    "meta.description",
    "hero.eyebrow", "hero.breadcrumb", "hero.mediaAlt",
    "hero.ctaPrimary", "hero.ctaSecondary",
    "howItWorks.eyebrow",
    "solutions.imageAlt",
    "advantages.eyebrow", "advantages.imageAlt",
    "capabilities.eyebrow",
    "process.eyebrow",
    "cta.eyebrow", "cta.heading", "cta.headingAccent", "cta.lead", "cta.button",
}
# Structural, not copy.
SKIP_KEYS = {"src", "width", "height", "slug", "count", "prefix", "suffix", "decimals", "logos"}

# Deviations that are known, deliberate and written down. Keyed by
# (module key, dotted path, value) so that changing the string re-opens the
# question instead of silently inheriting the exemption.
#
# Without this the script exits 1 on a perfectly good tree, which is why
# nothing could consume its exit code. Now non-zero means "something new".
EXPECTED = {
    # The rebuilt components always render a label these three live pages omit.
    # Additions, not rewordings — docs/CONTENT-PARITY.md "The three copy deviations".
    ("corporate-blog-design-services", "solutions.eyebrow", "What we do"),
    ("page-speed-optimisation", "howItWorks.workHeading", "Our recent work"),
    ("laravel-developers", "howItWorks.workHeading", "Our recent work"),
    # Stat fold. The live page splits this as label "Revenue Generated" +
    # value "£49 million (and growing)"; the counter's suffix caps at ~14 chars,
    # so "(and growing)" moved into the label. Every word still ships — see the
    # `_migration.notes` in clduk/config/services_content/digital-marketing.php.
    ("digital-marketing", "advantages.stats.label", "Revenue Generated (and growing)"),
}


# `meta.title` is the one ported string the SEO plan is allowed to replace.
#
# The plan's URL tables rename pages ("Web Designing" -> "Web Design Services"),
# and each rename ships with its URL move, so the title travels with a 301 to a
# page that has no ranking history of its own to protect. That is a decision,
# not drift — but it has to be a DECLARED decision, because `meta.title` is
# otherwise checked like any other copy string.
#
# Declaring it matters more than it looks. Of the 14 renames below, only two
# ever failed the check; the other twelve passed silently because the new title
# happened to appear somewhere in the live page's body text ("Web Design
# Services" occurs in the web-designing page's own copy). A gate that fires on
# 2 of 14 identical decisions is not a gate. Now every rename is listed, and
# the VALUE is the live `<title>` it replaced — so a re-captured baseline that
# changes that title re-opens the question instead of inheriting the exemption.
#
# Module key -> (live `<title>` it replaced, the plan's page name it became),
# both with the " | Creative Logo Design" suffix dropped. BOTH ends are pinned
# on purpose: recording only the old title would exempt the field entirely, so
# a page already listed here could have its title changed to anything without
# the gate noticing. See "Titles renamed by the SEO plan" in CONTENT-PARITY.md.
RETITLED = {
    # Pillars
    "web-designing": ("Web Designing", "Web Design Services"),
    "web-development": ("Web Development", "Web Development Services"),
    "app-development": ("App Development", "App Development Services"),
    "branding": ("Branding", "Branding Services"),
    "digital-marketing": ("Digital Marketing", "Digital Marketing Services"),
    # Digital marketing sub-services. `conversion-rate` and
    # `influencer-marketing` already matched the plan and are absent by design.
    "ppc": ("PPC", "PPC / Google Ads"),
    "email-marketing": ("Email Marketing Management Services", "Email Marketing"),
    "content-marketing": ("Content Marketing Services", "Content Marketing"),
    "google-analytics": ("Google Analytics", "Google Analytics 4 & Tracking"),
    # Web design sub-services
    "custom-wordpress-developement": (
        "Custom Wordpress Developement", "Custom WordPress Website Design"),
    "responsive-website-design-and-development": (
        "Responsive Website Design And Development", "Responsive Website Design"),
    "magento-design-and-development-service": (
        "Magento Design And Development Service", "Magento Web Design"),
    "corporate-blog-design-services": (
        "Corporate Blog Design Services", "Corporate Blog Design"),
    "content-management-systems": (
        "Content Management Systems", "CMS Website Design"),
    # Web development sub-services
    "ecommerce-development": ("Ecommerce Website Development", "E-commerce Development"),
    "shopify-developers": ("Shopify Developers", "Shopify Development"),
    "laravel-developers": ("Laravel Developers", "Laravel Development"),
    "contentful-developers": ("Contentful Developers", "Contentful Development"),
    "amp-web-design": ("AMP Web Design", "AMP Development"),
    "custom-3d-configurators": (
        "Custom 3D Product Configurators", "Custom 3D Configurators"),
}


def fold(s):
    s = unicodedata.normalize("NFKC", s)
    s = (s.replace("\u2019", "'").replace("\u2018", "'")
          .replace("\u201c", '"').replace("\u201d", '"')
          .replace("\u2014", "-").replace("\u2013", "-")
          .replace("\u00a0", " "))
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def page_title(path):
    """The live `<title>`, minus the site-name suffix every page carries."""
    import html as H
    h = open(path, encoding="utf-8").read()
    m = re.search(r"<title[^>]*>(.*?)</title>", h, re.S | re.I)
    if not m:
        return ""
    return H.unescape(m.group(1)).strip().replace("| Creative Logo Design", "").strip()


def page_text(path):
    h = open(path, encoding="utf-8").read()
    h = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", h, flags=re.S | re.I)
    h = re.sub(r"<!--.*?-->", " ", h, flags=re.S)
    h = re.sub(r"<[^>]+>", " ", h)
    import html as H
    return fold(H.unescape(h))


IDENT = re.compile(r"[A-Za-z_$][A-Za-z0-9_$]*")


def js_object_to_json(src):
    """Normalise a JS object literal into JSON.

    These modules are plain data, but they are TypeScript, and `npx prettier`
    rewrites them from the JSON-shaped form they were generated in
    (`"meta": { "title": ... }`) into idiomatic JS: bare keys and trailing
    commas. `json.loads` rejects both.

    That is not hypothetical. A formatting pass over 16 of the 36 modules made
    every one of them unparseable, and the script's own `except` turned each
    into a one-line `UNPARSEABLE` note that still exited 0 overall — so half
    the site's copy silently stopped being checked while the gate kept
    reporting "0 NEW deviations". Parsing both shapes is what keeps a
    reformat from ever meaning "unverified" again.

    Handles: bare identifier keys, trailing commas, `//` and `/* */`
    comments, and single-quoted strings. Anything else (template literals,
    computed keys, expressions) is not valid content data and will fail loudly
    at `json.loads` rather than be silently dropped.
    """
    out = []
    i, n = 0, len(src)

    def skip_filler(k):
        """Advance past whitespace and comments; return the new index."""
        while k < n:
            if src[k] in " \t\r\n":
                k += 1
            elif src.startswith("//", k):
                k = src.find("\n", k)
                if k == -1:
                    return n
            elif src.startswith("/*", k):
                k = src.find("*/", k)
                if k == -1:
                    return n
                k += 2
            else:
                break
        return k

    while i < n:
        c = src[i]

        # String literal — copy through, re-quoting single-quoted forms.
        if c in "\"'":
            j, buf = i + 1, []
            while j < n and src[j] != c:
                if src[j] == "\\":
                    buf.append(src[j : j + 2])
                    j += 2
                else:
                    buf.append(src[j])
                    j += 1
            body = "".join(buf)
            if c == "'":
                # A single-quoted JS string may hold a bare " and an escaped \'.
                body = body.replace('\\"', '"').replace("\\'", "'")
                body = body.replace('"', '\\"')
            out.append('"' + body + '"')
            i = j + 1
            continue

        # Comment — drop it.
        if src.startswith("//", i) or src.startswith("/*", i):
            i = skip_filler(i)
            continue

        # Trailing comma before a closing bracket — drop it.
        if c == ",":
            if skip_filler(i + 1) < n and src[skip_filler(i + 1)] in "}]":
                i += 1
                continue
            out.append(c)
            i += 1
            continue

        # Bare identifier: a key if a ':' follows, otherwise a literal
        # (null/true/false) that JSON already understands.
        m = IDENT.match(src, i)
        if m:
            word = m.group(0)
            if skip_filler(m.end()) < n and src[skip_filler(m.end())] == ":":
                out.append('"' + word + '"')
            else:
                out.append(word)
            i = m.end()
            continue

        out.append(c)
        i += 1

    return "".join(out)


def load_module(path):
    src = open(path, encoding="utf-8").read()
    i = src.index("= {", src.index("export const"))
    j = src.rindex("}")
    return json.loads(js_object_to_json(src[i + 2 : j + 1]))


def walk(node, trail, out):
    if isinstance(node, dict):
        for k, v in node.items():
            if k in SKIP_KEYS:
                continue
            walk(v, trail + [k], out)
    elif isinstance(node, list):
        for v in node:
            walk(v, trail, out)
    elif isinstance(node, str):
        out.append((".".join(trail), node))


def assert_covers_every_module():
    """A module absent from PAGES is silently unverified — the exact gap that
    let 17 of the 36 ship unchecked. Make that a failure, not a blind spot."""
    d = os.path.join(REPO, "content/services")
    # The two `*-placeholders` modules hold the new sub-service pages from the
    # SEO plan's URL tree: eight under SEO, six under App Development. They have
    # no live counterpart — nothing was ported, so there is nothing to verify.
    # Every string in them is cloned from `seo.ts` / `app-development.ts`, both
    # of which ARE checked below. Delete each skip the moment the SEO team's
    # real copy replaces that set.
    skip = {
        "index", "types", "defaults",
        "seo-placeholders", "app-placeholders", "branding-placeholders",
        "digital-marketing-placeholders", "automation-placeholders",
        "logo-design-placeholders",
    }
    on_disk = {f[:-3] for f in os.listdir(d) if f.endswith(".ts")} - skip
    unlisted = sorted(on_disk - set(PAGES))
    stale = sorted(set(PAGES) - on_disk)
    if unlisted or stale:
        if unlisted:
            print("NOT CHECKED — add to PAGES: " + ", ".join(unlisted))
        if stale:
            print("PAGES names a module that no longer exists: " + ", ".join(stale))
        sys.exit(2)


assert_covers_every_module()

total = misses = 0
report = []
expected_seen = set()
retitled_seen = set()
# A module this script cannot read is a module it cannot check. Both of these
# used to `continue` past a printed note without touching the exit code, so an
# unreadable module read as a pass. Count them, and fail on them.
unreadable = 0

for key, slug in PAGES.items():
    ts = os.path.join(REPO, "content/services", key + ".ts")
    html_path = os.path.join(BASE, slug + ".html")
    if not os.path.isfile(ts):
        report.append(f"MISSING MODULE  {key}.ts")
        unreadable += 1
        continue

    try:
        data = load_module(ts)
    except Exception as e:
        report.append(f"UNPARSEABLE     {key}.ts -> {e}")
        unreadable += 1
        continue

    live = page_text(html_path)
    strings = []
    walk(data, [], strings)

    bad = []
    known = 0

    # A declared rename is only trustworthy while the title it replaced is
    # still the one the live page serves, and only needed while the module
    # actually diverges. Check both, so the table cannot rot in either
    # direction.
    if key in RETITLED:
        retitled_seen.add(key)
        was, now = RETITLED[key]
        live_title = page_title(html_path)
        ported_title = data["meta"]["title"]
        if fold(live_title) != fold(was):
            bad.append(
                ("RETITLED (recorded live title is stale)",
                 f"recorded {was!r}, live page now serves {live_title!r}")
            )
        if fold(ported_title) != fold(now):
            bad.append(
                ("RETITLED (undeclared title change)",
                 f"meta.title is {ported_title!r}, declared rename is {now!r}")
            )
        if fold(was) == fold(now):
            bad.append(
                ("RETITLED (entry no longer needed)",
                 f"the rename is a no-op — drop the entry")
            )
    for path, value in strings:
        # dotted path without list indices, e.g. "benefits.items.title"
        generic = path
        if generic in AUTHORED:
            continue
        # Declared SEO-plan rename, verified against the live <title> above.
        if generic == "meta.title" and key in RETITLED:
            continue
        if generic.split(".")[0] == "cta":
            continue
        v = fold(value)
        total += 1
        if len(v) < 3:
            continue
        if v not in live:
            if (key, generic, value) in EXPECTED:
                known += 1
                expected_seen.add((key, generic, value))
            else:
                bad.append((path, value))

    misses += len(bad)
    note = f"  ({known} expected)" if known else ""
    status = "OK  " if not bad else f"FAIL({len(bad)})"
    report.append(f"{status} {key:44s} {len(strings)} strings{note}")
    for p, v in bad:
        report.append(f"       ! {p}: {v[:120]}")

print("\n".join(report))
print(f"\nchecked {total} copy strings across {len(PAGES) - unreadable} pages")
print(f"{len(expected_seen)}/{len(EXPECTED)} documented deviations still present; {misses} NEW deviation(s)")
if unreadable:
    print(f"{unreadable} module(s) could not be read — those pages were NOT checked")

# An EXPECTED entry that no longer fires means the copy changed underneath the
# exemption. Silently keeping it would let the next real deviation hide here.
gone = sorted(EXPECTED - expected_seen)
if gone:
    print("\nStale EXPECTED entries — the string changed, so re-check and remove:")
    for key, path, value in gone:
        print(f"  {key}  {path}: {value[:80]}")

# A RETITLED key naming a module that no longer exists would quietly stop
# covering anything, same failure mode as a stale EXPECTED.
orphan_retitles = sorted(set(RETITLED) - retitled_seen)
if orphan_retitles:
    gone = gone or orphan_retitles
    print("\nRETITLED names a module that was not checked: " + ", ".join(orphan_retitles))

sys.exit(1 if misses or gone or unreadable else 0)
