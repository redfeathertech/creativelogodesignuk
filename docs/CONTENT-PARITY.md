# Content parity

## Why this file exists

Every page on `creativelogodesign.co.uk` currently ranks in Google. The brief
for this rebuild is explicit: **the content stays as it is**. Layout, CSS and
markup are free to change; the words are not.

This matters because there were **two** versions of the homepage copy in play:

| Source | What it is |
|---|---|
| `page-source.html` (repo root) | The **live** page. Rankings are based on this. **Authoritative.** |
| `clduk/resources/views/user/home/*.blade.php` | The approved redesign, built 27 Jul, **never deployed**. |

The redesign quietly reworded several lines. Since the live wording is what
ranks, **the live wording wins**. Copy the redesign added that has no live
equivalent is kept — additions carry no ranking risk.

## Reverted to live wording

These six were reworded in the redesign and have been reverted in
`content/home.ts` (each is marked `[live]` in a comment there).

| Live — **in use** | Redesign — rejected |
|---|---|
| "Want digital marketing that actually **covers expenses for itself**?" | "…actually pays for itself?" |
| "**When was the last time you gave** your website a thorough makeover?" | "When did you last give your website…?" |
| "Our team **understands your idea and makes it into** something special…" | "…takes your idea and turns it into…" |
| "We handle **each** detail. **Our** representative works closely with you to give the best outcome **and also gives personal advice**." | "We handle every detail. Your representative…" |
| "Stop guessing about **the new trends, start growing** with campaigns that **will** maximise every marketing pound." | "Stop guessing about new trends — grow with…" |
| `Your All-in-one solution` (title case) | `Your all-in-one solution` |

## Kept from the redesign (net-new, no live equivalent)

- The 8 FAQ answer paragraphs (live had bullets only) — these also feed the
  `FAQPage` schema, so they are a direct SEO gain
- The Results section figures: 40% / 1,200+ / 98% / 95%
- The proposal-form benefit bullets
- "Trusted by brands across the UK, USA and UAE"
- Hero secondary CTA "See our work"

## Deliberate non-copy corrections

Changes that are not indexed prose, made because they were defects:

| Was | Now | Why |
|---|---|---|
| `Alomofire` | `Alamofire` | Misspelling of the library name, in a decorative tool grid |
| `tel:02045112054` | `tel:+442045112054` | E.164 — the live link cannot be dialled from abroad |
| `0204-511-2054` (every page, the JSON-LD, all four landing pages, the `/contact-us` meta description) | `+44 7853 354207` | **Client instruction, 2026-08.** A business change, not a rewrite: the old number is being retired, so keeping it for parity would print a dead line. Held once in `contact` in `content/site.ts`; every occurrence derives from it. Declared in the `REPLACED` set of all four landing parity scripts |
| `alt="portfolio 1"`, `"Pen Tool 2"`, `"Logo 3"`, `"center"` | Descriptive alt text | Alt text is an accessibility and image-SEO signal, not body copy |
| 6 section titles at `h3`/`h4`/`h5` | `h2` | Heading **text** unchanged; only the level. Live picked levels by font size |
| 16 tool names as `<h4>` | `<p>` | "Figma", "CSS" are labels, not section headings — this was heading spam |
| 9 straight apostrophes across 6 service pages | `’` | `It's`, `We'll` ×3, `website's`, `that's`, `Don't`, `brand's` ×2, `blog's`. Every other apostrophe in the same paragraphs is already curly; the glyph is typography, not wording |

## About Us — a page with no live wording to preserve

`/about-us` is the first page after the homepage to get real content, and it is
the exception that proves the rule above: **there was nothing to keep.**

The live page is the stock CMS template (`about-us_old.blade.php`), and its copy
comes from the database, where it is unedited demo text — the `about_us` record
is titled `sdsad`, and "Our Mission", "Our Vision" and "Our Goals" all hold the
same boilerplate paragraph. Only the `<title>` ("About Us") carries any signal,
and that is kept.

So `content/about.ts` is entirely net-new, taken verbatim from the approved
redesign at
`clduk/resources/views/frontend/themes/theme-one/about-us.blade.php`. Two lines
have no equivalent there and are marked `[new]` in the file: the supporting line
under "Brands that trust our work", and the projects-delivered figure in the
logo wall (the same 1,200+ the homepage already states).

Check the same way before porting any other page: if the live page's copy is
real, it wins; if it is CMS filler, the redesign's copy is a straight gain.

## The 36 service pages

All of them now have real content. They came from two places, because the
Laravel repo was mid-migration when this rebuild started:

| Count | Source |
|---|---|
| 17 | `clduk/config/services_content/*.php` — already extracted into config |
| 19 | `clduk/resources/views/user/<service>/*.blade.php` — still hard-coded in Blade |

Both were checked against `clduk/_migration_backup/baseline/<slug>.html`, a
capture of each live page. For these pages the live page **is** the redesign —
unlike the homepage, there is no second version of the copy to reconcile.

That was verified mechanically, not by eye: every copy string in
`content/services/*.ts` is matched against the text of the corresponding
baseline HTML. **3,184 strings across all 36 pages, four deviations**, every one
of them documented — three additive, listed below, plus one stat fold on
`/digital-marketing`. Re-run it any time the content changes:

```bash
python scripts/verify-content-parity.py
```

It gated only the 19 Blade-ported modules until 31 Jul 2026, which left the 17
config-ported ones unchecked — the script now asserts it covers every module in
`content/services/` and exits 2 if one is missing. Exit 1 means a **new**
deviation; the four known ones are named in its `EXPECTED` set, so an exemption
that stops firing is also a failure rather than a place for the next one to hide.

### What the live pages had no version of

Five fields per page are net-new, because the live page has nothing in the slot:

- **`meta.description`** — every one of the 36 live pages ships
  `<meta name="description" content=" ">`. There was nothing to preserve, so
  each page now has a real 140–160 character description.
- **`hero.eyebrow`** / **`hero.breadcrumb`** — no equivalent element.
- **`hero.mediaAlt`, `solutions.imageAlt`, `advantages.imageAlt`** — the live
  alt text is `"Branding Services"` on every page and `"portfolio 1"` on the
  work grid. Same correction as the homepage made.
- **`cta.*`** — the live pages end on the shared proposal form, which is already
  its own component. The closing CTA band is part of the rebuilt design.

### Titles corrected

`<title>` must not change. It is the single most load-bearing string on a page
that already ranks, and unlike body copy there is no second chance to make the
same impression. **Four** live titles are exempt, because each is a copy-paste
defect naming a different page — worse for the URL than fixing it:

URLs below are the current ones; each page's pre-2026-08 URL is in brackets,
since the live `<title>` was served at that address (see
[ROUTES.md](ROUTES.md#the-2026-08-pillar-restructure)).

| URL | Live `<title>` | Now |
|---|---|---|
| `/automation-services/marketing-sales-automation` (was `/marketing-and-sales-automation`) | `SEO` | `Marketing & Sales Automation` |
| `/digital-marketing-services/social-media-marketing` (was `/social-media-management`) | `seo audit service` | `Social Media Management` |
| `/seo-services/seo-audit` (was `/seo-audit-service`) | `seo audit service` | `SEO Audit Services` |
| `/web-design-services/website-redesign` (was `/website-redesign-services`) | `Website ReDesign Services` | `Website Redesign` |

Those four, and only those four, are listed in `TITLE_CORRECTIONS` in
`content/services/index.ts`. The `-ise`/`-ize` split is separately settled toward
British spelling (`Page Speed Optimisation`), matching the URLs the business
already chose, and the drift check folds it out.

**Everything a rename does not cover keeps the live string, warts included.** The
service pages briefly shipped with 14 titles quietly *improved* — `SEO` expanded
to `Search Engine Optimisation`, `PPC` to `PPC Management`, `Google Analytics` to
`Google Analytics 4`. Reverted on 31 Jul 2026, and that revert still stands: an
unbriefed rewrite is not the same thing as the client's SEO plan renaming a page
(next section). One restored title looks wrong and is meant to:

| URL | Restored `<title>` | Why it looks broken |
|---|---|---|
| `/ui-and-ux-analysis` | `Ui Ux Analysis` | The CMS title-cased the slug |

Expanding `SEO` to `Search Engine Optimisation` throws away an exact-match
keyword on a URL Google already ranks. `Ui Ux Analysis` is uglier but it is what
is indexed; a title is not a design surface. If it should change, that is a
ranking decision to take deliberately in Search Console — add the URL to
`TITLE_CORRECTIONS` and to the table above, and the build will accept it.

### Titles renamed by the SEO plan

Distinct from both of the above, and the **only** sanctioned reason a `<title>`
changes. The client's SEO plan supplies a page name per URL, and where that name
differs from the live title the page takes the plan's name.

The reason this is safe where the 31 Jul rewrite was not: every rename ships
with that page's **URL move**, so the new title lands on a new URL that 301s
from the old one. No title is being swapped underneath a URL Google already
ranks — the redirect carries the history, and the plan's name is the keyword the
new URL is meant to win.

Fourteen pages are renamed so far, all from the first four service groups:

| Group | Live `<title>` | Plan's page name |
|---|---|---|
| Pillar | `Web Designing` | `Web Design Services` |
| Pillar | `Web Development` | `Web Development Services` |
| Pillar | `App Development` | `App Development Services` |
| Web design | `Custom Wordpress Developement` | `Custom WordPress Website Design` |
| Web design | `Responsive Website Design And Development` | `Responsive Website Design` |
| Web design | `Magento Design And Development Service` | `Magento Web Design` |
| Web design | `Corporate Blog Design Services` | `Corporate Blog Design` |
| Web design | `Content Management Systems` | `CMS Website Design` |
| Web dev | `Ecommerce Website Development` | `E-commerce Development` |
| Web dev | `Shopify Developers` | `Shopify Development` |
| Web dev | `Laravel Developers` | `Laravel Development` |
| Web dev | `Contentful Developers` | `Contentful Development` |
| Web dev | `AMP Web Design` | `AMP Development` |
| Web dev | `Custom 3D Product Configurators` | `Custom 3D Configurators` |

Each is declared in `RETITLED` in `scripts/verify-content-parity.py`, which pins
**both** ends: the live title it replaced (so a re-captured baseline re-opens the
question) and the plan's name it became (so the title cannot then drift to a
third value unnoticed). Renaming a page without adding its row fails the gate.

> ⚠️ Twelve of these fourteen went in unrecorded and passed the parity gate by
> accident — `meta.title` was checked by searching the live page's body text,
> and phrases like "Web Design Services" happen to occur in the page's own copy.
> Only `AMP Development` and `CMS Website Design` ever failed. A gate that fires
> on 2 of 14 identical decisions is not a gate; the `RETITLED` table is what
> replaced it. Do not add a rename by editing `meta.title` alone.

The visible breadcrumb is **not** the title, precisely so these three do not leak
onto the page: it reads `hero.breadcrumb` from the content module, which still
says "UI & UX Design". The JSON-LD `WebPage` name reads `route.title`, so the
structured data and the `<title>` can never disagree.

### The three copy deviations

All three are the same shape: the rebuilt components always render a label that
three individual live pages happen to omit. Each is an addition, not a
rewording, and each fixes a section that currently ships with no heading at all.

| Page | Field | What the live page does |
|---|---|---|
| `/corporate-blog-design-services` | `solutions.eyebrow` | The `WHAT WE DO` element is absent; every other page has it |
| `/page-speed-optimisation` | `howItWorks.workHeading` | Renders the 6-card work grid with the `Our Recent Work` heading block deleted |
| `/laravel-developers` | `howItWorks.workHeading` | Same — a headless carousel |

The two work grids are worth calling out separately: a carousel with no
accessible name is a real defect, so giving it the heading the other 34 pages
already have is a fix, not just consistency.

### The new sub-service pages, which have no live counterpart

The SEO plan's URL tables contain pages the Laravel site never had. There is
nothing to port and nothing to diff, so the parity rule above simply does not
reach them. Two sets exist so far:

| Set | Pages | Cloned from | Module |
|---|---|---|---|
| SEO | 8 (`/seo-services/technical-seo`, `on-page-seo`, `link-building`, `local-seo`, `ecommerce-seo`, `shopify-seo`, `wordpress-seo`, `keyword-research`) | `content/services/seo.ts` | `seo-placeholders.ts` |
| App development | 6 (`/app-development-services/android`, `ios`, `cross-platform`, `flutter`, `react-native`, `app-maintenance`) | `content/services/app-development.ts` | `app-placeholders.ts` |
| Branding | 7 (`/branding-services/brand-identity`, `brand-strategy`, `rebranding`, `brand-guidelines`, `packaging-design`, `stationery-design`, `business-card-design`) | `content/services/branding.ts` | `branding-placeholders.ts` |
| Digital marketing | 3 (`/digital-marketing-services/meta-ads`, `linkedin-ads`, `tiktok-ads`) | `content/services/digital-marketing.ts` | `digital-marketing-placeholders.ts` |
| Automation | 6 — the `/automation-services` **pillar** + `crm-automation`, `workflow-automation`, `email-automation`, `chatbot-development`, `ai-automation` | `content/services/marketing-and-sales-automation.ts` | `automation-placeholders.ts` |
| Logo design | 8 — the `/logo-design-services` **pillar** + all 7 sub-services | `content/services/branding.ts` | `logo-design-placeholders.ts` |

Each page spreads its source module whole and swaps only the strings that make
the page name itself: `meta.title`, `meta.description`, the hero
eyebrow/breadcrumb/heading/lead, the marquee, and the `whyChoose` heading. Both
modules are exempt from `scripts/verify-content-parity.py` (the `skip` set in
`assert_covers_every_module`) because the pages they describe do not exist
upstream — their source modules *are* checked, so the cloned strings are covered
at the root.

> ⚠️ **These 14 pages ship `indexable: true` on near-duplicate copy.** Below the
> swapped strings, all 8 SEO pages carry identical body content, as do all 6 app
> pages. That is the thin/duplicate-content shape
> [ROUTES.md](ROUTES.md#adding-a-route) warns about in step 5, accepted here so
> the URL tree and its internal linking go live in one move rather than
> trickling out per page. It is a deliberate, *temporary* trade and it is the
> main reason real copy is the next priority for both sets — not a pattern to
> extend to a third group without saying so out loud.

## The four legal pages

Privacy Policy, Terms of Use, Refund Policy and Cookie Policy are real
solicitor-written documents, not CMS filler, so they were **parsed** out of
`clduk/resources/views/user/<slug>/index.blade.php` rather than retyped — 778
text runs, every one verified to appear in the source before generation. See
`content/legal/types.ts` for why the inline markup is modelled as data.

Their **`metaDescription` is authored** — the live `<meta name="description">` is
empty on all four, so there is nothing to preserve.

Their **`metaTitle` is the live `<title>`, verbatim.** An earlier note here said
it was authored because the views carry `@section('title', 'Refund Policy')`
regardless of which document they render. Three of the four do say exactly that
(privacy, refund and cookies all claim "Refund Policy") — but it is dead code:
`frontend/layouts/app.blade.php:7` renders
`<title>{{ $pageTitle ?? ' ' }} | Creative Logo Design</title>`, and `$pageTitle`
comes from the controller, not the section. There is no `@yield('title')`
anywhere. So the live titles are `FrontendController`'s, and they are real:

| URL | Controller `pageTitle` | Live H1 | Our `metaTitle` / H1 |
|---|---|---|---|
| `/privacy-policy` | `Privacy Policy` | Privacy Policy | same / same |
| `/terms-and-conditions` | `Terms And Conditions` | Terms of Use | same / same |
| `/refund-policy` | `Refund Policy` | Refund Policy | same / same |
| `/cookies-policy` | `Cookies` | Cookie Policy | same / same |

Two of the live pages disagree with themselves — the `<title>` and the `<h1>` are
different strings — and **both sides are reproduced as they are.** `metaTitle`
feeds the `<title>` and the JSON-LD; `title` feeds the `<h1>` and the breadcrumb.
`/terms-and-conditions` and `/cookies-policy` briefly shipped their H1 wording in
the `<title>` too; corrected 31 Jul 2026 alongside the service pages.

## The landing pages

Six standalone landing pages live on the server outside the Laravel app — each
its own static folder, its own Bootstrap build, its own PHPMailer endpoint.
There is no Blade template to diff against and **no second version of the
wording**, which makes the live page authoritative without qualification. Two
are rebuilt — `/creative-logo-design` and `/logo-design-offer`; see
[ROUTES.md](ROUTES.md#the-other-four-landing-pages) for the rest.

Verify it — in **both** directions — with:

```bash
npm run build && python scripts/verify-landing-parity.py
```

FORWARD proves every string in `content/landing/creative-logo-design.ts` is on
the live page (catches a rewording). REVERSE proves every text run on the live
page is in the prerendered HTML (catches a drop). **258 module strings and 214
live text runs, zero deviations.** The reverse direction is the one a careful
read cannot do.

Both comparisons are anchored on word boundaries, which is not fussiness: JSX
that renders `{lead}<span>{trail}</span>` glues two text nodes into
"Packagefor", and a plain substring test passes on both halves while the page
reads wrong. That is a bug this check found.

### Preserved live quirks

Kept deliberately, because they are content and content is not ours to fix:

| Where | What | Why it was kept |
|---|---|---|
| Hero offer card | **Two** struck-through prices, `£117` and `£45` | Both are on the live page. `£117 → £35` is exactly the 70% the page advertises; `£45` has no stated relationship to anything and is very likely a copy-paste leftover. It is a price, so it needs sign-off, not a silent deletion |
| Reviews | `recomend`, `dilligent`, `Alan smith`, mixed straight and curly apostrophes | Quotations of other people. The apostrophe normalisation applied to our own prose is deliberately **not** applied here |
| Combo section | `Stationary Design` (should be "Stationery") | Live heading text |
| `<title>` | `Custom Logo Design Starting £35 - Creative Logo Design` | Verbatim, minus a trailing space |
| `og:title` | `Custom Logo Design Company in UK \| Creative Logo Design` | Differs from `<title>` on the live page too. Both kept |

### Copy that existed only as pixels

Four strings are on the live page but only inside a bitmap, where no crawler and
no screen reader can reach them. Transcribing them into HTML is not a change to
the copy — it is the first time the copy has been readable at all.

| String | Live source | Note |
|---|---|---|
| `Mega Saver Deal` | `images/mega-offer.webp` | 37KB sticker on the hero form |
| `Special offer` / `70%` / `off` | `images/cta-center-img.webp` | 54KB medallion that also baked in a "SHOP NOW ›" call to action |
| `Complete Branding` | `images/tag-01.webp` | |
| **`£1599`** | `images/tag-01.webp` | The combo package price. **No element on the live page states it in any textual form.** The page's headline offer was invisible to Google |

### One added string

`services.title` — "Everything your brand needs, in one place". The live
services section renders four `<h3>`s with no heading above them, so the outline
jumps a level with nothing to anchor it. An addition; nothing existing changed.

### Form plumbing that was replaced

None of this is indexed, and each is replaced by something doing the same job
better. The full list is in `REPLACED` in `scripts/verify-landing-parity.py`.

| Live | Now |
|---|---|
| 6 client-side validation messages in inline jQuery | zod schemas in `lib/validation.ts`, checked in the Server Action, so the browser and the server cannot disagree |
| `Submitting... Please be patient.` | a disabled button reading "Sending…", driven by `useActionState` |
| 5 placeholders on inputs with **no `<label>` at all** | a real floating `<label>` per field. The live hero form is placeholder-only, which fails WCAG 3.3.2 and leaves every input unnamed to a screen reader |
| `Avail 70% Discount` | unchanged, but the dialog mounts on open rather than shipping hidden in the HTML |

### Non-copy corrections

Same category as the homepage's, and for the same reasons:

| Was | Now | Why |
|---|---|---|
| 5 ❇️ emoji in a `<p>` as the star rating | `role="img"` + `aria-label="5 out of 5 stars"` star row | A screen reader announces the live one as "sparkle" five times |
| One `alt` across ten portfolio images; `"Client 5"` on four reviews | Per-logo alt text; review thumbnails marked decorative | Alt text is an a11y and image-SEO signal, not body copy |
| 3 straight apostrophes in `brand's` (process steps) | `’` | Typography, not wording — the same call as the nine on the service pages |
| 13 CTAs as `<a href="javascript:;">` | `<button type="button">` | Announce as links, do nothing without JS |
| 9 package names at `h5`, list labels at `h6` | `h3` / `<p>` | Heading **text** unchanged; only the level. The live page picks levels by font size |
| `tel:+02045112054` (6 links) | `tel:+442045112054` | `+0` is not a dialable E.164 number. The site-wide correction already recorded above |

## `/logo-design-offer` — a page with no HTML to diff

This one needed a different method, and the reason is worth stating plainly:
**the live page serves no content at all.** It is a Create React App bundle. The
server returns a 3KB shell whose entire body is `<div id="root"></div>`, and
every word is assembled in the browser from a 550KB JavaScript file. `curl`
captures none of the copy, and neither does anything that does not run scripts.

So "the live page" here means its DOM after hydration:

```bash
node scripts/capture-rendered.mjs \
  https://creativelogodesign.co.uk/logo-design-offer/ \
  page-source-logo-design-offer.html
python scripts/verify-ldo-parity.py
```

`capture-rendered.mjs` drives headless Chrome over CDP and **fails rather than
writes** if the body comes back under 500 characters — a capture of an
un-hydrated shell would otherwise turn every parity check into a silent no-op.

**259 module strings and 197 live text runs, zero deviations, both directions.**

### What only the rebuild says

Not new copy — the same words, reaching a crawler for the first time:

| Copy | Where it was | Why it was unreachable |
|---|---|---|
| `£19` | `price.webp` | The hero's headline price, and the number the ad spend bids on, painted into a bitmap. The live `<h1>` reads "Bespoke Logo Design Starts from" and stops |
| `£1199` | `price1199.svg` | The All-In-One Combo price. No element states it in any textual form |
| 6 of 9 package cards | tab strip | The live page keeps one group in the DOM; six prices and six feature lists are never in the document at once |
| 3 of 4 portfolio sets | 5-second carousel | Titles and descriptions for Pet Care, Construction and Every Industry. Confirmed against the string literals in the live bundle |
| 4 of 6 reviews | carousel | Two on screen at a time |
| All 36 client names | four 3×3 bitmaps | Every logo grid is one image with the names baked in, so no logo could carry alt text. Re-cut into individual tiles here — gutters detected, not pitch-guessed |
| 5 award badges, 5 press logos | `alt="Logo 1"` … `alt="Logo 7"` | The awards the section exists to claim were named nowhere. Read off the artwork and listed in `AUTHORED` in the verify script |

### Non-copy corrections

| Was | Now | Why |
|---|---|---|
| No canonical, no `robots` | Self-canonical, `index, follow` | The live page emits neither. See [SEO-PLAYBOOK.md](SEO-PLAYBOOK.md) |
| Footer links to `/terms-and-conditions.html` and `/privacy-policy.html` | `/terms-and-conditions`, `/privacy-policy` | **Both live links 404** (verified with curl, 1 Aug 2026). Link text unchanged |
| Offer bar as `<h6>`, prices as `<h2>`, package names as `h5`/`h6` | `<p>`, `h3` | The outline started at level 6, then jumped to `h1`, then put nine bare prices at section level. Heading **text** unchanged; only the level |
| Placeholder-only form inputs | Real `<label>` on every field | Placeholder-only fails WCAG 3.3.2 and leaves the inputs unnamed |
| Nine `START PROJECT` buttons with no accessible package context | Package name carried into the dialog and the enquiry email | |
| 25KB base64 `data:` URI icon inlined in the markup | The shared phone icon | Re-sent with the document on every visit, and uncacheable |

## `/lp` — the same problem, plus a duplicate-title bug

Client-rendered like `/logo-design-offer`, and captured the same way:

```bash
node scripts/capture-rendered.mjs https://creativelogodesign.co.uk/lp/ \
  page-source-lp.html
python scripts/verify-lp-parity.py
```

**528 module strings and 304 live text runs, zero deviations, both directions.**

What makes this page worse than the other two is the shell. It loads **three**
JavaScript bundles, one of which is `/logo-design-offer`'s entire application —
which is why the HTML the server returns carries

```
<title>Professional Bespoke Logo Design Services - Creative Logo Design</title>
<meta name="description" content="Creative Logo Design in Wembley, UK, offers custom logo creation, …">
```

— **byte-identical to `/logo-design-offer`'s**, on a page about web design. The
page's real title, description and canonical are injected by react-helmet at
runtime and appear nowhere in the served document. So a crawler that does not
execute JavaScript sees two distinct URLs asserting the same title, the same
description, no canonical on either, and no body content on either.

The rebuild serves the react-helmet values in the document, which is what the
page has always meant to say.

### What only the rebuild says

| Copy | Where it was | Why it was unreachable |
|---|---|---|
| `£199` | `saleprice.webp`, `alt="199"` | The hero's headline price. The live `<h1>` reads "Custom Web Design / Starts from" and stops; the alt text is a bare number with no currency and no context |
| `£1199` | inline base64 PNG, `alt="Combo Icon"` | The All-In-One Combo price. No element states it in any textual form |
| 3 of 4 project write-ups | 5-second carousel | Healthcare Management System, Learning Management System (LMS) and Custom E-commerce Website. Confirmed against the string literals in the live bundle |
| 5 award badges | `alt="Logo 1"` … `alt="Logo 7"` | Seven slides holding five distinct images, the first two repeated to pad the loop. Named nowhere |
| Google Premier Partner, Inc. 5000, Forbes | `alt="Description 1/2/3"` | The three claims the recognition strip exists to make |
| 4 project screenshots | `alt="Project example"` ×4 | One placeholder shared by all four |

The eighteen pricing cards are **not** in this list. react-bootstrap mounts
every tab pane, so all six groups are in the rendered DOM even though only three
cards are visible without a click — invisible to a user, not to a crawler.

### Non-copy corrections

| Was | Now | Why |
|---|---|---|
| Served `<title>`/description are `/logo-design-offer`'s; real ones JS-only | The page's own, in the document | See above. Two URLs currently claim one title |
| No canonical in the HTML | Self-canonical | The live canonical exists only after hydration |
| Trustpilot badge links `trustpilot.com/review/**webdesignmania.co.uk**` | `…/creativelogodesign.co.uk` | A different company's Trustpilot profile. The badge artwork is unchanged |
| Footer links to `/terms-and-conditions.html` and `/privacy-policy.html` | `/terms-and-conditions`, `/privacy-policy` | **Both 404** — the same live bug as `/logo-design-offer`. Link text unchanged |
| "Stationery Infinite Package" was-price renders as bare `1035` | `£1035` | The currency symbol is missing from the live source data; every other card has it. The number is unchanged |
| Offer bar as `<h5>`, prices as `<h2>`, package names as `h5`/`h6`, review heading `h4` under the reviewer's `h5` | `<p>`, `h3` | The outline opened at level 5, jumped to `h1`, then put eighteen bare prices at section level. Heading **text** unchanged; only the level |
| "Contact Us" as an `<h3>` above the section's `<h2>` | Eyebrow paragraph | Inverted outline |
| Placeholder-only form inputs (all three forms) | Real `<label>` on every field | Placeholder-only fails WCAG 3.3.2 |
| Three icon-only social links with no accessible name | Named | |
| Marquee duplicated by `cloneNode()` in a `useEffect` | CSS keyframe, duplicate pass `aria-hidden` | Every platform was announced twice |
| 11KB base64 `data:` URI icon inlined in the markup | A cacheable image | Re-sent with the document on every visit |
| Leading `&nbsp;` on the "Cloud Solutions" body; trailing space on a Platinum SEO feature | Trimmed | Whitespace, not wording |

## `/seo-services` — the one page that was rebranded, not ported

**This is the only page in the rebuild whose copy was deliberately changed, and
the exception needs to stay an exception.** Read this section before touching
`content/landing/seo-services.ts`.

### What the live page actually is

`https://creativelogodesign.co.uk/seo-services/index.php` is an **un-rebranded
third-party template**. It is server-rendered (unlike `/logo-design-offer` and
`/lp`), a single 72KB HTML file with its own `style.css`, Bootstrap 5 and Font
Awesome off two CDNs. Only the contact details, the logo and the social links
were ever swapped for Creative Logo Design's.

Everything else still belongs to an agency called **TinyBull**:

| What | Where |
|---|---|
| The name "TinyBull" | **10 occurrences**, including the footer's entire About paragraph — "Some of you may be wondering, what is TinyBull? Well, a bull is symbolic for determination…" |
| Pricing tiers named after bull breeds | `LONGHORN`, `BRAHMA`, `EL GRAN TORO`, under the eyebrow **"PICK YOUR BULL"** |
| Bull wordplay in headings | "No Hidden Fees. **No Bull.**", "No long-term contracts. **No bull.**" |
| **US dollars** | `$799/mo` and `$999/mo`, on a site that prices everything else in £ |
| US geography | "Lynchburg, **VA**" ×4, "custom home builder **VA**" |
| US healthcare law | "**HIPAA**-sensitive content" — no application to a UK clinic |
| US construction | "crawl space repair cost" — crawl spaces are rare in UK housing |
| A false claim about this business | "7 in-house team members — **no outsourcing, no offshore work**". This company runs three offices (Wembley, Edison NJ, Dubai) and says so in its own `Organization` JSON-LD |
| A bug in the template itself | Two tiers open "Everything in **Starter**" / "Everything in **Premium**" — plan names that appear nowhere, because its own tiers are named after cattle |

### Why the parity rule does not apply

The rule exists to protect rankings. This page has none to protect, and that is
measurable rather than assumed:

```html
<title>SEO Services</title>
<link rel="canonical" href="https://creativelogodesign.co.uk/" />
```

That is the whole of its `<head>` beyond a charset and a viewport. It
**canonicalises itself to the homepage**, ships no meta description, no Open
Graph tags and no robots directive. It has never ranked in its own right, so
there is no equity a rewording can cost.

Set against that: publishing another company's brand name ten times on the
client's own domain, quoting US dollars to UK buyers, and asserting "no offshore
work" about a business with two overseas offices.

**Approved 3 Aug 2026.** Layout, section order and visual design are the live
page's, unchanged — the design was signed off as-is. Only the words moved.

### The full list of changes

Every one is declared in `REBRAND` in `scripts/verify-seo-services-parity.py`,
which is the enforcement point: a string that changes without an entry there
fails the check **in both directions**.

| Live | Rebuild | Why |
|---|---|---|
| "…TinyBull provides fully custom SEO plans!" | "…Creative Logo Design provides…" | Another agency's name |
| "— TINYBULL SEO TEAM" | "— CREATIVE LOGO DESIGN SEO TEAM" | " |
| "THE TINYBULL APPROACH" | "OUR APPROACH" | " |
| "WHY TINYBULL" | "WHY CREATIVE LOGO DESIGN" | " |
| "THE TINYBULL DIFFERENCE" / "EXPERIENCE" | "THE CREATIVE LOGO DESIGN …" | " |
| "TinyBull builds all three simultaneously" | "We build all three simultaneously" | " |
| "TinyBull is different" | "We're different" | " |
| "Either way, TinyBull can help." | "Either way, we can help." | " |
| The footer's "what is TinyBull?" paragraph | `site.description` | An explanation of a name this business does not have |
| "PICK YOUR BULL" | "CHOOSE YOUR PLAN" | Wordplay on the template's name |
| "No Hidden Fees. No Bull." | "No Hidden Fees. No Surprises." | " |
| "No long-term contracts. No bull." | "…No surprises." | " |
| `LONGHORN` / `BRAHMA` / `EL GRAN TORO` | `LAUNCH` / `GROWTH` / `ENTERPRISE` | Bull breeds, meaningless here |
| "Everything in Starter" / "in Premium" | "Everything in Launch" / "in Growth" | Referenced tiers that did not exist. **Now resolves for the first time** |
| `$799` / `$999` | `£799` / `£999` | US dollars on a UK site. Figures unchanged, symbol corrected |
| "7 in-house team members — no outsourcing, no offshore work" | "A dedicated in-house team across our UK, US and Dubai offices" | The live claim is false about this business |
| "HIPAA-sensitive content" | "GDPR-sensitive content" | US federal law → the actual UK obligation |
| "Best HVAC in Lynchburg, VA" | "Best HVAC in London" | US geography |
| "…serving Lynchburg since 2010. 5-star rated, licensed & insured." | "…serving London since 2010. 5-star rated, fully accredited & insured." | " + "licensed" has no UK equivalent for this trade |
| "best plumber in Lynchburg," | "best plumber in Manchester," | " |
| "best dentist in Lynchburg VA" | "best dentist in London" | " |
| "moving company Lynchburg" | "moving company Manchester" | " |
| "custom home builder VA" | "custom home builder Surrey" | " |
| "crawl space repair cost" | "damp proofing cost" | US construction term |
| US spelling throughout | British | The rest of `content/` runs 178 `-ise`/`-isation` against 56 `-ize`/`-ization`. **Folded, not listed** — the parity script normalises both sides, so forty mechanical swaps do not bury the changes above |

### What only the rebuild says

| | |
|---|---|
| A meta description | The live page has none. Neither do Open Graph or Twitter tags |
| A self-referencing canonical | The live one points at the homepage |
| A `FAQPage` node | Nine visible Q&As, described for the first time |
| An `OfferCatalog` | The two real GBP prices. The "Custom" tier is deliberately **not** described — an `Offer` with an empty price invalidates the whole node |
| Real `<label>`s on six inputs | The live form is placeholder-only: WCAG 3.3.2 |
| Named social links | Three icon-only links with no accessible name |
| Two working legal links | The live footer has none — its logo and both legal destinations are `href="#"` |

### Non-copy corrections

| Was | Now | Why |
|---|---|---|
| **12 CTAs are `href="#"`** — both hero buttons, all three pricing buttons, both closing-band buttons | Open the enquiry dialog, labelled with the plan clicked | Every call to action on a paid-traffic page was dead |
| Canonical → homepage | Self-canonical | The rule the client confirmed 1 Aug 2026 |
| FAQ built from `<input type="radio">` | `<details name="seo-faq">` | The radio version can never be **closed** once opened, and the exclusive-accordion behaviour is native now |
| Bootstrap 5 + Font Awesome off two CDNs | Tailwind + 13 inline SVGs | A render-blocking stylesheet and a webfont, for thirteen glyphs |
| Marquee list hard-coded twice in the markup | Held once, second pass `aria-hidden` | A screen reader announced all fourteen industries twice |
| `h4`/`h5` for card and feature titles | `h3` under each section's `h2` | The outline ran h1 → h2 → h4. Heading **text** unchanged; only the level |
| Live `<title>` "SEO Services", no suffix | "SEO Services \| Creative Logo Design" | The root layout's template. The stem is the live wording |

## Rules for future edits

1. Changing a heading or paragraph in `content/` **changes what ranks**. Get it
   signed off first.
2. Adding content is low-risk. Removing or rewording is not.
3. Check every port against the **live** page, not against the Blade view — and
   check it with the script, not by reading.
4. Never change a URL. See [ROUTES.md](ROUTES.md).

## How to verify

```bash
npm run build

# the 36 service pages, against clduk/_migration_backup/baseline/*.html
python scripts/verify-content-parity.py

# /creative-logo-design, both directions, against the captured live page
python scripts/verify-landing-parity.py

# /logo-design-offer, both directions. Its live page renders client-side, so
# the capture has to run the page rather than fetch it.
node scripts/capture-rendered.mjs \
  https://creativelogodesign.co.uk/logo-design-offer/ \
  page-source-logo-design-offer.html
python scripts/verify-ldo-parity.py

# /lp, both directions. Also client-rendered.
node scripts/capture-rendered.mjs https://creativelogodesign.co.uk/lp/ \
  page-source-lp.html
python scripts/verify-lp-parity.py

# /seo-services, both directions. Server-rendered, so curl is enough — but the
# REBRAND table in the script is the real gate: it is the only page whose copy
# was deliberately changed, and an undeclared change fails both directions.
curl -sSL https://creativelogodesign.co.uk/seo-services/index.php \
  -o page-source-seo-services.html
python scripts/verify-seo-services-parity.py

# the six homepage reverts
node -e '
const fs=require("fs");
const h=fs.readFileSync(".next/server/app/index.html","utf8");
for (const s of ["actually covers expenses for itself",
                 "When was the last time you gave",
                 "understands your idea and makes it",
                 "about the new trends, start growing"])
  console.log(h.includes(s)?"OK  ":"MISS", s);
'
```
