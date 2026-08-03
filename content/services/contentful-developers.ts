import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /contentful-developers, transcribed verbatim from
 * clduk/resources/views/user/contentful-developers/*.blade.php (the live page — see
 * _migration_backup/baseline/contentful-developers.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const contentfulDevelopersOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "Contentful Developers",
    "description": "Contentful development from Creative Logo Design — custom workflows, API integrations and headless CMS builds that publish your content everywhere."
  },
  "hero": {
    "eyebrow": "Contentful Development",
    "breadcrumb": "Contentful Development",
    "heading": "Build once, publish everywhere.",
    "headingAccent": "That’s the magic of Contentful",
    "lead": "Our Contentful developers create custom workflows, integrations, and headless CMS solutions designed for your business. We handle everything from API connections to content delivery, making sure your Contentful setup is fast, flexible, and ready to grow with you.",
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
    "mediaAlt": "Contentful Development services from Creative Logo Design",
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
    "heading": "How it",
    "headingAccent": "work?",
    "lead": "Contentful development should be easy and focused on results. You can focus on your content while we take care of the technical side to help you see real improvements.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Pick your plan",
        "body": "Pick a Contentful development package that matches your project needs and goals. We’ll help you find the right plan for your business.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Share your Goals",
        "body": "Let us know your goals, whether it’s setting up a CMS, building a headless system, or delivering content across channels. We’ll work with you to create a Contentful workflow that fits your vision.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Optimise",
        "body": "We implement, test, and fine-tune your Contentful setup. Post-launch, we monitor performance and optimise continuously. Launch a flexible, scalable Contentful solution that grows with your business.",
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
    "heading": "Contentful Solutions That",
    "headingAccent": "Deliver Results",
    "lead": "With custom Contentful development, managing your content becomes easier and more flexible. We build workflows that make publishing simple, speed up delivery, and help you reach your audience everywhere. You get efficient management, better scalability, and a digital setup ready for the future.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Contentful Development workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "you get",
    "lead": "Our Contentful solutions focus on flexibility, scalability, and efficiency.",
    "items": [
      {
        "title": "Custom CMS Development",
        "body": "We build workflows, APIs, and integrations tailored to your content needs. Transform your content strategy with custom Contentful development.",
        "image": {
          "src": "/assets/img/services/content-management-systems/user-insights-workflow-analysis.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Multi-Channel Delivery",
        "body": "Share your content easily on web, mobile, and other platforms. We make sure your message stays consistent everywhere.",
        "image": {
          "src": "/assets/img/services/content-management-systems/custom-design-functionality.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "API & Third-Party Integration",
        "body": "Link Contentful to your other platforms, CRMs, and e-commerce tools. We help you connect everything for smooth, easy workflows.",
        "image": {
          "src": "/assets/img/services/content-management-systems/seamless-integration.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Performance Optimisation",
        "body": "We build CMS setups that are fast, responsive, and secure. Our team helps you get the best performance and easy-to-use systems with Contentful.",
        "image": {
          "src": "/assets/img/services/content-management-systems/content-permissions-management.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Ongoing Support & Maintenance",
        "body": "We keep your Contentful system updated, secure, and working well. Count on us to make sure your CMS runs smoothly with our expert support.",
        "image": {
          "src": "/assets/img/services/content-management-systems/brand-consistency.webp",
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
    "lead": "We’ve worked with businesses to set up Contentful CMS and have seen real, measurable results.",
    "stats": [
      {
        "label": "Happy Clients",
        "count": 40,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "CMS Projects Delivered",
        "count": 150,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Workflow Efficiency Increase",
        "count": 70,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Experience",
        "count": 15,
        "prefix": "",
        "suffix": "+ years in headless CMS development"
      }
    ],
    "image": {
      "src": "/assets/img/services/_shared/right-img.png",
      "width": 428,
      "height": 510
    },
    "imageAlt": "Contentful Development results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "Why Choose Creative Logo Design for",
    "headingAccent": "Contentful Development?",
    "features": [
      {
        "title": "Diverse & Successful Portfolio",
        "body": "We create CMS solutions for many industries, always focusing on performance, scalability, and flexibility. Take a look at our successful Contentful projects in different fields."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "With years of experience and many happy clients, we’re a trusted Contentful partner. Work with a team known for being reliable and skilled."
      },
      {
        "title": "A Proven Process",
        "body": "Our structured workflows help us develop efficiently, keep revisions low, and get the best results. See how our proven Contentful process delivers great outcomes."
      },
      {
        "title": "Strong Digital Identity",
        "body": "Our CMS solutions show off your brand, build trust, and help you connect with your audience. Let’s create Contentful solutions that make your brand stand out."
      },
      {
        "title": "Great Communication",
        "body": "We keep you updated, listen to your feedback, and work closely with you during the whole process. You’ll always know what’s happening with clear communication."
      },
      {
        "title": "Unmatched Value",
        "body": "Our Contentful development is affordable and high-quality, with no hidden fees. Invest in solutions that bring real results and can grow with your business."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our Contentful Development",
    "headingAccent": "Services",
    "lead": "Every CMS solution we build is custom-coded for your business and designed to be fast, flexible, and ready to scale.",
    "slides": [
      {
        "title": "Headless CMS Implementation",
        "body": "We create agile front-ends that use Contentful, so you can manage and publish content everywhere with ease.",
        "image": {
          "src": "/assets/img/services/content-management-systems/easy-management.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Future-Proof Your Content",
        "body": "Separate your content from your front-end for more flexibility. This lets you publish easily to websites, apps, and even IoT devices.",
        "image": {
          "src": "/assets/img/services/content-management-systems/flexible-solutions.webp",
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
    "lead": "Our step-by-step approach helps us deliver Contentful solutions that are efficient, scalable, and perform well.",
    "steps": [
      {
        "title": "Start of the Project",
        "body": "We start by setting clear goals, planning the architecture, and understanding your content needs. Share your project goals and let’s get started together."
      },
      {
        "title": "Research & Analysis",
        "body": "We look at your content, workflows, and technical needs to find the best solutions. These insights help us make the right choices for your Contentful project."
      },
      {
        "title": "Wireframes & Prototypes",
        "body": "Design workflows, page structures, and validate content models before full-scale implementation. Visualize your Contentful solution before development begins."
      },
      {
        "title": "Development & Integration",
        "body": "We build custom Contentful workflows, APIs, and integrations to give you flexible and scalable solutions. Contentful systems that perform flawlessly and scale easily."
      },
      {
        "title": "Testing & Launch",
        "body": "We test everything for performance, security, and functionality before launch. You can launch your Contentful solution with confidence, knowing it’s ready to go."
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
    "heading": "Let’s build a Contentful setup that",
    "headingAccent": "publishes everywhere",
    "lead": "Tell us what your content needs to do, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
    "button": "Get a proposal"
  }
};
