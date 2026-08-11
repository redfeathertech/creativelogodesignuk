# SEO playbook

The reason this project exists. Read before touching metadata or structured data.

## What the live Laravel site gets wrong

Audited from `page-source.html` (repo root — the rendered live homepage):

| Problem | Consequence |
|---|---|
| No `<meta name="viewport">` | Mobile browsers render at 980px desktop width. Google's index is mobile-first — this alone is severe |
| No `<meta charset>` | Page is full of UTF-8 curly quotes; renders as mojibake if the server header is missing |
| **Zero** structured data | No Organization, WebSite, FAQPage, Breadcrumb — nothing |
| No Open Graph / Twitter tags | Shares render as a bare URL |
| No analytics at all | No GA4, no GTM, no pixel — the site is flying blind |
| `google-site-verification` after `</footer>` | Google only reads it in `<head>` |
| 4 stylesheets deferred via `media="print"` | Whole theme arrives after first paint → FOUC + severe CLS |
| 60 images, 0 with `width`/`height`, 0 lazy | Guaranteed layout shift |
| Two autoplay MP4s (3.5MB + 16MB) both fetched | Almost certainly the largest byte cost on the page |
| 5 render-blocking resources; jQuery + Slick + Bootstrap | ~250KB of JS for 3 carousels and an accordion |
| 8 accordion buttons with no accessible name | WCAG 4.1.2 failure ×8 |
| Preload points at `css/custom.css`; real file is `/assets/css/custom.css` | 404 preload on every load |
| 10 carousel dots for 5 slides | 5 dead controls |
| 56 headings, levels picked by font size | No usable document outline |

All of the above are fixed here.

## Structured data

One `@graph` per page, built in `lib/seo.ts`, rendered by `components/JsonLd.tsx`
as a **plain `<script type="application/ld+json">`** — deliberately not
`next/script`, which is for executable JS. `<` is escaped to `<` so content
can never break out of the tag.

### Nodes emitted on the homepage

| Node | `@id` | Notes |
|---|---|---|
| `Organization` | `/#organization` | name, url, logo, sameAs, telephone, email, 3 offices via `location[]` |
| `WebSite` | `/#website` | `publisher` → `#organization` |
| `WebPage` | `/#webpage` | `isPartOf` → `#website` |
| `BreadcrumbList` | `/#breadcrumb` | |
| `FAQPage` | `/#faq` | The 8 Challenges Q&As |
| `OfferCatalog` | `/#services` | One `Service` per mega-menu entry |

Inner pages emit `Organization` + `WebSite` + `WebPage` + `BreadcrumbList`.

### Priced offers — `/creative-logo-design` only

The old note above said "there is no pricing anywhere on the site, do not invent
it." That ban stands, and it was never about prices — it was about *inventing*
them. The landing page is the first page with real ones: nine packages, £35 to
£1199, each rendered as text in the page. `pricedOfferCatalogNode()` in
`lib/seo.ts` describes them.

`OfferCatalog` of `Service`, deliberately, not `Product`:

- These are services. A "Basic Logo Package" has no GTIN, no brand and no
  availability, and `Product` markup that thin invites a structured-data
  warning at best.
- `OfferCatalog` produces **no rich result**, so nothing here can be wrong in a
  SERP. It is entity clarity, not a stars-and-price play.
- `price` must be a bare number for schema.org, so the `£` is stripped and
  `priceCurrency: "GBP"` carries it.

If a price changes in `content/landing/creative-logo-design.ts`, the graph
changes with it — the node is built from the same array the cards render from,
so the two cannot drift.

### Deliberately NOT emitted — do not "fix" these

| Schema | Why it is omitted |
|---|---|
| **`Review` / `AggregateRating`** on the 5 testimonials | Two independent blockers. (1) `Review.author.name` is **required**, and these have no reviewer names — only job titles ("VP Marketing") and generic org labels ("Fintech SaaS"). (2) Google's self-serving review policy makes reviews about your own business, hosted on your own site, **ineligible** for review rich results on `Organization`/`LocalBusiness`. Marking them up risks a **manual action for spammy structured data**. To get review stars, use real Google/Trustpilot reviews via their widgets. |
| **`Review`** on the 14 named landing-page reviews | Blocker (1) does not apply — these carry real author names. Blocker (2) still does, and on its own it is enough. Do not be tempted by the names. |
| `VideoObject` for the hero | Requires `thumbnailUrl`; the video has no poster. It is decorative background. |
| `Product` with prices | Still omitted. `/creative-logo-design` does carry nine real prices, but these are services — no GTIN, no brand, no availability — and `Product` is the wrong type for them. See `OfferCatalog` below for what is emitted instead. |
| `SearchAction` on `WebSite` | There is no `/search` route. Declaring a search action the site cannot service is penalised. |
| Three `PostalAddress` on one `LocalBusiness` | Invalid. Modelled as `Organization.location[]` of `Place` nodes instead. |

### Rules

- Every node needs a **unique `@id`**. Duplicated `@id`s across pages are the
  most common structured-data bug when porting from a template engine.
- `@context` goes once, at the graph root.
- Validate with **both** Google's Rich Results Test and the Schema Markup
  Validator before shipping a schema change.

## Metadata

- `metadataBase` is set in `app/layout.tsx` from `NEXT_PUBLIC_SITE_URL`
  (default `https://creativelogodesign.co.uk`). Without it, relative URLs in
  metadata fields are a **build error**.
- Title template: `%s | Creative Logo Design`. The homepage uses
  `title: { absolute: … }` so the suffix is not doubled.
- `themeColor` lives in `export const viewport`, **not** `metadata` — deprecated
  there since v14.
- `verification.google` is in the root layout, which puts the tag in `<head>`
  where Google actually reads it.
- **`buildMetadata` names the OG image explicitly, and must keep doing so.**
  `app/opengraph-image.tsx` only attaches itself to the segment that owns it —
  the root. Next re-attaches it to a page only when that page declares no
  `openGraph.images`, and a page that sets its own `openGraph` object replaces
  the inherited one wholesale. Because every page here goes through
  `buildMetadata`, dropping `images` from it silently strips `og:image` from all
  42 inner pages while leaving `twitter:card=summary_large_image` in place — a
  large-card share with no image. This shipped that way until 30 Jul 2026 and is
  invisible unless you grep the built HTML, so it is now checklist item 7.

## Indexing policy

`content/routes.ts` has an `indexable` flag per route. It gates **two** things at
once: the page's `robots` meta and its presence in `sitemap.ts`.

All 49 routes are now `indexable: true` — the rebuild is content-complete, and
the sitemap carries 49 URLs.

Thin pages that get indexed cause real damage; `noindex` stubs are inert. When a
new route is added, keep it `false` and flip it in the same commit that lands the
real content — never before.

### Every page canonicals to itself — including the landing pages

> **Rule, signed off by the client 1 Aug 2026: a landing page's canonical points
> at that landing page. Never at the homepage.**

The live site gets this wrong. `/creative-logo-design/` ships
`<link rel="canonical" href="https://creativelogodesign.co.uk/">` — at the
**homepage**, not at itself. That tells Google the page is a duplicate of the
homepage and consolidates it away, which is why the URL has never ranked in its
own right despite its own `<title>`, its own hand-written
`<meta name="description">` and ~2,000 words of unique copy. It is a template
copy-paste, and it was throwing away the page.

**Check the remaining five landing pages for the same tag and do not carry it
over.** It is the single highest-value fix available on any of them: the content
is already written, already unique, and already indexed-adjacent — the only
thing stopping it from ranking is one wrong `href`.

Measured on the four rebuilt so far:

| Live page | Live canonical |
|---|---|
| `/creative-logo-design/` | → homepage |
| `/logo-design-offer/` | **none at all**, and no `robots` tag either |
| `/lp/` | none in the served HTML; the real one is injected by react-helmet after hydration |
| `/seo-services/index.php` | → homepage |

`/seo-services` is the clearest case of what the wrong tag costs. Its entire
`<head>` is a charset, a viewport, `<title>SEO Services</title>` and a canonical
pointing at `/`. No description, no Open Graph, no robots directive — roughly
2,500 words of SEO copy on a page telling Google it is a duplicate of the
homepage. That it has no rankings to lose is also what made it safe to rebrand;
see [CONTENT-PARITY.md](CONTENT-PARITY.md#seo-services--the-one-page-that-was-rebranded-not-ported).

#### It is structural, not a per-page decision

Nothing has to be remembered for this to hold. `buildMetadata()` in `lib/seo.ts`
sets `alternates.canonical` from the page's own `path`, and every route in the
app goes through it. There is no code path that can emit a canonical pointing
somewhere else without someone deliberately overriding `alternates`.

Verify it across the whole site after any build. The walk is recursive: since
the 2026-08 pillar restructure, the sub-service pages prerender into nested
directories (`.next/server/app/web-design-services/shopify.html`):

```bash
npm run build
node -e '
const fs=require("fs"), path=require("path");
const SITE="https://creativelogodesign.co.uk", dir=".next/server/app";
let bad=0, n=0;
const walk=(d)=>fs.readdirSync(d,{withFileTypes:true}).flatMap((e)=>
  e.isDirectory() ? walk(path.join(d,e.name))
  : e.name.endsWith(".html") && !e.name.startsWith("_") ? [path.join(d,e.name)] : []);
for (const f of walk(dir)) {
  const h=fs.readFileSync(f,"utf8");
  const got=(h.match(/<link rel="canonical" href="([^"]*)"/)||[])[1];
  const slug=path.relative(dir,f).replace(/\\/g,"/").replace(/\.html$/,"");
  const want=slug==="index" ? SITE : `${SITE}/${slug}`;
  n++;
  if (got!==want) { bad++; console.log(`  ${slug}: got ${got} want ${want}`); }
}
console.log(`${n-bad}/${n} pages canonical to themselves`);
'
```

Currently **49/49**. (Next drops the root's trailing slash, so the homepage
emits `https://creativelogodesign.co.uk` — the same resource either way.)

## The 2026-08 pillar restructure

The 36 flat service URLs moved to the SEO plan's pillar tree — 8 pillars,
sub-services nested one level under each. What keeps the move rank-safe:

- **Copy, `<title>`s and meta descriptions did not change.** The parity gates
  all still pass; the title-drift check still runs against the same live
  strings. Only the URL and the chrome around the content moved.
- **Every old URL 301s to its new home**, driven by
  `content/legacy-redirects.json`. Sources are append-only and live forever.
  The slashless form — the one the live site links and the one in Search
  Console — is a single hop straight to the final URL. The trailing-slash form
  costs two: Next's own `trailingSlash: false` normalisation is registered
  ahead of the custom table, so `/ppc/` resolves `/ppc/` → `/ppc` → the final
  URL. That is accepted, not overlooked: killing it needs
  `skipTrailingSlashRedirect`, which would strand every *other* slash form as a
  duplicate. Two permanent hops consolidate fine.
- **Internal links point at the new URLs directly** (nav, footer, homepage,
  hero tiles via `currentPath()`), so no crawl path bounces off a redirect.
- **Canonicals, the sitemap and the JSON-LD follow `content/routes.ts`**, so
  they switched to the new URLs in the same commit — no window where the
  sitemap says one thing and the canonical another.
- **`/seo` and `/ui-and-ux-analysis` deliberately did not move**, and every
  ranking page kept an internal link — nothing was orphaned. See
  docs/ROUTES.md for the reasoning.

After deploy: submit the sitemap in Search Console and expect the usual
re-crawl dip while Google consolidates the 34 moved URLs; the 301 + unchanged
content is exactly the signal pattern the "site move with URL changes"
guidance describes.

#### The consequence to watch

`/creative-logo-design` now competes with `/` for logo-design terms rather than
feeding them to it. That is the intent. If Search Console later shows the two
cannibalising each other, the answer is to differentiate the two pages' targeting
— not to re-point the canonical, which is what caused the problem.

## RESOLVED — trailing slash: keep `trailingSlash: false`

Settled 1 Aug 2026 against the live server. **No config change; the default is
correct.** This was previously written up as "match whatever Laravel does", which
is not answerable — Laravel does not do one thing.

### What the live site actually does

Measured, not inferred:

| Signal | Form | |
|---|---|---|
| `curl https://creativelogodesign.co.uk/seo` | no slash | **200** |
| `curl https://creativelogodesign.co.uk/seo/` | slash | **200** |
| Canonical on every inner page | — | `<link rel="canonical" href="" />` |
| Canonical on the homepage | slash | `https://creativelogodesign.co.uk/` |
| Every internal link (`route()` output) | no slash | `/seo`, `/about-us` |
| `sitemap.xml` | slash | `/about-us/`, `/seo-services/` |

Both forms return 200, neither redirects, and `$canonicalURL` is set **only** in
`FrontendController::index` — the homepage. Every other page renders
`href=""` from `frontend/layouts/app.blade.php:9`, and an empty canonical
resolves to the requested URL. So each form self-canonicals: every inner page on
production is live on two URLs today, with nothing telling Google which wins.

### Why no slash

The two signals that disagree are not equally weighted:

- **Internal links have no slash**, everywhere, generated by Laravel's `route()`.
  This is the crawl path and the way link equity actually flows through the site.
- **`sitemap.xml` has slashes** — but it is a hand-written 10-entry file that
  lists none of the 36 service pages and 5 URLs that 404 (`/pricing`,
  `/our-work`, `/blog`, and two `-uk` paths with no route in `web.php`). It has
  not tracked the site for a long time.

Where a page is reachable both ways with no canonical, Google consolidates on
what the site links to. That is the no-slash form, which is also the Next
default — so the rebuild keeps the URLs the internal link graph has been
pointing at all along.

### Why this is safe even if Search Console says otherwise

The rebuild **308s `/seo/` → `/seo`** (verified on every route group, including
`/creative-logo-design/`). A permanent redirect consolidates signals rather than
discarding them, so if Google has some pages indexed under the slash form, they
transfer. The cost is a re-crawl, not a loss.

The genuinely damaging state is the one production is in now — two 200s and no
canonical. Either choice, made consistently and enforced with a 308, is strictly
better. Only flip this if Search Console shows the slash form dominating **and**
external inbound links use it; changing it later is another 308, not a rewrite.

### One cosmetic leftover

The homepage canonical renders `https://creativelogodesign.co.uk` while the
sitemap entry is `https://creativelogodesign.co.uk/`. `sitemap.ts` builds strings,
whereas Next normalises `alternates.canonical` and drops the slash. For the root
these are the same URL (RFC 3986: an empty path is `/`), and Google treats them
as such — so this is left alone rather than fought.

## Verification checklist

1. `npm run build` — every route `○ (Static)` or `● (SSG)`, never `ƒ (Dynamic)`
2. **View source** (not devtools) on `/` — all 11 sections, every mega-menu link
   and every FAQ answer must be in the raw HTML
3. Paste the rendered HTML into Google's Rich Results Test → zero errors,
   `FAQPage` detected, no `Review`
4. Lighthouse mobile incognito → SEO ≥ 95, Accessibility ≥ 95, CLS < 0.1
5. Fetch `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`,
   `/opengraph-image`
6. Confirm all 49 URLs resolve and none 404, and every entry in
   `content/legacy-redirects.json` returns `301` with the mapped `Location`
6b. The trailing-slash form 308s to the canonical one, on every route group —
   a stray `trailingSlash: true` would silently invert this and split every
   page's signals:
   ```bash
   for p in /seo/ /about-us/ /cookies-policy/ /creative-logo-design/; do
     printf '%-26s %s\n' "$p" \
       "$(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' "http://127.0.0.1:3000$p")"
   done   # each must print 308 -> the same path without the slash
   ```
7. Every prerendered page carries exactly one `og:image` and one
   `twitter:image` (recursive — sub-service pages sit in nested directories):
   ```bash
   find .next/server/app -name '*.html' ! -name '_*' | while read f; do
     printf '%-64s og:%s tw:%s\n' "$f" \
       "$(grep -c 'property="og:image"' "$f")" "$(grep -c 'name="twitter:image"' "$f")"
   done
   ```

## Still to do

- [ ] Resolve the trailing-slash question above. It now covers 49 URLs, and
      `/creative-logo-design/` is the one that matters most: it is the only page
      whose live canonical is *wrong* in a second way as well, so both signals
      change at once at cutover
- [ ] Set `NEXT_PUBLIC_GA_ID`. Note the landing page carries its **own**
      tracking on the live site that the rebuild does not reproduce: GA4
      `G-7KR6HYTBXR`, Google Ads `AW-16485403310` (with a `phone_conversion_number`
      call-tracking snippet), and Meta Pixel `857579736208052`. Ad spend is
      attributed through these — decide where they belong before cutover
- [ ] Re-verify the property in Search Console after cutover
- [ ] Watch `/` vs `/creative-logo-design` for cannibalisation once the landing
      page is self-canonical
- [ ] Check the five remaining landing pages for the homepage canonical and drop
      it when each is rebuilt — see the rule above
- [x] Port real content to every route — all 49 are `indexable`
- [x] Submit the sitemap once more than the homepage is indexable — 49 URLs are
      now in it
