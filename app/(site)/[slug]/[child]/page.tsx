import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { routeByPath, subServiceParams } from "@/content/routes";
import { getServiceContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import ServicePage from "@/components/services/ServicePage";

/**
 * Dynamic route for every TWO-segment "service" entry in content/routes.ts —
 * the sub-services the 2026-08 restructure nested under their pillar
 * (`/web-design-services/shopify`, `/seo-services/seo-audit`, …).
 *
 * The SEO sub-services nest under `/seo-services`, whose own page is a static
 * `(landing)` route. That is fine: the router matches the exact path
 * `/seo-services` to the landing page and the prerendered two-segment paths to
 * this route — route groups never affect the URL, only the chrome.
 *
 * `dynamicParams = false`: only the pairs from `generateStaticParams` exist;
 * anything else 404s. The site is fully static.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return subServiceParams;
}

function resolveServiceRoute(slug: string, child: string) {
  const route = routeByPath.get(`/${slug}/${child}`);
  if (!route || route.group !== "service") return undefined;
  return route;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; child: string }>;
}): Promise<Metadata> {
  const { slug, child } = await params;
  const route = resolveServiceRoute(slug, child);
  if (!route) notFound();

  const content = getServiceContent(route.path);

  return buildMetadata({
    title: route.title,
    description: content?.meta.description || site.description,
    path: route.path,
    index: route.indexable,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; child: string }>;
}) {
  const { slug, child } = await params;
  const route = resolveServiceRoute(slug, child);
  if (!route) notFound();

  return <ServicePage route={route} />;
}
