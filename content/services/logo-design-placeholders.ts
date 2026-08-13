import type { ServiceContentOverrides } from "./types";
import { brandingOverrides } from "./branding";

/**
 * PLACEHOLDER CONTENT — the `/logo-design-services` pillar page and all seven of
 * its sub-services.
 *
 * None exists on the live Laravel site, so there is nothing to port and nothing
 * for `scripts/verify-content-parity.py` to check against. Everything is cloned
 * from `./branding`, the nearest real page, with only the page-identifying
 * strings swapped. Same arrangement as the other `*-placeholders` modules; see
 * docs/CONTENT-PARITY.md.
 *
 * ## Why the pillar overrides `hero.tiles`
 *
 * `/creative-logo-design` is an indexable, self-canonical landing page, and
 * `content/nav.ts` was its ONLY internal link: it filled the Logo Design menu
 * group while that group had no pillar page. The SEO plan gives that menu slot
 * to `/logo-design-services/custom-logo-design`, which would have left the
 * landing page orphaned — no link from the chrome or any page body, which
 * AGENTS.md forbids outright.
 *
 * So the pillar's quick-link tiles carry it instead. `components/services/Hero`
 * builds each tile's href as `currentPath('/' + tile.slug)`, so the
 * `creative-logo-design` slug below resolves to `/creative-logo-design` and the
 * page keeps a real, crawlable inbound link from the pillar that now owns its
 * subject. The other three tiles are the branding page's own, unchanged.
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

/**
 * The pillar page. Identical to the others except for the tiles, which keep
 * `/creative-logo-design` linked — see the note at the top of this file.
 */
export const logoDesignServicesOverrides: ServiceContentOverrides = (() => {
    const base = placeholderContent({
        title: "Logo Design Services",
        label: "Logo Design Services",
        description:
            "Logo design services from Creative Logo Design — custom, business, 3D, mascot, minimalist and illustrative logos, delivered with every file format you will ever need.",
        heading: "A logo you own outright,",
        headingAccent: "in every format you will ever need",
        lead: "Custom marks drawn for your business, not picked from a template — supplied as vector source plus every export you need for print, web and social.",
    });

    return {
        ...base,
        hero: {
            ...base.hero,
            tiles: [
                {
                    /* Resolves to `/creative-logo-design` — the landing page's
                       only remaining internal link. Do not remove without
                       giving that page another one. */
                    label: "Custom Logo Design",
                    slug: "creative-logo-design",
                    icon: {
                        src: "/assets/img/services/_shared/branding.webp",
                        width: 500,
                        height: 628,
                    },
                },
                {
                    label: "Branding",
                    slug: "branding",
                    icon: {
                        src: "/assets/img/services/_shared/branding.webp",
                        width: 500,
                        height: 628,
                    },
                },
                {
                    label: "Website",
                    slug: "web-designing",
                    icon: {
                        src: "/assets/img/services/_shared/website.webp",
                        width: 500,
                        height: 628,
                    },
                },
                {
                    label: "Social Media",
                    slug: "social-media-management",
                    icon: {
                        src: "/assets/img/services/_shared/social-media.webp",
                        width: 500,
                        height: 628,
                    },
                },
            ],
        },
    };
})();

export const customLogoDesignOverrides = placeholderContent({
    title: "Custom Logo Design",
    label: "Custom Logo Design",
    description:
        "Custom logo design from Creative Logo Design — an original mark drawn for your business, with unlimited concepts refined until it is right and full ownership on delivery.",
    heading: "An original mark,",
    headingAccent: "drawn for your business alone",
    lead: "Concepts developed from scratch around your positioning and market, refined with you, and handed over as vector source files you own outright.",
});

export const businessLogoDesignOverrides = placeholderContent({
    title: "Business Logo Design",
    label: "Business Logo Design",
    description:
        "Business logo design from Creative Logo Design — professional, versatile marks for companies of any size, ready for signage, print, web and everything after.",
    heading: "A mark that works as hard",
    headingAccent: "as the business behind it",
    lead: "Professional identities built to scale from a favicon to a shopfront, with the variants, spacing rules and file formats a growing business actually needs.",
});

export const logoRedesignOverrides = placeholderContent({
    title: "Logo Redesign",
    label: "Logo Redesign",
    description:
        "Logo redesign from Creative Logo Design — modernise a dated mark without throwing away the recognition your customers already have.",
    heading: "Modernise the mark,",
    headingAccent: "keep the recognition",
    lead: "Evolution or full redraw, judged case by case — clearer shapes, better scaling and a considered rollout that your existing customers still recognise.",
});

export const threeDLogoDesignOverrides = placeholderContent({
    title: "3D Logo Design",
    label: "3D Logo Design",
    description:
        "3D logo design from Creative Logo Design — dimensional marks and renders for signage, product, animation and screen, alongside a flat version that still works everywhere.",
    heading: "Depth where it helps,",
    headingAccent: "flat where it has to work",
    lead: "Dimensional treatments, materials and lighting for signage, packaging and motion — always paired with a flat mark that survives a small screen.",
});

export const mascotLogoDesignOverrides = placeholderContent({
    title: "Mascot Logo Design",
    label: "Mascot Logo Design",
    description:
        "Mascot logo design from Creative Logo Design — a character your audience remembers, drawn with the poses and expressions to use it well.",
    heading: "A character your customers",
    headingAccent: "actually remember",
    lead: "Original mascot design with the poses, expressions and variants you need for packaging, social, sports kit and campaigns — not just one static drawing.",
});

export const minimalistLogoDesignOverrides = placeholderContent({
    title: "Minimalist Logo Design",
    label: "Minimalist Logo Design",
    description:
        "Minimalist logo design from Creative Logo Design — clean, simple marks stripped to the essentials, so they read instantly at any size.",
    heading: "Stripped to the part",
    headingAccent: "people actually remember",
    lead: "Simple geometry, confident type and generous space — marks that stay legible at 16 pixels and still look considered at billboard scale.",
});

export const illustrativeLogoDesignOverrides = placeholderContent({
    title: "Illustrative Logo Design",
    label: "Illustrative Logo Design",
    description:
        "Illustrative logo design from Creative Logo Design — hand-drawn, detailed marks with real character, built to stay reproducible in print and on screen.",
    heading: "Detail and character,",
    headingAccent: "without losing reproducibility",
    lead: "Hand-drawn marks with genuine personality, engineered so the detail survives embroidery, one-colour print and a small screen.",
});
