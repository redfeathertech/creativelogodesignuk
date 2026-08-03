# creativelogodesign.co.uk

Next.js rebuild of the Creative Logo Design marketing site, replacing the
Laravel app in the sibling repo `c:/Herd/clduk`.

The move exists for one reason: **SEO**. The live Laravel site ships no viewport
meta, no charset, no structured data, no Open Graph tags and no analytics, and
defers its whole theme stylesheet in a way that guarantees a flash of unstyled
content on every load.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in SMTP / reCAPTCHA / GA before forms work
npm run dev                  # http://localhost:3000
```

## Commands

| Command | |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build — every route `○ (Static)` or `● (SSG)`, none `ƒ` |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`next lint` is removed in v16) |
| `npx tsc --noEmit` | Type-check |
| `npx next typegen` | Regenerate route types after adding a route |

## Status

**Content-complete.** All 44 routes have real copy and all 44 are indexable and
in the sitemap: the homepage, About Us, Contact Us, 36 service pages, 4 legal
pages, and the `/creative-logo-design` landing page.

Still open before launch: real `.env` values for SMTP, reCAPTCHA and GA4. See
[docs/PROGRESS.md](docs/PROGRESS.md).

## Before you change anything

**Every page here ranks.** Layout and CSS are free to change; copy, page titles
and URLs are not. Read [AGENTS.md](AGENTS.md) first — it is short — then the
relevant doc:

| Doc | Read before |
|---|---|
| [docs/CONTENT-PARITY.md](docs/CONTENT-PARITY.md) | touching any copy in `content/` |
| [docs/SEO-PLAYBOOK.md](docs/SEO-PLAYBOOK.md) | changing metadata or structured data |
| [docs/ROUTES.md](docs/ROUTES.md) | adding, renaming or launching a page |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | writing any UI |
| [docs/PROGRESS.md](docs/PROGRESS.md) | picking up where the last session left off |

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict ·
Tailwind v4 (CSS-first — no config file; tokens live in `@theme` in
`app/globals.css`) · nodemailer · zod.

No jQuery, Bootstrap, Slick or Swiper — all four were dropped deliberately.

> **Note for AI assistants:** Next.js 16 has breaking changes that predate most
> training data. Read `node_modules/next/dist/docs/` rather than relying on
> memory. The specific traps are listed in [AGENTS.md](AGENTS.md).
