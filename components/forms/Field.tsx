"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { ValidMark, VALID_MARK_TONE } from "./ValidMark";

/**
 * Labelled form control with a floating label.
 *
 * Every field gets a real <label> — the live site's proposal form is
 * placeholder-only, which fails WCAG 3.3.2 and leaves screen-reader users with
 * unnamed inputs. The label rides on `:placeholder-shown`, so the float needs
 * no JS and cannot desync from the field's value. Errors are wired via
 * aria-describedby + aria-invalid.
 */

/**
 * `tone` exists for `/seo-services`, the one light-canvas page in the build.
 * Everything else renders on the near-black site background, so "dark" is the
 * default and no existing caller changes.
 *
 * A second component was the obvious alternative and the wrong one: the float
 * behaviour, the id/aria wiring and the `:placeholder-shown` trick are the
 * load-bearing parts, and duplicating them to restyle a border is how the two
 * copies drift.
 */
export type FieldTone = "dark" | "light";

/**
 * The failure and success borders are written out per tone for the same reason
 * everything else in this file is: Tailwind v4 scans source text, so a composed
 * `aria-[invalid=true]:${x}` would generate no CSS at all.
 *
 * They cannot both apply — `useFormEngagement` only sets `data-valid` on a
 * control it found no message for — so their order relative to each other is
 * moot. The extra end padding is applied by the same variant, so it arrives
 * with the tick and no field reserves space for a tick it may never show.
 */
const CONTROL: Record<FieldTone, string> = {
    dark:
        "border-white/[0.11] bg-white/[0.04] text-white " +
        /* Opaque equivalents of the two translucent fills above. The autofill
           shadow in globals.css cannot be transparent, so each tone hands it a
           flattened colour rather than the browser's blue. */
        "[--field-fill:#170d25] [--field-ink:#ffffff] focus:[--field-fill:#1e152c] " +
        "hover:border-white/20 focus:border-magenta-400 focus:bg-white/[0.07] " +
        "focus:shadow-[0_0_0_3px_rgb(204_6_127/0.22)] aria-[invalid=true]:border-red-400/60 " +
        "data-[valid=true]:border-emerald-400/55 data-[valid=true]:pe-11",
    light:
        "border-seo-border bg-white text-seo-ink " +
        "[--field-fill:#ffffff] [--field-ink:var(--color-seo-ink)] " +
        "hover:border-seo-body/50 focus:border-seo-pink focus:bg-white " +
        "focus:shadow-[0_0_0_3px_rgb(209_0_143/0.16)] aria-[invalid=true]:border-red-500 " +
        "data-[valid=true]:border-emerald-600/70 data-[valid=true]:pe-11",
};

const controlClass = (tone: FieldTone) =>
    "peer w-full rounded-md border px-[1.1rem] pt-[1.4rem] pb-[0.6rem] " +
    "leading-[1.4] placeholder:text-transparent " +
    "transition-[border-color,background-color,box-shadow] duration-300 ease-out " +
    "focus:outline-none " +
    CONTROL[tone];

/**
 * Every variant below is written out in full, never composed from a fragment.
 *
 * Tailwind v4 scans source text for complete class names — it does not evaluate
 * the code. `peer-focus:${ACTIVE[tone]}` would type-check, render the right
 * string at runtime and generate no CSS at all, because
 * `peer-focus:text-seo-pink` never appears literally anywhere for the scanner
 * to find. Keep these as literals.
 */
const LABEL_BASE =
    "pointer-events-none absolute top-[1.05rem] left-[1.1rem] origin-top-left " +
    "transition-[transform,color] duration-200 ease-out ";

/* Both rest colours clear 4.5:1 against their own canvas. */
const labelBase = (tone: FieldTone) =>
    LABEL_BASE + (tone === "light" ? "text-seo-body" : "text-white/40");

/** The float is driven by focus or by the field no longer showing its (blank) placeholder. */
const LABEL_REACTIVE: Record<FieldTone, string> = {
    dark:
        "peer-focus:-translate-y-[0.62rem] peer-focus:scale-[0.74] peer-focus:text-magenta-300 " +
        "peer-[:not(:placeholder-shown)]:-translate-y-[0.62rem] peer-[:not(:placeholder-shown)]:scale-[0.74] " +
        "peer-[:not(:placeholder-shown)]:text-magenta-300",
    light:
        "peer-focus:-translate-y-[0.62rem] peer-focus:scale-[0.74] peer-focus:text-seo-pink " +
        "peer-[:not(:placeholder-shown)]:-translate-y-[0.62rem] peer-[:not(:placeholder-shown)]:scale-[0.74] " +
        "peer-[:not(:placeholder-shown)]:text-seo-pink",
};

const labelReactive = (tone: FieldTone) => LABEL_REACTIVE[tone];

const hintClass = (tone: FieldTone) =>
    tone === "light"
        ? "mt-[0.35rem] block text-xs text-red-600"
        : "mt-[0.35rem] block text-xs text-[#ff9a9a]";

function Asterisk({ required }: { required?: boolean }) {
    return required ? <span aria-hidden="true"> *</span> : null;
}

export function Field({
    label,
    name,
    type = "text",
    required,
    autoComplete,
    errors,
    className,
    tone = "dark",
}: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    errors?: string[];
    className?: string;
    tone?: FieldTone;
}) {
    const id = useId();
    const errorId = `${id}-error`;
    const hasError = Boolean(errors?.length);

    return (
        <div className={cn("relative", className)}>
            {/* A single space as the placeholder: it never renders (the placeholder is
          transparent) but it makes :placeholder-shown track emptiness. */}
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                autoComplete={autoComplete}
                placeholder=" "
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                className={controlClass(tone)}
            />
            <ValidMark className={cn("end-[1.05rem] top-[1.15rem]", VALID_MARK_TONE[tone])} />
            <label
                htmlFor={id}
                className={cn(labelBase(tone), labelReactive(tone))}
            >
                {label}
                <Asterisk required={required} />
            </label>
            {hasError && (
                <span id={errorId} className={hintClass(tone)}>
                    {errors![0]}
                </span>
            )}
        </div>
    );
}

export function TextareaField({
    label,
    name,
    rows = 4,
    required,
    errors,
    className,
    tone = "dark",
}: {
    label: string;
    name: string;
    rows?: number;
    required?: boolean;
    errors?: string[];
    className?: string;
    tone?: FieldTone;
}) {
    const id = useId();
    const errorId = `${id}-error`;
    const hasError = Boolean(errors?.length);

    return (
        <div className={cn("relative", className)}>
            <textarea
                id={id}
                name={name}
                rows={rows}
                required={required}
                placeholder=" "
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                className={cn(
                    controlClass(tone),
                    "min-h-32 resize-y pt-[1.7rem]",
                )}
            />
            {/* Pinned to the top of a resizable box, not its centre. */}
            <ValidMark className={cn("end-[1.05rem] top-[1.35rem]", VALID_MARK_TONE[tone])} />
            <label
                htmlFor={id}
                className={cn(labelBase(tone), labelReactive(tone))}
            >
                {label}
                <Asterisk required={required} />
            </label>
            {hasError && (
                <span id={errorId} className={hintClass(tone)}>
                    {errors![0]}
                </span>
            )}
        </div>
    );
}

/* The dropdown lives in ./Select — the native option list is drawn by the OS
   and ignores every token in @theme. Re-exported so callers import one module. */
export { SelectField } from "./Select";
