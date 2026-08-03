import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { aboutMeta } from "@/content/about";
import { routeByPath } from "@/content/routes";

import AboutHero from "@/components/about/AboutHero";

/* Below-the-fold sections are code-split — see app/page.tsx for why. */
const Story = dynamic(() => import("@/components/about/Story"));
const Offices = dynamic(() => import("@/components/about/Offices"));
const WhatYouGet = dynamic(() => import("@/components/home/WhatYouGet"));
const Industries = dynamic(() => import("@/components/about/Industries"));
const Clients = dynamic(() => import("@/components/about/Clients"));
const Credentials = dynamic(() => import("@/components/about/Credentials"));
const Proposal = dynamic(() => import("@/components/home/Proposal"));

const PATH = "/about-us";

/* One trail, two consumers: the visible breadcrumb and the BreadcrumbList
   node. Google compares them, so they are never written twice. */
const TRAIL = [
    { name: "Home", path: "/" },
    { name: aboutMeta.title, path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

export const metadata: Metadata = buildMetadata({
    title: aboutMeta.title,
    description: aboutMeta.description,
    path: PATH,
    /* content/routes.ts owns the indexing switch — the same flag that decides
       whether this URL is in the sitemap. */
    index: route.indexable,
});

/**
 * About Us.
 *
 * Section order follows the approved clduk redesign
 * (`frontend/themes/theme-one/about-us.blade.php`), with two of its sections
 * rendered by components the homepage already owns — "What you get" and the
 * proposal form are the same components there, exactly as the Blade template
 * `@include`s the same partials.
 *
 * Surfaces alternate deliberately: dark hero → mist → white → mist → dark →
 * darker → white → dark. Two adjacent sections on the same surface read as one
 * long section, and that is what the ref's ordering would have produced.
 *
 * Fully static, like every other route here.
 */
export default function AboutPage() {
    return (
        <>
            <JsonLd data={pageGraph(PATH, aboutMeta.title, aboutMeta.description, TRAIL)} />

            <AboutHero trail={TRAIL} />
            <Story />
            <Offices />
            <WhatYouGet />
            <Industries />
            <Clients />
            <Credentials />
            <Proposal />
        </>
    );
}
