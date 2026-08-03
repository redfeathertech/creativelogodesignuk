import type { ServiceContent } from "./types";

/**
 * Section-level defaults shared by every service page, transcribed verbatim
 * from clduk/config/services_content/_defaults.php. Per-service files in this
 * directory override individual sections; unspecified sections (and, within an
 * overridden section, unspecified keys) fall back to these values via the
 * one-level-deep merge in index.ts.
 */
export const serviceDefaults: ServiceContent = {
  "meta": {
    "title": "Our Services",
    "description": ""
  },
  "hero": {
    "eyebrow": "Our services",
    "breadcrumb": "Services",
    "heading": "Ready to give your business the presence",
    "headingAccent": "it deserves?",
    "lead": "Creative Logo Design helps UK businesses stand out with design, development and marketing that customers trust and remember.",
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
    "mediaAlt": "Work by Creative Logo Design",
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
    "heading": "Our simple",
    "headingAccent": "three-step process",
    "lead": "A straightforward process, so you can focus on the other important things.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Pick your plan",
        "body": "Choose the package that suits you. Everything is customisable and adaptable to your needs — and if you want something bespoke, we can do that too.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Tell us your goals",
        "body": "Share your thoughts and requests online. We can help with everything from a small update to a full project.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Get and improve",
        "body": "We come back with ideas within 24 to 48 hours, and you can request as many changes as you like until you are happy.",
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
        "src": "/assets/img/services/_shared/1.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/2.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/3.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/4.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/5.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/6.webp",
        "width": 500,
        "height": 628
      }
    ]
  },
  "solutions": {
    "eyebrow": "What we do",
    "heading": "Solutions built around",
    "headingAccent": "your business",
    "lead": "We take the time to understand your goals, then put the right mix of design, technology and strategy behind them.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Creative Logo Design workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "you get",
    "lead": "We blend creativity and strategy to help your business shine.",
    "items": [
      {
        "title": "Discover Your Market",
        "body": "We help you spot new opportunities in your industry.",
        "image": {
          "src": "/assets/img/services/_shared/wet-u-get-serv.png",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Brand Strategy",
        "body": "A clear plan to help your brand get noticed and respected.",
        "image": {
          "src": "/assets/img/services/_shared/brand-strategy.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Brand Positioning",
        "body": "We help you discover what will make your business truly appealing.",
        "image": {
          "src": "/assets/img/services/_shared/brand-positioning.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Brand Messaging",
        "body": "We help you tell your story in a way that’s clear, meaningful and memorable.",
        "image": {
          "src": "/assets/img/services/_shared/brand-messaging.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Brand Style Guide",
        "body": "Make sure your brand looks and sounds great everywhere your customers find you.",
        "image": {
          "src": "/assets/img/services/_shared/brand-style-guide.webp",
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
    "lead": "We’re proud of the results we’ve achieved — happy clients, worldwide brands, millions in revenue and over two decades of creative experience.",
    "stats": [
      {
        "label": "Clients’ satisfaction",
        "count": 40,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Clients worldwide",
        "count": 230,
        "prefix": "",
        "suffix": "+ brands"
      },
      {
        "label": "Revenue generated",
        "count": 29,
        "prefix": "£",
        "suffix": " million"
      },
      {
        "label": "Years of experience",
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
    "imageAlt": "Results by Creative Logo Design"
  },
  "whyChoose": {
    "eyebrow": "Brands that make an impact",
    "heading": "Why choose",
    "headingAccent": "Creative Logo Design?",
    "features": [
      {
        "title": "Successful Portfolio",
        "body": "Look through our portfolio and you’ll find it full of brands we’ve helped build."
      },
      {
        "title": "Strong Digital Identity",
        "body": "We make your brand identity strong — it’s what every brand needs to reach the next level."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "Creative Logo Design has been a trusted partner for businesses for more than 20 years."
      },
      {
        "title": "Great Communication",
        "body": "We believe in clear communication, so you always know what’s going on and can give input easily."
      },
      {
        "title": "A Proven Process",
        "body": "From getting to know your business to launch, our process keeps things simple and stress-free."
      },
      {
        "title": "Unmatched Value",
        "body": "High-quality work that’s creative and effective, without charging more than your business is worth."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our",
    "headingAccent": "services",
    "lead": "We’re a full-service agency, not just a design studio. We help businesses make lasting impressions — from strategy and identity through to websites and marketing.",
    "slides": []
  },
  "clients": {
    "logos": null
  },
  "process": {
    "eyebrow": "Our process",
    "heading": "Built step by step,",
    "headingAccent": "every time",
    "lead": "We blend creativity, smart strategy and real-world insight. Our step-by-step approach means you get impactful results every time.",
    "steps": []
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
    "heading": "Let’s build something people",
    "headingAccent": "remember",
    "lead": "Tell us where you want to take your business and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
    "button": "Get a proposal"
  }
} as const;
