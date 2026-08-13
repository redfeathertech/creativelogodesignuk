/**
 * The URL map — single source of truth.
 *
 * Drives `app/(site)/[slug]`, `app/(site)/[slug]/[child]`, `app/sitemap.ts`,
 * the redirect table in `next.config.ts`, and `docs/ROUTES.md`.
 *
 * ## The 2026-08 pillar restructure
 *
 * The 36 service URLs were flat (`/ppc`, `/shopify-developers`, …), carried
 * verbatim from `clduk/config/services_content/_registry.php`. In August 2026
 * they were restructured into the pillar/sub-service tree specified by the SEO
 * plan (8 pillars, sub-services nested one level under each). 34 of the 36
 * moved; every old URL 301s to its new home via `legacyServicePaths` below.
 * One did not move:
 *
 * - `/ui-and-ux-analysis` — not in the SEO plan at all. It ranks, so it keeps
 *   its URL and its internal links until the plan gives it a slot.
 *
 * `/seo` was retired in the same spirit: the plan's SEO URL table has no slot
 * for it (its subject is the `/seo-services` pillar), so it 301s there and its
 * content became the base for the eight new SEO sub-service placeholders.
 *
 * NEVER edit an existing `path`. To change one, add the new path here, map the
 * old one in `legacyServicePaths`, and the 301 is emitted by `next.config.ts`
 * automatically. Old URLs must keep redirecting forever — they are indexed and
 * externally linked. (The `/custom-wordpress-developement` misspelling lives on
 * as a redirect source for exactly that reason.)
 *
 * `indexable` gates two things at once: whether the page emits
 * `robots: index` and whether it appears in the sitemap. All 85 are `true` —
 * the rebuild is content-complete.
 */

/**
 * `landing` is the odd one out: those routes render under `app/(landing)/`, so
 * they carry no site navigation and no site footer. They are listed here anyway
 * because this file drives `sitemap.ts` and `docs/ROUTES.md`, and a URL missing
 * from the sitemap is a URL nobody notices has gone.
 */
import legacyRedirects from "./legacy-redirects.json";

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
     * the two disagree. The 2026-08 URL moves deliberately did NOT touch these:
     * a moved page keeps its ranking `<title>` exactly. Four live titles name
     * the wrong page and are corrected here on purpose; see `TITLE_CORRECTIONS`
     * there and the "Titles corrected" table in docs/CONTENT-PARITY.md.
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
       forms redirect to it — the `index.php` 301 is declared in
       `next.config.ts`, the slash form is handled by `trailingSlash: false`.

       Since the 2026-08 restructure this URL is also the SEO pillar in the
       services mega-menu, and the SEO sub-services nest under it
       (`/seo-services/seo-audit`, …). The nested routes render in `app/(site)/`
       with full chrome; this page itself still renders in `app/(landing)/`
       until it is rebuilt as a real pillar page.

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
       folder, so the clean path is canonical and both `index.php` forms 301 to
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

    /* ---- service pillars -------------------------------------------------- */
    /* One entry per pillar page. The SEO pillar is `/seo-services` (a `landing`
       route, above); the other seven render here.

       `/automation-services` and `/logo-design-services` were the last two to be
       built (13 Aug 2026) and complete the SEO plan's eight. Both are new URLs
       with no live counterpart, so both ship on placeholder copy cloned from
       the nearest real page — automation from the marketing-and-sales-automation
       module, logo design from branding. See content/services/*-placeholders.ts.

       `/logo-design-services` carries one extra job: the `/creative-logo-design`
       landing page used to be the Logo Design menu group's only link, and the
       SEO plan gives that menu slot to `/logo-design-services/custom-logo-design`.
       Rather than orphan an indexable page, the pillar's hero tiles link it from
       the page body — see the `creative-logo-design` tile slug in
       content/services/logo-design-placeholders.ts. */
    {
        path: "/web-design-services",
        title: "Web Design Services",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/web-development-services",
        title: "Web Development Services",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/digital-marketing-services",
        title: "Digital Marketing Services",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/branding-services",
        title: "Branding Services",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/app-development-services",
        title: "App Development Services",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/automation-services",
        title: "Automation Services",
        group: "service",
        indexable: true,
        priority: 0.8,
    },
    {
        path: "/logo-design-services",
        title: "Logo Design Services",
        group: "service",
        indexable: true,
        priority: 0.8,
    },

    /* SEO sub-services (nest under the /seo-services landing route).
       The full set from the SEO plan's URL table. Eight of the eleven have no
       live counterpart and ship on placeholder copy cloned from the old `/seo`
       page — see content/services/seo-placeholders.ts. */
    {
        path: "/seo-services/seo-audit",
        title: "SEO Audit Services",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/technical-seo",
        title: "Technical SEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/on-page-seo",
        title: "On-Page SEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/link-building",
        title: "Off-Page SEO & Link Building",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/local-seo",
        title: "Local SEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/ecommerce-seo",
        title: "E-commerce SEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/shopify-seo",
        title: "Shopify SEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/wordpress-seo",
        title: "WordPress SEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/amazon-seo",
        title: "Amazon SEO & Product Optimisation Service",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/aeo",
        title: "AEO",
        group: "service",
        indexable: true,
    },
    {
        path: "/seo-services/keyword-research",
        title: "Keyword Research",
        group: "service",
        indexable: true,
    },

    // Web design sub-services
    {
        path: "/web-design-services/custom-wordpress",
        title: "Custom WordPress Website Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-design-services/website-redesign",
        title: "Website Redesign",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-design-services/responsive-design",
        title: "Responsive Website Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-design-services/ui-ux-design",
        title: "UI & UX Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-design-services/shopify",
        title: "Shopify Web Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-design-services/magento",
        title: "Magento Web Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-design-services/corporate-blog-design",
        title: "Corporate Blog Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-design-services/cms",
        title: "CMS Website Design",
        group: "service",
        indexable: true,
    },
    // {
    //     path: "/ui-and-ux-analysis",
    //     title: "Ui Ux Analysis",
    //     group: "service",
    //     indexable: true,
    // },

    // Web development sub-services
    {
        path: "/web-development-services/ecommerce",
        title: "E-commerce Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/wordpress",
        title: "WordPress Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/shopify",
        title: "Shopify Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/magento",
        title: "Magento Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/laravel",
        title: "Laravel Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/contentful",
        title: "Contentful Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/amp",
        title: "AMP Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/page-speed-optimisation",
        title: "Page Speed Optimisation",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/3d-configurators",
        title: "Custom 3D Configurators",
        group: "service",
        indexable: true,
    },
    {
        path: "/web-development-services/website-maintenance",
        title: "Website Maintenance",
        group: "service",
        indexable: true,
    },

    /* App development sub-services. None of the six exists on the live Laravel
       site — they are new URLs from the SEO plan's App Development table, and
       ship on placeholder copy cloned from the pillar. See
       content/services/app-placeholders.ts. */
    {
        path: "/app-development-services/android",
        title: "Android App Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/app-development-services/ios",
        title: "iOS App Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/app-development-services/cross-platform",
        title: "Cross-Platform App Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/app-development-services/flutter",
        title: "Flutter App Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/app-development-services/react-native",
        title: "React Native App Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/app-development-services/app-maintenance",
        title: "App Maintenance & Support",
        group: "service",
        indexable: true,
    },

    /* Branding sub-services. Like the app-development set, none exists on the
       live Laravel site — new URLs from the SEO plan's Branding table, on
       placeholder copy cloned from the pillar. See
       content/services/branding-placeholders.ts. */
    {
        path: "/branding-services/brand-identity",
        title: "Brand Identity Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/branding-services/brand-strategy",
        title: "Brand Strategy",
        group: "service",
        indexable: true,
    },
    {
        path: "/branding-services/rebranding",
        title: "Rebranding Services",
        group: "service",
        indexable: true,
    },
    {
        path: "/branding-services/brand-guidelines",
        title: "Brand Guidelines",
        group: "service",
        indexable: true,
    },
    {
        path: "/branding-services/packaging-design",
        title: "Packaging Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/branding-services/stationery-design",
        title: "Stationery Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/branding-services/business-card-design",
        title: "Business Card Design",
        group: "service",
        indexable: true,
    },

    /* Digital marketing sub-services, in the SEO plan's table order.
       Unlike the app-development and branding groups, the seven that already
       existed needed NO URL change — the 2026-08 restructure had already put
       them on the plan's paths. Five took the plan's page name as their title;
       `cro` and `influencer-marketing` already matched. Only `meta-ads`,
       `linkedin-ads` and `tiktok-ads` are new URLs, and those three ship on
       placeholder copy — see content/services/digital-marketing-placeholders.ts. */
    {
        path: "/digital-marketing-services/ppc",
        title: "PPC / Google Ads",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/meta-ads",
        title: "Meta Ads",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/social-media-marketing",
        title: "Social Media Marketing",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/email-marketing",
        title: "Email Marketing",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/content-marketing",
        title: "Content Marketing",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/cro",
        title: "Conversion Rate Optimisation",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/influencer-marketing",
        title: "Influencer Marketing",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/google-analytics-4",
        title: "Google Analytics 4 & Tracking",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/linkedin-ads",
        title: "LinkedIn Ads",
        group: "service",
        indexable: true,
    },
    {
        path: "/digital-marketing-services/tiktok-ads",
        title: "TikTok Ads",
        group: "service",
        indexable: true,
    },

    /* Automation sub-services, in the SEO plan's table order.
       `marketing-sales-automation` is the one real page (ported from Laravel and
       moved here by the 2026-08 restructure); the other five are new URLs on
       placeholder copy. */
    {
        path: "/automation-services/marketing-sales-automation",
        title: "Marketing & Sales Automation",
        group: "service",
        indexable: true,
    },
    {
        path: "/automation-services/crm-automation",
        title: "CRM Automation",
        group: "service",
        indexable: true,
    },
    {
        path: "/automation-services/workflow-automation",
        title: "Workflow Automation",
        group: "service",
        indexable: true,
    },
    {
        path: "/automation-services/email-automation",
        title: "Email Automation",
        group: "service",
        indexable: true,
    },
    {
        path: "/automation-services/chatbot-development",
        title: "Chatbot Development",
        group: "service",
        indexable: true,
    },
    {
        path: "/automation-services/ai-automation",
        title: "AI Automation",
        group: "service",
        indexable: true,
    },

    /* Logo design sub-services, in the SEO plan's table order. All seven are new
       URLs with no live counterpart. */
    {
        path: "/logo-design-services/custom-logo-design",
        title: "Custom Logo Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/logo-design-services/business-logo-design",
        title: "Business Logo Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/logo-design-services/logo-redesign",
        title: "Logo Redesign",
        group: "service",
        indexable: true,
    },
    {
        path: "/logo-design-services/3d-logo-design",
        title: "3D Logo Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/logo-design-services/mascot-logo-design",
        title: "Mascot Logo Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/logo-design-services/minimalist-logo-design",
        title: "Minimalist Logo Design",
        group: "service",
        indexable: true,
    },
    {
        path: "/logo-design-services/illustrative-logo-design",
        title: "Illustrative Logo Design",
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

/**
 * Old URL -> current URL, one entry per move. The single source of truth for
 * the 308 table in `next.config.ts`, and for resolving legacy slugs that
 * survive in content (`hero.tiles[].slug` in every service module).
 *
 * The table itself lives in `content/legacy-redirects.json` — JSON because
 * `next.config.ts` cannot import a project TS module (the config is transpiled
 * and evaluated outside the project tree, so relative TS imports do not
 * resolve), and the one thing worse than a JSON side-file is two divergent
 * copies of a redirect table.
 *
 * Entries are append-only: a URL that has ever been live keeps redirecting
 * forever — including `/content-management-system` (singular), which never had
 * a page and 500'd on Laravel. If a destination moves again, update the VALUE,
 * for every key that points at it: each hop must point at the final URL
 * (Google follows chains, but each hop taxes crawl and dilutes the signal).
 */
export const legacyServicePaths: Record<string, string> = legacyRedirects;

/* A legacy source that is also a live path would make next.config.ts redirect
   a page out from under itself. Fail at module load, which fails the build. */
for (const [from, to] of Object.entries(legacyServicePaths)) {
    if (routeByPath.has(from)) {
        throw new Error(
            `legacyServicePaths: "${from}" is still a live route in routes.ts.`,
        );
    }
    if (!routeByPath.has(to)) {
        throw new Error(
            `legacyServicePaths: "${from}" points at "${to}", which is not a route.`,
        );
    }
}

/**
 * Resolve a possibly-legacy path to its current URL. Content that predates the
 * 2026-08 restructure still names old slugs (`hero.tiles[].slug`); linking
 * through this keeps every internal link pointing at the final URL instead of
 * bouncing off a 308.
 */
export function currentPath(path: string): string {
    return legacyServicePaths[path] ?? path;
}

const serviceSegments = routes
    .filter((r) => r.group === "service")
    .map((r) => r.path.replace(/^\//, "").split("/"));

/** Params for `app/(site)/[slug]` — the one-segment service pages. */
export const serviceParams = serviceSegments
    .filter((segments) => segments.length === 1)
    .map(([slug]) => ({ slug }));

/** Params for `app/(site)/[slug]/[child]` — the nested sub-service pages. */
export const subServiceParams = serviceSegments
    .filter((segments) => segments.length === 2)
    .map(([slug, child]) => ({ slug, child }));
