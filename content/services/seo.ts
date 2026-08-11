import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /seo, transcribed verbatim from
 * clduk/config/services_content/seo.php. Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 *
 * `/seo` itself was retired — the SEO plan's URL table has no slot for it, and
 * it now 301s to the `/seo-services` pillar (content/legacy-redirects.json).
 * This module stays because it is still verified against the live baseline by
 * scripts/verify-content-parity.py AND because it is the base every placeholder
 * in ./seo-placeholders clones. Do not edit it to suit those pages.
 */
export const seoOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "SEO",
    "description": "Complete SEO services from Creative Logo Design — on-page, technical and link building that boost your rankings, traffic and leads for long-term growth."
  },
  "hero": {
    "eyebrow": "SEO",
    "breadcrumb": "SEO",
    "heading": "Why learn SEO when we can handle",
    "headingAccent": "everything for you?",
    "lead": "We provide complete SEO services. This includes on-page, off-page optimisation, technical SEO, content strategy, link building, and more. We cover it all.",
    "banner": {
      "src": "/assets/img/services/_shared/branding-banner.png",
      "width": 1729,
      "height": 887
    },
    "media": {
      "src": "/assets/img/services/_shared/branding-services.png",
      "width": 529,
      "height": 404
    },
    "mediaAlt": "SEO services from Creative Logo Design",
    "ctaPrimary": "Hire us",
    "ctaSecondary": "Talk to a strategist",
    "tiles": [
      {
        "label": "Mobile App",
        "slug": "app-development",
        "icon": {
          "src": "/assets/img/services/_shared/app-development.webp",
          "width": 500,
          "height": 628
        }
      },
      {
        "label": "Website",
        "slug": "web-designing",
        "icon": {
          "src": "/assets/img/services/_shared/website.webp",
          "width": 500,
          "height": 628
        }
      },
      {
        "label": "Branding",
        "slug": "branding",
        "icon": {
          "src": "/assets/img/services/_shared/branding.webp",
          "width": 500,
          "height": 628
        }
      },
      {
        "label": "Social Media",
        "slug": "social-media-management",
        "icon": {
          "src": "/assets/img/services/_shared/social-media.webp",
          "width": 500,
          "height": 628
        }
      }
    ]
  },
  "howItWorks": {
    "eyebrow": "How it works",
    "heading": "Pick the SEO plan that brings results,",
    "headingAccent": "not just numbers",
    "lead": "SEO should make your growth easier so you can focus on your business while we optimise your website, content, and make a strategy to boost traffic, leads, and sales.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Choose Your SEO Plan",
        "body": "Pick a plan that matches your goals or go for a custom solution based on what your business needs.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Tell Us Your Goals",
        "body": "Tell us about your expectations. We’ll develop an SEO plan to meet your needs.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Start & Fine-tune",
        "body": "We put SEO best practices upfront and monitor how well they work for you.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-3.svg",
          "width": 73,
          "height": 116
        }
      }
    ],
    "workHeading": "Our recent work",
    "workImages": [
      {
        "src": "/assets/img/services/_shared/01.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/02.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/03.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/04.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/05.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/06.webp",
        "width": 500,
        "height": 628
      }
    ]
  },
  "solutions": {
    "eyebrow": "What we do",
    "heading": "SEO Solutions That",
    "headingAccent": "Get Results",
    "lead": "SEO is more than just keywords. It’s a long-term strategy for growth. We optimize your website to improve its ranking and attract more visitors. This helps convert traffic into loyal customers. You gain sustainable visibility, increased engagement, and measurable business results across search engines.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "SEO workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What’s In It",
    "headingAccent": "For You",
    "lead": "Our SEO work helps companies to be seen more online. It helps to get good leads and sell more.",
    "items": [
      {
        "title": "Keyword Study & Plan",
        "body": "We research powerful keywords and strategize to rank on the terms your customers are targeting, as intent leads to sales.",
        "image": {
          "src": "/assets/img/services/seo/keyword-study-plan.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "On-Page SEO Optimisation",
        "body": "We improve the metatags of content, headings, and images to improve ranking in the search engines.",
        "image": {
          "src": "/assets/img/services/seo/on-page-seo-optimisation.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Technical SEO",
        "body": "We make websites fast, mobile-friendly, and secure.",
        "image": {
          "src": "/assets/img/services/seo/technical-seo.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Content Marketing & Blogging",
        "body": "We create quality content that places your site on page one of the search engine.",
        "image": {
          "src": "/assets/img/services/seo/content-marketing-blogging.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Link-Building & Authority",
        "body": "We create powerful backlinks to build domain authority. We also outsource high-quality backlinks to get good results.",
        "image": {
          "src": "/assets/img/services/seo/link-building-authority.webp",
          "width": 634,
          "height": 410
        }
      }
    ]
  },
  "advantages": {
    "eyebrow": "By the numbers",
    "heading": "Discover how SEO can revolutionise",
    "headingAccent": "your online presence.",
    "lead": "Over the years, we have helped companies to promote their visibility, traffic, and revenue through effective SEO strategies that have been proven to work.",
    "stats": [
      {
        "label": "Clients’ Served",
        "count": 60,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "SEO Campaigns Delivered",
        "count": 350,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Traffic Increase",
        "count": 70,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Years in digital marketing",
        "count": 20,
        "prefix": "",
        "suffix": "+"
      }
    ],
    "image": {
      "src": "/assets/img/services/_shared/right-img.png",
      "width": 428,
      "height": 510
    },
    "imageAlt": "SEO results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "Why Choose Creative Logo Design for",
    "headingAccent": "SEO Services?",
    "features": [
      {
        "title": "Diverse & Successful Portfolio",
        "body": "We run SEO campaigns in many industries. We boost rankings, traffic, and conversions for companies of all sizes."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "Our decades of work and hundreds of satisfied customers make us a reliable partner for search engine optimization."
      },
      {
        "title": "A Proven Process",
        "body": "Our structured approach, from audit to strategy to action, yields measurable SEO outcomes."
      },
      {
        "title": "Strong Digital Identity",
        "body": "We enhance your online presence to boost your brand, credibility, and customer confidence."
      },
      {
        "title": "Great Communication",
        "body": "We update you on the progress at each step through open communication and teamwork. We will also provide monthly updates."
      },
      {
        "title": "Top-notch Value",
        "body": "Our SEO work leads to long-term growth, and it also provides great returns from time to time."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our SEO",
    "headingAccent": "Work",
    "lead": "We create custom SEO plans for big and small companies. We provide just proven methods to boost search rankings and expand your online reach.",
    "slides": [
      {
        "title": "Visibility",
        "body": "SEO helps people find your business online. We improve your website so it ranks higher, gets more visitors, and grows your online presence.",
        "image": {
          "src": "/assets/img/services/seo/visibility.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Performance",
        "body": "We handle everything from keywords to technical fixes. Our proven strategies help your business stay visible and get real results.",
        "image": {
          "src": "/assets/img/services/seo/performance.webp",
          "width": 2154,
          "height": 1467
        }
      }
    ]
  },
  "clients": {
    "logos": null
  },
  "process": {
    "eyebrow": "Our process",
    "heading": "How we",
    "headingAccent": "work",
    "lead": "We take a step-by-step approach that mixes analysis, improvement, and reporting to deliver clear and lasting SEO results.",
    "steps": [
      {
        "title": "Start of the project",
        "body": "We set the goals, keep track of the site, and fashion a plan that achieves your business goals down the line."
      },
      {
        "title": "Research & analysis",
        "body": "To identify growth opportunities, we study competitors, keywords, and search patterns."
      },
      {
        "title": "On-page / technical optimization",
        "body": "We do improve the structure, content, and technical features of the website to improve search engine visibility."
      },
      {
        "title": "Content strategy/link-building",
        "body": "We have great content and backlinks that are ranked among the top, which will assist in providing your internet presence a boost."
      },
      {
        "title": "Tracking & optimisation",
        "body": "We monitor performance, provide you with results, and improve strategies to continue making your SEO even better."
      }
    ]
  },
  "capabilities": {
    "eyebrow": "Capabilities",
    "heading": "We have extensive experience in",
    "headingAccent": "the following",
    "items": [
      "WordPress design",
      "Website development",
      "Digital strategy",
      "Digital marketing",
      "CMS training",
      "E-commerce"
    ]
  },
  "cta": {
    "eyebrow": "Ready when you are",
    "heading": "Let’s turn your traffic into",
    "headingAccent": "loyal customers",
    "lead": "Tell us where your rankings stand today and we’ll come back with a full SEO audit, a clear strategy and a straight answer on what it takes to grow.",
    "button": "Get a proposal"
  }
};
