import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /app-development, transcribed verbatim from
 * clduk/resources/views/user/app-development/*.blade.php (the live page — see
 * _migration_backup/baseline/app-development.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const appDevelopmentOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "App Development Services",
    "description": "App development from Creative Logo Design — iOS, Android and cross-platform apps built to be easy to use, quick to load and ready to grow with you."
  },
  "hero": {
    "eyebrow": "App Development",
    "breadcrumb": "App Development",
    "heading": "Choose a partner who builds apps",
    "headingAccent": "that last, not just apps that launch.",
    "lead": "At Creative Logo Design, we design and develop apps that combine functionality with experiences. So, that’s why the results are such Apps that people actually enjoy using and businesses truly benefit from.",
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
    "mediaAlt": "App Development services from Creative Logo Design",
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
    "heading": "How does it",
    "headingAccent": "work?",
    "lead": "We offer you several choices. Hence, you can pick one from them or have a custom-coded app tailored for you.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Choose Your Plan",
        "body": "Whatever you need, a simple app or something custom for your company, pick the most suitable plan for yourself.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Share Your Vision",
        "body": "Tell us how you envision your app. We’ll plan everything, from key features to any special tools you require.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Scale",
        "body": "We’ll get your beta version to you quickly, then continue refining it until your app is seamless, solid, and ready to serve your business as it expands.",
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
        "src": "/assets/img/services/app-development/mobile-app-1.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/app-development/mobile-app-2.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/app-development/mobile-app-3.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/app-development/mobile-app-4.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/app-development/mobile-app-5.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/app-development/mobile-app-6.webp",
        "width": 500,
        "height": 628
      }
    ]
  },
  "solutions": {
    "eyebrow": "What we do",
    "heading": "Let’s Build an App Your",
    "headingAccent": "Customers Will Actually Use",
    "lead": "Build an app that keeps users coming back. A great app is more than just code. It’s something people want to use every day. We mix easy-to-use design with strong development so your app looks good and works well. Let’s build an app your customers will love.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "App Development workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "you get",
    "lead": "We bring together creative ideas and technical know-how to build apps that really make a difference.",
    "items": [
      {
        "title": "Understand Your Market",
        "body": "We research your industry to build such an app that meets audience requirements.",
        "image": {
          "src": "/assets/img/services/app-development/understand-your-market.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Custom Development Strategy",
        "body": "A customised guide to make your app future-proof and scalable.",
        "image": {
          "src": "/assets/img/services/app-development/custom-development-strategy.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "User-Centered Design (UX/UI)",
        "body": "We create intuitive, engaging experiences that make users loyal.",
        "image": {
          "src": "/assets/img/services/app-development/user-centered-design-ui-ux.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Feature-Rich & Functional",
        "body": "From analytics to payments, we incorporate the tools your business requires.",
        "image": {
          "src": "/assets/img/services/app-development/feature-rich-functional.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "App Style & Guidelines",
        "body": "We make sure that your app has a consistent appearance and feel on every platform and device.",
        "image": {
          "src": "/assets/img/services/app-development/app-style-guidelines.webp",
          "width": 634,
          "height": 410
        }
      }
    ]
  },
  "advantages": {
    "eyebrow": "By the numbers",
    "heading": "Get more than just an app,",
    "headingAccent": "get a tool that helps your business grow.",
    "lead": "We have worked with tech and app development for years, helping brands grow by putting technology to work.",
    "stats": [
      {
        "label": "Apps Launched",
        "count": 150,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average App Store Rating",
        "count": 4.7,
        "prefix": "",
        "suffix": "★",
        "decimals": 1
      },
      {
        "label": "Integrations Implemented",
        "count": 300,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Years of Development",
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
    "imageAlt": "App Development results"
  },
  "whyChoose": {
    "eyebrow": "Apps that drive real results",
    "heading": "Why Choose Creative Logo Design for",
    "headingAccent": "App Development?",
    "features": [
      {
        "title": "Proven Portfolio",
        "body": "From retail/e-commerce applications to healthcare and enterprise platforms, our apps showcase a proven history across many industries."
      },
      {
        "title": "Strong Industry Reputation",
        "body": "With over 20 years in design and development, we have established a reputation for our work and are trusted by businesses from around the world as partners."
      },
      {
        "title": "Streamlined Process",
        "body": "Our processes are stringent but we maintain a clear, fast, and stress-free process that takes you through idea generation to launch."
      },
      {
        "title": "Future-Ready Apps",
        "body": "We aim to build apps with scalability in mind so that your application can grow at the pace of your business."
      },
      {
        "title": "Transparent Communication",
        "body": "We provide regular updates, so that you know what is happening throughout the entire project, and we encourage input at each step along the way."
      },
      {
        "title": "Unmatched Value",
        "body": "You receive top-of-the-line, custom-designed applications without the wear and tear on your wallet."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our App Development",
    "headingAccent": "Services",
    "lead": "We are more than just a design agency. We are your technology partner. Regardless of whether you are an iOS, Android, or cross-platform application, we help businesses ramp up their efforts with the right technology or tool. Don’t just develop an app.",
    "slides": [
      {
        "title": "Foundation",
        "body": "Web development turns your ideas into reality. We build strong, secure websites that fit your business and can grow with you.",
        "image": {
          "src": "/assets/img/services/app-development/foundation.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Performance",
        "body": "We handle everything from the look to the behind-the-scenes work, making sure your website runs well, loads quickly, and helps your business succeed.",
        "image": {
          "src": "/assets/img/services/app-development/performance.webp",
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
    "headingAccent": "process",
    "lead": "We combine smart planning and new ideas with strong code to create lasting apps. Our step-by-step process keeps everything on track.",
    "steps": [
      {
        "title": "Project Kick-Off",
        "body": "You will outline your project goals and business needs."
      },
      {
        "title": "Research & Planning",
        "body": "We will research your market, competitors, and users to determine which app is best suited to your user group."
      },
      {
        "title": "Wireframing & UX Design",
        "body": "We will design natural flows for users to want to engage with."
      },
      {
        "title": "Custom Development",
        "body": "Our team will code your app for speed, security & functionality."
      },
      {
        "title": "Testing & Optimisation",
        "body": "We will test the speed, security & user experience."
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
    "heading": "Let’s build an app your users",
    "headingAccent": "keep coming back to",
    "lead": "Tell us what your app needs to do and we’ll come back with a plan, a timeline and a straight answer on what it takes to build it.",
    "button": "Get a proposal"
  }
};
