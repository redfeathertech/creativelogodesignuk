/**
 * Field descriptors for the two brief forms.
 *
 * These two pages are ~60 controls of pure copy between them, so the copy is
 * data rather than markup — that is what lets scripts/verify-brief-parity.py
 * diff two files instead of scraping rendered output.
 *
 * `label` and `placeholder` are transcribed byte for byte from the live pages,
 * including "Tell us about your business*" (no space before the asterisk) and
 * the US spelling "Color Preferences". Both rank; neither may be tidied.
 */

interface BriefFieldBase {
    /** The posted `name`. Must match the live form's own attribute. */
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
}

export type BriefField =
    | (BriefFieldBase & { kind: "text" | "email" | "tel" | "url" })
    | (BriefFieldBase & { kind: "textarea"; rows?: number })
    | (BriefFieldBase & { kind: "select"; options: readonly string[] })
    /** `name` carries the `[]` suffix the live form posts. */
    | (BriefFieldBase & { kind: "checkboxes"; options: readonly string[] });

export interface BriefSection {
    /** Rendered as an <h2>. The live pages use <h3> with no <h1> above it. */
    title: string;
    fields: readonly BriefField[];
}
