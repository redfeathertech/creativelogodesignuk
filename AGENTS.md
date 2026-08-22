<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Creative Logo Design — Next.js rebuild

Marketing site for **creativelogodesign.co.uk**, a UK design / development /
digital-marketing agency. This project replaces a Laravel app (in the sibling
repo `c:/Herd/clduk`) page by page.

**Why the move:** SEO. The live Laravel homepage has no `charset`, no `viewport`
meta, zero structured data, no Open Graph tags, no analytics, and defers its
entire theme stylesheet with a `media="print"` hack that causes a flash of
unstyled content and heavy CLS on every load. Everything in this repo exists to
fix that without losing existing rankings.

## The one rule that matters

> **Layout is free to change. Content is not.**

Every page on the live site ranks. Google ranks on text content, heading *text*,
title/meta, internal links, and URLs — not on CSS or visual arrangement.

| Safe to change | Must NOT change |
|---|---|
| Visual layout, CSS, DOM structure | Any body or heading copy |
| Component boundaries | Page titles and meta descriptions |
| Heading **levels** (`h4` → `h2` with identical text) | A URL, **in place** — moves go through `content/legacy-redirects.json`, which 301s every old URL forever (see docs/ROUTES.md) |
| Image markup, JS libraries, interactions | The internal link graph — every indexable page stays linked from the chrome or a page body |

Before editing anything under `content/`, read **[docs/CONTENT-PARITY.md](docs/CONTENT-PARITY.md)**.

**There is exactly one exception, and it is not a precedent.** `/seo-services`
was rebranded rather than ported: the live page is an un-rebranded third-party
template that names another agency ten times and prices in US dollars. It was
safe only because that page canonicals to the homepage and has never ranked.
Every changed string is declared in `scripts/verify-seo-services-parity.py` and
gated in both directions. Do not extend the exception to any other page without
the same evidence and the same sign-off.

## Stack

- **Next.js 16.2.12**, App Router, React 19.2, TypeScript strict
- **Tailwind v4** — CSS-first. There is **no `tailwind.config.ts`**; all design
  tokens live in the `@theme` block in `app/globals.css`
- **Turbopack** is the default for `dev` *and* `build`
- `nodemailer` (SMTP), `zod` (validation)
- No jQuery, Bootstrap, Slick or Swiper — all four were dropped deliberately

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # every route ○ (Static) or ● (SSG) — nothing ƒ (Dynamic)
npm start        # serve the production build
npm run lint     # `next lint` is REMOVED in v16 — this is plain eslint
npx tsc --noEmit # type-check
npx next typegen # regenerate route types after adding a route

# verification — none of these are optional before shipping a page
node scripts/verify-home-parity.mjs                # homepage, forward only (see its header)
python scripts/verify-content-parity.py            # all 36 service pages
python scripts/verify-landing-parity.py            # /creative-logo-design, both directions
python scripts/verify-ldo-parity.py                # /logo-design-offer, both directions
python scripts/verify-lp-parity.py                 # /lp, both directions
python scripts/verify-seo-services-parity.py       # /seo-services, both directions
# /logo-design-offer and /lp render client-side, so their source must be run,
# not fetched
node scripts/capture-rendered.mjs <url> <outFile>
# 12 widths over CDP. Fails on three independent classes: SCROLL (the document
# scrolls sideways), CUT (content swallowed by an `overflow:hidden` ancestor)
# and COLLIDE (two in-flow siblings overlapping). Measures at rest, 1900ms in —
# `Counter` runs for 1400ms and reads ~50px narrow before it lands.
node scripts/audit-responsive.mjs http://127.0.0.1:3100 /some-path
# The 12 defaults are device sizes, NOT breakpoints. After changing a media
# query, sweep both sides of it — a layout can break across a whole band and
# still pass the default grid.
node scripts/audit-responsive.mjs --widths=1200,1259,1260,1280 http://127.0.0.1:3100 /
# browser-side form validation. Needs a served build: the behaviour it asserts
# exists only once the client components have hydrated
node scripts/verify-form-validation.mjs http://127.0.0.1:3100
node scripts/gen-routes-table.mjs --check          # docs/ROUTES.md vs content/routes.ts
```

## Layout

```
app/
  layout.tsx            root: <html>/<body>, fonts, metadata, viewport, global scripts
  globals.css           @theme tokens + the few rules Tailwind can't express
  (site)/               everything with site navigation — wraps in <SiteChrome>
    layout.tsx
    page.tsx            homepage — composes the 11 sections
    [slug]/page.tsx     pillar + flat service pages, from content/services/
    [slug]/[child]/page.tsx  nested sub-service pages (2026-08 pillar restructure)
    about-us/ contact-us/ + the 4 legal folders
    seo-services/page.tsx    the SEO pillar. Was a (landing) page until the
                             2026-08 redesign — see CONTENT-PARITY.md
  (landing)/            paid-traffic pages — NO site nav, own header + footer
    layout.tsx
    creative-logo-design/page.tsx
    logo-design-offer/page.tsx
    lp/page.tsx
  actions/forms.ts      "use server" — all four form handlers
  robots.ts sitemap.ts manifest.ts opengraph-image.tsx
  not-found.tsx error.tsx
components/
  chrome/   SiteChrome TopBar Nav Header Footer LeadPanel WhatsAppFab
  home/     the 11 homepage sections
  about/    the About Us sections (Offices is shared with Contact Us)
  contact/  the Contact Us sections
  services/ the shared service-page sections
  services/seo/ the /seo-services sections + its own icon set
  landing/      QuoteDialogBase (shared by the landing pages and /seo-services)
  landing/cld/  the /creative-logo-design sections
  landing/ldo/  the /logo-design-offer sections
  landing/lp/   the /lp sections
  forms/    Field FormShell LeadForm ProposalForm Recaptcha
  ui/       Section Rail Counter Reveal Breadcrumbs button icons
content/    site nav footer routes home about contact clients
            legacy-redirects.json  <- old URL -> new URL, drives the 301s
            services/ legal/ landing/                       <- ALL copy here
lib/        seo mail validation antispam recaptcha cn
scripts/    verify-content-parity.py verify-landing-parity.py verify-ldo-parity.py
            verify-lp-parity.py capture-rendered.mjs audit-responsive.mjs
            verify-home-parity.mjs <- the homepage gate; Node, not Python, so it
                                      runs wherever the build does
            gen-routes-table.mjs   <- regenerates the tables in docs/ROUTES.md
            verify-form-validation.mjs <- drives the real forms in headless
                                      Chrome; the only gate on behaviour that
                                      does not exist until the page hydrates
docs/       the detail behind all of this
```

**Chrome lives in a route group, not the root layout.** A nested layout can add
chrome but can never remove what a parent already rendered, so the root layout
holds only `<html>`/`<body>`, `(site)` wraps its routes in `SiteChrome`, and
`(landing)` opts out. Each branch supplies its own `<main id="main">`.

## Conventions

1. **Server Components by default.** Only add `"use client"` where there is real
   interactivity. Everything a crawler needs must be in the server-rendered HTML.
2. **All copy lives in `content/`**, never inline in a component. This makes it
   diffable against the live site.
3. **`content/routes.ts` is the single source of truth for URLs.** It drives
   the dynamic service routes, `sitemap.ts`, and `docs/ROUTES.md`. Never edit an
   existing `path` in place — give the route its new path AND map old → new in
   `content/legacy-redirects.json` (append-only; `next.config.ts` 301s every
   entry, and the build fails on a source that is still live or a destination
   that is not).
   **Every redirect is a 301** — use `statusCode: 301`, never `permanent: true`,
   which emits 308. Client requirement; applies to every redirect added from
   now on. (Next's own `trailingSlash` normalisation still emits 308 and is not
   configurable — that one is fine and is not ours to set.)
4. **Tailwind first.** Only add hand-written CSS for things utilities genuinely
   cannot express (keyframes, conic/mesh gradients, the noise data-URI,
   `background-clip: text`). Do not port CSS from the Laravel repo.
5. **Every image goes through `next/image`** with explicit `width`/`height`.
   Decorative images get `alt=""` + `aria-hidden`.
6. **Never add `Review`/`AggregateRating` for the homepage testimonials.** See
   [docs/SEO-PLAYBOOK.md](docs/SEO-PLAYBOOK.md) — it would risk a manual action.

## Next.js 16 gotchas

Verified against `node_modules/next/dist/docs/`. These differ from pre-v16
knowledge and will break the build or fail silently:

- `<Image priority>` is **deprecated** → use `preload`
- `error.tsx` receives **`unstable_retry`**, not `reset`
- `params` / `searchParams` / `cookies()` / `headers()` are **async**
- `middleware.ts` → **`proxy.ts`**
- `next lint` is **removed**; `next build` no longer lints
- `images.qualities` defaults to `[75]`; any other value must be declared
- `metadata.themeColor` / `colorScheme` / `viewport` → `export const viewport`
- `revalidateTag` now needs a second `cacheLife` argument
- `experimental.ppr` → `cacheComponents` (**not** enabled here: the site is
  fully static, so the default model prerenders everything with no config)
- A webpack config in `next.config.ts` makes `next build` **fail**

## Docs

| File | Read it before |
|---|---|
| [docs/CONTENT-PARITY.md](docs/CONTENT-PARITY.md) | touching any copy in `content/` |
| [docs/SEO-PLAYBOOK.md](docs/SEO-PLAYBOOK.md) | changing metadata or structured data |
| [docs/ROUTES.md](docs/ROUTES.md) | adding, renaming or launching a page |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | writing any UI |
| [docs/PROGRESS.md](docs/PROGRESS.md) | picking up where the last session left off |
