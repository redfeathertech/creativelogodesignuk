import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /influencer-marketing, transcribed verbatim from
 * clduk/resources/views/user/influencer-marketing/*.blade.php (the live page — see
 * _migration_backup/baseline/influencer-marketing.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const influencerMarketingOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "Influencer Marketing",
    "description": "Influencer marketing from Creative Logo Design — we match your brand with credible creators on Instagram, TikTok and YouTube, then run campaigns that convert."
  },
  "hero": {
    "eyebrow": "Influencer Marketing",
    "breadcrumb": "Influencer Marketing",
    "heading": "We can provide everything,",
    "headingAccent": "unless you want Johnny Depp",
    "lead": "We help your brand connect with the right influencers on Instagram, TikTok, YouTube, and more. Our team handles everything from planning to launch, so your brand stands out and grows.",
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
    "mediaAlt": "Influencer Marketing services from Creative Logo Design",
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
    "lead": "Influencer marketing should be authentic, targeted, and results-driven. You focus on your business; we manage influencer partnerships, campaigns, and tracking to deliver measurable impact.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Pick your plan",
        "body": "Choose an influencer marketing package based on your goals, platforms, and audience.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Share your Goals",
        "body": "Tell us what you want: more followers, brand awareness, or product sales, and we’ll craft a tailored campaign.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Launch & Optimise",
        "body": "We run your campaigns, keep an eye on results, and adjust our approach to get you the best return.",
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
    "heading": "Discover influencers that amplify",
    "headingAccent": "your brand’s reach",
    "lead": "Get campaigns designed to expand your reach and drive real business results. Effective influencer marketing builds trust, awareness, and conversions. We combine audience research, influencer selection, and content strategy to generate measurable growth.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "Influencer Marketing workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "Client benefits",
    "heading": "What",
    "headingAccent": "you get",
    "lead": "Our influencer marketing stands out by ensuring your brand is visible, authentic, and resonates with your ideal audience using personalised strategies to maximise results.",
    "items": [
      {
        "title": "Influencer Discovery",
        "body": "We find influencers whose audience aligns perfectly with your brand values and goals. Amplify your brand authentically.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/strategy-and-planning.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Campaign Strategy & Planning",
        "body": "We design creative, targeted campaigns that drive engagement and measurable results. Build campaigns that connect and convert audiences.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/audience-insights.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Content Collaboration",
        "body": "We help influencers create content that highlights your brand naturally and persuasively. Collaborate with influencers for authentic, high-performing content.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/content-creation.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Monitoring & Optimisation",
        "body": "We track performance metrics, engagement, and conversions, refining strategies for maximum ROI. Optimise campaigns continuously for top influencer marketing performance.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/seo-and-optimisation.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Reporting & Insights",
        "body": "Transparent reporting keeps you informed of reach, engagement, and business impact. Measure campaign success with actionable influencer marketing insights.",
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
    "heading": "See how our influencer campaigns",
    "headingAccent": "deliver measurable business growth.",
    "lead": "We’ve executed influencer marketing campaigns that drive awareness, engagement, and sales across industries.",
    "stats": [
      {
        "label": "Happy Clients",
        "count": 60,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Campaigns Executed",
        "count": 350,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Engagement Increase",
        "count": 70,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Years in digital marketing and influencer campaigns",
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
    "imageAlt": "Influencer Marketing results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "Why Choose Creative Logo Design for",
    "headingAccent": "Influencer Marketing?",
    "features": [
      {
        "title": "Diverse & Successful Portfolio",
        "body": "We’ve collaborated with influencers across industries, creating campaigns that blend creativity, strategy, and measurable results. Explore our portfolio of successful influencer marketing campaigns."
      },
      {
        "title": "Excellent Industry Reputation",
        "body": "With decades of experience and hundreds of satisfied clients, you can trust our influencer marketing expertise. Partner with a team trusted worldwide for success."
      },
      {
        "title": "A Proven Process",
        "body": "From research to execution, our structured approach ensures efficiency, transparency, and measurable outcomes. Experience a proven influencer marketing process that delivers."
      },
      {
        "title": "Strong Brand Visibility",
        "body": "We ensure influencer campaigns boost brand recognition, authority, and engagement online. Increase visibility with targeted influencer collaborations."
      },
      {
        "title": "Great Communication",
        "body": "We give regular updates, feedback, and transparent progress reporting. Stay involved throughout your influencer campaign."
      },
      {
        "title": "Unmatched Value",
        "body": "Affordable influencer marketing drives awareness, engagement, and conversions with no hidden costs. Invest in campaigns that deliver measurable ROI."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our Influencer Marketing",
    "headingAccent": "Services",
    "lead": "All campaigns fit your brand, audience, and goals. No generic approaches here. Each partnership and strategy aims to maximise impact.",
    "slides": [
      {
        "title": "Authentic Brand Partnerships",
        "body": "We connect you with credible influencers who match your brand. They effectively advocate to their engaged audience.",
        "image": {
          "src": "/assets/img/services/content-marketing-services/strategic-content.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Maximise Campaign Impact",
        "body": "Our managed campaigns use influencer creativity to drive traffic, boost brand awareness, and generate content.",
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
    "lead": "A step-by-step method makes campaigns strategic, authentic, and high performing.",
    "steps": [
      {
        "title": "Start of the Project",
        "body": "We start by setting your goals and figuring out who you want to reach, so your campaign has a solid base."
      },
      {
        "title": "Research & Analysis",
        "body": "We learn about your brand, your audience, and the right influencers to find the best ways to make your campaign stand out."
      },
      {
        "title": "Campaign Planning & Collaboration",
        "body": "We plan your campaign, choose the best influencers, and work together to build a strong strategy."
      },
      {
        "title": "Launch & Optimisation",
        "body": "We launch your campaign, watch how it’s doing, and make changes to get even better results."
      },
      {
        "title": "Reporting & Insights",
        "body": "We give you clear reports and tips you can use to make your campaigns even better."
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
    "heading": "Let’s put your brand in front of the",
    "headingAccent": "right audience",
    "lead": "Tell us who you want to reach and we’ll come back with an influencer plan, a timeline and a straight answer on what it takes.",
    "button": "Get a proposal"
  }
};
