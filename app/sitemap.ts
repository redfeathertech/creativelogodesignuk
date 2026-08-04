import type { MetadataRoute } from "next";
import { routes } from "@/content/routes";
import { SITE_URL } from "@/content/site";

/**
 * Only indexable routes are listed. All 49 now are — the rebuild is
 * content-complete — so this currently emits every route in content/routes.ts.
 *
 * The filter stays because it is the mechanism, not a leftover: a new route is
 * added `indexable: false` and flips to `true` in the commit that gives it real
 * content. Submitting placeholder pages teaches Google the site is thin.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes
    .filter((route) => route.indexable)
    .map((route) => ({
      url: route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route.priority ?? 0.7,
    }));
}
