/**
 * Navigation — single source of truth for the services menu.
 *
 * The desktop mega-menu, the mobile drawer, and the Service/OfferCatalog
 * JSON-LD all render from this file, so a link can never exist in one and be
 * missing from another.
 *
 * Groups follow the 2026-08 SEO plan: 8 pillars, sub-services nested under
 * each. Only pages that actually exist are linked — a menu link to an unbuilt
 * page is a 404, and a placeholder page shipped early is indexed thin content;
 * both cost rankings. As each planned sub-service page is built (see
 * docs/ROUTES.md "Adding a route"), it gets one `items` line here.
 *
 * Two groups are ahead of their pillar page: "Automation Services" and
 * "Logo Design Services" have `href: null` until `/automation-services` and
 * `/logo-design-services` are built with real content.
 */

import type { Route } from "next";

export interface NavLink {
    label: string;
    /** Typed against the app's real routes — `typedRoutes` catches broken links at build time. */
    href: Route;
}

export interface NavGroup {
    label: string;
    /** Pillar page for the group, or null while the group's pillar page is unbuilt. */
    href: Route | null;
    items: NavLink[];
}

export const primaryNav: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
];

export const serviceNav: NavGroup[] = [
    {
        /* The pillar link is the /seo-services landing page — it is the SEO
           plan's pillar URL and a real, indexable page, but it renders without
           site chrome until it is rebuilt as a proper pillar page. */
        label: "SEO Services",
        href: "/seo-services" as Route,
        items: [
            { label: "SEO Audit", href: "/seo-services/seo-audit" as Route },
            { label: "Technical SEO", href: "/seo-services/technical-seo" as Route },
            { label: "On-Page SEO", href: "/seo-services/on-page-seo" as Route },
            { label: "Off-Page SEO / Link Building", href: "/seo-services/link-building" as Route },
            { label: "Local SEO", href: "/seo-services/local-seo" as Route },
            { label: "E-commerce SEO", href: "/seo-services/ecommerce-seo" as Route },
            { label: "Shopify SEO", href: "/seo-services/shopify-seo" as Route },
            { label: "WordPress SEO", href: "/seo-services/wordpress-seo" as Route },
            { label: "Amazon SEO", href: "/seo-services/amazon-seo" as Route },
            { label: "AEO", href: "/seo-services/aeo" as Route },
            { label: "Keyword Research", href: "/seo-services/keyword-research" as Route },
        ],
    },
    {
        label: "Web Design Services",
        href: "/web-design-services" as Route,
        items: [
            { label: "Custom WordPress Website Design", href: "/web-design-services/custom-wordpress" as Route },
            { label: "Website Redesign", href: "/web-design-services/website-redesign" as Route },
            { label: "Responsive Website Design", href: "/web-design-services/responsive-design" as Route },
            { label: "UI & UX Design", href: "/web-design-services/ui-ux-design" as Route },
            { label: "Shopify Web Design", href: "/web-design-services/shopify" as Route },
            { label: "Magento Web Design & Development", href: "/web-design-services/magento" as Route },
            { label: "Corporate Blog Design", href: "/web-design-services/corporate-blog-design" as Route },
            { label: "Content Management Systems", href: "/web-design-services/cms" as Route },
            // { label: "UI & UX Analysis", href: "/ui-and-ux-analysis" as Route },
        ],
    },
    {
        label: "Web Development Services",
        href: "/web-development-services" as Route,
        items: [
            { label: "E-commerce Development", href: "/web-development-services/ecommerce" as Route },
            { label: "WordPress Development", href: "/web-development-services/wordpress" as Route },
            { label: "Shopify Development", href: "/web-development-services/shopify" as Route },
            { label: "Magento Development", href: "/web-development-services/magento" as Route },
            { label: "Laravel Development", href: "/web-development-services/laravel" as Route },
            { label: "Contentful Development", href: "/web-development-services/contentful" as Route },
            { label: "AMP Development", href: "/web-development-services/amp" as Route },
            { label: "Page Speed Optimisation", href: "/web-development-services/page-speed-optimisation" as Route },
            { label: "Custom 3D Configurators", href: "/web-development-services/3d-configurators" as Route },
            { label: "Website Maintenance", href: "/web-development-services/website-maintenance" as Route },
        ],
    },
    {
        label: "App Development Services",
        href: "/app-development-services" as Route,
        items: [],
    },
    {
        label: "Branding Services",
        href: "/branding-services" as Route,
        items: [],
    },
    {
        label: "Digital Marketing Services",
        href: "/digital-marketing-services" as Route,
        items: [
            { label: "PPC", href: "/digital-marketing-services/ppc" as Route },
            { label: "Social Media", href: "/digital-marketing-services/social-media-marketing" as Route },
            { label: "Email Marketing", href: "/digital-marketing-services/email-marketing" as Route },
            { label: "Content Marketing", href: "/digital-marketing-services/content-marketing" as Route },
            { label: "Conversion Rate", href: "/digital-marketing-services/cro" as Route },
            { label: "Influencer Marketing", href: "/digital-marketing-services/influencer-marketing" as Route },
            { label: "Google Analytics 4", href: "/digital-marketing-services/google-analytics-4" as Route },
        ],
    },
    {
        label: "Automation Services",
        href: null,
        items: [
            { label: "Marketing & Sales Automation", href: "/automation-services/marketing-sales-automation" as Route },
        ],
    },
    {
        /* No site page under this pillar yet. The one real logo-design page is
           the /creative-logo-design landing page — indexable and self-canonical,
           so linking it here is safe, but it renders without site chrome. */
        label: "Logo Design Services",
        href: null,
        items: [
            { label: "Custom Logo Design", href: "/creative-logo-design" as Route },
        ],
    },
];

/** Flat list of every service URL — used by the Service/OfferCatalog JSON-LD. */
export const allServiceLinks: NavLink[] = serviceNav.flatMap((g) => [
    ...(g.href ? [{ label: g.label, href: g.href }] : []),
    ...g.items,
]);
