/**
 * Copy for the homepage-v2 sections that have no v1 equivalent.
 *
 * This is the ONLY net-new copy in the redesign. Every other v2 section reads
 * from `content/home.ts` (parity-locked) or `content/about.ts` (already
 * written, reviewed and shipped on /about-us).
 *
 * The descriptions deliberately claim nothing that cannot be seen in the
 * artwork: sector, deliverable, and design intent. No metrics, no outcomes, no
 * client quotes. Invented results on a homepage are both an SEO liability and
 * a trading-standards one, and there is no case-study data behind these to
 * draw on. If real figures are supplied later, they belong here.
 *
 * `image` on each entry is currently the client's logo artwork, reused from
 * the /creative-logo-design landing page. `FeaturedWork` frames whatever it is
 * given, so swapping in real website screenshots later is a change to this
 * file alone — no component work.
 */
export const featuredWork = {
    eyebrow: "Selected work",
    titleLead: "Brands we have",
    titleAccent: "built from scratch",
    lead: "A brand identity has to work everywhere — on a van, on a shopfront, on a phone screen at arm’s length. These are built to do all three.",
    cta: "See more work",
    ctaHref: "/creative-logo-design",
    items: [
        {
            name: "Girl Power Electric",
            sector: "Trades & Services",
            body: "A female-led electrical contractor needed a mark that read as unmistakably qualified before it read as anything else. Bold, high-contrast, and legible at van-livery scale.",
            image: "/assets/img/landing/creative-logo-design/work/girl-power-electric.webp",
        },
        {
            name: "Caddy Cubs",
            sector: "Childcare",
            body: "A children’s golf academy, aimed at parents but loved by the kids. Rounded, warm and character-led, without tipping into anything the brand ages out of.",
            image: "/assets/img/landing/creative-logo-design/work/caddy-cubs.webp",
        },
        {
            name: "My Flavours",
            sector: "Food & Beverage",
            body: "An appetite-first identity for a food brand competing on a crowded shelf. The palette does the heavy lifting; the mark stays simple enough to survive a bottle cap.",
            image: "/assets/img/landing/creative-logo-design/work/my-flavours.webp",
        },
        {
            name: "MA London Building Services",
            sector: "Construction",
            body: "Construction branding that had to signal reliability to commercial clients and homeowners at once. Structural, squared-off, and built to hold up in a single colour.",
            image: "/assets/img/landing/creative-logo-design/work/ma-london-building-services.webp",
        },
        {
            name: "Waggy Adventures",
            sector: "Pet Care",
            body: "A dog-walking service with personality to spare. The mark carries the warmth the business sells on, while staying clean enough for a polo shirt and a van door.",
            image: "/assets/img/landing/creative-logo-design/work/waggy-adventures.webp",
        },
        {
            name: "British Certification",
            sector: "Professional Services",
            body: "A certification body has to look like an authority on first sight. Restrained, symmetrical and formal — the opposite brief to everything else on this page.",
            image: "/assets/img/landing/creative-logo-design/work/british-certification.webp",
        },
    ],
} as const;
