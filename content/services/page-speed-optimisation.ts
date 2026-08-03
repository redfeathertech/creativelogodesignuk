import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /page-speed-optimisation, transcribed verbatim from
 * clduk/resources/views/user/page-speed-optimization/*.blade.php (the live page
 * — see _migration_backup/baseline/page-speed-optimisation.html). Merged one
 * level deep, per section, over serviceDefaults in index.ts.
 */
export const pageSpeedOptimisationOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "Page Speed Optimization",
    "description": "Page speed optimisation from Creative Logo Design — faster pages that keep visitors on your site, lift search rankings and turn more of that traffic into sales."
  },
  "hero": {
    "eyebrow": "Page Speed Optimisation",
    "breadcrumb": "Page Speed Optimisation",
    "heading": "Slow sites kill sales",
    "headingAccent": "supercharge yours today.",
    "lead": "We help all kinds of websites load faster, whether you run an online store, a company site, a blog, or a portfolio. Faster pages mean fewer visitors leave, better search rankings, and more sales for your business.",
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
    "mediaAlt": "Page Speed Optimisation services from Creative Logo Design",
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
    "lead": "Improving your site’s speed is easy with us. You focus on your business while we take care of the technical details to make your pages load faster.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Pick Your Plan",
        "body": "Pick a package based on your site's size, traffic, and goals. Choose the plan to speed up your website.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Share Your Goals",
        "body": "Tell us what you want to achieve, like faster loading times, more visitors staying on your site, or better search rankings. We’ll create a plan just for you to help your website perform better.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Optimise",
        "body": "We make changes, test performance, and fine-tune for maximum speed and efficiency. Launch a fast, engaging website.",
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
    "heading": "Speed Solutions That",
    "headingAccent": "Deliver Results",
    "lead": "Optimised page speed improves user experience, SEO, and conversion rates. We combine advanced tools, best coding practices, and detailed analysis for measurable results. Get a website that loads instantly, retains users, and ranks higher in search engines.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Page Speed Optimisation workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "You Get",
    "lead": "We make your website faster, easier to use, and ready to perform at its best.",
    "items": [
      {
        "title": "Performance Audits",
        "body": "We look for anything that’s slowing your site down, like heavy scripts or outdated resources. Fixing these helps your website work at its best.",
        "image": {
          "src": "/assets/img/services/website-maintenance/pro-active-monitoring.webp",
          "width": 633,
          "height": 410
        }
      },
      {
        "title": "Image & Media Optimisation",
        "body": "We shrink image sizes, load videos only when needed, and make sure your content looks great without slowing things down.",
        "image": {
          "src": "/assets/img/services/website-maintenance/regular-backup.webp",
          "width": 633,
          "height": 410
        }
      },
      {
        "title": "Code & Script Optimisation",
        "body": "We clean up your site’s code so it runs faster, without changing how it looks or works.",
        "image": {
          "src": "/assets/img/services/website-maintenance/performance-optimization.webp",
          "width": 633,
          "height": 410
        }
      },
      {
        "title": "Caching & CDN Integration",
        "body": "We set up tools that help your website load quickly for visitors everywhere, no matter where they are in the world.",
        "image": {
          "src": "/assets/img/services/website-maintenance/content-design-updates.webp",
          "width": 633,
          "height": 410
        }
      },
      {
        "title": "Continuous Monitoring & Reporting",
        "body": "We keep an eye on your site’s speed and share regular updates so you always know how it’s performing.",
        "image": {
          "src": "/assets/img/services/website-maintenance/transparent-reporting.webp",
          "width": 633,
          "height": 410
        }
      }
    ]
  },
  "advantages": {
    "eyebrow": "By the numbers",
    "heading": "Advantages",
    "headingAccent": "in Numbers",
    "lead": "Our work has helped websites load faster, rank higher in search, and keep visitors interested.",
    "stats": [
      {
        "label": "Happy Clients",
        "count": 60,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Websites Optimised",
        "count": 500,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Page Load Reduction",
        "count": 70,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Experience in Performance Optimisation",
        "count": 20,
        "prefix": "",
        "suffix": "+ years"
      }
    ],
    "image": {
      "src": "/assets/img/services/_shared/right-img.png",
      "width": 428,
      "height": 510
    },
    "imageAlt": "Page Speed Optimisation results"
  },
  "whyChoose": {
    "eyebrow": "Why choose Creative Logo Design",
    "heading": "For",
    "headingAccent": "Page Speed Optimisation",
    "features": [
      {
        "title": "Diverse & Successful Portfolio",
        "body": "We’ve worked with all kinds of businesses to make their websites faster and help them get more customers. Take a look at some of our success stories."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "With over 20 years of experience and many happy clients, people around the world trust us to make their websites faster. Work with a team that knows how to deliver results."
      },
      {
        "title": "A Proven Process",
        "body": "From the first check to the final launch, our process is designed to get your site running faster. See real improvements every step of the way."
      },
      {
        "title": "Strong Digital Presence",
        "body": "A faster website means happier visitors and better search rankings. Let’s help your business stand out online."
      },
      {
        "title": "Great Communication",
        "body": "We’ll keep you in the loop with clear updates and easy-to-understand reports as we work on your site."
      },
      {
        "title": "Unmatched Value",
        "body": "Our services are affordable and there are no hidden fees. Get a faster, better website without breaking the bank."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Page Speed",
    "headingAccent": "Optimisation",
    "lead": "We customize our work for each website to make sure it’s fast, easy to use, and ranks well in search. You’ll see real, lasting results.",
    "slides": [
      {
        "title": "Google Ranking",
        "body": "We make your site load faster so visitors have a better experience and your site does better on Google.",
        "image": {
          "src": "/assets/img/services/page-speed-optimisation/shopify-website-design-services.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Reduce Abandonment",
        "body": "When your pages load quickly, people are more likely to stay and take action. Even speeding up by one second can make a big difference.",
        "image": {
          "src": "/assets/img/services/website-maintenance/reliable-support.webp",
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
    "lead": "Our step-by-step process helps your website get faster and perform better, with results you can see.",
    "steps": [
      {
        "title": "Start of the Project",
        "body": "We start by learning what you want to achieve, checking how your site is doing now, and making a plan to improve it. Tell us your goals and let’s get started."
      },
      {
        "title": "Research & Analysis",
        "body": "We check everything that affects your site’s speed, from images to code, to find out what’s slowing it down. Discover the exact factors slowing your website down."
      },
      {
        "title": "Implementation & Optimisation",
        "body": "We optimise images, code, scripts, caching, and server configuration for speed. We work on every part of your website to make sure it performs at its best right away."
      },
      {
        "title": "Testing & Quality Assurance",
        "body": "We test your website on different devices and browsers to make sure it’s always fast, no matter how people visit. Your new site will work smoothly for everyone, wherever they are."
      },
      {
        "title": "Monitoring & Reporting",
        "body": "We track metrics, load. We keep checking your site’s speed and user experience, sharing tips to keep it running at its best."
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
    "heading": "Let’s make your pages load",
    "headingAccent": "in an instant",
    "lead": "Tell us which pages feel slow and we’ll come back with a plan, a timeline and a straight answer on what it takes to speed them up.",
    "button": "Get a proposal"
  }
};
