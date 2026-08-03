import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /digital-marketing, transcribed verbatim from
 * clduk/config/services_content/digital-marketing.php. Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const digitalMarketingOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "Digital Marketing",
    "description": "Digital marketing from Creative Logo Design — SEO, social media and ads that connect your business with the right audience and turn visitors into loyal customers."
  },
  "hero": {
    "eyebrow": "Digital Marketing",
    "breadcrumb": "Digital Marketing",
    "heading": "Let’s get your brand online and see",
    "headingAccent": "where it takes you",
    "lead": "We’re just people who care about seeing your business succeed. We use tools like SEO and social media, but what really matters is making your brand feel like you. That’s how you’ll connect with more customers and grow in a way that feels right for you.",
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
    "mediaAlt": "Digital Marketing services from Creative Logo Design",
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
    "lead": "We keep things simple. While we work, you can focus on your business, and we’ll handle the online stuff with no hassle, no confusing talk.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Pick your plan",
        "body": "Pick what makes sense for you. Want SEO? Social? Ads? Something totally different? Just ask. We’ll sort things out for you.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Share your goals",
        "body": "Tell us what matters to you, and what your aim is regarding the business. We’ll make a plan that feels right to you as per the market demands.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Optimise",
        "body": "We’ll start your campaign in the best way possible. We will keep an eye on what’s working and change things as we go ahead. You’ll always know what’s up—no surprises.",
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
    "heading": "Digital Marketing Solutions",
    "headingAccent": "That Deliver Results",
    "lead": "Digital marketing isn’t really about just getting clicks. It’s about helping your business grow in ways that actually matter. We try creative ideas, practical plans, and a little tech magic to help you connect with people who’ll stick with you.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Digital Marketing workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "you get",
    "lead": "We try things out, look at what’s working, and switch things up if we need to. The goal? Make sure people notice you, and it actually helps your business.",
    "items": [
      {
        "title": "Discover Your Market",
        "body": "We’ll poke around your industry, check out your competition, and spot new chances for you to grow that you might not see from the inside.",
        "image": {
          "src": "/assets/img/services/digital-marketing/discover-your-market.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Digital Strategy",
        "body": "We’ll map out the basics—SEO, content, socials, ads—so your brand actually pops up where people are looking.",
        "image": {
          "src": "/assets/img/services/digital-marketing/digital-strategy.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "User Engagement",
        "body": "We come up with ideas that make people want to hang around, read, and even come back for more.",
        "image": {
          "src": "/assets/img/services/digital-marketing/user-engagement.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Content & Messaging",
        "body": "We help you talk to your customers like a real person—so your message actually lands and gets them to act.",
        "image": {
          "src": "/assets/img/services/digital-marketing/content-messaging.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Style & Brand Guide",
        "body": "We’ll help your brand look and sound like you, everywhere online—no matter what platform. Simple, real, and you.",
        "image": {
          "src": "/assets/img/services/digital-marketing/style-brand-guide.webp",
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
    "lead": "We’ve been at this for over 20 years, helping real people run better businesses with ideas that work outside the boardroom.",
    "stats": [
      {
        "label": "Happy Clients",
        "count": 40,
        "prefix": "",
        "suffix": " and counting"
      },
      {
        "label": "Campaigns Launched",
        "count": 800,
        "prefix": "Over ",
        "suffix": ""
      },
      {
        "label": "Revenue Generated (and growing)",
        "count": 49,
        "prefix": "£",
        "suffix": " million"
      },
      {
        "label": "Years in the game",
        "count": 20,
        "prefix": "More than ",
        "suffix": ""
      }
    ],
    "image": {
      "src": "/assets/img/services/_shared/right-img.png",
      "width": 428,
      "height": 510
    },
    "imageAlt": "Digital Marketing results"
  },
  "whyChoose": {
    "eyebrow": "Digital marketing that makes an impact",
    "heading": "Why Choose Creative Logo Design for",
    "headingAccent": "Digital Marketing?",
    "features": [
      {
        "title": "Diverse & Successful Portfolio",
        "body": "We’ve worked with all sorts of people and businesses. Every project is a little different, and we love finding creative ways to help, no matter your field."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "After two decades, we’re still grateful every time someone trusts us with their business. We don’t take that lightly."
      },
      {
        "title": "A Proven Process",
        "body": "We keep things clear from day one, and you’ll always see what’s happening—no hiding behind fancy words or hidden fees."
      },
      {
        "title": "Strong Digital Identity",
        "body": "We treat your business like it’s our own. If it were our name on the line, we’d do the same work."
      },
      {
        "title": "Great Communication",
        "body": "You’ll always know what’s going on. If you have a question, just ask—we’re always around."
      },
      {
        "title": "Unmatched Value",
        "body": "You get honest work, fair prices, and no surprises. We don’t believe in hidden costs or big markups."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our Digital Marketing",
    "headingAccent": "Services",
    "lead": "We’re not just here for the quick win. We have to be together to help you grow and see your business become something you’re proud of.",
    "slides": [
      {
        "title": "Impact",
        "body": "We focus on helping you get more people to your site, earn their trust, and make sales that last. Your brand should work for you—not the other way around.",
        "image": {
          "src": "/assets/img/services/digital-marketing/impact.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Reach",
        "body": "Digital marketing helps you reach more people online. We use the best channels to connect your business with the right audience.",
        "image": {
          "src": "/assets/img/services/digital-marketing/reach.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Growth",
        "body": "We make digital marketing easy and effective. Our strategies help your business grow by getting you noticed, bringing in leads, and turning visitors into customers.",
        "image": {
          "src": "/assets/img/services/digital-marketing/growth.webp",
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
    "lead": "We try new ideas, make practical plans, and use real feedback—not just numbers—to help your campaigns last longer.",
    "steps": [
      {
        "title": "Start of the project",
        "body": "Tell us what you really want to achieve, and we’ll get started. No waiting, no wasted time."
      },
      {
        "title": "Study and analysis",
        "body": "We’ll dig around, ask questions, and look with fresh eyes—so we can find chances you might not spot on your own."
      },
      {
        "title": "Campaign & content creation",
        "body": "Whether it’s Google, social, or something new, we’ll help you connect in a way that feels natural and real for your audience."
      },
      {
        "title": "Digital strategy",
        "body": "We’ll make sure all your online channels, from SEO to social, work together—so you get the most out of every effort."
      },
      {
        "title": "Campaign positioning",
        "body": "We’ll help your brand show up where it matters—right in front of the people you want to reach, with no wasted effort"
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
    "heading": "Let’s connect you with people who’ll",
    "headingAccent": "stick with you",
    "lead": "Tell us what you want your marketing to do and we’ll come back with a clear plan, a timeline and an honest answer on what it takes to grow.",
    "button": "Get a proposal"
  }
};
