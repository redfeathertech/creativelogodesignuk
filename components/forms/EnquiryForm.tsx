"use client";

import { useActionState, useId } from "react";

import { submitEnquiry } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import { FormStatus, HoneypotFields, useFormEngagement } from "./FormShell";
import Recaptcha from "./Recaptcha";
import {
    ConfidentialIcon,
    LockIcon,
    MailFieldIcon,
    NoObligationIcon,
    NoteFieldIcon,
    PhoneFieldIcon,
    QuickResponseIcon,
    ServiceFieldIcon,
    UserFieldIcon,
} from "./fieldIcons";
import { ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { ValidMark, VALID_MARK_TONE } from "./ValidMark";

/**
 * The five-field enquiry card — a light card on a dark canvas, rendered twice
 * on the homepage: in the hero, and in the proposal band above the footer.
 *
 * It cannot reuse the shared dark `Field`, which is why the control styling is
 * written out here. Five fields rather than `ProposalForm`'s seven: the hero
 * copy of this card sits in the fold, and every extra row pushes it past that
 * on a laptop. The proposal band inherited the same set because the approved
 * design draws the two cards identically.
 *
 * Labels are real `<label>`s, rendered `sr-only` because the design puts the
 * label text inside the control. The visible copy is the placeholder, so the
 * two always read the same string — a placeholder-only field (what the live
 * site ships) leaves screen-reader users with unnamed inputs, WCAG 3.3.2.
 *
 * `source` rides along as a hidden input rather than a schema field. The action
 * looks it up in a fixed table to label the team's notification email, and
 * never feeds it to `enquirySchema` — so a visitor editing it in devtools can
 * neither fail validation on a field they cannot see nor put their own text in
 * an email subject line.
 */

/**
 * The field set is a module constant, not page copy in `content/`.
 *
 * Each label is bound one-to-one with its `name`, `type` and `autoComplete` —
 * rename "Phone" and the `tel` input and the `phone` key the server action
 * reads have to move with it. That makes the row a contract rather than copy,
 * and both cards render it identically. Splitting the visible half out to
 * `content/home.ts` would put one half of each pair a file away from the other
 * and invite them to drift, for two copies of the same five strings.
 */
const FIELDS = [
    {
        label: "Your Name",
        name: "full_name",
        required: true,
        autoComplete: "name",
        icon: UserFieldIcon,
    },
    {
        label: "Phone",
        name: "phone",
        type: "tel",
        required: true,
        autoComplete: "tel",
        icon: PhoneFieldIcon,
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        required: true,
        autoComplete: "email",
        icon: MailFieldIcon,
    },
    {
        label: "Required Service",
        name: "required_service",
        icon: ServiceFieldIcon,
    },
    {
        label: "What is your project & business goals?",
        name: "project_goals",
        icon: NoteFieldIcon,
        textarea: true,
    },
] as const satisfies readonly FieldSpec[];

interface FieldSpec {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    icon: (p: { className?: string }) => React.ReactElement;
    textarea?: boolean;
}

/** Positional, matching the three strings each caller passes in. */
const ASSURANCE_ICONS = [NoObligationIcon, QuickResponseIcon, ConfidentialIcon];

const CONTROL =
    "peer w-full rounded-md border border-mist-300 bg-white py-3 ps-11 pe-4 text-[0.95rem] text-onlight " +
    "placeholder:text-mist-500 transition-[border-color,box-shadow] duration-200 ease-out " +
    "focus:border-magenta-500 focus:outline-none focus:shadow-[0_0_0_3px_rgb(204_6_127/0.15)] " +
    "aria-[invalid=true]:border-red-500 " +
    /* The tick shares the row with the leading icon, so it takes the end
       padding only when it is actually showing. */
    "data-[valid=true]:border-emerald-600/70 data-[valid=true]:pe-10";

const ICON =
    "pointer-events-none absolute start-4 top-[0.95rem] h-[1.15rem] w-[1.15rem] text-mist-500";

function FieldRow({
    label,
    name,
    type = "text",
    required,
    autoComplete,
    errors,
    icon: Icon,
    textarea,
}: FieldSpec & { errors?: string[] }) {
    const id = useId();
    const errorId = `${id}-error`;
    const hasError = Boolean(errors?.length);
    const visible = required ? `${label} *` : label;
    const shared = {
        id,
        name,
        required,
        placeholder: visible,
        "aria-invalid": hasError,
        "aria-describedby": hasError ? errorId : undefined,
    };

    return (
        <div className="relative">
            <label htmlFor={id} className="sr-only">
                {visible}
            </label>
            <Icon className={ICON} />
            {textarea ? (
                <textarea
                    {...shared}
                    rows={3}
                    className={cn(CONTROL, "min-h-[6.5rem] resize-y")}
                />
            ) : (
                <input
                    {...shared}
                    type={type}
                    autoComplete={autoComplete}
                    className={CONTROL}
                />
            )}
            <ValidMark
                className={cn(
                    "end-3.5 top-[0.95rem]",
                    VALID_MARK_TONE.light,
                )}
            />
            {hasError && (
                <span id={errorId} className="mt-1 block text-xs text-red-600">
                    {errors![0]}
                </span>
            )}
        </div>
    );
}

/**
 * The success heading is a default rather than a `content/home.ts` string on
 * purpose: it only ever renders after a submit, so a copy string for it would
 * be absent from the prerendered HTML and would have to be argued into
 * `NOT_RENDERED` in scripts/verify-home-parity.mjs to keep that gate honest.
 * Both cards say the same thing, so there is nothing for the page to vary.
 */
const SUCCESS_TITLE = "Thanks — we’ve got your details";

export default function EnquiryForm({
    source,
    submitLabel,
    assurances,
    successTitle = SUCCESS_TITLE,
}: {
    /** Matched against the action's own table — see the note above. */
    source: string;
    submitLabel: string;
    assurances: readonly string[];
    successTitle?: string;
}) {
    const [state, formAction, pending] = useActionState(
        submitEnquiry,
        initialFormState,
    );
    const { engaged, engagementProps, errorsFor } = useFormEngagement(state);

    if (state.status === "success") {
        return (
            <div className="rounded-md border border-teal-600/30 bg-teal-500/10 p-8 text-center">
                <p className="font-display text-h5 text-onlight">
                    {successTitle}
                </p>
                <p className="mt-3 text-sm text-onlight-muted">
                    {state.message}
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative" {...engagementProps}>
            <HoneypotFields />
            <input type="hidden" name="form_source" value={source} />

            <div className="flex flex-col gap-3">
                {FIELDS.map((field) => (
                    <FieldRow
                        key={field.name}
                        {...field}
                        errors={errorsFor(field.name)}
                    />
                ))}
            </div>

            {/* The three reassurances, in the order the design lists them —
                one row at every width, as the design draws them.

                Below `sm` they do not fit at their set size: the three labels
                measure 380px of text, against the 240px the card leaves inside
                its padding on a 320px screen. They wrapped to two rows at 390
                and stacked into three at 320. The whole lockup is `vw`-scaled
                instead — type, icon and both gaps — and the labels keep
                `nowrap`, so the row stays a row rather than becoming three
                ragged two-line items. Measured, it clears its container from
                320px up and reaches full size by ~544px, before `sm` takes
                over. Everything from `sm` up is untouched. */}
            <ul className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 max-sm:flex-nowrap max-sm:gap-x-[clamp(0.25rem,1.2vw,1rem)]">
                {assurances.map((text, i) => {
                    const Icon = ASSURANCE_ICONS[i];
                    return (
                        <li
                            key={text}
                            className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.06em] text-onlight-muted uppercase max-sm:gap-[clamp(0.15rem,0.8vw,0.375rem)] max-sm:text-[clamp(0.4rem,2vw,0.68rem)] max-sm:tracking-[0.02em] max-sm:whitespace-nowrap"
                        >
                            {Icon && (
                                <Icon className="h-[0.95rem] w-[0.95rem] shrink-0 text-magenta-500 max-sm:h-[clamp(0.55rem,2.9vw,0.95rem)] max-sm:w-[clamp(0.55rem,2.9vw,0.95rem)]" />
                            )}
                            {text}
                        </li>
                    );
                })}
            </ul>

            {/* No wrapper gap: reCAPTCHA v3 and an idle status banner are both
                zero-height, and a flex gap would still bank space for them —
                a dead band between the assurances and the button. Each of the
                two spaces its own successor instead. */}
            <div className="mt-5 [&>*:not(:last-child)]:mb-3">
                <Recaptcha
                    active={engaged}
                    action="enquiry"
                    tone="light"
                    disclosure={false}
                />
                <FormStatus state={state} tone="light" />
                <button
                    type="submit"
                    disabled={pending}
                    className={cn(
                        "inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full",
                        "bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)]",
                        "bg-[length:160%_100%] bg-[position:0%_50%] hover:bg-[position:100%_50%]",
                        // `px-5` below `sm`: at 32px of inset the proposal
                        // card's longer label ("Submit Your Challenge") wraps
                        // to two lines on a 390px phone, and the arrow ends up
                        // beside a two-line block.
                        "px-5 py-[0.95rem] sm:px-8",
                        "font-display text-[0.9rem] font-bold tracking-[0.08em] text-white uppercase",
                        "shadow-glow transition-[background-position,box-shadow] duration-500",
                        "disabled:pointer-events-none disabled:opacity-45",
                        "[&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:translate-x-[3px]",
                    )}
                >
                    {pending ? "Sending…" : submitLabel}
                    <ArrowIcon />
                </button>
            </div>

            <p className="mt-4 flex gap-2 text-[0.8rem] leading-[1.45] text-onlight-muted">
                <LockIcon className="mt-[0.15rem] h-[0.95rem] w-[0.95rem] shrink-0 text-magenta-500" />
                <span>
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-magenta-500 hover:underline"
                    >
                        Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-magenta-500 hover:underline"
                    >
                        Terms of Service
                    </a>{" "}
                    apply.
                </span>
            </p>
        </form>
    );
}
