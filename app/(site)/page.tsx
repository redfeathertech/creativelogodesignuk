import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, homeGraph } from "@/lib/seo";
import { site } from "@/content/site";

import Hero from "@/components/home/Hero";

/**
 * Everything below the fold is code-split from the initial JS bundle via
 * `next/dynamic`. The page is still fully static — `ssr` defaults to `true`,
 * so each section's HTML is prerendered into the page same as a normal
 * import — this only splits the *client* chunk each section hydrates from
 * into its own file, so the browser fetches (and parses/executes) less JS
 * before the fold, instead of loading all 13 sections' scripts up front.
 */
const About = dynamic(() => import("@/components/home/About"));
const HowItWork = dynamic(() => import("@/components/home/HowItWork"));
const Portfolio = dynamic(() => import("@/components/home/Portfolio"));
const WhatYouGet = dynamic(() => import("@/components/home/WhatYouGet"));
const Toolbox = dynamic(() => import("@/components/home/Toolbox"));
const Logos = dynamic(() => import("@/components/home/Logos"));
const Results = dynamic(() => import("@/components/home/Results"));
const Methodology = dynamic(() => import("@/components/home/Methodology"));
const VideoTestimonials = dynamic(
    () => import("@/components/home/VideoTestimonials"),
);
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const Challenges = dynamic(() => import("@/components/home/Challenges"));
const Proposal = dynamic(() => import("@/components/home/Proposal"));

/* Title and description are carried over verbatim from the live site — both
   currently rank, so neither is being "improved". */
const TITLE = "Digital Marketing & Web Design Agency | Creative Logo Design";

export const metadata: Metadata = {
    ...buildMetadata({
        title: TITLE,
        description: site.description,
        path: "/",
    }),
    // The root layout's template would render "… | Creative Logo Design" twice.
    title: { absolute: TITLE },
};

/**
 * Homepage. Section order matches the approved clduk design
 * (`resources/views/user/home/index.blade.php`).
 *
 * Fully static: no data fetching, so the whole page is prerendered at build
 * time and every crawler gets complete HTML on first byte.
 */
export default function Home() {
    return (
        <>
            <JsonLd data={homeGraph(TITLE, site.description)} />

            <Hero />
            <About />
            <HowItWork />
            <Portfolio />
            <WhatYouGet />
            <Toolbox />
            <Logos />
            <Results />
            <Methodology />
            <VideoTestimonials />
            <Testimonials />
            <Challenges />
            <Proposal />
        </>
    );
}
