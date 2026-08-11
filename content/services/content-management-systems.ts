import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /content-management-systems, transcribed verbatim from
 * clduk/config/services_content/content-management-systems.php. Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const contentManagementSystemsOverrides: ServiceContentOverrides = {
    meta: {
        title: "CMS Website Design",
        description:
            "Bespoke content management systems from Creative Logo Design — custom CMS builds that simplify publishing and put control of your website in your hands.",
    },
    hero: {
        eyebrow: "Content Management Systems",
        breadcrumb: "Content Management Systems",
        heading: "Don’t rely on Anyone.",
        headingAccent: "Take control in your hand",
        lead: "Ready to control your online content? We should develop a bespoke CMS that can simplify, streamline, and expand your website. Our CMS solutions transform your business to be easier to manage and more effective online.",
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
        mediaAlt:
            "Content Management Systems services from Creative Logo Design",
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
        heading: "How Our CMS Solutions",
        headingAccent: "Work?",
        lead: "Control of content should not be complex. You do your business, and we provide a CMS platform that makes it easy to publish, edit, and maintain your site.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick your plan",
                body: "Choose a CMS solution that best fits you or order a custom system to meet the needs of your business.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share Your Goals",
                body: "Share your content requirements, business priorities, and workflows. We will develop a system that fits perfectly with you.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Launch & Optimise",
                body: "Your CMS is designed, tested, and optimised by us so that it works smoothly. We do follow-up support and improvements when necessary.",
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
        heading: "CMS Solutions That",
        headingAccent: "Deliver Results",
        lead: "A good CMS can change how you handle digital content. It makes your team’s work easier, helps everyone work together, and keeps your website simple to update and ready to grow. With our CMS, you can update content quickly, work more efficiently, and deliver digital experiences that keep users interested and help your business grow.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "Content Management Systems workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "you get",
        lead: "We provide CMS solutions that simplify content management, streamline workflows, and empower your team to publish effectively.",
        items: [
            {
                title: "User Insights & Workflow Analysis",
                body: "We study your team’s needs, content types, and processes to create a CMS workflow that maximises efficiency.",
                image: {
                    src: "/assets/img/services/content-management-systems/user-insights-workflow-analysis.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Custom Design & Functionality",
                body: "We build custom CMS and add functionality to make your business processes unique.",
                image: {
                    src: "/assets/img/services/content-management-systems/custom-design-functionality.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Seamless Integration",
                body: "Our CMS solutions can be integrated with your systems, third-party applications, and digital platforms.",
                image: {
                    src: "/assets/img/services/content-management-systems/seamless-integration.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Content & Permissions Management",
                body: "We have management of our content, control of our users, and permissions that are easy to manage to allow easy collaboration.",
                image: {
                    src: "/assets/img/services/content-management-systems/content-permissions-management.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Style & Brand Consistency",
                body: "We make sure your CMS style looks professional, and you can handle it easily.",
                image: {
                    src: "/assets/img/services/content-management-systems/brand-consistency.webp",
                    width: 634,
                    height: 410,
                },
            },
        ],
    },
    advantages: {
        eyebrow: "By the numbers",
        heading: "See how our CMS solutions",
        headingAccent: "transform operations?",
        lead: "Our CMS manages workflows efficiently because they are so easy to use that a non-professional can also handle them.",
        stats: [
            {
                label: "Happy Clients",
                count: 50,
                prefix: "",
                suffix: "+",
            },
            {
                label: "CMS Projects Delivered",
                count: 250,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Productivity Increase",
                count: 70,
                prefix: "",
                suffix: "%",
            },
            {
                label: "Years in CMS development",
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
        imageAlt: "Content Management Systems results",
    },
    whyChoose: {
        eyebrow: "Websites that make an impact",
        heading: "Why Choose Creative Logo Design",
        headingAccent: "for CMS?",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "We provide CMS solutions to small businesses, enterprises, e-commerce sites, and corporate sites.",
            },
            {
                title: "Excellent Industry Reputation",
                body: "We have proven over decades with happy customers that we provide reliable, innovative, and scalable CMS solutions.",
            },
            {
                title: "A Proven Process",
                body: "The features of our CMS step-by-step development process are customised, secure, and future-proofed.",
            },
            {
                title: "Strong Digital Identity",
                body: "Your CMS will be a mirror of your brand and a professional and consistent online presence.",
            },
            {
                title: "Great Communication",
                body: "We update you, engage you, and assure you through all the CMS development levels.",
            },
            {
                title: "Unmatched Value",
                body: "Get a robust, custom CMS at reasonable prices without compromising on quality or functionality.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our CMS",
        headingAccent: "Design & Development Services",
        lead: "We don’t use outdated systems—every CMS is custom-built, secure, scalable, and tailored to your business workflows.",
        slides: [
            {
                title: "Easy management",
                body: "Managing your website content should be easy. We build systems that let you update and control your site without hassle.",
                image: {
                    src: "/assets/img/services/content-management-systems/easy-management.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Flexible solutions",
                body: "Whether you use WordPress or need something custom, we create systems that are flexible, safe, and simple for your team to use.",
                image: {
                    src: "/assets/img/services/content-management-systems/flexible-solutions.webp",
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
        lead: "A step-by-step approach combining research, design, development, and optimisation—ensuring your CMS meets all business needs and is easy to use.",
        steps: [
            {
                title: "Start of the project",
                body: "We first understand thoughts that what you want to do and then we find a plan for your CMS.",
            },
            {
                title: "Research & analysis",
                body: "We research about business procedures and structure to develop a plan that brings results.",
            },
            {
                title: "Wireframes & prototypes",
                body: "We create dashboards and layouts to handle the processes efficiently and easily.",
            },
            {
                title: "CMS design & development",
                body: "Our comprehensive, secure, and convenient CMS will automate your online business.",
            },
            {
                title: "Testing & launch",
                body: "All the workflows, integration, and features are tested on performance, security, and scalability before going live.",
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
        heading: "Let’s put content control",
        headingAccent: "in your hands",
        lead: "Tell us how you manage your website today and we’ll come back with a bespoke CMS plan, a timeline and a straight answer on what it takes.",
        button: "Get a proposal",
    },
};
