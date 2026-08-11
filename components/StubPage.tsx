import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";

import { routeByPath } from "@/content/routes";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { site } from "@/content/site";
import JsonLd from "@/components/JsonLd";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Placeholder body for a route that exists but has no content yet.
 *
 * **Currently unused** — all 49 routes are content-complete. It is kept for the
 * sections still deferred (blog, portfolio, case studies: see
 * `docs/PROGRESS.md`), because the pattern it encodes is the one to reuse:
 * declare the route so `typedRoutes` makes a bad link a compile error, render
 * something honest, and keep it `noindex` and out of the sitemap until the real
 * content lands. Thin pages that get indexed do real damage; noindex stubs are
 * inert.
 *
 * Whatever adopts this must flip `indexable` in content/routes.ts in the same
 * commit that lands its content.
 */

function resolve(path: string) {
  const route = routeByPath.get(path);
  if (!route) throw new Error(`Unknown route "${path}" — add it to content/routes.ts`);
  return route;
}

export function stubMetadata(path: string): Metadata {
  const route = resolve(path);
  return buildMetadata({
    title: route.title,
    description: site.description,
    path: route.path,
    index: route.indexable,
  });
}

export default function StubPage({ path }: { path: string }) {
  const route = resolve(path);

  return (
    <>
      <JsonLd
        data={pageGraph(route.path, route.title, site.description, [
          { name: "Home", path: "/" },
          { name: route.title, path: route.path },
        ])}
      />

      <section className="relative overflow-hidden bg-ink-950 py-section">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" aria-hidden="true" />

        <div className="relative container-site text-center">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex justify-center gap-2 text-xs text-white/50">
              <li>
                <Link href={"/" as Route} className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">
                {route.title}
              </li>
            </ol>
          </nav>

          <h1 className="text-h1 text-white">{route.title}</h1>

          <p className="mx-auto mt-6 max-w-[52ch] text-lead text-white/65">
            This page is being rebuilt. In the meantime, tell us what you need and a senior
            strategist will come back to you within one working day.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <LeadButton variant="primary" size="lg">
              Request a proposal
            </LeadButton>
            <Link
              href={"/" as Route}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-9 py-[1.05rem] font-display text-sm font-bold tracking-[0.06em] text-white uppercase shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)] transition-colors hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
