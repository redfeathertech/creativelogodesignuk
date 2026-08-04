import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { homeGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { about } from "@/content/home";

import Hero from "./Hero";

/**
 * Homepage v2 — the editorial redesign.
 *
 * Every section reads its copy from `content/home.ts` (parity-locked) or
 * `content/about.ts` (already shipping on /about-us) — imported, never copied.
 * There is deliberately no second copy of the homepage wording to keep in
 * sync, which is what makes the parity guarantee structural rather than a
 * matter of diligence. `content/home2.ts` holds the Featured Work entries and
 * nothing else.
 *
 * The JSON-LD graph and the title/description passed into it are
 * byte-identical to the current homepage's, so promoting this component
 * changes no metadata whatsoever.
 *
 * Everything below the fold is code-split from the initial JS bundle via
 * `next/dynamic`, exactly as app/(site)/page.tsx does it. `ssr` defaults to
 * `true`, so each section's HTML is still prerendered into the page — this
 * only splits the *client* chunk each section hydrates from into its own file,
 * so the browser fetches and executes less JS before the fold.
 *
 * See docs/superpowers/specs/2026-08-04-homepage-v2-design.md
 */
const Logos = dynamic(() => import("./Logos"));
const About = dynamic(() => import("./About"));
const FeaturedWork = dynamic(() => import("./FeaturedWork"));
const CtaBand = dynamic(() => import("./CtaBand"));
const HowItWork = dynamic(() => import("./HowItWork"));
const WhatYouGet = dynamic(() => import("./WhatYouGet"));
const Industries = dynamic(() => import("./Industries"));
const Results = dynamic(() => import("./Results"));
const Methodology = dynamic(() => import("./Methodology"));
const Toolbox = dynamic(() => import("./Toolbox"));
const Awards = dynamic(() => import("./Awards"));
const Testimonials = dynamic(() => import("./Testimonials"));
const Locations = dynamic(() => import("./Locations"));
const Challenges = dynamic(() => import("./Challenges"));
const Proposal = dynamic(() => import("./Proposal"));

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
                The band introduces no new copy of its own. */}
            <CtaBand heading={`${about.titleMid} ${about.titleAccent}`} />
            <HowItWork />
            <WhatYouGet />
            <Industries />
            <Results />
            <Methodology />
            <Toolbox />
            <Awards />
            <Testimonials />
            <Locations />
            <Challenges />
            <Proposal />
        </>
    );
}
