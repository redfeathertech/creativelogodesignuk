import type { ServiceContentOverrides } from "./types";
import { seoOverrides } from "./seo";

/**
 * PLACEHOLDER CONTENT — the eight SEO sub-service pages added for the SEO
 * plan's URL tree (`/seo-services/technical-seo`, `/seo-services/on-page-seo`,
 * …).
 *
 * None of these pages exists on the live Laravel site, so there is nothing to
 * port and nothing for `scripts/verify-content-parity.py` to check against.
 * Every section below is cloned from `./seo` — the general SEO page whose URL
 * these eight replace — with only the page-identifying strings (title, meta
 * description, hero eyebrow/breadcrumb/heading/lead, marquee, whyChoose
 * heading) swapped so each page names itself. Images are the shared service
 * art, same as every other service page.
 *
 * The SEO team is writing the real copy and supplying real images. When those
 * land, each page graduates to its own module in this directory and drops out
 * of `PLACEHOLDER_MODULES` in the parity script.
 *
 * Because `mergeContent` in ./index replaces whole sections rather than merging
 * them element-by-element, each section here is spread complete from
 * `seoOverrides` — never partially.
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
        ...seoOverrides,
        meta: { title: p.title, description: p.description },
        hero: {
            ...seoOverrides.hero,
            eyebrow: p.label,
            breadcrumb: p.label,
            heading: p.heading,
            headingAccent: p.headingAccent,
            lead: p.lead,
            mediaAlt: `${p.title} services from Creative Logo Design`,
        },
        marquee: { text: p.label },
        whyChoose: {
            ...seoOverrides.whyChoose,
            heading: "Why Choose Creative Logo Design for",
            headingAccent: `${p.title}?`,
        },
        cta: { ...seoOverrides.cta },
    };
}

export const technicalSeoOverrides = placeholderContent({
    title: "Technical SEO",
    label: "Technical SEO",
    description:
        "Technical SEO services from Creative Logo Design — crawlability, site speed, indexation and Core Web Vitals fixes that give your content a clean run at the rankings.",
    heading: "The fixes search engines notice",
    headingAccent: "before your content",
    lead: "Crawl budget, indexation, structured data, Core Web Vitals and site architecture — the groundwork that decides whether the rest of your SEO ever pays off.",
});

export const onPageSeoOverrides = placeholderContent({
    title: "On-Page SEO",
    label: "On-Page SEO",
    description:
        "On-page SEO services from Creative Logo Design — titles, headings, internal links and content optimisation that move your pages up for the terms that convert.",
    heading: "Every page earning its place",
    headingAccent: "in the results",
    lead: "Titles, meta descriptions, heading structure, internal linking and on-page content, tuned page by page around the search intent you actually want to win.",
});

export const linkBuildingOverrides = placeholderContent({
    title: "Off-Page SEO & Link Building",
    label: "Link Building",
    description:
        "Link building and off-page SEO from Creative Logo Design — relevant, editorially earned backlinks that build the authority your rankings depend on.",
    heading: "Authority you earn,",
    headingAccent: "not authority you rent",
    lead: "Digital PR, editorial outreach and relationship-led link acquisition — relevant placements that hold their value instead of disappearing at the next update.",
});

export const localSeoOverrides = placeholderContent({
    title: "Local SEO",
    label: "Local SEO",
    description:
        "Local SEO services from Creative Logo Design — Google Business Profile, local citations and location pages that put you in front of nearby customers ready to buy.",
    heading: "Be the business they find",
    headingAccent: "on their doorstep",
    lead: "Google Business Profile, map pack visibility, citations, reviews and location landing pages that turn nearby searches into calls, visits and bookings.",
});

export const ecommerceSeoOverrides = placeholderContent({
    title: "E-commerce SEO",
    label: "E-commerce SEO",
    description:
        "E-commerce SEO from Creative Logo Design — category, product and faceted-navigation optimisation that grows organic revenue, not just traffic.",
    heading: "Rankings that show up",
    headingAccent: "in your revenue",
    lead: "Category and product page optimisation, faceted navigation, structured data and merchandising-aware keyword strategy for stores on any platform.",
});

export const shopifySeoOverrides = placeholderContent({
    title: "Shopify SEO",
    label: "Shopify SEO",
    description:
        "Shopify SEO services from Creative Logo Design — theme, collection and product optimisation built around how Shopify actually handles URLs, speed and indexation.",
    heading: "Shopify stores that rank",
    headingAccent: "as well as they sell",
    lead: "Collection and product optimisation, duplicate URL handling, theme speed and app bloat — Shopify's own quirks, dealt with by people who know the platform.",
});

export const wordpressSeoOverrides = placeholderContent({
    title: "WordPress SEO",
    label: "WordPress SEO",
    description:
        "WordPress SEO services from Creative Logo Design — plugin configuration, taxonomy clean-up, speed and content optimisation for WordPress and WooCommerce sites.",
    heading: "Get WordPress working",
    headingAccent: "for your rankings",
    lead: "SEO plugin configuration, taxonomy and archive clean-up, Core Web Vitals, and a content structure that gives every post and page a job to do.",
});

export const keywordResearchOverrides = placeholderContent({
    title: "Keyword Research",
    label: "Keyword Research",
    description:
        "Keyword research services from Creative Logo Design — intent-led keyword and topic mapping that tells you exactly which pages to build and why.",
    heading: "Know exactly what to target",
    headingAccent: "before you write a word",
    lead: "Search demand, competitor gaps and buyer intent, mapped to a page-by-page plan — so every piece of content you commission has a term it can win.",
});
