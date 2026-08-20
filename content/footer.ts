/**
 * Footer link columns, social profiles and legal links.
 *
 * The five service columns are HAND-WRITTEN, not derived from `serviceNav`.
 * They used to be derived, and that was the right call while the footer
 * mirrored the mega-menu one-for-one. The signed-off footer design does not:
 * it is a curated 29-link selection under five headings, and several of its
 * labels deliberately differ from the menu's ("AMP Web Design" for
 * `/web-development-services/amp`, "Shopify Developers" for `…/shopify`,
 * "SEO Audit Services" for `…/seo-audit`). Deriving would fight the design on
 * every render.
 *
 * The drift the old comment worried about is now caught two ways:
 *
 * 1. Every `href` below is typed `Route`, so `next build` fails on a path that
 *    does not exist. A renamed page cannot silently 404 from here.
 * 2. A NEW service page never being added here costs nothing crawlable — the
 *    header mega-menu keeps all eight pillars and every sub-service in the DOM
 *    on every page (see `components/chrome/Nav.tsx`), so the indexable link
 *    graph does not depend on this list. That is the property that makes a
 *    curated footer safe at all.
 *
 * Note `Conversion Rate Optimisation` sits under SEO and points at
 * `/digital-marketing-services/cro`. That is not a mistake — the live site
 * files CRO under its SEO heading, and the page itself lives in the
 * digital-marketing pillar.
 */

import type { Route } from "next";
import type { NavLink } from "./nav";
import { social } from "./site";

export const footerTagline =
    "A full-service design & development agency from the UK, building brands, products and growth for businesses worldwide.";

export const footerHeading = "LET’S GROW YOUR BRAND";

export const locationsHeading = "Locations";

export interface FooterColumn {
    heading: string;
    /**
     * The column's pillar page, rendered as a link on the heading itself, or
     * null where the pillar is already the column's first list item — linking
     * it twice in one <nav> gives the same URL two anchors for no gain.
     */
    href: Route | null;
    links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
    {
        heading: "Web Design",
        href: "/web-design-services" as Route,
        links: [
            { label: "Custom WordPress Website Design", href: "/web-design-services/custom-wordpress" as Route },
            { label: "Website Redesign", href: "/web-design-services/website-redesign" as Route },
            { label: "Responsive Website Design", href: "/web-design-services/responsive-design" as Route },
            { label: "UI & UX Design", href: "/web-design-services/ui-ux-design" as Route },
            { label: "Shopify Web Design", href: "/web-design-services/shopify" as Route },
            { label: "Magento Web Design", href: "/web-design-services/magento" as Route },
        ],
    },
    {
        heading: "Web Development",
        href: "/web-development-services" as Route,
        links: [
            { label: "E-commerce Development", href: "/web-development-services/ecommerce" as Route },
            { label: "WordPress Development", href: "/web-development-services/wordpress" as Route },
            { label: "AMP Web Design", href: "/web-development-services/amp" as Route },
            { label: "Page Speed Optimisation", href: "/web-development-services/page-speed-optimisation" as Route },
            { label: "Shopify Developers", href: "/web-development-services/shopify" as Route },
            { label: "Magento Development", href: "/web-development-services/magento" as Route },
            { label: "Laravel Developers", href: "/web-development-services/laravel" as Route },
        ],
    },
    {
        heading: "SEO",
        href: "/seo-services" as Route,
        links: [
            { label: "Answer Engine Optimisation (AEO)", href: "/seo-services/aeo" as Route },
            { label: "SEO Audit Services", href: "/seo-services/seo-audit" as Route },
            { label: "Technical SEO", href: "/seo-services/technical-seo" as Route },
            { label: "On-Page SEO", href: "/seo-services/on-page-seo" as Route },
            { label: "Link Building", href: "/seo-services/link-building" as Route },
            { label: "Local SEO", href: "/seo-services/local-seo" as Route },
            { label: "E-commerce SEO", href: "/seo-services/ecommerce-seo" as Route },
            { label: "Conversion Rate Optimisation", href: "/digital-marketing-services/cro" as Route },
        ],
    },
    {
        /* href is null: "Digital Marketing" is the first list item below. */
        heading: "Digital Marketing",
        href: null,
        links: [
            { label: "Digital Marketing", href: "/digital-marketing-services" as Route },
            { label: "Marketing & Sales", href: "/automation-services/marketing-sales-automation" as Route },
            { label: "Automation", href: "/automation-services" as Route },
            { label: "PPC Management", href: "/digital-marketing-services/ppc" as Route },
            { label: "Social Media Management", href: "/digital-marketing-services/social-media-marketing" as Route },
            { label: "Email Marketing", href: "/digital-marketing-services/email-marketing" as Route },
            { label: "Content Marketing", href: "/digital-marketing-services/content-marketing" as Route },
            { label: "Influencer Marketing", href: "/digital-marketing-services/influencer-marketing" as Route },
        ],
    },
];

/**
 * The footer's four social buttons.
 *
 * Built from `site.social` plus LinkedIn rather than adding LinkedIn to
 * `site.social` itself: that array also feeds `Organization.sameAs` in
 * `lib/seo.ts` and the TopBar's icon strip, so extending it is a structured-
 * data and header decision, not a footer one. The URL is the same company
 * page the live landing-page footers link (`content/landing/lp.ts`).
 */
export const footerSocial: NavLink[] = [
    ...social.map((s) => ({ label: s.label, href: s.href as NavLink["href"] })),
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/creativelogo-design-uk/" as NavLink["href"],
    },
];

export const legalLinks: NavLink[] = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Cookie Policy", href: "/cookies-policy" },
];
