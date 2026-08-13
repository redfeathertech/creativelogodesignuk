import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /web-development, transcribed verbatim from
 * clduk/resources/views/user/web-development/*.blade.php (the live page — see
 * _migration_backup/baseline/web-development.html). Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const webDevelopmentOverrides: ServiceContentOverrides = {
    meta: {
        title: "Web Development Services",
        description:
            "Web development from Creative Logo Design — fast, secure, custom-built websites that load quickly, integrate with your systems and scale as your business grows.",
    },
    hero: {
        eyebrow: "Web Development",
        breadcrumb: "Web Development",
        heading: "Ready for a website that not only",
        headingAccent: "looks good but works harder behind the scenes?",
        lead: "At Creative Logo Design, we do everything we can to give your business the best value it can get. We provide fast-loading pages with custom-built features and also ensure that your website is secure, scalable, and ready to grow with your business.",
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
        mediaAlt: "Web Development services from Creative Logo Design",
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
        heading: "Why choose us for",
        headingAccent: "Web Development?",
        lead: "We have expert coders who build the website in the best way possible. So you can focus on your business instead of getting worried about the outcome.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Choose the Right Framework",
                body: "It’s on you whether you want to choose WordPress, Shopify, or custom code. We’ll create your website on such on a platform that suits your business best.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Define Features",
                body: "Mostly websites are E-commerce, booking systems, membership portals, and integrations. we develop what your business really needs.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Test & Launch",
                body: "Our developers deliver fast, secure, and optimised websites. You can test it on all devices before launch.",
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
        heading: "Web Development Solutions",
        headingAccent: "That Drive Performance",
        lead: "Great design attracts, and great development increases your chances of coming in the top rankings of Google. We combine coding expertise and advanced tools. We build websites that load quickly, work well on any device or browser, connect easily with your systems, and grow with your business.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "Web Development workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "Why Our",
        headingAccent: "Development Works",
        lead: "Working closely with you from the beginning to the end is part of our process. This method guarantees that the layout and content of the website, as well as other things, are accurate.",
        items: [
            {
                title: "Custom Development",
                body: "we provide only customised builds, no generic websites.",
                image: {
                    src: "/assets/img/services/web-development/custom-development.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Optimised Performance",
                body: "we provide improved user experience, quicker load times, and seamless navigation.",
                image: {
                    src: "/assets/img/services/web-development/optimised-performance.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Scalable Technology",
                body: "we build websites that are ready for the future and adapt to your needs.",
                image: {
                    src: "/assets/img/services/web-development/scalable-technology.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Secure & Reliable",
                body: "we provide strict coding guidelines to safeguard your company and clients.",
                image: {
                    src: "/assets/img/services/web-development/secure-reliable.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Seamless Integrations",
                body: "we also provide CRMs, booking tools, payment gateways, and more.",
                image: {
                    src: "/assets/img/services/web-development/seamless-integrations.webp",
                    width: 634,
                    height: 410,
                },
            },
        ],
    },
    advantages: {
        eyebrow: "By the numbers",
        heading: "Advantages in numbers",
        headingAccent: "Development That Delivers",
        lead: "With a lot of experience, we’ve been building websites for businesses for almost every industry. When you work with us, you get the best outcome without hassling.",
        stats: [
            {
                label: "Custom Websites",
                count: 400,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Page Score",
                count: 90,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Tools & Integrations Delivered",
                count: 250,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Years of Experience",
                count: 20,
                prefix: "",
                suffix: "+",
            },
        ],
        image: {
            src: "/assets/img/services/_shared/right-img.png",
            width: 428,
            height: 510,
        },
        imageAlt: "Web Development results",
    },
    whyChoose: {
        eyebrow: "Websites that make an impact",
        heading: "Why Choose Our",
        headingAccent: "Web Development?",
        features: [
            {
                title: "Full-Stack Expertise",
                body: "From the stuff you see to the stuff you don’t, we’ve got you covered.",
            },
            {
                title: "Proven Technical Skills",
                body: "All our developers have years of on-the-job experience, dealing with real-world problems.",
            },
            {
                title: "Future-Proof Solutions",
                body: "We don’t just do it for today. We ensure that your website can scale with you.",
            },
            {
                title: "Ongoing Support",
                body: "Getting your site started is not the finish. We stick with you to keep, update, and upgrade it.",
            },
            {
                title: "Transparent Process",
                body: "No jargon and no confusion. You’ll never have to wonder what’s going on with your project.",
            },
            {
                title: "Affordable & Scalable",
                body: "You receive quality solutions that work for you at the prices that work for your budget, and plenty of room to grow as your business does.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our Web Development",
        headingAccent: "Services",
        lead: "We don’t stop at design. We build the technical foundations that make your website fast, secure, and built to last.",
        slides: [
            {
                title: "Strong Foundations",
                body: "Whether you need a polished corporate site or a fully customised e-commerce platform, we use modern coding practices and trusted frameworks to bring your digital vision to life.",
                image: {
                    src: "/assets/img/services/web-development/strong-foundation.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Seamless Performance",
                body: "Web development turns your ideas into reality. We build strong, secure websites that fit your business and can grow with you.",
                image: {
                    src: "/assets/img/services/web-development/seamless-performance.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Built to grow",
                body: "We handle everything from the look to the behind-the-scenes work, making sure your website runs well, loads quickly, and helps your business succeed.",
                image: {
                    src: "/assets/img/services/web-designing/build-to-grow.webp",
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
        lead: "We create websites that look great and work flawlessly, guiding you every step—from planning and building to testing and supporting.",
        steps: [
            {
                title: "Project Start",
                body: "We first understand your goals and create a clear direction for the project.",
            },
            {
                title: "System Architecture & Planning",
                body: "We plan out the best architecture to make your site efficient, stable, and easy to grow.",
            },
            {
                title: "Custom Development & Integrations",
                body: "We do such custom coding the suit your website’s usability. We handle unique features in third-party integrations.",
            },
            {
                title: "Testing & Optimisation",
                body: "Before we go live, we test it all: speed, security, and performance. That way, your site is always perfect.",
            },
            {
                title: "Deployment & Ongoing Support",
                body: "First, when we are done with your website, we make it live, and then we are still here to support you with updates and enhancements.",
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
        heading: "Let’s build a website that works as hard",
        headingAccent: "behind the scenes",
        lead: "Tell us what your website needs to do, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
        button: "Get a proposal",
    },
};
