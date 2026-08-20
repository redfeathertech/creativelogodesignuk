/**
 * Site-wide constants: business identity, contact details, social profiles.
 *
 * These values are carried over verbatim from the live Laravel site. They feed
 * the header, footer, and the Organization JSON-LD node, so a change here is a
 * change to structured data — keep them accurate.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://creativelogodesign.co.uk";

export const site = {
  name: "Creative Logo Design",
  legalName: "Creative Logo Design",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/img/logo.png`,
  description:
    "Creative Logo Design is a UK-based full-service design & development agency delivering web design, logo design, branding & digital marketing solutions.",
  locale: "en_GB",
  lang: "en-GB",
  foundingDate: "1998",
  googleSiteVerification: "H5AM-6QgbmEGrgd7k6Nfdo4qb2aNO36wrtC8_bxnJjo",
} as const;

export const contact = {
  /* Client-supplied number, replacing the old 0204-511-2054 landline site-wide
     (2026-08). Displayed in international form because it is the number every
     page, the JSON-LD and all four landing pages now print; the href is the
     same digits in E.164 so it dials from anywhere. */
  phoneDisplay: "+44 7853 354207",
  phoneE164: "+447853354207",
  email: "support@creativelogodesign.co.uk",
  hours: "Mon – Fri: 9:00 AM to 6:00 PM",
  whatsapp: "https://wa.me/447853354207",
} as const;

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/Creativelogodesignuk" },
  { label: "X", href: "https://x.com/creativelogo_uk" },
  { label: "Instagram", href: "https://www.instagram.com/creative_logo_design_uk" },
] as const;

/**
 * The three offices.
 *
 * The structured parts feed `Organization.location[]` in the JSON-LD and the
 * footer's address block; `address` is the one-line form the About page prints
 * and the Google Maps query is built from. It is held verbatim rather than
 * joined from the parts because the three countries punctuate an address
 * differently — "Wembley, England, HA0 4LY" but "Edison, NJ 08817" — and a
 * formatter that gets one of them right gets the other wrong.
 */
export const offices = [
  {
    country: "UK",
    street: "Continental House, 497 Sunleigh Road",
    locality: "Wembley",
    region: "England",
    postalCode: "HA0 4LY",
    countryCode: "GB",
    address: "Continental House, 497 Sunleigh Road, Wembley, England, HA0 4LY",
    phoneDisplay: "+44 7853 354207",
    phoneE164: "+447853354207",
    image: "/assets/img/about/office-uk.webp",
    imageAlt: "Aerial view of Westminster and the River Thames in London",
  },
  {
    country: "USA",
    street: "41 Winthrop Rd",
    locality: "Edison",
    region: "NJ",
    postalCode: "08817",
    countryCode: "US",
    address: "41 Winthrop Rd, Edison, NJ 08817",
    phoneDisplay: "+1 (551) 666-5255",
    phoneE164: "+15516665255",
    image: "/assets/img/about/office-usa.webp",
    imageAlt: "The Statue of Liberty with the Manhattan skyline behind it",
  },
  {
    country: "Dubai",
    street: "Property # 2-E31, Al Muteena Project 2",
    locality: "Deira",
    region: "Dubai",
    postalCode: "",
    countryCode: "AE",
    address: "Property # 2-E31, Al Muteena Project 2, Deira, Dubai",
    phoneDisplay: "+971 58 512 3639",
    phoneE164: "+971585123639",
    image: "/assets/img/about/office-dubai.webp",
    imageAlt: "Downtown Dubai at sunrise, with the Burj Khalifa at its centre",
  },
] as const;
