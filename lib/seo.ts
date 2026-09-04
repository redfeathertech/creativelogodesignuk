/**
 * Structured data + metadata helpers.
 *
 * Everything is emitted as ONE `@graph` so nodes can reference each other by
 * `@id` instead of being duplicated. Read `docs/SEO-PLAYBOOK.md` before adding
 * a node — several schema types that look applicable here would fail Google's
 * validator or risk a manual action, and the reasons are documented there.
 */

import type { Metadata } from "next";
import { SITE_URL, site, contact, social, offices } from "@/content/site";
import { allServiceLinks } from "@/content/nav";
import { challenges, faq } from "@/content/home";

/* Stable @id anchors. Uniqueness across pages matters — duplicated @ids are the
   single most common structured-data bug when porting from a template engine. */
export const ID = {
    organization: `${SITE_URL}/#organization`,
    website: `${SITE_URL}/#website`,
    page: (path: string) => `${SITE_URL}${path === "/" ? "/" : path}#webpage`,
    breadcrumb: (path: string) =>
        `${SITE_URL}${path === "/" ? "/" : path}#breadcrumb`,
} as const;

export function absoluteUrl(path: string): string {
    return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/* ---------------------------------------------------------------- nodes -- */

function organizationNode() {
    return {
        "@type": "Organization",
        "@id": ID.organization,
        name: site.name,
        legalName: site.legalName,
        url: `${SITE_URL}/`,
        logo: {
            "@type": "ImageObject",
            url: site.logo,
            caption: site.name,
        },
        image: site.logo,
        description: site.description,
        foundingDate: site.foundingDate,
        email: contact.email,
        telephone: contact.phoneE164,
        sameAs: social.map((s) => s.href),
        address: {
            "@type": "PostalAddress",
            streetAddress: offices[0].street,
            addressLocality: offices[0].locality,
            addressRegion: offices[0].region,
            postalCode: offices[0].postalCode,
            addressCountry: offices[0].countryCode,
        },
        /* Three offices modelled as separate Place nodes on one Organization.
       Do NOT collapse these into multiple `address` values on a single
       LocalBusiness — that is invalid and will not validate. */
        location: offices.map((o) => ({
            "@type": "Place",
            name: `${site.name} — ${o.country}`,
            address: {
                "@type": "PostalAddress",
                streetAddress: o.street,
                addressLocality: o.locality,
                addressRegion: o.region,
                ...(o.postalCode ? { postalCode: o.postalCode } : {}),
                addressCountry: o.countryCode,
            },
        })),
        contactPoint: {
            "@type": "ContactPoint",
            telephone: contact.phoneE164,
            email: contact.email,
            contactType: "customer support",
            areaServed: ["GB", "US", "AE"],
            availableLanguage: ["English"],
        },
    };
}

function websiteNode() {
    return {
        "@type": "WebSite",
        "@id": ID.website,
        url: `${SITE_URL}/`,
        name: site.name,
        description: site.description,
        publisher: { "@id": ID.organization },
        inLanguage: site.lang,
        /* No `potentialAction: SearchAction` — there is no /search route, and
       declaring a search action the site cannot service is penalised. */
    };
}

/**
 * `WebPage.name` must be the page's rendered `<title>`, suffix included.
 *
 * Every page's title goes through the `%s | Creative Logo Design` template in
 * the root layout, but callers here pass whatever they have — some the bare
 * title, some already suffixed. That left the 36 service pages declaring "SEO"
 * while their `<title>` said "SEO | Creative Logo Design". Normalising in one
 * place means no caller can get it wrong, and passing either form is fine.
 *
 * The test is "does it already end with the company name", NOT "does it end
 * with ` | Creative Logo Design`". Two pages set `title: { absolute: … }` and so
 * never see the template: the homepage, whose title happens to end in the pipe
 * form anyway, and `/creative-logo-design`, whose live title ends
 * `- Creative Logo Design` with a **hyphen**. Matching only the pipe form
 * appended a second company name to that one, so its `WebPage.name` read
 * "… - Creative Logo Design | Creative Logo Design" while its `<title>` did not.
 *
 * A title that already ends in the company name never wants it again, whatever
 * the punctuation — which makes the looser test the correct one, not just the
 * more forgiving one.
 */
function titleWithSuffix(title: string) {
    return title.endsWith(site.name) ? title : `${title} | ${site.name}`;
}

function webPageNode(path: string, title: string, description: string) {
    return {
        "@type": "WebPage",
        "@id": ID.page(path),
        url: absoluteUrl(path),
        name: titleWithSuffix(title),
        description,
        isPartOf: { "@id": ID.website },
        about: { "@id": ID.organization },
        inLanguage: site.lang,
        breadcrumb: { "@id": ID.breadcrumb(path) },
    };
}

function breadcrumbNode(path: string, trail: readonly { name: string; path: string }[]) {
    return {
        "@type": "BreadcrumbList",
        "@id": ID.breadcrumb(path),
        itemListElement: trail.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.name,
            item: absoluteUrl(crumb.path),
        })),
    };
}

/** FAQPage built from the homepage's two accordions — `Challenges` and the
    `Faq` band above the footer. Answers are visible on the page (inside
    <details>), which Google accepts. Both lists feed one node because a page
    may only carry one FAQPage; they are disjoint by construction — see the
    note above the `faq` export in content/home.ts. */
function faqNode() {
    return {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
            ...challenges.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${item.a} ${item.list.join(". ")}.`,
                },
            })),
            ...faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
        ],
    };
}

/**
 * `FAQPage` for any page that renders a real Q&A accordion.
 *
 * The homepage's `faqNode` above is bound to the Challenges component's own
 * shape (an answer plus a bullet list) and cannot be reused; this takes plain
 * question/answer pairs. Both emit answers that are **visible on the page**,
 * inside `<details>`, which is the condition Google attaches to `FAQPage` — a
 * node describing hidden text is the version that earns a manual action.
 *
 * The `@id` is derived from the path so two pages carrying an FAQ can never
 * collide, which is the failure `ID.page`/`ID.breadcrumb` already guard against.
 */
export function faqPageNode(
    path: string,
    items: readonly { q: string; a: string }[],
) {
    return {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(path)}#faq`,
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };
}

/** The service catalogue mirrors the mega-menu, giving every service page an
    entity Google can associate with the organisation. */
function serviceCatalogNode() {
    return {
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/#services`,
        name: "Design, development and marketing services",
        provider: { "@id": ID.organization },
        itemListElement: allServiceLinks.map((svc, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
                "@type": "Service",
                name: svc.label,
                url: absoluteUrl(svc.href),
                provider: { "@id": ID.organization },
            },
        })),
    };
}

/* ---------------------------------------------------------------- graphs -- */

export function homeGraph(title: string, description: string) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            organizationNode(),
            websiteNode(),
            webPageNode("/", title, description),
            breadcrumbNode("/", [{ name: "Home", path: "/" }]),
            faqNode(),
            serviceCatalogNode(),
        ],
    };
}

export function pageGraph(
    path: string,
    title: string,
    description: string,
    trail: readonly { name: string; path: string }[],
    /** Extra nodes for pages that describe something the four base nodes do not. */
    extraNodes: readonly object[] = [],
) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            organizationNode(),
            websiteNode(),
            webPageNode(path, title, description),
            breadcrumbNode(path, trail),
            ...extraNodes,
        ],
    };
}

/**
 * An `OfferCatalog` of packages that carry a real, visible price.
 *
 * docs/SEO-PLAYBOOK.md bans `Product`/`Offer` with prices, and that ban stands —
 * it exists because there was no pricing anywhere on the site to describe.
 * `/creative-logo-design` is the first page where there is: nine packages with
 * nine prices, each one rendered as text in the page. Describing them is not
 * inventing them.
 *
 * `OfferCatalog` rather than `Product`, for two reasons. These are services, not
 * products — a "Basic Logo Package" has no GTIN, no brand and no availability —
 * and `OfferCatalog` produces no rich result, so there is nothing here that can
 * be wrong in a SERP. It is entity clarity, not a stars-and-price play.
 *
 * `price` must be a bare number for schema.org, so the currency is stripped and
 * `priceCurrency` carries it separately.
 */
export function pricedOfferCatalogNode(
    path: string,
    name: string,
    groups: readonly {
        title: string;
        items: readonly { name: string; price: string }[];
    }[],
) {
    /**
     * A tier priced "Custom" / "POA" carries no number, and `price` below would
     * reduce it to `""` — an Offer with an empty price is invalid, and one
     * invalid member invalidates the node. Those tiers are dropped rather than
     * described: the catalogue is allowed to be a subset, but every entry in it
     * has to be true. `/seo-services` has one ("ENTERPRISE").
     */
    const offers = groups
        .flatMap((group) => group.items.map((item) => ({ group: group.title, ...item })))
        .filter((offer) => /\d/.test(offer.price));

    return {
        "@type": "OfferCatalog",
        "@id": `${absoluteUrl(path)}#offers`,
        name,
        url: absoluteUrl(path),
        provider: { "@id": ID.organization },
        itemListElement: offers.map((offer, i) => ({
            "@type": "Offer",
            position: i + 1,
            price: offer.price.replace(/[^\d.]/g, ""),
            priceCurrency: "GBP",
            category: offer.group,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(path),
            itemOffered: {
                "@type": "Service",
                name: offer.name,
                serviceType: offer.group,
                provider: { "@id": ID.organization },
            },
        })),
    };
}

/* -------------------------------------------------------------- metadata -- */

/**
 * The share card, named explicitly on every page.
 *
 * `app/opengraph-image.tsx` only auto-attaches to the segment that owns it —
 * the root. `mergeStaticMetadata()` in Next's `resolve-metadata` re-attaches it
 * to a page only when that page does not declare `openGraph.images`, and
 * `mergeMetadata()` replaces an inherited `openGraph` object wholesale when a
 * page sets its own. Since `buildMetadata` sets one, every route under
 * `app/(site)/` was shipping `twitter:card=summary_large_image` with no image
 * behind it — the "shares render as a bare URL" failure this rebuild exists to
 * fix. Naming it here covers the homepage and all 42 inner pages at once.
 *
 * `alt` is kept in step with the `alt` export in `app/opengraph-image.tsx`;
 * that file cannot be imported here without pulling `next/og` into every page.
 */
const OG_IMAGE = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Creative Logo Design — UK design, development & digital marketing agency",
} as const;

export function buildMetadata({
    title,
    description,
    path,
    index = true,
}: {
    title: string;
    description: string;
    path: string;
    index?: boolean;
}): Metadata {
    const url = absoluteUrl(path);

    return {
        title,
        description,
        alternates: { canonical: url },
        robots: index
            ? {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      "max-image-preview": "large",
                      "max-snippet": -1,
                      "max-video-preview": -1,
                  },
              }
            : { index: false, follow: true },
        openGraph: {
            type: "website",
            siteName: site.name,
            locale: site.locale,
            url,
            title,
            description,
            images: [OG_IMAGE],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [OG_IMAGE.url],
        },
    };
}
