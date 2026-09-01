import { cn } from "@/lib/cn";
import { SelectField } from "@/components/forms/Field";
import { ValidMark, VALID_MARK_TONE } from "@/components/forms/ValidMark";
import type { BriefField, BriefSection } from "@/content/landing/brief-types";

/**
 * Controls for the two brief pages.
 *
 * Deliberately NOT `components/forms/Field.tsx`: that is a floating-label
 * control on dark glass, sized for four-field forms. These two pages render
 * about sixty controls on a white card with static labels above each input.
 * Reusing it would mean threading a tone and a label-position variant through a
 * component three other forms depend on.
 *
 * The one thing it does borrow is the dropdown: the native option list is drawn
 * by the OS, so `components/forms/Select.tsx` is used in its `plain` variant
 * with a `brief` skin — the label and the error line still come from here.
 * That control posts through a hidden input, which is exempt from constraint
 * validation, so `required` on a select rides the `data-*` contract in
 * `lib/form-rules.ts` and is checked in the browser like every other field,
 * with zod re-checking it in the action.
 *
 * Labels are rendered exactly as the content module gives them, asterisks
 * included. Where the live page marks nothing — the whole logo brief — the
 * field gets `required`/`aria-required` and no visible change.
 */

const control =
    "peer w-full min-w-0 rounded-lg border border-mist-300 bg-white px-3.5 py-2.5 text-sm text-onlight " +
    /* Keeps an autofilled field white instead of Chrome's blue — the rule that
       reads these lives in app/globals.css. */
    "[--field-fill:#ffffff] [--field-ink:var(--color-onlight)] " +
    "placeholder:text-mist-500 focus:border-magenta-500 focus:outline-none " +
    "focus:ring-2 focus:ring-magenta-500/30 disabled:opacity-50 " +
    "data-[valid=true]:border-emerald-600/70 data-[valid=true]:pe-9";

const invalid = "border-red-500 focus:border-red-500 focus:ring-red-500/30";

/**
 * `htmlFor` is dropped for the dropdown: its trigger is a <button>, which is not
 * a labelable element, so the association is made the other way round — the
 * label carries an id and the combobox points at it with aria-labelledby.
 */
function Label({
    htmlFor,
    id,
    children,
}: {
    htmlFor?: string;
    id?: string;
    children: React.ReactNode;
}) {
    return (
        <label
            htmlFor={htmlFor}
            id={id}
            className="block text-sm font-semibold text-onlight"
        >
            {children}
        </label>
    );
}

function Errors({ id, errors }: { id: string; errors?: string[] }) {
    if (!errors?.length) return null;
    return (
        <p id={id} className="mt-1.5 text-xs text-red-600">
            {errors[0]}
        </p>
    );
}

export function BriefFieldControl({
    field,
    errors,
}: {
    field: BriefField;
    errors?: string[];
}) {
    const id = `brief-${field.name.replace("[]", "")}`;
    const errorId = `${id}-error`;
    const bad = Boolean(errors?.length);
    const described = bad ? errorId : undefined;

    if (field.kind === "checkboxes") {
        return (
            <fieldset aria-describedby={described} aria-invalid={bad || undefined}>
                <legend className="text-sm font-semibold text-onlight">
                    {field.label}
                </legend>
                <div className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {field.options.map((option) => (
                        <label
                            key={option}
                            className="flex min-w-0 items-center gap-2.5 text-sm text-onlight"
                        >
                            {/* A group is one answer, not one control per box,
                                so the shared engine reads its requiredness off
                                the members — see `checkboxGroups` in
                                lib/form-rules.ts. Never `required`: that would
                                make the platform demand *every* box. */}
                            <input
                                type="checkbox"
                                name={field.name}
                                value={option}
                                data-required={field.required ? "true" : undefined}
                                className="size-4 shrink-0 accent-magenta-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta-500/40"
                            />
                            <span className="min-w-0">{option}</span>
                        </label>
                    ))}
                </div>
                <Errors id={errorId} errors={errors} />
            </fieldset>
        );
    }

    if (field.kind === "select") {
        /* The first option is the live form's own placeholder, not a value. */
        const [placeholder, ...options] = field.options;
        return (
            <div>
                <Label id={`${id}-label`}>{field.label}</Label>
                <div className="mt-1.5">
                    <SelectField
                        tone="brief"
                        variant="plain"
                        triggerId={id}
                        labelledBy={`${id}-label`}
                        describedBy={described}
                        label={field.label}
                        name={field.name}
                        options={options}
                        placeholder={placeholder}
                        required={field.required}
                        errors={errors}
                    />
                </div>
                <Errors id={errorId} errors={errors} />
            </div>
        );
    }

    return (
        <div>
            <Label htmlFor={id}>{field.label}</Label>
            <div className="relative mt-1.5">
                {field.kind === "textarea" ? (
                    <textarea
                        id={id}
                        name={field.name}
                        rows={field.rows ?? 4}
                        placeholder={field.placeholder}
                        required={field.required}
                        aria-required={field.required}
                        aria-invalid={bad || undefined}
                        aria-describedby={described}
                        className={cn(control, "resize-y", bad && invalid)}
                    />
                ) : (
                    <input
                        id={id}
                        type={field.kind}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        aria-required={field.required}
                        aria-invalid={bad || undefined}
                        aria-describedby={described}
                        autoComplete={field.autoComplete}
                        className={cn(control, bad && invalid)}
                    />
                )}
                <ValidMark
                    className={cn(
                        field.kind === "textarea"
                            ? "end-3 top-3"
                            : "end-3 top-[0.7rem]",
                        VALID_MARK_TONE.brief,
                    )}
                />
            </div>
            <Errors id={errorId} errors={errors} />
        </div>
    );
}

/**
 * A section and its fields.
 *
 * The "Website Goals *" section on the website brief is a heading whose only
 * child is a checkbox group carrying the same label, so the group's `<legend>`
 * is hidden from sight there — rendering both would show the words twice. It
 * stays in the accessibility tree via sr-only, so the group is still named.
 */
export function BriefSectionBlock({
    section,
    errors,
}: {
    section: BriefSection;
    errors?: Record<string, string[]>;
}) {
    const duplicateLegend =
        section.fields.length === 1 && section.fields[0].label === section.title;

    return (
        <section className="mt-9 first:mt-0">
            <h2 className="border-b border-mist-200 pb-2 font-display text-lg font-bold text-onlight">
                {section.title}
            </h2>
            <div className={cn("mt-5 grid gap-5", duplicateLegend && "[&_legend]:sr-only")}>
                {section.fields.map((field) => (
                    <BriefFieldControl
                        key={field.name}
                        field={field}
                        errors={errors?.[field.name.replace("[]", "")]}
                    />
                ))}
            </div>
        </section>
    );
}
