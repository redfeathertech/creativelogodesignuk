/**
 * Contact Us page copy.
 *
 * CONTENT-PARITY NOTE — read `docs/CONTENT-PARITY.md` first.
 *
 * There is no live wording to preserve on this page beyond the `<title>`. The
 * live `/contact-us` is the stock CMS template (`contact-us_old.blade.php`): its
 * heading is the page title echoed into an `<h4>`, its form is a three-field
 * name/email/message block, and `FrontendController::contactUs` never sets a
 * meta description, so the live page ships `<meta name="description" content=" ">`.
 * Nothing on it ranks on its own words — every string below is net-new and no
 * live wording is being dropped. The one string that IS load-bearing is the
 * title: the live `<title>` is "Contact Us | Creative Logo Design", which
 * `contactMeta.title` plus the root layout's template reproduces exactly.
 *
 * Source of the copy: the approved clduk redesign,
 * `clduk/resources/views/frontend/themes/theme-one/contact-us.blade.php`,
 * carried over verbatim.
 *
 * Note the sentence case here. The homepage's proposal band (`content/home.ts`)
 * says "RULE THE WEB!" / "Kickstart Your Project with a Free Expert Proposal" /
 * "No obligation, and we reply within one working day"; the contact page's
 * version of the same band is sentence case and drops the "No obligation"
 * clause. They read as two different sections because in the redesign they are
 * two different sections — do not collapse them onto one shared record.
 */

export const contactMeta = {
    /* "Contact Us" is the live <title>; the root layout appends the brand. */
    title: "Contact Us",
    description:
        "Talk to Creative Logo Design about your website, app, branding, SEO or digital marketing project. Call 0204-511-2054, email us, or send a brief and get a free expert proposal within one working day.",
} as const;

/* =============================== HERO ================================= */

export const contactHero = {
    eyebrow: "Get in touch",
    titleLead: "Let’s create",
    titleAccent: "digital magic",
    titleTrail: " together",
    lead: "Creative Logo Design is your go-to for a stunning website, a mobile-friendly app, powerful digital marketing campaigns, SEO that ranks, or immersive 3D product configurators. Ready to boost leads and growth? Let’s build something extraordinary.",
    /* The primary CTA prints `contact.phoneDisplay` from `content/site.ts`, so
       the number is not spelled out a second time here. */
    secondaryCta: "Email us",
    image: {
        src: "/assets/img/contact/hero.webp",
        alt: "Illustration of a support agent wearing a headset, surrounded by web, social media and advertising icons",
    },
} as const;

/* ============================ ENQUIRY FORM ============================ */

export const enquiry = {
    eyebrow: "Rule the web",
    titleLead: "Kickstart your project with a",
    titleAccent: "free expert proposal",
    lead: "Tell us where you want to get to. We’ll come back with a plan, a timeline and a straight answer on what it takes.",
    points: [
        "A senior strategist reviews your brief personally",
        "Clear scope and timings — no vague estimates",
        "We reply within one working day",
    ],
    /* Replaces the form with a confirmation. The homepage's wording ("we’ve got
       your brief") reads oddly for someone who came here to ask a question. */
    successTitle: "Thanks — message received",
    /* Labels the team's notification email. Must match a key in
       `PROPOSAL_SOURCES` in `app/actions/forms.ts` or it is ignored. */
    source: "Contact page",
} as const;

/* ============================= LOCATIONS ============================== */

export const contactLocations = {
    eyebrow: "Our locations",
    titleLead: "Work with us",
    titleAccent: "wherever you are",
    lead: "Our team serves clients across the UK and worldwide, offering local insight with global reach.",
    /* The office details themselves live in `content/site.ts`, which is also
       what the footer and the Organization JSON-LD read. */
    cta: "Get directions",
} as const;
