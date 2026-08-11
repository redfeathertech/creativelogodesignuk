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


def fold(s):
    s = unicodedata.normalize("NFKC", s)
    s = (s.replace("\u2019", "'").replace("\u2018", "'")
          .replace("\u201c", '"').replace("\u201d", '"')
          .replace("\u2014", "-").replace("\u2013", "-")
          .replace("\u00a0", " "))
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def page_text(path):
    h = open(path, encoding="utf-8").read()
    h = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", h, flags=re.S | re.I)
    h = re.sub(r"<!--.*?-->", " ", h, flags=re.S)
    h = re.sub(r"<[^>]+>", " ", h)
    import html as H
    return fold(H.unescape(h))


def load_module(path):
    src = open(path, encoding="utf-8").read()
    i = src.index("= {", src.index("export const"))
    j = src.rindex("}")
    return json.loads(src[i + 2 : j + 1])


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
    # `seo-placeholders` holds the eight new SEO sub-service pages. They have no
    # live counterpart — nothing was ported, so there is nothing to verify. Every
    # string in them is cloned from `seo.ts`, which IS checked below. Delete this
    # skip the moment the SEO team's real copy replaces them.
    skip = {"index", "types", "defaults", "seo-placeholders"}
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

for key, slug in PAGES.items():
    ts = os.path.join(REPO, "content/services", key + ".ts")
    html_path = os.path.join(BASE, slug + ".html")
    if not os.path.isfile(ts):
        report.append(f"MISSING MODULE  {key}.ts")
        continue

    try:
        data = load_module(ts)
    except Exception as e:
        report.append(f"UNPARSEABLE     {key}.ts -> {e}")
        continue

    live = page_text(html_path)
    strings = []
    walk(data, [], strings)

    bad = []
    known = 0
    for path, value in strings:
        # dotted path without list indices, e.g. "benefits.items.title"
        generic = path
        if generic in AUTHORED:
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
print(f"\nchecked {total} copy strings across {len(PAGES)} pages")
print(f"{len(expected_seen)}/{len(EXPECTED)} documented deviations still present; {misses} NEW deviation(s)")

# An EXPECTED entry that no longer fires means the copy changed underneath the
# exemption. Silently keeping it would let the next real deviation hide here.
gone = sorted(EXPECTED - expected_seen)
if gone:
    print("\nStale EXPECTED entries — the string changed, so re-check and remove:")
    for key, path, value in gone:
        print(f"  {key}  {path}: {value[:80]}")

sys.exit(1 if misses or gone else 0)
