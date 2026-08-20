/**
 * The one place the name and phone rules are written down.
 *
 * Both the browser-side guard (`useFormEngagement` in components/forms/FormShell)
 * and the Zod schemas in `lib/validation.ts` read their patterns and messages
 * from here, so a visitor can never be stopped by a rule the server does not
 * hold — or, worse, wave a value past the client that the action then rejects
 * with a different sentence.
 *
 * Client requirement (2026-08):
 *   • name  — alphabets and spaces only, no digits, no punctuation
 *   • phone — digits only, with an optional leading "+" for the country code
 */

/** Letters and spaces. Must start with a letter so " " alone cannot pass. */
export const NAME_PATTERN = /^[A-Za-z]+(?: +[A-Za-z]+)*$/;
export const NAME_MESSAGE = "Please use letters and spaces only";

/** An optional leading "+", then 7–15 digits (the E.164 range). Nothing else. */
export const PHONE_PATTERN = /^\+?\d{7,15}$/;
export const PHONE_MESSAGE =
    "Please enter digits only — an optional leading + is allowed";

export const REQUIRED_MESSAGE = "Required";

/**
 * Which `name` attributes each rule governs.
 *
 * Keyed on the field name rather than the input `type` because the two do not
 * line up: `full_name` is a plain text input, and `contact_info` on /logo-brief
 * is deliberately "phone or email" free text, so it belongs to neither set.
 * Company and business names are excluded on purpose — "3M" and "Smith & Co"
 * are real answers to those questions.
 */
export const NAME_FIELDS: ReadonlySet<string> = new Set([
    "name",
    "full_name",
    "first_name",
    "last_name",
    "client_name",
]);

export const PHONE_FIELDS: ReadonlySet<string> = new Set([
    "phone",
    "telephone",
    "phone_number",
]);

export type FieldRule = "name" | "phone" | null;

/** The rule that governs a field, or null if this handler has no opinion on it. */
export function ruleFor(fieldName: string, inputType?: string): FieldRule {
    if (NAME_FIELDS.has(fieldName)) return "name";
    if (PHONE_FIELDS.has(fieldName) || inputType === "tel") return "phone";
    return null;
}

/**
 * Validate one value. Returns the message to show, or null when it passes.
 *
 * An empty value is only an error when the field is required — the optional
 * phone number on /website-brief has to stay skippable, exactly as it is today.
 */
export function validateValue(
    fieldName: string,
    value: string,
    { required = false, inputType }: { required?: boolean; inputType?: string } = {},
): string | null {
    const rule = ruleFor(fieldName, inputType);
    if (!rule) return null;

    const trimmed = value.trim();
    if (!trimmed) return required ? REQUIRED_MESSAGE : null;

    if (rule === "name") return NAME_PATTERN.test(trimmed) ? null : NAME_MESSAGE;
    return PHONE_PATTERN.test(trimmed) ? null : PHONE_MESSAGE;
}
