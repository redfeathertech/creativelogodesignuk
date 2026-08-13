import type { ServiceContentOverrides } from "./types";
import { brandingOverrides } from "./branding";

/**
 * PLACEHOLDER CONTENT — the seven Branding sub-service pages added for the SEO
 * plan's URL tree (`/branding-services/brand-identity`,
 * `/branding-services/brand-strategy`, …).
 *
 * None of these pages exists on the live Laravel site, so there is nothing to
 * port and nothing for `scripts/verify-content-parity.py` to check against.
 * Every section below is cloned from `./branding` — the pillar page they nest
 * under — with only the page-identifying strings (title, meta description, hero
 * eyebrow/breadcrumb/heading/lead, marquee, whyChoose heading) swapped so each
 * page names itself. Images are the shared service art.
 *
 * Same arrangement as `./seo-placeholders` and `./app-placeholders`, and it
 * graduates the same way: when the real copy lands, each page gets its own
 * module in this directory. See docs/CONTENT-PARITY.md.
 *
 * Because `mergeContent` in ./index replaces whole sections rather than merging
 * them element-by-element, each section here is spread complete from
 * `brandingOverrides` — never partially.
 */

interface Placeholder {
    /** `<title>`, and `meta.title`. Must equal the route title in ../routes. */
    title: string;
    /** Hero eyebrow + breadcrumb label. */
    label: string;
    description: string;
    heading: string;
    headingAccent: string;
    lead: string;
}

function placeholderContent(p: Placeholder): ServiceContentOverrides {
    return {
        ...brandingOverrides,
        meta: { title: p.title, description: p.description },
        hero: {
            ...brandingOverrides.hero,
            eyebrow: p.label,
            breadcrumb: p.label,
            heading: p.heading,
            headingAccent: p.headingAccent,
            lead: p.lead,
            mediaAlt: `${p.title} services from Creative Logo Design`,
        },
        marquee: { text: p.label },
        whyChoose: {
            ...brandingOverrides.whyChoose,
            heading: "Why Choose Creative Logo Design for",
            headingAccent: `${p.title}?`,
        },
        cta: { ...brandingOverrides.cta },
    };
}

export const brandIdentityDesignOverrides = placeholderContent({
    title: "Brand Identity Design",
    label: "Brand Identity Design",
    description:
        "Brand identity design from Creative Logo Design — logo, colour, type and the whole visual system, built so your business looks like itself everywhere it appears.",
    heading: "A look your customers recognise",
    headingAccent: "before they read the name",
    lead: "Logo, palette, typography, iconography and imagery, drawn into one coherent system so every touchpoint reads as unmistakably yours.",
});

export const brandStrategyOverrides = placeholderContent({
    title: "Brand Strategy",
    label: "Brand Strategy",
    description:
        "Brand strategy from Creative Logo Design — positioning, audience and messaging worked out first, so every design decision after it has a reason behind it.",
    heading: "Decide what you stand for,",
    headingAccent: "then design for it",
    lead: "Market and competitor research, positioning, audience definition, tone of voice and messaging — the thinking that makes the visual work land instead of just look nice.",
});

export const rebrandingOverrides = placeholderContent({
    title: "Rebranding Services",
    label: "Rebranding",
    description:
        "Rebranding services from Creative Logo Design — repositioning and redesigning an established brand without throwing away the recognition you have already earned.",
    heading: "Move the brand forward",
    headingAccent: "without losing who you are",
    lead: "Audit, repositioning, redesign and a staged rollout plan — a change your existing customers follow rather than one that leaves them behind.",
});

export const brandGuidelinesOverrides = placeholderContent({
    title: "Brand Guidelines",
    label: "Brand Guidelines",
    description:
        "Brand guidelines design from Creative Logo Design — a clear, usable brand book so everyone who touches your brand applies it the same way.",
    heading: "One rulebook, so the brand",
    headingAccent: "survives everyone who uses it",
    lead: "Logo usage, spacing, colour and type specs, imagery and tone — documented clearly enough that agencies, printers and new starters all get it right.",
});

export const packagingDesignOverrides = placeholderContent({
    title: "Packaging Design",
    label: "Packaging Design",
    description:
        "Packaging design from Creative Logo Design — shelf-ready artwork that stands out in its category and arrives at the printer correct the first time.",
    heading: "Design that earns",
    headingAccent: "the second look on the shelf",
    lead: "Structural and surface design, category-aware standout, and print-ready artwork with dielines, spot colours and specs your printer can work from.",
});

export const stationeryDesignOverrides = placeholderContent({
    title: "Stationery Design",
    label: "Stationery Design",
    description:
        "Business stationery design from Creative Logo Design — letterheads, compliment slips, invoices and email signatures that carry your brand properly.",
    heading: "The everyday pieces",
    headingAccent: "that quietly prove you are serious",
    lead: "Letterheads, compliment slips, invoices, folders and email signatures — designed as a set, supplied print-ready and consistent with everything else you send out.",
});

export const businessCardDesignOverrides = placeholderContent({
    title: "Business Card Design",
    label: "Business Card Design",
    description:
        "Business card design from Creative Logo Design — cards worth keeping, with the finishes, stock and print-ready artwork sorted before they reach the printer.",
    heading: "The one piece of print",
    headingAccent: "people still put in their pocket",
    lead: "Layout, stock, finish and print-ready artwork — from a clean single-colour card to foil, emboss and soft-touch, set up correctly for the press.",
});
