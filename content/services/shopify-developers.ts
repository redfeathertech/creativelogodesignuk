import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /shopify-developers, transcribed verbatim from
 * clduk/resources/views/user/shopify-developers/*.blade.php (the live page — see
 * _migration_backup/baseline/shopify-developers.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const shopifyDevelopersOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "Shopify Developers",
    "description": "Shopify development from Creative Logo Design — custom themes, app integrations and fast, reliable stores built to help your business sell more online."
  },
  "hero": {
    "eyebrow": "Shopify Developers",
    "breadcrumb": "Shopify Developers",
    "heading": "Your products are ready.",
    "headingAccent": "Is your Shopify store?",
    "lead": "Want a Shopify store that runs smoothly and helps you make more sales? We can build a custom solution just for your business. Our team creates reliable, scalable, and great-looking stores that make shopping easy for your customers.",
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
    "mediaAlt": "Shopify Development services from Creative Logo Design",
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
    "heading": "How It",
    "headingAccent": "Works",
    "lead": "Shopify development should be easy and straightforward. You can focus on running your business while we take care of the coding, integrations, and making sure your store performs well.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Pick Your Plan",
        "body": "Pick the development package that works best for you, whether you need a full store or just a few custom features. Find the right Shopify plan for your business.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Share Your Goals",
        "body": "Let us know what you need, like custom features, apps, or integrations, and we’ll build a solution just for you. Share your ideas and we’ll create a Shopify store that fits your vision.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Optimise",
        "body": "We build, test, and improve every part of your store. After launch, we keep an eye on performance and make updates as needed. Get a Shopify store that grows with your business.",
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
        "src": "/assets/img/services/_shared/1-2.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/2-2.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/3-2.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/4-2.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/5-2.webp",
        "width": 500,
        "height": 628
      },
      {
        "src": "/assets/img/services/_shared/6-2.webp",
        "width": 500,
        "height": 628
      }
    ]
  },
  "solutions": {
    "eyebrow": "What we do",
    "heading": "Sell more with a store",
    "headingAccent": "built to convert",
    "lead": "With custom Shopify development, your store is built to match your business needs. We add unique features and smooth integrations to boost performance and make shopping better for your customers. You get a store that looks good and helps you grow sales and loyalty.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Shopify Development workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "You Get",
    "lead": "Our Shopify developers make sure your store works well, is easy to use, and helps your business grow.",
    "items": [
      {
        "title": "Custom Theme Development",
        "body": "We design themes that match your brand and speak to your audience. Give your store a fresh look with a custom theme.",
        "image": {
          "src": "/assets/img/services/_shared/discover-user-insights.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "App Integrations",
        "body": "We add Shopify apps for inventory, marketing, shipping, and analytics. Make your store stronger with easy-to-use app integrations.",
        "image": {
          "src": "/assets/img/services/_shared/design-strategy.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Custom Features",
        "body": "We build features like advanced filters and better checkout options to help you boost sales and make your store easier to use. Add tools that turn visitors into loyal customers.",
        "image": {
          "src": "/assets/img/services/_shared/user-engagement.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Performance Optimisation",
        "body": "We create fast, mobile-friendly stores that make shopping easy for everyone. Get a Shopify store that loads quickly and helps you get more sales.",
        "image": {
          "src": "/assets/img/services/_shared/content-messaging.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Ongoing Support",
        "body": "We keep an eye on your store, make updates, and handle maintenance so your business keeps running smoothly. Count on us for ongoing support.",
        "image": {
          "src": "/assets/img/services/_shared/style-brand-guide.webp",
          "width": 634,
          "height": 410
        }
      }
    ]
  },
  "advantages": {
    "eyebrow": "By the numbers",
    "heading": "Advantages in",
    "headingAccent": "Numbers",
    "lead": "We’ve helped many businesses launch Shopify stores that show real results.",
    "stats": [
      {
        "label": "Happy Clients",
        "count": 50,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Shopify Projects Delivered",
        "count": 400,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Sales Growth",
        "count": 70,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Experience in Shopify Development",
        "count": 20,
        "prefix": "",
        "suffix": "+ Years"
      }
    ],
    "image": {
      "src": "/assets/img/services/_shared/right-img.png",
      "width": 428,
      "height": 510
    },
    "imageAlt": "Shopify Development results"
  },
  "whyChoose": {
    "eyebrow": "Why choose us",
    "heading": "Why Choose Creative Logo Design for",
    "headingAccent": "Shopify Development",
    "features": [
      {
        "title": "Diverse & Successful Portfolio",
        "body": "We build stores for fashion, tech, and beyond, balancing aesthetics and performance. Explore our successful Shopify development projects across industries."
      },
      {
        "title": "A Proven Process",
        "body": "Our clear process helps us work efficiently, keep changes to a minimum, and get the best results for you. Experience a step-by-step Shopify development process designed for success."
      },
      {
        "title": "Strong Digital Identity",
        "body": "Custom stores that reflect your brand and enhance trust and loyalty. Build a Shopify store that strengthens your brand identity."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "With years of experience and many happy clients, we’re a trusted Shopify development partner. Join other businesses that rely on our team for great results."
      },
      {
        "title": "Great Communication",
        "body": "We keep you updated, listen to your feedback, and work together with you during the whole process. You’ll always know what’s happening with your store."
      },
      {
        "title": "Unmatched Value",
        "body": "We offer affordable Shopify development with no hidden costs, so you get a high-performing store without surprises. Choose Shopify development that helps your business grow and shows real results."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our Shopify Development",
    "headingAccent": "Services",
    "lead": "Every store we build is custom-coded to fit your brand and business goals. We don’t use one-size-fits-all solutions.",
    "slides": [
      {
        "title": "Expert Shopify Builds",
        "body": "Our developers are experts at building custom Shopify Plus and standard stores that are unique to your brand and designed to convert visitors into customers.",
        "image": {
          "src": "/assets/img/services/shopify-web-design/selling.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Seamless Ecosystem Integration",
        "body": "We connect your Shopify store to your CRM, ERP, and marketing tools so everything works together smoothly.",
        "image": {
          "src": "/assets/img/services/shopify-web-design/customisation.webp",
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
    "lead": "Our step-by-step approach ensures your Shopify store performs well, grows with your business, and delivers a great experience to your customers.",
    "steps": [
      {
        "title": "Start of the Project",
        "body": "We begin by learning about your goals, audience, and needs to build a strong foundation for your Shopify store."
      },
      {
        "title": "Research & Analysis",
        "body": "We analyse competitors, user behaviour, and market trends to make informed development decisions that drive conversions."
      },
      {
        "title": "Wireframes & Prototypes",
        "body": "We design prototypes and mockups so you can preview your Shopify store and approve the look before development begins."
      },
      {
        "title": "Shopify Development",
        "body": "Our developers build your custom themes, features, and integrations with care, ensuring a Shopify store that works well and looks amazing."
      },
      {
        "title": "Testing & Launch",
        "body": "Before going live, we test everything—speed, security, and mobile responsiveness. Your Shopify store launches fully ready for customers."
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
    "heading": "Let’s build a Shopify store that",
    "headingAccent": "keeps on selling",
    "lead": "Tell us what your store needs to do and we’ll come back with a plan, a timeline and a straight answer on what it takes to build it.",
    "button": "Get a proposal"
  }
};
