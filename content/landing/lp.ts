/**
 * `/lp` — the £199 web-design offer landing page.
 *
 * SOURCE OF TRUTH: the live page at `https://creativelogodesign.co.uk/lp/`,
 * captured 1 Aug 2026.
 *
 * Like both other landing pages this is NOT in the Laravel repo, and like
 * `/logo-design-offer` it is a **client-rendered Create React App bundle**: the
 * server returns a 3.8KB shell whose `<body>` is an empty `<div id="root">`, and
 * every word is assembled in the browser.
 *
 * Two things make it worse than `/logo-design-offer`, and both are the argument
 * for this rebuild:
 *
 * 1. The shell loads **three** bundles, one of which is `/logo-design-offer`'s
 *    entire application. That is why the served `<title>` is
 *    "Professional Bespoke Logo Design Services - Creative Logo Design" —
 *    byte-identical to `/logo-design-offer`'s. A crawler that does not execute
 *    JavaScript sees two distinct URLs asserting the same title and the same
 *    meta description. The page's real title, description and canonical are
 *    injected by react-helmet at runtime and exist nowhere in the HTML.
 * 2. The pricing tabs, the project carousel and the review carousel between them
 *    keep most of the page out of any single rendered DOM.
 *
 * So the copy below was read from the post-hydration DOM (driven over CDP with
 * `scripts/capture-rendered.mjs`) and cross-checked against the string literals
 * in `/lp/static/js/main.2c8a8db3.js`. See docs/CONTENT-PARITY.md.
 *
 * Every string is carried over verbatim. Deliberate exceptions are marked
 * `[fix]` inline and listed in docs/CONTENT-PARITY.md.
 */

import { contact } from "@/content/site";

/* ------------------------------------------------------------------ meta -- */

export const meta = {
    /* The react-helmet <title>, verbatim. It already names the company, so the
       page sets `title.absolute` to stop the root layout's template repeating
       it. The *served* shell title is /logo-design-offer's — see the header
       note; this is the one the page means. */
    title: "Web Design Service Starts from £199 - Creative Logo Design",
    description:
        "Get custom web design and development services from UK #1 design company specializes in website design and marketing. Best bespoke web designers and developers team.",
    /* Live <meta property="og:title"> from the static shell. It describes logo
       design rather than web design, and is identical to the og:title on both
       other landing pages — the live site's doing, not the rebuild's. Kept. */
    ogTitle: "Custom Logo Design Company in UK | Creative Logo Design",
} as const;

/* ------------------------------------------------------------ utility bar -- */

export const topBar = {
    offer: "Need a Website? You Dream It – We Build It",
    offerCta: "Get free consultancy",
    /* The live button's `title` attribute and the modal heading it sets, which
       are capitalised differently from the button's own label. Both kept. */
    offerCtaTitle: "Get Free Consultancy",
    phone: contact.phoneDisplay,
    chat: "Live Chat with Expert",
} as const;

/* ------------------------------------------------------------------ hero -- */

export const hero = {
    /* The live <h1> is "Custom Web Design / Starts from" and stops there: the
       price that completes the sentence — "£199" — is `saleprice.webp`, a
       bitmap carrying `alt="199"` (no currency, no context). So the headline
       offer, the number the entire ad spend bids on, is unreadable to a crawler
       and announces as "199" to a screen reader. It is HTML here. [fix] */
    titleLead: "Custom Web Design",
    titleTrail: "Starts from",
    price: "£199",
    lead: "Creative Logo Design delivers visionary web design and development services, including custom websites, responsive design, e-commerce solutions, SEO optimization, and user-friendly interfaces to enhance your digital presence.",
    checklist: [
        "Top-Ranked Web Design Agency in the UK",
        "Recognised for Award-Winning Web Designers",
        "Reliable performance with top-notch security measures",
        "Custom Web Design Solutions for Every Industry",
    ],
    ctaStart: "Get Started",
    /* The live "Get Started" button opens the modal pre-labelled with this
       package, so the enquiry it generates is attributed to it. */
    ctaStartPackage: "Website Starter Package",
    ctaPricing: "View Pricing",
    trustpilot: {
        /* [fix] The live badge links
           `trustpilot.com/review/webdesignmania.co.uk` — a different company's
           Trustpilot profile. The other two landing pages link this one. The
           badge is unchanged; only the destination is corrected. See
           docs/CONTENT-PARITY.md. */
        href: "https://www.trustpilot.com/review/creativelogodesign.co.uk",
        label: "Rated on Trustpilot",
        linkLabel: "Read our Trustpilot reviews",
    },
    form: {
        title: "Get a Website Quote",
        lead: "Get response from us within 24 hours",
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

/* -------------------------------------------------------- tech-stack rail -- */

/**
 * The marquee under the hero.
 *
 * The live page ships these as `alt="React Logo"`, `alt="NOP Logo"` and so on;
 * the platform names below are those strings with the redundant "Logo" dropped,
 * since the alt text of a logo should name the thing, not the file.
 */
export const tech = [
    { name: "React", src: "/assets/img/landing/lp/tech-react.webp" },
    { name: "nopCommerce", src: "/assets/img/landing/lp/tech-nopcommerce.webp" },
    { name: "WooCommerce", src: "/assets/img/landing/lp/tech-woocommerce.webp" },
    { name: "WordPress", src: "/assets/img/landing/lp/tech-wordpress.webp" },
    { name: "Shopify", src: "/assets/img/landing/lp/tech-shopify.webp" },
    { name: "Vue.js", src: "/assets/img/landing/lp/tech-vue.webp" },
    { name: "PHP", src: "/assets/img/landing/lp/tech-php.webp" },
    { name: "Laravel", src: "/assets/img/landing/lp/tech-laravel.webp" },
] as const;

/* -------------------------------------------------------------- packages -- */

export interface Package {
    name: string;
    tagline: string;
    price: string;
    was: string;
    features: readonly string[];
    /** Rendered under a "Value Added Services" sub-heading. */
    valueAdded?: readonly string[];
    /** Rendered under a "What will you Get?" sub-heading. */
    whatYouGet?: readonly string[];
}

export const packagesIntro = {
    title: "Budget Friendly Pricing Solutions",
    lead: "Our premium design packages provide bespoke website and branding solutions for small businesses and startups. We create unique brand identities and striking visuals, offering high-quality results with unlimited revisions, fast turnaround times, and a satisfaction guarantee.",
    cta: "START PROJECT",
    /* Rendered as a <strong> after each card's tagline on the live page. */
    discount: "Get 70% Off",
    valueAddedLabel: "Value Added Services",
    whatYouGetLabel: "What will you Get?",
} as const;

/**
 * Eighteen packages in six groups.
 *
 * The live page puts the six group names in a tab strip. Only the selected
 * group's three cards are ever in the DOM, so **fifteen of the eighteen** —
 * fifteen prices and fifteen feature lists — are never in the document at once,
 * on a page that has no document until React runs. All six groups are stacked
 * and server-rendered here, and the tab labels become the group headings.
 */
export const packageGroups: readonly {
    title: string;
    id: string;
    items: readonly Package[];
}[] = [
    {
        title: "Website Packages",
        id: "website-packages",
        items: [
            {
                name: "Website Starter Package",
                tagline: "Professional & Unique Design",
                price: "£199",
                was: "£665",
                features: [
                    "Design Up to 3 Pages",
                    "5 Visual Images",
                    "1 jQuery Slider Banner",
                    "2 CTAs & Lead forms",
                    "Facebook Page Design",
                    "X (Twitter) Page Design",
                    "YouTube Page Design",
                    "48 to 72 hours TAT",
                    "Complete Deployment",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
                valueAdded: [
                    "Cross-Browser Compatibility",
                    "SEO Friendly Coding",
                    "Experienced Account Manager",
                ],
            },
            {
                name: "Custom Website Essential Package",
                tagline: "Professional & Unique Design",
                price: "£399",
                was: "£1320",
                features: [
                    "Design Up to 6 Pages",
                    "8 Visual Images",
                    "3 jQuery Slider Banner",
                    "4 CTAs & Lead forms",
                    "Mobile Responsive Design",
                    "Regular Security Plugins",
                    "XML Sitemap",
                    "URL Submission in SE's",
                    "On-Page SEO",
                    "Google Analytics Tracking",
                    "Google Search Console Tracking",
                    "48 to 72 hours TAT",
                    "Complete Deployment",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
                valueAdded: [
                    "Cross-Browser Compatibility",
                    "SEO Friendly Coding",
                    "Experienced Account Manager",
                    "One Month On-going Support",
                ],
            },
            {
                name: "Custom Website Business Package",
                tagline: "Professional & Unique Design",
                price: "£599",
                was: "£1995",
                features: [
                    "Design Up to 10 Pages",
                    "Logo Design",
                    "Professional Custom Design",
                    "12 Visual Images",
                    "4 jQuery Slider Banner",
                    "6 CTAs & Lead Capturing Forms",
                    "Mobile Responsive Design",
                    "Standard Security Plugins",
                    "XML Sitemap",
                    "Robots File",
                    "URL Submission in SE's",
                    "On-Page SEO",
                    "Google Analytics Tracking",
                    "Google Search Console Tracking",
                    "Google Business Profile Creation",
                    "Complete Deployment",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
                valueAdded: [
                    "Cross-Browser Compatibility",
                    "SEO Friendly Coding",
                    "Experienced Account Manager",
                    "3 Month On-going Support & Maintenance",
                ],
            },
        ],
    },
    {
        title: "E-commerce Website Packages",
        id: "ecommerce-website-packages",
        items: [
            {
                name: "E-commerce Website Starter Package",
                tagline: "Ideal for small business and start Ups",
                price: "£749",
                was: "£2496",
                features: [
                    "eCommerce Integration",
                    "Design Up to 20 Pages",
                    "Graphic Design",
                    "Logo Design",
                    "Professional Web Design",
                    "Mobile Responsive Design",
                    "Chatbot/Livechat Setup",
                    "Reputation Management Setup",
                    "Newsletter Integration",
                    "Social Media Integration",
                    "Event Calendar Integration",
                    "Schema Optimization",
                    "Image Optimization",
                    "Search Engine Optimized",
                    "Formidable Pro Forms",
                    "Keyword Research",
                    "Market & Competitor Analysis",
                    "Google Analytics Setup",
                    "Submission to Search Engines",
                    "Google Search Console Setup",
                    "Google My Business Optimization",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
                valueAdded: [
                    "Cross-Browser Compatibility",
                    "SEO Friendly Coding",
                    "Experienced Account Manager",
                    "2 Month On-going Support & Maintenance",
                ],
            },
            {
                name: "E-commerce Website Business Package",
                tagline: "Perfect for Small Businesses!",
                price: "£1349",
                was: "£4496",
                features: [
                    "eCommerce Integration",
                    "Design Up to 100 Pages",
                    "Graphic Design",
                    "Logo Design",
                    "Professional Web Design",
                    "Mobile Responsive Design",
                    "Chatbot/Livechat Setup",
                    "Reputation Management Setup",
                    "Newsletter Integration",
                    "Social Media Integration",
                    "Event Calendar Integration",
                    "Schema Optimization",
                    "Image Optimization",
                    "Search Engine Optimized",
                    "Formidable Pro Forms",
                    "Keyword Research",
                    "Market & Competitor Analysis",
                    "Google Analytics Setup",
                    "Submission to Search Engines",
                    "Google Search Console Setup",
                    "Google My Business Optimization",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
                valueAdded: [
                    "Cross-Browser Compatibility",
                    "SEO Friendly Coding",
                    "Experienced Account Manager",
                    "3 Month On-going Support & Maintenance",
                ],
            },
            {
                name: "E-commerce Website Enterprise Package",
                tagline: "Advanced Features Included!",
                price: "£4994",
                was: "£16645",
                features: [
                    "eCommerce Integration",
                    "Advanced Order Management",
                    "Design Up to 100 to 1000 Pages",
                    "Product reviews and rating",
                    "Website Content Writing",
                    "Graphic Design",
                    "Logo Design",
                    "Professional Web Design",
                    "Mobile Responsive Design",
                    "Knowledgebase Setup",
                    "Chatbot/Livechat Setup",
                    "Reputation Management Setup",
                    "Newsletter Integration",
                    "Social Media Integration",
                    "Event Calendar Integration",
                    "Schema Optimization",
                    "Image Optimization",
                    "Search Engine Optimized",
                    "Formidable Pro Forms",
                    "Keyword Research",
                    "Market & Competitor Analysis",
                    "Google Analytics Setup",
                    "Submission to Search Engines",
                    "Google Search Console Setup",
                    "Google My Business Optimization",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
                valueAdded: [
                    "Cross-Browser Compatibility",
                    "SEO Friendly Coding",
                    "Experienced Account Manager",
                    "6 Month On-going Support & Maintenance",
                ],
            },
        ],
    },
    {
        title: "Logo Design Packages",
        id: "logo-design-packages",
        items: [
            {
                name: "Basic Logo Package",
                tagline: "Best Value for Money Guaranteed!",
                price: "£45",
                was: "£139",
                features: [
                    "2 Logo Design Concepts",
                    "4 Free Revisions",
                    "Dedicated Project Manager",
                    "24 - 48 Hours Delivery",
                ],
                whatYouGet: ["1 Finalized Logo", "2 File Formats (PNG, JPG)"],
            },
            {
                name: "Professional Logo Package",
                tagline: "Best Value for Money Guaranteed!",
                price: "£85",
                was: "£285",
                features: [
                    "4 Logo Design Concepts",
                    "8 Free Revisions",
                    "Dedicated Project Manager",
                    "24 - 48 Hours Delivery",
                ],
                whatYouGet: ["1 Finalized Logo", "3 File Formats (JPG, PNG, PDF)"],
            },
            {
                name: "Infinite Logo Package",
                tagline: "Best Value for Money Guaranteed!",
                price: "£145",
                was: "£490",
                features: [
                    "6 Logo Design Concepts",
                    "Unlimited Revisions",
                    "Dedicated Project Manager",
                    "24 - 48 Hours Delivery",
                ],
                whatYouGet: [
                    "1 Finalized Logo",
                    "All File Formats (Ai, PSD, EPS, PNG, JPG, PDF)",
                ],
            },
        ],
    },
    {
        title: "Stationery Design Packages",
        id: "stationery-design-packages",
        items: [
            {
                name: "Stationery Basic Package",
                tagline: "Complete Branding Solution!",
                price: "£129",
                was: "£415",
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
                name: "Stationery Startup Package",
                tagline: "Complete Branding Solution!",
                price: "£199",
                was: "£630",
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
                name: "Stationery Infinite Package",
                tagline: "Complete Branding Solution!",
                price: "£315",
                /* [fix] The live value is the bare string "1035" — the currency
                   symbol is missing from the source data, so the live card
                   renders "£315" struck through with "1035". Every other card on
                   the page carries the symbol. The number is unchanged. */
                was: "£1035",
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
        title: "SEO Packages",
        id: "seo-packages",
        items: [
            {
                name: "Basic SEO Package",
                tagline: "Complete Branding Solution!",
                price: "£249",
                was: "£799",
                features: [
                    "Prior Analysis",
                    "Business Analysis",
                    "Consumer Analysis",
                    "Competitor Analysis",
                    "15 Selected Keywords Targeting",
                    "15 Pages Keyword Targeted",
                    "Web Page Optimization",
                    "Meta Tags Creation",
                    "Keyword Optimization",
                    "Image Optimization",
                    "Inclusion of anchors",
                    "Tracking & Analysis",
                    "Google Analytics Installation",
                    "Google Webmaster Installation",
                    "Call To Action Plan",
                    "Creation of Sitemaps",
                    "Reporting",
                    "Monthly Reporting",
                    "Recommendation",
                    "Email Support",
                    "Phone Support",
                    "Off-Page Optimization",
                    "Social Bookmarking",
                    "Slideshare Marketing",
                    "Forums/FAQ's",
                    "Link Building",
                    "Directory Submission",
                    "Local Business Listings",
                    "100% Ownership Rights",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
            },
            {
                name: "Premium SEO Package",
                tagline: "Complete Branding Solution!",
                price: "£499",
                was: "£1650",
                features: [
                    "Prior Analysis",
                    "Business Analysis",
                    "Consumer Analysis",
                    "Competitor Analysis",
                    "30 Selected Keywords Targeting",
                    "30 Pages Keyword Targeted",
                    "Web Page Optimization",
                    "Meta Tags Creation",
                    "Keyword Optimization",
                    "Image Optimization",
                    "Inclusion of anchors",
                    "Tracking & Analysis",
                    "Google Analytics Installation",
                    "Google Webmaster Installation",
                    "Call To Action Plan",
                    "Creation of Sitemaps",
                    "Reporting",
                    "Monthly Reporting",
                    "Recommendation",
                    "Email Support",
                    "Phone Support",
                    "Off-Page Optimization",
                    "Social Bookmarking",
                    "Slideshare Marketing",
                    "Forums/FAQ's",
                    "Link Building",
                    "Directory Submission",
                    "Local Business Listings",
                    "100% Ownership Rights",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
            },
            {
                name: "Platinum SEO Package",
                tagline: "Complete Branding Solution!",
                price: "£749",
                was: "£2599",
                features: [
                    "Prior Analysis",
                    "Business Analysis",
                    "Consumer Analysis",
                    "Competitor Analysis",
                    "30 Selected Keywords Targeting",
                    "30 Pages Keyword Targeted",
                    "Web Page Optimization",
                    "Meta Tags Creation",
                    "Keyword Optimization",
                    "Image Optimization",
                    "Inclusion of anchor tags",
                    "Tracking & Analysis",
                    "Google Analytics Installation",
                    "Google Webmaster Installation",
                    "Call To Action Plan",
                    "Creation of Sitemaps",
                    "Reporting",
                    "Monthly Reporting",
                    "Recommendation",
                    "Email Support",
                    "Phone Support",
                    "Off-Page Optimization",
                    "Social Bookmarking",
                    "Slideshare Marketing",
                    "Forums/FAQ's",
                    "Link Building",
                    "Directory Submission",
                    "Local Business Listings",
                    "Blog Content Creation",
                    "Local SEO",
                    "100% Ownership Rights",
                    "100% Satisfaction Guarantee",
                    "100% Unique Design Guarantee",
                    "100% Money Back Guarantee",
                ],
            },
        ],
    },
    {
        title: "SMM Packages",
        id: "smm-packages",
        items: [
            {
                name: "Starter Package",
                tagline: "Complete Branding Solution!",
                price: "£199",
                was: "£665",
                features: [
                    "3 postings per week (per network) Facebook + Twitter + Instagram",
                    "Content Creation",
                    "Business Page Optimization",
                    "Social Media Strategy (Overview)",
                    "Facebook Likes Campaign",
                    "Monthly Progress report",
                    "Copywriting",
                ],
            },
            {
                name: "Scaling Package",
                tagline: "Complete Branding Solution!",
                price: "£399",
                was: "£1250",
                features: [
                    "4 postings per week (per network) Facebook + Twitter + Instagram + LinkedIn",
                    "Content Creation",
                    "Business Page Optimization",
                    "Social Media Strategy (Overview)",
                    "Facebook Likes Campaign",
                    "Monthly Progress report",
                    "Copywriting",
                ],
            },
            {
                name: "Venture Package",
                tagline: "Complete Branding Solution!",
                price: "£549",
                was: "£1799",
                features: [
                    "Copywriting and visual designs",
                    "Business Page Optimization",
                    "Ad Campaign Management",
                    "Spam monitoring",
                    "6 postings per week Facebook + Twitter + Instagram + Google+",
                    "Reputation Management",
                    "Social Account Setup",
                    "Content Creation",
                    "Social Media Hearing",
                    "Query and comments reply",
                ],
            },
        ],
    },
];

/* -------------------------------------------------------------- services -- */

export const services = {
    title: "Interested in our services?",
    lead: "Drop us a message, and our experts will reach out soon!",
    ctaDiscuss: "Let’s Discuss Your Project",
    ctaChat: "Live Chat",
    items: [
        {
            title: "Custom Web Development",
            body: "We specialise in building custom websites designed to meet and fulfill the unique requirements of your business. Each website is meticulously crafted to align with your goals, ensuring a seamless online presence.",
            icon: "/assets/img/landing/lp/svc-1.webp",
        },
        {
            title: "Mobile App Development",
            body: "Apps are developed using React Native, Flutter, & Swift, utilising Figma, Adobe XD, & Sketch for prototyping and UI/UX design to ensure optimised performance & seamless user experiences.",
            icon: "/assets/img/landing/lp/svc-2.webp",
        },
        {
            title: "E-Commerce Solutions",
            body: "Building online stores with secure payment systems and inventory management.",
            icon: "/assets/img/landing/lp/svc-3.webp",
        },
        {
            title: "Responsive Web Design",
            body: "Designing websites that provide optimal viewing experiences across all devices.",
            icon: "/assets/img/landing/lp/svc-4.webp",
        },
        {
            title: "Content Management Systems",
            body: "Creating and integrating platforms like WordPress, Joomla, and Drupal for easy content management.",
            icon: "/assets/img/landing/lp/svc-5.webp",
        },
        {
            title: "Web Application Development",
            body: "Building dynamic, interactive web apps for various business functions.",
            icon: "/assets/img/landing/lp/svc-6.webp",
        },
        {
            title: "SEO & Digital Marketing",
            body: "Optimising websites for search engines and driving online traffic through digital marketing strategies.",
            icon: "/assets/img/landing/lp/svc-7.webp",
        },
        {
            title: "UI/UX Design",
            body: "Designing intuitive user interfaces and experiences to enhance usability and engagement.",
            icon: "/assets/img/landing/lp/svc-8.webp",
        },
        {
            title: "Cloud Solutions",
            /* The live string starts with a stray non-breaking space. Dropped —
               it is whitespace, not wording. */
            body: "Implementing scalable cloud infrastructure for hosting, storage, and collaboration.",
            icon: "/assets/img/landing/lp/svc-9.webp",
        },
    ],
} as const;

/* ----------------------------------------------------------------- press -- */

/**
 * The three credibility marks under the services grid.
 *
 * The live page ships them as `alt="Description 1"`, `"Description 2"` and
 * `"Description 3"`, so the three badges the section exists to claim are named
 * nowhere in the document. The names below are read off the artwork. [fix]
 */
export const press = [
    { name: "Google Premier Partner", src: "/assets/img/landing/lp/press-1.webp" },
    { name: "Inc. 5000", src: "/assets/img/landing/lp/press-2.webp" },
    { name: "Forbes", src: "/assets/img/landing/lp/press-3.webp" },
] as const;

/* ----------------------------------------------------------------- combo -- */

export const combo = {
    eyebrow: "Ultimate Value for Start-ups and Businesses",
    title: "ALL-IN-ONE COMBO",
    /* [fix] £1199 exists on the live page only inside an inline base64 PNG
       carrying `alt="Combo Icon"`. No element states it in any textual form —
       the only other place the number appears is the modal heading the "Order
       Now" button sets, which is not in the document until it is clicked. */
    price: "£1199",
    ctaOrder: "Order Now",
    ctaCall: "Call Now",
    columns: [
        {
            title: "WEBSITE DESIGN",
            icon: "/assets/img/landing/lp/combo-website.webp",
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
            title: "LOGO DESIGN",
            icon: "/assets/img/landing/lp/combo-logo.webp",
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
            icon: "/assets/img/landing/lp/combo-stationary.webp",
            items: [
                "Business Card Design",
                "Letterhead Design",
                "Envelope Design",
                "MS Word Letterhead Design",
            ],
        },
        {
            title: "VALUE ADDED SERVICES",
            icon: "/assets/img/landing/lp/combo-value.webp",
            items: ["Dedicated Account Manager", "24/7 Chat Support"],
        },
    ],
} as const;

/* ------------------------------------------------------------------ work -- */

/**
 * Four project write-ups.
 *
 * The live page rotates these on a 5-second timer and keeps exactly one in the
 * DOM, so three of the four titles and three of the four descriptions have never
 * been in a crawlable document — nor has any of the copy, since the document is
 * empty until React runs. All four are prerendered here.
 *
 * Each live title carries a literal `</br>` and is injected with
 * `dangerouslySetInnerHTML`; the line break is modelled as two fields instead,
 * so no markup string reaches the renderer.
 *
 * The live `alt` on all four images is the same placeholder, "Project example".
 * Each now describes its own screenshot. [fix]
 */
export const work = {
    title: "Our Work Speaks",
    lead: "Our innovative web design and development services drive success across all industries",
    slides: [
        {
            id: "healthcare",
            titleLead: "Healthcare",
            titleTrail: "Management System",
            body: "The project focuses on creating a robust platform for hospitals, clinics, and healthcare providers to manage their operations and patient data securely. It features online appointment scheduling, secure patient record management compliant with HIPAA and GDPR, and telemedicine integrations for virtual consultations. The system includes doctor and department directories, automated reminders for follow-ups and prescriptions, and health tracking dashboards for patients.",
            image: "/assets/img/landing/lp/work/work-1.webp",
            imageAlt: "Hospital management platform shown on a laptop",
        },
        {
            id: "corporate",
            titleLead: "Corporate Website",
            titleTrail: "with Custom Features",
            body: "The website features an interactive homepage with animations, detailed service pages showcasing case studies and testimonials, and a career section with job postings and application forms. It also includes an integrated blog or knowledge hub for sharing insights and updates, as well as a custom analytics dashboard to monitor website performance. Built using WordPress for content management, JavaScript and CSS for interactive elements, and Google Analytics for performance tracking.",
            image: "/assets/img/landing/lp/work/work-2.webp",
            imageAlt: "Corporate website homepage shown on a laptop",
        },
        {
            id: "lms",
            titleLead: "Learning",
            titleTrail: "Management System (LMS)",
            body: "This project involved developing an LMS for educational institutions and corporate training programs to deliver courses online. It includes user registration and role management, a searchable course catalog, interactive lessons with videos, quizzes, and assignments, and progress tracking. The system supports payment gateway integration, mobile-friendly design, and third-party tool integrations like Zoom and Google Meet for live sessions. Built with React, Node.js, and MongoDB, it offers a scalable and user-friendly platform for online learning.",
            image: "/assets/img/landing/lp/work/work-3.webp",
            imageAlt: "Online learning platform shown on a laptop",
        },
        {
            id: "ecommerce",
            titleLead: "Custom E-commerce",
            titleTrail: "Website",
            body: "E-commerce platform designed to help businesses sell products or services online. The project features a unique design aligned with the brand identity, advanced product search and filtering, secure checkout, and streamlined inventory and order management. It includes integrations with CRM and ERP systems, supports multi-vendor functionality, and is SEO-optimized for enhanced online visibility and growth.",
            image: "/assets/img/landing/lp/work/work-4.webp",
            imageAlt: "Custom e-commerce storefront shown on a laptop",
        },
    ],
} as const;

/** The single app case study that follows the four website projects. */
export const foodApp = {
    title: "Food Delivery Application",
    body: "A food delivery application is a mobile platform that allows users to conveniently order food from local restaurants for delivery or pick-up. The app features an intuitive interface where users can browse through restaurant menus, customize their orders, and view real-time GPS tracking of their deliveries. It supports multiple payment options, including credit/debit cards and digital wallets, ensuring secure transactions. Customers can also receive push notifications for order updates, promotions, and new menu items. Additionally, the app includes a review and rating system, enabling users to share feedback on their dining experiences, enhancing the overall service quality and customer satisfaction.",
    image: "/assets/img/landing/lp/food-app.webp",
    imageAlt: "Food delivery app shown on two phones",
} as const;

/* ---------------------------------------------------------------- awards -- */

/**
 * Five award badges.
 *
 * The live carousel holds seven slides, but only five distinct images — the
 * first two are repeated to pad the loop — and every one of them ships as
 * `alt="Logo 1"` … `alt="Logo 7"`, so the awards the section exists to claim are
 * named nowhere. The names below are read off the artwork. [fix]
 *
 * The artwork is the same five badges `/logo-design-offer` already carries, so
 * those files are reused rather than staged a second time.
 */
export const awards = {
    title: "Award-Winning Web Design Company",
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
    titleLead: "Let’s Build Bespoke Web",
    titleTrail: "Solutions for Your Business",
    body: "Drop us a message, and our experts will get back to you shortly",
    button: "Leave A Message",
} as const;

/* --------------------------------------------------------------- reviews -- */

export const reviews = {
    title: "Voices of Satisfaction",
    lead: "See what our clients say about their experiences and the success we’ve achieved together, inspiring us to deliver excellence every day.",
    items: [
        {
            title: "We couldn't be more pleased with the...",
            body: "We couldn't be more pleased with the app design provided by Creative Logo Design. The interface is intuitive, the design is clean and modern, and the user experience has been dramatically improved. Adil and the team were professional, easy to work with, and consistently delivered on every milestone. Our app now stands out in a competitive market!",
            author: "R. Simmons",
        },
        {
            title: "Creative Logo Design did an amazing job...",
            body: "Creative Logo Design did an amazing job with our logo and stationery design. They created a cohesive and elegant brand package that perfectly aligns with our business vision. The designs were delivered quickly, and they exceeded our expectations in both creativity and quality. We've received so many compliments on our new branding!",
            author: "Victor Watson",
        },
        {
            title: "We chose Creative Logo Design for our...",
            body: "We chose Creative Logo Design for our eCommerce redesign, and it was the best decision we made. Their team was extremely professional, guiding us through every step of the design process. The end result is a stunning website that has improved our user engagement and boosted our online sales. The site is responsive, easy to navigate, and optimized for all devices. Creative Logo Design truly understands how to create a high-converting eCommerce platform!",
            author: "Charles Parks",
        },
    ],
} as const;

/* --------------------------------------------------------------- contact -- */

export const contactSection = {
    eyebrow: "Contact Us",
    /* One <h2> on the live page, split across two lines by a <br>. */
    titleLead: "Let's Build Your",
    titleTrail: "Digital Future",
    phone: contact.phoneDisplay,
    email: contact.email,
    address: "Continental House, 497 Sunleigh Road, Wembley, England, HA0 4LY",
    addressHref: "https://maps.app.goo.gl/hzEmaUB6sqde6kH28",
    form: {
        submit: "Submit Now",
        /* Live placeholders, verbatim. The live inputs carry no <label>, so
           these double as the accessible names there; here they are real
           labels and the placeholder is decorative. */
        placeholders: {
            name: "Your full name*",
            email: "E-mail address*",
            phone: "Phone Number*",
            message: "Your message*",
        },
    },
} as const;

/* --------------------------------------------------------------- support -- */

export const support = [
    {
        label: "Our Support Team",
        value: "24/7 Online",
        href: contact.whatsapp,
        icon: "/assets/img/landing/lp/support-team.webp",
    },
    {
        label: "Consult Our Expert",
        value: contact.phoneDisplay,
        href: `tel:${contact.phoneE164}`,
        icon: "/assets/img/landing/lp/support-phone.webp",
    },
    {
        label: "Live Support",
        value: "Chat Now",
        href: contact.whatsapp,
        icon: "/assets/img/landing/lp/support-live.webp",
    },
] as const;

/* ---------------------------------------------------------------- footer -- */

export const footer = {
    /* The live footer's three icons, in the live order. Note it links LinkedIn,
       which the main site's `social` list in content/site.ts does not carry, and
       omits X, which it does — so this list is the page's own, not the site's.
       All three ship with no accessible name at all; the labels are added. */
    social: [
        { label: "Facebook", href: "https://www.facebook.com/Creativelogodesignuk/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/creativelogo-design-uk/" },
        { label: "Instagram", href: "https://www.instagram.com/creative_logo_design_uk/" },
    ],
    copyright: "© Copyright 2025, Creative Logo Design",
    /* [fix] Both live links 404. They point at `/terms-and-conditions.html` and
       `/privacy-policy.html`; the pages exist without the `.html`, and both are
       routes in this rebuild — the same live bug as `/logo-design-offer`. Link
       text is unchanged. See docs/CONTENT-PARITY.md. */
    legal: [
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
    ],
} as const;

/* ---------------------------------------------------------- quote dialog -- */

export const quoteDialog = {
    title: "Request a Quote",
    close: "Close",
    submit: "Submit",
    successTitle: "Thanks — your request is in.",
    /* The live modal's own labels, verbatim. */
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number",
    message: "Message",
} as const;
