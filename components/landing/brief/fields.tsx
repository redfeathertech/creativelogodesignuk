import { cn } from "@/lib/cn";
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
 * Labels are rendered exactly as the content module gives them, asterisks
 * included. Where the live page marks nothing — the whole logo brief — the
 * field gets `required`/`aria-required` and no visible change.
 */

const control =
    "w-full min-w-0 rounded-lg border border-mist-300 bg-white px-3.5 py-2.5 text-sm text-onlight " +
    "placeholder:text-mist-500 focus:border-magenta-500 focus:outline-none " +
    "focus:ring-2 focus:ring-magenta-500/30 disabled:opacity-50";

const invalid = "border-red-500 focus:border-red-500 focus:ring-red-500/30";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-onlight">
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
            <fieldset>
                <legend className="text-sm font-semibold text-onlight">
                    {field.label}
                </legend>
                <div
                    className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3"
                    aria-describedby={described}
                >
                    {field.options.map((option) => (
                        <label
                            key={option}
                            className="flex min-w-0 items-center gap-2.5 text-sm text-onlight"
                        >
                            <input
                                type="checkbox"
                                name={field.name}
                                value={option}
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

    return (
        <div>
            <Label htmlFor={id}>{field.label}</Label>
            <div className="mt-1.5">
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
                ) : field.kind === "select" ? (
                    <select
                        id={id}
                        name={field.name}
                        required={field.required}
                        aria-required={field.required}
                        aria-invalid={bad || undefined}
                        aria-describedby={described}
                        defaultValue=""
                        className={cn(control, "appearance-none pr-9", bad && invalid)}
                    >
                        {field.options.map((option, index) => (
                            <option
                                key={option}
                                value={index === 0 ? "" : option}
                                disabled={index === 0 && field.required}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
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
