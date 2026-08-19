/**
 * Homepage copy.
 *
 * CONTENT-PARITY RULE — read `docs/CONTENT-PARITY.md` before editing anything
 * in this file. These pages rank; the wording is deliberately identical to the
 * live Laravel site. Where the clduk redesign reworded live copy, the LIVE
 * wording wins and is marked `[live]`. Layout may change freely; words may not.
 */

/* ============================== HERO ================================== */

export const hero = {
    eyebrow: "We Are Creative Studio",
    titleLead: "Your All-in-one",
    titleAccent: "solution",
    sub: "We’re a Full-Service Design & Development Agency From The UK Crafting unique brand identities, immersive UI/UX, cutting-edge apps, and growth-focused marketing strategies for businesses worldwide.",
    primaryCta: "Request Growth Strategy",
    secondaryCta: "See our work",
    /* Full-bleed hero backdrop, supplied by the client. One image across the
     whole section — the old build tinted the form half separately, which read
     as two panels rather than one banner. */
    background: "/assets/img/home/hero-bg.png",
    /* Stat marks, supplied by the client as PNGs rather than drawn in SVG. */
    trust: [
        {
            value: 1000,
            suffix: "+",
            label: "Happy clients",
            icon: "/assets/img/home/stat-clients.png",
        },
        {
            value: 1200,
            suffix: "+",
            label: "Projects delivered",
            icon: "/assets/img/home/stat-projects.png",
        },
        {
            value: 60,
            suffix: "+",
            label: "Team members",
            icon: "/assets/img/home/stat-team.png",
        },
    ],
    scrollCue: "Scroll Down",
    /* Hero enquiry card. Net-new content — nothing on the live homepage is being
     reworded (see docs/CONTENT-PARITY.md). */
    form: {
        titleLead: "Start Getting",
        titleAccent: "Results",
        sub: "Tell us about your project and a strategist will be in touch.",
        submit: "Submit Now",
        assurances: ["No obligation", "Quick response", "100% confidential"],
    },
    /* Trustpilot badge under the hero stats.

     TODO — `href` IS A PLACEHOLDER. It is the profile URL the live landing page
     links to; swap it for the real review URL once the profile is confirmed.

     TODO — `rating` and `reviewCount` are claims about a third party. They are
     shown because the approved hero design states them; they go stale the
     moment a review lands, so keep them in step with the real profile or move
     to Trustpilot's own widget. */
    trustpilot: {
        href: "https://uk.trustpilot.com/review/creativelogodesign.co.uk",
        label: "Read our reviews",
        linkLabel: "Read our reviews on Trustpilot",
        logo: "/assets/img/trustpilot-logo.png",
        logoAlt: "Trustpilot",
        stars: 5,
        rating: "4.9",
        reviewCount: "Based 134 Reviews",
    },
} as const;

/* ============================== ABOUT ================================= */

export const about = {
    eyebrow: "About Us",
    titleLead: "Still Wondering?",
    titleMid: "Your Competitors",
    titleAccent: "Aren’t Waiting",
    lead: "While you're weighing things up, your competitors are busy launching fresh websites, sharpening their brands, and snapping up your audience. Every day you wait is an opportunity they take. Don't just think, act now.",
    primaryCta: "Request A Proposal",
    secondaryCta: "Start Your Project Today",
    badge: "Taking on new projects",
    /* [redesign] "Completed Projects" -> "Projects Delivered", signed off with
     the About-section redesign. Stat labels are not indexed heading or body
     copy; the numbers, which are the ranking-relevant claim, are unchanged. */
    stats: [
        {
            value: 1000,
            suffix: "+",
            label: "Happy Clients",
            icon: "/assets/img/home/stat-clients.png",
        },
        {
            value: 1200,
            suffix: "+",
            label: "Projects Delivered",
            icon: "/assets/img/home/stat-projects.png",
        },
        {
            value: 60,
            suffix: "+",
            label: "Team Members",
            icon: "/assets/img/home/stat-team.png",
        },
    ],
    images: {
        back: {
            src: "/assets/img/home/about-back.webp",
            alt: "Creative Logo Design team collaborating on a brand concept",
        },
        front: {
            src: "/assets/img/home/about-front.webp",
            alt: "Designers reviewing page layouts together",
        },
    },
} as const;

/* ========================= PROCESS + RECENT WORK ====================== */

export const process = {
    eyebrow: "How it works",
    titleLead: "Powerful Brand in Just a",
    titleAccent: "Few Clicks",
    lead: "Building your brand can be simple. We make the process quick and focused on results. Just tell us your goals, and we'll create a brand identity that helps your business get noticed.",
    /* Full-bleed section backdrop, supplied by the client — the same treatment as
     the hero, so the two dark bands either side of the light About section read
     as one surface rather than a flat panel with an image dropped on it. */
    background: "/assets/img/home/how-it-works-bg.png",
    /* Net-new: the section had no call to action at all, so the three steps ended
     on a full stop. Nothing existing is reworded (docs/CONTENT-PARITY.md). The
     secondary CTA points at the portfolio section directly below. */
    primaryCta: "Request A Proposal",
    secondaryCta: "See our work",
    workAnchor: "#recent-work",
    /* Net-new. The marks are client-supplied PNGs, each a complete badge — the
     gradient ring and its glow are baked into the asset, so nothing here draws
     a ring around them. 60x60 native. */
    highlights: [
        {
            title: "Proven Process",
            body: "A step-by-step approach that delivers results.",
            icon: "/assets/img/home/proven-process.png",
        },
        {
            title: "Results Driven",
            body: "We focus on growth that truly matters.",
            icon: "/assets/img/home/results-driven.png",
        },
    ],
    /* Step marks, also client-supplied complete badges. 117x117 native. */
    steps: [
        {
            title: "Discovery & Strategy",
            body: "We learn about your goals, look at your competitors, and create a plan that fits your brand’s vision.",
            icon: "/assets/img/home/step-discovery.png",
        },
        {
            // [live] "understands your idea and makes it into" — not the redesign's "takes … turns it into"
            title: "Concept Development",
            body: "Our team understands your idea and makes it into something special that connects with your audience.",
            icon: "/assets/img/home/step-concept.png",
        },
        {
            // [live] "each detail" / "Our representative" — not the redesign's "every detail" / "Your representative"
            title: "Design & Delivery",
            body: "We handle each detail. Our representative works closely with you to give the best outcome and also gives personal advice.",
            icon: "/assets/img/home/step-design.png",
        },
    ],
} as const;

export const recentWork = {
    eyebrow: "Our Portfolio",
    /* `title` is the section's accessible name (it labels the rail). The
       heading renders `titleLead` + `titleAccent`, which concatenate to
       exactly it — the live heading text is unchanged. */
    title: "Our Recent Work",
    titleLead: "Our",
    titleAccent: "Recent Work",
    /* TODO — RENDERED WITHOUT A LINK ON PURPOSE. There is no portfolio route
       yet; give this button an `href` the moment that page ships. */
    viewAll: "View All Projects",
    /* Filter labels are new UI chrome, not ported copy — the live rail has no
       filters. Every item's `category` is one of these ids, and "all" is the
       default, so the server-rendered HTML carries all six cards and their
       links whatever the visitor clicks afterwards. */
    filters: [
        { id: "all", label: "All Work" },
        { id: "web-design", label: "Web Design" },
        { id: "ui-ux", label: "UI/UX" },
        { id: "branding", label: "Branding" },
        { id: "app-development", label: "App Development" },
        { id: "marketing", label: "Marketing" },
    ],
    items: [
        {
            lead: "App",
            trail: "Development",
            category: "app-development",
            img: "/assets/img/work/app-development.webp",
            href: "/app-development-services",
        },
        {
            lead: "Blog",
            trail: "Design",
            category: "web-design",
            img: "/assets/img/work/blog-design.webp",
            href: "/web-design-services/corporate-blog-design",
        },
        {
            lead: "Branding",
            trail: "Design",
            category: "branding",
            img: "/assets/img/work/branding-design.webp",
            href: "/branding-services",
        },
        {
            lead: "Web",
            trail: "Design",
            category: "web-design",
            img: "/assets/img/work/seo-aeo.webp",
            href: "/web-design-services",
        },
        {
            lead: "Social",
            trail: "Media",
            category: "marketing",
            img: "/assets/img/work/social-media.webp",
            href: "/digital-marketing-services/social-media-marketing",
        },
        {
            lead: "UI UX",
            trail: "Design",
            category: "ui-ux",
            img: "/assets/img/work/ui-ux-design.webp",
            href: "/web-design-services/ui-ux-design",
        },
    ],
} as const;

/* ============================ WHAT YOU GET ============================ */

export const whatYouGet = {
    eyebrow: "What you get",
    titleLead: "What do You Get with",
    /* Lower case on purpose. The live heading reads "What do You Get with
       creative logo design?" verbatim — the approved mock title-cases the
       accent, but heading text is exactly what docs/CONTENT-PARITY.md says
       must not move, so the casing stays as it ranks. */
    titleAccent: "creative logo design",
    titleTrail: "?",
    lead: "Complete solution at one place, including Design, Development, Branding, and Growth. You don't have to go anywhere else.",
    /* The band's backdrop: a 1920x1039 field with the glow curve and the dot
       sphere already drawn into it, so neither is a DOM element. */
    background: "/assets/img/home/offer-bg.webp",
    /* The monitor, exactly as supplied and rendered as one flat image. Its
       screen is part of the artwork, so nothing is layered over it and
       selecting a card does not change it. */
    frame: "/assets/img/home/offer-monitor.webp",
    /* Net-new: the live section has no proof strip under its lead. Nothing
       existing is reworded (docs/CONTENT-PARITY.md). */
    benefits: [
        {
            label: "All-in-one Solution",
            icon: "/assets/img/home/offer/benefit-all-in-one.webp",
        },
        {
            label: "Tailored for Your Brand",
            icon: "/assets/img/home/offer/benefit-tailored.webp",
        },
        {
            label: "Focus on Growth and Results",
            icon: "/assets/img/home/offer/benefit-growth.webp",
        },
    ],
    /* Order follows the approved design, which leads on Web Design; the live
       page leads on UI/UX. Reordering moves no string and drops no link, so it
       is a layout change, not a content one. Each `body` is the live copy word
       for word — the mock rewrites all five, and those rewrites are NOT taken.
       `icon` and `href` are net-new; on the live site no tab links anywhere. */
    tabs: [
        {
            label: "Web Design",
            body: "Launch a site that doesn't just look good. It sells for you 24/7.",
            icon: "/assets/img/home/offer/icon-web-design.webp",
            href: "/web-design-services",
        },
        {
            label: "UI/UX Design",
            body: "Let us craft experiences your users will love from the very first click.",
            icon: "/assets/img/home/offer/icon-ui-ux-design.webp",
            href: "/web-design-services/ui-ux-design",
        },
        {
            label: "App Development",
            body: "Turn your idea into a high-performing app that customers keep coming back to.",
            icon: "/assets/img/home/offer/icon-app-development.webp",
            href: "/app-development-services",
        },
        {
            label: "Branding",
            body: "Stand out instantly with branding that leaves a lasting impression everywhere you show up.",
            icon: "/assets/img/home/offer/icon-branding.webp",
            href: "/branding-services",
        },
        {
            // [live] retains "about the new trends, start growing with campaigns that will maximise"
            label: "Marketing",
            body: "Stop guessing about the new trends, start growing with campaigns that will maximise every marketing pound.",
            icon: "/assets/img/home/offer/icon-marketing.webp",
            href: "/digital-marketing-services",
        },
    ],
    /* The default open tab. UI/UX, not the first card: it is the state the
       approved design shows. */
    defaultTab: 1,
} as const;

/* ============================== TOOLBOX =============================== */

export const toolbox = {
    eyebrow: "Creative Toolkit",
    titleLead: "Our toolbox for",
    titleAccent: "innovation",
    /* The approved mock labels this button "Get started now". The live button
       reads "Get started" and that is what ships — a mock rewrite of existing
       copy is not taken (docs/CONTENT-PARITY.md), same call as the five
       `whatYouGet` tab bodies above. */
    cta: "Get Started",
    /* Three presentational fields per tool, none of them copy:
       — `w`/`h` are the artwork's own pixel size. They differ per mark because
         these are the brand assets as exported, not a normalised set, and
         next/image needs the true intrinsic box or it reports the wrong aspect
         ratio (AGENTS.md rule 5). The card fits each one into a square.
       — `plated` says the artwork already carries its own background: the six
         Adobe marks, Swift, MVVM, TypeScript and CSS are all a coloured tile
         with a glyph on it, while Figma, Framer, React, Vue, HTML5 and
         Alamofire are bare glyphs on transparency. The card seats the bare ones
         on a tinted plate and lets the plated ones fill the box, which is what
         the mock does.
       — `accent` was sampled from the artwork itself (most common saturated
         colour, opaque pixels only) rather than guessed, and drives nothing but
         the card's hairline, glow and plate tint. Photoshop and Lightroom share
         one blue and InDesign and InCopy one pink because Adobe genuinely uses
         the same value for each pair. */
    // "Alomofire" on the live site is a misspelling of the Alamofire library. It is
    // a tool name in a decorative grid, not indexed copy, so it is corrected here.
    tools: [
        {
            name: "Figma",
            kind: "Design Tool",
            icon: "/assets/img/tools/figma.png",
            w: 36,
            h: 54,
            plated: false,
            accent: "#f24e1e",
        },
        {
            name: "InDesign",
            kind: "Design Tool",
            icon: "/assets/img/tools/indesign.png",
            w: 58,
            h: 56,
            plated: true,
            accent: "#ff3366",
        },
        {
            name: "Swift",
            kind: "Web Tool",
            icon: "/assets/img/tools/swift.png",
            w: 56,
            h: 56,
            plated: true,
            accent: "#f05138",
        },
        {
            name: "Alamofire",
            kind: "Mobile App Tool",
            icon: "/assets/img/tools/alamofire.png",
            w: 40,
            h: 53,
            plated: false,
            accent: "#dc4424",
        },
        {
            name: "Framer",
            kind: "Design Tool",
            icon: "/assets/img/tools/framer.png",
            w: 40,
            h: 60,
            plated: false,
            accent: "#0055ff",
        },
        {
            name: "Photoshop",
            kind: "Design Tool",
            icon: "/assets/img/tools/photoshop.png",
            w: 58,
            h: 56,
            plated: true,
            accent: "#31a8ff",
        },
        {
            name: "MVVM",
            kind: "Mobile App Tool",
            icon: "/assets/img/tools/mvvm.png",
            w: 56,
            h: 56,
            plated: true,
            accent: "#ec2c6c",
        },
        {
            name: "React",
            kind: "Web Tool",
            icon: "/assets/img/tools/react.png",
            w: 61,
            h: 54,
            plated: false,
            accent: "#61dafb",
        },
        {
            name: "Illustrator",
            kind: "Design Tool",
            icon: "/assets/img/tools/illustrator.png",
            w: 58,
            h: 56,
            plated: true,
            accent: "#ff9a00",
        },
        {
            name: "Lightroom",
            kind: "Design Tool",
            icon: "/assets/img/tools/lightroom.png",
            w: 58,
            h: 56,
            plated: true,
            accent: "#31a8ff",
        },
        {
            name: "Vue",
            kind: "Web Tool",
            icon: "/assets/img/tools/vue.png",
            w: 56,
            h: 49,
            plated: false,
            accent: "#4fc08d",
        },
        {
            name: "HTML5",
            kind: "Web Tool",
            icon: "/assets/img/tools/html5.png",
            w: 49,
            h: 56,
            plated: false,
            accent: "#e34f26",
        },
        {
            name: "Adobe XD",
            kind: "Design Tool",
            icon: "/assets/img/tools/adobe-xd.png",
            w: 58,
            h: 56,
            plated: true,
            accent: "#ff61f6",
        },
        {
            name: "InCopy",
            kind: "Design Tool",
            icon: "/assets/img/tools/incopy.png",
            w: 59,
            h: 56,
            plated: true,
            accent: "#ff3366",
        },
        {
            name: "TypeScript",
            kind: "Web Tool",
            icon: "/assets/img/tools/typescript.png",
            w: 56,
            h: 56,
            plated: true,
            accent: "#3178c6",
        },
        {
            name: "CSS",
            kind: "Web Tool",
            icon: "/assets/img/tools/css.png",
            w: 56,
            h: 56,
            plated: true,
            accent: "#663399",
        },
    ],
} as const;

/* =========================== CLIENT LOGOS ============================= */

/* The list itself now lives in `content/clients.ts` — the About Us logo wall
   renders the same seven brands, and the two must not drift apart. Seven, not
   the live site's five: logo6 and logo7 ship in the Laravel assets but were
   never rendered there, and five left the marquee track narrower than the
   viewport, so every cycle dragged a stretch of blank white across the band. */

/* ============================== RESULTS =============================== */

export const results = {
    eyebrow: "The numbers",
    titleLead: "Our average success rate when",
    /* Sentence case, as it ranks. The approved mock title-cases the whole
       heading ("Our Average Success Rate When Working With Clients"); heading
       text is exactly what docs/CONTENT-PARITY.md says must not move, so the
       casing stays — same call as `whatYouGet.titleAccent` above. */
    titleAccent: "working with clients",
    lead: "We measure what matters. Here’s what partnering with us typically moves.",
    /* The band's backdrop: a 1920x1006 field with the 3D bar chart, its icon
       rail and the particle waves already drawn into its right half, so none
       of them is a DOM element.

       It replaces the old photo-plus-scrim AND the conic-ring meter that used
       to fill this section's right column. The ring's only label repeated the
       first stat's word for word — "Faster time-to-market for apps" — so
       nothing is lost by dropping it, and the 98% the artwork draws is one of
       the figures below. */
    bg: "/assets/img/home/results-bg.webp",
    /* `label` + " " + `note` is the live label verbatim in every case: the
       two-line card is the approved design's layout, not a rewrite. `icon` is
       net-new — the live list carries no marks at all.

       The fourth figure IS net-new copy, from the approved design. The first
       three are the ones docs/CONTENT-PARITY.md already records as kept from
       the redesign. */
    items: [
        {
            value: 40,
            suffix: "%",
            label: "Faster time-to-market",
            note: "for apps",
            icon: "/assets/img/home/results/icon-time-to-market.webp",
        },
        {
            value: 1200,
            suffix: "+",
            label: "Projects shipped",
            note: "across branding, web and marketing",
            icon: "/assets/img/home/results/icon-projects.webp",
        },
        {
            value: 98,
            suffix: "%",
            label: "Clients who come back",
            note: "for their next project",
            icon: "/assets/img/home/results/icon-repeat-clients.webp",
        },
        {
            value: 95,
            suffix: "%",
            label: "Client satisfaction",
            note: "rate across all projects",
            icon: "/assets/img/home/results/icon-satisfaction.webp",
        },
    ],
} as const;

/* ============================ METHODOLOGY ============================= */

export const methodology = {
    eyebrow: "How we work",
    /* Split after "methodology", not after "for": the approved design breaks the
       heading into two lines and puts the gradient on the whole second one. The
       two fields still concatenate to the live heading text — "Our methodology
       for success" — which is what docs/CONTENT-PARITY.md protects. Lower case
       stays as it ranks; the mock title-cases both lines, and that rewrite is
       not taken (same call as the `whatYouGet` tab bodies). */
    titleLead: "Our methodology",
    titleAccent: "for success",
    /* Net-new: the live section head is an eyebrow and a heading with nothing
       under it. Taken from the approved design, so nothing existing is reworded. */
    lead: "A proven process that helps us deliver exceptional results for your business.",
    cta: "Get Started",
    /* The centre of the diagram, supplied pre-cropped to a circle on
       transparency — 463x463 native. The ring around it and its four nodes are
       drawn in CSS, not part of the asset.

       `orbitIcons` is gone with the orbit it fed. It built its paths as
       `/assets/img/tools/${n}.png`, and those sixteen numbered files were
       renamed when the toolbox was rebuilt, so every one of the eight was a 404
       by the time this section was redrawn. The tool marks are still on the page
       — components/home/Toolbox.tsx is what shows them. */
    photo: "/assets/img/home/method/team.webp",
    /* Two marks per step, both client-supplied and both complete artwork:
       — `icon` is the round gradient badge, 78x78 native, ring and glyph baked in.
       — `art` is the small illustration on the far side of the card's hairline.
         Native sizes differ per step (102x77 to 102x87) because these are the
         Figma exports as they came, and next/image needs each one's true
         intrinsic box (AGENTS.md rule 5) — the card fits them to a common width.
       The four step titles and bodies are the live copy, word for word. */
    steps: [
        {
            title: "Discovery & Strategy",
            body: "We begin by understanding your goals, audience and competitive landscape.",
            icon: "/assets/img/home/method/icon-discovery.webp",
            art: "/assets/img/home/method/art-discovery.webp",
            artW: 102,
            artH: 87,
        },
        {
            title: "Concept Development",
            body: "Brainstorming, creative direction and agreed success criteria.",
            icon: "/assets/img/home/method/icon-concept.webp",
            art: "/assets/img/home/method/art-concept.webp",
            artW: 102,
            artH: 77,
        },
        {
            title: "Design & Iteration",
            body: "Wireframes, prototypes and user feedback cycles.",
            icon: "/assets/img/home/method/icon-design.webp",
            art: "/assets/img/home/method/art-design.webp",
            artW: 102,
            artH: 83,
        },
        {
            title: "Development & Execution",
            body: "Full build, QA testing and final deployment.",
            icon: "/assets/img/home/method/icon-development.webp",
            art: "/assets/img/home/method/art-development.webp",
            artW: 102,
            artH: 77,
        },
    ],
} as const;

/* ========================= VIDEO TESTIMONIALS ========================= */

/**
 * Net-new. The live homepage has no video section at all, so nothing here is
 * ported copy and docs/CONTENT-PARITY.md has nothing to protect — every string
 * is taken from the approved design.
 *
 * Two deliberate departures from the mock, both placeholder-art artefacts:
 *   — the mock's lead reads "…and marketing-and saw growth…", a hyphen doing an
 *     em dash's job. Fixed, since there is no ranking copy to preserve.
 *   — the mock's featured card names "AutoKeyFix" on the video and "WeBuild
 *     Inc." on the quote card overlaying it. One client per testimonial here;
 *     the featured headline renders as `client — project`, which is exactly the
 *     string the mock draws.
 *
 * The videos are NOT hosted. Each card opens a lightbox that mounts a Vimeo
 * iframe on click and unmounts it on close, so a visitor who never clicks pays
 * nothing — no third-party request, no cookie, no player JS.
 */
export const videoTestimonials = {
    eyebrow: "Video Testimonials",
    /* The section's accessible name. `titleLead` + `titleAccent` concatenate to
       exactly this. */
    title: "See Why Clients Trust Creative Logo Design Real Stories.",
    titleLead: "See Why Clients Trust Creative Logo Design",
    titleAccent: "Real Stories.",
    lead: "Real results. Hear directly from business owners who trusted us with their branding, web design, app development, and marketing — and saw growth that speaks for itself.",

    /* PLACEHOLDER — Vimeo's own public demo reel, the same id their embed docs
       use. One id for all five so the real client videos are a single
       find-and-replace once they land; at that point each item gets its own
       `vimeoId` and this constant goes away. */
    vimeoId: "76979871",

    /* UI chrome, not ported copy — the accessible name of a card's play control
       and of the lightbox's close button. */
    playPrefix: "Play video testimonial from",
    close: "Close video",

    /* items[0] renders as the featured panel: the large still, the overlaid
       quote card, and the result strapline along the foot. items[1..4] render
       as the compact cards in the right-hand column. `avatar` and the two
       `result*` fields exist on the featured item alone — the tuple is
       `as const`, so items[0] keeps its own precise type and the other four
       stay a clean union. */
    items: [
        {
            client: "AutoKeyFix",
            project: "Website Redesign & SEO",
            quote: "They delivered a beautiful website and a seamless user experience. The attention to detail and communication were top-notch. They delivered a beautiful website and a seamless user experience.",
            stars: 5,
            thumb: "/assets/img/home/video/thumb-1.webp",
            duration: "02:55",
            durationSpoken: "2 minutes 55 seconds",
            avatar: "/assets/img/home/video/avatar-webuild.webp",
            resultValue: "156%",
            resultText: "increase in organic traffic & 3x more enquiries",
        },
        {
            client: "WeBuild Inc.",
            project: "Web Design Project",
            quote: "They delivered a beautiful website and a seamless user experience.",
            stars: 5,
            thumb: "/assets/img/home/video/thumb-1.webp",
            duration: "02:55",
            durationSpoken: "2 minutes 55 seconds",
        },
        {
            client: "WeBuild Inc.",
            project: "Web Design Project",
            quote: "They delivered a beautiful website and a seamless user experience.",
            stars: 5,
            thumb: "/assets/img/home/video/thumb-1.webp",
            duration: "02:55",
            durationSpoken: "2 minutes 55 seconds",
        },
        {
            client: "WeBuild Inc.",
            project: "Web Design Project",
            quote: "They delivered a beautiful website and a seamless user experience.",
            stars: 5,
            thumb: "/assets/img/home/video/thumb-1.webp",
            duration: "02:55",
            durationSpoken: "2 minutes 55 seconds",
        },
        {
            client: "WeBuild Inc.",
            project: "Web Design Project",
            quote: "They delivered a beautiful website and a seamless user experience.",
            stars: 5,
            thumb: "/assets/img/home/video/thumb-1.webp",
            duration: "02:55",
            durationSpoken: "2 minutes 55 seconds",
        },
    ],
    /* Full-bleed backdrop, client-supplied. 1920x1146 native. */
    bg: "/assets/img/home/video/video-bg.webp",
} as const;

/* ============================ TESTIMONIALS ============================ */

export const testimonials = {
    eyebrow: "Testimonials",
    titleLead: "Clients’ valuable",
    titleAccent: "feedback",
    mark: "/assets/img/home/quote-mark.webp",
    /* CLIENT-SUPPLIED REPLACEMENT (13 Aug 2026). The five anonymous quotes that
     were here — job title + industry, no names — were replaced wholesale with
     the ten real reviews the client sent over, verbatim including their own
     punctuation, spelling and line breaks. This is the one content change on
     this page that did not come from the live Laravel site; it is a deliberate
     instruction, not a parity drift (docs/CONTENT-PARITY.md).

     Still deliberately NOT marked up as Review/AggregateRating even though the
     reviewers are now named — see docs/SEO-PLAYBOOK.md. Self-hosted reviews of
     your own business stay ineligible for rich results, and marking them up
     risks a manual action.

     `date` is the display string; `dateISO` backs the <time datetime>. */
    items: [
        {
            stars: 5,
            name: "Conor",
            date: "Oct 23, 2025",
            dateISO: "2025-10-23",
            body: "Nick has been amazing throughout the process, very accommodating to required changes requested to logos and designs created for my company. He is also very quick to respond to any queries I’ve had. I’ve been very impressed with his ability to bring my vision to life. We plan to work further on my projects and couldn’t recommend the company enough and Nick in particular has been great.\n\nThanks Nick!",
        },
        {
            stars: 5,
            name: "master k",
            date: "Jan 13, 2026",
            dateISO: "2026-01-13",
            body: "I recently redesigned my website through Red Feather Solutions, and the experience was excellent. The website now performs significantly faster than before, and the color scheme and overall design are very well executed. Any issues or updates are handled promptly and professionally by their team. I would highly recommend Red Feather Solutions to businesses of all sizes for website or logo design services. Their pricing is also very reasonable for the quality of work delivered.",
        },
        {
            stars: 5,
            name: "Lee",
            date: "Dec 9, 2025",
            dateISO: "2025-12-09",
            body: "Dan and his team were amazing from start to finish, doing various edits and adjustments promptly and always making sure I was happy along the process.\nAlso, very polite and professional. Will definitely use again when needed.",
        },
        {
            stars: 5,
            name: "Tracy",
            date: "Jan 13, 2026",
            dateISO: "2026-01-13",
            body: "Adam was extremely helpful and guided me through the full process from designing my logo to creating a website . Always responded promptly to my messages . I was really clueless , he was very patient I’m delighted with the outcome",
        },
        {
            stars: 5,
            name: "Tafadzwa Zulu",
            date: "Sep 25, 2025",
            dateISO: "2025-09-25",
            body: "It was a great experience working with Daniel in designing the branding for my newly formed company, As I was new to the world of business, Daniel was very kind to take me through the process of Logo design and all the branding associated, patiently explaining and helped me come up with great Logo designs for my Company. Delivered in the agreed timeline, many different formats as requested. Overally, I'm greatly satisfied with the service and looking forward to working with him on my future project. Will definitely recommend.",
        },
        {
            stars: 5,
            name: "Mohammed Azam",
            date: "Sep 26, 2025",
            dateISO: "2025-09-26",
            body: "What an amazing service .I can’t praise these guys enough. Polite, patient and friendly.\nThey helped with my companies logos in a very professional manner and in a few days we have amazing logos.\nThank you so much .",
        },
        {
            stars: 5,
            name: "Hgdddt yuiiii",
            date: "Sep 23, 2025",
            dateISO: "2025-09-23",
            body: "Daniel was extremely attentive, creative -& patient and did a great job offering solutions on my new logo- I highly recommend I’m so pleased with my new logo. Thankyou Daniel !",
        },
        {
            stars: 5,
            name: "Adam",
            date: "Oct 1, 2025",
            dateISO: "2025-10-01",
            body: "Very impressed! The service was 10/10. A helpful man called Daniel surpassed my expectations with my logo I needed help with. Would definitely recommend 👍",
        },
        {
            stars: 5,
            name: "Andrew Marshall-Read",
            date: "Nov 5, 2025",
            dateISO: "2025-11-05",
            body: "Adam was extremely helpful in aiding my logo needs. I needed a redesign for my scuba travel agency, Mares Diem, and he delivered above and beyond.",
        },
        {
            stars: 5,
            name: "Will",
            date: "Sep 3, 2025",
            dateISO: "2025-09-03",
            body: "I called regarding a logo design for my company!!! Nick was very helpful and sent me examples promptly!!! Would definitely use them again!!!",
        },
    ],
} as const;

/* =========================== CHALLENGES / FAQ ========================= */

export const challenges = {
    eyebrow: "Your challenges",
    title: "Creative Logo Design Solves Your Design, Development & Marketing Challenges",
    cta: "Get Started",
    items: [
        {
            q: "Could a stronger brand identity make you the talk of the town?",
            a: "Yes. Your brand’s presence online tells people what you bring to the table — it’s more than just a logo. Our branding experts help you find gaps, improve your presence, and create messaging people remember.",
            list: [
                "Brand audits to highlight weak spots",
                "Custom logo & identity design",
                "Consistent storytelling across every channel",
            ],
            ctaLabel: "Explore Branding",
            href: "/branding-services",
        },
        {
            q: "Is your website just there, doing nothing and only wasting money?",
            a: "Your website shouldn’t be a digital brochure. It should attract visitors, keep them interested, and help you win more customers.",
            list: [
                "Free website audit to spot missed opportunities",
                "Conversion-focused redesigns",
                "Responsive layouts for every device",
            ],
            ctaLabel: "Explore Web Designing",
            href: "/web-design-services",
        },
        {
            q: "Tired of watching sales slip through your ecommerce cracks?",
            a: "If your checkout is clunky or your products aren’t shown well, you could be losing sales. We find what’s holding your store back and make the whole shopping experience smoother.",
            list: [
                "Optimised product pages & checkout flows",
                "Seamless integrations with payment systems",
                "Data-driven improvements to boost sales",
            ],
            ctaLabel: "Explore E-Com Development",
            href: "/web-development-services",
        },
        {
            // [live] "actually covers expenses for itself" — not the redesign's "actually pays for itself"
            q: "Want digital marketing that actually covers expenses for itself?",
            a: "Just posting online won’t cut it. What counts is real, measurable growth. We build campaigns that reach more people, build trust, and get results you can see.",
            list: [
                "SEO campaigns that rank and convert",
                "Targeted social media strategies",
                "Paid ads that bring high-value leads",
            ],
            ctaLabel: "Explore Digital Marketing",
            href: "/digital-marketing-services",
        },
        {
            q: "Is managing a campaign like herding cats?",
            a: "Running a business alone is challenging. Our team handles the marketing while you concentrate on the company.",
            list: [
                "Fully managed multi-channel campaigns",
                "Regular reports & performance insights",
                "Flexible support tailored to your goals",
            ],
            ctaLabel: "Explore Web Development",
            href: "/web-development-services",
        },
        {
            // [live] "When was the last time you gave your website a thorough makeover?"
            q: "When was the last time you gave your website a thorough makeover?",
            a: "Customers can tell when a site is dated — and they judge you on it. We bring modern features, fresh design and an engaging experience that revitalises your presence.",
            list: [
                "Modern redesigns to refresh your brand",
                "UX upgrades for smoother navigation",
                "Future-proof functionality",
            ],
            ctaLabel: "Explore Website Redesign",
            href: "/web-design-services/website-redesign",
        },
        {
            q: "Think SEO and responsive design are a bit of a mystery?",
            a: "SEO and mobile-friendly design are essential to your online presence. We make it simple, so your site ranks well and works beautifully on any device.",
            list: [
                "Comprehensive SEO audits",
                "On-page and technical SEO fixes",
                "Fully responsive web design",
            ],
            ctaLabel: "Explore SEO Services",
            href: "/seo-services",
        },
        {
            q: "Not sure which channels will give your business the biggest bang for buck?",
            a: "Every brand is different, so chasing trends isn’t enough. We look at your market and recommend the channels that actually help you grow.",
            list: [
                "Channel audits to pinpoint opportunities",
                "Custom strategies based on your audience",
                "Data-backed recommendations to scale smart",
            ],
            ctaLabel: "Explore Sales Automation",
            href: "/automation-services/marketing-sales-automation",
        },
    ],
} as const;

/* ========================== PROPOSAL SECTION ========================== */

export const proposal = {
    eyebrow: "RULE THE WEB!",
    titleLead: "Kickstart Your Project with a",
    titleAccent: "Free Expert Proposal",
    lead: "Tell us where you want to get to. We’ll come back with a plan, a timeline and a straight answer on what it takes.",
    bg: "/assets/img/home/proposal-bg.webp",
    benefits: [
        "A senior strategist reviews your brief personally",
        "Clear scope and timings — no vague estimates",
        "No obligation, and we reply within one working day",
    ],
} as const;
