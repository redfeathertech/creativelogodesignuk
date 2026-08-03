import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph, pricedOfferCatalogNode } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { meta, packageGroups } from "@/content/landing/logo-design-offer";

import { QuoteDialogProvider } from "@/components/landing/ldo/QuoteDialog";
import TopBar from "@/components/landing/ldo/TopBar";
import Hero from "@/components/landing/ldo/Hero";

/* Below-the-fold sections are code-split, as on the homepage: `ssr` still
   defaults to true, so every section is prerendered into the HTML — this only
   splits the *client* chunk each one hydrates from. */
const Logos = dynamic(() => import("@/components/home/Logos"));
const Packages = dynamic(() => import("@/components/landing/ldo/Packages"));
const Services = dynamic(() => import("@/components/landing/ldo/Services"));
const Featured = dynamic(() => import("@/components/landing/ldo/Featured"));
const Combo = dynamic(() => import("@/components/landing/ldo/Combo"));
const Work = dynamic(() => import("@/components/landing/ldo/Work"));
const Awards = dynamic(() => import("@/components/landing/ldo/Awards"));
const Cta = dynamic(() => import("@/components/landing/ldo/Cta"));
const Reviews = dynamic(() => import("@/components/landing/ldo/Reviews"));
const Support = dynamic(() => import("@/components/landing/ldo/Support"));
const Footer = dynamic(() => import("@/components/landing/ldo/Footer"));

const PATH = "/logo-design-offer";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Logo Design Offer", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * The live `<title>` already ends in "- Creative Logo Design", so the root
 * layout's "%s | Creative Logo Design" template would name the company twice.
 * `absolute` suppresses it, the same way the homepage does.
 *
 * `openGraph.title` differs from `<title>` because it differs on the live page
 * too — two hand-written strings, both kept.
 *
 * The live page emits **no canonical at all** and no `robots` directive. This
 * one is self-canonical and indexable, per the rule the client confirmed on
 * 1 Aug 2026: every landing page canonicals to itself.
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
 * `/logo-design-offer` — the £19 logo-design offer landing page.
 *
 * Section order is the live page's, unchanged: hero → client strip → the nine
 * packages → services → as featured in → combo → our work → awards → CTA →
 * reviews → support strip → footer.
 *
 * It renders under `app/(landing)/`, so it has **no site navigation**. That is
 * the live page's design and the right one for a paid-traffic page.
 *
 * The live page is a client-rendered CRA bundle: it serves a 3KB shell with an
 * empty `<div id="root">` and builds every word in the browser. So this is the
 * first version of the page that has any content in the document at all —
 * including the four portfolio sets and the six reviews its carousels show one
 * at a time, and the two headline prices (`£19`, `£1199`) that exist on the
 * live page only as pixels inside an image.
 */
export default function LogoDesignOfferPage() {
    return (
        <QuoteDialogProvider>
            <JsonLd
                data={pageGraph(PATH, meta.title, meta.description, TRAIL, [
                    pricedOfferCatalogNode(
                        PATH,
                        "Logo, branding and website packages",
                        packageGroups,
                    ),
                ])}
            />

            <TopBar />
            <Hero />
            <Logos />
            <Packages />
            <Services />
            <Featured />
            <Combo />
            <Work />
            <Awards />
            <Cta />
            <Reviews />
            <Support />
            <Footer />
        </QuoteDialogProvider>
    );
}
