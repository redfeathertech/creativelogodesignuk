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

    /* Not on the live page: the cue is an anchor down to the trust strip, and
       an anchor needs an accessible name. Declared in the parity script's
       AUTHORED set alongside the other names the live template ships unnamed. */
    scrollCue: "Scroll Down",

    /* The hero backdrop and the artwork beside the copy, supplied by the client
       for the 2026-09 hero redesign. The illustration replaces nothing: the
       search-result mockup below still renders, one panel further down. Keys
       ending `Alt` and the `src`/`width`/`height` trio are not copy — see
       NOT_COPY in scripts/verify-seo-services-parity.py.

       WebP, not the PNGs first supplied: the backdrop is 72KB against 5.6MB for
       the same 3840x1770 pixels, and it is `preload`ed as the fold's first
       paint. The artwork is the client's own tighter crop — 649x560, not the
       PNG's 700x700 square with its transparent margin — so the intrinsic ratio
       here is what `next/image` reserves and there is no layout shift. */
    background: {
        src: "/assets/img/services/seo/hero-bg.webp",
        width: 3840,
        height: 1770,
    },
    /* The tablet/phone backdrop, supplied by the client (2026-09). The desktop
       wave is a 3840x1770 panorama: at 1024px and below the fold stacks, that
       crop collapses to a sliver, and pinning it to the desktop fold height
       leaves a hard seam across the section where it ends. This square crop
       covers the stacked fold instead and is the only backdrop rendered below
       `lg`. `src`/`width`/`height` are NOT_COPY — see the parity script. */
    backgroundTablet: {
        src: "/assets/img/services/seo/hero-bg-tablet.webp",
        width: 1024,
        height: 1024,
    },
    illustration: {
        src: "/assets/img/services/seo/hero-illustration.webp",
        width: 649,
        height: 560,
    },
    illustrationAlt:
        "Neon 3D illustration of a magnifying glass over a rising bar chart, a target and a search ranking panel",

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

    /* These four read as claims about the agency, not as mockup decoration.
       `icon` names a mark in components/services/seo/heroIcons.tsx; it is a
       token, not copy, and NOT_COPY skips the key. */
    stats: [
        { icon: "rocket", value: "3.2x", label: "Avg. traffic increase" },
        { icon: "retention", value: "94%", label: "Client retention rate" },
        { icon: "ranking", value: "Top 3", label: "Avg. local ranking" },
        { icon: "businesses", value: "150+", label: "Businesses ranked" },
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
    /* The client's 2026-09 backdrop for this section — the neon dot-and-line
       field the three cards sit on. Sized, like every image in this build. */
    background: {
        src: "/assets/img/services/seo/approach-bg.webp",
        width: 3840,
        height: 2125,
    },
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
            icon: "/assets/img/services/seo/pillar-technical-seo.svg",
            iconAlt:
                "Technical SEO icon: a browser window with a settings gear, on a glowing purple disc",
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
            icon: "/assets/img/services/seo/pillar-on-page-seo.svg",
            iconAlt:
                "On-page SEO icon: a document page with optimised headings and text, on a glowing purple disc",
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
            icon: "/assets/img/services/seo/pillar-off-page-seo.svg",
            iconAlt:
                "Off-page SEO icon: linked websites forming an authority network, on a glowing purple disc",
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
    titleLead: "SEO Built for Your",
    titleAccent: "Specific Industry",
    description:
        "Every industry has different search behaviour, different keyword competition, and different local factors. We bring specific experience to the industries that matter most to us.",
    items: [
        {
            icon: "/assets/img/services/seo/industry-home-services.svg",
            iconAlt:
                "Home Services icon: a house with a spanner, on a magenta gradient disc",
            title: "Home Services",
            text: "HVAC, plumbing, electrical, roofing, landscaping — we rank home service companies for the high-intent “near me” searches that turn into booked jobs. Local SEO is our speciality.",
        },
        {
            icon: "/assets/img/services/seo/industry-healthcare-medical.svg",
            iconAlt:
                "Healthcare and medical icon: a caring hand holding a heart with a pulse line, on a magenta gradient disc",
            title: "Healthcare & Medical",
            /* [fix] "HIPAA-sensitive content" → GDPR. HIPAA is US federal
               healthcare law and has no application to a UK clinic; the UK
               equivalent obligation is UK GDPR / the Data Protection Act. */
            text: "Dental practices, med spas, chiropractors, and healthcare clinics. We understand GDPR-sensitive content, patient intent keywords, and the trust signals that medical SEO requires.",
        },
        {
            icon: "/assets/img/services/seo/industry-contractors-construction.svg",
            iconAlt:
                "Contractors and construction icon: a worker in a hard hat, on a magenta gradient disc",
            title: "Contractors & Construction",
            text: "Custom home builders, remodelers, foundation repair, and specialty contractors. We target project-specific keywords with strong commercial intent and build local authority.",
        },
        {
            icon: "/assets/img/services/seo/industry-restaurants-hospitality.svg",
            iconAlt:
                "Restaurants and hospitality icon: a shopfront with an awning, on a magenta gradient disc",
            title: "Restaurants & Hospitality",
            text: "Restaurants, hotels, and entertainment venues. We optimise for local map pack visibility, review signals, and the “open now near me” searches that drive foot traffic.",
        },
        {
            icon: "/assets/img/services/seo/industry-professional-services.svg",
            iconAlt:
                "Professional services icon: a gear wheel, on a magenta gradient disc",
            title: "Professional Services",
            text: "Law firms, financial advisors, accountants, and insurance agencies. Trust and authority are everything in professional services — and SEO is how you build both online.",
        },
        {
            icon: "/assets/img/services/seo/industry-moving-logistics.svg",
            iconAlt:
                "Moving and logistics icon: a delivery van beside stacked boxes, on a magenta gradient disc",
            title: "Moving & Logistics",
            text: "Moving companies, storage facilities, and logistics providers. High competition, high intent — we use hyperlocal SEO and review generation to put you at the top when customers need you most.",
        },
    ],
    calloutIcon: "/assets/img/services/seo/industry-callout.svg",
    calloutIconAlt: "A magenta warning triangle with an exclamation mark",
    calloutTitle: "Don’t see your industry?",
    bottomTextLead: "We work across dozens of verticals.",
    bottomLinkText: "Get in touch",
    bottomTextTrail: "and we’ll tell you exactly how we’d approach your market.",
} as const;

/* ------------------------------------------------------------ difference -- */

export const difference = {
    /* [fix] was "WHY TINYBULL" */
    eyebrow: `WHY ${site.name.toUpperCase()}`,
    /* The client's 2026-09 backdrop for this section — the same neon field the
       rest of the redesigned page sits on. `src`/`width`/`height` are NOT_COPY
       in the parity script: artwork, not page copy. */
    background: {
        src: "/assets/img/services/seo/difference-bg.webp",
        width: 1920,
        height: 846,
    },
    titleLead: "Small Agency. Big Results.",
    titleTrail: "Here's the Difference.",
    /* [fix] "TinyBull is different" → "We're different" */
    description:
        "Big agencies charge big agency prices and assign your account to a junior account manager you've never met. We're different — and we think that difference matters.",
    bad: {
        /* Decorative — the list beside it already says which card is which. */
        icon: "/assets/img/services/seo/difference-bad.svg",
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
        icon: "/assets/img/services/seo/difference-good.svg",
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
            iconSrc: "/assets/img/services/seo/included-keyword-research.svg",
            iconWidth: 68,
            iconHeight: 68,
            title: "Keyword Research & Strategy",
            text: "We identify the exact search terms your customers use to find businesses like yours, then build a strategy around ranking for the ones that drive real leads.",
        },
        {
            icon: "file",
            iconSrc: "/assets/img/services/seo/included-on-page.svg",
            iconWidth: 68,
            iconHeight: 68,
            title: "On-Page Optimisation",
            text: "Meta tags, heading structure, content optimisation, URL structure, and internal linking — every page built to rank.",
        },
        {
            icon: "location",
            iconSrc: "/assets/img/services/seo/included-gbp.svg",
            iconWidth: 68,
            iconHeight: 68,
            title: "Google Business Profile",
            text: "Active GBP management with weekly posts, geo-tagged images, Q&As, review responses, and monthly performance tracking.",
        },
        {
            icon: "pulse",
            iconSrc: "/assets/img/services/seo/included-technical-seo.svg",
            iconWidth: 68,
            iconHeight: 68,
            title: "Technical SEO",
            text: "Site speed, schema markup, XML sitemaps, mobile optimisation, SSL checks, and crawl error fixes that silently hurt rankings.",
        },
        {
            icon: "link",
            iconSrc: "/assets/img/services/seo/included-link-building.svg",
            iconWidth: 64,
            iconHeight: 56,
            title: "Link Building & Citations",
            text: "High-quality backlinks and local citations that signal authority to Google and boost your domain strength over time.",
        },
        {
            icon: "chart",
            iconSrc: "/assets/img/services/seo/included-reporting.svg",
            iconWidth: 64,
            iconHeight: 54,
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
    /* The client's 2026-09 artwork for this section: the neon backdrop and the
       desktop-monitor SERP mockup that replaced the hand-built dashboard card
       on the right of the split. `src`/`width`/`height`/`*Alt` are NOT_COPY in
       scripts/verify-seo-services-parity.py — artwork, not page copy. */
    background: {
        src: "/assets/img/services/seo/on-page-bg.webp",
        width: 3840,
        height: 1693,
    },
    monitor: {
        src: "/assets/img/services/seo/on-page-monitor.webp",
        width: 1048,
        height: 819,
    },
    monitorAlt:
        'Desktop monitor showing a Google results page for "plumber near me" with a local plumbing business ranked in position one',
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

    /* The rankings card was cut whole on the client's instruction (2026-09) —
       see components/services/seo/OnPage.tsx. `rankingHeading`, the seven
       `rankings` rows and `rankingFooter` lived here; every one of those live
       runs is now declared in REPLACED in scripts/verify-seo-services-parity.py,
       so the reverse pass still fails on any other drop. */
} as const;

/* ------------------------------------------------------------------- GBP -- */

export const gbp = {
    cardHeading: "GBP Insights — This Month",
    /* The client's 2026-09 artwork for this section: the illustration that
       takes the left of the split, and an icon per stat. The src/width/height,
       imageAlt and every iconSrc are NOT_COPY in
       scripts/verify-seo-services-parity.py — artwork, not page copy. */
    image: {
        src: "/assets/img/services/seo/gbp-google.webp",
        width: 640,
        height: 468,
    },
    imageAlt:
        "Laptop with SEO icons floating above the keyboard, illustrating a managed Google Business Profile",
    stats: [
        {
            label: "PROFILE VIEWS",
            value: "1,842",
            note: "↑ +34% vs last month",
            highlight: true,
            iconSrc: "/assets/img/services/seo/gbp-profile-views.svg",
            iconWidth: 40,
            iconHeight: 40,
        },
        {
            label: "DIRECTION REQUESTS",
            value: "218",
            note: "↑ +19% vs last month",
            iconSrc: "/assets/img/services/seo/gbp-direction-requests.svg",
            iconWidth: 44,
            iconHeight: 40,
        },
        {
            label: "PHONE CALLS",
            value: "94",
            note: "↑ +28% vs last month",
            iconSrc: "/assets/img/services/seo/gbp-phone-calls.svg",
            iconWidth: 40,
            iconHeight: 40,
        },
        {
            label: "REVIEW SCORE",
            value: "4.9/5.0",
            note: "142 reviews",
            iconSrc: "/assets/img/services/seo/gbp-review-score.svg",
            iconWidth: 42,
            iconHeight: 36,
        },
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
    /* The client's 2026-09 composition sits on the same neon backdrop as the
       pillars section, so the two read as one band down the page. */
    background: pillars.background,
    /* Left-hand artwork. Decorative — the four steps beside it carry the
       meaning — so it renders with an empty alt. */
    image: {
        src: "/assets/img/services/seo/process-bulb.webp",
        width: 640,
        height: 554,
    },
    steps: [
        {
            number: "01",
            title: "SEO AUDIT",
            text: "We analyse your site, rankings, competitors, and technical health to find exactly what's holding you back.",
            icon: "/assets/img/services/seo/process-audit.svg",
            iconAlt: "SEO audit icon: a shield with a tick, in a glowing circle",
        },
        {
            number: "02",
            title: "STRATEGY BUILD",
            text: "We create a custom keyword strategy and SEO roadmap tailored to your business, market, and goals.",
            icon: "/assets/img/services/seo/process-strategy.svg",
            iconAlt: "Strategy build icon: a screen of connected nodes, in a glowing circle",
        },
        {
            number: "03",
            title: "OPTIMISE & EXECUTE",
            text: "On-page fixes, GBP management, content, link building, and technical improvements — implemented monthly.",
            icon: "/assets/img/services/seo/process-optimise.svg",
            iconAlt: "Optimise and execute icon: a magnifying glass over an SEO page, in a glowing circle",
        },
        {
            number: "04",
            title: "TRACK & REPORT",
            text: "Monthly ranking reports, traffic data, and GBP insights in plain English with clear next steps.",
            icon: "/assets/img/services/seo/process-report.svg",
            iconAlt: "Track and report icon: a rising bar chart with an arrow, in a glowing circle",
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
            icon: "/assets/img/services/seo/pricing-launch.svg",
            iconAlt: "Launch plan icon: a rocket lifting off",
            iconWidth: 40,
            iconHeight: 40,
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
            icon: "/assets/img/services/seo/pricing-growth.svg",
            iconAlt: "Growth plan icon: a briefcase",
            iconWidth: 40,
            iconHeight: 40,
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
            icon: "/assets/img/services/seo/pricing-enterprise.svg",
            iconAlt: "Enterprise plan icon: a columned building",
            iconWidth: 40,
            iconHeight: 40,
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
    /* The live page carries this as a single run: "Not ready to commit? Start
       with a free SEO report on your website - no account needed." The 2026-09
       redesign promotes the question to the closing banner’s heading. Same
       words in the same DOM order, so both parity passes still see the run
       whole and neither list needs an entry. */
    ctaHeading: "Not Ready To Commit?",
    ctaText:
        "Start with a free SEO report on your website — no account needed.",
    ctaButton: "Run My Free SEO Report",
    ctaIcon: "/assets/img/services/seo/pricing-ready.svg",
    ctaIconWidth: 100,
    ctaIconHeight: 72,
    /* Decorative artwork for the right edge of the banner. Purely visual — it
       carries an empty alt and adds no copy to the page. */
    ctaImage: "/assets/img/services/seo/cta-not-ready.webp",
    ctaImageWidth: 286,
    ctaImageHeight: 173,
} as const;

/* ------------------------------------------------------------------- FAQ -- */

/**
 * Nine questions. Carried over verbatim — none of them names the template
 * agency, and they feed the `FAQPage` JSON-LD node the live page never had.
 */
export const faq = {
    eyebrow: "COMMON QUESTIONS",
    /* Split for the two-tone heading only. Joined with a single space these are
       the live title, unchanged: "Frequently Asked Questions". */
    titleLead: "Frequently Asked",
    titleAccent: "Questions",
    /* Net-new copy for the 2026-09 two-column rebuild of this section, lifted
       from the homepage `challenges` block this now mirrors. No live
       equivalent, so it carries no ranking risk — declared in AUTHORED in
       scripts/verify-seo-services-parity.py. Two entries: the design breaks
       the line. */
    lead: [
        "Every business faces roadblocks.",
        "We turn them into opportunities for growth.",
    ],
    /* The four-reason panel beneath the heading, sharing the homepage's 78px
       icon set. */
    pillars: [
        {
            title: "One Partner. Every Solution.",
            body: "From branding to marketing, we’ve got you covered at every step.",
            icon: "/assets/img/home/challenges/pillar-partner.svg",
            iconAlt: "Hand selecting from a network of connected services",
        },
        {
            title: "Strategy-First Approach",
            body: "We solve the root problem, not just the symptoms.",
            icon: "/assets/img/home/challenges/pillar-strategy.svg",
            iconAlt: "Chess piece icon for our strategy-first approach",
        },
        {
            title: "Results That Matter",
            body: "Our solutions are built to deliver measurable growth.",
            icon: "/assets/img/home/challenges/pillar-results.svg",
            iconAlt: "Upward graph icon for results that matter",
        },
        {
            title: "Dedicated Support",
            body: "A team that’s with you, whenever you need us.",
            icon: "/assets/img/home/challenges/pillar-support.svg",
            iconAlt: "Headset icon for dedicated client support",
        },
    ],
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
    /* No longer rendered: the client dropped the second pill from the closing
       band in the 2026-09 redesign. Kept as the record of the live label — the
       offer itself still reaches the visitor through quoteDialog.reportPackage. */
    secondary: "Free SEO Report →",

    /* The phone pill in the client's 2026-09 CTA composition — the same number the
       hero and the top bar already show, so it is not new copy. */
    phone: contact.phoneDisplay,

    /* The client's backdrop for the band (2026-09). The src/width/height
       trio is not copy — see NOT_COPY in scripts/verify-seo-services-parity.py. */
    background: {
        src: "/assets/img/services/seo/cta-bg.webp",
        width: 1920,
        height: 586,
    },
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
