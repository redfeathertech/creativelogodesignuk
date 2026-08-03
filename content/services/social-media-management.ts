import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /social-media-management, transcribed verbatim from
 * clduk/resources/views/user/social-media-management/*.blade.php (the live
 * page — see _migration_backup/baseline/social-media-management.html). Merged
 * one level deep, per section, over serviceDefaults in index.ts.
 */
export const socialMediaManagementOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "seo audit service",
    "description": "Social media management from Creative Logo Design — content, posting and community building that turns followers into customers who stick around."
  },
  "hero": {
    "eyebrow": "Social Media Management",
    "breadcrumb": "Social Media Management",
    "heading": "Turn followers into customers",
    "headingAccent": "who stick around.",
    "lead": "Want to see real results from your social media? We build strategies that fit with your brand and help you connect with your audience. Our team manages your profile, creates content, and helps your brand.",
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
    "mediaAlt": "Social Media Management services from Creative Logo Design",
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
    "headingAccent": "works?",
    "lead": "We manage social media for you, so it wouldn't be hectic. You leave everything on us. We take care of your content, posting, and engaging with the audience.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Choose Your Plan",
        "body": "Pick a package that fits your business size, goals, and chosen platforms.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Tell Us What You Need",
        "body": "Tell us what you want to do, whether that's increase awareness, engagement, generate leads, or sales. We will customize a plan to your needs.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Improve",
        "body": "We start campaigns, monitor results, and adjust strategies to keep improving outcomes over time.",
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
    "heading": "Social Media Solutions",
    "headingAccent": "That Work",
    "lead": "We combine creativity, strategy, and data-driven insights to produce social media results that matter. By creating compelling, quality content and building real relationships with their followers, we turn casual followers into loyal customers, guaranteeing your brand the vital role to grow and prosper continuously while achieving continuously measurable results in the long run within the online medium.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Social Media Management workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "What clients get",
    "heading": "Key",
    "headingAccent": "Benefits",
    "lead": "We make your social media look polished, keep it interesting, and align it with your business goals.",
    "items": [
      {
        "title": "Content Strategy",
        "body": "We build content plans that fit your brand, reach your audience, and keep up with the latest trends.",
        "image": {
          "src": "/assets/img/services/social-media-management/content-strategy.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Platform Management",
        "body": "We post at the best times and interact with your followers so your social accounts do their best.",
        "image": {
          "src": "/assets/img/services/social-media-management/platform-management.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Community Engagement",
        "body": "We connect with your followers by responding to their comments and messages. This builds trust and strengthens your relationship.",
        "image": {
          "src": "/assets/img/services/social-media-management/community-engagement.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Analytics and Reporting",
        "body": "We pay close attention to how your posts perform (and report back so you can learn how to keep refining your content), in order to achieve stronger results.",
        "image": {
          "src": "/assets/img/services/social-media-management/analytics-and-reporting.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Brand Consistency",
        "body": "We ensure your brand’s voice and style match across all platforms.",
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
    "heading": "Discover how our social media",
    "headingAccent": "management boosts brands online",
    "lead": "With our social media strategies, we map out businesses that experience accelerated growth, greater engagement, and tangible results in any industry.",
    "stats": [
      {
        "label": "Satisfied clients",
        "count": 50,
        "prefix": "over ",
        "suffix": ""
      },
      {
        "label": "Manage accounts",
        "count": 200,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Engagement rates increased",
        "count": 70,
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
    "imageAlt": "Social Media Management results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "Why Choose Creative Logo Design to handle",
    "headingAccent": "your social media?",
    "features": [
      {
        "title": "A Wide Range of Success Stories",
        "body": "From local, small businesses to large, corporate influencers, we have tailored plans to help them grow their followers, engagement, and achieve their goals."
      },
      {
        "title": "Trusted Reputation in the Industry",
        "body": "With more than 20 years of experience in digital marketing activities, we have earned the clients' trust from every region on the planet."
      },
      {
        "title": "Process Backed by Results",
        "body": "Our fact-based approach, from content strategy to measuring data, makes it easy for brands to grow with consistency they can measure."
      },
      {
        "title": "Building a Strong Online Presence",
        "body": "We create a profile that captures the spirit of your brand and enables you to engage with your followers."
      },
      {
        "title": "Clear and Consistent Communication",
        "body": "We inform you with objectives and reports, and provide feedback, throughout each campaign."
      },
      {
        "title": "Value That Others Can’t Match",
        "body": "We offer social media management services for a price you can afford, which enables you to reach a wide audience and retain their interest without incurring any additional expense."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our Social Media Management",
    "headingAccent": "Services",
    "lead": "We treat every account with care. We make sure the content we create matches your brand, targets your audience, and aligns with your goals. You won’t see generic content results that matter to you.",
    "slides": [
      {
        "title": "Audience engagement",
        "body": "Our team handles it all. We plan and create your content, run campaigns, connect with your audience, and share simple reports to show how your social media is doing.",
        "image": {
          "src": "/assets/img/services/social-media-management/audience-engagement.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Consistent presence",
        "body": "We handle everything from planning to daily posts, keeping your social media active and in line with your business goals.",
        "image": {
          "src": "/assets/img/services/social-media-management/consistent-presence.webp",
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
    "lead": "We focus on careful planning, creative ideas, and regular tracking to help your social media presence grow.",
    "steps": [
      {
        "title": "Launching the Project",
        "body": "We help you define concrete goals, align everything with your brand style, and put together a strategy to achieve real results."
      },
      {
        "title": "Audience Research and Insights",
        "body": "We research about your audience, analyse your competition, and track trends to identify how your brand can do best."
      },
      {
        "title": "Content Planning and Campaign Setup",
        "body": "We create content, design campaigns, and make posts to attract more customers towards your brand."
      },
      {
        "title": "Regular Posting and Community Building",
        "body": "Content marketing, real conversations, and an active, engaged community around your brand."
      },
      {
        "title": "Monitoring & Reporting",
        "body": "We monitor the performance of your campaign through progress reports so you're informed about its progress."
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
    "heading": "Let’s grow a following that",
    "headingAccent": "buys from you",
    "lead": "Tell us which platforms matter to you and we’ll come back with a content plan, a posting schedule and a straight answer on what it takes to grow.",
    "button": "Get a proposal"
  }
};
