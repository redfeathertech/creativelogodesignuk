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
      { label: "Custom WordPress Website Design", href: "/web-design-services/custom-wordpress" as Route },
      { label: "Website Redesign", href: "/web-design-services/website-redesign" as Route },
      { label: "Responsive Website Design", href: "/web-design-services/responsive-design" as Route },
      { label: "UI & UX Design", href: "/web-design-services/ui-ux-design" as Route },
      { label: "Shopify Web Design", href: "/web-design-services/shopify" as Route },
      { label: "Magento Web Design", href: "/web-design-services/magento" as Route },
    ],
  },
  {
    heading: "Web Development",
    links: [
      { label: "E-commerce Development", href: "/web-development-services/ecommerce" as Route },
      { label: "WordPress Development", href: "/web-development-services/wordpress" as Route },
      { label: "AMP Web Design", href: "/web-development-services/amp" as Route },
      { label: "Page Speed Optimisation", href: "/web-development-services/page-speed-optimisation" as Route },
      { label: "Shopify Developers", href: "/web-development-services/shopify" as Route },
      { label: "Magento Development", href: "/web-development-services/magento" as Route },
      { label: "Laravel Developers", href: "/web-development-services/laravel" as Route },
      { label: "Contentful Developers", href: "/web-development-services/contentful" as Route },
      { label: "Custom 3D Product Configurators", href: "/web-development-services/3d-configurators" as Route },
    ],
  },
  {
    heading: "SEO",
    links: [
      { label: "Search Engine Optimisation", href: "/seo-services" as Route },
      { label: "Answer Engine Optimisation", href: "/seo-services/aeo" as Route },
      { label: "SEO Audit Services", href: "/seo-services/seo-audit" as Route },
      { label: "Technical SEO", href: "/seo-services/technical-seo" as Route },
      { label: "On-Page SEO", href: "/seo-services/on-page-seo" as Route },
      { label: "Link Building", href: "/seo-services/link-building" as Route },
      { label: "Local SEO", href: "/seo-services/local-seo" as Route },
      { label: "E-commerce SEO", href: "/seo-services/ecommerce-seo" as Route },
      { label: "Shopify SEO", href: "/seo-services/shopify-seo" as Route },
      { label: "WordPress SEO", href: "/seo-services/wordpress-seo" as Route },
      { label: "Amazon SEO", href: "/seo-services/amazon-seo" as Route },
      { label: "Keyword Research", href: "/seo-services/keyword-research" as Route },
      { label: "Conversion Rate Optimisation", href: "/digital-marketing-services/cro" as Route },
      { label: "Google Analytics 4", href: "/digital-marketing-services/google-analytics-4" as Route },
    ],
  },
  {
    heading: "Digital Marketing",
    links: [
      { label: "Digital Marketing", href: "/digital-marketing-services" as Route },
      { label: "Marketing & Sales Automation", href: "/automation-services/marketing-sales-automation" as Route },
      { label: "PPC Management", href: "/digital-marketing-services/ppc" as Route },
      { label: "Social Media Management", href: "/digital-marketing-services/social-media-marketing" as Route },
      { label: "Email Marketing", href: "/digital-marketing-services/email-marketing" as Route },
      { label: "Content Marketing", href: "/digital-marketing-services/content-marketing" as Route },
      { label: "Influencer Marketing", href: "/digital-marketing-services/influencer-marketing" as Route },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookies-policy" },
];
