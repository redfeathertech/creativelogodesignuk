/**
 * `/seo-services` — the SEO retainer landing page.
 *
 * SOURCE OF TRUTH: the live page at
 * `https://creativelogodesign.co.uk/seo-services/index.php`, captured
 * 3 Aug 2026 into `page-source-seo-services.html`.
 *
 * Like the other three landing pages this is NOT in the Laravel repo. Unlike
 * `/logo-design-offer` and `/lp` it is **server-rendered**: a single 72KB HTML
 * file with its own `style.css`, Bootstrap 5 and Font Awesome off two CDNs, one
 * inline validation script and a PHPMailer endpoint. `curl` gets everything, so
 * the capture needed no headless browser.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS PAGE IS THE ONE EXCEPTION TO "CONTENT IS NOT FREE TO CHANGE"
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The live page is an **un-rebranded third-party template**. It ships another
 * agency's brand name ("TinyBull") ten times, prices its plans in **US
 * dollars**, names three bull breeds as its pricing tiers, and quotes US
 * geography (Lynchburg, Virginia) and US healthcare law (HIPAA) throughout.
 * Only the contact details, the logo and the social links were ever swapped.
 *
 * The parity rule exists to protect rankings. It does not apply here, and the
 * reason is measurable: the live page carries
 * `<link rel="canonical" href="https://creativelogodesign.co.uk/" />` — it
 * canonicalises itself to the homepage, has no meta description, no Open Graph
 * tags and no robots directive. It has never ranked in its own right and there
 * is no ranking equity to preserve.
 *
 * So the copy below is a **deliberate rebrand**, approved 3 Aug 2026. Every
 * departure from the live page is marked `[fix]` inline and tabulated in
 * docs/CONTENT-PARITY.md. Layout, section order and visual design are the live
 * page's, unchanged — the design was signed off as-is.
 *
 * `scripts/verify-seo-services-parity.py` gates this file against the live
 * capture in both directions, with the `[fix]` list as its allowlist. A string
 * that changes without being declared there fails the check.
 */

import { contact, site } from "@/content/site";

/* ------------------------------------------------------------------ meta -- */

/**
 * The live `<title>` is the bare string "SEO Services" — no company name, no
 * differentiator. There is no meta description at all, and no og:* tags.
 *
 * The title keeps the live wording as its stem so the page is still recognisably
 * the same one, and lets the root layout's "%s | Creative Logo Design" template
 * supply the company name. The description is authored, because there is
 * nothing to carry over. [fix]
 */
export const meta = {
    title: "SEO Services",
    description:
        "UK SEO agency delivering technical SEO, on-page optimisation, Google Business Profile management and link building. Month-to-month plans from £799, no long-term contracts.",
} as const;

/* ------------------------------------------------------------ utility bar -- */

export const topBar = {
    offer: "Limited Time Offer - Activate Your 70% off Coupon!",
    phoneLabel: "Phone Number",
    phone: contact.phoneDisplay,
    chat: "Live Chat with Expert",
} as const;

/* ------------------------------------------------------------------ hero -- */

/**
 * The hero's centre column is a **mockup** of a Google result — a browser
 * chrome, a search bar and a ranked listing. It illustrates what ranking looks
 * like; it is not a claim about a real client.
 *
 * The live mockup searches for an HVAC company in "Lynchburg, VA" — a city in
 * Virginia, on a UK agency's site. Geography moved to London. [fix]
 */
export const hero = {
    titleLead: "Boost Your Business With",
    titleAccent: "SEO Services",
    description:
        "Whether you're brand new to SEO or looking to outrank your local competition, our expert team builds data-driven SEO strategies that put your business at the top of search results and keep it there.",
    ctaPrimary: "Get Started",
    ctaPhone: contact.phoneDisplay,

    mockup: {
        /* [fix] "best+HVAC+company+near+me" is kept; only the result's locality
           moves off Lynchburg, VA. */
        query: "google.com/search?q=best+hvac+company+near+me",
        sponsored: "SPONSORED",
        url: "https://yourbusiness.com",
        badge: "#1 RANKING",
        /* [fix] was "Your Business | Best HVAC in Lynchburg, VA" */
        title: "Your Business | Best HVAC in London",
        /* [fix] was "…serving Lynchburg since 2010. 5-star rated, licensed &
           insured." — "licensed" is a US trade-registration term with no UK
           equivalent for this trade. */
        description:
            "Trusted HVAC experts serving London since 2010. 5-star rated, fully accredited & insured. Free estimates.",
    },

    /* These four read as claims about the agency, not as mockup decoration. */
    stats: [
        { value: "3.2x", label: "Avg. traffic increase" },
        { value: "94%", label: "Client retention rate" },
        { value: "Top 3", label: "Avg. local ranking" },
        { value: "150+", label: "Businesses ranked" },
    ],
} as const;

/* ------------------------------------------------------------- hero form -- */

/**
 * The live form posts to `PHPMailer/email.php` with six fields and **no
 * `<label>` on any of them** — placeholders only, which fails WCAG 3.3.2 and
 * leaves every input unnamed the moment a value is typed. The field set is
 * carried over exactly; the labels are new. [fix]
 */
export const heroForm = {
    title: "Get In Touch",
    description: "Fill out the form and our team will contact you shortly.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    subject: "Subject",
    phone: "Phone Number",
    message: "Write Your Message...",
    submit: "Submit Now",
    successTitle: "Thanks — your enquiry is in.",
} as const;

/* ----------------------------------------------------------------- trust -- */

export const trust = {
    /* [fix] was "Don't see what you need? TinyBull provides fully custom SEO
       plans!" */
    bannerText: `Don't see what you need? ${site.name} provides fully custom SEO plans!`,
    bannerCta: "Get Started",
    features: [
        { icon: "shield", title: "Google Partner Certified" },
        { icon: "contract", title: "No Long-Term Contracts" },
        { icon: "chart", title: "Monthly Reporting" },
        { icon: "manager", title: "Dedicated Account Manager" },
    ],
} as const;

/* ------------------------------------------------------------ what is SEO -- */

export const info = {
    eyebrow: "UNDERSTANDING THE BASICS",
    titleLead: "What Is SEO —",
    titleTrail: "and Why Does It Matter?",
    /* British spelling throughout, matching the rest of the site (178 -ise/-isation
       against 56 -ize/-ization across `content/`). The live page is US
       English end to end. [fix] */
    paragraphs: [
        'SEO stands for Search Engine Optimisation. In plain terms, it’s the process of making your website show up when potential customers search for what you offer on Google. When someone in your area types "HVAC repair near me" or "best plumber in Manchester," SEO determines whether your business appears — or your competitor’s does.',
        "Search engines like Google use complex algorithms to decide which websites deserve to appear at the top of results. These algorithms evaluate hundreds of factors — the quality and relevance of your content, how many other websites link to yours, how fast your pages load, whether your site works on mobile, and dozens more signals.",
        "SEO isn’t a one-time fix or a shortcut. It’s a disciplined, ongoing process of improving your website’s authority and relevance so Google trusts it enough to show it to searchers. Done right, it’s one of the highest-ROI investments a small business can make — because unlike paid ads, organic traffic doesn’t stop the moment you stop paying.",
    ],
    statsHeading: "WHY SEO CAN'T BE IGNORED",
    stats: [
        {
            value: "68%",
            text: "of all online experiences begin with a search engine. If you're not on page one, you're essentially invisible to most potential customers.",
        },
        {
            value: "75%",
            text: "of users never scroll past the first page of search results. The top 3 results capture more than 50% of all clicks.",
        },
        {
            value: "14x",
            text: "higher close rate for organic SEO leads compared to traditional outbound leads like cold calls or direct mail.",
        },
    ],
    quote: "“Your competitors are investing in SEO right now. Every month you wait is another month they build authority you’ll have to work twice as hard to overcome.”",
    /* [fix] was "— TINYBULL SEO TEAM" */
    quoteAuthor: `— ${site.name.toUpperCase()} SEO TEAM`,
} as const;

/* --------------------------------------------------------------- pillars -- */

export const pillars = {
    /* [fix] was "THE TINYBULL APPROACH" */
    eyebrow: "OUR APPROACH",
    title: "How Our SEO Service Works",
    /* [fix] "TinyBull builds all three simultaneously" → "We build all three
       simultaneously" */
    description:
        "Effective SEO has three interconnected pillars. Neglect any one of them and your rankings suffer. We build all three simultaneously — which is why our clients see lasting results instead of short-term spikes.",
    items: [
        {
            tag: "PILLAR 01",
            accent: "blue",
            title: "Technical SEO",
            text: "The foundation of everything. Before Google can rank you, it has to be able to crawl, index, and understand your website. Technical SEO ensures your site is fast, mobile-friendly, secure, and structured in a way that search engines can read clearly.",
            points: [
                "Site speed optimisation",
                "Mobile responsiveness",
                "Crawlability & indexation",
                "Schema markup & structured data",
                "Core Web Vitals",
            ],
        },
        {
            tag: "PILLAR 02",
            accent: "green",
            title: "On-Page SEO",
            text: "What's actually on your pages matters enormously. On-page SEO is the process of optimising your content, headings, meta tags, images, and internal links so each page clearly communicates its topic to Google — and delivers genuine value to the people reading it.",
            points: [
                "Keyword research & mapping",
                "Title tags & meta descriptions",
                "Header structure (H1–H4)",
                "Content optimisation",
                "Image alt text & optimisation",
            ],
        },
        {
            tag: "PILLAR 03",
            accent: "pink",
            title: "Off-Page SEO & Authority",
            text: "Google treats links from other websites like votes of confidence. The more high-quality, relevant websites that link to yours, the more authority Google assigns your site. Off-page SEO builds that authority through strategic link building, local citations, and reputation signals.",
            points: [
                "Link building campaigns",
                "Local citation building",
                "Google Business Profile optimisation",
                "Review generation",
                "Brand mention monitoring",
            ],
        },
    ],
} as const;

/* ------------------------------------------------------------ industries -- */

export const industries = {
    eyebrow: "INDUSTRY EXPERTISE",
    title: "SEO Built for Your Specific Industry",
    description:
        "Every industry has different search behaviour, different keyword competition, and different local factors. We bring specific experience to the industries that matter most to us.",
    items: [
        {
            icon: "house",
            title: "Home Services",
            text: "HVAC, plumbing, electrical, roofing, landscaping — we rank home service companies for the high-intent “near me” searches that turn into booked jobs. Local SEO is our speciality.",
        },
        {
            icon: "heart",
            title: "Healthcare & Medical",
            /* [fix] "HIPAA-sensitive content" → GDPR. HIPAA is US federal
               healthcare law and has no application to a UK clinic; the UK
               equivalent obligation is UK GDPR / the Data Protection Act. */
            text: "Dental practices, med spas, chiropractors, and healthcare clinics. We understand GDPR-sensitive content, patient intent keywords, and the trust signals that medical SEO requires.",
        },
        {
            icon: "toolbox",
            title: "Contractors & Construction",
            text: "Custom home builders, remodelers, foundation repair, and specialty contractors. We target project-specific keywords with strong commercial intent and build local authority.",
        },
        {
            icon: "location",
            title: "Restaurants & Hospitality",
            text: "Restaurants, hotels, and entertainment venues. We optimise for local map pack visibility, review signals, and the “open now near me” searches that drive foot traffic.",
        },
        {
            icon: "file",
            title: "Professional Services",
            text: "Law firms, financial advisors, accountants, and insurance agencies. Trust and authority are everything in professional services — and SEO is how you build both online.",
        },
        {
            icon: "globe",
            title: "Moving & Logistics",
            text: "Moving companies, storage facilities, and logistics providers. High competition, high intent — we use hyperlocal SEO and review generation to put you at the top when customers need you most.",
        },
    ],
    bottomTextLead: "Don’t see your industry? We work across dozens of verticals.",
    bottomLinkText: "Get in touch",
    bottomTextTrail: "and we’ll tell you exactly how we’d approach your market.",
} as const;

/* ------------------------------------------------------------ difference -- */

export const difference = {
    /* [fix] was "WHY TINYBULL" */
    eyebrow: `WHY ${site.name.toUpperCase()}`,
    titleLead: "Small Agency. Big Results.",
    titleTrail: "Here's the Difference.",
    /* [fix] "TinyBull is different" → "We're different" */
    description:
        "Big agencies charge big agency prices and assign your account to a junior account manager you've never met. We're different — and we think that difference matters.",
    bad: {
        title: "THE BIG AGENCY EXPERIENCE",
        points: [
            "Locked into 12-month contracts before you see a single result",
            "Assigned to a rotating cast of junior account managers",
            "Cookie-cutter strategies applied to every client regardless of industry",
            "Confusing reports full of vanity metrics that don't tie to actual revenue",
            "You're a small fish in a very large pond",
        ],
    },
    good: {
        /* [fix] was "THE TINYBULL DIFFERENCE" / "THE TINYBULL EXPERIENCE" */
        badge: `THE ${site.name.toUpperCase()} DIFFERENCE`,
        title: `THE ${site.name.toUpperCase()} EXPERIENCE`,
        points: [
            "Month-to-month — we earn your business every single month",
            "A dedicated strategist who knows your business by name",
            "Custom strategy built specifically for your market and competitors",
            "Plain-English monthly reports showing exactly what we did and why",
            /* [fix] was "7 in-house team members — no outsourcing, no offshore
               work". That is the template agency's team size, and the claim is
               flatly untrue here: this business runs three offices (Wembley,
               Edison NJ and Dubai) and says so in its own Organization JSON-LD.
               Publishing "no offshore work" would be a false statement about
               the client's own operation. */
            "A dedicated in-house team across our UK, US and Dubai offices",
        ],
    },
} as const;

/* -------------------------------------------------------------- services -- */

export const services = {
    railTitle: "Industries We Serve",
    /* The live markup hard-codes this list twice to fake a seamless marquee.
       Held once here; the component duplicates it and hides the copy from the
       accessibility tree, so a screen reader reads fourteen items, not
       twenty-eight. [fix] */
    railItems: [
        "Traveling",
        "Pest Control",
        "Moving Companies",
        "Skincare & Med Spa",
        "Hotels & Hospitality",
        "HVAC & Mechanical",
        "Home Services",
        "Contractors & Construction",
        "Law Firms",
        "Healthcare",
        "Dental Practices",
        "Salons & Beauty",
        "Restaurants",
        "Plumbing",
    ],
    eyebrow: "WHAT'S INCLUDED",
    titleLead: "Everything Your Business Needs",
    titleTrail: "to Rank Higher & Get Found",
    description:
        "We don't do cookie-cutter SEO. Every strategy is built around your business, your market, and the keywords your customers are actually searching for.",
    items: [
        {
            icon: "search",
            title: "Keyword Research & Strategy",
            text: "We identify the exact search terms your customers use to find businesses like yours, then build a strategy around ranking for the ones that drive real leads.",
        },
        {
            icon: "file",
            title: "On-Page Optimisation",
            text: "Meta tags, heading structure, content optimisation, URL structure, and internal linking — every page built to rank.",
        },
        {
            icon: "location",
            title: "Google Business Profile",
            text: "Active GBP management with weekly posts, geo-tagged images, Q&As, review responses, and monthly performance tracking.",
        },
        {
            icon: "pulse",
            title: "Technical SEO",
            text: "Site speed, schema markup, XML sitemaps, mobile optimisation, SSL checks, and crawl error fixes that silently hurt rankings.",
        },
        {
            icon: "link",
            title: "Link Building & Citations",
            text: "High-quality backlinks and local citations that signal authority to Google and boost your domain strength over time.",
        },
        {
            icon: "chart",
            title: "Monthly Reporting",
            text: "Plain-English reports covering keyword rankings, organic traffic, and GBP performance — with commentary on what's next.",
        },
    ],
} as const;

/* --------------------------------------------------------------- on-page -- */

/**
 * The right-hand column is a **mockup** of a rankings dashboard. Its keywords
 * were all US-local on the live page. [fix]
 */
export const onPage = {
    eyebrow: "ON-PAGE SEO",
    titleLead: "Your Website, Optimised",
    titleTrail: "From the Ground Up",
    description:
        "Most businesses have websites that look great but are invisible to Google. We fix that — making sure every page sends the right signals to rank for your most valuable keywords.",
    points: [
        "Title tags, meta descriptions & heading structure",
        "Content optimisation for target keywords",
        "URL structure, internal linking & canonicalisation",
        "Schema markup & structured data implementation",
        "Image optimisation, alt tags & page speed",
    ],
    ctaPrimary: "Get Started",
    ctaPhone: contact.phoneDisplay,

    rankingHeading: "Keyword Rankings — Last 30 Days",
    rankings: [
        { keyword: "plumber near me", position: "Position #1", tone: "good" },
        /* [fix] was "best dentist in Lynchburg VA" */
        { keyword: "best dentist in London", position: "Position #2", tone: "good" },
        { keyword: "roofing contractor near me", position: "Position #3", tone: "good" },
        { keyword: "HVAC repair near me", position: "Position #4", tone: "warn" },
        /* [fix] was "moving company Lynchburg" */
        { keyword: "moving company Manchester", position: "Position #5", tone: "warn" },
        /* [fix] was "custom home builder VA" */
        { keyword: "custom home builder Surrey", position: "Position #7", tone: "warn" },
        /* [fix] was "crawl space repair cost" — crawl spaces are a US
           construction feature; the UK equivalent search is damp proofing. */
        { keyword: "damp proofing cost", position: "Position #2", tone: "good" },
    ],
    rankingFooter: "18 keywords moved to page 1 this month",
} as const;

/* ------------------------------------------------------------------- GBP -- */

export const gbp = {
    cardHeading: "GBP Insights — This Month",
    stats: [
        { label: "PROFILE VIEWS", value: "1,842", note: "↑ +34% vs last month", highlight: true },
        { label: "DIRECTION REQUESTS", value: "218", note: "↑ +19% vs last month" },
        { label: "PHONE CALLS", value: "94", note: "↑ +28% vs last month" },
        { label: "REVIEW SCORE", value: "4.9★", note: "142 reviews" },
    ],
    eyebrow: "GOOGLE BUSINESS PROFILE",
    titleLead: "Win the Local Map Pack",
    titleTrail: "Before They Click",
    description:
        "The local 3-pack gets more clicks than any other search result. We actively manage your GBP every month to keep you visible, relevant, and ahead of your competition.",
    points: [
        "GBP setup, optimisation & ongoing management",
        "Monthly GBP posts with geo-tagged images",
        "Review response management",
        "Q&A management & local business citations",
        "Monthly GBP insights & performance tracking",
    ],
    cta: "Get Started",
} as const;

/* --------------------------------------------------------------- process -- */

export const process = {
    eyebrow: "OUR PROCESS",
    titleLead: "From Audit to Page One",
    titleTrail: "in 4 Steps",
    steps: [
        {
            number: "01",
            title: "SEO AUDIT",
            text: "We analyse your site, rankings, competitors, and technical health to find exactly what's holding you back.",
        },
        {
            number: "02",
            title: "STRATEGY BUILD",
            text: "We create a custom keyword strategy and SEO roadmap tailored to your business, market, and goals.",
        },
        {
            number: "03",
            title: "OPTIMISE & EXECUTE",
            text: "On-page fixes, GBP management, content, link building, and technical improvements — implemented monthly.",
        },
        {
            number: "04",
            title: "TRACK & REPORT",
            text: "Monthly ranking reports, traffic data, and GBP insights in plain English with clear next steps.",
        },
    ],
} as const;

/* --------------------------------------------------------------- pricing -- */

/**
 * Three tiers.
 *
 * **Currency.** The live cards read `$799/mo` and `$999/mo` — US dollars, on a
 * UK site that prices every other page in pounds and bills a UK company. The
 * figures are kept and the symbol corrected to £, approved 3 Aug 2026. [fix]
 *
 * **Names.** The live tiers are LONGHORN, BRAHMA and EL GRAN TORO under the
 * eyebrow "PICK YOUR BULL" — three bull breeds, because the template belonged
 * to an agency called TinyBull. They carry no meaning here. [fix]
 *
 * **A bug carried in the template.** The middle and top cards open with
 * "Everything in Starter" and "Everything in Premium" — plan names that appear
 * nowhere on the live page, because its own tiers are named after cattle. The
 * renamed tiers make those references resolve for the first time. [fix]
 */
export const pricing = {
    /* [fix] was "PICK YOUR BULL" */
    eyebrow: "CHOOSE YOUR PLAN",
    titleLead: "Straightforward Pricing.",
    /* [fix] was "No Hidden Fees. No Bull." */
    titleTrail: "No Hidden Fees. No Surprises.",
    description:
        "All plans include dedicated account management, monthly reporting, and ongoing optimisation. No long-term contracts required.",
    tiers: [
        {
            /* [fix] was "LONGHORN" */
            name: "LAUNCH",
            price: "£799",
            period: "/mo",
            /* Machine-readable for the OfferCatalog JSON-LD. */
            amount: 799,
            text: "Best for new businesses & single locations",
            keywords: "15 target keywords",
            featured: false,
            cta: "Get Started",
            points: [
                "Website & competitor audit",
                "On-page optimisation",
                "Google Business Profile setup & management",
                "Local citations & GBP posts (4/mo)",
                "Search Console setup & monitoring",
                "Monthly ranking & performance report",
                "Dedicated account manager",
            ],
        },
        {
            /* [fix] was "BRAHMA" */
            name: "GROWTH",
            price: "£999",
            period: "/mo",
            amount: 999,
            text: "Best for growing businesses & competitive markets",
            keywords: "25 target keywords",
            featured: true,
            badge: "MOST POPULAR",
            cta: "Get Started",
            points: [
                /* [fix] "Everything in Starter" → the tier this now names. */
                "Everything in Launch",
                "Initial ranking & toxic backlink analysis",
                "Google penalty check",
                "Blog content implementation",
                "GBP posts (8/mo) & geo-tagged images",
                "Google Analytics & Tag Manager setup",
                "Phone call & email tracking",
                "Priority support & monthly review call",
            ],
        },
        {
            /* [fix] was "EL GRAN TORO" */
            name: "ENTERPRISE",
            price: "Custom",
            period: "",
            amount: null,
            text: "Best for multi-location & high-competition markets",
            keywords: "Unlimited keywords",
            featured: false,
            cta: "Talk to Us",
            points: [
                /* [fix] "Everything in Premium" → the tier this now names. */
                "Everything in Growth",
                "Multi-location SEO management",
                "Advanced link building campaigns",
                "Custom content strategy & blog writing",
                "Quarterly strategy reviews",
                "Dedicated senior strategist",
            ],
        },
    ],
    /* [fix] was "All plans are month-to-month. No long-term contracts. No bull." */
    bottomText: "All plans are month-to-month. No long-term contracts. No surprises.",
    ctaText:
        "Not ready to commit? Start with a free SEO report on your website — no account needed.",
    ctaButton: "Run My Free SEO Report →",
} as const;

/* ------------------------------------------------------------------- FAQ -- */

/**
 * Nine questions. Carried over verbatim — none of them names the template
 * agency, and they feed the `FAQPage` JSON-LD node the live page never had.
 */
export const faq = {
    eyebrow: "COMMON QUESTIONS",
    title: "Frequently Asked Questions",
    items: [
        {
            q: "How long does SEO take to work?",
            a: "SEO is a long-term strategy, not an overnight fix. Most businesses start seeing noticeable improvements within 3–6 months depending on competition and website health.",
        },
        {
            q: "What's the difference between SEO and Google Ads?",
            a: "Google Ads provide instant paid visibility, while SEO builds long-term organic traffic and trust.",
        },
        {
            q: "What is a Google Business Profile and why does it matter?",
            a: "A Google Business Profile helps your business appear in Maps and local search results for nearby customers.",
        },
        {
            q: "Do you guarantee first page rankings?",
            a: "No ethical SEO company can guarantee rankings. We focus on proven strategies that improve visibility and traffic.",
        },
        {
            q: "Do I need SEO if I already run Google Ads?",
            a: "Yes. SEO builds long-term organic traffic while ads stop once your budget ends.",
        },
        {
            q: "What industries do you specialise in?",
            a: "We work with contractors, healthcare, restaurants, law firms, moving companies, home services, and more.",
        },
        {
            q: "What is local SEO and do I need it?",
            a: "Local SEO helps your business appear in nearby searches and Google Maps results.",
        },
        {
            q: "How do you measure SEO success?",
            a: "We track rankings, organic traffic, leads, calls, and conversion growth.",
        },
        {
            q: "What do I need to provide to get started?",
            a: "Usually website access, business details, and a short onboarding call.",
        },
    ],
} as const;

/* ------------------------------------------------------------------- CTA -- */

export const cta = {
    titleLead: "Ready to Get More Customers",
    titleTrail: "from Google Search?",
    /* [fix] "Either way, TinyBull can help." → "Either way, we can help." */
    description:
        "New to SEO or looking to outrank your competition? Either way, we can help. Get started today or run a free SEO report on your site.",
    primary: "Get Started →",
    secondary: "Free SEO Report →",
} as const;

/* ---------------------------------------------------------------- footer -- */

export const footer = {
    logoAlt: `${site.name} logo`,
    /* [fix] The live paragraph is the template agency's origin story in full:
       "Some of you may be wondering, what is TinyBull? Well, a bull is symbolic
       for determination, strength, and helpfulness. Like a bull, we have the
       skills and determination needed to help your business succeed."

       There is no version of that sentence that survives the rebrand — it is
       an explanation of a name this business does not have. Replaced with the
       company's own description, which is the same string the Organization
       JSON-LD and the site footer already use. */
    about: site.description,
    contactTitle: "CONTACT",
    email: contact.email,
    phone: contact.phoneDisplay,
    address: "Continental House, 497 Sunleigh Road,",
    addressSecond: "Wembley, England, HA0 4LY",
    socialTitle: "STAY CONNECTED",
    partnerAlt: "Google Partner",
    /* The live footer's logo and legal links go nowhere (`href="#"`). Both legal
       pages exist on this site, so the footer links them. [fix] */
    legal: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms And Conditions", href: "/terms-and-conditions" },
    ],
} as const;

/**
 * Every CTA on the live page is `href="#"` — twelve dead links, including both
 * hero buttons, every pricing "Get Started", and both buttons in the closing
 * CTA band. They are wired to the enquiry dialog here, labelled with the plan
 * the visitor clicked so the notification email says which one. [fix]
 */
export const quoteDialog = {
    title: "Request a Quote",
    subtitle: "Tell us about your business and we'll come back within one working day.",
    defaultPackage: "SEO Services",
    reportPackage: "Free SEO Report",
} as const;
