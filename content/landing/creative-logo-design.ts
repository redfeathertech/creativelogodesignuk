/**
 * `/creative-logo-design` — the logo-design landing page.
 *
 * SOURCE OF TRUTH: the live page at
 * `https://creativelogodesign.co.uk/creative-logo-design/`, captured 31 Jul 2026.
 *
 * This page is NOT in the Laravel repo. It is a standalone static folder
 * uploaded to the server (own Bootstrap 5 build, own jQuery, own Owl Carousel,
 * own PHPMailer endpoint), so there is no Blade template to diff against and no
 * second "approved redesign" version of the wording. The live HTML is the only
 * version there has ever been, which makes it authoritative without
 * qualification — see docs/CONTENT-PARITY.md.
 *
 * Every string below is carried over verbatim. The three deliberate exceptions
 * are marked `[fix]` inline and listed in CONTENT-PARITY.md.
 *
 * It is also the first page in the rebuild with **no site navigation**. That is
 * on purpose: it is a paid-traffic page whose only exits are its own CTAs, and
 * it is why `app/(landing)/` exists as a route group separate from `(site)`.
 */

import { contact } from "@/content/site";

/* ------------------------------------------------------------------ meta -- */

export const meta = {
    /* Verbatim, minus a trailing space the live <title> carries. The live page
       also canonicalises itself to the homepage, which is why it has never
       ranked in its own right; the rebuild is self-canonical. See
       docs/SEO-PLAYBOOK.md. */
    title: "Custom Logo Design Starting £35 - Creative Logo Design",
    description:
        "Creative Logo Design is a UK based design agency specializing in custom logo design services. Our expert logo designers are ready to give your brand an identity.",
    /* Live: <meta property="og:title">, which differs from the <title>. Kept. */
    ogTitle: "Custom Logo Design Company in UK | Creative Logo Design",
} as const;

/* ------------------------------------------------------------ utility bar -- */

export const topBar = {
    offer: "Limited Time Offer - Activate Your 70% off Coupon!",
    offerCta: "Get free consultancy",
    phone: `Phone Number ${contact.phoneDisplay}`,
    chat: "Live Chat with Expert",
} as const;

/* ------------------------------------------------------------------ hero -- */

export const hero = {
    /* One <h1> on the live page: "Get Your Custom Logo Designs In", with
       "Custom" in <b>. The bold word becomes the gradient accent here — same
       words, same order, same emphasis. */
    titleLead: "Get Your",
    titleAccent: "Custom",
    titleTrail: "Logo Designs In",
    lead: "Creative Logo Design, a UK-based company, believes your brand deserves to shine as uniquely as it does. Let us help you stand out from the crowd with captivating and timeless custom logo designs.",
    checklist: [
        "Ranked #1 Logo Design Agency in UK",
        "Award-Winning Logo Designers",
        "Unlimited Revisions For Your Logo Design",
        "Personalized Approach to Client Needs",
    ],
    ctaQuote: "Request a Quote",
    ctaPricing: "VIEW PRICING",
    trustpilot: {
        href: "https://uk.trustpilot.com/review/creativelogodesign.co.uk",
        label: "Rated on Trustpilot",
        linkLabel: "Read our Trustpilot reviews",
    },
    /* The offer card above the hero form. The live page draws the £35 and the
       "MEGA SAVER DEAL" flash as bitmaps with the text baked in; both are HTML
       here, so the price is real text a crawler and a screen reader can read.
       `wasSecondary` is the live page's second <strike> — see CONTENT-PARITY. */
    offer: {
        flash: "Mega Saver Deal",
        packageName: "Basic Logo Package",
        discount: "70% OFF + Save Additional £10",
        price: "£35",
        was: "£117",
        wasSecondary: "£45",
        only: "Only",
        urgency: "OFFER ENDS TODAY!",
        submit: "START PROJECT",
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
    /** Logo packages split their list with a sub-heading; the others do not. */
    deliverablesHeading?: string;
    deliverables?: readonly (string | { text: string; note: string })[];
    /** Stripe Checkout link, carried over exactly — these are live payment URLs. */
    buyHref: string;
}

export const packagesIntro = {
    title: "Professional Logo Design Services",
    lead: "Our professional logo design services in the UK offer captivating and timeless custom logos. Our expert designers at Creative Logo Design ensure your company stands out uniquely and memorably in the market.",
} as const;

const TAGLINE = "Best Value for Money Guaranteed!";
const WHAT_YOU_GET = "What you will Get?";

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
                price: "£35",
                was: "£117",
                features: [
                    "2 Logo Design Concepts",
                    "4 Free Revisions",
                    "Dedicated Project Manager",
                    "24 - 48 Hours Delivery",
                ],
                deliverablesHeading: WHAT_YOU_GET,
                deliverables: ["1 Finalized Logo", "2 File Formats (PNG, JPG)"],
                buyHref: "https://buy.stripe.com/8x29ASclA0SV0AV8W95Vu0b",
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
                ],
                deliverablesHeading: WHAT_YOU_GET,
                deliverables: ["1 Finalized Logo", "3 File Formats (JPG, PNG, PDF)"],
                buyHref: "https://buy.stripe.com/5kQ6oG71g9prabvb4h5Vu0c",
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
                ],
                deliverablesHeading: WHAT_YOU_GET,
                deliverables: [
                    "1 Finalized Logo",
                    { text: "All File Formats", note: "(Ai, PSD, EPS, PNG, JPG, PDF)" },
                ],
                buyHref: "https://buy.stripe.com/6oU7sK5Xc7hj1EZ0pD5Vu0d",
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
                    "Letter head Design",
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
                buyHref: "https://buy.stripe.com/5kQfZg99o9pr2J3a0d5Vu0e",
            },
            {
                name: "Premium Package",
                tagline: TAGLINE,
                price: "£139",
                was: "£460",
                bestSeller: true,
                features: [
                    "Business Card Design",
                    "Letter head Design",
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
                buyHref: "https://buy.stripe.com/9B600i85katv97r2xL5Vu0f",
            },
            {
                name: "Professional Package",
                tagline: TAGLINE,
                price: "£249",
                was: "£830",
                features: [
                    "Business Card Design",
                    "Letter head Design",
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
                buyHref: "https://buy.stripe.com/3cI3cu99o9pr97ra0d5Vu0g",
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
                buyHref: "https://buy.stripe.com/cNi5kC4T81WZ5Vf0pD5Vu0h",
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
                buyHref: "https://buy.stripe.com/cNi9AS0CS3130AV2xL5Vu0i",
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
                buyHref: "https://buy.stripe.com/6oUaEW0CS6df2J3fkx5Vu0j",
            },
        ],
    },
];

export const packageCta = {
    start: "START PROJECT",
    buy: "Buy Now",
    call: `Call Now: ${contact.phoneDisplay}`,
} as const;

/* -------------------------------------------------------- discount banner -- */

export const discountBand = {
    kicker: "We Create Your Brand’s Identity",
    titleLead: "Special Discount on",
    titleAccent: "All Logo Designs",
    /* The live page carries this as a "SPECIAL OFFER / SALE / UPTO 70% OFF /
       SHOP NOW" bitmap. Rebuilt as text — an image is not a call to action. */
    badgeKicker: "Special offer",
    badgeValue: "70%",
    badgeSuffix: "off",
    support: "Reach out to our dedicated support agent today for personalized assistance.",
    chat: "Chat With Expert",
} as const;

/* ----------------------------------------------------------------- combo -- */

export const combo = {
    kicker: "Ultimate Value for Start-ups and Businesses",
    title: "All-In-One Combo",
    lead: "Our all-in-one combo package offers comprehensive solutions: custom logo design, engaging web design, and professional stationery design. Let Creative Logo Design ensure your brand presents a cohesive and standout image across all platforms and materials.",
    /* £1599 exists ONLY inside `tag-01.webp` on the live page — no element on
       the page states the combo price as text. Rendering the tag in HTML is
       what makes it readable at all. See CONTENT-PARITY.md. */
    tag: {
        kicker: "Combo Package",
        sub: "Complete Branding",
        price: "£1599",
        suffix: "Only",
    },
    columns: [
        {
            title: "Logo Design",
            items: [
                "Unlimited Logo Design Concepts",
                "Unlimited Revisions",
                "Icon Design",
                "All Final File Formats",
            ],
        },
        {
            title: "Website Design",
            items: [
                "UNLIMITED Pages Website",
                "Content Management System (CMS)",
                "Complete Deployment",
                "5 Stock Photos + 3 Banner Designs",
                "Any 3 Social Media Platforms",
                "Complete W3C Certified HTML",
            ],
        },
        {
            title: "Stationary Design",
            items: ["Business Card, Letterhead, Envelope", "MS Word Letterhead"],
        },
        {
            title: "Value Added Services",
            items: ["Dedicated Account Manager", "24/7 Chat Support"],
        },
    ],
    ctaOrder: "Order Now",
    ctaCall: "Call Now",
} as const;

/* ------------------------------------------------------------- portfolio -- */

export const portfolio = {
    eyebrow: "PORTFOLIO",
    title: "Stunning Logos and Designs in Action",
    lead: "Our talented logo designers elevate your business with striking custom logos that leave a lasting impression on your audience.",
    /* The live grid ships one alt attribute across ten images ("Portfolio Image
       1" on the second, nothing on the other nine). Named here for the same
       reason content/clients.ts names its marks: alt text is an image-SEO and
       accessibility signal, not body copy. */
    items: [
        { src: "waggy-adventures", alt: "Waggy Adventures dog walking and pet services logo" },
        { src: "caddy-cubs", alt: "Caddy Cubs children’s golf club logo" },
        { src: "ma-london-building-services", alt: "M&A London Building Services logo" },
        { src: "anas-eliyas-and-j", alt: "Anas, Eliyas & J bakery logo" },
        { src: "my-flavours", alt: "My Flavours food brand logo" },
        { src: "girl-power-electric", alt: "Girl Power Electric electrician logo" },
        { src: "play-i-some-music", alt: "Play I Some Music logo" },
        { src: "lashes-by-shimlas", alt: "Lashes By Shimlas beauty salon logo" },
        { src: "british-certification", alt: "British Certification crest logo" },
        { src: "fetch-dog-walking", alt: "Fetch Dog Walking Service logo" },
    ],
    /**
     * All ten tiles are 600×600.
     *
     * The source artwork is five different aspect ratios, each painted on its
     * own flat background, so `object-contain` letterboxed half the grid
     * against the dark card behind it. They are re-cut square at build time
     * onto a canvas in each logo's own background colour — sampled a few pixels
     * inside the edge, because several files carry a 1px white fringe that
     * would otherwise band the tile. One shared dimension pair follows.
     */
    tile: { width: 600, height: 600 },
} as const;

/* ------------------------------------------------------------ startup CTA -- */

export const startupCta = {
    kicker: "We have a superior plan for your new business!",
    titleLead: "We Offer a Complete Package",
    titleTrail: "for Entrepreneurs and Startups.",
    cta: "GET STARTED",
    image: {
        src: "/assets/img/landing/creative-logo-design/logo-illustration.webp",
        width: 592,
        height: 372,
    },
} as const;

/* -------------------------------------------------------------- services -- */

export const services = {
    /* The live section has four <h3>s and no section heading above them — a
       heading-level jump with nothing to anchor it. The <h2> below is added so
       the four cards sit under something; no existing wording changes. */
    title: "Everything your brand needs, in one place",
    items: [
        {
            title: "Brand Building Strategy",
            body: "Develop a powerful brand identity with our comprehensive strategy, ensuring your business stands out and resonates with your target audience.",
            icon: "brand-building-strategy",
        },
        {
            title: "Digital Marketing",
            body: "Maximize your online presence with our expert digital marketing services, including SEO, social media management, and targeted ad campaigns.",
            icon: "digital-marketing",
        },
        {
            title: "Website Development",
            body: "Create a stunning, user-friendly website that reflects your brand and engages visitors, with our professional website development services in UK.",
            icon: "website-development",
        },
        {
            title: "Mobile Apps Development",
            body: "Enhance customer experience with our innovative mobile app development, delivering seamless functionality and engaging interfaces for iOS and Android platforms.",
            icon: "mobile-apps-development",
        },
    ],
} as const;

/* ------------------------------------------------------------- consult CTA -- */

export const consultCta = {
    title: "Get Your Perfect Logo – Schedule a Free Call",
    lead: "Ready to bring your logo vision to life? Book a free consultation and let’s discuss creating a design that truly represents your brand.",
    ctaCall: "Schedule a Call",
    ctaChat: "Chat With Me Instead",
    image: {
        src: "/assets/img/landing/creative-logo-design/consultation.webp",
        alt: "A designer on a video consultation call with a client",
        width: 894,
        height: 675,
    },
} as const;

/* --------------------------------------------------------------- process -- */

/* The three `brand’s` apostrophes below are curled. Same call, same reasoning
   as the nine on the service pages: the glyph is typography, the wording is
   untouched. See CONTENT-PARITY.md. */
export const process = {
    title: "Our Logo Design Process",
    steps: [
        {
            n: "01",
            title: "Discovery",
            body: "In this phase, we dive deep into understanding your brand’s essence, target audience, and goals. This foundation guides our design process, ensuring your logo perfectly resonates with your identity and objectives.",
        },
        {
            n: "02",
            title: "Conceptualization",
            body: "In this stage, creativity takes center stage as we brainstorm ideas and sketch concepts. We explore diverse possibilities, refining initial thoughts into promising design directions aligned with your brand’s vision.",
        },
        {
            n: "03",
            title: "Design",
            body: "Turning concepts into digital drafts, we meticulously craft your logo. Attention is paid to every detail, from typography to color choice, ensuring each element harmonizes to effectively convey your brand’s identity memorably.",
        },
        {
            n: "04",
            title: "Delivery",
            body: "The culmination of our collaboration, we unveil the final logo design. Your feedback is paramount as we refine the design to perfection. Our goal is your satisfaction, ensuring the logo authentically reflects your brand and resonates with your audience.",
        },
    ],
} as const;

/* --------------------------------------------------------------- reviews -- */

/**
 * Fourteen named client reviews.
 *
 * Reproduced byte for byte — including "recomend", "dilligent", "Alan smith"
 * and the emoji. These are quotations of other people; the apostrophe
 * normalisation applied to our own prose above is deliberately NOT applied
 * here, which is why straight and curly apostrophes both appear.
 *
 * The live page renders the rating as five ❇️ emoji in a <p>. That is a sparkle,
 * not a star, and it announces as "sparkle sparkle sparkle sparkle sparkle" to a
 * screen reader — so the rebuild uses the same `role="img"` star row every other
 * rating on the site uses. Presentation only.
 *
 * NOT marked up as `Review`/`AggregateRating`, for the reason in
 * docs/SEO-PLAYBOOK.md: self-hosted reviews about your own business are
 * ineligible for review rich results and risk a manual action. These carry real
 * author names, which clears the first blocker but not the second.
 */
export const reviews = {
    title: "What Our Clients Say?",
    items: [
        {
            name: "Niki",
            avatar: "niki",
            quote:
                "I don’t usually write reviews, but this one is very well deserved! My designer “Daniel Abraham” was outstanding! Great communication pricing was so competitive If I’m honest there standards and how they put the client first is not the normal in today’s world! They really have got it right! Very happy with their service as a whole - Honestly, don’t mess around with other companies that just want to take your money this is a great company to work with and I look forward to working with them again they offer so many different products it’s what you need for your business! 🥳",
        },
        {
            name: "Chintan",
            avatar: "chintan",
            quote:
                "It was great experience as Alan Smith, one of their employee listened to our needs and responded quickly to it. He was really helpful throughout and gave advices where we needed which made it easier for us. Overall, it was a great experience and service provided by him and we would definitely come back to the company in future.",
        },
        {
            name: "Sam Gerrard",
            avatar: "sam-gerrard",
            quote:
                "I had a wonderful experience designing and developing my logo with Alan smith. He had lots ideas and was very upstanding of what I wanted. Would most definitely recommend him personally to any of my friends who need anything designing.",
        },
        {
            name: "Martin Thompson",
            avatar: "martin-thompson",
            quote:
                "Very Professional & Top Service The gentleman was extend my helpful and worked out of hours to assist me. I got great advice and talked through exactly what service would suit me best, not just hooking me for the most expensive. Strongly advise!",
        },
        {
            name: "Rob",
            avatar: "rob",
            quote:
                "Easy to communicate with, really good at understanding the brief. Would highly recommend.",
        },
        {
            name: "Marlena",
            avatar: "marlena",
            quote:
                "very understanding designers made my logo in 2 days detail to detail I'm happy overall Quick respond very nice service highly recomend !",
        },
        {
            name: "James Cripps",
            avatar: "james-cripps",
            quote:
                "Edward was amazing so dilligent design my perfect logo in less than 24 hours. Cannot recommend this company highly enough don’t even bother wasting your time getting quotes etc they will beat any price and the service is impeccable. Edward deserves a pay rise for sure if your reading this boss or Else I’ll poach him in a year and set him up on his own lol well done team thanks god bless!",
        },
        {
            name: "Andrea Martinez",
            avatar: "andrea-martinez",
            quote:
                "Great efficient service very much happy with my logo and will be using this company again. Thank you so much for the great service and logo..!!!...",
        },
        {
            name: "GB",
            avatar: "gb",
            quote:
                "Praise for Alan Smith and the team at Creative Logo Design! Great experience from initial consultation to delivery. Pleasant, friendly style of communication, we felt heard and looked after throughout the process, and the work we received was exceptional quality - exactly how we had envisioned - we will be back!!",
        },
        {
            name: "Lior Brown",
            avatar: "lior-brown",
            quote:
                "Brian Edwin gave such a professional and personal experience providing an amazing logo, nothing was ever an issue and he seen my vision and brought it to life through a logo. Highly recommend, great prices and fantastic service. Thanks again Brian and Creative Logo Design",
        },
        {
            name: "Oliver Delgaram-Nejad",
            avatar: "oliver-delgaram-nejad",
            quote:
                "Had a great experience working with Brian Edwin. They did a YouTube logo and banner design for my channel and hit the brief nicely. Many thanks. Will come back in the future.",
        },
        {
            name: "Angela",
            avatar: "angela",
            quote:
                "Very fast service happy with my logo, was kept informed and adjustments were done very fast. Great service.",
        },
        {
            name: "N Cooke",
            avatar: "n-cooke",
            quote: "Easy to deal with and instant response with excellent logo.",
        },
        {
            name: "CHRISTOPHER WILSON",
            avatar: "christopher-wilson",
            quote: "Great company to deal with. Fast turnaround. Great design. Thank you!!",
        },
    ],
} as const;

/* ---------------------------------------------------------------- footer -- */

export const footer = {
    blurb: "Elevate your brand with our innovative custom logo design services. Tailored to your vision and goals, we specialize in crafting unique and memorable logos that set you apart. Stand out from the competition with our expert design solutions and elevate your brand identity.",
    ctaChat: "Live Chat",
    ctaCall: "Call Now",
    callback: {
        title: "Request a Callback",
        name: "Name",
        phone: "Tel/Mobile",
        submit: "Submit",
        success: "Thanks — we’ll call you back",
    },
    copyright: "© Copyrights 2025 | All Rights Reserved. Creative Logo Design by",
    builtBy: { label: "RFS", href: "https://redfeathersolutions.co.uk/" },
} as const;

/* ----------------------------------------------------------------- popup -- */

/**
 * The quote dialog and the hero card share this field set.
 *
 * The live page's placeholders ("Your Full Name", "Your Email", …) are not
 * carried over, because the rebuild has nowhere to put them: `Field` uses a
 * floating `<label>`, and its placeholder is a single space that drives
 * `:placeholder-shown`. That is not a loss — the live hero form is
 * placeholder-only with no `<label>` at all, which fails WCAG 3.3.2 and leaves
 * every input unnamed to a screen reader. The label now carries the name.
 */
export const quoteDialog = {
    title: "Avail 70% Discount",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone Number",
    message: "Message",
    submit: "START PROJECT",
    close: "Close",
    successTitle: "Thanks — we’ve got your details",
} as const;

/** Prefix for every image on this page. */
export const IMG = "/assets/img/landing/creative-logo-design";
