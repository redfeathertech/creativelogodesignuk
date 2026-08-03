import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, faqPageNode, pageGraph, pricedOfferCatalogNode } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { faq, meta, pricing } from "@/content/landing/seo-services";

import { QuoteDialogProvider } from "@/components/landing/seo/QuoteDialog";
import TopBar from "@/components/landing/seo/TopBar";
import Hero from "@/components/landing/seo/Hero";

/* Below-the-fold sections are code-split, as on the other three landing pages:
   `ssr` still defaults to true, so every section is prerendered into the HTML —
   this only splits the *client* chunk each one hydrates from. */
const Trust = dynamic(() => import("@/components/landing/seo/Trust"));
const Info = dynamic(() => import("@/components/landing/seo/Info"));
const Pillars = dynamic(() => import("@/components/landing/seo/Pillars"));
const Industries = dynamic(() => import("@/components/landing/seo/Industries"));
const Difference = dynamic(() => import("@/components/landing/seo/Difference"));
const Services = dynamic(() => import("@/components/landing/seo/Services"));
const OnPage = dynamic(() => import("@/components/landing/seo/OnPage"));
const Gbp = dynamic(() => import("@/components/landing/seo/Gbp"));
const Process = dynamic(() => import("@/components/landing/seo/Process"));
const Pricing = dynamic(() => import("@/components/landing/seo/Pricing"));
const Faq = dynamic(() => import("@/components/landing/seo/Faq"));
const Cta = dynamic(() => import("@/components/landing/seo/Cta"));
const Footer = dynamic(() => import("@/components/landing/seo/Footer"));

const PATH = "/seo-services";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "SEO Services", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * The live page's `<head>` is four lines long: a charset, a viewport, the title
 * "SEO Services", and a canonical pointing at the **homepage**. No meta
 * description, no Open Graph, no Twitter card, no robots directive.
 *
 * So this is the first version of the page that can be shared, indexed or
 * attributed to itself. Self-canonical per the rule the client confirmed on
 * 1 Aug 2026 — see docs/SEO-PLAYBOOK.md.
 */
export const metadata: Metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: PATH,
    index: route.indexable,
});

/**
 * `/seo-services` — the SEO retainer landing page.
 *
 * Section order is the live page's, unchanged: offer bar → hero → trust strip →
 * what is SEO → the three pillars → industries → big-agency comparison →
 * services → on-page → Google Business Profile → process → pricing → FAQ →
 * closing CTA → footer.
 *
 * It renders under `app/(landing)/`, so it carries **no site navigation**. That
 * is the live page's design and the right one for a paid-traffic page.
 *
 * The copy is a deliberate rebrand rather than a verbatim port — the live page
 * is an un-rebranded third-party template that names another agency ten times
 * and prices in US dollars. The full reasoning, and every changed string, is in
 * `content/landing/seo-services.ts` and docs/CONTENT-PARITY.md.
 *
 * Two structured-data nodes the live page has no equivalent of: a `FAQPage`
 * built from the nine visible questions, and an `OfferCatalog` carrying the two
 * real GBP prices (the third tier is "Custom" and is deliberately not
 * described).
 */
export default function SeoServicesPage() {
    return (
        <QuoteDialogProvider>
            <JsonLd
                data={pageGraph(PATH, meta.title, meta.description, TRAIL, [
                    faqPageNode(PATH, faq.items),
                    pricedOfferCatalogNode(PATH, "SEO retainer plans", [
                        { title: "SEO", items: pricing.tiers },
                    ]),
                ])}
            />

            <TopBar />
            <Hero />
            <Trust />
            <Info />
            <Pillars />
            <Industries />
            <Difference />
            <Services />
            <OnPage />
            <Gbp />
            <Process />
            <Pricing />
            <Faq />
            <Cta />
            <Footer />
        </QuoteDialogProvider>
    );
}
