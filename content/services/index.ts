import { routes } from "../routes";

import type { ServiceContent, ServiceContentOverrides } from "./types";
import { serviceDefaults } from "./defaults";

import { aeoOverrides } from "./aeo";
import { amazonSeoOverrides } from "./amazon-seo";
import { ampWebDesignOverrides } from "./amp-web-design";
import { appDevelopmentOverrides } from "./app-development";
import { brandingOverrides } from "./branding";
import { contentManagementSystemsOverrides } from "./content-management-systems";
import { contentMarketingOverrides } from "./content-marketing";
import { contentfulDevelopersOverrides } from "./contentful-developers";
import { conversionRateOverrides } from "./conversion-rate";
import { corporateBlogDesignOverrides } from "./corporate-blog-design-services";
import { custom3dProductConfiguratorsOverrides } from "./custom-3d-configurators";
import { customWordpressDevelopementOverrides } from "./custom-wordpress-developement";
import { digitalMarketingOverrides } from "./digital-marketing";
import { ecommerceDevelopmentOverrides } from "./ecommerce-development";
import { emailMarketingOverrides } from "./email-marketing";
import { googleAnalyticsOverrides } from "./google-analytics";
import { influencerMarketingOverrides } from "./influencer-marketing";
import { laravelDevelopersOverrides } from "./laravel-developers";
import { magentoDesignAndDevelopmentOverrides } from "./magento-design-and-development-service";
import { magentoDevelopmentOverrides } from "./magento-development";
import { marketingAndSalesAutomationOverrides } from "./marketing-and-sales-automation";
import { pageSpeedOptimisationOverrides } from "./page-speed-optimisation";
import { ppcOverrides } from "./ppc";
import { responsiveWebsiteDesignOverrides } from "./responsive-website-design-and-development";
import { seoOverrides } from "./seo";
import { seoAuditServiceOverrides } from "./seo-audit-service";
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
function mergeSection<T extends object>(base: T, override: Partial<T> | undefined): T {
  return override ? { ...base, ...override } : base;
}

function mergeContent(overrides: ServiceContentOverrides): ServiceContent {
  return {
    meta: mergeSection(serviceDefaults.meta, overrides.meta),
    hero: mergeSection(serviceDefaults.hero, overrides.hero),
    howItWorks: mergeSection(serviceDefaults.howItWorks, overrides.howItWorks),
    solutions: mergeSection(serviceDefaults.solutions, overrides.solutions),
    marquee: mergeSection(serviceDefaults.marquee, overrides.marquee),
    benefits: mergeSection(serviceDefaults.benefits, overrides.benefits),
    advantages: mergeSection(serviceDefaults.advantages, overrides.advantages),
    whyChoose: mergeSection(serviceDefaults.whyChoose, overrides.whyChoose),
    about: mergeSection(serviceDefaults.about, overrides.about),
    clients: mergeSection(serviceDefaults.clients, overrides.clients),
    process: mergeSection(serviceDefaults.process, overrides.process),
    capabilities: mergeSection(serviceDefaults.capabilities, overrides.capabilities),
    cta: mergeSection(serviceDefaults.cta, overrides.cta),
  };
}

/**
 * Route path -> section overrides, for all 36 "service" group routes in
 * content/routes.ts.
 *
 * Seventeen came from `clduk/config/services_content/*.php`; the other
 * nineteen were transcribed from the per-service Blade views the live site
 * still renders (`clduk/resources/views/user/<service>/`), checked against the
 * captured HTML in `clduk/_migration_backup/baseline/`. File names follow the
 * Laravel registry keys, which is why a few differ from the URL slug
 * (`content-marketing` -> `/content-marketing-services`).
 *
 * Every service route must have an entry. Without one `ServicePage` has nothing
 * to render, so `npm run build` fails on the completeness assertion below
 * rather than shipping a thin page — see components/services/ServicePage.tsx.
 */
const overridesByPath = new Map<string, ServiceContentOverrides>([
  ["/aeo", aeoOverrides],
  ["/amazon-seo-and-product-optimisation-service", amazonSeoOverrides],
  ["/amp-web-design", ampWebDesignOverrides],
  ["/app-development", appDevelopmentOverrides],
  ["/branding", brandingOverrides],
  ["/content-management-systems", contentManagementSystemsOverrides],
  ["/content-marketing-services", contentMarketingOverrides],
  ["/contentful-developers", contentfulDevelopersOverrides],
  ["/conversion-rate-optimisation", conversionRateOverrides],
  ["/corporate-blog-design-services", corporateBlogDesignOverrides],
  ["/custom-3d-product-configurators", custom3dProductConfiguratorsOverrides],
  ["/custom-wordpress-developement", customWordpressDevelopementOverrides],
  ["/digital-marketing", digitalMarketingOverrides],
  ["/ecommerce-website-development", ecommerceDevelopmentOverrides],
  ["/email-marketing-management-services", emailMarketingOverrides],
  ["/google-analytics", googleAnalyticsOverrides],
  ["/influencer-marketing", influencerMarketingOverrides],
  ["/laravel-developers", laravelDevelopersOverrides],
  ["/magento-design-and-development-service", magentoDesignAndDevelopmentOverrides],
  ["/magento-development", magentoDevelopmentOverrides],
  ["/marketing-and-sales-automation", marketingAndSalesAutomationOverrides],
  ["/page-speed-optimisation", pageSpeedOptimisationOverrides],
  ["/ppc", ppcOverrides],
  ["/responsive-website-design-and-development", responsiveWebsiteDesignOverrides],
  ["/seo", seoOverrides],
  ["/seo-audit-service", seoAuditServiceOverrides],
  ["/shopify-developers", shopifyDevelopersOverrides],
  ["/shopify-web-design", shopifyWebDesignOverrides],
  ["/social-media-management", socialMediaManagementOverrides],
  ["/ui-and-ux-analysis", uiAndUxAnalysisOverrides],
  ["/ui-ux-design", uiUxDesignOverrides],
  ["/web-designing", webDesigningOverrides],
  ["/web-development", webDevelopmentOverrides],
  ["/website-maintenance", websiteMaintenanceOverrides],
  ["/website-redesign-services", websiteRedesignServicesOverrides],
  ["/wordpress-development", wordpressDevelopmentOverrides],
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

/** Path ("/seo") -> fully-merged ServiceContent, for every service route. */
export const serviceContentByPath: Map<string, ServiceContent> = new Map(
  [...overridesByPath.entries()].map(([servicePath, overrides]) => [servicePath, mergeContent(overrides)]),
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
  "/marketing-and-sales-automation": "SEO",
  "/social-media-management": "seo audit service",
  "/seo-audit-service": "seo audit service",
  "/website-redesign-services": "Website ReDesign Services",
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
const spellingFolded = (s: string) => s.replace(/iz(e|ation|ing|ed)\b/gi, (m) => "is" + m.slice(2));

const drifted = routes
  .filter((r) => r.group === "service")
  .map((r) => ({ route: r, live: serviceContentByPath.get(r.path)!.meta.title }))
  .filter(({ route, live }) => TITLE_CORRECTIONS[route.path] !== live)
  .filter(({ route, live }) => spellingFolded(route.title) !== spellingFolded(live));

if (drifted.length) {
  throw new Error(
    `content/routes.ts title does not match the live <title> transcribed in content/services/:\n` +
      drifted.map(({ route, live }) => `  ${route.path}\n    routes.ts: ${route.title}\n    live:      ${live}`).join("\n") +
      `\nRestore the live title, or add the route to TITLE_CORRECTIONS in this file ` +
      `and to the "Titles corrected" table in docs/CONTENT-PARITY.md.`,
  );
}

export function getServiceContent(path: string): ServiceContent | undefined {
  return serviceContentByPath.get(path);
}
