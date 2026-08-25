# Design system

Ported from the approved clduk redesign (`clduk/public/assets/css/cld/`). The
design is **settled** — this documents it, it does not invite changes.

## Tailwind v4 is CSS-first

There is **no `tailwind.config.ts`**. Every token lives in the `@theme` block in
`app/globals.css`, and each entry generates utilities automatically:

| Token prefix | Generates |
|---|---|
| `--color-magenta-500` | `bg-magenta-500`, `text-magenta-500`, `border-magenta-500` |
| `--font-display` | `font-display` |
| `--text-h2` (+ `--text-h2--line-height`) | `text-h2`, with line-height and tracking baked in |
| `--radius-lg` | `rounded-lg` |
| `--shadow-glow` | `shadow-glow` |
| `--ease-out` | `ease-out` |
| `--animate-marquee` | `animate-marquee` |
| `--spacing-section` | `py-section` |

The 78KB of hand-written CSS in the Laravel repo was **not** ported — it was
largely duplicated and non-reusable. Only the tokens came across.

## Palette

| Ramp | Key values |
|---|---|
| **magenta** (brand primary) | `500 #cc067f`, ramp 50–900 |
| **violet** (brand secondary) | `500 #662e91`, ramp 50–900 |
| **teal** (accent) | `300 #63e5cb` · `400 #35dbba` · `500 #18cfab` · `600 #0fa88a` |
| **ink** (dark canvas) | `950 #07020f` · `900 #0d031c` (page bg) · `850 #140829` · `800` · `700` · `600` |
| **mist** (light surfaces) | `100 #f7f6fa` · `200 #ecebf1` · `300 #d8d6e0` · `400`–`600` |
| on-light text | `onlight #14101c`, `onlight-muted #55506a` |
| stars | `star #ffb400` |

> Named **mist**, not `slate`: partially overriding Tailwind's built-in `slate`
> ramp would leave the unspecified shades on their defaults and produce a
> mismatched scale.

Brand gradient: `linear-gradient(97deg, #662e91, #cc067f)`.
Gradient text uses a lighter pair: `#ff6cc0 → #b57bff` (via the
`gradient-text` utility).

## Type

- **Display / headings:** Montserrat 800
- **Body:** Raleway

Both via `next/font/google`, self-hosted at build — no requests reach Google.
Exposed as `--font-montserrat` / `--font-raleway` and wired into `@theme`.

Fluid scale, `clamp()` from 360px → 1440px:

| Utility | Range |
|---|---|
| `text-display` | 44 → 96px |
| `text-h1` | 36 → 72px |
| `text-h2` | 30 → 56px |
| `text-h3` | 24 → 38px |
| `text-h4` | 20 → 28px |
| `text-h5` | 18 → 22px |
| `text-lead` | 17 → 20px |
| `text-body` | 15 → 17px |

**Visual size and heading level are independent.** Use the level the document
outline requires and the `text-*` utility the design requires — that is how the
live site's 23 `<h4>`s were fixed without changing a word.

## Layout

- `container-site` — max 1560px + fluid gutter (`clamp(1.25rem, .5rem + 3vw, 3rem)`).
  **The one container.** Chrome (header/footer/top bars) and every section body
  centre on the same `--container-site` box, so content edges line up from the
  top bar to the footer. There is no second, wider token — a section that needs
  to bleed (hero backgrounds) does it with absolute layers behind the container,
  not with a different container.
- `py-section` — `clamp(4rem, 2rem + 8vw, 6.25rem)`, overridden to a flat
  `3.125rem` (50px) below `md` (48rem): the viewport-driven clamp still left
  ~62px on a phone, which over-spaces every stacked section
- Radii: `sm 8` · `md 14` · `lg 22` · `xl 32` · `rounded-full`

## Custom CSS — the complete list

Everything Tailwind cannot express lives in `app/globals.css`. Keep this list
short; reach for utilities first.

| Utility | Purpose |
|---|---|
| `gradient-text` | `background-clip: text` brand gradient |
| `bg-mesh` | Three-stop radial mesh behind dark sections |
| `bg-noise` | Film grain as an inline SVG data-URI — no network request |
| `container-site` | Page container |
| `rail` | Scroll-snap horizontal rail (replaces Slick/Swiper) |
| `mask-edges` | Fades the marquee in/out at both edges |
| `.reveal` / `.reveal.is-visible` | Scroll-reveal states |
| `.accordion` | `<details>` open/close height transition (`::details-content`) |

Keyframes: `marquee`, `orbit`, `orbit-reverse`, `ping-slow`.

## Components

- **Buttons** — `btn(variant, size, extra)` from `components/ui/button.ts`.
  Variants `primary` (gradient, slides on hover) · `ghost` (glass over dark) ·
  `outline` (inverts on hover) · `light` (white on brand).
- **`<Section>` / `<SectionHeading>` / `<Eyebrow>`** — `components/ui/Section.tsx`.
  `tone` picks the surface and flips text colours.
- **`<Rail>`** — scroll-snap carousel with arrows and optional dots. Dots derive
  from `scrollLeft`, so they can never desync (the live site shows 10 dots for
  5 slides).
- **`<Counter>`** — count-up on scroll. Renders the **final** value server-side,
  so the real number is in the HTML for crawlers and no-JS users.
- **`<Reveal>`** — one document-level IntersectionObserver for all `.reveal`
  elements, so server components opt in with a class and stay server-rendered.
  Has a 2.5s failsafe that reveals everything if the observer never fires.

## Motion

Easing: `ease-out cubic-bezier(.22,1,.36,1)` · `ease-in-out` · `ease-spring`.
Durations 160 / 280 / 600ms.

`prefers-reduced-motion: reduce` collapses all animation and transition
durations to ~0 and forces `.reveal` visible. The hero video is never attached
under reduced motion.

## Accessibility rules

Carried into every component:

- Native `<details>`/`<summary>` for both accordions — the question text **is**
  the control (the live site ships 8 buttons with no accessible name)
- Full ARIA tablist with arrow-key navigation for "What you get"
- `<blockquote>` / `<cite>` / `<figcaption>` for testimonials
- `role="img"` + `aria-label="N out of 5 stars"` on star rows
- Decorative images: `alt=""` + `aria-hidden="true"`
- Real `<label>` on every form control, `aria-describedby` for errors
- Focus trap + Escape + scroll lock on the lead panel and mobile drawer
- Skip link, `<main id="main">`, visible `:focus-visible` ring
- CTAs that open the panel are `<button>`, never `href="#"`
