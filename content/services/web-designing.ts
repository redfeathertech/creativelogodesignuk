import type { ServiceContentOverrides } from "./types";

/**
 * Section overrides for /web-designing, transcribed verbatim from
 * clduk/config/services_content/web-designing.php. Merged one level deep, per
 * section, over serviceDefaults in index.ts.
 */
export const webDesigningOverrides: ServiceContentOverrides = {
    meta: {
        title: "Web Design Services",
        description:
            "Web design from Creative Logo Design — websites that look great, feel right and work hard for your business, turning visitors into customers who come back.",
    },
    hero: {
        eyebrow: "Web Design",
        breadcrumb: "Web Design",
        heading: "Let’s Get Your Brand Online",
        headingAccent: "and Witness Real Results",
        lead: "At Creative Logo Design, we care more about making things look good. We build websites that work hard for you. Such sites that look great, feel right, and help your business grow. We want your online presence to feel like you and make a real impact. Ready for a website that actually feels like you—and helps you reach more people?",
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
        mediaAlt: "Web Design services from Creative Logo Design",
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
        heading: "How does it",
        headingAccent: "work?",
        lead: "We make web design easy, so you can keep doing what you do best.",
        art: {
            src: "/assets/img/services/_shared/pen-icon.svg",
            width: 573,
            height: 641,
        },
        steps: [
            {
                title: "Pick your plan",
                body: "Pick the plan that makes sense for you—everything’s flexible. If you’ve got something special in mind, we’ll make it happen.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-1.svg",
                    width: 48,
                    height: 106,
                },
            },
            {
                title: "Share your ideas",
                body: "Just tell us what is on your mind regarding the business. Need a whole new website, a redesign, or special features? We’re here to help.",
                icon: {
                    src: "/assets/img/services/_shared/key-point-2.svg",
                    width: 70,
                    height: 111,
                },
            },
            {
                title: "Launch & Improve",
                body: "We’ll show you the first designs in just a day or two, then keep tweaking things until your site feels just right to you.",
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
        heading: "Web Design Solutions",
        headingAccent: "That Deliver Results",
        lead: "A good website isn’t just about how it looks—it’s about how it works. We blend creativity and tech to build sites that tell your story, reach your audience, and help your business get results you can see. Let’s build a website your customers will actually want to come back to.",
        image: {
            src: "/assets/img/services/_shared/solutionsinbranding.png",
            width: 729,
            height: 559,
        },
        imageAlt: "Web Design workspace",
    },
    marquee: {
        text: "Amplify your brand identity",
    },
    benefits: {
        eyebrow: "Client benefits",
        heading: "What",
        headingAccent: "you get",
        lead: "We mix creativity and tech to make websites that stand out, work well, and help you reach your goals.",
        items: [
            {
                title: "Discover Your Market",
                body: "We learn about your field so your website clicks with the people you want to reach.",
                image: {
                    src: "/assets/img/services/web-designing/custom-wordpress-execution.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Web Strategy",
                body: "A simple plan to help your brand get noticed and trusted online.",
                image: {
                    src: "/assets/img/services/web-designing/scalable-designs.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "User Experience (UX) Design",
                body: "We design sites that are easy to use, so visitors want to stick around.",
                image: {
                    src: "/assets/img/services/web-designing/e-commerce-ready.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Website Content & Messaging",
                body: "We’ll help you tell your story in a way people actually get and want to know more.",
                image: {
                    src: "/assets/img/services/web-designing/content-management.webp",
                    width: 634,
                    height: 410,
                },
            },
            {
                title: "Design & Style Guide",
                body: "Your whole site will look and feel like one brand no matter what page people land on.",
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
        lead: "We’ve been at this for over 20 years and have helped lots of brands launch websites that really work and make real money online.",
        stats: [
            {
                label: "Clients’ Satisfaction",
                count: 40,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Websites Launched",
                count: 500,
                prefix: "",
                suffix: "+",
            },
            {
                label: "Revenue Generated",
                count: 29,
                prefix: "£",
                suffix: " million",
            },
            {
                label: "Experience",
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
        imageAlt: "Web Design results",
    },
    whyChoose: {
        eyebrow: "Websites that make an impact",
        heading: "Why Choose Creative Logo Design for",
        headingAccent: "Web Designing?",
        features: [
            {
                title: "Diverse & Successful Portfolio",
                body: "Check out our portfolio—there are plenty of stories of brands we’ve helped grow, showing off our creative work across all sorts of industries.",
            },
            {
                title: "Excellent Industry Reputation",
                body: "With more than 20 years of experience, Creative Logo Design has become a trusted partner for all sorts of businesses looking for websites that are easy to use and get results.",
            },
            {
                title: "A Proven Process",
                body: "Our process starts from our first chat to your site going live is simple and clear, which will get you a great website without the fuss.",
            },
            {
                title: "Strong Digital Identity",
                body: "We hold ourselves to the same high standards we promise you. Every website we build is original and made to last.",
            },
            {
                title: "Great Communication",
                body: "You’ll always know what’s happening with your website. We keep things open for you to understand and work with you closely from start to finish.",
            },
            {
                title: "Unmatched Value",
                body: "You get a great website—creative, useful, and affordable. We focus on real value, not inflated prices.",
            },
        ],
    },
    about: {
        eyebrow: "About",
        heading: "Our Web Design",
        headingAccent: "Services",
        lead: "We’re not just a design studio; we’re with you every step of the way on the web. We help your business make a real difference online, from the first idea to the launch and beyond.",
        slides: [
            {
                title: "Modern Redesign",
                body: "An old website can slow your business down. We redesign sites with modern looks, easy navigation, and a style that fits your brand now.",
                image: {
                    src: "/assets/img/services/web-designing/modern-redesign.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Trusted Experience",
                body: "A new design helps your website work better and builds trust. We make your site faster, more attractive, and ready to turn visitors into customers.",
                image: {
                    src: "/assets/img/services/web-designing/trusted-experience.webp",
                    width: 2154,
                    height: 1467,
                },
            },
            {
                title: "Patience",
                body: "People learn about you through your website, which is more than just a place to go online. We will make sure that your site looks great and works well on all kinds of devices.",
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
        lead: "We combine smart technology with creative ideas and things that work in the real world to make a website that lasts. Because we work in steps, your site will be consistent and get results.",
        steps: [
            {
                title: "Start of the project",
                body: "Tell us what you want to do and what you want to achieve, and we’ll get to work right away to make sure your web project goes smoothly.",
            },
            {
                title: "Study and analysis",
                body: "We learn about your business, your customers, and what other websites do so that your site stands out.",
            },
            {
                title: "Wireframing & story creation",
                body: "We plan out your website so that it tells your story and keeps people interested.",
            },
            {
                title: "Web strategy",
                body: "We check that the design, text, and features of your site all work together to give you a strong, clear presence online.",
            },
            {
                title: "Website positioning",
                body: "We help the right people find your website so that your business stands out and keeps growing.",
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
        heading: "Let’s build a website your customers",
        headingAccent: "come back to",
        lead: "Tell us what your website needs to do and we’ll come back with a plan, a timeline and a straight answer on what it takes to get real results online.",
        button: "Get a proposal",
    },
};
