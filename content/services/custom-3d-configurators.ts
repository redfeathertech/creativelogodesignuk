import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /custom-3d-product-configurators, transcribed verbatim
 * from clduk/resources/views/user/custom-3d-product-configurators/*.blade.php
 * (the live page — see _migration_backup/baseline/custom-3d-product-configurators.html).
 * Merged one level deep, per section, over serviceDefaults in index.ts.
 */
export const custom3dProductConfiguratorsOverrides: ServiceContentOverrides = {
    meta: {
        title: "Custom 3D Configurators",
        description:
            "Custom 3D product configurators from Creative Logo Design — let shoppers rotate, customise and preview your products in real time, so more of them buy.",
    },
    hero: {
        eyebrow: "3D Configurators",
        breadcrumb: "3D Configurators",
        heading: "Let your customers design it, spin it,",
        headingAccent: "and love it, before they buy.",
        lead: "We create custom 3D product configurators so your customers can see, personalise, and interact with your products instantly. Whether you run an online store or want to showcase products, our tools help you engage shoppers, increase sales, and cut down on returns.",
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
        mediaAlt: "3D Configurators services from Creative Logo Design",
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
        lead: "3D configurators should be easy to use, enjoyable, and designed to help you sell more. You bring the products, and we build interactive tools your customers will want to try.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick your plan",
                body: "Pick a plan that matches your products, how complex they are, and the features you want. Find the 3D configurator option that works best for your business.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share your Goals",
                body: "Let us know how you want customers to customise your products, your design ideas, and who you want to reach. We’ll shape the configurator to fit your goals and create a great interactive experience together.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: ". Launch & Optimise",
                body: "We build, test, and adjust your 3D configurator to make sure it works smoothly. After launch, we keep an eye on how it’s used and make improvements to help you get more sales and engagement.",
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
        heading: "Turn imagination into interaction with",
        headingAccent: "custom 3D configurators",
        lead: "Interactive 3D product configurators change the way people shop online. Customers can explore, customise, and see your products in real time. This hands-on experience keeps shoppers interested, helps them feel sure about their choices, and leads to more sales, fewer returns, and a shopping journey that makes your brand stand out.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "3D Configurators workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "you get",
        lead: "We design our 3D configurators to be easy to use, interactive, and personal, so you see real results.",
        items: [
            {
                title: "Custom Product Visualisation",
                body: "Show your products in full 3D, allowing customers to rotate, zoom, and explore every angle. Bring your products to life with interactive 3D views.",
                image: {
                    src: "/assets/img/services/web-development/custom-development.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Personalisation & Customisation",
                body: "Let your customers pick colors, materials, features, and styles as they shop. They can create the product that’s just right for them, all through interactive customisation.",
                image: {
                    src: "/assets/img/services/web-development/optimised-performance.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "E-Commerce Integration",
                body: "Seamless integration with Shopify, Magento, WooCommerce, or custom platforms. Integrate your 3D configurator into your store for smooth transactions.",
                image: {
                    src: "/assets/img/services/web-development/scalable-technology.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Performance Optimisation",
                body: "Your 3D configurator will be quick, responsive, and work well on any device. Give your customers a smooth experience, whether they’re on a phone or computer.",
                image: {
                    src: "/assets/img/services/web-development/secure-reliable.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Analytics & Insights",
                body: "See how people use your 3D products and what they like best. Use these insights to improve your products and boost your results.",
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
        lead: "We’ve helped brands around the world boost engagement and sales with our 3D configurators.",
        stats: [
            {
                label: "Happy Clients",
                count: 50,
                prefix: "",
                suffix: "+",
            },
            {
                label: "3D Configurators Delivered",
                count: 120,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Engagement Increase",
                count: 75,
                prefix: "",
                suffix: "%",
            },
            {
                label: "Experience",
                count: 10,
                prefix: "",
                suffix: "+ years in interactive product solutions",
            },
        ],
        image: {
            src: "/assets/img/services/_shared/right-img.png",
            width: 428,
            height: 510,
        },
        imageAlt: "3D Configurators results",
    },
    whyChoose: {
        eyebrow: "Websites that make an impact",
        heading: "Why Choose Creative Logo Design for",
        headingAccent: "3D Product Configurators?",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "Whether it’s furniture or electronics, our 3D configurators help you show off your products and increase sales. Take a look at our projects in different industries.",
            },
            {
                title: "Excellent Industry Reputation",
                body: "With years of experience and hundreds of happy clients, we’re a partner you can trust. Join businesses worldwide that rely on our 3D development team.",
            },
            {
                title: "A Proven Process",
                body: "Our step-by-step process keeps communication clear and development efficient, so you get a high-quality interactive experience. See how our proven approach delivers real results.",
            },
            {
                title: "Strong Digital Experience",
                body: "We build interactive and realistic 3D experiences that your customers will remember. Let’s help your brand stand out with immersive product displays.",
            },
            {
                title: "Great Communication",
                body: "We keep you updated, listen to your feedback, and work together at every stage. You’ll always know what’s happening and can share your ideas along the way.",
            },
            {
                title: "Unmatched Value",
                body: "Get high-quality, interactive 3D configurators at a fair price. See real returns as your engagement and sales grow.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our Custom 3D Product Configurator",
        headingAccent: "Services",
        lead: "Every 3D configurator we make is built from scratch, just for you. We don’t use templates—each solution fits your brand, products, and goals.",
        slides: [
            {
                title: "Immersive Shopping Experiences",
                body: "Let your customers see, customise, and interact with your products in 3D. This keeps them interested and helps lower return rates.",
                image: {
                    src: "/assets/img/services/web-development/strong-foundation.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Boost Confidence to Buy",
                body: "A configurator lets customers build the product they really want. This means they’re happier, spend more, and feel more confident about buying.",
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
        lead: "We follow a clear, step-by-step process to make sure your 3D configurator works well, keeps users engaged, and can grow with your business.",
        steps: [
            {
                title: "Start of the Project",
                body: "We start by learning about your products, customisation options, and goals to build a solid foundation. Tell us your vision, and let’s begin your interactive journey.",
            },
            {
                title: "Research & Analysis",
                body: "We look closely at your products, competitors, and customers to create the best 3D experience. These insights help us make choices that boost engagement.",
            },
            {
                title: "Wireframes & Prototypes",
                body: "We build interactive prototypes so you can see and test the design and features before we start full development. This way, you know exactly what to expect.",
            },
            {
                title: "3D Design & Development",
                body: "We create life-like 3D models, add interactive features, and make sure customisations are easy. The result is a 3D configurator that impresses your customers and helps you make more sales.",
            },
            {
                title: "Testing & Launch",
                body: "We check every interaction, make sure everything runs smoothly, and test on all devices before launch. You can launch your 3D configurator knowing it’s ready to go.",
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
        heading: "Let’s build a configurator your customers",
        headingAccent: "want to play with",
        lead: "Tell us what your products need to do in 3D, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
        button: "Get a proposal",
    },
};
