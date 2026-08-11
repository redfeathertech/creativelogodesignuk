import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /magento-design-and-development-service, transcribed
 * verbatim from
 * clduk/resources/views/user/magento-design-and-development-service/*.blade.php
 * (the live page — see
 * _migration_backup/baseline/magento-design-and-development-service.html).
 * Merged one level deep, per section, over serviceDefaults in index.ts.
 */
export const magentoDesignAndDevelopmentOverrides: ServiceContentOverrides = {
    meta: {
        title: "Magento Web Design",
        description:
            "Magento web design and development from Creative Logo Design — fast, custom eCommerce stores that attract shoppers, convert them and grow with your business.",
    },
    hero: {
        eyebrow: "Magento Web Design",
        breadcrumb: "Magento Web Design",
        heading: "Start your Magento store and set up your",
        headingAccent: "business for long-term growth.",
        lead: "Are you Ready to take your eCommerce to the next level? We’ll help you build a Magento store that attracts shoppers and grows with your business. Our team creates fast and custom Magento websites to help your brand.",
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
        mediaAlt: "Magento Web Design services from Creative Logo Design",
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
        heading: "Find the Magento plan that fits",
        headingAccent: "your needs today.",
        lead: "Magento is here to make selling easy and effective. You focus on your things, and we’ll take care of the technology and everything to make shopping simple for the customers.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick Your Plan",
                body: "Pick a Magento package that suits your store, or let us create a custom solution just for your brand.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share Your Goals",
                body: "Share your goals with us. We’ll design and build a Magento store that shows off who you are.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Launch & Optimise",
                body: "We write, test, and distill your store. We also monitor the performance after the launch to ensure that speed is enhanced and your business is helped to grow.",
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
        heading: "Let’s create a Magento store",
        headingAccent: "that really works for you",
        lead: "Good design is not all that is needed to make a site great with Magento. It is making shopping convenient, and visitors are becoming regular customers. We apply creativity, strategy, and technical expertise to support the growth of your business.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "Magento Web Design workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "You Get",
        lead: "We build your Magento store to be scalable, easy to use, and tailored to your goals, so your business can succeed online.",
        items: [
            {
                title: "Discover User Insights",
                body: "We look into your customers and competitors to find ways for your business to grow and stand out.",
                image: {
                    src: "/assets/img/services/_shared/discover-user-insights.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Design Strategy",
                body: "We plan out the shopping experience from the homepage to checkout, making sure everything is smooth and easy for your customers.",
                image: {
                    src: "/assets/img/services/_shared/design-strategy.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "User Engagement",
                body: "We create shopping experiences that are easy to use, so your customers do not face any problems while using them.",
                image: {
                    src: "/assets/img/services/_shared/user-engagement.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Content & Messaging",
                body: "We match the content with clear product messages to help your story connect with customers.",
                image: {
                    src: "/assets/img/services/_shared/content-messaging.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Style & Brand Guide",
                body: "We keep your style consistent so your brand stands out everywhere in your store.",
                image: {
                    src: "/assets/img/services/_shared/style-brand-guide.webp",
                    width: 634,
                    height: 410,
                },
            },
        ],
    },
    advantages: {
        eyebrow: "By the numbers",
        heading: "Discover how our Magento",
        headingAccent: "skills can help your business succeed.",
        lead: "We’ve worked with businesses around the world to build Magento stores that look great and help them grow.",
        stats: [
            {
                label: "Happy Clients",
                count: 40,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Magento Projects Delivered",
                count: 300,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Sales Increase",
                count: 65,
                prefix: "",
                suffix: "%",
            },
            {
                label: "Years in eCommerce",
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
        imageAlt: "Magento Web Design results",
    },
    whyChoose: {
        eyebrow: "Join a Magento team trusted by global businesses",
        heading: "Here’s why clients choose us and",
        headingAccent: "what sets us apart.",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "We have created Magento stores on businesses of every type, including fashion and electronics, with a bias on excellent design, high performance, and actual sales.",
            },
            {
                title: "Industry Reputation",
                body: "We have more than 20 years of experience. We have hundreds of satisfied clients and award-winning projects.",
            },
            {
                title: "A Proven Process",
                body: "Our clear process keeps things transparent and efficient, with results shaped to fit your needs.",
            },
            {
                title: "Strong Digital Identity",
                body: "We craft Magento stores that strengthen your brand identity and encourage customer loyalty.",
            },
            {
                title: "Great Communication",
                body: "You’re part of the journey, we keep you informed about the things happening and also get your feedback.",
            },
            {
                title: "Unmatched Value",
                body: "We want to give Premium Magento solutions at fair pricing that deliver long-term growth, without hidden costs.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our Magento Design & Development",
        headingAccent: "Services",
        lead: "Every Magento project we build is custom, no templates, no shortcuts. Every Magento design we build shows seamless functionality and performance built for your brand.",
        slides: [
            {
                title: "Growth",
                body: "We create powerful Magento stores that highlight your products, help you sell more, and make your brand get highlighted more in the eCommerce world.",
                image: {
                    src: "/assets/img/services/magento-design-and-development-service/growth.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Performance",
                body: "Our Magento solutions are built to grow with you and perform well. We use secure coding and smart design to help your store succeed.",
                image: {
                    src: "/assets/img/services/magento-design-and-development-service/performance.webp",
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
        lead: "Our stepwise working process integrates art, plan, and technical knowledge that keeps you informed and in control.",
        steps: [
            {
                title: "Start of the project",
                body: "We begin with your goals and thoughts, then we find a plan of your Magento store.",
            },
            {
                title: "Research & analysis",
                body: "We conduct research on your product, competition, and customers in order to develop a plan that will bring results.",
            },
            {
                title: "Wireframes & prototypes",
                body: "We come up with shopping flows, verify functionality and verify ideas to make customers convenient.",
            },
            {
                title: "Magento design & development",
                body: "We develop beautiful, fully functional and scalable magento stores that perform as much as they appear.",
            },
            {
                title: "Testing & launch",
                body: "We verify all of it to make sure that the launching is perfect, including speed and checkout, mobile usability.",
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
        heading: "Let’s build a Magento store that grows",
        headingAccent: "with your business",
        lead: "Tell us what you sell and where you want to take it, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
        button: "Get a proposal",
    },
};
