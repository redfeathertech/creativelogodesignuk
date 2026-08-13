/**
 * Footer link columns and legal links.
 *
 * The service columns are DERIVED from `serviceNav` — the same file the header
 * mega-menu, the mobile drawer and the Service/OfferCatalog JSON-LD render
 * from. They used to be a hand-written copy, and it drifted: the 2026-08 pillar
 * restructure gave the header eight pillars and ten new sub-services, and the
 * footer kept the pre-restructure four columns for two commits (its URLs had
 * been find-and-replaced onto the new paths, so nothing 404'd and nothing
 * looked wrong). Deriving removes that whole class of bug — a group added to
 * the menu is a group in the footer, in the same order, with the same labels.
 *
 * Nothing is lost against the hand-written list: every URL it carried is in
 * `serviceNav`, including the two digital-marketing pages (`/…/cro` and
 * `/…/google-analytics-4`) the live site files under its SEO heading.
 *
 * Legal links stay hand-written — they are not services and have no nav group.
 */

import type { Route } from "next";
import type { NavLink } from "./nav";
import { serviceNav } from "./nav";

export const footerTagline =
    "A full-service design & development agency from the UK, building brands, products and growth for businesses worldwide.";

export const footerHeading = "LET’S GROW YOUR BRAND";

export interface FooterColumn {
    heading: string;
    /**
     * The column's pillar page, rendered as a link on the heading itself, or
     * null while a group's pillar page is unbuilt (see `NavGroup.href`). All
     * eight groups have one today.
     */
    href: Route | null;
    links: NavLink[];
}

export const footerColumns: FooterColumn[] = serviceNav.map((group) => ({
    heading: group.label,
    href: group.href,
    links: group.items,
}));

export const legalLinks: NavLink[] = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Cookie Policy", href: "/cookies-policy" },
];
