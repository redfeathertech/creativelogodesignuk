import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /amp-web-design, transcribed verbatim from
 * clduk/resources/views/user/amp-web-design/*.blade.php (the live page — see
 * _migration_backup/baseline/amp-web-design.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const ampWebDesignOverrides: ServiceContentOverrides = {
    meta: {
        title: "AMP Development",
        description:
            "AMP web design from Creative Logo Design — lightweight Accelerated Mobile Pages that load instantly, rank better on mobile and keep visitors from leaving.",
    },
    hero: {
        eyebrow: "AMP Web Design",
        breadcrumb: "AMP Web Design",
        heading: "Your visitors won’t wait. Give them speed,",
        headingAccent: "style, and seamless performance.",
        lead: "We design Accelerated Mobile Pages (AMP) that are lightweight, fast, and mobile-friendly. Our AMP solutions ensure smooth navigation, lightning-fast load times, and improved user experience, helping you retain visitors and boost conversions.",
        banner: {
            src: "/assets/img/services/_shared/branding-banner.png",
            width: 1729,
            height: 887,
        },
        media: {
            src: "/assets/img/services/_shared/branding-services.png",
            width: 529,
            height: 404,
        },
        mediaAlt: "AMP Web Design services from Creative Logo Design",
        ctaPrimary: "Hire us",
        ctaSecondary: "Talk to a strategist",
        tiles: [
            {
                label: "Mobile App",
                slug: "app-development",
                icon: {
                    src: "/assets/img/services/_shared/app-development.webp",
                    width: 500,
                    height: 628,
                },
            },
            {
                label: "Website",
                slug: "web-designing",
                icon: {
                    src: "/assets/img/services/_shared/website.webp",
                    width: 500,
                    height: 628,
                },
            },
            {
                label: "Branding",
                slug: "branding",
                icon: {
                    src: "/assets/img/services/_shared/branding.webp",
                    width: 500,
                    height: 628,
                },
            },
            {
                label: "Social Media",
                slug: "social-media-management",
                icon: {
                    src: "/assets/img/services/_shared/social-media.webp",
                    width: 500,
                    height: 628,
                },
            },
        ],
    },
    howItWorks: {
        eyebrow: "How it works",
        heading: "How it",
        headingAccent: "work?",
        lead: "AMP design should be simple, efficient, and effective. You focus on your content; we optimise structure, design, and functionality for maximum speed.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick your plan",
                body: "Choose an AMP package tailored to your website goals, content type, and traffic volume. Select an AMP plan designed for speed, engagement, and performance.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share your Goals",
                body: "Let us know your goals, like faster load times, better SEO, or more engagement. We’ll shape your AMP strategy to fit your needs and work with you to build a high-performance solution.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Launch & Optimise",
                body: "We handle the design, testing, and optimisation of your AMP pages to make sure they load quickly and work smoothly on mobile. Launch your AMP pages and see happier users and better results right away.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-3.svg",
                    width: 73,
                    height: 116,
                },
            },
        ],
        workHeading: "Our recent work",
        workImages: [
            {
                src: "/assets/img/services/_shared/1-2.webp",
                width: 500,
                height: 628,
            },
            {
                src: "/assets/img/services/_shared/2-2.webp",
                width: 500,
                height: 628,
            },
            {
                src: "/assets/img/services/_shared/3-2.webp",
                width: 500,
                height: 628,
            },
            {
                src: "/assets/img/services/_shared/4-2.webp",
                width: 500,
                height: 628,
            },
            {
                src: "/assets/img/services/_shared/5-2.webp",
                width: 500,
                height: 628,
            },
            {
                src: "/assets/img/services/_shared/6-2.webp",
                width: 500,
                height: 628,
            },
        ],
    },
    solutions: {
        eyebrow: "What we do",
        heading: "AMP up your website—because every",
        headingAccent: "second lost is a customer gone",
        lead: "AMP pages help your visitors enjoy a faster, smoother experience on their phones. We use clean code, simple design, and trusted SEO methods so your site loads quickly, ranks higher, and keeps people interested. You’ll see real improvements and happier customers every time they visit.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "AMP Web Design workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "you get",
        lead: "We ensure your AMP pages load fast, are SEO-friendly, and deliver a smooth mobile experience.",
        items: [
            {
                title: "Lightning-Fast Load Times",
                body: "Our pages are built to show up instantly, so visitors stay longer and stay interested. Give your users a fast, smooth browsing experience.",
                image: {
                    src: "/assets/img/services/web-designing/custom-wordpress-execution.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Mobile Optimisation",
                body: "AMP pages look great and work well on any device. Make sure every visitor has a smooth experience on your site.",
                image: {
                    src: "/assets/img/services/web-designing/scalable-designs.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "SEO & Visibility",
                body: "Improved mobile performance helps your search engine rankings and site discoverability. Help more people find your site with an AMP-friendly design.",
                image: {
                    src: "/assets/img/services/web-designing/e-commerce-ready.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Enhanced User Engagement",
                body: "Simple, interactive AMP pages encourage visitors to keep browsing and take action. Keep your users interested and help them become customers.",
                image: {
                    src: "/assets/img/services/web-designing/content-management.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Analytics & Performance Tracking",
                body: "We keep an eye on how your AMP pages perform, checking speed and user activity to keep making them better. Track and improve your results over time.",
                image: {
                    src: "/assets/img/services/web-designing/ongoing-support.webp",
                    width: 634,
                    height: 410,
                },
            },
        ],
    },
    advantages: {
        eyebrow: "By the numbers",
        heading: "Advantages in",
        headingAccent: "numbers",
        lead: "Our AMP solutions have helped many clients see faster sites, more engaged visitors, and better SEO results.",
        stats: [
            {
                label: "Happy Clients",
                count: 50,
                prefix: "",
                suffix: "+",
            },
            {
                label: "AMP Pages Delivered",
                count: 400,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Load Time Reduction",
                count: 70,
                prefix: "",
                suffix: "%",
            },
            {
                label: "Experience",
                count: 20,
                prefix: "",
                suffix: "+ years in mobile web performance",
            },
        ],
        image: {
            src: "/assets/img/services/_shared/right-img.png",
            width: 428,
            height: 510,
        },
        imageAlt: "AMP Web Design results",
    },
    whyChoose: {
        eyebrow: "Websites that make an impact",
        heading: "Why Choose Creative Logo Design for",
        headingAccent: "AMP Web Design?",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "We’ve built AMP pages for all kinds of sites, from blogs and online stores to news and business pages. See how our work has improved speed and usability in different industries.",
            },
            {
                title: "Excellent Industry Reputation",
                body: "With years of experience and many happy clients, you can count on us to deliver great results. Work with a team known for delivering fast web solutions to clients around the world.",
            },
            {
                title: "A Proven Process",
                body: "We guide you through every step, from planning to launch, to make sure your AMP project is efficient, fast, and delivers real results. Try our proven process and see the difference.",
            },
            {
                title: "Strong Digital Identity",
                body: "Our AMP pages match your brand and keep your site consistent, all while making it faster. Create a strong mobile presence that stands out to every visitor.",
            },
            {
                title: "Great Communication",
                body: "We’ll keep you in the loop with updates, test results, and performance insights. Choose a team that values clear communication and delivers what you need.",
            },
            {
                title: "Unmatched Value",
                body: "Get fast, efficient, and affordable AMP pages that help you engage visitors and increase conversions, all without extra costs. Invest in AMP design that brings real value.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our AMP Web Design",
        headingAccent: "Services",
        lead: "Every AMP page we build is custom-made for speed, usability, and SEO. We don’t use templates or shortcuts—just fast, user-focused solutions for your mobile site.",
        slides: [
            {
                title: "Instant-Loading Mobile Pages",
                body: "We create AMP pages that load almost instantly, so visitors stay longer and your site ranks higher in mobile searches.",
                image: {
                    src: "/assets/img/services/web-designing/modern-redesign.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Speed as a Feature",
                body: "AMP makes your mobile site much faster, helping you reach users who are always on the move.",
                image: {
                    src: "/assets/img/services/web-designing/trusted-experience.webp",
                    width: 2154,
                    height: 1467,
                },
            },
        ],
    },
    clients: {
        logos: null,
    },
    process: {
        eyebrow: "Our process",
        heading: "Our",
        headingAccent: "process",
        lead: "We follow a clear, step-by-step process to make sure your AMP pages are fast, work well, and put users first.",
        steps: [
            {
                title: "Start of the Project",
                body: "We define goals, pages, and user experience priorities for your AMP project.",
            },
            {
                title: "Research & Analysis",
                body: "We analyse your audience, competitors, and content to prioritize the fastest, most effective solutions.",
            },
            {
                title: "Wireframes & Prototypes",
                body: "We create simplified layouts and prototypes for testing speed and functionality before development.",
            },
            {
                title: "AMP Design & Development",
                body: "We code and design lightweight, mobile-first pages optimised for speed, SEO, and user engagement.",
            },
            {
                title: "Testing & Launch",
                body: "We test performance, responsiveness, and SEO before deploying AMP pages live.",
            },
        ],
    },
    capabilities: {
        eyebrow: "Capabilities",
        heading: "We have extensive experience in",
        headingAccent: "the following",
        items: [
            "WordPress design",
            "Website development",
            "Digital strategy",
            "Digital marketing",
            "CMS training",
            "E-commerce",
        ],
    },
    cta: {
        eyebrow: "Ready when you are",
        heading: "Let’s make your mobile pages load",
        headingAccent: "in an instant",
        lead: "Tell us which pages need to be fast, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
        button: "Get a proposal",
    },
};
