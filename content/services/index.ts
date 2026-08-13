import { routes } from "../routes";

import type { ServiceContent, ServiceContentOverrides } from "./types";
import { serviceDefaults } from "./defaults";

import { aeoOverrides } from "./aeo";
import { amazonSeoOverrides } from "./amazon-seo";
import { ampWebDesignOverrides } from "./amp-web-design";
import { appDevelopmentOverrides } from "./app-development";
import {
    androidAppDevelopmentOverrides,
    appMaintenanceOverrides,
    crossPlatformAppDevelopmentOverrides,
    flutterAppDevelopmentOverrides,
    iosAppDevelopmentOverrides,
    reactNativeAppDevelopmentOverrides,
} from "./app-placeholders";
import { brandingOverrides } from "./branding";
import {
    brandGuidelinesOverrides,
    brandIdentityDesignOverrides,
    brandStrategyOverrides,
    businessCardDesignOverrides,
    packagingDesignOverrides,
    rebrandingOverrides,
    stationeryDesignOverrides,
} from "./branding-placeholders";
import { contentManagementSystemsOverrides } from "./content-management-systems";
import { contentMarketingOverrides } from "./content-marketing";
import { contentfulDevelopersOverrides } from "./contentful-developers";
import { conversionRateOverrides } from "./conversion-rate";
import { corporateBlogDesignOverrides } from "./corporate-blog-design-services";
import { custom3dProductConfiguratorsOverrides } from "./custom-3d-configurators";
import { customWordpressDevelopementOverrides } from "./custom-wordpress-developement";
import { digitalMarketingOverrides } from "./digital-marketing";
import {
    linkedinAdsOverrides,
    metaAdsOverrides,
    tiktokAdsOverrides,
} from "./digital-marketing-placeholders";
import { ecommerceDevelopmentOverrides } from "./ecommerce-development";
import { emailMarketingOverrides } from "./email-marketing";
import { googleAnalyticsOverrides } from "./google-analytics";
import { influencerMarketingOverrides } from "./influencer-marketing";
import { laravelDevelopersOverrides } from "./laravel-developers";
import { magentoDesignAndDevelopmentOverrides } from "./magento-design-and-development-service";
import { magentoDevelopmentOverrides } from "./magento-development";
import {
    aiAutomationOverrides,
    automationServicesOverrides,
    chatbotDevelopmentOverrides,
    crmAutomationOverrides,
    emailAutomationOverrides,
    workflowAutomationOverrides,
} from "./automation-placeholders";
import {
    businessLogoDesignOverrides,
    customLogoDesignOverrides,
    illustrativeLogoDesignOverrides,
    logoDesignServicesOverrides,
    logoRedesignOverrides,
    mascotLogoDesignOverrides,
    minimalistLogoDesignOverrides,
    threeDLogoDesignOverrides,
} from "./logo-design-placeholders";
import { marketingAndSalesAutomationOverrides } from "./marketing-and-sales-automation";
import { pageSpeedOptimisationOverrides } from "./page-speed-optimisation";
import { ppcOverrides } from "./ppc";
import { responsiveWebsiteDesignOverrides } from "./responsive-website-design-and-development";
import { seoAuditServiceOverrides } from "./seo-audit-service";
import {
    ecommerceSeoOverrides,
    keywordResearchOverrides,
    linkBuildingOverrides,
    localSeoOverrides,
    onPageSeoOverrides,
    shopifySeoOverrides,
    technicalSeoOverrides,
    wordpressSeoOverrides,
} from "./seo-placeholders";
import { shopifyDevelopersOverrides } from "./shopify-developers";
import { shopifyWebDesignOverrides } from "./shopify-web-design";
import { socialMediaManagementOverrides } from "./social-media-management";
import { uiAndUxAnalysisOverrides } from "./ui-and-ux-analysis";
import { uiUxDesignOverrides } from "./ui-ux-design";
import { webDesigningOverrides } from "./web-designing";
import { webDevelopmentOverrides } from "./web-development";
import { websiteMaintenanceOverrides } from "./website-maintenance";
import { websiteRedesignServicesOverrides } from "./website-redesign-services";
import { wordpressDevelopmentOverrides } from "./wordpress-development";

export type { ServiceContent } from "./types";

/**
 * One-level-deep-per-section merge, matching the Laravel controller's
 * `array_replace($defaults[$section], $override[$section])`.
 *
 * Deliberately NOT a recursive deep merge: a list value (steps, items, stats,
 * tiles, slides, workImages...) must come through a section override
 * complete, or not at all — never merged element-by-element with the
 * defaults' list.
 */
function mergeSection<T extends object>(
    base: T,
    override: Partial<T> | undefined,
): T {
    return override ? { ...base, ...override } : base;
}

function mergeContent(overrides: ServiceContentOverrides): ServiceContent {
    return {
        meta: mergeSection(serviceDefaults.meta, overrides.meta),
        hero: mergeSection(serviceDefaults.hero, overrides.hero),
        howItWorks: mergeSection(
            serviceDefaults.howItWorks,
            overrides.howItWorks,
        ),
        solutions: mergeSection(serviceDefaults.solutions, overrides.solutions),
        marquee: mergeSection(serviceDefaults.marquee, overrides.marquee),
        benefits: mergeSection(serviceDefaults.benefits, overrides.benefits),
        advantages: mergeSection(
            serviceDefaults.advantages,
            overrides.advantages,
        ),
        whyChoose: mergeSection(serviceDefaults.whyChoose, overrides.whyChoose),
        about: mergeSection(serviceDefaults.about, overrides.about),
        clients: mergeSection(serviceDefaults.clients, overrides.clients),
        process: mergeSection(serviceDefaults.process, overrides.process),
        capabilities: mergeSection(
            serviceDefaults.capabilities,
            overrides.capabilities,
        ),
        cta: mergeSection(serviceDefaults.cta, overrides.cta),
    };
}

/**
 * Route path -> section overrides, for every "service" group route in
 * content/routes.ts.
 *
 * Seventeen came from `clduk/config/services_content/*.php`; the other
 * nineteen were transcribed from the per-service Blade views the live site
 * still renders (`clduk/resources/views/user/<service>/`), checked against the
 * captured HTML in `clduk/_migration_backup/baseline/`. File names follow the
 * Laravel registry keys — the 2026-08 pillar restructure moved the URLs
 * (`legacyServicePaths` in content/routes.ts) but deliberately did NOT rename
 * these modules: `scripts/verify-content-parity.py` keys its baseline check on
 * the module filename, and the content inside is byte-identical either way.
 *
 * Every service route must have an entry. Without one `ServicePage` has nothing
 * to render, so `npm run build` fails on the completeness assertion below
 * rather than shipping a thin page — see components/services/ServicePage.tsx.
 */
const overridesByPath = new Map<string, ServiceContentOverrides>([
    // pillars + the one flat URL the restructure left in place
    ["/web-design-services", webDesigningOverrides],
    ["/web-development-services", webDevelopmentOverrides],
    ["/digital-marketing-services", digitalMarketingOverrides],
    ["/branding-services", brandingOverrides],
    ["/app-development-services", appDevelopmentOverrides],
    ["/automation-services", automationServicesOverrides], // placeholder
    ["/logo-design-services", logoDesignServicesOverrides], // placeholder
    ["/ui-and-ux-analysis", uiAndUxAnalysisOverrides],

    // SEO sub-services. The eight on placeholder copy are marked; see
    // content/services/seo-placeholders.ts.
    ["/seo-services/seo-audit", seoAuditServiceOverrides],
    ["/seo-services/technical-seo", technicalSeoOverrides], // placeholder
    ["/seo-services/on-page-seo", onPageSeoOverrides], // placeholder
    ["/seo-services/link-building", linkBuildingOverrides], // placeholder
    ["/seo-services/local-seo", localSeoOverrides], // placeholder
    ["/seo-services/ecommerce-seo", ecommerceSeoOverrides], // placeholder
    ["/seo-services/shopify-seo", shopifySeoOverrides], // placeholder
    ["/seo-services/wordpress-seo", wordpressSeoOverrides], // placeholder
    ["/seo-services/aeo", aeoOverrides],
    ["/seo-services/amazon-seo", amazonSeoOverrides],
    ["/seo-services/keyword-research", keywordResearchOverrides], // placeholder

    // web design sub-services
    [
        "/web-design-services/custom-wordpress",
        customWordpressDevelopementOverrides,
    ],
    ["/web-design-services/website-redesign", websiteRedesignServicesOverrides],
    [
        "/web-design-services/responsive-design",
        responsiveWebsiteDesignOverrides,
    ],
    ["/web-design-services/ui-ux-design", uiUxDesignOverrides],
    ["/web-design-services/shopify", shopifyWebDesignOverrides],
    ["/web-design-services/magento", magentoDesignAndDevelopmentOverrides],
    [
        "/web-design-services/corporate-blog-design",
        corporateBlogDesignOverrides,
    ],
    ["/web-design-services/cms", contentManagementSystemsOverrides],

    // web development sub-services
    ["/web-development-services/ecommerce", ecommerceDevelopmentOverrides],
    ["/web-development-services/wordpress", wordpressDevelopmentOverrides],
    ["/web-development-services/shopify", shopifyDevelopersOverrides],
    ["/web-development-services/magento", magentoDevelopmentOverrides],
    ["/web-development-services/laravel", laravelDevelopersOverrides],
    ["/web-development-services/contentful", contentfulDevelopersOverrides],
    ["/web-development-services/amp", ampWebDesignOverrides],
    [
        "/web-development-services/page-speed-optimisation",
        pageSpeedOptimisationOverrides,
    ],
    [
        "/web-development-services/3d-configurators",
        custom3dProductConfiguratorsOverrides,
    ],
    [
        "/web-development-services/website-maintenance",
        websiteMaintenanceOverrides,
    ],

    // app development sub-services. All six ship on placeholder copy cloned
    // from the pillar; see content/services/app-placeholders.ts.
    ["/app-development-services/android", androidAppDevelopmentOverrides], // placeholder
    ["/app-development-services/ios", iosAppDevelopmentOverrides], // placeholder
    [
        "/app-development-services/cross-platform",
        crossPlatformAppDevelopmentOverrides, // placeholder
    ],
    ["/app-development-services/flutter", flutterAppDevelopmentOverrides], // placeholder
    [
        "/app-development-services/react-native",
        reactNativeAppDevelopmentOverrides, // placeholder
    ],
    ["/app-development-services/app-maintenance", appMaintenanceOverrides], // placeholder

    // branding sub-services. All seven ship on placeholder copy cloned from
    // the pillar; see content/services/branding-placeholders.ts.
    ["/branding-services/brand-identity", brandIdentityDesignOverrides], // placeholder
    ["/branding-services/brand-strategy", brandStrategyOverrides], // placeholder
    ["/branding-services/rebranding", rebrandingOverrides], // placeholder
    ["/branding-services/brand-guidelines", brandGuidelinesOverrides], // placeholder
    ["/branding-services/packaging-design", packagingDesignOverrides], // placeholder
    ["/branding-services/stationery-design", stationeryDesignOverrides], // placeholder
    [
        "/branding-services/business-card-design",
        businessCardDesignOverrides, // placeholder
    ],

    // digital marketing sub-services. Seven were already on the plan's URLs and
    // only took its page name as their title; the three ad platforms are new
    // and ship on placeholder copy cloned from the pillar.
    ["/digital-marketing-services/ppc", ppcOverrides],
    ["/digital-marketing-services/meta-ads", metaAdsOverrides], // placeholder
    ["/digital-marketing-services/linkedin-ads", linkedinAdsOverrides], // placeholder
    ["/digital-marketing-services/tiktok-ads", tiktokAdsOverrides], // placeholder
    [
        "/digital-marketing-services/social-media-marketing",
        socialMediaManagementOverrides,
    ],
    ["/digital-marketing-services/email-marketing", emailMarketingOverrides],
    [
        "/digital-marketing-services/content-marketing",
        contentMarketingOverrides,
    ],
    ["/digital-marketing-services/cro", conversionRateOverrides],
    [
        "/digital-marketing-services/influencer-marketing",
        influencerMarketingOverrides,
    ],
    [
        "/digital-marketing-services/google-analytics-4",
        googleAnalyticsOverrides,
    ],

    // automation sub-services. Only marketing-sales-automation is a ported
    // page; the other five are new and clone it.
    [
        "/automation-services/marketing-sales-automation",
        marketingAndSalesAutomationOverrides,
    ],
    ["/automation-services/crm-automation", crmAutomationOverrides], // placeholder
    ["/automation-services/workflow-automation", workflowAutomationOverrides], // placeholder
    ["/automation-services/email-automation", emailAutomationOverrides], // placeholder
    [
        "/automation-services/chatbot-development",
        chatbotDevelopmentOverrides, // placeholder
    ],
    ["/automation-services/ai-automation", aiAutomationOverrides], // placeholder

    // logo design sub-services. All seven are new; see
    // content/services/logo-design-placeholders.ts.
    [
        "/logo-design-services/custom-logo-design",
        customLogoDesignOverrides, // placeholder
    ],
    [
        "/logo-design-services/business-logo-design",
        businessLogoDesignOverrides, // placeholder
    ],
    ["/logo-design-services/logo-redesign", logoRedesignOverrides], // placeholder
    ["/logo-design-services/3d-logo-design", threeDLogoDesignOverrides], // placeholder
    [
        "/logo-design-services/mascot-logo-design",
        mascotLogoDesignOverrides, // placeholder
    ],
    [
        "/logo-design-services/minimalist-logo-design",
        minimalistLogoDesignOverrides, // placeholder
    ],
    [
        "/logo-design-services/illustrative-logo-design",
        illustrativeLogoDesignOverrides, // placeholder
    ],
]);

/* Fails the build if a service route has no content, rather than quietly
   prerendering the placeholder. routes.ts imports nothing from here, so this
   direction of the dependency is safe. */
const missing = routes
    .filter((r) => r.group === "service" && !overridesByPath.has(r.path))
    .map((r) => r.path);

if (missing.length) {
    throw new Error(
        `No service content for ${missing.join(", ")} — add a module in content/services/ ` +
            `and map it in overridesByPath, or drop the route from content/routes.ts.`,
    );
}

/** Path ("/seo-services/local-seo") -> fully-merged ServiceContent, for every service route. */
export const serviceContentByPath: Map<string, ServiceContent> = new Map(
    [...overridesByPath.entries()].map(([servicePath, overrides]) => [
        servicePath,
        mergeContent(overrides),
    ]),
);

/**
 * Four live `<title>`s name a different page than the one they sit on — a CMS
 * copy-paste defect, and worse for the URL than correcting it. These are the
 * only service routes allowed to ship a title the live site never served. The
 * value is the live string, kept here so the divergence stays visible and
 * reviewable rather than becoming an untracked drift.
 *
 * See the "Titles corrected" table in docs/CONTENT-PARITY.md.
 */
const TITLE_CORRECTIONS: Record<string, string> = {
    "/automation-services/marketing-sales-automation": "SEO",
    "/digital-marketing-services/social-media-marketing": "seo audit service",
    "/seo-services/seo-audit": "seo audit service",
    "/web-design-services/website-redesign": "Website ReDesign Services",
};

/**
 * `<title>` is the single most load-bearing string on a page that already
 * ranks, and it has two sources here: `routes.ts` renders it, while the
 * transcribed live value lives in each module's `meta.title`. They drifted
 * apart once already, silently, on 14 pages. This makes that a build failure.
 *
 * `-ise`/`-ize` is folded out: British spelling was settled site-wide in titles
 * (docs/CONTENT-PARITY.md), so `Optimization` vs `Optimisation` is not drift.
 */
const spellingFolded = (s: string) =>
    s.replace(/iz(e|ation|ing|ed)\b/gi, (m) => "is" + m.slice(2));

const drifted = routes
    .filter((r) => r.group === "service")
    .map((r) => ({
        route: r,
        live: serviceContentByPath.get(r.path)!.meta.title,
    }))
    .filter(({ route, live }) => TITLE_CORRECTIONS[route.path] !== live)
    .filter(
        ({ route, live }) =>
            spellingFolded(route.title) !== spellingFolded(live),
    );

if (drifted.length) {
    throw new Error(
        `content/routes.ts title does not match the live <title> transcribed in content/services/:\n` +
            drifted
                .map(
                    ({ route, live }) =>
                        `  ${route.path}\n    routes.ts: ${route.title}\n    live:      ${live}`,
                )
                .join("\n") +
            `\nRestore the live title, or add the route to TITLE_CORRECTIONS in this file ` +
            `and to the "Titles corrected" table in docs/CONTENT-PARITY.md.`,
    );
}

export function getServiceContent(path: string): ServiceContent | undefined {
    return serviceContentByPath.get(path);
}
