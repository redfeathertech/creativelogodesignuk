import { routeByPath, type RouteEntry } from "@/content/routes";
import { getServiceContent } from "@/content/services";
import { seoProposalBenefits } from "@/content/home";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/seo";

import Proposal from "@/components/home/Proposal";
import SeoClients from "@/components/services/seo/Clients";

import Hero from "./seo-inner/Hero";
import Plans from "./seo-inner/Plans";
import Work from "./seo-inner/Work";
import Solutions from "./seo-inner/Solutions";
import Benefits from "./seo-inner/Benefits";
import Numbers from "./seo-inner/Numbers";
import WhyChoose from "./seo-inner/WhyChoose";
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
 *   section of its own, as the mock arranges it. Its cards are now the six
 *   real portfolio pieces from `content/seo-work.ts` rather than the untitled
 *   shared service art: the mock captions every card, and captioning the art
 *   would have meant inventing project names. See that file's header.
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
 * Two things WERE cut, on the client's instruction:
 *
 * - the scrolling `marquee` band ("Amplify your brand identity"). The mock has
 *   no band for it, and it was dropped here rather than kept.
 * - the `about` slides ("Our SEO Work"). The mock has no band for these
 *   either. This one costs more than the marquee did: it is several paragraphs
 *   of indexed body copy that the live page carries and these pages now do
 *   not. Cut on an explicit instruction after that was put to the client.
 *
 * `content.marquee` and `content.about` are both untouched, the other 25
 * service pages still render them through `components/services/Marquee` and
 * `components/services/About`, and `scripts/verify-content-parity.py` walks
 * content against the live HTML rather than against what we render, so it is
 * unaffected. These are per-page omissions, not content edits — and they are
 * the only strings on these pages that the rebuild does not render.
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
            <Proposal source="seo-proposal" benefits={seoProposalBenefits} />
            <Plans data={content.howItWorks} />
            <Work />
            <Solutions data={content.solutions} />
            <Benefits data={content.benefits} />
            <Numbers data={content.advantages} />
            <WhyChoose data={content.whyChoose} />
            <SeoClients />
            <Process data={content.process} />
            <Capabilities data={content.capabilities} />
            <Cta data={content.cta} />
        </div>
    );
}
