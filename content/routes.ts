/**
 * The URL map — single source of truth.
 *
 * Drives `app/(site)/[slug]`, `app/sitemap.ts`, and `docs/ROUTES.md`. The 36
 * service paths are carried over verbatim from
 * `clduk/config/services_content/_registry.php`; the rest are read off the live
 * Laravel routes. All of them are indexed and externally linked.
 *
 * NEVER edit an existing `path`. To change one, add the new path and register a
 * 308 from the old one in `next.config.ts`. The `custom-wordpress-developement`
 * misspelling is load-bearing — it is the live production URL.
 *
 * `indexable` gates two things at once: whether the page emits
 * `robots: index` and whether it appears in the sitemap. All 46 are `true` —
 * the rebuild is content-complete.
 */

/**
 * `landing` is the odd one out: those routes render under `app/(landing)/`, so
 * they carry no site navigation and no site footer. They are listed here anyway
 * because this file drives `sitemap.ts` and `docs/ROUTES.md`, and a URL missing
 * from the sitemap is a URL nobody notices has gone.
 */
export type RouteGroup = "core" | "service" | "legal" | "landing";

export interface RouteEntry {
    /** URL path, leading slash, no trailing slash. */
    path: string;
    /**
     * The `<title>`, and the `WebPage` name in the JSON-LD.
     *
     * For a `service` route this MUST equal the live page's `<title>`, which is
     * also transcribed into `meta.title` in the matching `content/services/*.ts`
     * — the title-drift check in `content/services/index.ts` fails the build if
     * the two disagree. Four live titles name the wrong page and are corrected
     * here on purpose; see `TITLE_CORRECTIONS` there and the "Titles corrected"
     * table in docs/CONTENT-PARITY.md.
     *
     * This is NOT the visible breadcrumb label. Several live titles are
     * mechanically title-cased slugs ("Ui Ux Design"), so the crumb reads from
     * `hero.breadcrumb` instead.
     */
    title: string;
    group: RouteGroup;
    /** false => noindex + excluded from sitemap. */
    indexable: boolean;
    /** Sitemap priority. Only read when indexable. */
    priority?: number;
}

export const routes: RouteEntry[] = [
    {
        path: "/",
        title: "Digital Marketing & Web Design Agency",
        group: "core",
        indexable: true,
        priority: 1,
    },

    /* ---- core ------------------------------------------------------------ */
    {
        path: "/about-us",
        title: "About Us",
        group: "core",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/contact-us",
        title: "Contact Us",
        group: "core",
        indexable: true,
        priority: 0.8,
    },

    /* ---- landing pages ---------------------------------------------------- */
    /* Paths are recorded without a trailing slash, matching `trailingSlash:
       false` and the live site's own internal links. `/creative-logo-design/`
       and every other slash form 308s here. Settled — see
       docs/SEO-PLAYBOOK.md, "RESOLVED — trailing slash". */
    {
        path: "/creative-logo-design",
        title: "Custom Logo Design Starting £35",
        group: "landing",
        indexable: true,
        priority: 0.9,
    },
    /* Live URL is `/logo-design-offer/`. The live page is a client-rendered
       React bundle that serves an empty <div id="root"> to crawlers, so it has
       never had indexable content — see docs/CONTENT-PARITY.md. */
    {
        path: "/logo-design-offer",
        title: "Professional Bespoke Logo Design Services",
        group: "landing",
        indexable: true,
        priority: 0.9,
    },
    /* Live URL is `/lp/`. Client-rendered like `/logo-design-offer/`, and worse:
       its shell loads that page's bundle too, so the HTML a crawler is served
       carries `/logo-design-offer`'s <title> and description verbatim. The
       title below is the one react-helmet injects at runtime, which is what the
       page is actually about — see docs/CONTENT-PARITY.md. */
    {
        path: "/lp",
        title: "Web Design Service Starts from £199",
        group: "landing",
        indexable: true,
        priority: 0.9,
    },
    /* Live URL is `/seo-services/index.php`; `/seo-services/` serves the same
       page and `/seo-services` 301s to it. Next cannot serve a `.php` path from
       a static route folder, so the clean path is canonical here and BOTH live
       forms 308 to it — the `index.php` redirect is declared in
       `next.config.ts`, the slash form is handled by `trailingSlash: false`.

       The live page is an un-rebranded third-party template: it names another
       agency ten times, prices in US dollars, and canonicals to the homepage.
       See content/landing/seo-services.ts and docs/CONTENT-PARITY.md. */
    {
        path: "/seo-services",
        title: "SEO Services",
        group: "landing",
        indexable: true,
        priority: 0.9,
    },
    /* The two brief forms the sales team sends to clients. Live URLs are
       `/website-brief/index.php` and `/logo-brief/index.php`; like
       `/seo-services`, Next cannot serve a `.php` path from a static route
       folder, so the clean path is canonical and both `index.php` forms 308 to
       it (declared in next.config.ts). The slash forms need no entry —
       `trailingSlash: false` handles them.

       Indexed despite being intake forms: Search Console shows both ranking.
       Priority 0.7 rather than the other landing pages' 0.9 — they rank, but
       they are not where the ad spend points. */
    {
        path: "/website-brief",
        title: "Website Brief Form",
        group: "landing",
        indexable: true,
        priority: 0.7,
    },
    {
        path: "/logo-brief",
        title: "Logo Design Brief Form",
        group: "landing",
        indexable: true,
        priority: 0.7,
    },

    /* ---- service hubs & children ----------------------------------------- */
    {
        path: "/web-designing",
        title: "Web Designing",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/web-development",
        title: "Web Development",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/website-maintenance",
        title: "Website Maintenance",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/digital-marketing",
        title: "Digital Marketing",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/branding",
        title: "Branding",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/app-development",
        title: "App Development",
        group: "service",
        indexable: true,
        priority: 0.8,
    },

    // Web design children
    {
        path: "/custom-wordpress-developement",
        title: "Custom Wordpress Developement",
        group: "service",
        indexable: true,
    },
    {
        path: "/website-redesign-services",
        title: "Website Redesign",
        group: "service",
        indexable: true,
    },
    {
        path: "/responsive-website-design-and-development",
        title: "Responsive Website Design And Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/ui-ux-design",
        title: "Ui Ux Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/shopify-web-design",
        title: "Shopify Web Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/magento-design-and-development-service",
        title: "Magento Design And Development Service",
        group: "service",
        indexable: true,
    },
    {
        path: "/corporate-blog-design-services",
        title: "Corporate Blog Design Services",
        group: "service",
        indexable: true,
    },
    {
        path: "/content-management-systems",
        title: "Content Management Systems",
        group: "service",
        indexable: true,
    },
    {
        path: "/ui-and-ux-analysis",
        title: "Ui Ux Analysis",
        group: "service",
        indexable: true,
    },

    // Digital marketing children
    {
        path: "/marketing-and-sales-automation",
        title: "Marketing & Sales Automation",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo",
        title: "SEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/aeo",
        title: "AEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-audit-service",
        title: "SEO Audit Services",
        group: "service",
        indexable: true,
    },
    {
        path: "/social-media-management",
        title: "Social Media Management",
        group: "service",
        indexable: true,
    },
    {
        path: "/ppc",
        title: "PPC",
        group: "service",
        indexable: true,
    },
    {
        path: "/email-marketing-management-services",
        title: "Email Marketing Management Services",
        group: "service",
        indexable: true,
    },
    {
        path: "/amazon-seo-and-product-optimisation-service",
        title: "Amazon SEO & Product Optimisation Service",
        group: "service",
        indexable: true,
    },
    {
        path: "/content-marketing-services",
        title: "Content Marketing Services",
        group: "service",
        indexable: true,
    },
    {
        path: "/influencer-marketing",
        title: "Influencer Marketing",
        group: "service",
        indexable: true,
    },
    {
        path: "/conversion-rate-optimisation",
        title: "Conversion Rate Optimisation",
        group: "service",
        indexable: true,
    },
    {
        path: "/google-analytics",
        title: "Google Analytics",
        group: "service",
        indexable: true,
    },

    // Web development children
    {
        path: "/ecommerce-website-development",
        title: "Ecommerce Website Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/wordpress-development",
        title: "WordPress Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/amp-web-design",
        title: "AMP Web Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/page-speed-optimisation",
        title: "Page Speed Optimisation",
        group: "service",
        indexable: true,
    },
    {
        path: "/shopify-developers",
        title: "Shopify Developers",
        group: "service",
        indexable: true,
    },
    {
        path: "/magento-development",
        title: "Magento Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/laravel-developers",
        title: "Laravel Developers",
        group: "service",
        indexable: true,
    },
    {
        path: "/contentful-developers",
        title: "Contentful Developers",
        group: "service",
        indexable: true,
    },
    {
        path: "/custom-3d-product-configurators",
        title: "Custom 3D Product Configurators",
        group: "service",
        indexable: true,
    },

    /* ---- legal ----------------------------------------------------------- */
    {
        path: "/privacy-policy",
        title: "Privacy Policy",
        group: "legal",
        indexable: true,
        priority: 0.3,
    },
    {
        path: "/terms-and-conditions",
        title: "Terms And Conditions",
        group: "legal",
        indexable: true,
        priority: 0.3,
    },
    {
        path: "/refund-policy",
        title: "Refund Policy",
        group: "legal",
        indexable: true,
        priority: 0.3,
    },
    {
        path: "/cookies-policy",
        title: "Cookies",
        group: "legal",
        indexable: true,
        priority: 0.3,
    },
];


export const routeByPath = new Map(routes.map((r) => [r.path, r]));

/** Slugs for `generateStaticParams` on `app/(site)/[slug]`. */
export const serviceSlugs = routes
    .filter((r) => r.group === "service")
    .map((r) => r.path.replace(/^\//, ""));
