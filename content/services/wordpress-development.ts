import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /wordpress-development, transcribed verbatim from
 * clduk/resources/views/user/wordpress-development/*.blade.php (the live page — see
 * _migration_backup/baseline/wordpress-development.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const wordpressDevelopmentOverrides: ServiceContentOverrides = {
    meta: {
        title: "WordPress Development",
        description:
            "WordPress development from Creative Logo Design — custom, secure sites that are easy to manage, quick to load and built to grow with your business.",
    },
    hero: {
        eyebrow: "WordPress Development",
        breadcrumb: "WordPress Development",
        heading: "Why hassle with plugins and themes",
        headingAccent: "when experts can build it right?",
        lead: "We build custom WordPress websites that are secure, easy to manage, and ready to grow with your business. No matter what type of site you need, corporate, blog, e-commerce, or portfolio, we focus on user experience, performance, and your brand. Ready for a website that actually feels like you—and helps you reach more people?",
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
        mediaAlt: "WordPress Development services from Creative Logo Design",
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
        lead: "WordPress development should be straightforward. You run your business while we take care of the design, coding, and results.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick your plan",
                body: "Pick a development package that fits your website goals, features, and budget. Select a WordPress plan tailored to your needs and budget.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share your Goals",
                body: "Share your vision and what you want your website to do, and we’ll create a custom solution for you. Share your goals, and let’s create a website designed for success.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Launch & Optimise",
                body: "We handle the design, coding, testing, and optimisation to make sure your website runs smoothly. After launch, we keep an eye on things and make improvements as your business grows.",
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
        heading: "WordPress Solutions That",
        headingAccent: "Deliver Results",
        lead: "We design websites that attract visitors, are easy to use, and help your business grow. Every detail, from layout to features, is built for performance. Turn your visitors into loyal customers with a WordPress site that works.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "WordPress Development workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "you get",
        lead: "We ensure your WordPress site is secure, fast, and designed for an intuitive user experience.",
        items: [
            {
                title: "Custom Design & Development",
                body: "We build websites just for you, with layouts that work on any device, interactive features, and easy navigation.",
                image: {
                    src: "/assets/img/services/web-designing/custom-wordpress-execution.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Plugin & Feature Integration",
                body: "We add the plugins, tools, and features you need to make your website work better.",
                image: {
                    src: "/assets/img/services/web-designing/scalable-designs.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Content Management & Optimisation",
                body: "We make it simple for you to manage your content and help your pages load fast and rank well in search engines.",
                image: {
                    src: "/assets/img/services/web-designing/e-commerce-ready.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Security & Maintenance",
                body: "We keep your WordPress site safe, up to date, and backed up so you don’t have to worry.",
                image: {
                    src: "/assets/img/services/web-designing/content-management.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Performance & Scalability",
                body: "We build websites that grow with your business and keep running smoothly, even as you get more visitors and content.",
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
        lead: "We’ve delivered WordPress solutions that look great, function flawlessly, and support business growth.",
        stats: [
            {
                label: "Happy Clients",
                count: 60,
                prefix: "",
                suffix: "+",
            },
            {
                label: "WordPress Projects Delivered",
                count: 250,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Traffic Increase",
                count: 55,
                prefix: "",
                suffix: "%",
            },
            {
                label: "Experience",
                count: 20,
                prefix: "",
                suffix: "+ years in WordPress development",
            },
        ],
        image: {
            src: "/assets/img/services/_shared/right-img.png",
            width: 428,
            height: 510,
        },
        imageAlt: "WordPress Development results",
    },
    whyChoose: {
        eyebrow: "Websites that make an impact",
        heading: "Why Choose Creative Logo Design for",
        headingAccent: "WordPress Development?",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "We’ve created websites for all kinds of businesses, from corporate and e-commerce to blogs and portfolios, always focusing on design and how things work. Take a look at our successful WordPress projects.",
            },
            {
                title: "Excellent Industry Reputation",
                body: "With decades of experience and hundreds of satisfied clients, our expertise is trusted worldwide. Partner with a WordPress development team trusted by businesses globally.",
            },
            {
                title: "A Proven Process",
                body: "From the first meeting to launch, our clear process keeps things efficient and transparent, so you get real results. See how our WordPress development process works for you.",
            },
            {
                title: "Strong Digital Identity",
                body: "We build websites that show off your brand’s values and personality, and connect with your audience. Let’s create a WordPress site that makes your brand stand out.",
            },
            {
                title: "Great Communication",
                body: "We keep you updated and welcome your feedback, so you always know what’s happening. Work with a team that values clear communication and real partnership.",
            },
            {
                title: "Unmatched Value",
                body: "Our WordPress solutions are both affordable and effective, giving you long-term value and real business results. Choose WordPress development that helps your business grow.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our WordPress Website Design",
        headingAccent: "Services",
        lead: "We move beyond templates. Our WordPress sites are custom-built and are optimised for performance, security, and growth.",
        slides: [
            {
                title: "WordPress Website Design Services",
                body: "Need a corporate site, portfolio, or online store? We use WordPress to build a platform that works today and adapts for tomorrow.",
                image: {
                    src: "/assets/img/services/custom-wordpress-developement/dedicated-wordpress.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Dedicated Wordpress",
                body: "Need a corporate site, portfolio, or online store? We use WordPress to build a platform that works today and adapts for tomorrow.",
                image: {
                    src: "/assets/img/services/custom-wordpress-developement/custom-growth.webp",
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
        lead: "Our step-by-step approach makes WordPress development efficient, clear, and focused on results.",
        steps: [
            {
                title: "Start of the Project",
                body: "We work with you to set goals, understand your audience, and plan your website. Share your ideas, and let’s start building your WordPress site today.",
            },
            {
                title: "Research & Analysis",
                body: "We look at your competitors, market trends, and what your users need to shape your website strategy. Get insights that guide every step of development.",
            },
            {
                title: "Wireframes & Prototypes",
                body: "We create wireframes and prototypes to plan your site’s layout, navigation, and features before we start coding. You can see how your website will work before we build it.",
            },
            {
                title: "Design & Development",
                body: "We handle the coding and design, adding the features and plugins you need, and making sure your site looks great on any device.",
            },
            {
                title: "Testing & Launch",
                body: "We test usability, speed, security, and compatibility before launching your website live. Launch a WordPress website that’s fast, secure, and built to help your business grow.",
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
        heading: "Let’s build a WordPress site you can",
        headingAccent: "actually manage",
        lead: "Tell us what your WordPress site needs to do, and we’ll come back with a plan, a timeline and a straight answer on what it takes to build it.",
        button: "Get a proposal",
    },
};
