import type { Metadata } from "next";
import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { contactLocations, contactMeta } from "@/content/contact";
import { routeByPath } from "@/content/routes";

import ContactHero from "@/components/contact/ContactHero";

/* Below-the-fold sections are code-split — see app/page.tsx for why. */
const Enquiry = dynamic(() => import("@/components/contact/Enquiry"));
const Offices = dynamic(() => import("@/components/about/Offices"));

const PATH = "/contact-us";

/* One trail, two consumers: the visible breadcrumb and the BreadcrumbList
   node. Google compares them, so they are never written twice.
   The crumb reads "Contact", not the page title — that is what the redesign's
   breadcrumb says, and a crumb is a label, not a duplicate <title>. */
const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Contact", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

export const metadata: Metadata = buildMetadata({
    title: contactMeta.title,
    description: contactMeta.description,
    path: PATH,
    /* content/routes.ts owns the indexing switch — the same flag that decides
       whether this URL is in the sitemap. */
    index: route.indexable,
});

/**
 * Contact Us.
 *
 * Section order follows the approved clduk redesign
 * (`frontend/themes/theme-one/contact-us.blade.php`): hero → enquiry form →
 * offices. The office cards are the same component About Us renders, because in
 * the redesign they are the same cards under a differently-worded heading.
 *
 * Surfaces go darker → dark → white, so the two dark sections read as two and
 * the offices land on the white surface the redesign gives them.
 *
 * Everything a crawler needs — the phone numbers, the email, all three
 * addresses — is in the server-rendered HTML; only the form itself is a client
 * component. Fully static, like every other route here.
 */
export default function ContactPage() {
    return (
        <>
            <JsonLd
                data={pageGraph(PATH, contactMeta.title, contactMeta.description, TRAIL)}
            />

            <ContactHero trail={TRAIL} />
            <Enquiry />
            <Offices copy={contactLocations} />
        </>
    );
}
