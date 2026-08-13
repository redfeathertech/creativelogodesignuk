import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /content-marketing-services, transcribed verbatim from
 * clduk/resources/views/user/content-marketing-services/*.blade.php (the live
 * page — see _migration_backup/baseline/content-marketing-services.html).
 * Merged one level deep, per section, over serviceDefaults in index.ts.
 */
export const contentMarketingOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "Content Marketing",
    "description": "Content marketing from Creative Logo Design — blogs, social, email and SEO content planned, written and shared to reach the right people and win customers."
  },
  "hero": {
    "eyebrow": "Content Marketing",
    "breadcrumb": "Content Marketing",
    "heading": "Get content that converts readers into",
    "headingAccent": "loyal customers and grows your business",
    "lead": "We create engaging content for blogs, social media, emails, and more. From the first idea to sharing your message, we help you reach the right people, build your brand, and see real results.",
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
    "mediaAlt": "Content Marketing services from Creative Logo Design",
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
    "lead": "Content marketing works best when it’s focused and effective. While you run your business, we take care of creating and sharing content that connects with your audience.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Pick your plan",
        "body": "Choose a content marketing package based on your goals, audience, and channels.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Share your goals",
        "body": "Tell us your goals, whether it’s building brand awareness, finding new leads, or keeping customers coming back. We’ll create a strategy just for you.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Optimise",
        "body": "We create your content, share it across the right channels, and keep improving our approach to help you reach more people.",
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
    "heading": "Invest in content marketing",
    "headingAccent": "that delivers measurable ROI",
    "lead": "Good content marketing is about more than just getting clicks. It builds trust, loyalty, and real connections. We use storytelling, smart SEO, and strategy to help your brand reach the right people. This means more engagement, better visibility, and growth that lasts.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Content Marketing workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "you get",
    "lead": "With our content marketing, your brand will speak clearly, connect with your audience, and reach your business goals.",
    "items": [
      {
        "title": "Strategy & Planning",
        "body": "We plan out your blog posts, social media, emails, and more to support your brand’s goals.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/strategy-and-planning.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Audience Insights",
        "body": "We learn about your audience so we can create content they care about and want to engage with.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/audience-insights.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Content Creation",
        "body": "We create blogs, articles, infographics, videos, and social posts that fit your brand.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/content-creation.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "SEO & Optimisation",
        "body": "We make sure every piece of content is easy to find online and brings more visitors to your site.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/seo-and-optimisation.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Distribution & Promotion",
        "body": "We share your content in the right places so it reaches your audience and makes a bigger impact.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/distribution-and-promotion.webp",
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
    "lead": "Our content strategies help businesses attract attention, turn visitors into customers, and grow.",
    "stats": [
      {
        "label": "Happy Clients",
        "count": 50,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Campaigns Delivered",
        "count": 500,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Engagement Increase",
        "count": 60,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Years in content marketing",
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
    "imageAlt": "Content Marketing results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "See what makes Creative Logo Design the right choice for your",
    "headingAccent": "content marketing needs?",
    "features": [
      {
        "title": "Diverse & Successful Portfolio",
        "body": "We create content for many industries, using storytelling, strategy, and SEO to get people interested in your brand."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "With decades of expertise and numerous satisfied clients, we are your trusted content marketing partner."
      },
      {
        "title": "A Proven Process",
        "body": "From planning to delivery, our process makes sure your content is interesting, effective, and easy to track."
      },
      {
        "title": "Strong Brand Messaging",
        "body": "We help you share clear, consistent messages that build your brand and encourage people to take action."
      },
      {
        "title": "Great Communication",
        "body": "We work closely with you, keep you updated, and make sure you always know how things are going."
      },
      {
        "title": "Unmatched Value",
        "body": "Our content marketing is affordable and focused on getting you more leads, more visitors, and steady growth."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our Content Marketing",
    "headingAccent": "Services",
    "lead": "We tailor every campaign to your audience, industry, and goals. No one-size-fits-all plans. Each piece of content is made to inform, engage, and turn readers into customers.",
    "slides": [
      {
        "title": "Strategic Content",
        "body": "We develop valuable, relevant content that attracts and engages your target audience, building trust and establishing market authority.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/strategic-content.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Drive Growth",
        "body": "Our content strategy supports every step of your marketing, from first impressions to final sales, helping you get more leads and customers.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/drive-growth.webp",
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
    "lead": "We follow a step-by-step process to make sure your content is well-planned, interesting, and gets results.",
    "steps": [
      {
        "title": "Start of the project",
        "body": "We start by setting clear goals, understanding your audience, and shaping your message to build a strong content plan."
      },
      {
        "title": "Research & analysis",
        "body": "We look into your audience, competitors, and industry trends to create a content plan that works."
      },
      {
        "title": "Content creation",
        "body": "We write, design, and create content that gets people interested and encourages them to take action."
      },
      {
        "title": "Distribution & promotion",
        "body": "We share your content everywhere it matters, from blogs to social media and email, so you reach as many people as possible."
      },
      {
        "title": "Monitoring & reporting",
        "body": "We keep an eye on how your content is doing and make changes to keep improving your results."
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
    "heading": "Let’s turn your content into readers who",
    "headingAccent": "become customers",
    "lead": "Tell us who you want to reach and we’ll come back with a content plan, a timeline and a straight answer on what it takes.",
    "button": "Get a proposal"
  }
};
