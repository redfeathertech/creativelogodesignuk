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
 * As of 13 Aug 2026 all eight groups have a pillar page, so no group carries
 * `href: null` any more. The type still allows it — a future group may be added
 * to the menu before its pillar exists — and `NavGroup.href` being null renders
 * the rail row as a non-navigating heading rather than a link to a 404.
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
        items: [
            { label: "Android App Development", href: "/app-development-services/android" as Route },
            { label: "iOS App Development", href: "/app-development-services/ios" as Route },
            { label: "Cross-Platform App Development", href: "/app-development-services/cross-platform" as Route },
            { label: "Flutter App Development", href: "/app-development-services/flutter" as Route },
            { label: "React Native App Development", href: "/app-development-services/react-native" as Route },
            { label: "App Maintenance & Support", href: "/app-development-services/app-maintenance" as Route },
        ],
    },
    {
        label: "Branding Services",
        href: "/branding-services" as Route,
        items: [
            { label: "Brand Identity Design", href: "/branding-services/brand-identity" as Route },
            { label: "Brand Strategy", href: "/branding-services/brand-strategy" as Route },
            { label: "Rebranding Services", href: "/branding-services/rebranding" as Route },
            { label: "Brand Guidelines", href: "/branding-services/brand-guidelines" as Route },
            { label: "Packaging Design", href: "/branding-services/packaging-design" as Route },
            { label: "Stationery Design", href: "/branding-services/stationery-design" as Route },
            { label: "Business Card Design", href: "/branding-services/business-card-design" as Route },
        ],
    },
    {
        label: "Digital Marketing Services",
        href: "/digital-marketing-services" as Route,
        items: [
            { label: "PPC / Google Ads", href: "/digital-marketing-services/ppc" as Route },
            { label: "Meta Ads", href: "/digital-marketing-services/meta-ads" as Route },
            { label: "Social Media Marketing", href: "/digital-marketing-services/social-media-marketing" as Route },
            { label: "Email Marketing", href: "/digital-marketing-services/email-marketing" as Route },
            { label: "Content Marketing", href: "/digital-marketing-services/content-marketing" as Route },
            { label: "Conversion Rate Optimisation", href: "/digital-marketing-services/cro" as Route },
            { label: "Influencer Marketing", href: "/digital-marketing-services/influencer-marketing" as Route },
            { label: "Google Analytics 4 & Tracking", href: "/digital-marketing-services/google-analytics-4" as Route },
            { label: "LinkedIn Ads", href: "/digital-marketing-services/linkedin-ads" as Route },
            { label: "TikTok Ads", href: "/digital-marketing-services/tiktok-ads" as Route },
        ],
    },
    {
        label: "Automation Services",
        href: "/automation-services" as Route,
        items: [
            { label: "Marketing & Sales Automation", href: "/automation-services/marketing-sales-automation" as Route },
            { label: "CRM Automation", href: "/automation-services/crm-automation" as Route },
            { label: "Workflow Automation", href: "/automation-services/workflow-automation" as Route },
            { label: "Email Automation", href: "/automation-services/email-automation" as Route },
            { label: "Chatbot Development", href: "/automation-services/chatbot-development" as Route },
            { label: "AI Automation", href: "/automation-services/ai-automation" as Route },
        ],
    },
    {
        /* This group used to point at the /creative-logo-design landing page,
           because it had no pillar of its own. It does now, and the SEO plan
           gives that menu slot to /logo-design-services/custom-logo-design.
           The landing page is NOT orphaned by that: the pillar page links it
           from its hero tiles — see content/services/logo-design-placeholders.ts. */
        label: "Logo Design Services",
        href: "/logo-design-services" as Route,
        items: [
            { label: "Custom Logo Design", href: "/logo-design-services/custom-logo-design" as Route },
            { label: "Business Logo Design", href: "/logo-design-services/business-logo-design" as Route },
            { label: "Logo Redesign", href: "/logo-design-services/logo-redesign" as Route },
            { label: "3D Logo Design", href: "/logo-design-services/3d-logo-design" as Route },
            { label: "Mascot Logo Design", href: "/logo-design-services/mascot-logo-design" as Route },
            { label: "Minimalist Logo Design", href: "/logo-design-services/minimalist-logo-design" as Route },
            { label: "Illustrative Logo Design", href: "/logo-design-services/illustrative-logo-design" as Route },
        ],
    },
];

/** Flat list of every service URL — used by the Service/OfferCatalog JSON-LD. */
export const allServiceLinks: NavLink[] = serviceNav.flatMap((g) => [
    ...(g.href ? [{ label: g.label, href: g.href }] : []),
    ...g.items,
]);
