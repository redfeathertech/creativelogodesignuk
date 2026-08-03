/**
 * About Us page copy.
 *
 * CONTENT-PARITY NOTE — read `docs/CONTENT-PARITY.md` first.
 *
 * Unlike the homepage, there is no live wording to preserve here. The live
 * `/about-us` is still the stock CMS template (`about-us_old.blade.php`), and
 * its copy comes from the database, where it is unedited demo text: the record
 * is titled `sdsad` and "Our Mission", "Our Vision" and "Our Goals" all hold the
 * same boilerplate paragraph. Nothing on that page ranks on its own words, so
 * every string below is net-new and no live wording is being dropped.
 *
 * Source of the copy: the approved clduk redesign,
 * `clduk/resources/views/frontend/themes/theme-one/about-us.blade.php`, carried
 * over verbatim. The two additions it has no equivalent for are marked `[new]`.
 */

export const aboutMeta = {
    /* "About Us" is the live <title>; the root layout appends the brand. */
    title: "About Us",
    description:
        "Creative Logo Design is a full-service design, development and digital marketing agency with offices in the UK, USA and Dubai. Meet the team behind the work.",
} as const;

/* =============================== HERO ================================= */

export const aboutHero = {
    eyebrow: "Learn more about us",
    titleLead: "Your partner in web design &",
    titleAccent: "digital marketing",
    lead: "Our team of creative strategists, designers, developers and marketers blends brand storytelling, cutting-edge technology and results-driven strategy into one seamless experience. We don’t just build websites or run campaigns — we craft digital solutions that drive engagement, growth and long-term success.",
    primaryCta: "Talk to us",
    secondaryCta: "Contact us",
    image: {
        src: "/assets/img/about/hero.webp",
        alt: "Illustration of a marketer surrounded by web, app, advertising and social media icons",
    },
} as const;

/* ============================ BEST IN BREED =========================== */

export const story = {
    eyebrow: "Best in breed",
    titleLead: "A full-service digital agency,",
    titleAccent: "trusted worldwide",
    paragraphs: [
        "We’ve grown into a full-service digital agency trusted by brands across industries. With offices in the USA, UK and Dubai, we deliver award-winning digital experiences that combine innovative design with measurable marketing results.",
        "Rooted in advertising and branding expertise, we understand that design without strategy falls flat. That’s why every website, campaign or platform we create aligns with your brand identity while pushing boundaries for maximum impact.",
        "For startups, we specialise in shaping brand voice, visual identity and go-to-market strategies that set the stage for success. For established businesses, we refine and elevate existing assets to reach new levels of growth.",
    ],
    image: {
        src: "/assets/img/about/studio.webp",
        alt: "The Creative Logo Design sign on the glass wall of the studio meeting room",
    },
} as const;

/* ============================= LOCATIONS ============================== */

export const locations = {
    eyebrow: "Our locations",
    titleLead: "Local insight,",
    titleAccent: "global reach",
    lead: "Our team delivers services to clients throughout the United Kingdom and internationally, offering region-specific expertise and comprehensive global capabilities.",
    /* The office details themselves live in `content/site.ts`, which is also
       what the footer and the Organization JSON-LD read. */
    cta: "Get directions",
} as const;

/* ============================= INDUSTRIES ============================= */

export const industries = {
    eyebrow: "Industries",
    titleLead: "Sectors we know",
    titleAccent: "inside out",
    lead: "Two decades of work across markets means we arrive already speaking your industry’s language.",
    items: [
        "Financial Services",
        "Cannabis",
        "Real Estate",
        "Automotive",
        "Marine",
        "Business Services",
        "Construction",
        "Technology",
        "E-commerce",
        "Education",
        "Cybersecurity",
        "Outdoor",
        "Fitness",
        "Food & Beverage",
        "Gaming",
        "Government",
        "Fintech / Finserv",
        "Hospitality",
        "Insurance",
        "Legal",
        "Luxury",
        "Human Resources",
        "Aerospace",
        "Restaurant",
        "Retail",
        "Photography",
        "Telecommunications",
        "Energy",
        "Manufacturing",
        "Cryptocurrency",
        "Transportation",
    ],
} as const;

/* ============================== CLIENTS =============================== */

export const clientWall = {
    eyebrow: "Our clients",
    titleLead: "Brands that trust",
    titleAccent: "our work",
    /* [new] The redesign's version of this band is a heading and nothing else,
       which leaves the logos to carry the section on their own. */
    lead: "Brand identities, websites and campaigns built for owner-run businesses and established names alike.",
    /* [new] The eighth cell of the logo wall — it squares off a seven-item grid
       and puts a number next to the names. Same figure as the homepage. */
    stat: { value: 1200, suffix: "+", label: "Projects delivered" },
} as const;

/* ======================== SKILLS & CREDENTIALS ======================== */

export const credentials = {
    eyebrow: "Skills & credentials",
    titleLead: "The platforms we’re",
    titleAccent: "certified in",
    cta: "Contact us now",
    /* The artwork in `/assets/img/credentials/` is white-on-transparent, which
       is why these tiles are dark on a light section rather than the other way
       round — on white they are invisible. */
    groups: [
        {
            title: "Search Engine Optimisation",
            logos: [
                { name: "Google Partner", src: "/assets/img/credentials/google-partner.webp" },
                { name: "Google Trends", src: "/assets/img/credentials/google-trends.webp" },
                { name: "Semrush", src: "/assets/img/credentials/semrush.webp" },
            ],
        },
        {
            title: "Marketing & Sales",
            logos: [
                { name: "HubSpot", src: "/assets/img/credentials/hubspot.webp" },
                { name: "Marketo", src: "/assets/img/credentials/marketo.webp" },
                { name: "Salesforce", src: "/assets/img/credentials/salesforce.webp" },
            ],
        },
        {
            title: "Website Development",
            logos: [
                { name: "WordPress", src: "/assets/img/credentials/wordpress.webp" },
                { name: "Contentful", src: "/assets/img/credentials/contentful.webp" },
                { name: "Magento", src: "/assets/img/credentials/magento.webp" },
            ],
        },
        {
            title: "Digital & Social Marketing",
            logos: [
                { name: "Social platforms", src: "/assets/img/credentials/social-platforms.webp" },
                { name: "Yext", src: "/assets/img/credentials/yext.webp" },
                { name: "YouTube", src: "/assets/img/credentials/youtube.webp" },
            ],
        },
    ],
} as const;
