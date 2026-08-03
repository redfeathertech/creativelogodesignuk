import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { routeByPath, serviceSlugs } from "@/content/routes";
import { getServiceContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import ServicePage from "@/components/services/ServicePage";

/**
 * Single dynamic route covering all 36 "service" group entries in
 * content/routes.ts (web-designing, seo, branding, ppc, ...).
 *
 * Replaces one `app/(site)/<slug>/page.tsx` folder per service with one file
 * driven by content/services/index.ts. `about-us`, `contact-us` and the four
 * legal pages keep their own folders — different route groups, different
 * components; a static segment wins over this dynamic one either way.
 *
 * `dynamicParams = false` makes an unknown slug 404 immediately rather than
 * fall through to a server render attempt — the site is fully static.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

function resolveServiceRoute(slug: string) {
  const route = routeByPath.get(`/${slug}`);
  if (!route || route.group !== "service") return undefined;
  return route;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = resolveServiceRoute(slug);
  if (!route) notFound();

  const content = getServiceContent(route.path);

  return buildMetadata({
    title: route.title,
    description: content?.meta.description || site.description,
    path: route.path,
    index: route.indexable,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = resolveServiceRoute(slug);
  if (!route) notFound();

  return <ServicePage route={route} />;
}
