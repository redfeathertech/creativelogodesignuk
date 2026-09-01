"use server";

import { headers } from "next/headers";
import {
    callbackSchema,
    landingQuoteSchema,
    enquirySchema,
    leadSchema,
    logoBriefSchema,
    proposalSchema,
    seoEnquirySchema,
    websiteBriefSchema,
    type FormState,
} from "@/lib/validation";
import { checkAntiSpam } from "@/lib/antispam";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
    sendAdminNotification,
    sendUserConfirmation,
    type MailField,
} from "@/lib/mail";
import {
    hero as cldHero,
    packageGroups,
} from "@/content/landing/creative-logo-design";
import { packageGroups as ldoPackageGroups } from "@/content/landing/logo-design-offer";
import {
    combo as lpCombo,
    hero as lpHero,
    packageGroups as lpPackageGroups,
    topBar as lpTopBar,
} from "@/content/landing/lp";
import {
    pricing as seoPricing,
    quoteDialog as seoQuoteDialog,
} from "@/content/landing/seo-services";
import {
    CHECKBOX_OPTIONS,
    sections as websiteBriefSections,
} from "@/content/landing/website-brief";
import { sections as logoBriefSections } from "@/content/landing/logo-brief";

/**
 * Form submission handlers.
 *
 * Order matters: anti-spam and captcha are checked before validation so bot
 * traffic never reaches the mail layer, and the generic rejection message
 * gives a bot no signal about which check tripped.
 */

const GENERIC_ERROR =
    "Something went wrong. Please try again, or email us directly.";
const SUCCESS =
    "Thanks — we've got your details and will be in touch within one working day.";

/**
 * `sendUserConfirmation` greets by first name; the enquiry card, both landing
 * quote forms and the two briefs all ask for one name field instead of two.
 */
const firstNameOf = (fullName: string) => fullName.trim().split(/\s+/)[0] ?? "";

async function submissionMeta(formName: string): Promise<MailField[]> {
    const h = await headers(); // async in Next 16
    return [
        { label: "Form", value: formName },
        { label: "Submitted", value: new Date().toISOString() },
        { label: "Referer", value: h.get("referer") ?? "" },
        { label: "User agent", value: h.get("user-agent") ?? "" },
    ];
}

/**
 * @param action the reCAPTCHA v3 action this form's token is minted under, and
 *               which siteverify must echo back. It is passed in from each
 *               server action rather than read out of `formData` on purpose:
 *               a visitor-supplied action would verify against itself and the
 *               check would confirm nothing. It must match the `action` prop on
 *               the matching `<Recaptcha>`.
 */
async function guard(
    formData: FormData,
    action: string,
): Promise<FormState | null> {
    const spam = checkAntiSpam(formData);
    if (!spam.ok) {
        // The value, not just the fact. This check has already been tripped
        // once by browser autofill rather than by a bot, and the value is the
        // only thing that tells the two apart: a trap echoing what the visitor
        // typed into a real field means the honeypot is misclassified again,
        // not that a bot got through.
        console.warn(
            `[forms] rejected by honeypot — field contained ${JSON.stringify(spam.value)}`,
        );
        // Bots are told nothing useful.
        return { status: "error", message: GENERIC_ERROR };
    }

    const captchaOk = await verifyRecaptcha(
        (formData.get("g-recaptcha-response") as string | null) ?? null,
        action,
    );
    if (!captchaOk) {
        // v3 has nothing to "complete" — a rejection is a low score, an expired
        // token, or a script that never loaded. Ask for the one thing that
        // actually clears all three.
        return {
            status: "error",
            message:
                "We couldn't verify that submission. Please reload the page and try again.",
        };
    }

    return null;
}

/** Offcanvas "Ready to grow revenue?" panel. */
export async function submitLead(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "lead");
    if (blocked) return blocked;

    const parsed = leadSchema.safeParse({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        source: formData.get("source"),
        help: formData.getAll("help").map(String),
        project_details: formData.get("project_details"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<
                string,
                string[]
            >,
        };
    }

    const d = parsed.data;
    const fields: MailField[] = [
        { label: "Name", value: `${d.first_name} ${d.last_name}` },
        { label: "Email", value: d.email },
        { label: "Phone", value: d.phone },
        { label: "Company", value: d.company },
        { label: "Heard about us via", value: d.source },
        { label: "Wants help with", value: d.help.join(", ") },
        { label: "Project details", value: d.project_details ?? "" },
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: "New lead enquiry",
                fields,
                meta: await submissionMeta("Lead panel"),
                replyTo: d.email,
            }),
            sendUserConfirmation({ to: d.email, firstName: d.first_name }),
        ]);
    } catch (error) {
        console.error("[forms] lead delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}

/**
 * Where a proposal submission came from, for the team's notification email.
 *
 * `form_source` arrives as a hidden input, so it is visitor-editable, and it
 * ends up in an email subject line and an `<h1>`. It is therefore looked up in
 * this table rather than used as text — anything unrecognised falls back to the
 * homepage wording, so no visitor-supplied string can reach the mail layer.
 *
 * A `Map`, not an object literal: an object inherits from `Object.prototype`,
 * so `sources["constructor"]` returns a function rather than `undefined`, which
 * survives the `??` fallback and puts `undefined` in the subject line. A `Map`
 * has no inherited keys.
 */
const PROPOSAL_SOURCES = new Map<string, { formName: string; meta: string }>([
    [
        "Contact page",
        { formName: "New contact enquiry", meta: "Contact page form" },
    ],
    ["hero", { formName: "New proposal request", meta: "Homepage hero form" }],
]);
const DEFAULT_PROPOSAL_SOURCE = {
    formName: "New proposal request",
    meta: "Proposal form",
};

/** The shared "Free expert proposal" form — homepage band and contact page. */
export async function submitProposal(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "proposal");
    if (blocked) return blocked;

    const origin =
        PROPOSAL_SOURCES.get(String(formData.get("form_source") ?? "")) ??
        DEFAULT_PROPOSAL_SOURCE;

    const parsed = proposalSchema.safeParse({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        job_title: formData.get("job_title"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        business_goals: formData.get("business_goals"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<
                string,
                string[]
            >,
        };
    }

    const d = parsed.data;
    const fields: MailField[] = [
        { label: "Name", value: `${d.first_name} ${d.last_name}` },
        { label: "Job title", value: d.job_title ?? "" },
        { label: "Company", value: d.company ?? "" },
        { label: "Email", value: d.email },
        { label: "Phone", value: d.phone },
        { label: "Business goals", value: d.business_goals ?? "" },
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: origin.formName,
                fields,
                meta: await submissionMeta(origin.meta),
                replyTo: d.email,
            }),
            sendUserConfirmation({ to: d.email, firstName: d.first_name }),
        ]);
    } catch (error) {
        console.error("[forms] proposal delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}

/**
 * Which copy of the homepage enquiry card the submission came from.
 *
 * Same arrangement, and the same reasoning, as `PROPOSAL_SOURCES` above: the
 * value arrives in a hidden input, so it is visitor-editable, and it ends up in
 * an email subject line and an `<h1>`. It is therefore looked up here rather
 * than echoed, and a `Map` is used so `"constructor"` cannot survive the `??`.
 *
 * One reCAPTCHA action covers both cards. Deriving the action from this key
 * would make a security parameter a function of visitor input — the check
 * would still fail closed, but the value a token is verified against should
 * not be something the visitor picks.
 */
const ENQUIRY_SOURCES = new Map<string, { formName: string; meta: string }>([
    ["hero", { formName: "New homepage enquiry", meta: "Homepage hero form" }],
    [
        "home-proposal",
        { formName: "New proposal request", meta: "Homepage proposal form" },
    ],
    /* `components/home/Proposal` is the closing band of `/about-us` too — the
       approved design shares it, the same way the Blade template `@include`s
       one partial on both pages. It takes its source as a required prop so the
       two cannot be told apart only by which page happened to render first. */
    [
        "about-proposal",
        { formName: "New proposal request", meta: "About Us proposal form" },
    ],
    /* And the closing band of the SEO pillar, `/seo-services`. */
    [
        "seo-proposal",
        { formName: "New proposal request", meta: "SEO Services proposal form" },
    ],
]);
const DEFAULT_ENQUIRY_SOURCE = {
    formName: "New proposal request",
    meta: "Enquiry form",
};

/**
 * The homepage enquiry card — the short form in the hero, and the same card in
 * the proposal band above the footer.
 */
export async function submitEnquiry(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "enquiry");
    if (blocked) return blocked;

    const origin =
        ENQUIRY_SOURCES.get(String(formData.get("form_source") ?? "")) ??
        DEFAULT_ENQUIRY_SOURCE;

    const parsed = enquirySchema.safeParse({
        full_name: formData.get("full_name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        required_service: formData.get("required_service"),
        project_goals: formData.get("project_goals"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<
                string,
                string[]
            >,
        };
    }

    const d = parsed.data;
    const fields: MailField[] = [
        { label: "Name", value: d.full_name },
        { label: "Phone", value: d.phone },
        { label: "Email", value: d.email },
        { label: "Required service", value: d.required_service ?? "" },
        { label: "Project & business goals", value: d.project_goals ?? "" },
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: origin.formName,
                fields,
                meta: await submissionMeta(origin.meta),
                replyTo: d.email,
            }),
            sendUserConfirmation({
                to: d.email,
                firstName: firstNameOf(d.full_name),
            }),
        ]);
    } catch (error) {
        console.error("[forms] enquiry delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}

/* ------------------------------------------- /creative-logo-design landing -- */

/**
 * Which package the visitor clicked "START PROJECT" on.
 *
 * Same reasoning as `PROPOSAL_SOURCES` above, and the same shape of bug it
 * guards against: the value rides in a hidden input, so it is visitor-editable,
 * and it ends up in an email subject line. It is therefore *matched* against
 * the packages the page actually offers rather than echoed. A `Set` has no
 * inherited keys, so `"constructor"` cannot slip through the way it would with
 * an object literal.
 *
 * Built from the content module rather than retyped, so adding a package can
 * never leave its name unrecognised here.
 */
const LANDING_PACKAGES: ReadonlySet<string> = new Set<string>([
    cldHero.offer.packageName,
    ...packageGroups.flatMap((group) => group.items.map((item) => item.name)),
    ...ldoPackageGroups.flatMap((group) =>
        group.items.map((item) => item.name),
    ),
    ...lpPackageGroups.flatMap((group) => group.items.map((item) => item.name)),
    /* /lp has three CTAs that label the enquiry with something that is not one of
     its eighteen package names: the top bar's "Get Free Consultancy", the hero's
     "Get Started" (which the live page attributes to the starter package) and
     the combo band's "Order Now". All three are page constants, not free text. */
    lpTopBar.offerCtaTitle,
    lpHero.ctaStartPackage,
    `${lpCombo.title} - ${lpCombo.price}`,
]);

/**
 * Which landing page the enquiry came from.
 *
 * All three landing pages post here, and the "Form" line in the notification
 * email is the only thing that tells them apart. That value therefore cannot be
 * the raw hidden input — same reasoning as `PROPOSAL_SOURCES` and
 * `LANDING_PACKAGES`: it is visitor-editable and it lands in an email.
 *
 * `subject` rides along because "New logo design enquiry" is wrong for `/lp`,
 * which sells web design. It is looked up here rather than branched on at the
 * call site, so a new landing page cannot forget to set it.
 */
interface LandingSource {
    meta: string;
    subject: string;
}

const LANDING_SOURCES: ReadonlyMap<string, LandingSource> = new Map([
    [
        "creative-logo-design",
        {
            meta: "Creative Logo Design landing page",
            subject: "New logo design enquiry",
        },
    ],
    [
        "logo-design-offer",
        {
            meta: "Logo Design Offer landing page",
            subject: "New logo design enquiry",
        },
    ],
    [
        "logo-design-offer-callback",
        {
            meta: "Logo Design Offer landing page — callback",
            subject: "New logo design enquiry",
        },
    ],
    [
        "lp",
        {
            meta: "Web Design Offer landing page (/lp)",
            subject: "New web design enquiry",
        },
    ],
    [
        "lp-contact",
        {
            meta: "Web Design Offer landing page (/lp) — contact band",
            subject: "New web design enquiry",
        },
    ],
]);

const DEFAULT_LANDING_SOURCE: LandingSource = {
    meta: "Creative Logo Design landing page",
    subject: "New logo design enquiry",
};

/** The landing page's hero card and its package dialog — both post here. */
export async function submitLandingQuote(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "landing_quote");
    if (blocked) return blocked;

    const requested = String(formData.get("package") ?? "");
    const packageName = LANDING_PACKAGES.has(requested) ? requested : "";

    const source =
        LANDING_SOURCES.get(String(formData.get("form_source") ?? "")) ??
        DEFAULT_LANDING_SOURCE;

    const parsed = landingQuoteSchema.safeParse({
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<
                string,
                string[]
            >,
        };
    }

    const d = parsed.data;
    const fields: MailField[] = [
        { label: "Name", value: d.full_name },
        { label: "Email", value: d.email },
        { label: "Phone", value: d.phone },
        { label: "Package", value: packageName },
        { label: "Message", value: d.message ?? "" },
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: packageName
                    ? `${source.subject} — ${packageName}`
                    : source.subject,
                fields,
                meta: await submissionMeta(source.meta),
                replyTo: d.email,
            }),
            sendUserConfirmation({
                to: d.email,
                firstName: firstNameOf(d.full_name),
            }),
        ]);
    } catch (error) {
        console.error("[forms] landing quote delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}

/**
 * The landing page's footer "Request a Callback" form.
 *
 * No email address is collected, so unlike every other form on the site this
 * one sends a single email — there is nowhere to send a confirmation, and
 * `sendAdminNotification` needs a `replyTo` it can dial rather than reply to.
 */
export async function submitCallback(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "callback");
    if (blocked) return blocked;

    const parsed = callbackSchema.safeParse({
        full_name: formData.get("full_name"),
        phone: formData.get("phone"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<
                string,
                string[]
            >,
        };
    }

    const d = parsed.data;

    try {
        await sendAdminNotification({
            formName: "New callback request",
            fields: [
                { label: "Name", value: d.full_name },
                { label: "Phone", value: d.phone },
            ],
            meta: await submissionMeta(
                "Creative Logo Design landing page — callback",
            ),
        });
    } catch (error) {
        console.error("[forms] callback delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return {
        status: "success",
        message:
            "Thanks — we’ve got your number and will call you back shortly.",
    };
}

/* ------------------------------------------------------- /seo-services -- */

/**
 * Which plan the visitor clicked.
 *
 * Same guard, and the same reasoning, as `LANDING_PACKAGES`: the value rides in
 * a hidden input, so it is visitor-editable, and it ends up in an email subject
 * line. Matched against a `Set` built from the content module rather than
 * echoed, so renaming a tier can never leave its name unrecognised here.
 */
const SEO_PLANS: ReadonlySet<string> = new Set<string>([
    seoQuoteDialog.defaultPackage,
    seoQuoteDialog.reportPackage,
    ...seoPricing.tiers.map((tier) => tier.name),
]);

/**
 * `/seo-services` — the hero form and the dialog behind every CTA.
 *
 * Six fields rather than four, matching the live form's own field set. It is
 * the only form on the site that collects a visitor-supplied `subject`, which
 * is why that value goes in the mail *body* and never near the subject line —
 * `formName` is composed here from a constant and a `Set` lookup.
 */
export async function submitSeoEnquiry(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "seo_enquiry");
    if (blocked) return blocked;

    const requested = String(formData.get("package") ?? "");
    const plan = SEO_PLANS.has(requested) ? requested : "";

    const parsed = seoEnquirySchema.safeParse({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        phone: formData.get("phone"),
        message: formData.get("message"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<
                string,
                string[]
            >,
        };
    }

    const d = parsed.data;
    const fields: MailField[] = [
        { label: "Name", value: `${d.first_name} ${d.last_name}` },
        { label: "Email", value: d.email },
        { label: "Phone", value: d.phone },
        { label: "Subject", value: d.subject },
        { label: "Plan", value: plan },
        { label: "Message", value: d.message },
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: plan
                    ? `New SEO enquiry — ${plan}`
                    : "New SEO enquiry",
                fields,
                meta: await submissionMeta("SEO Services landing page"),
                replyTo: d.email,
            }),
            sendUserConfirmation({ to: d.email, firstName: d.first_name }),
        ]);
    } catch (error) {
        console.error("[forms] SEO enquiry delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}

/* --------------------------------------- /website-brief and /logo-brief -- */

/**
 * Keep only the checkbox values the page actually offers.
 *
 * Same guard and the same reasoning as `LANDING_PACKAGES` above: these arrive
 * from visitor-editable checkboxes and land in an email, so they are matched
 * against a `Set` built from the content module rather than echoed. A `Set`,
 * not an object literal — `"constructor"` would otherwise survive the test.
 * Unrecognised values are dropped silently; there is nothing useful to tell a
 * caller who is hand-crafting a POST.
 */
function allowedChoices(formData: FormData, field: string): string[] {
    const allowed = CHECKBOX_OPTIONS.get(field);
    if (!allowed) return [];
    return formData
        .getAll(field)
        .map(String)
        .filter((value) => allowed.has(value));
}

/**
 * Build the notification body in the page's own section order.
 *
 * Driven by the content module rather than a second hand-written list, so a
 * field cannot be added to a page and quietly go missing from the email. The
 * mail layer already drops empty values, so optional fields cost nothing.
 */
function briefFields(
    sections: readonly { fields: readonly { name: string; label: string }[] }[],
    values: Record<string, unknown>,
): MailField[] {
    return sections
        .flatMap((section) => section.fields)
        .map((field) => {
            const key = field.name.replace("[]", "");
            const value = values[key];
            return {
                label: field.label.replace(/\s*\*$/, ""),
                value: Array.isArray(value) ? value.join(", ") : String(value ?? ""),
            };
        });
}

/** `/website-brief` — the long website discovery form. */
export async function submitWebsiteBrief(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "website_brief");
    if (blocked) return blocked;

    const parsed = websiteBriefSchema.safeParse({
        client_name: formData.get("client_name"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        business_overview: formData.get("business_overview"),
        products_services: formData.get("products_services"),
        business_difference: formData.get("business_difference"),
        business_age: formData.get("business_age"),
        ideal_customers: formData.get("ideal_customers"),
        locations_served: formData.get("locations_served"),
        target_industries: formData.get("target_industries"),
        website_goals: allowedChoices(formData, "website_goals[]"),
        main_services_products: formData.get("main_services_products"),
        competitor_1: formData.get("competitor_1"),
        competitor_2: formData.get("competitor_2"),
        competitor_3: formData.get("competitor_3"),
        competitor_4: formData.get("competitor_4"),
        website_features: allowedChoices(formData, "website_features[]"),
        pages_required: allowedChoices(formData, "pages_required[]"),
        additional_notes: formData.get("additional_notes"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const d = parsed.data;
    /* `sendAdminNotification` builds its subject from the "Name" field, so the
       brief's own "Full Name" label is restated here rather than relied on. */
    const fields: MailField[] = [
        { label: "Name", value: d.client_name },
        ...briefFields(websiteBriefSections, d),
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: "New website brief",
                fields,
                meta: await submissionMeta("Website brief form"),
                replyTo: d.email,
            }),
            sendUserConfirmation({
                to: d.email,
                firstName: firstNameOf(d.client_name),
            }),
        ]);
    } catch (error) {
        console.error("[forms] website brief delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}

/** `/logo-brief` — the logo discovery form. */
export async function submitLogoBrief(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const blocked = await guard(formData, "logo_brief");
    if (blocked) return blocked;

    const parsed = logoBriefSchema.safeParse({
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        business_name: formData.get("business_name"),
        business_description: formData.get("business_description"),
        business_stage: formData.get("business_stage"),
        existing_presence: formData.get("existing_presence"),
        brand_message: formData.get("brand_message"),
        logo_inspiration: formData.get("logo_inspiration"),
        logo_style: formData.get("logo_style"),
        color_preferences: formData.get("color_preferences"),
        font_preferences: formData.get("font_preferences"),
        avoid: formData.get("avoid"),
        tagline: formData.get("tagline"),
        logo_usage: formData.get("logo_usage"),
        branding_materials: formData.get("branding_materials"),
        contact_method: formData.get("contact_method"),
        contact_info: formData.get("contact_info"),
        schedule_call: formData.get("schedule_call"),
    });

    if (!parsed.success) {
        return {
            status: "error",
            message: "Please check the highlighted fields.",
            errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const d = parsed.data;
    const fields: MailField[] = [
        { label: "Name", value: d.full_name },
        ...briefFields(logoBriefSections, d),
    ];

    try {
        await Promise.all([
            sendAdminNotification({
                formName: "New logo design brief",
                fields,
                meta: await submissionMeta("Logo brief form"),
                replyTo: d.email,
            }),
            sendUserConfirmation({
                to: d.email,
                firstName: firstNameOf(d.full_name),
            }),
        ]);
    } catch (error) {
        console.error("[forms] logo brief delivery failed", error);
        return { status: "error", message: GENERIC_ERROR };
    }

    return { status: "success", message: SUCCESS };
}
