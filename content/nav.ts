/**
 * Navigation — single source of truth for the services menu.
 *
 * The desktop mega-menu, the mobile drawer, and the footer all render from
 * this file, so a link can never exist in one and be missing from another.
 * Paths are verbatim from the live site; see `content/routes.ts`.
 */

import type { Route } from "next";

export interface NavLink {
  label: string;
  /** Typed against the app's real routes — `typedRoutes` catches broken links at build time. */
  href: Route;
}

export interface NavGroup {
  label: string;
  /** Hub page for the group, or null when the group is a bucket with no landing page. */
  href: Route | null;
  items: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export const serviceNav: NavGroup[] = [
  {
    label: "Web Design",
    href: "/web-designing" as Route,
    items: [
      { label: "Custom WordPress Website Design", href: "/custom-wordpress-developement" as Route },
      { label: "Website Redesign", href: "/website-redesign-services" as Route },
      { label: "Responsive Website Design", href: "/responsive-website-design-and-development" as Route },
      { label: "UI & UX Design", href: "/ui-ux-design" as Route },
      { label: "Shopify Web Design", href: "/shopify-web-design" as Route },
      { label: "Magento Web Design & Development", href: "/magento-design-and-development-service" as Route },
      { label: "Corporate Blog Design", href: "/corporate-blog-design-services" as Route },
      { label: "Content Management Systems", href: "/content-management-systems" as Route },
      { label: "UI & UX Analysis", href: "/ui-and-ux-analysis" as Route },
    ],
  },
  {
    label: "Digital Marketing",
    href: "/digital-marketing" as Route,
    items: [
      { label: "Marketing & Sales Automation", href: "/marketing-and-sales-automation" as Route },
      { label: "SEO", href: "/seo" as Route },
      { label: "AEO", href: "/aeo" as Route },
      { label: "SEO Audit", href: "/seo-audit-service" as Route },
      { label: "Social Media", href: "/social-media-management" as Route },
      { label: "PPC", href: "/ppc" as Route },
      { label: "Email Marketing", href: "/email-marketing-management-services" as Route },
      { label: "Amazon SEO", href: "/amazon-seo-and-product-optimisation-service" as Route },
      { label: "Content Marketing", href: "/content-marketing-services" as Route },
      { label: "Influencer Marketing", href: "/influencer-marketing" as Route },
      { label: "Conversion Rate", href: "/conversion-rate-optimisation" as Route },
      { label: "Google Analytics 4", href: "/google-analytics" as Route },
    ],
  },
  {
    label: "Web Development",
    href: "/web-development" as Route,
    items: [
      { label: "E-commerce", href: "/ecommerce-website-development" as Route },
      { label: "WordPress", href: "/wordpress-development" as Route },
      { label: "AMP", href: "/amp-web-design" as Route },
      { label: "Page Speed", href: "/page-speed-optimisation" as Route },
      { label: "Shopify Developers", href: "/shopify-developers" as Route },
      { label: "Magento", href: "/magento-development" as Route },
      { label: "Laravel", href: "/laravel-developers" as Route },
      { label: "Contentful", href: "/contentful-developers" as Route },
      { label: "Custom 3D Configurators", href: "/custom-3d-product-configurators" as Route },
    ],
  },
  {
    label: "More Services",
    href: null,
    items: [
      { label: "Branding", href: "/branding" as Route },
      { label: "App Development", href: "/app-development" as Route },
      { label: "Website Maintenance", href: "/website-maintenance" as Route },
    ],
  },
];

/** Flat list of every service URL — used by the Service/OfferCatalog JSON-LD. */
export const allServiceLinks: NavLink[] = serviceNav.flatMap((g) => [
  ...(g.href ? [{ label: g.label, href: g.href }] : []),
  ...g.items,
]);
