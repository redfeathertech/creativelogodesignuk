import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /ecommerce-website-development, transcribed verbatim
 * from clduk/resources/views/user/ecommerce-website-development/*.blade.php
 * (the live page — see _migration_backup/baseline/
 * ecommerce-website-development.html). Merged one level deep, per section,
 * over serviceDefaults in index.ts.
 */
export const ecommerceDevelopmentOverrides: ServiceContentOverrides = {
    meta: {
        title: "E-commerce Development",
        description:
            "E-commerce website development from Creative Logo Design — secure, scalable online stores with smooth checkout, built to turn browsers into paying customers.",
    },
    hero: {
        eyebrow: "E-commerce Development",
        breadcrumb: "E-commerce Development",
        heading: "Your products deserve",
        headingAccent: "more than just a cart.",
        lead: "We create robust, scalable e-commerce websites that deliver seamless shopping experiences. Whether you need a custom design, multiple payment options, or advanced features, we ensure your store is user-friendly, secure, and optimised for conversions.Let’s build an e-commerce store that truly sells.",
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
        mediaAlt: "E-commerce Development services from Creative Logo Design",
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
        lead: "E-commerce development should be simple, effective, and results-driven. You focus on your business, while we handle design, development, and functionality to maximise sales.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick your plan",
                body: "Choose a development package that fits your goals, store size, and required features.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share your Goals",
                body: "Tell us your vision, product details, and business objectives, and we’ll craft a custom e-commerce solution tailored to you.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Launch & Optimise",
                body: "We build, test, and refine your e-commerce website. After launch, we monitor performance and optimise for continued growth.",
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
        heading: "Get an e-commerce website designed",
        headingAccent: "to increase sales and revenue.",
        lead: "We design our websites to turn visitors into loyal customers. By combining responsive design, easy navigation, and features that encourage sales, we help boost engagement, increase sales, and build lasting customer loyalty.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "E-commerce Development workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "you get",
        lead: "We ensure your e-commerce website is fast, secure, and designed for a seamless user experience.",
        items: [
            {
                title: "Product & Market Analysis",
                body: "We study your products, competitors, and market trends to identify opportunities for growth. Unlock insights that help your store outperform competitors.",
                image: {
                    src: "/assets/img/services/web-development/custom-development.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Custom Design & Development",
                body: "We build custom websites with responsive layouts, useful features, and easy-to-use interfaces. Your store will look great and work smoothly.",
                image: {
                    src: "/assets/img/services/web-development/optimised-performance.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "User Engagement & Experience",
                body: "Our designs focus on usability and interactivity to keep visitors engaged and returning. Enhance your user experience to maximise conversions",
                image: {
                    src: "/assets/img/services/web-development/scalable-technology.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Content & Messaging",
                body: "We align content with your brand voice, ensuring clear communication and trust-building. Communicate your brand clearly and effectively through design.",
                image: {
                    src: "/assets/img/services/web-development/secure-reliable.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Secure & Scalable Infrastructure",
                body: "We set up payment options, strong security, and a flexible structure to help your business grow. Your e-commerce platform will be safe and ready to expand as you do.",
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
        heading: "Advantages in",
        headingAccent: "numbers",
        lead: "We’ve helped businesses launch e-commerce websites that drive results and revenue.",
        stats: [
            {
                label: "Happy Clients",
                count: 50,
                prefix: "",
                suffix: "+",
            },
            {
                label: "E-Commerce Projects Delivered",
                count: 200,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Sales Increase",
                count: 70,
                prefix: "",
                suffix: "%",
            },
            {
                label: "Experience",
                count: 20,
                prefix: "",
                suffix: "+ years in digital development",
            },
        ],
        image: {
            src: "/assets/img/services/_shared/right-img.png",
            width: 428,
            height: 510,
        },
        imageAlt: "E-commerce Development results",
    },
    whyChoose: {
        eyebrow: "Websites that make an impact",
        heading: "Why Choose Creative Logo Design for",
        headingAccent: "E-Commerce Development?",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "We’ve built online stores for many industries, making sure each one looks good, works well, and helps drive sales. Take a look at our portfolio to see our results.",
            },
            {
                title: "Excellent Industry Reputation",
                body: "With decades of experience and hundreds of satisfied clients, our expertise is trusted and proven. Work with a development team trusted worldwide.",
            },
            {
                title: "A Proven Process",
                body: "From planning to launch, our structured approach ensures efficiency, transparency, and results. Experience a proven e-commerce development process that delivers.",
            },
            {
                title: "Strong Digital Presence",
                body: "We design websites that are visually stunning, intuitive, and optimised for search engines. Enhance your online presence with a high-performing e-commerce store.",
            },
            {
                title: "Great Communication",
                body: "We keep you informed and involved throughout every stage of development. Collaborate with a team that communicates clearly and consistently.",
            },
            {
                title: "Unmatched Value",
                body: "Our e-commerce solutions are affordable and built to grow with your business. Choose a service that helps you get the most value and results over time.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our E-Commerce Website Development",
        headingAccent: "Services",
        lead: "Every website we create is tailored to your products, audience, and business goals. We don’t use templates or one-size-fits-all solutions.",
        slides: [
            {
                title: "Build to Sell",
                body: "We develop fast, secure, and intuitive online stores designed to provide a seamless shopping experience that converts browsers into buyers.",
                image: {
                    src: "/assets/img/services/web-development/strong-foundation.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Scalable Digital Storefronts",
                body: "Our future-proof solutions are built on robust architecture, ensuring your store can grow and handle increased traffic and sales.",
                image: {
                    src: "/assets/img/services/web-development/seamless-performance.webp",
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
        lead: "A structured approach ensures every e-commerce website is efficient, functional, and conversion-focused.",
        steps: [
            {
                title: "Start of the Project",
                body: "We define your goals, products, and audience for a strong foundation. Share your vision and start building a successful online store.",
            },
            {
                title: "Research & Analysis",
                body: "We analyse competitors, market trends, and user behavior to inform development. Discover insights that drive smarter e-commerce decisions.",
            },
            {
                title: "Wireframes & Prototypes",
                body: "We map layouts, shopping flows, and navigation to optimise user experience before development. Preview your store design and shopping experience before launch.",
            },
            {
                title: "Design & Development",
                body: "We develop a fully functional, responsive, and visually appealing online store with all desired features. Get a custom e-commerce site that looks and performs perfectly.",
            },
            {
                title: "Testing & Launch",
                body: "We test performance, checkout, speed, and security before making your store live. Launch your e-commerce store confidently, optimised for conversions and sales.",
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
        heading: "Let’s build an online store your customers",
        headingAccent: "keep coming back to",
        lead: "Tell us what you sell and how you want to sell it, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
        button: "Get a proposal",
    },
};
