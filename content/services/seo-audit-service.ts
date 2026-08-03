import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /seo-audit-service, transcribed verbatim from
 * clduk/resources/views/user/seo-audit-service/*.blade.php (the live page — see
 * _migration_backup/baseline/seo-audit-service.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const seoAuditServiceOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "seo audit service",
    "description": "SEO audit services from Creative Logo Design — technical, on-page, backlink and content checks with a clear plan to lift your rankings, traffic and leads."
  },
  "hero": {
    "eyebrow": "SEO Audit",
    "breadcrumb": "SEO Audit",
    "heading": "Get an SEO audit to uncover",
    "headingAccent": "real problems",
    "lead": "We take a close look at your website, checking everything from technical SEO and on-page setup to backlinks, content, and user experience. Our aim is to give you a clear plan that helps you rank higher, get more visitors, and turn them into customers.",
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
    "mediaAlt": "SEO Audit services from Creative Logo Design",
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
    "heading": "What to",
    "headingAccent": "Expect",
    "lead": "With an SEO audit, you can focus on running your business while we review your website and give you simple steps to get more leads.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Choose a Plan",
        "body": "Choose a complete audit plan to see where your site is standing right now.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Tell Us Your Goals",
        "body": "Tell us what matters most to you. We focus on the audit to highlight your priorities.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Take Action & Refine",
        "body": "Now you receive several recommendations and some actions to be taken to make it better. We take you through solutions that deliver outputs.",
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
    "heading": "SEO Audits That",
    "headingAccent": "Drive Success",
    "lead": "SEO audits help to identify technical problems and optimize on-page behaviors. They underline the new opportunities, competitiveness, and a clear and practical roadmap to sustainable online visibility, ranking the improvements and long-term business development.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "SEO Audit workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What’s in It",
    "headingAccent": "for You",
    "lead": "We ensure that your website works better, and you will get loyal customers.",
    "items": [
      {
        "title": "Detailed Technical SEO Checkup",
        "body": "We check on your site for errors, slow loading, and problems that can affect your search ranking.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/detailed-technical-seo-checkup.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "On-Page SEO Check",
        "body": "We review titles, descriptions, headings, content structure, and keyword use to boost SEO performance.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/on-page-seo-check.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Backlink and Authority Check",
        "body": "We review your backlinks to spot any bad links, find new chances to grow, and help you build more authority online.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/backlink-and-authority-check.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Content Review",
        "body": "We check how your content is performing and look for ways to help it reach more people and get better results.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/content-review.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Competitor Research",
        "body": "We look at what your competitors are doing so you can stay ahead and reach more customers.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/competitor-research.webp",
          "width": 634,
          "height": 410
        }
      }
    ]
  },
  "advantages": {
    "eyebrow": "By the numbers",
    "heading": "Benefits That",
    "headingAccent": "Count",
    "lead": "Over the years, our SEO audits have helped many businesses fix issues, find new opportunities, and grow.",
    "stats": [
      {
        "label": "Clients’ Helped",
        "count": 60,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Audits Completed",
        "count": 500,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Boost in Traffic",
        "count": 68,
        "prefix": "",
        "suffix": " percent"
      },
      {
        "label": "Experience",
        "count": 20,
        "prefix": "Over ",
        "suffix": " years in SEO and online marketing"
      }
    ],
    "image": {
      "src": "/assets/img/services/_shared/right-img.png",
      "width": 428,
      "height": 510
    },
    "imageAlt": "SEO Audit results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "Why Choose Creative Logo Design to Conduct Your",
    "headingAccent": "SEO Audits?",
    "features": [
      {
        "title": "Wide-Ranging and Results-Driven Experience",
        "body": "We’ve helped all kinds of businesses grow, improve their rankings, and bring more visitors."
      },
      {
        "title": "Strong Reputation in the Industry",
        "body": "Our experience and satisfied clients show that you can count on us for your SEO audit needs."
      },
      {
        "title": "A Clear and Effective Method",
        "body": "We follow a clear process that checks your site’s stats, your competitors, and the things on which we need to work on."
      },
      {
        "title": "Smart Digital Insights",
        "body": "We share ideas to help your website show up more in search, get noticed, and improve your online strategy."
      },
      {
        "title": "Clear Communication",
        "body": "We keep you in the loop at every stage. Our reports are simple to follow, and we explain each suggestion clearly."
      },
      {
        "title": "Top Value",
        "body": "Our SEO audits give you affordable tips to boost your rankings and traffic, with no hidden costs."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our SEO Audit",
    "headingAccent": "Services",
    "lead": "We focus our SEO audits on your website. Every report is detailed, practical, and designed to help you succeed for the long term.",
    "slides": [
      {
        "title": "SEO Audit Services",
        "body": "We cover technical checks, on-page reviews, backlinks, content, and competitor analysis. We provide information with clear steps.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/seo-audit-services.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Website check",
        "body": "An SEO audit shows what’s stopping your website from reaching its best. We check your site’s performance, content, and technical details to find ways to improve.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/website-check.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Action plan",
        "body": "Our audit gives you clear steps to take. We provide a plan to fix problems and help your website reach its full SEO potential.",
        "image": {
          "src": "/assets/img/services/seo-audit-service/action-plan.webp",
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
    "heading": "Our",
    "headingAccent": "method",
    "lead": "Our simple formula is based on providing you with practical advice that helps to strengthen your SEO using our technical knowledge and competitor research.",
    "steps": [
      {
        "title": "Kicking Things Off",
        "body": "You have to decide what you want to accomplish, and what you really want the audit to be and we start with a plan of what you want to accomplish and what you want the audit to be."
      },
      {
        "title": "Research and Investigation",
        "body": "We analyse your site, we look at your competitors, and we look at trends to identify challenges and new opportunities."
      },
      {
        "title": "Site Assessment and Reporting",
        "body": "We provide you with a report on what is working and what requires attention on and off your site."
      },
      {
        "title": "Action Plan and Strategy",
        "body": "We identify the most significant corrections, and we also establish a clear roadmap to ensure that you can achieve tangible results in SEO."
      },
      {
        "title": "Ongoing Support and Monitoring",
        "body": "We help you in the process of making changes and monitor your progress to make sure that you record the permanent changes to your SEO."
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
    "heading": "Let’s find out what’s holding your",
    "headingAccent": "rankings back",
    "lead": "Tell us which pages need to rank, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
    "button": "Get a proposal"
  }
};
