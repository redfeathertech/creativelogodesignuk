import { cn } from "@/lib/cn";

/**
 * The tick that appears inside a field the visitor has answered correctly.
 *
 * Driven entirely by CSS off the `data-valid` attribute `useFormEngagement`
 * writes onto the control (see `VALID_ATTR` in `lib/form-rules.ts`), so it
 * needs no state of its own and no form component has to pass it anything.
 * Render it as the **next sibling** of a control carrying the `peer` class.
 *
 * `aria-hidden`, and never the only signal: a colour and a shape alone would
 * fail WCAG 1.4.1, so the thing a tick actually means — no error message under
 * the field — is what a screen reader gets, via the `aria-invalid` and
 * `aria-describedby` the field already carries. There is nothing to announce
 * about a field that is simply fine.
 */
export function ValidMark({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute h-4 w-4",
                /* Hidden until the peer control is marked valid. Scale rather
                   than display, so it can ease in — and so it never reflows
                   the field it sits inside. */
                "scale-75 opacity-0 transition-[opacity,transform] duration-200 ease-out",
                "peer-data-[valid=true]:scale-100 peer-data-[valid=true]:opacity-100",
                className,
            )}
        >
            <circle cx="8" cy="8" r="7.1" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
            <path
                d="M4.8 8.3 6.9 10.4 11.2 5.9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/**
 * The tick's colour per canvas.
 *
 * Both clear 4.5:1 against their own background — the tick is decorative, but
 * the same green is used for the field's border, and a success state nobody can
 * see on a bright monitor is not one.
 */
export const VALID_MARK_TONE = {
    dark: "text-emerald-400",
    light: "text-emerald-600",
    brief: "text-emerald-600",
} as const;
