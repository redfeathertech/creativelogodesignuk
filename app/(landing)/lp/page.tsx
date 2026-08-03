import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph, pricedOfferCatalogNode } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { meta, packageGroups } from "@/content/landing/lp";

import { QuoteDialogProvider } from "@/components/landing/lp/QuoteDialog";
import TopBar from "@/components/landing/lp/TopBar";
import Hero from "@/components/landing/lp/Hero";

/* Below-the-fold sections are code-split, as on the homepage: `ssr` still
   defaults to true, so every section is prerendered into the HTML — this only
   splits the *client* chunk each one hydrates from. */
const Tech = dynamic(() => import("@/components/landing/lp/Tech"));
const Packages = dynamic(() => import("@/components/landing/lp/Packages"));
const Services = dynamic(() => import("@/components/landing/lp/Services"));
const Press = dynamic(() => import("@/components/landing/lp/Press"));
const Combo = dynamic(() => import("@/components/landing/lp/Combo"));
const Work = dynamic(() => import("@/components/landing/lp/Work"));
const Awards = dynamic(() => import("@/components/landing/lp/Awards"));
const Cta = dynamic(() => import("@/components/landing/lp/Cta"));
const Reviews = dynamic(() => import("@/components/landing/lp/Reviews"));
const Contact = dynamic(() => import("@/components/landing/lp/Contact"));
const Support = dynamic(() => import("@/components/landing/lp/Support"));
const Footer = dynamic(() => import("@/components/landing/lp/Footer"));

const PATH = "/lp";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Web Design Offer", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * The live `<title>` already ends in "- Creative Logo Design", so the root
 * layout's "%s | Creative Logo Design" template would name the company twice.
 * `absolute` suppresses it, the same way both other landing pages do.
 *
 * `openGraph.title` differs from `<title>` because it differs on the live page
 * too — the shell's og:title describes logo design. Both kept.
 *
 * The live page's canonical is correct but exists **only after JavaScript
 * runs**: it is injected by react-helmet, and the served HTML has no canonical
 * at all — while carrying `/logo-design-offer`'s `<title>` and description,
 * because the shell loads that page's bundle too. This one is self-canonical in
 * the document, per the rule the client confirmed on 1 Aug 2026.
 */
export const metadata: Metadata = (() => {
    const base = buildMetadata({
        title: meta.title,
        description: meta.description,
        path: PATH,
        index: route.indexable,
    });

    return {
        ...base,
        title: { absolute: meta.title },
        openGraph: { ...base.openGraph, title: meta.ogTitle },
    };
})();

/**
 * `/lp` — the £199 web-design offer landing page.
 *
 * Section order is the live page's, unchanged: top bar → hero → platform rail →
 * the eighteen packages → services → recognition strip → combo → our work →
 * awards → CTA → reviews → contact → support strip → footer.
 *
 * It renders under `app/(landing)/`, so it has **no site navigation**. That is
 * the live page's design and the right one for a paid-traffic page.
 *
 * The live page is a client-rendered CRA bundle serving a 3.8KB shell with an
 * empty `<div id="root">`, so this is the first version of the page with any
 * content in the document at all — including the fifteen package cards its tab
 * strip hides, three of the four project write-ups its carousel rotates, and
 * the two headline prices (`£199`, `£1199`) that exist on the live page only as
 * pixels inside an image.
 */
export default function LpPage() {
    return (
        <QuoteDialogProvider>
            <JsonLd
                data={pageGraph(PATH, meta.title, meta.description, TRAIL, [
                    pricedOfferCatalogNode(
                        PATH,
                        "Website, e-commerce, logo, stationery, SEO and social media packages",
                        packageGroups,
                    ),
                ])}
            />

            <TopBar />
            <Hero />
            <Tech />
            <Packages />
            <Services />
            <Press />
            <Combo />
            <Work />
            <Awards />
            <Cta />
            <Reviews />
            <Contact />
            <Support />
            <Footer />
        </QuoteDialogProvider>
    );
}
