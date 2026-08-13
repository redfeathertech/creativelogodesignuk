# Routes

**49 routes, all indexable and all in the sitemap.** 3 core + 6 landing +
36 service + 4 legal.

Mirrors `content/routes.ts`, which is the single source of truth — it drives the
dynamic service routes, `app/sitemap.ts`, the 301 table in `next.config.ts`
(via `content/legacy-redirects.json`), and this file.

## The 2026-08 pillar restructure

The 36 service URLs were flat (`/ppc`, `/shopify-developers`, …). In August
2026 they were restructured to the SEO plan's pillar tree: 8 pillars, each
sub-service nested one level under its pillar
(`/digital-marketing-services/ppc`). 34 URLs moved; every old URL 301s to its
new home via `content/legacy-redirects.json`. Two service URLs did **not**
move:

- **`/seo`** — the plan's SEO pillar URL is `/seo-services`, which is occupied
  by the paid-traffic landing page. Folding the general SEO page into it is a
  content decision that needs sign-off, so `/seo` stays put for now.
- **`/ui-and-ux-analysis`** — not in the SEO plan. It ranks, so it keeps its
  URL and its menu link until the plan gives it a slot.

The pillar pages `/automation-services` and `/logo-design-services` are in the
plan but do not exist yet. Automation already has one sub-service nested under
its prefix; logo design has none — nothing sits under `/logo-design-services`,
and its menu group points at the `/creative-logo-design` landing page instead.
Each pillar route gets added (`indexable: false` first, as ever) the day it has
real content. The same goes for every planned sub-service that has
no page yet: **no link and no route until the content is real** — a menu link
to an unbuilt page is a 404, and an indexed placeholder is thin content.

## Route groups

The group in `content/routes.ts` is not just a label; it decides which shell the
page renders in.

| Group | Renders under | Chrome |
|---|---|---|
| `core`, `service`, `legal` | `app/(site)/` | Full site: top bar, sticky header + mega-menu, footer, lead panel |
| `landing` | `app/(landing)/` | **None.** Each landing page brings its own header and footer |

That split is why `components/chrome/SiteChrome.tsx` exists. A nested layout can
add chrome but can never remove what a parent layout already rendered, so the
root layout holds only `<html>`/`<body>` and the global scripts, and the two
route groups choose their own shell. `app/not-found.tsx` renders in the root
layout — it can be served for any URL — so it pulls `SiteChrome` in itself.

## The rule

> **Never edit an existing `path` in place.**

These URLs are indexed and externally linked. To change one: give the route its
new path in `content/routes.ts` **and** map old → new in
`content/legacy-redirects.json` in the same commit. `next.config.ts` emits a
301 for every entry in that file, and `content/routes.ts` fails the build if an
entry's source is still a live route or its destination is not one.

**Every redirect is a 301.** `next.config.ts` sets `statusCode: 301` explicitly;
do not use `permanent: true`, which emits 308. This is a client requirement and
it applies to every redirect added in future. The one exception is not ours to
make: Next's built-in `trailingSlash: false` normalisation emits 308 and takes
no configuration.

Redirect sources are **append-only**: a URL that has ever been live keeps
redirecting forever. If a destination moves again, update the value on every
key that points at it — each hop must point at the final URL, never at another
redirect. Among the permanent sources:

- **`/custom-wordpress-developement`** — the live production URL for years,
  misspelling and all. It now 301s to `/web-design-services/custom-wordpress`.
- **`/content-management-system`** (singular) — never had a page and 500'd on
  Laravel since launch. 301s straight to `/web-design-services/cms`.

## Adding a route

1. Add an entry to `content/routes.ts` (`indexable: false` until it has real content)
2. Give it a body:
   - **a service page** — add a module in `content/services/` and map it in that
     directory's `index.ts`. Nothing else; `app/(site)/[slug]/page.tsx` (pillar
     or flat URL) or `app/(site)/[slug]/[child]/page.tsx` (nested sub-service)
     picks it up from the path's segment count. Leaving it unmapped **fails the
     build** on purpose. If it belongs in the mega-menu, add its line to
     `content/nav.ts` in the same commit.
   - **a landing page** — create `app/(landing)/<slug>/page.tsx`, and give it a
     module under `content/landing/`. It gets no site chrome; render its own.
   - **anything else** — create `app/(site)/<slug>/page.tsx`
3. `npx next typegen` so `typedRoutes` learns about it
4. `node scripts/gen-routes-table.mjs` to regenerate the tables below
   (`--check` exits non-zero if they are stale, and changes nothing)
5. Set `indexable: true` in the same commit. That one flag flips the `robots`
   meta **and** adds the URL to the sitemap. Do not flip it before the content
   is real — indexed thin pages do measurable damage.

Where the content comes from, and how to check it against the live page, is in
[CONTENT-PARITY.md](CONTENT-PARITY.md).

## Core

| URL | Title | Indexable |
|---|---|---|
| `/` | Digital Marketing & Web Design Agency | **yes** |
| `/about-us` | About Us | **yes** |
| `/contact-us` | Contact Us | **yes** |

## Landing

Paid-traffic pages. They render under `app/(landing)/`, so they carry **no site
navigation and no site footer** — each brings its own header and footer, and the
only ways off the page are its own CTAs. See
[CONTENT-PARITY.md](CONTENT-PARITY.md#the-landing-pages) before touching one.

| URL | Title | Indexable |
|---|---|---|
| `/creative-logo-design` | Custom Logo Design Starting £35 | **yes** |
| `/logo-design-offer` | Professional Bespoke Logo Design Services | **yes** |
| `/lp` | Web Design Service Starts from £199 | **yes** |
| `/seo-services` | SEO Services | **yes** |
| `/website-brief` | Website Brief Form | **yes** |
| `/logo-brief` | Logo Design Brief Form | **yes** |


## Service

| URL | Title | Indexable |
|---|---|---|
| `/web-design-services` | Web Design Services | **yes** |
| `/web-development-services` | Web Development Services | **yes** |
| `/digital-marketing-services` | Digital Marketing Services | **yes** |
| `/branding-services` | Branding Services | **yes** |
| `/app-development-services` | App Development Services | **yes** |
| `/automation-services` | Automation Services | **yes** |
| `/logo-design-services` | Logo Design Services | **yes** |
| `/seo-services/seo-audit` | SEO Audit Services | **yes** |
| `/seo-services/technical-seo` | Technical SEO | **yes** |
| `/seo-services/on-page-seo` | On-Page SEO | **yes** |
| `/seo-services/link-building` | Off-Page SEO & Link Building | **yes** |
| `/seo-services/local-seo` | Local SEO | **yes** |
| `/seo-services/ecommerce-seo` | E-commerce SEO | **yes** |
| `/seo-services/shopify-seo` | Shopify SEO | **yes** |
| `/seo-services/wordpress-seo` | WordPress SEO | **yes** |
| `/seo-services/amazon-seo` | Amazon SEO & Product Optimisation Service | **yes** |
| `/seo-services/aeo` | AEO | **yes** |
| `/seo-services/keyword-research` | Keyword Research | **yes** |
| `/web-design-services/custom-wordpress` | Custom WordPress Website Design | **yes** |
| `/web-design-services/website-redesign` | Website Redesign | **yes** |
| `/web-design-services/responsive-design` | Responsive Website Design | **yes** |
| `/web-design-services/ui-ux-design` | UI & UX Design | **yes** |
| `/web-design-services/shopify` | Shopify Web Design | **yes** |
| `/web-design-services/magento` | Magento Web Design | **yes** |
| `/web-design-services/corporate-blog-design` | Corporate Blog Design | **yes** |
| `/web-design-services/cms` | CMS Website Design | **yes** |
| `/web-development-services/ecommerce` | E-commerce Development | **yes** |
| `/web-development-services/wordpress` | WordPress Development | **yes** |
| `/web-development-services/shopify` | Shopify Development | **yes** |
| `/web-development-services/magento` | Magento Development | **yes** |
| `/web-development-services/laravel` | Laravel Development | **yes** |
| `/web-development-services/contentful` | Contentful Development | **yes** |
| `/web-development-services/amp` | AMP Development | **yes** |
| `/web-development-services/page-speed-optimisation` | Page Speed Optimisation | **yes** |
| `/web-development-services/3d-configurators` | Custom 3D Configurators | **yes** |
| `/web-development-services/website-maintenance` | Website Maintenance | **yes** |
| `/app-development-services/android` | Android App Development | **yes** |
| `/app-development-services/ios` | iOS App Development | **yes** |
| `/app-development-services/cross-platform` | Cross-Platform App Development | **yes** |
| `/app-development-services/flutter` | Flutter App Development | **yes** |
| `/app-development-services/react-native` | React Native App Development | **yes** |
| `/app-development-services/app-maintenance` | App Maintenance & Support | **yes** |
| `/branding-services/brand-identity` | Brand Identity Design | **yes** |
| `/branding-services/brand-strategy` | Brand Strategy | **yes** |
| `/branding-services/rebranding` | Rebranding Services | **yes** |
| `/branding-services/brand-guidelines` | Brand Guidelines | **yes** |
| `/branding-services/packaging-design` | Packaging Design | **yes** |
| `/branding-services/stationery-design` | Stationery Design | **yes** |
| `/branding-services/business-card-design` | Business Card Design | **yes** |
| `/digital-marketing-services/ppc` | PPC / Google Ads | **yes** |
| `/digital-marketing-services/meta-ads` | Meta Ads | **yes** |
| `/digital-marketing-services/social-media-marketing` | Social Media Marketing | **yes** |
| `/digital-marketing-services/email-marketing` | Email Marketing | **yes** |
| `/digital-marketing-services/content-marketing` | Content Marketing | **yes** |
| `/digital-marketing-services/cro` | Conversion Rate Optimisation | **yes** |
| `/digital-marketing-services/influencer-marketing` | Influencer Marketing | **yes** |
| `/digital-marketing-services/google-analytics-4` | Google Analytics 4 & Tracking | **yes** |
| `/digital-marketing-services/linkedin-ads` | LinkedIn Ads | **yes** |
| `/digital-marketing-services/tiktok-ads` | TikTok Ads | **yes** |
| `/automation-services/marketing-sales-automation` | Marketing & Sales Automation | **yes** |
| `/automation-services/crm-automation` | CRM Automation | **yes** |
| `/automation-services/workflow-automation` | Workflow Automation | **yes** |
| `/automation-services/email-automation` | Email Automation | **yes** |
| `/automation-services/chatbot-development` | Chatbot Development | **yes** |
| `/automation-services/ai-automation` | AI Automation | **yes** |
| `/logo-design-services/custom-logo-design` | Custom Logo Design | **yes** |
| `/logo-design-services/business-logo-design` | Business Logo Design | **yes** |
| `/logo-design-services/logo-redesign` | Logo Redesign | **yes** |
| `/logo-design-services/3d-logo-design` | 3D Logo Design | **yes** |
| `/logo-design-services/mascot-logo-design` | Mascot Logo Design | **yes** |
| `/logo-design-services/minimalist-logo-design` | Minimalist Logo Design | **yes** |
| `/logo-design-services/illustrative-logo-design` | Illustrative Logo Design | **yes** |


## Legal

| URL | Title | Indexable |
|---|---|---|
| `/privacy-policy` | Privacy Policy | **yes** |
| `/terms-and-conditions` | Terms And Conditions | **yes** |
| `/refund-policy` | Refund Policy | **yes** |
| `/cookies-policy` | Cookies | **yes** |


## The other two landing pages

There are six standalone landing pages on the live server. None of them is in
the Laravel repo, so the live page is the only source for all six.

| URL | What it is | Rebuilt |
|---|---|---|
| `/creative-logo-design/` | Logo-design landing page | **yes** |
| `/logo-design-offer/` | £19 logo-design offer page | **yes** |
| `/lp/` | £199 web-design offer page | **yes** |
| `/seo-services/index.php` | SEO retainer page | **yes** — at `/seo-services` |
| `/logo-brief/index.php` | Form only | **yes** — at `/logo-brief` |
| `/website-brief/index.php` | Form only | **yes** — at `/website-brief` |

All six are rebuilt. The four content pages were built three different ways, and
the difference decides how you capture the source:

- **`/creative-logo-design/`** and **`/seo-services/index.php`** are
  server-rendered HTML — their own Bootstrap builds and a PHPMailer endpoint.
  `curl` gets everything.
- **`/logo-design-offer/`** is a **client-rendered Create React App bundle**.
  `curl` returns a 3KB shell whose body is `<div id="root"></div>` — no copy at
  all. Capture it with `node scripts/capture-rendered.mjs <url> <outFile>`,
  which drives headless Chrome and refuses to write an un-hydrated shell.
- **`/lp/`** shares that bundle and has the same problem, plus a duplicate
  `<title>`.

**Each one canonicals to itself, never to the homepage.** The live pages get
this wrong and it is why they do not rank; the rule and how to verify it are in
[SEO-PLAYBOOK.md](SEO-PLAYBOOK.md#every-page-canonicals-to-itself--including-the-landing-pages).

### `.php` URLs

Next cannot serve a `.php` path from a static route folder, and there is no PHP
left on the site. `/seo-services/index.php` settled it for the two that remain:

- the page is served at the clean **`/seo-services`**
- `/seo-services/index.php` **301s** to it, declared in `next.config.ts`
- `/seo-services/` needs no entry — `trailingSlash: false` already redirects it

Note the live server does the opposite: `/seo-services` **301s to
`/seo-services/`**, and `/seo-services/index.php` returns 200. Both live forms
now land on one canonical URL instead of two.

Do the same for `/logo-brief/index.php` and `/website-brief/index.php` when they
are built — but check Search Console for inbound links first.

### `/seo-services` is not a port

It is the one page whose **copy was deliberately changed**. The live page is an
un-rebranded third-party template that names another agency ten times and prices
in US dollars. Read
[CONTENT-PARITY.md](CONTENT-PARITY.md#seo-services--the-one-page-that-was-rebranded-not-ported)
before editing anything under `content/landing/seo-services.ts`.

## Not carried over

Present in the Laravel app but deliberately not rebuilt yet — neither is linked
from the homepage, so nothing is orphaned by the omission:

`/blog-list`, `/blog-details/{slug}`, `/portfolio-details/{id}`, `/free-ebook`,
`/service-details/{slug}`, `/thankyou`, and the whole admin / auth / orders /
invoices area.
