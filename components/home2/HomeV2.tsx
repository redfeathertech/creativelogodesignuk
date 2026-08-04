import JsonLd from "@/components/JsonLd";
import { homeGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { about } from "@/content/home";

import Hero from "./Hero";
import Logos from "./Logos";
import About from "./About";
import FeaturedWork from "./FeaturedWork";
import CtaBand from "./CtaBand";
import HowItWork from "./HowItWork";
import WhatYouGet from "./WhatYouGet";
import Results from "./Results";
import Methodology from "./Methodology";
import Toolbox from "./Toolbox";

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
            {/* Existing copy, recombined — "Your Competitors Aren't Waiting".
                Nothing new is introduced by the band itself. */}
            <CtaBand heading={`${about.titleMid} ${about.titleAccent}`} />
            <HowItWork />
            <WhatYouGet />
            {/* Industries slots in here — Task 8 */}
            <Results />
            <Methodology />
            <Toolbox />
        </>
    );
}
