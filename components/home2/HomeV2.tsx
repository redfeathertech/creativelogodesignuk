import JsonLd from "@/components/JsonLd";
import { homeGraph } from "@/lib/seo";
import { site } from "@/content/site";

import Hero from "./Hero";
import Logos from "./Logos";
import About from "./About";
import FeaturedWork from "./FeaturedWork";

/**
 * Homepage v2 — the editorial redesign.
 *
 * Sections are added to this stack one task at a time. The JSON-LD graph and
 * the title/description passed into it are byte-identical to the current
 * homepage's, so promoting this component changes no metadata whatsoever.
 *
 * Every section reads its copy from `content/home.ts` — imported, never
 * copied. There is deliberately no second copy of the homepage wording to
 * keep in sync, which is what makes the parity guarantee structural rather
 * than a matter of diligence.
 *
 * See docs/superpowers/specs/2026-08-04-homepage-v2-design.md
 */
export const HOME_TITLE =
    "Digital Marketing & Web Design Agency | Creative Logo Design";

export default function HomeV2() {
    return (
        <>
            <JsonLd data={homeGraph(HOME_TITLE, site.description)} />

            <Hero />
            <Logos />
            <About />
            <FeaturedWork />
        </>
    );
}
