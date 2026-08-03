# Routes

**47 routes, all indexable and all in the sitemap.** 3 core + 4 landing +
36 service + 4 legal.

Mirrors `content/routes.ts`, which is the single source of truth — it drives the
dynamic service route, `app/sitemap.ts`, and this file.

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

> **Never edit an existing `path`.**

These URLs are indexed and externally linked. To change one: add the new path,
then register a 308 from the old one in `next.config.ts`. Never swap in place.

Two live quirks are load-bearing and must be preserved:

- **`/custom-wordpress-developement`** — the misspelling is the live production
  URL. Do not "fix" it.
- **`/content-management-system`** (singular) never had a page and 500'd since
  launch. It is a 308 to the plural URL, declared in `next.config.ts`.

## Adding a route

1. Add an entry to `content/routes.ts` (`indexable: false` until it has real content)
2. Give it a body:
   - **a service page** — add a module in `content/services/` and map it in that
     directory's `index.ts`. Nothing else; `app/(site)/[slug]/page.tsx` picks it
     up. Leaving it unmapped **fails the build** on purpose.
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


## Service

| URL | Title | Indexable |
|---|---|---|
| `/web-designing` | Web Designing | **yes** |
| `/web-development` | Web Development | **yes** |
| `/website-maintenance` | Website Maintenance | **yes** |
| `/digital-marketing` | Digital Marketing | **yes** |
| `/branding` | Branding | **yes** |
| `/app-development` | App Development | **yes** |
| `/custom-wordpress-developement` | Custom Wordpress Developement | **yes** |
| `/website-redesign-services` | Website Redesign | **yes** |
| `/responsive-website-design-and-development` | Responsive Website Design And Development | **yes** |
| `/ui-ux-design` | Ui Ux Design | **yes** |
| `/shopify-web-design` | Shopify Web Design | **yes** |
| `/magento-design-and-development-service` | Magento Design And Development Service | **yes** |
| `/corporate-blog-design-services` | Corporate Blog Design Services | **yes** |
| `/content-management-systems` | Content Management Systems | **yes** |
| `/ui-and-ux-analysis` | Ui Ux Analysis | **yes** |
| `/marketing-and-sales-automation` | Marketing & Sales Automation | **yes** |
| `/seo` | SEO | **yes** |
| `/aeo` | AEO | **yes** |
| `/seo-audit-service` | SEO Audit Services | **yes** |
| `/social-media-management` | Social Media Management | **yes** |
| `/ppc` | PPC | **yes** |
| `/email-marketing-management-services` | Email Marketing Management Services | **yes** |
| `/amazon-seo-and-product-optimisation-service` | Amazon SEO & Product Optimisation Service | **yes** |
| `/content-marketing-services` | Content Marketing Services | **yes** |
| `/influencer-marketing` | Influencer Marketing | **yes** |
| `/conversion-rate-optimisation` | Conversion Rate Optimisation | **yes** |
| `/google-analytics` | Google Analytics | **yes** |
| `/ecommerce-website-development` | Ecommerce Website Development | **yes** |
| `/wordpress-development` | WordPress Development | **yes** |
| `/amp-web-design` | AMP Web Design | **yes** |
| `/page-speed-optimisation` | Page Speed Optimisation | **yes** |
| `/shopify-developers` | Shopify Developers | **yes** |
| `/magento-development` | Magento Development | **yes** |
| `/laravel-developers` | Laravel Developers | **yes** |
| `/contentful-developers` | Contentful Developers | **yes** |
| `/custom-3d-product-configurators` | Custom 3D Product Configurators | **yes** |


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
| `/logo-brief/index.php` | Form only | not yet |
| `/website-brief/index.php` | Form only | not yet |

The four rebuilt so far are built three different ways, and the difference
decides how you capture the source:

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
- `/seo-services/index.php` **308s** to it, declared in `next.config.ts`
- `/seo-services/` needs no entry — `trailingSlash: false` already 308s it

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
