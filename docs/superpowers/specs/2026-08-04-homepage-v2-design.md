# Homepage v2 — editorial redesign

**Date:** 2026-08-04
**Status:** approved, ready to implement
**Reference:** [digitalsilk.com](https://www.digitalsilk.com/) homepage

## Goal

Rebuild the homepage to the visual standard of the Digital Silk homepage —
depth, large-format imagery, editorial composition — without touching a single
ranking string, and without spending back the Core Web Vitals budget this repo
exists to protect.

The old homepage stays fully intact throughout. Promotion and reversion are each
a one-line change.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Content scope | Restyle + additive sections | All 11 existing sections keep their copy verbatim. New sections carry net-new copy, which `docs/CONTENT-PARITY.md` already permits: "additions carry no ranking risk." |
| Palette | Keep magenta/violet | Borrow Digital Silk's *craft* (glass, glow, scale), not its hue. The other 40 pages stay on this palette; diverging would fracture the brand. |
| Restyle depth | Editorial recomposition | Full-bleed alternating bands, oversized numerals, large-format imagery. Rejected "cinematic scroll" (pinned/parallax) — it costs CLS and client JS on a site rebuilt to fix exactly that. |
| Work imagery | Ship with existing assets, built to swap | The 10 real client logo projects in device frames. Each item is a `content/` entry, so real screenshots later are a data edit, not a rebuild. |
| Coexistence | Preview route + one-line promote | Old code untouched; `/home-v2` allows full review before anything changes. |

## Architecture

```
components/home/            UNTOUCHED — today's 11 sections
components/home2/           NEW
  HomeV2.tsx                  composes the stack + JsonLd
  Hero.tsx  FeaturedWork.tsx  Industries.tsx  Locations.tsx
  Awards.tsx  CtaBand.tsx  DeviceFrame.tsx  …one file per section
content/home.ts             UNTOUCHED — imported, never copied
content/home2.ts            NEW — copy for the 4 added sections only
app/(site)/home-v2/page.tsx NEW — noindex preview route
app/(site)/page.tsx         one import line changes at launch
```

`content/home.ts` is **imported, not duplicated**. This makes it structurally
impossible for the redesign to drift from the ranking copy — there is no second
file to keep in sync.

Two shared files take additive-only edits, both in fenced, deletable blocks:

- `app/globals.css` — a `/* home-v2 */` block with new `@theme` tokens and
  utilities. All new names; nothing existing is redefined.
- `.gitignore` — `/.superpowers/` (brainstorming mockups).

**Promote:** change one import in `app/(site)/page.tsx`.
**Revert:** change it back. `components/home/` was never modified.

## Page composition — 15 sections

Existing copy in **bold**; added sections marked NEW.

| # | Section | Treatment |
|---|---|---|
| 1 | **Hero** | Split + lead form retained. Larger display scale, layered glow behind the H1, glass form card with a lit edge |
| 2 | **Client logos** | *Moved up from 6th* — trust wall directly under the hero |
| 3 | **About** | Asymmetric split; the stacked photo pair goes large and offset; stats as a lit rail |
| 4 | NEW **Featured Work** | Alternating full-bleed cards: device-framed image on a gradient-lit backdrop, client name + one line |
| 5 | — | Gradient interstitial CTA band |
| 6 | **How it works** | Oversized `01 02 03` gradient numerals, editorial three-up |
| 7 | **What you get** | Full ARIA tablist retained; monitor frame large-format, screens bleed |
| 8 | NEW **Industries we serve** | Two-column expandable list + imagery. Internal links to existing service pages only |
| 9 | **Results** | Full-bleed gradient stat band, counters at display scale |
| 10 | **Methodology** | Orbit replaced by alternating editorial rows at image size |
| 11 | **Toolbox** | Refined glass grid. Tool names stay `<p>`, not `<h4>` — the heading-spam fix is preserved |
| 12 | NEW **Awards & recognition** | The 12 credential badges as a recognition wall |
| 13 | **Testimonials** | Large-format quote cards on the existing scroll-snap `Rail` |
| 14 | NEW **Locations** | UK / USA / Dubai cards, sourced from real office data in `content/about.ts` |
| 15 | **Challenges** + **Proposal** | Native `<details>` preserved; proposal gets the full-bleed gradient treatment |

Two changes are layout-only under the parity rule but were called out and
approved explicitly, because they alter more than pixels:

- Moving the client logo wall from 6th to 2nd changes the page's reading order.
- The industries list adds internal links into the service pages — an SEO
  change, not merely a visual one.

## Visual language

Added to `globals.css` in the fenced block:

- **Glass surfaces** — `backdrop-blur` + hairline border + inner top highlight
- **Glow bloom** — radial magenta/violet behind focal points
- **Oversized numerals** — a fluid token above the current `text-display` ceiling
- **Device frame** — browser/device chrome for the work showcase

Full-bleed bands follow the existing rule in `docs/DESIGN-SYSTEM.md`: content
stays on `container-site`, backgrounds bleed via absolute layers behind it.
No second container token.

## Constraints

**Performance.** The redesign must not spend back the budget this repo exists
to protect.

- Every new section is a Server Component. The only client code is existing,
  reused: `Rail`, `Counter`, `Reveal` (one document-level observer), the tablist
- No new dependencies — no animation or carousel library
- Every image via `next/image` with explicit `width`/`height` — zero CLS
- Below-fold sections stay `next/dynamic`
- Build gate: every route `○` or `●`; nothing `ƒ`

**Accessibility.** Native `<details>`/`<summary>` for the industries list
(matching the existing accordion rule), arrow-key nav retained on the tablist,
decorative images `alt="" aria-hidden`, and a `prefers-reduced-motion` path for
every new effect.

**SEO.** Metadata, `homeGraph` JSON-LD and the title/description are
byte-identical on promote. `/home-v2` ships `robots: noindex` and is absent from
`content/routes.ts`, so it never reaches the sitemap. Industries links target
existing service URLs only — no new URLs, no new redirects. No `Review` or
`AggregateRating`, per the manual-action rule in `docs/SEO-PLAYBOOK.md`.

**Style.** 4-space indent per `.editorconfig`.

## Verification

```bash
npm run build && npx tsc --noEmit && npm run lint
node scripts/audit-responsive.mjs http://127.0.0.1:3100 /home-v2   # 12 widths, to 320px
python scripts/verify-home-v2-parity.py                            # NEW
```

`scripts/verify-home-v2-parity.py` is new and closes a real pre-existing gap:
the 36 service pages and all 4 landing pages are parity-gated, **the homepage is
not**. It walks every string in `content/home.ts` and fails if any is missing
from the rendered `/home-v2` HTML — asserting mechanically the claim this whole
redesign rests on.

Responsive verification runs to 320px, and specifically checks nested grid/flex
items for the `min-width: auto` overflow failure mode.

## Out of scope

- The 36 service pages, 4 landing pages, About, Contact, legal pages
- Any change to `components/home/` or `content/home.ts`
- Real project screenshots (the showcase is built to accept them later)
- Cinematic scroll effects (pinned sequences, parallax) — deferred; if wanted,
  add after launch and measure
