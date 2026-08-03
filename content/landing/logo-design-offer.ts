/**
 * `/logo-design-offer` — the £19 logo-design offer landing page.
 *
 * SOURCE OF TRUTH: the live page at
 * `https://creativelogodesign.co.uk/logo-design-offer/`, captured 1 Aug 2026.
 *
 * Like `/creative-logo-design`, this page is NOT in the Laravel repo — but it is
 * a different animal again. It is a **client-rendered Create React App bundle**:
 * the server sends a 3KB shell whose `<body>` is an empty `<div id="root">`, and
 * every word on the page is assembled in the browser from
 * `/logo-design-offer/static/js/main.896806be.js` (550KB).
 *
 * So the copy below was not read off the HTML — there is none. It was taken from
 * the post-hydration DOM, driven over CDP, and cross-checked against the string
 * literals in the bundle. See docs/CONTENT-PARITY.md.
 *
 * That also means four of the strings here have never been served to a crawler
 * in any form, because the carousel that holds them renders one slide at a time
 * (`work.slides`), and the live page's own `<h1>` price is a bitmap. Both are
 * fixed by rebuilding rather than porting — no wording changed.
 *
 * Every string is carried over verbatim. Deliberate exceptions are marked
 * `[fix]` inline and listed in docs/CONTENT-PARITY.md.
 */

import { contact } from "@/content/site";

/* ------------------------------------------------------------------ meta -- */

export const meta = {
    /* Live <title>, verbatim. It already names the company, so the page sets
       `title.absolute` to stop the root layout's template repeating it. */
    title: "Professional Bespoke Logo Design Services - Creative Logo Design",
    description:
        "Creative Logo Design in Wembley, UK, offers custom logo creation, branding, graphic design, and website development.",
    /* Live <meta property="og:title">, which differs from the <title>. Kept —
       and it is identical to the og:title on /creative-logo-design, which is
       the live site's doing, not the rebuild's. */
    ogTitle: "Custom Logo Design Company in UK | Creative Logo Design",
} as const;

/* ------------------------------------------------------------ utility bar -- */

export const topBar = {
    offer: "Need a Logo? Get a 100% Custom-Designed Logo Now!",
    offerCta: "Get free consultancy",
    phone: contact.phoneDisplay,
    chat: "Live Chat with Expert",
} as const;

/* ------------------------------------------------------------------ hero -- */

export const hero = {
    /* The live <h1> is "Bespoke Logo Design Starts from", and the price that
       completes the sentence — "£19" — is baked into `price.webp`, a 12KB
       bitmap. So the headline offer is the one thing on the page that no
       crawler and no screen reader can read. It is HTML here. [fix] */
    titleLead: "Bespoke Logo Design",
    titleTrail: "Starts from",
    price: "£19",
    lead: "Creative Logo Design specialises in crafting unique, professional logos that capture your brand's essence and leave a lasting impression.",
    checklist: [
        "Top-Ranked Logo Design Agency in the UK",
        "Recognised for Award-Winning Logo Designers",
        "Enjoy Unlimited Revisions to Perfect Your Logo",
        "Custom Logo Design Solutions for Every Industry",
    ],
    ctaStart: "Get Started",
    ctaPricing: "View Pricing",
    trustpilot: {
        /* The live page links the non-localised Trustpilot domain; the other
           landing page links `uk.`. Both resolve to the same profile. */
        href: "https://www.trustpilot.com/review/creativelogodesign.co.uk",
        label: "Rated on Trustpilot",
        linkLabel: "Read our Trustpilot reviews",
    },
    form: {
        title: "Request a Logo Design Quote",
        lead: "Avail Our 70% Discount Offer for Logo Design",
        submit: "Send Your Query",
        /* Live placeholders, verbatim — the live inputs carry no <label> at
           all, so these double as the accessible names there. Here they are
           real labels and the placeholder is decorative. */
        placeholders: {
            name: "Enter your name*",
            phone: "Enter your number*",
            email: "Enter your email*",
            message: "Message",
        },
    },
} as const;

/* -------------------------------------------------------------- packages -- */

export interface Package {
    name: string;
    tagline: string;
    price: string;
    was: string;
    bestSeller?: boolean;
    features: readonly string[];
}

export const packagesIntro = {
    title: "Custom Logo & Graphic Design Packages",
    lead: "Our premium design packages offer exceptional custom logo and graphic design solutions for small businesses and startups. From unique brand identities to standout visuals, we ensure high-quality results with unlimited revisions, quick turnaround times, and complete satisfaction guaranteed.",
    cta: "START PROJECT",
    bestSeller: "BEST SELLER",
} as const;

const TAGLINE = "Best Value for Money Guaranteed!";

export const packageGroups: readonly {
    title: string;
    id: string;
    items: readonly Package[];
}[] = [
    {
        title: "Logo Design Packages",
        id: "logo-design-packages",
        items: [
            {
                name: "Basic Logo Package",
                tagline: TAGLINE,
                price: "£19",
                was: "£117",
                features: [
                    "2 Logo Design Concepts",
                    "4 Free Revisions",
                    "Dedicated Project Manager",
                    "24 - 48 Hours Delivery",
                    "1 Finalized Logo",
                    "2 File Formats (PNG, JPG)",
                ],
            },
            {
                name: "Standard Logo Package",
                tagline: TAGLINE,
                price: "£69",
                was: "£230",
                bestSeller: true,
                features: [
                    "4 Logo Design Concepts",
                    "8 Free Revisions",
                    "Dedicated Project Manager",
                    "24 - 48 Hours Delivery",
                    "1 Finalized Logo",
                    "3 File Formats (JPG, PNG, PDF)",
                ],
            },
            {
                name: "Elite Logo Package",
                tagline: TAGLINE,
                price: "£119",
                was: "£395",
                features: [
                    "6 Logo Design Concepts",
                    "Unlimited Revisions",
                    "Dedicated Project Manager",
                    "24 - 48 Hours Delivery",
                    "1 Finalized Logo",
                    "All File Formats (Ai, PSD, EPS, PNG, JPG, PDF)",
                ],
            },
        ],
    },
    {
        title: "Branding Packages",
        id: "branding-packages",
        items: [
            {
                name: "Starter Package",
                tagline: TAGLINE,
                price: "£99",
                was: "£330",
                features: [
                    "Business Card Design",
                    "Letterhead Design",
                    "Envelope Design",
                    "MS Word Letterhead",
                    "Email Signature Design",
                    "Invoice Design",
                    "Facebook Banner Design",
                    "YouTube Banner Design",
                    "Twitter Banner Design",
                    "LinkedIn Banner Design",
                    "Logo Watermark",
                ],
            },
            {
                name: "Premium Package",
                tagline: TAGLINE,
                price: "£139",
                was: "£460",
                bestSeller: true,
                features: [
                    "Business Card Design",
                    "Letterhead Design",
                    "Envelope Design",
                    "MS Word Letterhead",
                    "Email Signature Design",
                    "Invoice Design",
                    "Facebook Banner Design",
                    "YouTube Banner Design",
                    "Twitter Banner Design",
                    "LinkedIn Banner Design",
                    "Logo Watermark",
                    "Favicon Design",
                    "Polo/T-Shirt Design",
                    "Cap/Hat Design",
                ],
            },
            {
                name: "Professional Package",
                tagline: TAGLINE,
                price: "£249",
                was: "£830",
                features: [
                    "Business Card Design",
                    "Letterhead Design",
                    "Envelope Design",
                    "MS Word Letterhead",
                    "Email Signature Design",
                    "Invoice Design",
                    "Facebook Banner Design",
                    "YouTube Banner Design",
                    "Twitter Banner Design",
                    "LinkedIn Banner Design",
                    "Logo Watermark",
                    "Favicon Design",
                    "Polo/T-Shirt Design",
                    "Cap/Hat Design",
                    "Bag Design",
                    "Signage Design",
                    "Flyer Design",
                ],
            },
        ],
    },
    {
        title: "Website Packages",
        id: "website-packages",
        items: [
            {
                name: "Basic Package",
                tagline: TAGLINE,
                price: "£199",
                was: "£660",
                features: [
                    "3 Page Website",
                    "5 Revisions",
                    "2 Stock Images",
                    "1 jQuery Slider Banner",
                    "2 Banner Designs",
                    "Any two social media designs",
                    "48 to 72 hours TAT",
                    "Complete Deployment",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
            },
            {
                name: "Elite Package",
                tagline: TAGLINE,
                price: "£500",
                was: "£1660",
                bestSeller: true,
                features: [
                    "10 Unique Pages Website",
                    "Unlimited Revisions",
                    "CMS / Admin Panel Support",
                    "12 Stock images",
                    "8 Banner Designs",
                    "1 jQuery Slider Banner",
                    "Any Three Social Media Integration",
                    "FREE Google Friendly Sitemap",
                    "Mobile Responsive",
                    "48 to 72 hours TAT",
                    "Complete Deployment",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
            },
            {
                name: "Ecommerce Package",
                tagline: TAGLINE,
                price: "£1199",
                was: "£3999",
                features: [
                    "Up to 30 Web Pages Design and HTML",
                    "1 Contact Form",
                    "Content Management System",
                    "Google Sitemap Integration",
                    "Unlimited Revisions and Design Layout",
                    "3 Sliding Banners",
                    "Up to 10 Stock Photos",
                    "SEO Friendly",
                    "Responsive Layout",
                    "Payment Gateway Integration",
                    "Shopping Cart",
                    "1 Shared Design",
                    "Dedicated Account Manager",
                    "Email & Phone Support",
                    "100% Satisfaction Guarantee",
                ],
            },
        ],
    },
];

/* -------------------------------------------------------------- services -- */

export const services = {
    title: "Premium Design Services for Your Business",
    lead: "Creative Logo Design in the UK offers a complete range of services, including professional logo design, bespoke stationery, and innovative web design. Our talented designers and developers creates timeless and captivating designs to ensure your brand leaves a lasting impression and stands out in today’s competitive market.",
    ctaDiscuss: "Let’s Discuss Your Project",
    ctaChat: "Live Chat",
    items: [
        {
            title: "Custom Logo Design",
            body: "Get custom logo design services in UK for every industry, crafted by expert local logo designers to showcase your brand.",
            icon: "/assets/img/landing/logo-design-offer/svc-1.svg",
        },
        {
            title: "Brand Stationary Design",
            body: "Our stationery design services include professional business cards, eye-catching flyers, and premium branding materials to elevate your business.",
            icon: "/assets/img/landing/logo-design-offer/svc-2.svg",
        },
        {
            title: "UI/UX Design",
            body: "We specialise in crafting intuitive user interfaces & seamless user experiences that enhance usability, improve functionality, and drive engagement.",
            icon: "/assets/img/landing/logo-design-offer/svc-3.svg",
        },
        {
            title: "Custom Web Development",
            /* Verbatim. The live page repeats the mobile-app sentence here and
               drops the full stop; both are the live wording. */
            body: "We develop high-performance mobile apps using React Native, Flutter, and Swift, ensuring seamless functionality across platforms",
            icon: "/assets/img/landing/logo-design-offer/svc-4.svg",
        },
        {
            title: "E-Commerce Solutions",
            body: "Developing online stores with secure payment systems, efficient inventory management, and seamless shopping experiences for your customers.",
            icon: "/assets/img/landing/logo-design-offer/svc-5.svg",
        },
        {
            title: "Web Application Development",
            body: "Our web application development services focus on creating dynamic, interactive solutions that cater to a wide range of business needs.",
            icon: "/assets/img/landing/logo-design-offer/svc-6.svg",
        },
        {
            title: "Mobile App Development",
            body: "We develop high-performance mobile apps using React Native, Flutter, and Swift, ensuring seamless functionality across platforms.",
            icon: "/assets/img/landing/logo-design-offer/svc-7.svg",
        },
        {
            title: "Content Management Systems",
            body: "Our content management systems provide intuitive platforms designed for easy content creation, management, & publishing, streamlining website updates & enhancing overall functionality for businesses.",
            icon: "/assets/img/landing/logo-design-offer/svc-8.svg",
        },
        {
            title: "SEO & Digital Marketing",
            body: "Boost your online presence with our SEO optimization and digital marketing strategies to drive targeted traffic and increase visibility.",
            icon: "/assets/img/landing/logo-design-offer/svc-9.svg",
        },
    ],
} as const;

/* ----------------------------------------------------------- as featured -- */

export const featured = {
    title: "As Featured In",
    items: [
        { name: "BuzzFeed", src: "/assets/img/landing/logo-design-offer/feat-1.svg" },
        { name: "The Huffington Post", src: "/assets/img/landing/logo-design-offer/feat-2.svg" },
        { name: "Just Creative", src: "/assets/img/landing/logo-design-offer/feat-3.svg" },
        { name: "Entrepreneur", src: "/assets/img/landing/logo-design-offer/feat-4.svg" },
        { name: "Inc.", src: "/assets/img/landing/logo-design-offer/feat-5.svg" },
    ],
} as const;

/* ----------------------------------------------------------------- combo -- */

export const combo = {
    eyebrow: "Ultimate Value for Start-ups and Businesses",
    title: "ALL-IN-ONE COMBO",
    /* £1199 is an SVG on the live page (`price1199.svg`), text here. [fix] */
    price: "£1199",
    ctaOrder: "Order Now",
    ctaCall: "Call Now",
    columns: [
        {
            title: "LOGO DESIGN",
            icon: "/assets/img/landing/logo-design-offer/combo-logo.svg",
            items: [
                "Unlimited Logo Concepts",
                "Unlimited Revisions",
                "Favicon Design",
                "High-Resolution Files",
                "All Final File Formats",
            ],
        },
        {
            title: "STATIONARY DESIGN",
            icon: "/assets/img/landing/logo-design-offer/combo-stationary.svg",
            items: [
                "Business Card Design",
                "Letterhead Design",
                "Envelope Design",
                "MS Word Letterhead Design",
            ],
        },
        {
            title: "WEBSITE DESIGN",
            icon: "/assets/img/landing/logo-design-offer/combo-website.svg",
            items: [
                "Unlimited Pages Website",
                "Content Management System",
                "Complete Deployment",
                "5 Stock Photos + 3 Banner Designs",
                "Any 3 Social Media Cover Design",
                "Complete W3C Certified HTML",
            ],
        },
        {
            title: "VALUE ADDED SERVICES",
            icon: "/assets/img/landing/logo-design-offer/combo-value.svg",
            items: ["Dedicated Account Manager", "24/7 Chat Support"],
        },
    ],
} as const;

/* ------------------------------------------------------------------ work -- */

const WORK = "/assets/img/landing/logo-design-offer/work";

/**
 * Four industry slides.
 *
 * The live page rotates these on a 5-second timer and keeps exactly one in the
 * DOM, so three of the four titles and three of the four descriptions have never
 * been in a crawlable document — nor has any of the copy, since the document is
 * empty until React runs. All four are prerendered here.
 *
 * Each slide's nine logos arrive from the live server as ONE bitmap with the
 * whole 3x3 grid baked in (`FoodIndustry.webp` and friends), so the 36 client
 * names below were unreadable to anything but a human eye. They are cut into
 * individual tiles here — gutter-detected, not pitch-guessed — and each carries
 * its own alt text. Same asset problem, and same answer, as `platform.webp` on
 * /creative-logo-design.
 */
export const work = {
    title: "Our Work Speaks",
    lead: "Our cutting-edge logo design services foster success across diverse industries, creating impactful and memorable brand identities. A selection of outstanding brands and organizations we've had the privilege of working with recently.",
    cta: "Get Started",
    slides: [
        {
            id: "pet",
            title: "Pet Care Logo Design",
            body: "Our Pet Care Logo Design services in the UK, led by expert pet logo designers, specialise in crafting unique, playful, and memorable logos that reflect the heart and care of your pet business. Whether you're a pet groomer, pet store, or veterinary clinic, we create logos that resonate with pet owners and build brand loyalty.",
            logos: [
                { name: "Animal", src: `${WORK}/pet-1.webp` },
                { name: "The Hounds of Herts", src: `${WORK}/pet-2.webp` },
                { name: "Texas Chocolate Cavaliers of Castle Ridge", src: `${WORK}/pet-3.webp` },
                { name: "RamFit", src: `${WORK}/pet-4.webp` },
                { name: "Dizzy's Doggy Daycare", src: `${WORK}/pet-5.webp` },
                { name: "Pixie Mist Bengals", src: `${WORK}/pet-6.webp` },
                { name: "Fetch Dog Walking Service", src: `${WORK}/pet-7.webp` },
                { name: "Lockdalm", src: `${WORK}/pet-8.webp` },
                { name: "Pawfect Walks", src: `${WORK}/pet-9.webp` },
            ],
        },
        {
            id: "food",
            title: "Custom Logo Designs for the Food Industry",
            body: "We’ve proudly designed custom logos for food industries, capturing the essence of their brands with creativity and precision. From vibrant restaurant logos to sleek food packaging designs, our tailored approach ensures each logo reflects the unique flavors, values, and vision of every client.",
            logos: [
                { name: "The Old Butchers Cottages, Loftus", src: `${WORK}/food-1.webp` },
                { name: "The Veterans Coffee Company", src: `${WORK}/food-2.webp` },
                { name: "The Bird Brew Co.", src: `${WORK}/food-3.webp` },
                { name: "The Sweetest Thing", src: `${WORK}/food-4.webp` },
                { name: "Creme & Crumble", src: `${WORK}/food-5.webp` },
                { name: "Freeze Dried Candy", src: `${WORK}/food-6.webp` },
                { name: "MrsTheCakeLady", src: `${WORK}/food-7.webp` },
                { name: "Fusão de Sabores Brazil & Cia", src: `${WORK}/food-8.webp` },
                { name: "Anas, Eliyas & J", src: `${WORK}/food-9.webp` },
            ],
        },
        {
            id: "construction",
            title: "Bespoke Logo Designs for Construction Companies",
            body: "We have proudly served construction companies by designing custom logos that reflect their expertise, reliability, and strength. Our logos are crafted to stand out in the industry, creating strong brand identities that resonate with clients and help businesses make a lasting impression.",
            logos: [
                { name: "K&D Build Group Ltd", src: `${WORK}/construction-1.webp` },
                { name: "A J C Plastering", src: `${WORK}/construction-2.webp` },
                { name: "Corner Stone Real Estate Solutions", src: `${WORK}/construction-3.webp` },
                { name: "Skyline Dynamics Group Ltd", src: `${WORK}/construction-4.webp` },
                { name: "Property Guru Real Estate Broker", src: `${WORK}/construction-5.webp` },
                { name: "FEAT Tiling Ltd", src: `${WORK}/construction-6.webp` },
                { name: "A&A Take Away LLC", src: `${WORK}/construction-7.webp` },
                { name: "LB Precision Roofing", src: `${WORK}/construction-8.webp` },
                { name: "Navitas Group Energy Efficiency Assessment", src: `${WORK}/construction-9.webp` },
            ],
        },
        {
            id: "every",
            title: "Logo Design Solutions Across Every Industry",
            body: "At Logos from All Around, we’ve proudly designed logos for every industry, from healthcare to tech, retail to construction. Our diverse expertise allows us to create unique, memorable logos that reflect the essence of each business, helping them stand out and thrive in their respective markets.",
            logos: [
                { name: "Pezzo Food Group", src: `${WORK}/every-1.webp` },
                { name: "National Interlock LLC", src: `${WORK}/every-2.webp` },
                { name: "JDL Installers", src: `${WORK}/every-3.webp` },
                { name: "The Rose & Crown, Elmsett", src: `${WORK}/every-4.webp` },
                { name: "Kraken Water Solutions", src: `${WORK}/every-5.webp` },
                { name: "Hummingbird Healthcare", src: `${WORK}/every-6.webp` },
                { name: "Walking On Clouds Veterinary Physiotherapy", src: `${WORK}/every-7.webp` },
                { name: "Girl Power Electric", src: `${WORK}/every-8.webp` },
                { name: "Cali", src: `${WORK}/every-9.webp` },
            ],
        },
    ],
} as const;

/* ---------------------------------------------------------------- awards -- */

export const awards = {
    title: "Award Winning Logo Design Company",
    items: [
        {
            name: "Best Design Awards 2022 — DesignRush",
            src: "/assets/img/landing/logo-design-offer/award-1.webp",
            width: 503,
            height: 654,
        },
        {
            name: "CSS Design Awards",
            src: "/assets/img/landing/logo-design-offer/award-2.webp",
            width: 427,
            height: 599,
        },
        {
            name: "Best Social Media Marketing Agencies — DesignRush",
            src: "/assets/img/landing/logo-design-offer/award-3.webp",
            width: 419,
            height: 552,
        },
        {
            name: "CrowdReviews.com Top 25 for Web Development, based on client reviews",
            src: "/assets/img/landing/logo-design-offer/award-4.webp",
            width: 687,
            height: 533,
        },
        {
            name: "Local Excellence 2023 Winner — Los Angeles",
            src: "/assets/img/landing/logo-design-offer/award-5.webp",
            width: 554,
            height: 554,
        },
    ],
} as const;

/* ------------------------------------------------------------------- cta -- */

export const cta = {
    /* One <h2> on the live page, split across two lines by a <br>. */
    titleLead: "Let’s Create Something",
    titleAccent: "Extraordinary!",
    body: "We’d love to discuss your project and answer any questions you have. Reach out for a free quote on your logo, graphic design, or website needs.",
    button: "Request a Free Quote",
} as const;

/* --------------------------------------------------------------- reviews -- */

export const reviews = {
    title: "Voices Of Satisfaction",
    lead: "Discover what our clients are saying about their experiences and the successes we've achieved together, motivating us to deliver excellence with every project.",
    items: [
        {
            title: "Excellent service",
            body: "Darian and Edward were patient with my lack of experience and guided me through all the services. They communicated clearly, and I love my logo! Will definitely return for website support. 👍",
            author: "Becci",
        },
        {
            title: "Amazing Support, very proactive!",
            body: "The support was beyond exceptional—very professional and proactive. Their pricing is also very reasonable compared to the market. Extremely satisfied!",
            author: "Gurvinder",
        },
        {
            title: "Brilliant Work!",
            body: "They made adjustments exactly how I wanted. Would definitely recommend!",
            author: "Luke Townsend",
        },
        {
            title: "Outstanding Service",
            body: "Daniel helped me with my logo, and it looks amazing. He kept me updated throughout the process. I’ll be back for a banner soon!",
            author: "Akaash Ashiq",
        },
        {
            title: "Exceptional Creativity!",
            body: "Absolutely loved working with this team. They understood my vision and turned it into a beautiful design. The attention to detail was impressive!",
            author: "Michael Lee",
        },
        {
            title: "Great Communication & Quality",
            body: "The team exceeded my expectations! They provided fast responses, professional work, and an outstanding final product. Would highly recommend them!",
            author: "Sarah Thompson",
        },
    ],
} as const;

/* --------------------------------------------------------------- support -- */

export const support = [
    {
        label: "Our Support Team",
        value: "24/7 Online",
        href: contact.whatsapp,
        icon: "/assets/img/landing/logo-design-offer/support-team.webp",
    },
    {
        label: "Consult Our Expert",
        value: contact.phoneDisplay,
        href: `tel:${contact.phoneE164}`,
        icon: null,
    },
    {
        label: "Live Support",
        value: "Chat Now",
        href: contact.whatsapp,
        icon: "/assets/img/landing/logo-design-offer/support-live.webp",
    },
] as const;

/* ---------------------------------------------------------------- footer -- */

export const footer = {
    about: "Located in Wembley, UK, Creative Logo Design is a leading design agency dedicated to delivering exceptional logo design, branding, graphic design, and web development services. We specialise in creating unique, bespoke designs that resonate with your brand's essence. Whether you're launching a new venture or looking to refresh an established brand, we provide innovative, visually striking solutions to help you stand out. Our commitment to high-quality craftsmanship and client-focused results ensures your project is executed with precision and care.",
    contactTitle: "Contact Info",
    /* The live footer's three icons. Note it links LinkedIn, which the main
       site's `social` list in content/site.ts does not carry, and omits X,
       which it does — so this list is the page's own, not the site's. */
    social: [
        { label: "Facebook", href: "https://www.facebook.com/Creativelogodesignuk/" },
        { label: "Instagram", href: "https://www.instagram.com/creative_logo_design_uk/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/creativelogo-design-uk/" },
    ],
    address: "Continental House, 497 Sunleigh Road, Wembley, England, HA0 4LY",
    addressHref:
        "https://www.google.com/maps?q=Continental+House,+497+Sunleigh+Road,+Wembley,+England,+HA0+4LY",
    copyright: "©Copyright 2025,",
    copyrightBrand: "CreativeLogoDesign.",
    /* [fix] Both live links 404. They point at `/terms-and-conditions.html` and
       `/privacy-policy.html`; the pages exist without the `.html`, and both are
       routes in this rebuild. Verified with curl on 1 Aug 2026 — see
       docs/CONTENT-PARITY.md. Link text is unchanged. */
    legal: [
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    disclaimerLabel: "Disclaimer:",
    disclaimer:
        "The logo, name, and graphic representation of Creative Logo Design, along with its products and services, are trademarks of Creative Logo Design. All other company names, trademarks, and logos mentioned on this website belong to their respective owners. These references do not imply endorsement, sponsorship, or recommendation by Creative Logo Design, nor do they suggest that Creative Logo Design is endorsed, sponsored, or recommended by the respective trademark owners.",
    form: {
        title: "Request a Callback",
        submit: "Submit",
        labels: {
            name: "Full name",
            email: "Email address",
            phone: "Phone number",
            message: "Message",
        },
        placeholders: {
            name: "John Doe",
            email: "example@gmail.com",
            phone: "1234567890",
        },
    },
} as const;

/* ---------------------------------------------------------- quote dialog -- */

export const quoteDialog = {
    title: "Request a Logo Design Quote",
    close: "Close",
    submit: "Send Your Query",
    successTitle: "Thanks — your request is in.",
    /* The live hero form has no <label> on any field, only placeholders; the
       live footer form has real labels. These are the footer's, reused for both
       so every input on the page has an accessible name. */
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number",
    message: "Message",
} as const;
