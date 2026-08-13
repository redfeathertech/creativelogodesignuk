import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /laravel-developers, transcribed verbatim from
 * clduk/resources/views/user/laravel-developers/*.blade.php (the live page —
 * see _migration_backup/baseline/laravel-developers.html). Merged one level
 * deep, per section, over serviceDefaults in index.ts.
 */
export const laravelDevelopersOverrides: ServiceContentOverrides = {
    meta: {
        title: "Laravel Development",
        description:
            "Laravel development from Creative Logo Design — custom web applications, APIs and integrations built secure, fast and ready to scale with your business.",
    },
    hero: {
        eyebrow: "Laravel Development",
        breadcrumb: "Laravel Development",
        heading: "WHY FIT IN A BOX WHEN",
        headingAccent: "LARAVEL LETS YOU BUILD WITHOUT LIMITS?",
        lead: "Our Laravel developers build custom web applications, APIs, and enterprise solutions tailored to your business. From complex backends to seamless front-end integrations, we ensure your Laravel project is fast, secure, and optimised for scalability.",
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
        mediaAlt: "Laravel Development services from Creative Logo Design",
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
        heading: "How It",
        headingAccent: "Works",
        lead: "Laravel development should be smooth and results-driven. You focus on your business; we handle architecture, coding, and deployment to deliver secure and efficient applications.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick Your Plan",
                body: "Choose a Laravel development package based on your project complexity and business requirements. Select a Laravel plan that fits your business and technical needs.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share Your Goals",
                body: "Tell us your objectives—custom web apps, APIs, or enterprise solutions—and we’ll create a tailored plan. Share your vision, and let’s build Laravel solutions around it.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Launch & Optimise",
                body: "We develop, test, and fine-tune every aspect of your application. Post-launch, we monitor performance and optimise continuously. Launch a Laravel application optimised for performance, scalability, and growth.",
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
        heading: "Your dream app deserves Laravel.",
        headingAccent: "Let’s make it real.",
        lead: "Custom Laravel development gives you secure, scalable, and high-performing web applications built for your business goals. We design features and integrations that help your business grow, work more efficiently, and stay reliable, so you can stay ahead as technology changes.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "Laravel Development workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "You Get",
        lead: "Our Laravel solutions focus on functionality, security, and scalability — everything your business needs to grow and perform at its best.",
        items: [
            {
                title: "Custom Laravel Development",
                body: "We build web apps and APIs with features tailored to your business. Transform your ideas into powerful Laravel applications.",
                image: {
                    src: "/assets/img/services/web-designing/custom-wordpress-execution.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Scalable Architecture",
                body: "Our solutions grow with your business. We deliver strong performance and flexibility as your needs change.",
                image: {
                    src: "/assets/img/services/web-designing/scalable-designs.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "API & Third-Party Integration",
                body: "Connect your Laravel app with CRMs, ERPs, payment gateways, and other systems seamlessly.",
                image: {
                    src: "/assets/img/services/web-designing/e-commerce-ready.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Performance Optimisation",
                body: "We build fast, responsive, and secure Laravel apps for a smooth and reliable user experience.",
                image: {
                    src: "/assets/img/services/web-designing/content-management.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Ongoing Support & Maintenance",
                body: "We keep your Laravel apps updated, secure, and running smoothly with expert support and maintenance.",
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
        headingAccent: "Numbers",
        lead: "We’ve helped businesses launch Laravel applications that deliver real, measurable results.",
        stats: [
            {
                label: "Happy Clients",
                count: 50,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Laravel Projects Delivered",
                count: 250,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Average Performance Increase",
                count: 60,
                prefix: "",
                suffix: "%",
            },
            {
                label: "Experience in Web Development",
                count: 20,
                prefix: "",
                suffix: "+ Years",
            },
        ],
        image: {
            src: "/assets/img/services/_shared/right-img.png",
            width: 428,
            height: 510,
        },
        imageAlt: "Laravel Development results",
    },
    whyChoose: {
        eyebrow: "Build without limits",
        heading: "Why Choose Creative Logo Design for",
        headingAccent: "Laravel Development",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "We build Laravel applications for many industries, always focusing on functionality, scalability, and performance. Take a look at our successful projects to see what we can do.",
            },
            {
                title: "A Proven Process",
                body: "Our structured workflows make development efficient, reduce revisions, and get you the best results. You can count on our proven Laravel process for great outcomes.",
            },
            {
                title: "Strong Digital Identity",
                body: "Our Laravel applications show off your brand, build trust, and help engage your users. Let’s create solutions that make your brand stand out and improve user experience.",
            },
            {
                title: "Excellent Industry Reputation",
                body: "With decades of experience and many happy clients, we’re a trusted Laravel partner. Work with a team known for being reliable and delivering great results.",
            },
            {
                title: "Great Communication",
                body: "We keep you updated and involved throughout the development process. You’ll always know what’s happening thanks to our clear communication.",
            },
            {
                title: "Unmatched Value",
                body: "Our Laravel development is affordable and high-quality, with no hidden costs. Invest in applications that bring real value to your business.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Laravel Development",
        headingAccent: "Services",
        lead: "All Laravel applications we build are custom-coded, tailored to your business, and optimized for performance, scalability, and security. From robust web applications to seamless integrations, our Laravel experts bring your vision to life with modern best practices.",
        slides: [
            {
                title: "Robust Web Applications",
                body: "We build secure, scalable, and high-performance custom web applications and APIs using the powerful Laravel PHP framework.",
                image: {
                    src: "/assets/img/services/web-designing/trusted-experience.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Modern Development Practices",
                body: "Our Laravel experts employ clean, maintainable code and modern architecture to create efficient, future-proof business solutions.",
                image: {
                    src: "/assets/img/services/web-designing/modern-redesign.webp",
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
        lead: "A structured approach ensures secure, scalable, and high-performing Laravel applications.",
        steps: [
            {
                title: "Start of the Project",
                body: "Define goals, architecture, and project scope for a solid foundation. Share your project goals and start building with Laravel experts.",
            },
            {
                title: "Research & Analysis",
                body: "Analyze business requirements, user needs, and technical feasibility for optimal solutions. Discover insights that guide every Laravel development decision.",
            },
            {
                title: "Wireframes & Prototypes",
                body: "Design application flow and validate ideas before full-scale development. Visualise your Laravel solution before development begins.",
            },
            {
                title: "Laravel Development",
                body: "Custom coding, module creation, and integration for robust, secure applications. Build a Laravel application that performs flawlessly and scales easily.",
            },
            {
                title: "Testing & Launch",
                body: "Test performance, security, and functionality before deployment. Launch your Laravel solution with confidence and complete precision.",
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
        heading: "Let’s build a Laravel application your",
        headingAccent: "business can grow into",
        lead: "Tell us what your Laravel project needs to do, and we’ll come back with a plan, a timeline and a straight answer on what it takes.",
        button: "Get a proposal",
    },
};
