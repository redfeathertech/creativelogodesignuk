import { routeByPath, type RouteEntry } from "@/content/routes";
import { getServiceContent } from "@/content/services";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/seo";

import Proposal from "@/components/home/Proposal";
import SeoClients from "@/components/services/seo/Clients";

import Hero from "./seo-inner/Hero";
import Plans from "./seo-inner/Plans";
import Work from "./seo-inner/Work";
import Solutions from "./seo-inner/Solutions";
import Marquee from "./seo-inner/Marquee";
import Benefits from "./seo-inner/Benefits";
import Numbers from "./seo-inner/Numbers";
import WhyChoose from "./seo-inner/WhyChoose";
import About from "./seo-inner/About";
import Process from "./seo-inner/Process";
import Capabilities from "./seo-inner/Capabilities";
import Cta from "./seo-inner/Cta";

/**
 * The eleven SEO inner service pages — `/seo-services/seo-audit`,
 * `/seo-services/technical-seo`, and the nine beside them.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * These eleven used to render through {@link ServicePage}, the same twelve
 * shared sections as the other 25 service pages. They now run their own set
 * from `./seo-inner`, built to the client's approved full-page mock: a deeper
 * indigo canvas, a neon magenta accent and a lilac light surface, declared as
 * page-scoped custom properties under `.seo-inner` in app/globals.css.
 *
 * **This is a layout change, not a content one.** Nothing in `content/` was
 * touched, every section still renders its own page's copy, and
 * `scripts/verify-content-parity.py` passes unchanged. What moved:
 *
 * - The recent-work rail left the "how it works" band and became a light
 *   section of its own, as the mock arranges it.
 * - The `Proposal` band was added between the hero and the plan cards. It is
 *   the homepage's, exactly as `/seo-services` already renders it, and posts
 *   the same `seo-proposal` source so the team's notification email keeps
 *   telling SEO enquiries apart from the homepage's.
 * - The client wall is `components/services/seo/Clients` — the light,
 *   full-colour wall the SEO pillar already uses — rather than the shared dark
 *   one, which would drop a near-black block between two light sections.
 * - The hero's four quick-link tiles became a pill row. Same four labels, same
 *   four hrefs; only the artwork panel is gone, and the mock has no room for
 *   it.
 *
 * Nothing was cut. The `about` slides and the `marquee` line have no band in
 * the mock but are kept — the slides are indexed body copy, and dropping a
 * section is a content change.
 *
 * The wrapping `.seo-inner` div is load-bearing: it is what scopes the palette.
 * A section rendered outside it falls back to unset custom properties and
 * paints transparent.
 */
export default function SeoServicePage({ route }: { route: RouteEntry }) {
    const content = getServiceContent(route.path);

    if (!content) {
        throw new Error(
            `No service content for "${route.path}" — see content/services/index.ts`,
        );
    }

    /* Same trail construction as ServicePage: the crumb reads `hero.breadcrumb`
       rather than `route.title`, because several route titles are mechanically
       title-cased slugs — faithful in the <head>, unreadable on the page. The
       pillar crumb is only added when the pillar page actually exists, since a
       crumb is a link and a link to an unbuilt page is a 404. */
    const pillarPath = route.path.slice(0, route.path.lastIndexOf("/"));
    const pillar = pillarPath ? routeByPath.get(pillarPath) : undefined;
    const pillarCrumb = pillar
        ? [
              {
                  name:
                      getServiceContent(pillar.path)?.hero.breadcrumb ??
                      pillar.title,
                  path: pillar.path,
              },
          ]
        : [];

    const trail = [
        { name: "Home", path: "/" },
        ...pillarCrumb,
        { name: content.hero.breadcrumb, path: route.path },
    ];

    return (
        <div className="seo-inner">
            {/* `route.title` here too, so the JSON-LD name and the <title> can
                never disagree. */}
            <JsonLd
                data={pageGraph(
                    route.path,
                    route.title,
                    content.meta.description,
                    trail,
                )}
            />

            <Hero hero={content.hero} />
            <Proposal source="seo-proposal" />
            <Plans data={content.howItWorks} />
            <Work data={content.howItWorks} />
            <Solutions data={content.solutions} />
            <Marquee data={content.marquee} />
            <Benefits data={content.benefits} />
            <Numbers data={content.advantages} />
            <WhyChoose data={content.whyChoose} />
            <About data={content.about} />
            <SeoClients />
            <Process data={content.process} />
            <Capabilities data={content.capabilities} />
            <Cta data={content.cta} />
        </div>
    );
}
