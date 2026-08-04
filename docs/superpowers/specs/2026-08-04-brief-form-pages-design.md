# Design — `/website-brief` and `/logo-brief`

**Date:** 2026-08-04
**Status:** approved

The last two pages of the Laravel → Next.js port. Both are standalone PHP
folders on the live site that the SEO team built as landing pages and that,
per Google Search Console, rank. They are therefore treated exactly like the
other four inner landing pages: indexed, self-canonical, and content-frozen.

| | Live URL | New URL |
|---|---|---|
| Website brief | `https://creativelogodesign.co.uk/website-brief/index.php` | `/website-brief` |
| Logo brief | `https://creativelogodesign.co.uk/logo-brief/index.php` | `/logo-brief` |

## What the live pages are

A single white card on a purple gradient. No header, no footer, no navigation.
Each is one long `<form method="POST" action="email.php">` with a
`js/script.js` that does blur-and-submit validation, and a `<head>` that
carries a canonical pointing at the **homepage** — the same bug already
rejected for the other landing pages.

Local reference copies (gitignored, listed in `.gitignore` beside the other
`page-source-*.html` files):

```bash
curl -sSL https://creativelogodesign.co.uk/website-brief/index.php -o page-source-website-brief.html
curl -sSL https://creativelogodesign.co.uk/logo-brief/index.php   -o page-source-logo-brief.html
```

Both are server-rendered plain HTML, so a plain fetch is sufficient — unlike
`/lp` and `/logo-design-offer`, these do not need `capture-rendered.mjs`.

## Decisions taken

1. **Indexed, not noindex.** The URLs have good Search Console ratings. Every
   rule in `docs/CONTENT-PARITY.md` applies: layout is free to change, content
   is not.
2. **Clean paths with 308s.** `/website-brief/index.php` and
   `/logo-brief/index.php` redirect permanently to the clean paths, matching
   the `/seo-services/index.php` precedent already in `next.config.ts`.
3. **Rebuilt in the design system, not pixel-matched.** Same words, new shell.
4. **One deliberate content addition:** an Email Address field on the logo
   brief, directly after the name field. It is an *addition* — no existing
   string is edited, moved or removed. Declared explicitly in the parity
   script so it cannot mask a second, accidental change.

## 1. Routes and metadata

Two entries appended to the landing block of `content/routes.ts`:

| `path` | `title` | `group` | `indexable` | `priority` |
|---|---|---|---|---|
| `/website-brief` | `Website Brief Form` | `landing` | `true` | `0.7` |
| `/logo-brief` | `Logo Design Brief Form` | `landing` | `true` | `0.7` |

`title` is the live `<title>` verbatim. The root layout's
`%s | Creative Logo Design` template appends the suffix, as it does for every
other rebuilt page. `0.7` rather than the other landing pages' `0.9`: these
rank but they are intake forms, not the pages the ad spend points at.

Metadata is built with `buildMetadata({ title, description, path, index })`:

- **Website brief** — description carried over verbatim from the live
  `<meta name="description">`.
- **Logo brief** — the live page has no description. One is written for it.

Both are **self-canonical**. Both emit the standard `WebPage` graph through
`pageGraph`. No new structured-data types.

Two redirects added to `next.config.ts`:

```ts
{ source: "/website-brief/index.php", destination: "/website-brief", permanent: true },
{ source: "/logo-brief/index.php",    destination: "/logo-brief",    permanent: true },
```

`trailingSlash: false` already 308s the `/website-brief/` slash forms, so they
need no entry — the same reasoning recorded for `/seo-services/`.

`docs/ROUTES.md` is regenerated with `node scripts/gen-routes-table.mjs`.

## 2. File layout

```
app/(landing)/website-brief/page.tsx        metadata + composition
app/(landing)/logo-brief/page.tsx
content/landing/website-brief.ts            every label, option, placeholder, heading
content/landing/logo-brief.ts
components/landing/brief/BriefShell.tsx     logo + title + intro + card — shared
components/landing/brief/WebsiteBriefForm.tsx
components/landing/brief/LogoBriefForm.tsx
components/landing/brief/fields.tsx         BriefInput/Textarea/Select/CheckboxGroup
```

Both pages render under the existing `app/(landing)/layout.tsx`, which already
supplies `<main id="main">` and the WhatsApp button and deliberately renders no
site chrome — exactly what these pages need.

**Why new field primitives rather than `components/forms/Field.tsx`.** The
existing `Field` is a floating-label control on dark glass, sized for
four-field forms. These two pages render roughly forty controls on a white
card with static labels above each input. Reusing it would mean threading a
third tone plus a label-position variant through a component that three other
forms depend on. `fields.tsx` is the smaller change and leaves `Field`
untouched.

**Why the two forms are not one component.** They share a shell and a set of
primitives and nothing else: different sections, different fields, different
schema, different action. The shared parts are extracted; the rest is not
forced together.

Only the form components are `"use client"` — the page, the shell, and every
label and heading are server-rendered, so the full text of both pages is in
the HTML a crawler receives.

## 3. Content modules

All copy lives in `content/landing/website-brief.ts` and
`content/landing/logo-brief.ts`, typed as section → field descriptors. Nothing
is inlined in a component. This is what makes the parity script a diff against
two files rather than a scrape of the rendered output.

Shape:

```ts
export const meta = { title: "...", description: "..." };
export const intro = { title: "...", description?: "..." };
export const sections = [
  {
    title: "Client Details",
    fields: [
      { kind: "text", name: "client_name", label: "Full Name *", required: true },
      // ...
    ],
  },
  // ...
];
export const submitLabel = "Submit Website Brief";
```

`kind` is one of `text | email | tel | url | textarea | select | checkboxes`.
`options` carries the `<option>` / checkbox values verbatim, including the
empty-value placeholder options (`Select`, `Select stage`, …).

## 4. Validation and delivery

### Schemas — `lib/validation.ts`

`websiteBriefSchema` and `logoBriefSchema`. Required-versus-optional is taken
from the live `js/script.js`, not invented, so a visitor who can submit today
can still submit after the port.

**Website brief** — required: `client_name` (min 3), `company`, `email`,
`business_overview` (min 5), and at least one `website_goals[]`. `phone` is
optional but must be ≥7 characters if filled. Everything else — the three
other textareas, `business_age`, `locations_served`, `target_industries`, the
four competitor URLs, `website_features[]`, `pages_required[]`,
`additional_notes` — is optional, matching the live script.

**Logo brief** — required: `full_name` (min 3), `business_name`,
`business_description` (min 5), `business_stage`, `logo_style`,
`contact_method`, `contact_info` (min 5), plus the newly added `email`.
Optional: `existing_presence`, `brand_message`, `logo_inspiration`,
`color_preferences`, `font_preferences`, `avoid`, `tagline`, `logo_usage`,
`branding_materials`, `schedule_call`.

The existing `name`, `email` and `phone` primitives are reused. Free-text
fields are capped (120 for single-line, 2000 for textareas) and trimmed.

`contact_info` is free text by design — the live field accepts "phone or
email" — so it is validated as length-bounded text, not as either type.

### Server Actions — `app/actions/forms.ts`

`submitWebsiteBrief` and `submitLogoBrief`. Both open with the existing
`guard(formData, action)` — honeypot, fill-time stamp, reCAPTCHA v3 — under
new action names `website_brief` and `logo_brief`, which must match the
`action` prop on each page's `<Recaptcha>`.

The three checkbox arrays (`website_goals[]`, `website_features[]`,
`pages_required[]`) are **matched against a `Set` built from the content
module**, never echoed. Same guard and same reasoning as `LANDING_PACKAGES`:
the values are visitor-editable and they land in an email. A `Set`, not an
object literal, so inherited keys such as `constructor` cannot slip through.
Unrecognised values are dropped silently.

Both actions send:

- `sendAdminNotification` — every answer as a labelled `MailField`, in the
  page's own section order, `replyTo` set to the submitted email.
- `sendUserConfirmation` — to the submitted email. The logo brief can now do
  this because of the added field; this is the reason it was added.

`formName` is a constant in this file (`"New website brief"` /
`"New logo design brief"`), never composed from visitor input.

Result is reported through the existing `FormStatus` banner. No redirect to a
thanks page — this matches every other form on the site, and it keeps the
visitor's answers on screen if delivery fails.

## 5. UI

White card on the brand gradient, rebuilt on the tokens in
`app/globals.css`:

- Real logo through `next/image` with explicit `width`/`height`, replacing the
  live `<img src="images/Logo-01.svg">`.
- Section headings keep their live text and gain a rule; heading **levels** are
  normalised (`h1` for the page title, `h2` per section) — a level change with
  identical text is explicitly allowed by `docs/CONTENT-PARITY.md`.
- Styled selects and checkboxes rather than native controls, with visible
  focus rings.
- Label contrast at AA against the white card.
- Checkbox groups on a responsive grid collapsing to one column.
- Errors rendered under their field with `aria-describedby`, replacing the
  live `<span class="form-error">`.

**Required-field marking.** Where the live label already carries a `*`
(`Full Name *`, `Website Goals *`, `Tell us about your business*`) the `*` is
kept exactly as written, including the missing space in the third. Where the
live page marks nothing — the entire logo brief — required fields get
`required` + `aria-required` and no visible label change. No visible string
moves in either direction.

Responsive behaviour verified with
`node scripts/audit-responsive.mjs http://127.0.0.1:3100 /website-brief` and
the same for `/logo-brief`, across all 12 widths down to 320px.

## 6. Verification

`scripts/verify-brief-parity.py`, following the structure of
`verify-seo-services-parity.py` and gated **both directions**:

- Every label, section heading, placeholder, `<option>` and button label in
  the live HTML appears in the matching content module.
- Nothing appears in the content module that is not in the live HTML.
- Exactly one declared exception: the logo brief's added Email Address field
  (label and placeholder), listed explicitly in the script. Any other
  difference fails.
- The live `<title>` matches the `routes.ts` entry.
- Every live `name=` attribute is still posted by the new form, so the shape of
  what the team receives by email is unchanged.

Also required before shipping:

```bash
npm run build          # both routes ○ (Static)
npx tsc --noEmit
npm run lint
npx next typegen
node scripts/gen-routes-table.mjs --check
```

## Out of scope

- Any change to `components/forms/Field.tsx` or the three forms using it.
- A thanks/confirmation page. The inline banner is the site-wide pattern.
- Storing submissions anywhere but email. The live pages do not, and no
  database exists in this repo.
