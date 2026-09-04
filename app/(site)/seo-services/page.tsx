import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, faqPageNode, pageGraph, pricedOfferCatalogNode } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { faq, meta, pricing } from "@/content/landing/seo-services";

import { QuoteDialogProvider } from "@/components/services/seo/QuoteDialog";
import OfferBar from "@/components/services/seo/OfferBar";
import Hero from "@/components/services/seo/Hero";
import Proposal from "@/components/home/Proposal";
import Clients from "@/components/services/seo/Clients";

/* Below-the-fold sections are code-split, as on the other service pages:
   `ssr` still defaults to true, so every section is prerendered into the HTML —
   this only splits the *client* chunk each one hydrates from. */
const Info = dynamic(() => import("@/components/services/seo/Info"));
const Pillars = dynamic(() => import("@/components/services/seo/Pillars"));
const Industries = dynamic(() => import("@/components/services/seo/Industries"));
const Difference = dynamic(() => import("@/components/services/seo/Difference"));
const Services = dynamic(() => import("@/components/services/seo/Services"));
const OnPage = dynamic(() => import("@/components/services/seo/OnPage"));
const Gbp = dynamic(() => import("@/components/services/seo/Gbp"));
const Process = dynamic(() => import("@/components/services/seo/Process"));
const Pricing = dynamic(() => import("@/components/services/seo/Pricing"));
const Faq = dynamic(() => import("@/components/services/seo/Faq"));
const Cta = dynamic(() => import("@/components/services/seo/Cta"));

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
 * `/seo-services` — the SEO pillar page.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-08 REDESIGN: THIS IS A SERVICE PAGE NOW, NOT A LANDING PAGE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * It used to render under `app/(landing)/` with no site navigation, its own
 * offer bar, its own footer and the live template's white canvas and
 * magenta → coral → cream ramp. Since the 2026-08 restructure this URL is the
 * SEO pillar in the services mega-menu and the eight SEO sub-services nest
 * under it (`/seo-services/seo-audit`, …), all of which render in `app/(site)/`
 * with full chrome. A pillar its own children do not visually belong to is the
 * wrong shape, so the page moved into the same route group and onto the shared
 * service-page design system.
 *
 * What changed is layout only:
 *
 * - The route group. `(site)` supplies `SiteChrome` — the utility bar, the
 *   mega-menu header, the site footer and `<main id="main">`. **The URL is
 *   unchanged**: a route group is not a path segment, so no redirect is needed
 *   and none was added.
 * - Every section is rebuilt on `components/ui/Section` — `Section`, `Eyebrow`,
 *   `SectionHeading`, `container-site`, `reveal`, the `py-section` rhythm and
 *   the dark/light tone alternation the other 36 service pages run, with the
 *   `seo-*` tokens dropped for the brand ramp.
 * - The page's own top bar became {@link OfferBar}: the site chrome covers what
 *   it duplicated, and it carries the copy the chrome has no equivalent of. The
 *   page's own footer band was dropped — the site footer supplies it.
 * - `Clients` — the client-logo wall every service page carries — is new
 *   here. It renders from components/services/seo/Clients.tsx rather than the
 *   shared dark wall: same copy, light surface, full-colour marks.
 *
 * Section order follows the live page, with one change: offer bar → hero →
 * proposal band → what is SEO → the three pillars → industries → big-agency
 * comparison → services → on-page → Google Business Profile → process →
 * pricing → FAQ → closing CTA, with the client wall folded in where the
 * service-page rhythm puts it.
 *
 * **One section was cut, on the client's instruction (2026-09):** the trust
 * strip that sat between the hero and the "what is SEO" section — the "fully
 * custom SEO plans" banner and the four badges under it (Google Partner
 * Certified, No Long-Term Contracts, Monthly Reporting, Dedicated Account
 * Manager). Its copy is gone from `content/landing/seo-services.ts`, its
 * component is deleted, and its four badge titles are
 * declared in the parity script's REPLACED list, so the reverse check still
 * passes and the drop is recorded rather than silent. Nothing else was added,
 * cut or reworded.
 *
 * The copy itself is a deliberate rebrand rather than a verbatim port — the
 * live page is an un-rebranded third-party template that names another agency
 * ten times and prices in US dollars. The full reasoning, and every changed
 * string, is in `content/landing/seo-services.ts` and docs/CONTENT-PARITY.md.
 * That file did not change in this redesign, and neither did
 * `scripts/verify-seo-services-parity.py`.
 *
 * The page keeps its own quote dialog rather than switching to the site-wide
 * `LeadPanel`: the live form's six-field set (two name fields and a free-text
 * subject) exists nowhere else, and each CTA tags the enquiry with the plan
 * that opened it.
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

            <OfferBar />
            <Hero />
            <Proposal source="seo-proposal" />
            <Info />
            <Pillars />
            <Industries />
            <Difference />
            <Services />
            <OnPage />
            <Gbp />
            <Process />
            <Clients />
            <Pricing />
            <Faq />
            <Cta />
        </QuoteDialogProvider>
    );
}
