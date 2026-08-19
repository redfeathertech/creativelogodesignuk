# Progress

Where the rebuild stands. Update this at the end of each working session.

## Done — 18–19 Aug 2026 · The homepage redesign shipped — but NOT as planned

Two commits, `a00cdfe` (18 Aug: hero, about, how-it-works) and `fc8560d`
(19 Aug: the rest). The homepage now composes **13 sections**, up from 11.

Written up after the fact, on 19 Aug, from the commits — this file had gone
stale at 13 Aug and the whole redesign was undocumented here.

### Read this first: it did not follow its own plan

[`docs/superpowers/plans/2026-08-04-homepage-v2.md`](superpowers/plans/2026-08-04-homepage-v2.md)
and its [spec](superpowers/specs/2026-08-04-homepage-v2-design.md) called for a
parallel `components/home2/` behind a noindex `/home-v2` preview route, with
`components/home/` and `content/home.ts` never touched, so that promoting and
reverting were each a one-line import change in `app/(site)/page.tsx`.

**None of that happened.** All 73 of the plan's checkboxes are still unticked,
there is no `components/home2/` and no `/home-v2` route. The redesign was done
**in place**. Consequences, in descending order of how much they will cost:

- **There is no cheap revert.** Rolling the homepage back now means reverting
  two commits that also carry unrelated work — the form actions, `lib/mail.ts`,
  `lib/validation.ts`, the reCAPTCHA component and all four landing parity
  scripts were changed in `a00cdfe` too.
- Three approved sections were **never built**: Industries, Locations, and
  Awards & recognition. All three were to reuse copy and assets already shipped
  on the About page, so they remain cheap to add.
- The approved reorder — client logos from 6th to 2nd, the one change the spec
  flagged as more than pixels — was **not done**. `Logos` still sits 7th.

The plan and spec are kept as-is rather than back-fitted to what shipped. They
are the record of what was approved; this section is the record of what landed.

### What actually changed

| Rebuilt | New | Untouched |
|---|---|---|
| Hero, About, HowItWork, WhatYouGet, Toolbox, Results, Methodology | **Portfolio** (filterable work rail), **VideoTestimonials** + **VideoLightbox** | Logos, Testimonials, Challenges, Proposal |

Assets were reworked substantially: the 16 numbered `tools/*.png` are now named
files, the methodology art is split into icon + illustration pairs per step, and
the offer, results and video bands got new backdrops. `methodology.orbitIcons`
was correctly deleted along with the orbit it fed — it built its paths as
`/assets/img/tools/${n}.png`, so every one of its eight was a 404 the moment the
toolbox was renamed.

**Content parity held, and visibly so.** `content/home.ts` grew 379 lines and
every rejected reword is annotated in place with why it was not taken:
`whatYouGet.titleAccent` stays lower case, `toolbox.cta` stays "Get Started" and
not the mock's "Get started now", all five tab bodies keep the live wording, and
`methodology` splits into `titleLead`/`titleAccent` that concatenate back to the
live heading exactly. `docs/CONTENT-PARITY.md` records the one net-new figure
(95%).

### The homepage finally has a parity gate — 19 Aug

`scripts/verify-home-parity.mjs`. The 36 service pages and all 4 landing pages
were gated; the homepage, the page this rebuild exists to protect most, never
was, and it was redesigned without one. This was the plan's Task 10, and it is
the one task from that plan that did get done.

It walks every string in `content/home.ts` and fails if any is missing from the
prerendered `.next/server/app/index.html`. **Verified in both directions** —
it passes against the intact build, and it was pointed at four separately
damaged copies (a body paragraph, a heading half, a testimonial `datetime`, a
video result strapline) and named the missing string in each, exiting 1.

Two deliberate departures from the plan's spec for it:

- **Node, not Python.** All six existing gates are `.py`, and none of them can
  run on a machine with no Python — which is the machine this was written on,
  and this is a Next.js repo where Node is guaranteed. A gate that cannot be run
  will not be run. Logic, folding rules and report format match
  `verify-landing-parity.py` deliberately; read that one for the reasoning.
- **Forward only.** The reverse direction — walk the live page, assert every run
  of its text survived — is the one that catches a whole section vanishing, and
  it needs `page-source.html` in the repo root. That file is gitignored and was
  not in this checkout. Re-capture it and the reverse check is worth writing;
  the script's header says so too.

**Its first run found something.** `about.badge` ("Taking on new projects") is
in `content/home.ts` and on no page. It is **not** a redesign regression — it
was already inside a `{/* … */}` block in `About.tsx` as of `a00cdfe^`, and the
About rewrite only deleted the dead markup around it. It is declared in the
script's `NOT_RENDERED` map, with that evidence, rather than quietly skipped;
the map prints on every run. Someone still has to decide whether to restore the
availability pill or drop the key — deleting homepage copy is a content
decision, not a cleanup, which is why it was left in place.

### Also cleaned up

- `82d5d9d` ("fix") had commented out both `.superpowers` lines in `.gitignore`
  and committed the brainstorming working files, including `server.pid` and
  `.last-token`. Both ignore lines are restored and the files are untracked.

### Still open on the homepage

- `videoTestimonials.vimeoId` is **Vimeo's public demo reel**, on all five
  cards, and four of the five items carry identical placeholder "WeBuild Inc."
  copy. No `VideoObject` structured data until real videos land — emitting it
  against a placeholder id would publish false data. See `SEO-PLAYBOOK.md`.
- `recentWork.viewAll` ("View All Projects") renders **without a link** —
  there is no portfolio route. Give it an `href` the day that page ships.
- The three unbuilt sections and the logo-wall reorder above, if still wanted.

## Done — 13 Aug 2026 · The SEO plan's URL restructure is COMPLETE (all 8 groups)

**Groups 4–8 of 8.** SEO, Web Design and Web Development shipped previously;
App Development, Branding, Digital Marketing, Automation and Logo Design all
landed today. **85 routes, 72 of them service pages, all indexable.** Every
group in the plan now has a pillar page and its full sub-service tree, so no
`NavGroup` carries `href: null` any more.

- **Automation: pillar + 5 new sub-services.** `/automation-services` did not
  exist as a page before today — the group's one real page
  (`marketing-sales-automation`) was nested under a prefix with nothing at its
  root. Added `crm-automation`, `workflow-automation`, `email-automation`,
  `chatbot-development`, `ai-automation`.
- **Logo design: pillar + all 7 sub-services**, none of which existed.

### ⚠️ `/creative-logo-design` lost its site-wide link — read before changing the menu

That landing page ranks, is indexable and self-canonical, and `content/nav.ts`
was its **only** internal link: it filled the Logo Design menu group while that
group had no pillar. The SEO plan gives that menu slot to
`/logo-design-services/custom-logo-design`, which would have orphaned it —
no link from the chrome or any page body, which AGENTS.md forbids.

It is now linked from the `/logo-design-services` pillar's hero tiles (the
`creative-logo-design` tile slug; `Hero` builds tile hrefs through
`currentPath()`). Verified rendered, and the page is still in the sitemap and
still `index, follow`.

**But be clear about what changed:** it went from a link on *every* page of the
site to a link on *one*. The rule is satisfied and the page is not orphaned,
but that is a real reduction in internal link equity to a paid-traffic page that
ranks. If it should keep a stronger signal, the options are a footer entry or a
second menu item — both are content decisions, not cleanups, so neither was
taken unilaterally.

- **Digital marketing: 3 new sub-service URLs** — `meta-ads`, `linkedin-ads`,
  `tiktok-ads`. This group was unlike the other two: the 2026-08 restructure had
  already landed the plan's URLs, so the other **seven sub-services needed no URL
  change at all**, only the plan's page name as their title (`PPC` →
  `PPC / Google Ads`, `Social Media Management` → `Social Media Marketing`,
  `Email Marketing Management Services` → `Email Marketing`,
  `Content Marketing Services` → `Content Marketing`, `Google Analytics` →
  `Google Analytics 4 & Tracking`). `cro` and `influencer-marketing` already
  matched. Pillar retitled `Digital Marketing` → `Digital Marketing Services`.
  Menu order now follows the sheet exactly.

- **Branding: 7 new sub-service URLs** under `/branding-services` —
  `brand-identity`, `brand-strategy`, `rebranding`, `brand-guidelines`,
  `packaging-design`, `stationery-design`, `business-card-design`. Pillar
  retitled `Branding` → `Branding Services`. Content in
  `content/services/branding-placeholders.ts`, same clone-the-pillar shape as
  the app set.
- **Scope note for the remaining groups:** these are **URL-structure** jobs —
  routes, exact page names as `<title>`, matching nav labels, sitemap,
  redirects. The placeholder body copy is temporary and will be replaced, so
  content-parity analysis is explicitly out of scope from 13 Aug 2026 onward.
  Keep the gate green (one `RETITLED` row + one `skip` entry per group); do not
  investigate it further.

- **6 new sub-service URLs** under `/app-development-services`: `android`,
  `ios`, `cross-platform`, `flutter`, `react-native`, `app-maintenance`. Routes,
  content modules, mega-menu links and sitemap entries all in the same commit,
  so no URL is live without a link to it.
- **The pillar was retitled** `App Development` → `App Development Services`,
  matching the plan's page name — the same move the Web Design and Web
  Development pillars already made.
- **`content/services/app-placeholders.ts`** — the six pages clone the pillar
  and swap only the strings that make each page name itself, exactly as
  `seo-placeholders.ts` does for the eight SEO sub-services. ⚠️ That is now
  **14 indexable pages on near-duplicate copy**; real copy is the priority for
  both sets. See [CONTENT-PARITY.md](CONTENT-PARITY.md).

### The parity gate had stopped checking half the site

Found while adding the group, and worth more than the group itself.

- **16 of the 36 service modules were silently unverified.** A `prettier` pass
  in the previous session rewrote them from JSON-shaped (`"meta": {`) to
  idiomatic JS (bare keys, trailing commas). `load_module` parsed with
  `json.loads`, so each one threw, got logged as a one-line `UNPARSEABLE` note —
  and `continue`d **without touching the exit code**. The gate kept printing
  "0 NEW deviations" while checking 1,770 of 3,184 strings.
- Fixed by parsing both shapes (`js_object_to_json`), and by making an
  unreadable module a **failure** rather than a note. Back to 3,184 strings
  across 36/36 pages, and all 4 documented deviations fire again.
- **`meta.title` renames are now declared, not accidental.** 14 pages carry the
  SEO plan's page name instead of the live `<title>`. Only 2 ever failed the
  gate; the other 12 passed because the new title happened to appear in the
  page's own body copy. The new `RETITLED` table pins **both** ends — the live
  title replaced and the plan's name adopted — so neither can drift unnoticed.
- All three failure modes were negative-tested: reworded body copy, an
  undeclared title change, and an unparseable module each exit 1.

**Not mine, still open:** `npm run lint` reports 1 pre-existing error
(`components/chrome/Nav.tsx:102`, `react-hooks/set-state-in-effect`) and 2
unused-import warnings in `components/services/Hero.tsx` — the latter left over
from the still-commented-out visible breadcrumb below.

## Done — 11 Aug 2026 · Pillar URL restructure + mega-menu redesign

The SEO plan's new information architecture: 8 pillars, sub-services nested
one level under each.

- **34 of the 36 service URLs moved** to the pillar tree
  (`/ppc` → `/digital-marketing-services/ppc`, …). Copy, titles and metas
  untouched — all five parity gates still pass (3,184 strings, 0 new
  deviations). `/seo` and `/ui-and-ux-analysis` deliberately did not move; see
  [ROUTES.md](ROUTES.md#the-2026-08-pillar-restructure).
- **`content/legacy-redirects.json`** — append-only old → new table; drives
  the 301s in `next.config.ts` (read via `fs`: the transpiled config cannot
  import project TS) and `currentPath()` in `content/routes.ts`, and is
  validated against the route table at build time. The
  `/content-management-system` redirect was retargeted to skip the chain.
- **All 38 redirects are 301, never 308.** Client requirement, and it binds
  every future redirect too. `permanent: true` emits **308**, so the config
  sets `statusCode: 301` explicitly (the two keys are mutually exclusive).
  Next's own `trailingSlash` normalisation still emits 308 and takes no
  configuration — the slash form of a legacy URL therefore costs two permanent
  hops, which is accepted and written up in
  [SEO-PLAYBOOK.md](SEO-PLAYBOOK.md#the-2026-08-pillar-restructure).
- **Routing**: `app/(site)/[slug]` (pillars + flat) and new
  `app/(site)/[slug]/[child]` (sub-services), both `dynamicParams = false`,
  everything still ○/●. The SEO sub-services nest under `/seo-services`, whose
  own page remains the `(landing)` route.
- **Mega-menu redesigned** as a two-pane rail: 8 pillar rows left, active
  pillar's sub-services right; all 8 panels server-rendered (`hidden`, not
  unmounted) so every service URL stays crawlable from every page. Groups
  whose pillar page is unbuilt (`Automation`, `Logo Design`) render as
  non-navigating rows until their page exists. Mobile drawer carries the same
  8 groups.
- **Sub-service pages breadcrumb through their pillar** — `BreadcrumbList`
  JSON-LD now emits three levels (`Home → Web Design → Shopify Web Design`),
  and the crumb is skipped when the pillar page does not exist yet, so it never
  links a 404. Hero quick-link tiles resolve their legacy content slugs through
  `currentPath()` so no internal link bounces off a 301.

  ⚠️ **Open:** the *visible* breadcrumb is still commented out in
  `components/services/Hero.tsx:42` — a pre-existing decision, unexplained and
  older than this session. Google asks that `BreadcrumbList` describe a
  breadcrumb the reader can see, so the site now emits a three-level trail with
  nothing on screen. That mismatch predates the restructure (it was
  `Home → Page` before) but it matters more now that the hierarchy is real, and
  a visible trail is exactly what a newly-nested URL structure wants. Enabling
  it is a one-line uncomment; it needs a yes/no rather than a silent flip.
- Footer / homepage links repointed at final URLs; labels unchanged.
- Docs: ROUTES.md restructure section + regenerated tables, SEO-PLAYBOOK
  restructure notes + recursive canonical sweep, AGENTS.md URL rule.

### Accessibility fixes the review caught

A five-dimension adversarial review of the diff confirmed five defects; all are
fixed and re-verified by a CDP keyboard harness that presses real keys:

- **Critical — the mega-menu was a keyboard trap.** Rail rows switched panels
  on focus while sitting *before* the panels in DOM order, so tabbing forward
  re-pointed `activeGroup` at every stop and always ended on the last pillar:
  exactly one of the sub-service links was reachable by keyboard. Fixed with a
  roving tabindex (one rail tab stop) plus Up/Down/Home/End. **38/38 mega-menu
  links now reachable**, measured, not asserted.
- **Major — the pillar-less rail rows** (Automation, Logo Design) were bare
  buttons with no state. Panels got ids; those rows got `aria-expanded` +
  `aria-controls`, and every row now names the panel it reveals.
- **Major — the closed mobile drawer was `aria-hidden` yet fully tabbable.**
  The guard was `{...(!drawerOpen && { inert: false })}`, which React omits
  entirely — a no-op in both states, leaving ~55 off-screen links in the tab
  order on every sub-xl viewport. Now `inert={!drawerOpen}`.
- Escape returns focus to the Services trigger instead of dropping it to
  `<body>`; pointer panel-switching got a 110ms delay so a diagonal reach into
  a panel no longer swaps it away mid-travel.
- Two menu orderings and one homepage link were corrected against the sheet
  (Amazon SEO before AEO; CRO before Influencer Marketing; the "Explore E-Com
  Development" card restored to the `/web-development-services` pillar it
  pointed at before, rather than the ecommerce sub-service).

**Not fixed, not mine, worth a decision:** `scripts.zip` (93KB, untracked, not
gitignored — a `git add .` would commit a stale copy of the verification
harness) and `@vercel/analytics`, added to `package.json` in this working tree
but imported nowhere, so it collects nothing until `<Analytics />` renders.

**Still open from the restructure:** the planned pillar pages
`/automation-services` and `/logo-design-services`, 36 planned sub-service
pages (get real content, then a route + a `content/nav.ts` line each), and the
`/seo` vs `/seo-services` fold — a content decision needing client sign-off.

## Done — 28 Jul 2026

### Foundation
- Next.js 16.2.12 + React 19.2 + Tailwind v4 (CSS-first, no config file)
- Design tokens ported from clduk `tokens.css` into `@theme` — see
  [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- Montserrat + Raleway via `next/font/google`, self-hosted at build
- 49 assets copied from clduk and renamed (files with spaces and `&` break
  `next/image` URLs); only `hero-video.mp4` (3.5MB) came across, not the unused
  16MB second video
- `next.config.ts`: `typedRoutes`, AVIF+WebP, security headers, immutable asset
  caching, `inlineCss`, the `/content-management-system` 308

### Homepage — all 11 sections
Hero · About · HowItWork + RecentWork · WhatYouGet · Toolbox · Logos · Results ·
Methodology · Testimonials · Challenges/FAQ · Proposal

Rebuilt in Tailwind from the approved clduk design. No jQuery, Bootstrap, Slick
or Swiper — carousels are CSS scroll-snap, accordions are native `<details>`,
the offcanvas is a React dialog.

### Chrome
Top bar · sticky header · 4-column mega-menu · mobile drawer · footer ·
lead-panel slide-over · WhatsApp FAB · GA4 (env-gated)

### SEO
- Full metadata: `metadataBase`, title template, canonical, OG, Twitter,
  `verification.google` (in `<head>`, where the live site's is not)
- JSON-LD `@graph`: Organization, WebSite, WebPage, BreadcrumbList, FAQPage,
  OfferCatalog
- `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`
- `not-found.tsx`, `error.tsx`

### Forms
Both forms are Server Actions with zod validation, honeypot + fill-time check,
lazily-loaded reCAPTCHA v2 verified server-side, and SMTP sending two emails per
submission (team notification + user confirmation).

### Routes
All 43 created. Homepage is real; the other 42 are `noindex` stubs excluded from
the sitemap.

## Done — 30 Jul 2026

### About Us — the first inner page
`/about-us` is real content now, not a stub, and `indexable: true`.

Sections: page hero (breadcrumb + H1) · "Best in breed" story · the three
offices · "What you get" (the homepage component, as the Blade template also
reuses it) · industries chip cloud · client logo wall · skills & credentials ·
proposal form (again the homepage component).

Copy is carried over verbatim from
`clduk/resources/views/frontend/themes/theme-one/about-us.blade.php`. Nothing
was reworded away — the live page is CMS filler, see
[CONTENT-PARITY.md](CONTENT-PARITY.md#about-us--a-page-with-no-live-wording-to-preserve).

Two things were rebuilt rather than ported:

- **"Brands that trust our work"** — the ref's eight white cards hold opaque
  cream-background logo *artwork*, which is why its own CSS admits a dark cell
  "washed them out to nothing". The rebuild uses the seven transparent client
  wordmarks the homepage marquee already runs, knocked out white on a hairline
  wall, with the eighth cell carrying the project count. Asset problem, not a
  CSS problem.
- **The page hero artwork** — transparent PNG-style art, so it gets a brand glow
  instead of the ref's rounded card and drop shadow.

New shared pieces: `components/ui/Breadcrumbs.tsx` (feeds the visible trail and
the `BreadcrumbList` node from one array) and `content/clients.ts` (the client
list, now with real brand names as alt text, read by both the marquee and the
wall). `content/site.ts` offices gained address, phone and photo, so the About
cards, the footer and the `Organization` JSON-LD all read one record.

### Contact Us — the second inner page
`/contact-us` is real content now, not a stub, and `indexable: true`.

Sections: page hero (breadcrumb + H1 + call/email buttons) · the enquiry form ·
the three offices. Copy is carried over verbatim from
`clduk/resources/views/frontend/themes/theme-one/contact-us.blade.php`.

The live page is the stock CMS template with a three-field form, and its
controller never sets a meta description — so the only load-bearing string is
the `<title>`, `Contact Us | Creative Logo Design`, which the new page
reproduces byte for byte. See [CONTENT-PARITY.md](CONTENT-PARITY.md).

Two components are shared rather than duplicated, because the redesign draws
them identically on both pages:

- **`components/about/Offices.tsx`** now takes a `copy` prop. Same three cards,
  different heading — About says "Local insight, global reach", Contact says
  "Work with us wherever you are".
- **`ProposalForm`** gained `source` and `successTitle` props. The field set was
  already identical to the ref's contact form; what was wrong was the email a
  contact enquiry generated, which arrived titled "New proposal request". A
  hidden `form_source` input now picks the wording from a lookup table in
  `app/actions/forms.ts` — a table, not the raw string, because that value is
  visitor-editable and ends up in an email subject.

**`Recaptcha` now renders the compact variant when it has less than 304px of
room.** The widget is a fixed-size iframe; at 320px the form card is 230px wide
inside its padding, so the normal 304×78 widget pushed the whole page 29px past
the viewport — measured, not assumed. The clduk redesign scales it to 0.86 and
clips the overflow, which still overflows at 320px. The compact 164×144 variant
fits, and the reserved height is picked by a container query on the same
threshold as the JS, so nothing shifts when it loads. This fixes the homepage
proposal band and the lead panel too.

## Done — 31 Jul 2026

### The 36 service pages and the 4 legal pages — the site went content-complete
The last 40 stubs became real pages, and `indexable` flipped to `true` on every
one. There are now no stub pages left; `components/StubPage.tsx` is kept but
unused, for the next route that needs it.

**The service pages are one route, not 36 folders.** `app/(site)/[slug]/page.tsx`
covers every `group: "service"` entry, driven by `content/services/index.ts`. A
service route with no content module **fails the build** rather than quietly
prerendering a placeholder — the assertion is in that file.

Content came from two places, because the live site is served two ways:

- **17** from `clduk/config/services_content/*.php` — the config-driven pages.
- **19** transcribed from the per-service Blade views under
  `clduk/resources/views/user/<service>/`.

Both were checked against the captured HTML in
`clduk/_migration_backup/baseline/`. The merge mirrors the Laravel controller
exactly: one level deep, per top-level section, over `defaults.ts` — *not* a
recursive deep merge, so a list arrives whole or not at all.

The four legal pages are modelled as data (`content/legal/types.ts`), not HTML
strings: inline bold and links are `InlineRun` values, so the renderer needs no
`dangerouslySetInnerHTML` and a stray tag in the source can never become markup.

**All four are ported, not authored.** All four exist on the live site —
`routes/web.php:64-67`, with a Blade view each under
`clduk/resources/views/user/<slug>/index.blade.php`. Measured against those
views: privacy 124 strings / 1 miss, terms 163 / 1, refund 136 / 1, cookies
83 / 1 — and in every case the single miss is `metaDescription`, which is
authored because the live pages ship none. The copy itself is verbatim.

### Trailing slash — resolved, and it was not the question we thought
The long-standing blocker was written up as "Laravel canonicals with a slash,
Next without — find out which and match it". Measured against production, that
premise is wrong: `$canonicalURL` is set only in `FrontendController::index`, so
**every inner page ships `<link rel="canonical" href="" />`**, and both
`/seo` and `/seo/` return 200 with no redirect. An empty canonical resolves to
the requested URL, so both forms self-canonical. The live site has every inner
page duplicated across two URLs right now, with nothing to disambiguate them.

`trailingSlash: false` stays, because the live internal link graph — every
`route()` call — has no slash, and that is what Google consolidates on. The
sitemap that disagrees is a hand-written 10-entry file listing 5 URLs that 404.

No code change: the rebuild already 308s the slash form on every route group.
The reasoning and the measurements are in
[SEO-PLAYBOOK.md](SEO-PLAYBOOK.md#resolved--trailing-slash-keep-trailingslash-false)
so this does not get "fixed" back later.

### Page titles restored to the live wording
The service pages first shipped with tidied-up `<title>`s — `SEO` had become
`Search Engine Optimisation`, `PPC` had become `PPC Management`. That is exactly
the change this migration exists not to make: 20 of the 36 differed from the
live `<title>`, and only 4 of those were the documented copy-paste corrections.

All 14 undocumented ones are reverted to the live string, typos and title-cased
slugs included (`Ui Ux Design`, `Custom Wordpress Developement`).

**The same rule was then applied to the legal pages**, where two of the four had
drifted the same way: `/terms-and-conditions` shipped `Terms of Use` against a
live `Terms And Conditions`, and `/cookies-policy` shipped `Cookie Policy`
against a live `Cookies`. Both restored. Their **H1s are untouched** — the live
pages themselves disagree with their own `<title>` there (live H1 "Cookie
Policy", live `<title>` "Cookies"), and both sides of that are now reproduced
exactly. `/privacy-policy` and `/refund-policy` already matched.

Two follow-ons:

- **The visible breadcrumb no longer uses the title.** It reads `hero.breadcrumb`
  from the content module instead — a field that until now was authored in all 36
  files and read by nothing. So the crumb still says "UI & UX Design" while the
  `<title>` says what the live page says.
- **The JSON-LD `WebPage` name is `route.title` too.** It was `meta.title`, so on
  8 pages the page declared one name in structured data and another in `<title>`.

`content/services/index.ts` now fails the build if `routes.ts` and a module's
`meta.title` disagree, outside the four-entry `TITLE_CORRECTIONS` allowlist.
`-ise`/`-ize` is folded out, since British spelling in titles was already settled.

### `/creative-logo-design` — the first landing page
The first of six standalone landing pages on the live server. None of the six is
in the Laravel repo: each is its own static folder with its own Bootstrap 5
build, jQuery, Owl Carousel, Magnific Popup and PHPMailer endpoint. So unlike
the homepage there is no second version of the copy to reconcile — the live HTML
is the only version there has ever been.

Sections, in the live page's order: hero (H1 + £35 offer card + form) · client
marquee · nine pricing cards in three groups · discount band · All-In-One Combo ·
ten-logo portfolio · startup CTA · four capability cards · consultation CTA ·
four-stage process · fourteen named reviews · its own footer with a callback
form.

### Chrome moved out of the root layout
This page has **no navigation**, deliberately — it is a paid-traffic page whose
only exits are its own CTAs, two legal links and a Stripe checkout. A nested
layout can add chrome but never remove what a parent already drew, so:

- `app/layout.tsx` keeps only `<html>`/`<body>`, fonts, metadata and the global
  scripts
- `components/chrome/SiteChrome.tsx` holds the header, footer, WhatsApp FAB,
  lead-panel provider and `<main id="main">`
- `app/(site)/layout.tsx` wraps its 43 routes in it; `app/(landing)/` does not
- `app/page.tsx` moved to `app/(site)/page.tsx` — **no URL changed**
- `app/not-found.tsx` pulls `SiteChrome` in itself (a 404 can be served for any
  URL, so it renders in the root layout); `app/error.tsx` carries its own `<main>`

### Three things the live page could not say
Rebuilt as HTML rather than ported as bitmaps, which is not a copy change — it
is the first time the copy has been readable by anything but a human eye:

- **`£1599`**, the All-In-One Combo price, existed *only* inside `tag-01.webp`.
  No element on the live page states it in any textual form
- "MEGA SAVER DEAL" and "SPECIAL OFFER / 70% OFF / SHOP NOW ›" — 91KB of PNG
  holding a headline offer and a call to action

### Canonical — settled 1 Aug 2026
The live page canonicalises itself **to the homepage**, which is why it has never
ranked in its own right despite unique copy, its own title and its own meta
description. The rebuild is self-canonical and indexable.

**Client-confirmed on 1 Aug 2026: every landing page canonicals to itself, never
to the homepage.** The rule now covers all six, and the remaining five must have
the tag checked and dropped as they are rebuilt. Verified 44/44 across the built
site. Written up in
[SEO-PLAYBOOK.md](SEO-PLAYBOOK.md#the-landing-pages-canonical-was-pointing-at-the-homepage).

### Forms
Two new Server Actions (`submitLandingQuote`, `submitCallback`) with zod schemas,
sharing the existing anti-spam, reCAPTCHA and SMTP layers. The package a visitor
clicked rides in a hidden input and is matched against a `Set` built from the
content module before it can reach an email subject — the same guard, and the
same reasoning, as `PROPOSAL_SOURCES`.

The quote dialog replaces jQuery + Magnific Popup. It **mounts on open** rather
than shipping hidden, which sidesteps the `inert={false}` bug listed below
instead of repeating it.

### Assets
30 images pulled from the live server and re-encoded: **4.5MB → 333KB**. The
review thumbnails were 2084px JPEGs up to 1.1MB each, served as 64px circles.

The ten portfolio logos are re-cut square onto each logo's own background
colour, sampled a few pixels inside the edge — several files carry a 1px white
fringe that banded the tile when the corner was used. `platform.webp`, a single
9000px-wide strip of mixed-polarity client logos, is replaced by the existing
client marquee: the same asset problem, and the same answer, as the About page's
logo wall.

### One site-wide bug found and fixed
`HoneypotFields` hardcoded `id="hp_company_url"`, so every page with more than
one form emitted duplicate element IDs — invalid HTML, and it silently breaks
the `<label>` association for every copy after the first. Already true on the
homepage (2 forms); this page has 3. The id is now generated with `useId()`; the
`name` the Server Action reads is unchanged. **0 duplicate IDs across all 46
prerendered pages.**

Found by driving the dialog over CDP and reading back each field's
`input.labels[0]` — not by looking at it.

### Two shared tools improved
- **`scripts/audit-responsive.mjs`** now separates *contained* overflow (a rail
  slide, a marquee track — what a carousel is for) from real overflow. It was
  reporting the homepage as failing 12/12 widths when the document has never
  scrolled sideways, which made it useless for any page with a carousel.
- **`scripts/verify-landing-parity.py`** is new and checks **both** directions:
  every module string against the live page, and every live text run against the
  build. Matching is anchored on word boundaries — JSX that glues two text nodes
  into "Packagefor" passes a plain substring test on both halves, and that is a
  bug this check found.

## Done — 1 Aug 2026

### `/logo-design-offer` — the second landing page

The £19 offer page. Same shape as `/creative-logo-design` on the surface — no
site nav, own header and footer, nine packages, its own forms — but it is built
completely differently, and that changed the method.

**The live page serves no content.** It is a Create React App bundle: the server
returns a 3KB shell whose body is `<div id="root"></div>`, and 550KB of
JavaScript assembles every word in the browser. There is no HTML to diff. The
page has a `<title>`, a meta description and £45k-a-year of ad spend pointed at
it, and a crawler that does not execute scripts sees an empty div.

So the source had to be *rendered*, not fetched. `scripts/capture-rendered.mjs`
is new: it drives headless Chrome over CDP and refuses to write a capture whose
body is under 500 characters, because a shell capture would silently turn every
parity check into a no-op.

Sections, in the live page's order: offer bar → hero (H1 + quote form) → client
marquee → nine packages in three groups → nine service cards → As Featured In →
All-In-One Combo → four portfolio sets → five award badges → CTA band → six
reviews → support strip → footer with its own enquiry form.

### Seven things the live page could not say

None of this is new copy. It is the same words, reaching a crawler for the first
time — and it is most of the argument for the rebuild:

- **`£19`** — the headline price, and the number the ads bid on, exists only
  inside `price.webp`. The live `<h1>` reads "Bespoke Logo Design Starts from"
  and stops there
- **`£1199`** — the All-In-One Combo price, only inside `price1199.svg`
- **Six of the nine package cards** — the tab strip keeps one group in the DOM
- **Three of the four portfolio sets** — a five-second carousel. Their titles
  and descriptions were confirmed against the string literals in the bundle
- **Four of the six reviews** — two on screen at a time
- **All 36 client names** — each portfolio set is ONE bitmap with the 3×3 grid
  baked in, so no logo could carry alt text. Re-cut into individual tiles with
  the gutters *detected* rather than the pitch guessed, which is what stops the
  1px fringe that banded the tiles on the other landing page
- **Five award badges and five press logos** — shipped as `alt="Logo 1"` …
  `alt="Logo 7"`, so the awards the section exists to claim were named nowhere

### Two live bugs fixed

- **Both footer legal links 404.** They point at `/terms-and-conditions.html`
  and `/privacy-policy.html`; the pages exist without the `.html`. Verified with
  curl. Link text is unchanged, only the destination
- **No canonical and no `robots` tag at all.** The rebuild is self-canonical and
  indexable, per the rule the client confirmed on 1 Aug 2026

### Shared rather than duplicated

- **`components/landing/QuoteDialogBase.tsx`** — the modal's focus trap, Escape
  handling, scroll lock and "which package was clicked" now live in one file.
  Each page keeps a two-line wrapper binding it to its own copy and form, so
  none of `/creative-logo-design`'s imports changed
- **`submitLandingQuote`** gained a `form_source` lookup, matching the
  `PROPOSAL_SOURCES` pattern: both landing pages post to it, and the only thing
  distinguishing them in the notification email is a visitor-editable hidden
  input — so it is matched against a fixed table, never echoed

### Assets
40 images: 1.5MB → 529KB, plus 36 logo tiles cut from four composites. The
eleven client-marquee "SVGs" were dropped entirely — they are 5.9MB of
base64-encoded raster wrapped in SVG, the same asset problem as `platform.webp`,
and the existing client marquee already does the job.

### `/lp` — the third landing page

The £199 web-design offer page. Structurally the closest to
`/logo-design-offer` — client-rendered CRA bundle, no site nav, its own header
and footer — but it carries a bug neither other page has.

**The shell loads three JavaScript bundles, one of them `/logo-design-offer`'s
entire application.** That is why the HTML the server returns carries
`/logo-design-offer`'s `<title>` and meta description **byte for byte**, on a
page about web design. The page's real title, description and canonical are
injected by react-helmet at runtime and exist nowhere in the served document.

So before this rebuild, a crawler that did not execute JavaScript saw two
distinct URLs asserting the same title, the same description, no canonical on
either, and an empty `<div id="root">` on both.

Sections, in the live page's order: offer bar → hero (H1 + quote form) →
platform marquee → eighteen packages in six groups → nine service cards →
recognition strip → All-In-One Combo → four project write-ups + the app case
study → five award badges → CTA band → three reviews → contact band → support
strip → footer.

### Six things the live page could not say

Same words, reaching a crawler for the first time:

- **`£199`** — the headline price, and the number the ads bid on, exists only
  inside `saleprice.webp`. Its alt text is `"199"`: no currency, no context. The
  live `<h1>` reads "Custom Web Design / Starts from" and stops
- **`£1199`** — the All-In-One Combo price, an inline base64 PNG with
  `alt="Combo Icon"`. No element states it in any textual form
- **Three of the four project write-ups** — a five-second carousel holds one at
  a time. Their titles and descriptions were confirmed against the string
  literals in the bundle
- **Five award badges** — seven carousel slides holding five distinct images,
  shipped as `alt="Logo 1"` … `alt="Logo 7"`
- **Google Premier Partner, Inc. 5000 and Forbes** — the recognition strip's
  three claims, shipped as `alt="Description 1/2/3"`
- **Four project screenshots** — all four share one `alt="Project example"`

The eighteen pricing cards are deliberately *not* on that list: react-bootstrap
mounts every tab pane, so all six groups were already in the rendered DOM. They
are hidden from a user, not from a crawler.

### Three live bugs fixed

- **The Trustpilot badge links a different company.** It points at
  `trustpilot.com/review/webdesignmania.co.uk`. Both other landing pages link
  Creative Logo Design's own profile, and so does this one now
- **Both footer legal links 404** — `/terms-and-conditions.html` and
  `/privacy-policy.html`, the same bug as `/logo-design-offer`. Link text
  unchanged, destination corrected
- **A price renders without its currency symbol.** "Stationery Infinite
  Package" has `originalPrice: "1035"` in the source data, so the card shows
  "£315" struck through with a bare "1035"

### Shared rather than duplicated

- The five award badges are the *same artwork* `/logo-design-offer` already
  carries, so `award-1…5.webp` are reused rather than staged twice
- `QuoteDialogBase` now backs three pages, not two
- `submitLandingQuote`'s source table gained a `subject` field. It was
  hard-coding "New logo design enquiry", which is wrong for a page selling web
  design — and branching at the call site would have let the next landing page
  forget it

### Assets
35 files, 937KB → 336KB. Two icons existed only as base64 `data:` URIs inlined
in the live markup, so they were decoded out of the DOM rather than downloaded.

## Done — 3 Aug 2026

### `/seo-services` — the fourth landing page, and the only rebrand

The SEO retainer page. Server-rendered, unlike the two before it: a single 72KB
HTML file with its own `style.css`, Bootstrap 5 and Font Awesome off two CDNs,
one inline validation script and a PHPMailer endpoint. `curl` gets everything,
so no headless capture was needed.

Sections, in the live page's order: offer bar → hero (H1 + Google-result mockup
+ enquiry form) → trust strip → what is SEO → three pillars → industries →
big-agency comparison → services + industry marquee → on-page → Google Business
Profile → four-step process → three pricing tiers → nine-question FAQ → closing
CTA → footer.

**The live page is an un-rebranded third-party template.** It ships another
agency's name ("TinyBull") **ten times** — including a footer paragraph
explaining what the bull in the name symbolises — prices its plans in **US
dollars**, names its three tiers after bull breeds under the eyebrow "PICK YOUR
BULL", and quotes US geography (Lynchburg, Virginia), US healthcare law (HIPAA)
and US construction terms. Only the contact details, the logo and the social
links had ever been swapped.

Two of its claims are false about this business: "no outsourcing, no offshore
work" (there are three offices, named in the site's own `Organization` JSON-LD),
and two pricing tiers open "Everything in Starter" / "Everything in Premium" —
plan names that appear nowhere on the page, because its own tiers are cattle.

So this is **the one page whose copy was deliberately changed**, and the
exception is defensible only because the page has no ranking equity: its entire
`<head>` is a charset, a viewport, `<title>SEO Services</title>` and a canonical
pointing at the **homepage**. No description, no Open Graph, no robots tag. It
has never ranked in its own right.

Approved 3 Aug 2026. **Layout, section order and visual design are the live
page's, unchanged** — the design was signed off as-is, light theme included,
which makes this the only light-canvas page in the build. Every changed string
is in the `REBRAND` table in `scripts/verify-seo-services-parity.py`, which
fails the check in **both directions** if a string moves without an entry.

### The light theme

The other three landing pages are near-black. This one is white, so four shared
components gained a `tone` prop rather than a fork: `Field` (all three
controls), `FormStatus`, `QuoteDialogBase`, and `button.ts` (two new variants on
the page's own magenta → coral → cream ramp, which is *not* the site's
violet → magenta). `tone` defaults to `"dark"`, so no existing caller changed.

The palette is the live page's own `--rf-*` values, namespaced `seo-*` in the
`@theme` block so they generate real utilities. `seo-pink` is `#d1008f`, not
`magenta-500`'s `#cc067f` — close enough to look wrong if they drift, far enough
apart to be visible side by side.

### Twelve dead links, and the twelve things the live page could not say

Every CTA on the live page is `href="#"` — both hero buttons, all three pricing
buttons, both buttons in the closing band, the footer logo and both footer legal
links. They open the enquiry dialog now, labelled with the plan clicked so the
notification email names it.

The rebuild also gives the page a meta description, Open Graph and Twitter
tags, a self-referencing canonical, a `FAQPage` node built from the nine visible
questions, an `OfferCatalog` carrying the two real GBP prices, real `<label>`s
on all six inputs (the live form is placeholder-only — WCAG 3.3.2), accessible
names on three icon-only social links, and two legal links that resolve.

### The URL

Live: `/seo-services` **301s to `/seo-services/`**, and
`/seo-services/index.php` returns 200 — two URLs, no canonical to disambiguate
them. Next cannot serve a `.php` path from a static route folder and there is no
PHP left on the site, so the page is served at the clean `/seo-services` and
both live forms 308 to it. That settles the pattern for the two `index.php` form
pages still to come.

### A shared tool was measuring nothing

**`scripts/audit-responsive.mjs` could not detect horizontal overflow under
mobile emulation, and had not been able to since it was written.**

It compared `document.documentElement.scrollWidth` against
`window.innerWidth`. Under `Emulation.setDeviceMetricsOverride` with
`mobile: true`, Chrome **expands the layout viewport to fit overflowing
content** — so on exactly the pages the script exists to catch, `innerWidth`
grew to match the overflow and the difference was always zero.

Caught because this page's hero grid measured **447px wide at a 320px
viewport** — a 147px overflow, four failing widths — and the script called it
"12 widths clean". The probe now reads `documentElement.clientWidth`, which
stays pinned to the emulated width. Re-running it against the unfixed page
turns 0 failures into 4, which is the proof the fix works.

The cause on this page was a one-column grid: a grid item defaults to
`min-width: auto`, the mockup's search bar is `truncate` (`white-space: nowrap`)
whose min-content is the whole unbroken URL, and because every item shares the
single track the h1, the lead paragraph and both cards were dragged out with it.
`min-w-0` on the grid children fixes it.

### Then every page was re-measured, and three real defects fell out

The corrected tool was run over **all 47 routes × 12 widths**. It found
**60 failing measurements the old one had reported as clean** — none of them
introduced by this session's work, all of them pre-existing and simply
invisible:

- **All 36 service pages** scrolled 7px sideways at 320px.
  `components/services/Capabilities.tsx` renders a 2-column grid of `<li>`
  chips, each a flex row of tick + label. The `<li>` is a **grid** item and the
  label a **flex** item, so *both* default to `min-width: auto` and neither
  would shrink below the longest capability word. Fixing only the label removed
  the visibly-overflowing element while the document still scrolled, because
  the `<li>` was still sizing the track — both floors had to go, plus
  `break-words` for a word genuinely wider than its 132px cell.
- **`/cookies-policy` overflowed by up to 208px across five widths.** Below
  `lg` the legal layout is a single implicit `auto` grid track sized by its
  item's min-content, and `support@creativelogodesign.co.uk` is 32 unbreakable
  characters. At `lg` the existing `minmax(0,1fr)` already floored it, which is
  why nobody saw this on a laptop. `min-w-0` + `break-words`.
- **`/contentful-developers` overflowed 17px.** Three service pages carry a
  stat whose `suffix` is a sentence rather than a symbol — "+ years in headless
  CMS development" — rendered at `text-h3` extrabold in a 128px column, where
  "development" alone measures 165px. The copy is transcribed from the live
  page and is not ours to shorten, so `break-words` handles it; it is inert on
  the 93 stats whose suffix is "+".

All three are the same defect: **`min-width: auto` on a grid or flex item.**
It is worth knowing as a shape, because the audit tool could not see it and the
symptom (a page that scrolls a few px sideways on a phone) is easy to dismiss.

**Final: 564 measurements across 47 routes, 0 failing.**

### reCAPTCHA moved from v2 to v3

The client acquired v3 keys, and the two are not interchangeable in either
direction — a v3 site key will not render a v2 widget, and a v2 secret answering
a v3 siteverify call returns success with no score.

**The wire format did not change.** The token still posts as
`g-recaptcha-response`, so every form's markup and every server action's read of
that field are untouched. What changed is what fills it and what the server does
with it.

- **`components/forms/Recaptcha.tsx`** no longer renders a widget. It loads
  `api.js?render=<site key>` on first interaction, calls `grecaptcha.execute`,
  and writes the token into a hidden input. All the v2 sizing machinery is
  gone — the compact-variant switch, the container query, the reserved height,
  the `overflow-x-auto` guard. There is no iframe to fit into 320px any more,
  which retires the whole 304px problem documented under 31 Jul.
- **Tokens expire after 120s**, which a form being filled in will outlive. The
  token is re-minted every 100s while the form is engaged, so whatever posts is
  always fresh. This is the one genuinely new failure mode v3 introduces.
- **`lib/recaptcha.ts` now scores.** v3 returns 0.0–1.0 rather than pass/fail,
  so the threshold is ours to pick: `RECAPTCHA_MIN_SCORE`, defaulting to
  Google's 0.5. Below-threshold, expired (`timeout-or-duplicate`) and
  never-valid tokens are logged distinctly, because only the first two are worth
  reacting to by moving the number.
- **Actions are verified.** Each form mints its token under a name — `lead`,
  `proposal`, `landing_quote`, `callback`, `seo_enquiry` — and `guard()` passes
  the expected name to `verifyRecaptcha` as a literal argument. It is deliberately
  not read from `formData`: a visitor-supplied action would verify against itself
  and confirm nothing. The `action` prop and the `guard()` argument must stay in
  step.
- **The floating badge is hidden** in `globals.css`, because the bottom-right
  corner is the WhatsApp FAB's. Google permits that only with the "protected by
  reCAPTCHA" disclosure naming both policies, which `Recaptcha` now renders under
  every form. **The two must ship together** — hiding the badge without the text
  is a terms violation.
- The rejection message changed. "Please complete the captcha" was v2 wording;
  under v3 there is nothing to complete, and the three real causes (low score,
  expired token, script blocked) are all cleared by reloading.

`npx tsc --noEmit`, `npm run lint` and `npm run build` all clean; every route
still prerenders `○` or `●`.

**Not verified against live keys.** The score threshold in particular is a guess
until real traffic runs through it — watch the `[recaptcha] score … below
threshold` warnings for the first few days and move `RECAPTCHA_MIN_SCORE` if
genuine enquiries are being turned away.

## Done — 4 Aug 2026

### The honeypot was rejecting real people

Reported as "nodemailer is not working". It was not the mail layer: `guard()`
never reached it. A devtools capture of a hand-filled proposal form showed
`hp_company_url` and `company` carrying the *same* value — Chrome autofill, not
a bot.

Chrome classifies fields by regex over `name`/`id`/`label`, and `company` is one
of its strongest organization tokens, so it saw two company fields and filled
both. `autocomplete="off"` does not help: Chrome has ignored it for contact
profiles for a decade. And the off-screen positioning chosen over `display:none`
(to catch bots that skip hidden inputs) is exactly what left the field visible to
autofill, which *does* skip `display:none` but not a field with a real bounding
box. So this fired for every visitor with a saved profile — the ones most likely
to be real leads — and handed them `GENERIC_ERROR`.

- `HONEYPOT_FIELD` is now `hp_field`. No autofill-recognised token in the name;
  that alone is the fix.
- Added `data-1p-ignore`, `data-lpignore`, `data-form-type="other"` for
  1Password, LastPass and Dashlane, which fill harder than the browser does.
- The rejection now logs the *value*. Only the value distinguishes a caught bot
  from this bug recurring under a different heuristic.

### The fill-time check is gone

The same capture showed `hp_ts` empty, which `checkAntiSpam` treated as "skip
the timing check" — so it had been a no-op, silently. Two reasons, both
structural: it was client-stamped (the pages are prerendered, so a server-issued
token goes stale within hours), making it forgeable by design; and React 19
resets an uncontrolled form once its action resolves, restoring the input to its
empty `defaultValue`, while the mount-effect that wrote the stamp never re-ran.
Blank on every attempt after the first. Deleted rather than repaired — it was
protecting nothing it could not be talked out of.

### Still standing on one leg

`verifyRecaptcha` returns `true` when `RECAPTCHA_SECRET_KEY` is unset
(`lib/recaptcha.ts`), so reCAPTCHA is only a gate when that var is present. The
honeypot is what covers a missing key, which is the reason it was fixed rather
than removed. Neither check stops a human hand-submitting junk repeatedly —
that needs per-IP rate limiting in `guard()`, which does not exist yet.

### `/website-brief` and `/logo-brief` — the fifth and sixth landing pages

Both `index.php` forms only — no marketing copy to speak of, so unlike the
other four landing pages the point of the rebuild is almost entirely the form:
19 fields and three checkbox groups on the website brief, 18 fields in one
section on the logo brief. Both canonical to themselves (the live pages
canonical to the homepage, the same pre-existing bug the other four shipped
and the client ruled out on 1 Aug 2026), and both are the first version of
their page to carry a meta description that renders anywhere but a live
`<head>` a crawler never sees rendered.

The logo brief gained one field the live page has never had: **Email
Address**, approved 4 Aug 2026 — the live page collects no email, so it could
never send a confirmation. It is the one declared addition in
`scripts/verify-brief-parity.py`'s `ADDED` set for that page beyond the
boilerplate (title, description, success state) every rebuilt page adds.

Controls are a new shared pair, `components/landing/brief/fields.tsx`
(`BriefFieldControl`, `BriefSectionBlock`), deliberately not
`components/forms/Field.tsx` — that component is a floating-label control
sized for four-field dark-glass forms, and reusing it for two ~60-control
white-card forms would have meant threading a label-position variant through
a component three other forms depend on. Checkbox options already carry
`min-w-0` on both the grid item and the flex label span, so the "longest word
won't shrink" failure mode documented under 3 Aug 2026 never had a chance to
appear here — confirmed, not assumed, by the audit below.

`WebsiteBriefForm.tsx` and `LogoBriefForm.tsx` are deliberate near-twins; both
carry the same JSDoc middle paragraph ("Everything visible is driven by
`sections`, so the copy has exactly one home and
scripts/verify-brief-parity.py has one file to diff") and both pass
`tone="light"` to `<Recaptcha>` so the disclosure text renders `text-onlight`
against the white card instead of the dark-panel default, which would have
been unreadable here.

**Responsive audit, both pages, 12 widths (320 → 1920px) over CDP:**

| Width | `/website-brief` overflow | `/logo-brief` overflow |
|---|---|---|
| 320px | 0 | 0 |
| 360px | 0 | 0 |
| 390px | 0 | 0 |
| 414px | 0 | 0 |
| 480px | 0 | 0 |
| 600px | 0 | 0 |
| 768px | 0 | 0 |
| 834px | 0 | 0 |
| 1024px | 0 | 0 |
| 1280px | 0 | 0 |
| 1440px | 0 | 0 |
| 1920px | 0 | 0 |

24 measurements, 0 failing, 1 h1 at every width on both pages, 0 images
missing `width`/`height`, 0 elements held by a contained rail (neither page
has a carousel). Confirmed by eye at 320px and 1440px against a served
production build: the logo is not stretched, labels read `text-onlight` (not
a `/40` white) against the white card, every text control shows a visible
`focus:ring-2 focus:ring-magenta-500/30` and every checkbox a
`focus-visible:ring-2`, and the submit button is `w-full` and reachable on
both pages.

No overflow fix was needed — Tasks 5–7 already applied the `min-w-0` lesson
from 3 Aug 2026 before this audit ran.

## Verified

| Check | Result |
|---|---|
| `npm run build` | Passes — 51 pages prerendered; 14 rows `○ (Static)` + `/[slug]` `● (SSG)` over 36 paths. Nothing `ƒ (Dynamic)` |
| `npx tsc --noEmit` | Clean |
| `npm run lint` | Clean |
| Heading hierarchy | 1 × h1, 17 × h2, 9 × h3 (live: 56 headings across 6 levels) |
| JSON-LD | 1 graph, 6 node types, parses, no `Review` |
| Homepage HTML | 453KB raw → **32.8KB brotli** |
| Content parity | All 6 live-wording reverts confirmed in output |
| Internal links | 44 unique, all resolve |
| Stub pages | None left — all 44 routes are content-complete and `indexable: true` |
| `/about-us` outline | 1 × h1, 7 × h2, 7 × h3 in the body (14 × h2 counting the footer and lead panel) |
| `/about-us` JSON-LD | Organization + WebSite + WebPage + BreadcrumbList, breadcrumb matches the visible trail |
| `/about-us` responsive | No horizontal overflow at 320 → 1920px, measured over CDP |
| `/contact-us` title | `Contact Us \| Creative Logo Design` — byte-identical to the live `<title>` |
| `/contact-us` outline | 1 × h1, 2 × h2, 3 × h3 in the body (9 × h2 counting the footer and lead panel) |
| `/contact-us` JSON-LD | Organization + WebSite + WebPage + BreadcrumbList, breadcrumb matches the visible trail |
| `/contact-us` responsive | No horizontal overflow and no overflowing element at 14 widths, 320 → 1920px, measured over CDP |
| reCAPTCHA at 320px | ~~Compact variant renders 164×144 and fits; reserved height matches, so no shift. Verified end-to-end against a build carrying Google's public test key~~ **Moot since the move to v3** — nothing is rendered, so there is no widget to fit. The check that replaces it is that the disclosure text wraps cleanly at 320px |
| Hero `sizes` | Now describes the wrapper (capped 520px, then 5/12 of the container) instead of a vw fraction. Measured against the then-1280px container: −42KB at 991px/2×, −11KB at 991px/1×, −7KB at 1440px/2×, no case worse. **The px tails were re-measured when the container was unified to 1560px** — the 5/12 slot is 583px there, not 467px, so the tail is now 584px. Any future container change must re-measure every hard-coded `sizes` tail |
| OG images | Every prerendered page now emits exactly one `og:image` + `twitter:image`. They were missing on all 42 inner pages — see [SEO-PLAYBOOK.md](SEO-PLAYBOOK.md#metadata) |
| `/creative-logo-design` content parity | **0 deviations, both directions** — 258 module strings against the live page, 214 distinct live text runs against the build. `python scripts/verify-landing-parity.py` |
| `/creative-logo-design` outline | 1 × h1, 13 × h2, 21 × h3. No skipped levels |
| `/creative-logo-design` responsive | 12 widths 320 → 1920px clean over CDP: zero document overflow, 1 h1 at every width, 0 images missing `width`/`height` |
| `/creative-logo-design` JSON-LD | One graph, 5 unique `@id`s, Organization + WebSite + WebPage + BreadcrumbList + OfferCatalog with 9 real GBP prices. No `Review` |
| Stripe checkout links | All 9 carried over byte-identical. These are live payment URLs |
| Live URL still resolves | `/creative-logo-design/` → 308 → `/creative-logo-design` → 200 |
| Landing page weight | 763KB raw → **95KB gzip** (brotli in production will be lower). 58% of the raw bytes are the RSC flight payload, same profile as the homepage |
| Sitemap | 44 URLs — every route, including the landing page |
| Layout move regression | `/`, `/about-us`, `/contact-us` re-audited at 12 widths after chrome moved into `(site)`: all clean, no URL changed |
| Quote dialog | Driven over CDP at 1440px and 320px: opens with the clicked package's name, `aria-modal="true"`, focus moves inside, body scroll locked, no document overflow, Escape closes it and restores scroll |
| Duplicate element IDs | 0 across all 46 prerendered pages (was 2–3 per page with a form) |
| Canonical | **44/44 pages canonical to themselves.** Structural — `buildMetadata()` derives it from the route's own path |
| `WebPage.name` vs `<title>` | 44/44 match. `titleWithSuffix()` was appending a second company name to `/creative-logo-design`, whose title ends `- Creative Logo Design` with a hyphen rather than the pipe the helper tested for |
| Service page parity | **All 36 modules** now gated, not 19: 3,184 copy strings against the live captures, 4 documented deviations, 0 new. `python scripts/verify-content-parity.py` exits 0 |
| Service page `<title>` | All 36 match the live `<title>` byte for byte, except the 4 in `TITLE_CORRECTIONS`. Measured against `clduk/_migration_backup/baseline/*.html`, and re-checked in the served HTML |
| JSON-LD name vs `<title>` | Identical on all 36. Was different on 8 |
| Service + legal responsive | ~~40 pages × 12 widths: **480 measurements, 0 failing**~~ — **this result was wrong.** It was produced by `audit-responsive.mjs` before 3 Aug 2026, when the overflow check could not detect overflow under mobile emulation at all (see that entry below). Re-measured with the corrected tool: all 36 service pages scrolled 7px at 320px and `/cookies-policy` by up to 208px. Both fixed; the row that supersedes this one is "Full re-audit after that fix" |
| Metadata across all 44 | Every page: unique `<title>`, unique non-empty description, self-referencing canonical, `index,follow`, exactly one `og:image` + `twitter:image`, exactly one h1 |
| Service assets | 210 unique image `src`s in `content/services/`, all resolve under `public/` |
| `docs/ROUTES.md` | Generated from `content/routes.ts`; `node scripts/gen-routes-table.mjs --check` exits 0 |
| `/logo-design-offer` content parity | **0 deviations, both directions** — 259 module strings against the live rendered DOM, 197 distinct live text runs against the build. `python scripts/verify-ldo-parity.py` |
| `/logo-design-offer` outline | 1 × h1, 11 × h2, 35 × h3. **No skipped levels** (the live page runs h6 → h1 → h2 → h5 → h6) |
| `/logo-design-offer` h1 | `Bespoke Logo Design Starts from £19` — the price is text for the first time |
| `/logo-design-offer` responsive | 12 widths 320 → 1920px clean over CDP: zero document overflow, 1 h1 at every width, 0 images missing `width`/`height` |
| `/logo-design-offer` JSON-LD | One graph: Organization + WebSite + WebPage + BreadcrumbList + OfferCatalog with 9 real GBP prices (19…1199). No `Review` |
| `/logo-design-offer` metadata | Unique `<title>` and description carried over verbatim, self-referencing canonical, `index, follow`, exactly one `og:image` + `twitter:image`. The live page has no canonical and no robots tag |
| `/logo-design-offer` duplicate IDs | 0 (16 ids, 16 unique) |
| `/logo-design-offer` quote dialog | Driven over CDP at 1440px and 320px: opens with the clicked package's name, `aria-modal="true"`, focus moves inside, body scroll locked, every input labelled, no document overflow, Escape closes it and restores scroll |
| `/logo-design-offer` footer legal links | Both resolve 200. Both 404 on the live page |
| `/logo-design-offer` weight | 740KB raw → **95KB gzip**, the same profile as the other landing page. The live page ships 550KB of JS before it renders a word |
| Live URL still resolves | `/logo-design-offer/` → 308 → `/logo-design-offer` → 200 |
| Landing-page regression | `/creative-logo-design`, `/`, `/about-us`, `/contact-us` re-audited at 12 widths after the shared `QuoteDialogBase` extraction: **60 measurements, 0 failing** |
| Sitemap | 45 URLs — every route, including both landing pages |
| Trailing slash | Live: `/seo` **and** `/seo/` both 200, no redirect, canonical empty on every inner page. Rebuild: 308 slash → no-slash on all four route groups. Measured with `curl` against production and the local build |
| `/lp` content parity | **0 deviations, both directions** — 528 module strings against the live rendered DOM, 304 distinct live text runs against the build. `python scripts/verify-lp-parity.py` |
| `/lp` outline | 1 × h1, 9 × h2, 45 × h3. **No skipped levels** (the live page runs h5 → h1 → h2 → h6 → h5 → h4) |
| `/lp` h1 | `Custom Web Design Starts from £199` — the price is text for the first time |
| `/lp` responsive | 12 widths 320 → 1920px clean over CDP: zero document overflow, 1 h1 at every width, 0 images missing `width`/`height` |
| `/lp` JSON-LD | One graph: Organization + WebSite + WebPage + BreadcrumbList + OfferCatalog with **18** real GBP prices (45…4994). 5 unique `@id`s. No `Review` |
| `/lp` metadata | Unique `<title>` and description in the document, self-canonical, `index, follow`, exactly one `og:image` + `twitter:image`. `WebPage.name` matches `<title>`. The live HTML has `/logo-design-offer`'s title and description and no canonical at all |
| `/lp` duplicate IDs | 0 (19 ids, 19 unique) |
| `/lp` quote dialog | Driven over CDP at 1440px and 320px: all 18 `START PROJECT` buttons present, opens with the clicked package's name, `aria-modal="true"`, focus moves inside, body scroll locked, 5/5 inputs labelled, no document overflow, Escape closes it and restores scroll |
| `/lp` weight | 870KB raw → **96KB gzip**, the same profile as the other two landing pages |
| Live URL still resolves | `/lp/` → 308 → `/lp` → 200 |
| Landing-page regression | `/`, `/creative-logo-design`, `/logo-design-offer`, `/about-us`, `/contact-us` re-audited at 12 widths after the `/lp` build and the `submitLandingQuote` change: **60 measurements, 0 failing.** All three other parity gates still exit 0 |
| Sitemap | 46 URLs — every route, including all three landing pages |
| `docs/ROUTES.md` | Regenerated; `node scripts/gen-routes-table.mjs --check` exits 0 |
| `/seo-services` content parity | **0 deviations, both directions** — 243 module strings against the live page, 225 distinct live text runs against the build, over a declared list of 29 wording changes + 13 authored strings. `python scripts/verify-seo-services-parity.py` |
| `/seo-services` rebrand is gated | Every changed string is declared in `REBRAND`; an undeclared change fails **both** directions. British/American spelling is folded rather than listed, so 40 mechanical `-ize`→`-ise` swaps do not bury the 29 that alter meaning |
| `/seo-services` outline | 1 × h1, 12 × h2, 42 × h3. **No skipped levels** (the live page runs h1 → h2 → h4 → h5) |
| `/seo-services` h1 | `Boost Your Business With SEO Services` |
| `/seo-services` responsive | 12 widths 320 → 1920px clean over CDP: zero document overflow, 1 h1 at every width, 0 images missing `width`/`height` |
| `/seo-services` JSON-LD | One graph, 6 unique `@id`s: Organization + WebSite + WebPage + BreadcrumbList + **FAQPage** (9 questions) + **OfferCatalog** (2 real GBP prices; the "Custom" tier is dropped rather than emitted with an empty `price`). No `Review` |
| `/seo-services` metadata | Unique `<title>`, authored description, self-referencing canonical, `index, follow`, exactly one `og:image` + `twitter:image`. `WebPage.name` matches `<title>`. The live page has **no description, no OG, no robots tag**, and canonicals to the homepage |
| `/seo-services` duplicate IDs | 0 (9 ids, 9 unique) |
| `/seo-services` enquiry dialog | Driven over CDP at 1440px and 320px: opens from a CTA carrying the plan name, `aria-modal="true"`, labelled by its title, focus moves inside, 7/7 inputs named, body scroll locked, no overflow while open, Escape closes and restores scroll. **All 26 checks pass at both widths** |
| `/seo-services` form field set | `first_name, last_name, email, subject, phone, message` — byte-identical to the live PHPMailer form's, now with a real `<label>` on each |
| `/seo-services` URL forms | `/seo-services` 200; `/seo-services/` **308**; `/seo-services/index.php` **308**. Live serves the last two as 200 and 301s the clean form the other way |
| **`audit-responsive.mjs` was measuring nothing** | It compared `scrollWidth` to `window.innerWidth`, which Chrome **expands to fit overflowing content** under mobile emulation — so the difference was always 0 on exactly the pages it exists to catch. Now reads `documentElement.clientWidth`. Proof: re-run against the unfixed hero, 0 failures → **4 failing widths** |
| Full re-audit after that fix | **All 47 routes × 12 widths = 564 measurements, 0 failing.** The first run with the corrected tool surfaced **60 failures the old one called clean** — all pre-existing, none from this session |
| Pre-existing overflow fixed | All 36 service pages (7px @ 320px, `Capabilities` grid **and** flex items both at `min-width: auto`); `/cookies-policy` (up to 208px across 5 widths, a 32-char email in an `auto` grid track); `/contentful-developers` (17px, a sentence-length stat suffix at `text-h3`) |
| Landing-page regression | `/`, `/about-us`, `/contact-us`, `/creative-logo-design`, `/logo-design-offer`, `/lp` re-audited after `Field`, `FormStatus`, `QuoteDialogBase` and `button.ts` each gained a `tone`: **84 measurements, 0 failing.** All four other parity gates still exit 0 |
| Canonical | **47/47 pages canonical to themselves** |
| Duplicate element IDs | **47/47 pages clean** |
| Sitemap | 47 URLs — every route, including all four landing pages |
| Live page has no tracking | `/seo-services/index.php` carries **one** `<script>`: a 17-line Bootstrap validation IIFE. No GA4, no Google Ads, no Meta Pixel, no ClickCease, no Chatra — unlike the other three landing pages. Nothing to reproduce, and nothing measuring it today |
| `/website-brief` + `/logo-brief` content parity | **0 deviations, both directions**, both pages. Website brief: 63 module strings forward, 58 distinct live runs reverse, 20/20 field names carried, 21 schema keys. Logo brief: 48 module strings forward, 49 distinct live runs reverse, 17/17 field names carried, 18 schema keys. `python scripts/verify-brief-parity.py` |
| `/website-brief` + `/logo-brief` responsive | 12 widths 320 → 1920px, both pages: **24 measurements, 0 failing.** Zero document overflow at every width including 320px, 1 h1 at every width, 0 images missing `width`/`height`, 0 elements held by a contained rail |
| `/website-brief` + `/logo-brief` by eye | Checked at 320px and 1440px against a served production build: logo not stretched, labels `text-onlight` against the white card, visible focus ring on every text control and every checkbox, submit button `w-full` and reachable |
| Build | Both routes prerender `○ (Static)` |
| `npx tsc --noEmit` / `npm run lint` / `node scripts/gen-routes-table.mjs --check` | All clean after the brief pages; 49 routes (3 core, 6 landing, 36 service, 4 legal) |
| Regression | The other five `verify-*.py` parity scripts still exit 0 after `lib/validation.ts` and `app/actions/forms.ts` gained the two brief schemas and actions |

## Not done yet

### Blocking launch
- [ ] **`.env` values** — SMTP credentials, reCAPTCHA **v3** keys (the client has
      them; v2 keys will not work), `NEXT_PUBLIC_GA_ID`. See `.env.example`.
      Forms currently log to console instead of sending, and with no secret set
      the captcha check is skipped entirely.
- [ ] **The landing pages' own ad tracking is not reproduced.** The live
      `/creative-logo-design/` carries GA4 `G-7KR6HYTBXR`, Google Ads
      `AW-16485403310` (with a `phone_conversion_number` call-tracking snippet)
      and Meta Pixel `857579736208052`. `/logo-design-offer/` carries the same
      GA4 and Google Ads IDs, plus **ClickCease** click-fraud monitoring and a
      **Chatra** live-chat widget (`eyAh3JkMfFQgfPTBQ`) — and its "Live Chat"
      CTAs go to WhatsApp in the rebuild, which is what the live buttons link
      to. `/lp/` carries the same five: GA4 `G-7KR6HYTBXR`, Google Ads
      `AW-16485403310`, Meta Pixel `857579736208052`, ClickCease and Chatra
      (`eyAh3JkMfFQgfPTBQ`), with the ClickCease loader duplicated in both
      `<head>` and `<body>`. Ad spend is attributed through these — decide
      where they belong before cutover, or conversions go dark.
      **`/seo-services/index.php` is the exception: it carries no analytics,
      no pixel and no tag manager at all** — its only script is a 17-line
      Bootstrap form-validation IIFE. So there is nothing to reproduce, and
      nothing measuring it today either.
- [ ] **`/seo-services` pricing needs client sign-off.** `£799`/`£999` are the
      live figures with the currency symbol corrected from `$`. The numbers
      were never confirmed as GBP prices — they came in with the template.
      They are also now in the page's `OfferCatalog` JSON-LD, so they are
      machine-readable. Confirm before cutover.

### The two remaining landing pages
Standalone folders, not in the Laravel repo. Rebuild each against its live page
and gate it with a parity script in both directions.

Check first whether the page renders server-side or in the browser — it decides
how you capture the source.

- [x] `/lp/` — **done, 1 Aug 2026.** Client-rendered; captured with
      `scripts/capture-rendered.mjs`
- [x] `/seo-services/index.php` — **done, 3 Aug 2026.** Server-rendered, so
      `curl` was enough. Served at `/seo-services`; see the rebrand note above
- [x] `/logo-brief/index.php` — **done, 4 Aug 2026.** Form only, served at
      `/logo-brief`
- [x] `/website-brief/index.php` — **done, 4 Aug 2026.** Form only, served at
      `/website-brief`

**The `.php` question is settled.** `/seo-services` set the pattern: serve at
the extension-less path, 308 the `index.php` form to it in `next.config.ts`, and
let `trailingSlash: false` handle the slash form. Do the same for both brief
pages — but check Search Console for inbound links first.
See [ROUTES.md](ROUTES.md#php-urls).

### Found while reviewing the contact page, left alone on purpose
Both are pre-existing and site-wide, so neither belongs in a page commit — but
they are real and should not be rediscovered from scratch.

- [ ] **Field label contrast fails WCAG AA.** `components/forms/Field.tsx` sets
      the floating label to `text-white/40`, which computes to **3.78:1** on the
      glass card. Body-size text needs 4.5:1. Affects every form on the site —
      the fix is a token decision (roughly `text-white/55`), not a contact-page
      change, and it moves the look of the homepage and the lead panel too.
- [ ] **`inert={false}` is a no-op.** `components/chrome/LeadPanel.tsx:111` and
      `components/chrome/Nav.tsx:312` spread `{...(!isOpen && { inert: false })}`,
      intending to make the closed panel inert. `inert={false}` *removes* the
      attribute, so the closed drawer and lead panel keep focusable content
      inside `aria-hidden="true"` — a keyboard user tabs into hidden controls.
      Confirmed in the prerendered HTML and over CDP. Chrome bug, not a page bug.

### Not verified by me
- [ ] Lighthouse run
- [ ] Google Rich Results Test (needs the public URL or a paste of the HTML)
- [ ] Live SMTP send — no credentials available
- [ ] Sign-off on the client brand names now used as alt text in
      `content/clients.ts` — they are read off the artwork, not from a list
- [ ] `assets/img/credentials/salesforce.webp` is the bare cloud mark with no
      wordmark, so it reads as a blob beside the others. Swap it if a
      lockup version exists.

### Deferred
- Blog, portfolio and case-study sections (neither is linked from the homepage)
- Laravel admin, auth, orders, invoices, packages
- Deployment and DNS cutover

## Reference material

| Path | What it is |
|---|---|
| `page-source.html` (repo root) | The **live** homepage HTML. Authoritative for copy. Gitignored. |
| `page-source-creative-logo-design.html` (repo root) | The **live** landing page HTML. The only source there is for it — it is not in the Laravel repo. Read by `scripts/verify-landing-parity.py`. Gitignored; re-capture with `curl -sSL https://creativelogodesign.co.uk/creative-logo-design/ -o page-source-creative-logo-design.html` |
| `page-source-lp.html` (repo root) | The **live** `/lp/` DOM *after hydration* — the served HTML has no content. Read by `scripts/verify-lp-parity.py`. Gitignored; re-capture with `node scripts/capture-rendered.mjs https://creativelogodesign.co.uk/lp/ page-source-lp.html` |
| `page-source-seo-services.html` (repo root) | The **live** `/seo-services/index.php` HTML. Server-rendered, so a plain fetch is enough. Read by `scripts/verify-seo-services-parity.py`. Gitignored; re-capture with `curl -sSL https://creativelogodesign.co.uk/seo-services/index.php -o page-source-seo-services.html` |
| `page-source-website-brief.html` (repo root) | The **live** `/website-brief/index.php`. Server-rendered, so a plain fetch is enough. Read by `scripts/verify-brief-parity.py`. Gitignored; re-capture with `curl -sSL https://creativelogodesign.co.uk/website-brief/index.php -o page-source-website-brief.html` |
| `page-source-logo-brief.html` (repo root) | The **live** `/logo-brief/index.php`. Same. Re-capture with `curl -sSL https://creativelogodesign.co.uk/logo-brief/index.php -o page-source-logo-brief.html` |
| `c:/Herd/clduk` | The Laravel app being replaced |
| `clduk/resources/views/user/home/*.blade.php` | The approved redesign markup |
| `clduk/public/assets/css/cld/*.css` | The redesign CSS (tokens only were ported) |
| `clduk/config/services_content/*.php` | Content for the 36 service pages |
| `node_modules/next/dist/docs/` | The v16 docs. **Read these, not your memory.** |
