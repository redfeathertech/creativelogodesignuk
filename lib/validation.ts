import { z } from "zod";

/**
 * Form schemas. Validation runs on the server inside the Server Action — the
 * browser-side checks are a convenience, never the gate.
 */

const name = z
    .string()
    .trim()
    .min(1, "Required")
    .max(50, "Too long")
    .regex(/^[a-zA-Z][a-zA-Z\s'-]*$/, "Letters only");

const email = z
    .string()
    .trim()
    .min(1, "Required")
    .email("Enter a valid email address")
    .max(120);

/* Digits, spaces and the usual separators. Deliberately permissive: the field
   is fed by intl-tel-input style formatting and over-strict phone regexes
   reject valid international numbers. */
const phone = z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(32)
    .regex(/^[+()\d\s-]+$/, "Enter a valid phone number");

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

export type LeadInput = z.infer<typeof leadSchema>;
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
