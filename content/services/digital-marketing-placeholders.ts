import type { ServiceContentOverrides } from "./types";
import { digitalMarketingOverrides } from "./digital-marketing";

/**
 * PLACEHOLDER CONTENT — the three paid-social pages added for the SEO plan's
 * Digital Marketing table (`/digital-marketing-services/meta-ads`,
 * `linkedin-ads`, `tiktok-ads`).
 *
 * Only three, because that group is the one case where the 2026-08 restructure
 * had already landed the plan's URLs: the other seven sub-services exist, on
 * exactly the paths the plan asks for, and only took the plan's page name as
 * their title. These three are the genuinely new URLs.
 *
 * None exists on the live Laravel site, so there is nothing to port and nothing
 * for `scripts/verify-content-parity.py` to check against. Every section is
 * cloned from `./digital-marketing` — the pillar they nest under — with only
 * the page-identifying strings swapped so each page names itself.
 *
 * Same arrangement as `./seo-placeholders`, `./app-placeholders` and
 * `./branding-placeholders`. See docs/CONTENT-PARITY.md.
 *
 * Because `mergeContent` in ./index replaces whole sections rather than merging
 * them element-by-element, each section here is spread complete from
 * `digitalMarketingOverrides` — never partially.
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
        ...digitalMarketingOverrides,
        meta: { title: p.title, description: p.description },
        hero: {
            ...digitalMarketingOverrides.hero,
            eyebrow: p.label,
            breadcrumb: p.label,
            heading: p.heading,
            headingAccent: p.headingAccent,
            lead: p.lead,
            mediaAlt: `${p.title} services from Creative Logo Design`,
        },
        marquee: { text: p.label },
        whyChoose: {
            ...digitalMarketingOverrides.whyChoose,
            heading: "Why Choose Creative Logo Design for",
            headingAccent: `${p.title}?`,
        },
        cta: { ...digitalMarketingOverrides.cta },
    };
}

export const metaAdsOverrides = placeholderContent({
    title: "Meta Ads",
    label: "Meta Ads",
    description:
        "Meta Ads management from Creative Logo Design — Facebook and Instagram campaigns built around creative testing, clean tracking and cost per acquisition.",
    heading: "Facebook and Instagram ads",
    headingAccent: "measured on what they return",
    lead: "Audience and creative testing, pixel and Conversions API tracking, and campaign structures judged on cost per acquisition rather than reach.",
});

export const linkedinAdsOverrides = placeholderContent({
    title: "LinkedIn Ads",
    label: "LinkedIn Ads",
    description:
        "LinkedIn Ads management from Creative Logo Design — B2B campaigns targeted by role, company and industry, built to bring in qualified pipeline.",
    heading: "Reach the people who sign off,",
    headingAccent: "not just the people who click",
    lead: "Job title, seniority, company and industry targeting, lead gen forms and message ads, tuned around cost per qualified lead for long B2B sales cycles.",
});

export const tiktokAdsOverrides = placeholderContent({
    title: "TikTok Ads",
    label: "TikTok Ads",
    description:
        "TikTok Ads management from Creative Logo Design — native-feeling creative and campaign management that turns short-form attention into measurable sales.",
    heading: "Ads that look like TikTok,",
    headingAccent: "not like adverts",
    lead: "Native short-form creative, Spark Ads, creator collaboration and rapid iteration on hooks — built for a feed where polish is what gets scrolled past.",
});
