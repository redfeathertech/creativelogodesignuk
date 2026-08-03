import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /aeo, transcribed verbatim from
 * clduk/config/services_content/aeo.php. Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const aeoOverrides: ServiceContentOverrides = {
  "meta": {
    "title": "AEO",
    "description": "AEO services from Creative Logo Design — structured data, FAQs and conversational content that put your business in featured snippets, answer boxes and AI results."
  },
  "hero": {
    "eyebrow": "AEO",
    "breadcrumb": "AEO",
    "heading": "Start getting noticed with our",
    "headingAccent": "top-notch AEO services today.",
    "lead": "We provide AEO solutions that help your content appear in featured snippets, answer boxes, and AI results. From structured data and FAQs to conversational content, we make it simple for your audience to find answers fast.",
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
    "mediaAlt": "AEO services from Creative Logo Design",
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
    "heading": "How AEO",
    "headingAccent": "Works",
    "lead": "AEO helps search engines find your content easily. We work to put your content in front of people looking for answers online through different methods.",
    "art": {
      "src": "/assets/img/services/_shared/pen-icon.svg",
      "width": 573,
      "height": 641
    },
    "steps": [
      {
        "title": "Choose Your Plan",
        "body": "Select a plan that suits your business goals and needs of the time.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-1.svg",
          "width": 48,
          "height": 106
        }
      },
      {
        "title": "Tell Us Your Goals",
        "body": "Share your target audience, common questions, and content priorities with us. We’ll develop a captivating plan to grab your audience’s attention.",
        "icon": {
          "src": "/assets/img/services/_shared/key-point-2.svg",
          "width": 70,
          "height": 111
        }
      },
      {
        "title": "Roll Out & Fine-tune",
        "body": "We use AEO methods in the content and keep an eye on the results. After some time, you can see the highlighted answers and AI outcomes in search results.",
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
    "heading": "Get an AEO strategy to increase visibility, attract visitors,",
    "headingAccent": "and achieve results.",
    "lead": "AEO focuses on more than keywords. It relies on search purpose-organized information and AI behavior. This approach makes your content easier to find, grabs attention, and leads to better conversions.",
    "image": {
      "src": "/assets/img/services/_shared/solutionsinbranding.png",
      "width": 729,
      "height": 559
    },
    "imageAlt": "AEO workspace"
  },
  "marquee": {
    "text": "Amplify your brand identity"
  },
  "benefits": {
    "eyebrow": "What’s in it for clients",
    "heading": "Your",
    "headingAccent": "Takeaways",
    "lead": "Our AEO services help companies show up in answer boxes, voice search results, and AI-driven platforms, which boosts quality traffic.",
    "items": [
      {
        "title": "Content That Answers Questions",
        "body": "We develop content to respond to users’ questions while aligning with their search intents.",
        "image": {
          "src": "/assets/img/services/aeo/content-that-answers-questions.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Well-Structured Data",
        "body": "We use schema, FAQs, and rich snippets to enhance search appearances and improve AI understanding.",
        "image": {
          "src": "/assets/img/services/aeo/well-structured-data.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Voice Search Ready",
        "body": "We ensure your content works with voice tools like Siri, Alexa, and Google Assistant.",
        "image": {
          "src": "/assets/img/services/aeo/voice-search-ready.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Analytics and Reporting",
        "body": "Track how your answers perform, review clicks, and adjust tactics to keep improving results.",
        "image": {
          "src": "/assets/img/services/aeo/analytics-and-reporting.webp",
          "width": 634,
          "height": 410
        }
      },
      {
        "title": "Competitive Analysis",
        "body": "We study how competitors craft their answers and uncover methods to outdo them in answer-based search rankings.",
        "image": {
          "src": "/assets/img/services/aeo/competitive-analysis.webp",
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
    "lead": "We have years of experience helping businesses stand out in search results and AI-driven answers. Our methods show proven success.",
    "stats": [
      {
        "label": "Clients’ Served",
        "count": 50,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "AEO Campaigns Delivered",
        "count": 200,
        "prefix": "",
        "suffix": "+"
      },
      {
        "label": "Average Answer Feature Increase",
        "count": 72,
        "prefix": "",
        "suffix": "%"
      },
      {
        "label": "Years in digital marketing and optimisation",
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
    "imageAlt": "AEO results"
  },
  "whyChoose": {
    "eyebrow": "Websites that make an impact",
    "heading": "Why Pick Creative Logo Design to Handle Your",
    "headingAccent": "Web Designing?",
    "features": [
      {
        "title": "Wide Range of Successful Projects",
        "body": "We’ve improved answer content across many fields boosting visibility, traffic, and sales for companies big and small."
      },
      {
        "title": "Strong Industry Standing",
        "body": "With over 20 years in the business and hundreds of satisfied customers, we’re a go-to partner for AEO services."
      },
      {
        "title": "A Method That Works",
        "body": "From start to finish, our step-by-step approach leads to AEO results you can measure."
      },
      {
        "title": "Strong Digital Identity",
        "body": "We fine-tune content to boost your brand’s authority and credibility on search engines and AI platforms."
      },
      {
        "title": "Great Communication",
        "body": "We keep you in the loop every step of the way with clear reports and teamwork."
      },
      {
        "title": "Unmatched Value",
        "body": "Our AEO services deliver lasting visibility, user engagement, and return on investment for your content plan."
      }
    ]
  },
  "about": {
    "eyebrow": "About",
    "heading": "Our AEO",
    "headingAccent": "Services",
    "lead": "We offer custom AEO strategies for companies of all sizes. We don’t use cookie-cutter plans. Instead, we aim to enhance content, increase visibility, and attract clicks in answer-focused searches.",
    "slides": [
      {
        "title": "AI Ready",
        "body": "Our AEO services cover voice search enhancement, structured data, FAQs, analytics, and smart tactics to increase visibility and user interaction.",
        "image": {
          "src": "/assets/img/services/aeo/ai-ready.webp",
          "width": 2154,
          "height": 1467
        }
      },
      {
        "title": "Optimised answer",
        "body": "We use structured data and easy-to-read content to help your business become the answer people find right away online.",
        "image": {
          "src": "/assets/img/services/aeo/optimised-answere.webp",
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
    "lead": "We use a clear method. We mix content planning with technical SEO to help your answers stand out in the results.",
    "steps": [
      {
        "title": "Starting the project",
        "body": "First, we get everyone on the same page. What do you want? What’s missing? We set goals that actually make sense for your business (not just stuff that sounds fancy)."
      },
      {
        "title": "Research phase",
        "body": "Time to get nosy. We research your topics, monitor your competition, and analyse search trends like internet sleuths. If there’s a gap, we’re gonna find it."
      },
      {
        "title": "Writing and structuring content",
        "body": "Now for the fun part—making the actual content. We’re not just cranking out words; we’re building answers with some schema magic so Google’s robots aren’t totally confused."
      },
      {
        "title": "Review and make enhancements",
        "body": "We launch, then obsessively check what’s working (and what’s just flopping). If something’s off, we fix it. Simple."
      },
      {
        "title": "Look at data and share progress",
        "body": "You get the lowdown. No hiding behind jargon—just honest reports, what’s up, and what’s next to keep your AEO game on point."
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
    "heading": "Let’s make your business",
    "headingAccent": "the answer",
    "lead": "Tell us the questions your customers are asking and we’ll come back with an AEO plan, a timeline and a straight answer on what it takes to get you featured.",
    "button": "Get a proposal"
  }
};
