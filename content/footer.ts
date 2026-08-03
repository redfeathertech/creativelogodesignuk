/**
 * Footer link columns and legal links.
 * Labels and paths carried over verbatim from the live site.
 */

import type { Route } from "next";
import type { NavLink } from "./nav";

export const footerTagline =
  "A full-service design & development agency from the UK, building brands, products and growth for businesses worldwide.";

export const footerHeading = "LET’S GROW YOUR BRAND";

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Web Design",
    links: [
      { label: "Custom WordPress Website Design", href: "/custom-wordpress-developement" as Route },
      { label: "Website Redesign", href: "/website-redesign-services" as Route },
      { label: "Responsive Website Design", href: "/responsive-website-design-and-development" as Route },
      { label: "UI & UX Design", href: "/ui-ux-design" as Route },
      { label: "Shopify Web Design", href: "/shopify-web-design" as Route },
      { label: "Magento Web Design", href: "/magento-design-and-development-service" as Route },
    ],
  },
  {
    heading: "Web Development",
    links: [
      { label: "E-commerce Development", href: "/ecommerce-website-development" as Route },
      { label: "WordPress Development", href: "/wordpress-development" as Route },
      { label: "AMP Web Design", href: "/amp-web-design" as Route },
      { label: "Page Speed Optimisation", href: "/page-speed-optimisation" as Route },
      { label: "Shopify Developers", href: "/shopify-developers" as Route },
      { label: "Magento Development", href: "/magento-development" as Route },
      { label: "Laravel Developers", href: "/laravel-developers" as Route },
      { label: "Contentful Developers", href: "/contentful-developers" as Route },
      { label: "Custom 3D Product Configurators", href: "/custom-3d-product-configurators" as Route },
    ],
  },
  {
    heading: "SEO",
    links: [
      { label: "Search Engine Optimisation", href: "/seo" as Route },
      { label: "Answer Engine Optimisation", href: "/aeo" as Route },
      { label: "SEO Audit Services", href: "/seo-audit-service" as Route },
      { label: "Amazon SEO", href: "/amazon-seo-and-product-optimisation-service" as Route },
      { label: "Conversion Rate Optimisation", href: "/conversion-rate-optimisation" as Route },
      { label: "Google Analytics 4", href: "/google-analytics" as Route },
    ],
  },
  {
    heading: "Digital Marketing",
    links: [
      { label: "Digital Marketing", href: "/digital-marketing" as Route },
      { label: "Marketing & Sales Automation", href: "/marketing-and-sales-automation" as Route },
      { label: "PPC Management", href: "/ppc" as Route },
      { label: "Social Media Management", href: "/social-media-management" as Route },
      { label: "Email Marketing", href: "/email-marketing-management-services" as Route },
      { label: "Content Marketing", href: "/content-marketing-services" as Route },
      { label: "Influencer Marketing", href: "/influencer-marketing" as Route },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookies-policy" },
];
