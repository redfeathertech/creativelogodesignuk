import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph, pricedOfferCatalogNode } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { meta, packageGroups } from "@/content/landing/creative-logo-design";

import { QuoteDialogProvider } from "@/components/landing/cld/QuoteDialog";
import TopBar from "@/components/landing/cld/TopBar";
import Hero from "@/components/landing/cld/Hero";

/* Below-the-fold sections are code-split, as on the homepage: `ssr` still
   defaults to true, so every section is prerendered into the HTML — this only
   splits the *client* chunk each one hydrates from. */
const Logos = dynamic(() => import("@/components/home/Logos"));
const Packages = dynamic(() => import("@/components/landing/cld/Packages"));
const DiscountBand = dynamic(() => import("@/components/landing/cld/DiscountBand"));
const Combo = dynamic(() => import("@/components/landing/cld/Combo"));
const Portfolio = dynamic(() => import("@/components/landing/cld/Portfolio"));
const StartupCta = dynamic(() => import("@/components/landing/cld/StartupCta"));
const Services = dynamic(() => import("@/components/landing/cld/Services"));
const ConsultCta = dynamic(() => import("@/components/landing/cld/ConsultCta"));
const Process = dynamic(() => import("@/components/landing/cld/Process"));
const Reviews = dynamic(() => import("@/components/landing/cld/Reviews"));
const Footer = dynamic(() => import("@/components/landing/cld/Footer"));

const PATH = "/creative-logo-design";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Custom Logo Design", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * The live page's `<title>` already ends in "- Creative Logo Design", so the
 * root layout's "%s | Creative Logo Design" template would name the company
 * twice. `absolute` suppresses it, the same way the homepage does.
 *
 * `openGraph.title` differs from `<title>` because it differs on the live page
 * too — two hand-written strings, both kept.
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
 * `/creative-logo-design` — the logo-design landing page.
 *
 * Section order is the live page's, unchanged: hero → trust strip → the nine
 * packages → discount band → combo → portfolio → startup CTA → services →
 * consultation CTA → process → reviews → footer.
 *
 * It renders under `app/(landing)/`, so it has **no site navigation**. That is
 * the live page's design and the right one for a paid-traffic page: the only
 * ways off it are its own CTAs, its two legal links, and a Stripe checkout.
 *
 * Everything a crawler needs is in the prerendered HTML — all nine package
 * lists, all fourteen reviews, every price. The only client components are the
 * three forms and the quote dialog they open.
 */
export default function CreativeLogoDesignPage() {
    return (
        <QuoteDialogProvider>
            <JsonLd
                data={pageGraph(PATH, meta.title, meta.description, TRAIL, [
                    pricedOfferCatalogNode(PATH, "Logo, branding and website packages", packageGroups),
                ])}
            />

            <TopBar />
            <Hero />
            <Logos />
            <Packages />
            <DiscountBand />
            <Combo />
            <Portfolio />
            <StartupCta />
            <Services />
            <ConsultCta />
            <Process />
            <Reviews />
            <Footer />
        </QuoteDialogProvider>
    );
}
