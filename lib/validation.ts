import { z } from "zod";

import {
    NAME_MESSAGE,
    NAME_PATTERN,
    PHONE_MESSAGE,
    PHONE_PATTERN,
} from "./form-rules";

/**
 * Form schemas. Validation runs on the server inside the Server Action — the
 * browser-side checks are a convenience, never the gate.
 */

const name = z
    .string()
    .trim()
    .min(1, "Required")
    .max(50, "Too long")
    .regex(NAME_PATTERN, NAME_MESSAGE);

const email = z
    .string()
    .trim()
    .min(1, "Required")
    .email("Enter a valid email address")
    .max(120);

/* Digits only, with an optional leading "+" for the country code — the shared
   rule in lib/form-rules.ts, which the browser-side guard enforces from the
   same constants. This was permissive (spaces, brackets, dashes) until the
   client asked for the stricter form site-wide, 2026-08. */
const phone = z
    .string()
    .trim()
    .min(1, "Required")
    .regex(PHONE_PATTERN, PHONE_MESSAGE);

const optionalText = z.string().trim().max(120).optional().or(z.literal(""));

export const leadSchema = z.object({
    first_name: name,
    last_name: name,
    email,
    phone,
    company: z.string().trim().min(1, "Required").max(120),
    source: z.enum(["Google", "Facebook", "Referral", "Other"], {
        message: "Tell us how you found us",
    }),
    help: z.array(z.string().max(60)).max(6).optional().default([]),
    project_details: z.string().trim().max(4000).optional().or(z.literal("")),
});

/**
 * The homepage enquiry card — rendered twice, in the hero and in the proposal
 * band above the footer.
 *
 * A deliberately shorter field set than `proposalSchema`: the hero copy of the
 * card sits in the fold and asks for the minimum a strategist needs to call
 * back — one name field, a number, an email, plus two optional lines. Anything
 * longer pushes the card past the fold on a laptop and costs conversions. The
 * proposal band shares it because the approved design draws the two identically.
 */
export const enquirySchema = z.object({
    full_name: name,
    phone,
    email,
    required_service: optionalText,
    project_goals: z.string().trim().max(4000).optional().or(z.literal("")),
});

export const proposalSchema = z.object({
    first_name: name,
    last_name: name,
    job_title: optionalText,
    company: optionalText,
    email,
    phone,
    business_goals: z.string().trim().max(4000).optional().or(z.literal("")),
});

/**
 * `/creative-logo-design` quote form — the hero card and the package dialog.
 *
 * One name field rather than two, because the live landing page asks for one
 * ("Full Name*"), and 2000 characters rather than 4000 because that is the cap
 * its own error message states. Both are the landing page's rules, not ours.
 */
export const landingQuoteSchema = z.object({
    full_name: name,
    email,
    phone,
    message: z.string().trim().max(2000).optional().or(z.literal("")),
});

/** The landing page's footer "Request a Callback" form: a name and a number. */
export const callbackSchema = z.object({
    full_name: name,
    phone,
});

/**
 * `/seo-services` — the hero enquiry form and the dialog behind every CTA.
 *
 * Six fields rather than the other landing pages' four, because that is the
 * field set the live form posts to its PHPMailer endpoint: separate first and
 * last names, and a free-text `subject`. Kept as-is so the enquiry a visitor
 * sends carries the same information it does today.
 *
 * `subject` is capped at 120 characters and lands in an email body, never in a
 * header — `sendAdminNotification` builds the subject line itself from a fixed
 * lookup, so this value cannot inject one.
 */
export const seoEnquirySchema = z.object({
    first_name: name,
    last_name: name,
    email,
    subject: z.string().trim().min(1, "Required").max(120),
    phone,
    /* The live textarea's own `maxlength`. */
    message: z.string().trim().min(1, "Required").max(2000),
});

/* ---------------------------------------------- the two brief forms -- */

/** Optional single-line field. Longer cap than `optionalText`: these ask for
    lists of industries, locations and brand names, not job titles. */
const briefLine = z.string().trim().max(200).optional().or(z.literal(""));
/** Optional multi-line field. */
const briefBlock = z.string().trim().max(2000).optional().or(z.literal(""));

/**
 * `/website-brief`.
 *
 * Required-versus-optional is the live `js/script.js`, not the asterisks in the
 * labels — a visitor who can submit the live form can still submit this one.
 *
 * `client_name` used to be a bare `z.string` so that a name carrying a digit or
 * an accent was accepted here exactly as it is on the live form. The client's
 * 2026-08 rule ("alphabets and spaces only, on every form") overrides that, so
 * it now carries the shared pattern with the live 3-character minimum kept on
 * top. `phone` stays optional — the live script accepts it empty — but is held
 * to the shared digits-only pattern when it is filled in.
 *
 * The three checkbox arrays are NOT validated for membership here — the action
 * matches them against `CHECKBOX_OPTIONS` before they reach an email. This
 * schema only bounds their size.
 */
export const websiteBriefSchema = z.object({
    client_name: z
        .string()
        .trim()
        .min(3, "Please enter your full name")
        .max(80)
        .regex(NAME_PATTERN, NAME_MESSAGE),
    company: z.string().trim().min(1, "Company name is required").max(120),
    email,
    phone: z
        .string()
        .trim()
        .max(32)
        .refine((v) => v === "" || PHONE_PATTERN.test(v), {
            message: PHONE_MESSAGE,
        })
        .optional()
        .or(z.literal("")),
    business_overview: z
        .string()
        .trim()
        .min(5, "Please tell us about your business")
        .max(2000),
    products_services: briefBlock,
    business_difference: briefBlock,
    business_age: briefLine,
    ideal_customers: briefBlock,
    locations_served: briefLine,
    target_industries: briefLine,
    website_goals: z
        .array(z.string().max(60))
        .min(1, "Please select at least one website goal")
        .max(6),
    main_services_products: briefBlock,
    competitor_1: briefLine,
    competitor_2: briefLine,
    competitor_3: briefLine,
    competitor_4: briefLine,
    website_features: z.array(z.string().max(60)).max(10).optional().default([]),
    pages_required: z.array(z.string().max(60)).max(8).optional().default([]),
    additional_notes: briefBlock,
});

/**
 * `/logo-brief`.
 *
 * `email` is the one field the live form does not have — see
 * `content/landing/logo-brief.ts` for why it was added.
 *
 * `contact_info` is free text by design: the live field is labelled "Contact
 * Information" and placeheld "Phone or email", so it is bounded, not typed.
 */
export const logoBriefSchema = z.object({
    full_name: z
        .string()
        .trim()
        .min(3, "Please enter your full name")
        .max(80)
        .regex(NAME_PATTERN, NAME_MESSAGE),
    email,
    business_name: z.string().trim().min(1, "Business name is required").max(120),
    business_description: z
        .string()
        .trim()
        .min(5, "Please describe your business")
        .max(2000),
    business_stage: z.string().trim().min(1, "Please select business stage").max(60),
    existing_presence: briefLine,
    brand_message: briefLine,
    logo_inspiration: briefLine,
    logo_style: z.string().trim().min(1, "Please select logo style").max(60),
    color_preferences: briefLine,
    font_preferences: briefLine,
    avoid: briefLine,
    tagline: briefLine,
    logo_usage: briefLine,
    branding_materials: briefLine,
    contact_method: z
        .string()
        .trim()
        .min(1, "Please select contact method")
        .max(60),
    contact_info: z
        .string()
        .trim()
        .min(5, "Please enter contact information")
        .max(200),
    schedule_call: briefLine,
});

export type WebsiteBriefInput = z.infer<typeof websiteBriefSchema>;
export type LogoBriefInput = z.infer<typeof logoBriefSchema>;

export type LeadInput = z.infer<typeof leadSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ProposalInput = z.infer<typeof proposalSchema>;
export type LandingQuoteInput = z.infer<typeof landingQuoteSchema>;
export type CallbackInput = z.infer<typeof callbackSchema>;
export type SeoEnquiryInput = z.infer<typeof seoEnquirySchema>;

/** Shape returned by both Server Actions, consumed by useActionState. */
export interface FormState {
    status: "idle" | "success" | "error";
    message?: string;
    /** Field-level errors, keyed by input name. */
    errors?: Record<string, string[]>;
}

export const initialFormState: FormState = { status: "idle" };

export const HELP_OPTIONS = [
    "Generate Leads",
    "Increase Revenue",
    "Optimize Website",
    "Rank in Google",
    "Improve Brand Loyalty",
    "Increase Market Share",
] as const;

export const SOURCE_OPTIONS = [
    "Google",
    "Facebook",
    "Referral",
    "Other",
] as const;
