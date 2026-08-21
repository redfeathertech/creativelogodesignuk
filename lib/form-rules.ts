/**
 * The one place every form rule on the site is written down.
 *
 * Both the browser-side guard (`useFormEngagement` in components/forms/FormShell)
 * and the Zod schemas in `lib/validation.ts` read their patterns and messages
 * from here, so a visitor can never be stopped by a rule the server does not
 * hold — or, worse, wave a value past the client that the action then rejects
 * with a different sentence.
 *
 * Client requirement (2026-08):
 *   • name  — alphabets and spaces only, no digits, no punctuation
 *   • phone — a phone number in any of the shapes people write one: with or
 *             without a leading "+", with or without spaces, dashes or
 *             brackets. It is normalised to "+" and digits before it is
 *             judged, and before it is posted.
 *
 * The engine at the bottom of this file reads its rules off the DOM — the
 * `required`, `type` and `minlength` attributes a field already carries, plus a
 * small set of `data-*` opt-ins for the controls the platform cannot see into
 * (the custom dropdown posts through a hidden input; a checkbox group is not a
 * single control). Nothing here is stricter than `lib/validation.ts`: the
 * browser is a courtesy, never the gate, and a rule the server would accept
 * must never block a submission in the browser.
 */

/** Letters and spaces. Must start with a letter so " " alone cannot pass. */
export const NAME_PATTERN = /^[A-Za-z]+(?: +[A-Za-z]+)*$/;
export const NAME_MESSAGE = "Please use letters and spaces only";

/**
 * The characters people put *between* the digits of a phone number.
 *
 * Spaces, dashes — including the four unicode dashes a number pasted out of
 * Word or a PDF carries — round brackets and dots. They are punctuation, not
 * part of the number, so they are stripped before the pattern below ever sees
 * the value, and stripped again on the way to the action, so what lands in the
 * team's notification email is the dialable form.
 */
/* The dashes are spelt as escapes, and the literal hyphen is escaped: an
   unescaped "-" between "." and "‐" is a *range*, and that range covers
   every digit. Written the obvious way this strips a phone number down to a
   lone "+". */
export const PHONE_SEPARATORS = /[\s().\-\u2010-\u2015\u2212]/g;

/**
 * The number itself, once the separators are gone.
 *
 * Two shapes, because both are real answers to "Phone":
 *   • `+`, then a country code and 7–15 digits in total — E.164, which forbids
 *     a leading zero after the `+`
 *   • no `+`, 7–15 digits, leading zero allowed — the national form a UK
 *     visitor actually types ("07853354207")
 *
 * The 15-digit ceiling is E.164's; the 7-digit floor is the shortest real
 * national number. Never applied to a raw value — always to
 * `normalisePhone(value)`, so "+44 7853 354207", "+447853354207",
 * "(020) 7946 0018" and "07853-354207" are one number wearing four coats.
 */
export const PHONE_PATTERN = /^(?:\+[1-9]\d{6,14}|\d{7,15})$/;
export const PHONE_MESSAGE =
    "Enter a valid phone number like +44 7853 354207 or 07853 354207";

/**
 * Strip the punctuation out of a phone number, leaving `+` and digits.
 *
 * Runs on both sides of the wire: the browser normalises the box on blur and
 * again on submit, and `lib/validation.ts` re-runs it before its own check,
 * because the server cannot assume the browser did. Both therefore judge the
 * same string, and neither can accept what the other rejects.
 */
export function normalisePhone(value: string): string {
    return value.replace(PHONE_SEPARATORS, "");
}

/**
 * Collapse runs of whitespace and trim the ends.
 *
 * "  Jane   Doe " is a name with a typo in it, not a name that breaks a rule —
 * this is what turns it into "Jane Doe" rather than showing a message about
 * spaces the visitor cannot see. Applied to every text and email value before
 * it is validated and before it is posted.
 */
export function collapseSpaces(value: string): string {
    return value.replace(/\s+/g, " ").trim();
}

/**
 * Deliberately looser than a full RFC 5322 parse and looser than nothing.
 *
 * It has to accept everything `z.string().email()` accepts, because a value the
 * action would take must never be blocked here. It rejects the four mistakes
 * that actually reach a form — no "@", no dot in the domain, a space, a
 * trailing dot — and leaves the rest to the server.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;
export const EMAIL_MESSAGE =
    "Enter a valid email address like name@example.com";

export const REQUIRED_MESSAGE = "Required";
export const SELECT_MESSAGE = "Please select an option";
export const CHECKBOX_GROUP_MESSAGE = "Please select at least one option";

/** Used when a field declares `minlength` and carries no message of its own. */
export const minLengthMessage = (n: number) =>
    `Please enter at least ${n} character${n === 1 ? "" : "s"}`;

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

export const EMAIL_FIELDS: ReadonlySet<string> = new Set([
    "email",
    "email_address",
]);

export type FieldRule = "name" | "phone" | "email" | null;

/** The rule that governs a field, or null if this handler has no opinion on it. */
export function ruleFor(fieldName: string, inputType?: string): FieldRule {
    const key = fieldKey(fieldName);
    if (NAME_FIELDS.has(key)) return "name";
    if (PHONE_FIELDS.has(key) || inputType === "tel") return "phone";
    if (EMAIL_FIELDS.has(key) || inputType === "email") return "email";
    return null;
}

/**
 * The value a field should actually hold, given the rule that governs it.
 *
 * This is the single definition of "tidy" for the whole site, and it runs in
 * three places: on blur, so the box the visitor is looking at shows what will
 * be posted; on submit, so it is what *is* posted; and inside `validateValue`
 * below, so no rule is ever applied to a string the form would not send.
 *
 *   • phone     — every separator stripped, leaving `+` and digits
 *   • multiline — ends trimmed only; the paragraph breaks in a project brief
 *                 are the visitor's, not whitespace to tidy away
 *   • the rest  — ends trimmed and internal runs collapsed to one space
 */
export function normaliseFor(
    fieldName: string,
    value: string,
    {
        inputType,
        multiline = false,
        stripPhone = true,
    }: { inputType?: string; multiline?: boolean; stripPhone?: boolean } = {},
): string {
    if (stripPhone && ruleFor(fieldName, inputType) === "phone") {
        return normalisePhone(value);
    }
    return multiline ? value.trim() : collapseSpaces(value);
}

/**
 * Validate one value against its format rule.
 *
 * Returns the message to show, or null when it passes. The value is normalised
 * first — a number typed "+44 7853 354207" is judged as "+447853354207", and a
 * name typed with a stray double space is judged as if it had one — so the
 * visitor is never told off for punctuation the form is about to remove.
 *
 * An empty value is only an error when the field is required: the optional
 * phone number on /website-brief has to stay skippable, exactly as it is today.
 */
export function validateValue(
    fieldName: string,
    value: string,
    {
        required = false,
        inputType,
        minLength = 0,
        requiredMessage = REQUIRED_MESSAGE,
        minLengthText,
        multiline = false,
    }: {
        required?: boolean;
        inputType?: string;
        minLength?: number;
        requiredMessage?: string;
        minLengthText?: string;
        multiline?: boolean;
    } = {},
): string | null {
    if (!value.trim()) return required ? requiredMessage : null;

    const candidate = normaliseFor(fieldName, value, { inputType, multiline });
    const rule = ruleFor(fieldName, inputType);
    if (rule === "name" && !NAME_PATTERN.test(candidate)) return NAME_MESSAGE;
    if (rule === "phone" && !PHONE_PATTERN.test(candidate)) return PHONE_MESSAGE;
    if (rule === "email" && !EMAIL_PATTERN.test(candidate)) return EMAIL_MESSAGE;

    /* Only checked when the markup declares it, and only below the format
       rules, so it can never contradict one. `minlength` mirrors the schema's
       own `.min()` — see the two brief schemas in lib/validation.ts. It counts
       the normalised length, which is what the schema will count. */
    if (minLength > 1 && candidate.length < minLength) {
        return minLengthText ?? minLengthMessage(minLength);
    }

    return null;
}

/* ------------------------------------------------- the DOM-facing engine -- */

export type ValidatableControl =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

/**
 * `website_goals[]` posts as an array but its errors come back keyed
 * `website_goals`, the schema's own key. Every error map on both sides of the
 * wire is keyed on the stripped form so a field asks for its message once.
 */
export function fieldKey(name: string): string {
    return name.replace(/\[\]$/, "");
}

/** Input types that carry no value worth checking. */
const INERT_TYPES: ReadonlySet<string> = new Set([
    "submit",
    "button",
    "reset",
    "image",
    "file",
]);

/**
 * Attribute contract for the controls the platform cannot validate on its own.
 *
 * `data-validate` opts a hidden input in — that is how `components/forms/Select`
 * exposes the value it posts, since a hidden input is exempt from constraint
 * validation and its visible trigger is a `<button>`.
 */
export const VALIDATE_ATTR = "data-validate";
/** On an opted-in hidden input or a checkbox group member: this is required. */
export const REQUIRED_ATTR = "data-required";
/**
 * Overrides the message for "you have not answered this yet" — empty when
 * required, or shorter than the field's own `minlength`. One attribute covers
 * both because they are the same complaint to a visitor, and it lets a field
 * speak the schema's exact words instead of a generic sentence.
 */
export const MESSAGE_ATTR = "data-required-message";
/** Id of the element to focus when an opted-in hidden input fails. */
export const FOCUS_ATTR = "data-focus-target";
/**
 * Set by `useFormEngagement` on a control the visitor has answered correctly.
 *
 * The success state is an attribute rather than a React prop because it has to
 * reach every field on the site — twelve forms and about a hundred controls,
 * only some of which render through `components/forms/Field`. The four places
 * that draw a control style off it (`Field`, `Select`, the homepage enquiry
 * card and the brief pages' controls) do so with a `data-[valid=true]:`
 * variant, so no individual form component changes and none can be missed.
 *
 * Only ever set on a field that has both been *touched* and been filled in: a
 * green tick on an empty optional box is a lie about work the visitor has not
 * done.
 */
export const VALID_ATTR = "data-valid";

function isInert(el: ValidatableControl): boolean {
    if (el instanceof HTMLInputElement) {
        if (el.type === "hidden") return !el.hasAttribute(VALIDATE_ATTR);
        return INERT_TYPES.has(el.type);
    }
    return false;
}

/** True when the control declares itself required, natively or by attribute. */
function isRequired(el: ValidatableControl): boolean {
    return el.required || el.getAttribute(REQUIRED_ATTR) === "true";
}

function requiredMessageFor(el: ValidatableControl): string {
    const custom = el.getAttribute(MESSAGE_ATTR);
    if (custom) return custom;
    if (el instanceof HTMLSelectElement) return SELECT_MESSAGE;
    if (el instanceof HTMLInputElement && el.type === "hidden") {
        return el.getAttribute(VALIDATE_ATTR) === "select"
            ? SELECT_MESSAGE
            : REQUIRED_MESSAGE;
    }
    return REQUIRED_MESSAGE;
}

/**
 * Every control in a form this engine has an opinion on.
 *
 * The honeypot is excluded by name — it is *supposed* to stay empty, and a
 * `required` on it would be a rule against the visitor. Disabled controls are
 * excluded because they do not post.
 *
 * Checkboxes and radios are handled separately by `checkboxGroups`: they are a
 * group of controls sharing one name and one error line, not one control.
 */
export function validatableControls(
    form: HTMLFormElement,
    honeypotField: string,
): ValidatableControl[] {
    return Array.from(form.elements).filter(
        (el): el is ValidatableControl =>
            (el instanceof HTMLInputElement ||
                el instanceof HTMLTextAreaElement ||
                el instanceof HTMLSelectElement) &&
            Boolean(el.name) &&
            el.name !== honeypotField &&
            !el.disabled &&
            !(el instanceof HTMLInputElement &&
                (el.type === "checkbox" || el.type === "radio")) &&
            !isInert(el),
    );
}

/** Validate one live control. Returns the message to show, or null. */
export function validateControl(el: ValidatableControl): string | null {
    const minAttr = Number(el.getAttribute("minlength") ?? 0);

    return validateValue(el.name, el.value, {
        required: isRequired(el),
        inputType: el instanceof HTMLInputElement ? el.type : undefined,
        minLength: Number.isFinite(minAttr) ? minAttr : 0,
        requiredMessage: requiredMessageFor(el),
        minLengthText: el.getAttribute(MESSAGE_ATTR) ?? undefined,
        multiline: el instanceof HTMLTextAreaElement,
    });
}

/**
 * Write the normalised value back into a live control.
 *
 * Returns true when the box changed, so the caller can tell React about it —
 * every control on the site is uncontrolled, but a `value` assignment is still
 * invisible to any `onChange` a caller has added of its own.
 *
 * Two modes, because a phone number is the one field where "tidy" and "what we
 * post" are not the same string. On blur only the whitespace is tidied
 * (`stripPhone: false`), so "+44 7853 354207" stays readable in the box the
 * visitor is looking at; on submit the separators go too, so what reaches the
 * action is dialable. Rewriting the box to "+447853354207" the instant they tab
 * out reads as the form fighting them.
 *
 * A hidden input is left alone: its value was not typed, it was chosen, and
 * `components/forms/Select` owns it.
 */
export function normaliseControl(
    el: ValidatableControl,
    { stripPhone = true }: { stripPhone?: boolean } = {},
): boolean {
    if (el instanceof HTMLInputElement && el.type === "hidden") return false;

    const next = normaliseFor(el.name, el.value, {
        inputType: el instanceof HTMLInputElement ? el.type : undefined,
        multiline: el instanceof HTMLTextAreaElement,
        stripPhone,
    });
    if (next === el.value) return false;

    /* Through the prototype setter, not the instance property: React's own
       value tracker sits on the instance and would swallow the change,
       leaving a later `input` event undelivered. */
    const proto =
        el instanceof HTMLTextAreaElement
            ? HTMLTextAreaElement.prototype
            : el instanceof HTMLSelectElement
              ? HTMLSelectElement.prototype
              : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (setter) setter.call(el, next);
    else el.value = next;
    return true;
}

/**
 * The checkbox groups in a form that declare themselves required, with the
 * message to show when none of their boxes is ticked.
 *
 * A group opts in with `data-required="true"` on its inputs — /website-brief's
 * "Website Goals" is the only one today, and its schema requires exactly this
 * (`.min(1, …)`), so the browser now says so before the round trip instead of
 * after it.
 */
export function checkboxGroups(
    form: HTMLFormElement,
    honeypotField: string,
): { name: string; boxes: HTMLInputElement[]; message: string }[] {
    const groups = new Map<
        string,
        { name: string; boxes: HTMLInputElement[]; message: string }
    >();

    for (const el of Array.from(form.elements)) {
        if (
            !(el instanceof HTMLInputElement) ||
            el.type !== "checkbox" ||
            !el.name ||
            el.name === honeypotField ||
            el.disabled ||
            el.getAttribute(REQUIRED_ATTR) !== "true"
        ) {
            continue;
        }

        const existing = groups.get(el.name);
        if (existing) existing.boxes.push(el);
        else
            groups.set(el.name, {
                name: el.name,
                boxes: [el],
                message:
                    el.getAttribute(MESSAGE_ATTR) ?? CHECKBOX_GROUP_MESSAGE,
            });
    }

    return Array.from(groups.values());
}
