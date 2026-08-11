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
  trust: [
    { value: 1000, suffix: "+", label: "Happy clients" },
    { value: 1200, suffix: "+", label: "Projects delivered" },
    { value: 60, suffix: "+", label: "Team members" },
  ],
  /* Trustpilot badge under the hero stats. Net-new content — nothing on the
     live homepage is being reworded (see docs/CONTENT-PARITY.md).

     TODO — `href` IS A PLACEHOLDER. It is the profile URL the live landing page
     links to; swap it for the real review URL once the profile is confirmed.

     No rating figure or review count is stated on purpose: those are claims
     about a third party and belong to Trustpilot's own widget, not to us. */
  trustpilot: {
    href: "https://uk.trustpilot.com/review/creativelogodesign.co.uk",
    label: "Read our reviews",
    linkLabel: "Read our reviews on Trustpilot",
    logo: "/assets/img/trustpilot-logo.png",
    logoAlt: "Trustpilot",
    stars: 5,
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
  playCta: "Start Your Project Today",
  badge: "Taking on new projects",
  stats: [
    { value: 1000, suffix: "+", label: "Happy Clients" },
    { value: 1200, suffix: "+", label: "Completed Projects" },
    { value: 60, suffix: "+", label: "Team Members" },
  ],
  images: {
    back: { src: "/assets/img/home/about-back.webp", alt: "Creative Logo Design team collaborating on a brand concept" },
    front: { src: "/assets/img/home/about-front.webp", alt: "Designers reviewing page layouts together" },
  },
} as const;

/* ========================= PROCESS + RECENT WORK ====================== */

export const process = {
  eyebrow: "How it works",
  titleLead: "Powerful Brand in Just a",
  titleAccent: "Few Clicks",
  lead: "Building your brand can be simple. We make the process quick and focused on results. Just tell us your goals, and we'll create a brand identity that helps your business get noticed.",
  art: "/assets/img/home/pen-tool.webp",
  steps: [
    {
      title: "Discovery & Strategy",
      body: "We learn about your goals, look at your competitors, and create a plan that fits your brand’s vision.",
      icon: "/assets/img/home/step-1.svg",
    },
    {
      // [live] "understands your idea and makes it into" — not the redesign's "takes … turns it into"
      title: "Concept Development",
      body: "Our team understands your idea and makes it into something special that connects with your audience.",
      icon: "/assets/img/home/step-2.svg",
    },
    {
      // [live] "each detail" / "Our representative" — not the redesign's "every detail" / "Your representative"
      title: "Design & Delivery",
      body: "We handle each detail. Our representative works closely with you to give the best outcome and also gives personal advice.",
      icon: "/assets/img/home/step-3.svg",
    },
  ],
} as const;

export const recentWork = {
  title: "Our Recent Work",
  items: [
    { lead: "App", trail: "Development", img: "/assets/img/work/app-development.webp", href: "/app-development-services" },
    { lead: "Blog", trail: "Design", img: "/assets/img/work/blog-design.webp", href: "/web-design-services/corporate-blog-design" },
    { lead: "Branding", trail: "Design", img: "/assets/img/work/branding-design.webp", href: "/branding-services" },
    { lead: "Web", trail: "Design", img: "/assets/img/work/seo-aeo.webp", href: "/web-design-services" },
    { lead: "Social", trail: "Media", img: "/assets/img/work/social-media.webp", href: "/digital-marketing-services/social-media-marketing" },
    { lead: "UI UX", trail: "Design", img: "/assets/img/work/ui-ux-design.webp", href: "/web-design-services/ui-ux-design" },
  ],
} as const;

/* ============================ WHAT YOU GET ============================ */

export const whatYouGet = {
  eyebrow: "What you get",
  titleLead: "What do You Get with",
  titleAccent: "creative logo design",
  titleTrail: "?",
  lead: "Complete solution at one place, including Design, Development, Branding, and Growth. You don't have to go anywhere else.",
  frame: "/assets/img/home/monitor.webp",
  tabs: [
    {
      label: "UI/UX Design",
      body: "Let us craft experiences your users will love from the very first click.",
      shot: "/assets/img/screens/ui-ux-design.webp",
      href: "/web-design-services/ui-ux-design",
    },
    {
      label: "Web Design",
      body: "Launch a site that doesn't just look good. It sells for you 24/7.",
      shot: "/assets/img/screens/web-design.webp",
      href: "/web-design-services",
    },
    {
      label: "App Development",
      body: "Turn your idea into a high-performing app that customers keep coming back to.",
      shot: "/assets/img/screens/app-development.webp",
      href: "/app-development-services",
    },
    {
      label: "Branding",
      body: "Stand out instantly with branding that leaves a lasting impression everywhere you show up.",
      shot: "/assets/img/screens/branding.webp",
      href: "/branding-services",
    },
    {
      // [live] retains "about the new trends, start growing with campaigns that will maximise"
      label: "Marketing",
      body: "Stop guessing about the new trends, start growing with campaigns that will maximise every marketing pound.",
      shot: "/assets/img/screens/marketing.webp",
      href: "/digital-marketing-services",
    },
  ],
} as const;

/* ============================== TOOLBOX =============================== */

export const toolbox = {
  eyebrow: "Creative Toolkit",
  titleLead: "Our toolbox for",
  titleAccent: "innovation",
  cta: "Get Started",
  // "Alomofire" on the live site is a misspelling of the Alamofire library. It is
  // a tool name in a decorative grid, not indexed copy, so it is corrected here.
  tools: [
    { name: "Figma", kind: "Design Tool", icon: "/assets/img/tools/1.png" },
    { name: "InDesign", kind: "Design Tool", icon: "/assets/img/tools/2.png" },
    { name: "Swift", kind: "Web Tool", icon: "/assets/img/tools/3.png" },
    { name: "Alamofire", kind: "Mobile App Tool", icon: "/assets/img/tools/4.png" },
    { name: "Framer", kind: "Design Tool", icon: "/assets/img/tools/5.png" },
    { name: "Photoshop", kind: "Design Tool", icon: "/assets/img/tools/6.png" },
    { name: "MVVM", kind: "Mobile App Tool", icon: "/assets/img/tools/7.png" },
    { name: "React", kind: "Web Tool", icon: "/assets/img/tools/8.png" },
    { name: "Illustrator", kind: "Design Tool", icon: "/assets/img/tools/9.png" },
    { name: "Lightroom", kind: "Design Tool", icon: "/assets/img/tools/10.png" },
    { name: "Vue", kind: "Web Tool", icon: "/assets/img/tools/11.png" },
    { name: "HTML5", kind: "Web Tool", icon: "/assets/img/tools/12.png" },
    { name: "Adobe XD", kind: "Design Tool", icon: "/assets/img/tools/13.png" },
    { name: "InCopy", kind: "Design Tool", icon: "/assets/img/tools/14.png" },
    { name: "TypeScript", kind: "Web Tool", icon: "/assets/img/tools/15.png" },
    { name: "CSS", kind: "Web Tool", icon: "/assets/img/tools/16.png" },
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
  titleAccent: "working with clients",
  lead: "We measure what matters. Here’s what partnering with us typically moves.",
  bg: "/assets/img/home/results-bg.webp",
  items: [
    { value: 40, suffix: "%", label: "Faster time-to-market for apps" },
    { value: 1200, suffix: "+", label: "Projects shipped across branding, web and marketing" },
    { value: 98, suffix: "%", label: "Clients who come back for their next project" },
  ],
  meter: { value: 40, suffix: "%", label: "Faster time-to-market for apps" },
} as const;

/* ============================ METHODOLOGY ============================= */

export const methodology = {
  eyebrow: "How we work",
  titleLead: "Our methodology for",
  titleAccent: "success",
  cta: "Get Started",
  orbitIcons: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/assets/img/tools/${n}.png`),
  steps: [
    {
      title: "Discovery & Strategy",
      body: "We begin by understanding your goals, audience and competitive landscape.",
      img: "/assets/img/home/method-discovery.webp",
    },
    {
      title: "Concept Development",
      body: "Brainstorming, creative direction and agreed success criteria.",
      img: "/assets/img/home/method-concept.webp",
    },
    {
      title: "Design & Iteration",
      body: "Wireframes, prototypes and user feedback cycles.",
      img: "/assets/img/home/method-design.webp",
    },
    {
      title: "Development & Execution",
      body: "Full build, QA testing and final deployment.",
      img: "/assets/img/home/method-development.webp",
    },
  ],
} as const;

/* ============================ TESTIMONIALS ============================ */

export const testimonials = {
  eyebrow: "Testimonials",
  titleLead: "Clients’ valuable",
  titleAccent: "feedback",
  mark: "/assets/img/home/quote-mark.webp",
  // Deliberately NOT marked up as Review/AggregateRating — see docs/SEO-PLAYBOOK.md.
  items: [
    {
      stars: 5,
      quote:
        "I'm well chuffed with the results! The team nailed our brand identity and made the whole process feel effortless.",
      body: "They handled everything from start to finish. Proper professionals who saved us loads of faff, always on the ball, and bang on with deadlines. Couldn't have asked for better.",
      role: "Director of Ecommerce",
      org: "The Fragrance Group",
    },
    {
      stars: 5,
      quote:
        "These folks really know their onions when it comes to design and marketing. Felt like they understood our business straight off the bat.",
      body: "From strategy chats to final delivery, they kept it simple, stress-free, and delivered top-notch work. Cracking bunch who actually listen and graft to get it right every time.",
      role: "VP Marketing",
      org: "DTC Apparel Brand",
    },
    {
      stars: 4,
      quote:
        "Our new website is brilliant — slick, easy to use, and exactly what we needed. Customers have already noticed the difference.",
      body: "Conversions have gone up, engagement's through the roof, and the site runs like a dream. They sorted the tricky bits without us getting worried. Absolute game-changers.",
      role: "Product Manager",
      org: "Fintech SaaS",
    },
    {
      stars: 5,
      quote:
        "Can't fault the service — friendly, sharp, and creative as anything. They made the whole branding job feel like a doddle.",
      body: "The team's attention to detail was spot on. Every tweak was handled with care, and they worked hard to get us the look we wanted.",
      role: "Growth Lead",
      org: "Healthcare Marketplace",
    },
    {
      stars: 5,
      quote:
        "They're a proper solid team, no messing about. Everything from the first call to the finished product was smooth sailing.",
      body: "They went above and beyond, making sure the designs hit the mark perfectly. Straight-talking, reliable, and genuinely passionate about what they do. We'll be sticking with them.",
      role: "Creative Director",
      org: "Hospitality Group",
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
