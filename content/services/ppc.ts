import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /ppc, transcribed verbatim from
 * clduk/config/services_content/ppc.php. Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const ppcOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "PPC / Google Ads",
    "description": "PPC management from Creative Logo Design — targeted campaigns that turn clicks into loyal customers, cut wasted spend and grow your return on ad spend."
  },
  "hero": {
    "eyebrow": "PPC",
    "breadcrumb": "PPC",
    "heading": "Want to turn 100 pounds or dollars",
    "headingAccent": "into 1000 with PPC?",
    "lead": "Why settle for average results? With professional PPC management, you can get more value from your ad spend. Our approach brings quick traffic and a better return on investment, helping your business grow faster.",
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
    "mediaAlt": "PPC services from Creative Logo Design",
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
    "heading": "How does",
    "headingAccent": "it work?",
    "lead": "PPC campaign management should be focused on results while ensuring efficiency.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Choose your plan",
        "body": "Pick the PPC package that works best for your budget, platforms, and business objectives.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Set Your Goals",
        "body": "Let us know your goals, whether you want more leads, higher sales, or greater brand awareness. We’ll create a plan to help you reach them.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Improve",
        "body": "Once your campaigns are live, we track their performance and make improvements to get the best results.",
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
    "heading": "PPC Services That",
    "headingAccent": "Drive Success",
    "lead": "We do more than just run PPC campaigns. Our goal is to turn clicks into loyal customers. We work to increase conversions, cut wasted spend, and make sure your investment leads to real growth and lasting results.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "PPC workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Our benefits",
    "heading": "What",
    "headingAccent": "you gain",
    "lead": "Our PPC services make every dollar you spend give you real results, such as more leads and even sales, to help your business grow.",
    "items": [
      {
        "title": "Researching Keywords and Competitors",
        "body": "We find the best keywords and analyse competitor sites to increase campaign performance.",
        "image": {
          "src": "/assets/img/services/ppc/researching-keywords-and-competitors.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Planning and Strategy for Campaigns",
        "body": "We create strong ads and smart targeting strategies that get great results.",
        "image": {
          "src": "/assets/img/services/ppc/planning-and-strategy-for-campaigns.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Writing Ads That Sell",
        "body": "We write ads to turn people viewing them into loyal customers.",
        "image": {
          "src": "/assets/img/services/ppc/writing-ads-that-sell.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Tracking and Improving Campaigns",
        "body": "We use campaign data to improve our process and get better results for you.",
        "image": {
          "src": "/assets/img/services/ppc/tracking-and-improving-campaigns.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Reporting & Insights",
        "body": "You’ll get clear reports that show trends and include practical recommendations you can use.",
        "image": {
          "src": "/assets/img/services/ppc/reporting-insights.webp",
          "width": 634,
          "height": 410
        }
      }
    ]
  },
  "advantages": {
    "eyebrow": "By the numbers",
    "heading": "Advantages in",
    "headingAccent": "numbers",
    "lead": "We handle PPC campaigns that produce tangible outcomes across all types of industries.",
    "stats": [
      {
        "label": "Satisfied clients",
        "count": 50,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Campaigns",
        "count": 400,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "ROI grows",
        "count": 75,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Experience",
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
    "imageAlt": "PPC results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "Why pick Creative Logo Design",
    "headingAccent": "for PPC?",
    "features": [
      {
        "title": "Broad and Effective Portfolio",
        "body": "We’ve worked with businesses in many industries and adjust ad budgets to get the best return. Take a look at our proven PPC results that help companies grow for the long term."
      },
      {
        "title": "Trusted Industry Leader",
        "body": "With years of experience and a large client base, our PPC knowledge speaks for itself."
      },
      {
        "title": "A Reliable Process",
        "body": "Our step-by-step strategies are designed to get results from day one. Rely on our proven PPC methods to achieve real success."
      },
      {
        "title": "Strong Online Reach",
        "body": "We help you reach your audience and build trust online. Grow your presence with effective PPC."
      },
      {
        "title": "Open Communication",
        "body": "We keep you informed with regular updates, reports, and advice. You’ll always know how your campaigns are doing."
      },
      {
        "title": "Exceptional Value",
        "body": "Our PPC campaigns are cost-effective and focused on results, giving you high returns without hidden fees. Invest in PPC and watch your business grow."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our PPC management",
    "headingAccent": "services",
    "lead": "We create campaigns that match your business, audience, and goals. Instead of using generic templates, we build custom strategies to get you the best results.",
    "slides": [
      {
        "title": "Growth",
        "body": "PPC management ensures your ads reach the right audience at the right time. We craft targeted campaigns designed to drive traffic and sales.",
        "image": {
          "src": "/assets/img/services/ppc/growth.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Value",
        "body": "We take care of everything, from keyword research to ad optimization. Our strategies help you spend less on wasted clicks and get more value from your ads.",
        "image": {
          "src": "/assets/img/services/ppc/value.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Competition",
        "body": "We constantly monitor and adjust your ads to keep you ahead of the competition. This means more visibility, more leads, and real business growth.",
        "image": {
          "src": "/assets/img/services/ppc/competition.webp",
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
    "lead": "Our clear process helps us run effective campaigns that get real results for your business.",
    "steps": [
      {
        "title": "Kickoff stage",
        "body": "We start by setting clear goals and understanding your audience to build a strong foundation. Tell us what you want to achieve, and we’ll help you get there."
      },
      {
        "title": "Research and strategy",
        "body": "We study your audience, look at your competitors, and find the best keywords. These insights help us shape the right PPC strategies for you."
      },
      {
        "title": "Campaign development",
        "body": "We build ad groups, write ads, and design visuals that get results. Our campaigns are made to engage your audience and turn them into customers."
      },
      {
        "title": "Launch and adjustment",
        "body": "We launch your campaigns and fine-tune targeting, bids, and ads to get the best possible results."
      },
      {
        "title": "Monitoring & reporting",
        "body": "We track your campaign’s performance, provide clear reports, and make changes to keep improving results. With our experience, we help you grow and scale your PPC success."
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
    "heading": "Let’s turn your clicks into",
    "headingAccent": "loyal customers",
    "lead": "Tell us your goals and your budget and we’ll come back with a PPC plan, projected returns and a straight answer on what your ad spend can achieve.",
    "button": "Get a proposal"
  }
};
