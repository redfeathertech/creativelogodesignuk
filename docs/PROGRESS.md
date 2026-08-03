# Progress

Where the rebuild stands. Update this at the end of each working session.

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
| reCAPTCHA at 320px | Compact variant renders 164×144 and fits; reserved height matches, so no shift. Verified end-to-end against a build carrying Google's public test key |
| Hero `sizes` | Now describes the wrapper (capped 520px, then 5/12 of the container) instead of a vw fraction. Measured: −42KB at 991px/2×, −11KB at 991px/1×, −7KB at 1440px/2×, no case worse |
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

## Not done yet

### Blocking launch
- [ ] **`.env` values** — SMTP credentials, reCAPTCHA keys, `NEXT_PUBLIC_GA_ID`.
      See `.env.example`. Forms currently log to console instead of sending.
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
- [ ] `/logo-brief/index.php` — form only
- [ ] `/website-brief/index.php` — form only

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
| `c:/Herd/clduk` | The Laravel app being replaced |
| `clduk/resources/views/user/home/*.blade.php` | The approved redesign markup |
| `clduk/public/assets/css/cld/*.css` | The redesign CSS (tokens only were ported) |
| `clduk/config/services_content/*.php` | Content for the 36 service pages |
| `node_modules/next/dist/docs/` | The v16 docs. **Read these, not your memory.** |
