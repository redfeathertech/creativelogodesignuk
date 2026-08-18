"use client";

import { useActionState, useId } from "react";

import { submitHeroEnquiry } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import {
    FormStatus,
    HoneypotFields,
    useFormEngagement,
} from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { hero } from "@/content/home";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/icons";
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
} from "./heroIcons";

/**
 * The hero card's enquiry form — a light card on the hero's dark canvas, so it
 * cannot reuse the shared dark `Field`. Five fields rather than the proposal
 * form's seven: this one sits in the fold, and every extra row pushes the card
 * past it on a laptop.
 *
 * Labels are real `<label>`s, rendered `sr-only` because the design puts the
 * label text inside the control. The visible copy is the placeholder, so the
 * two always read the same string — a placeholder-only field (what the live
 * site ships) leaves screen-reader users with unnamed inputs, WCAG 3.3.2.
 */

const CONTROL =
    "w-full rounded-md border border-mist-300 bg-white py-3 ps-11 pe-4 text-[0.95rem] text-onlight " +
    "placeholder:text-mist-500 transition-[border-color,box-shadow] duration-200 ease-out " +
    "focus:border-magenta-500 focus:outline-none focus:shadow-[0_0_0_3px_rgb(204_6_127/0.15)] " +
    "aria-[invalid=true]:border-red-500";

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
}: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    errors?: string[];
    icon: (p: { className?: string }) => React.ReactElement;
    textarea?: boolean;
}) {
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
            {hasError && (
                <span id={errorId} className="mt-1 block text-xs text-red-600">
                    {errors![0]}
                </span>
            )}
        </div>
    );
}

const ASSURANCE_ICONS = [NoObligationIcon, QuickResponseIcon, ConfidentialIcon];

export default function HeroEnquiryForm() {
    const [state, formAction, pending] = useActionState(
        submitHeroEnquiry,
        initialFormState,
    );
    const { engaged, engagementProps } = useFormEngagement();

    if (state.status === "success") {
        return (
            <div className="rounded-md border border-teal-600/30 bg-teal-500/10 p-8 text-center">
                <p className="font-display text-h5 text-onlight">
                    Thanks — we’ve got your details
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

            <div className="flex flex-col gap-3">
                <FieldRow
                    label="Your Name"
                    name="full_name"
                    required
                    autoComplete="name"
                    icon={UserFieldIcon}
                    errors={state.errors?.full_name}
                />
                <FieldRow
                    label="Phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    icon={PhoneFieldIcon}
                    errors={state.errors?.phone}
                />
                <FieldRow
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    icon={MailFieldIcon}
                    errors={state.errors?.email}
                />
                <FieldRow
                    label="Required Service"
                    name="required_service"
                    icon={ServiceFieldIcon}
                    errors={state.errors?.required_service}
                />
                <FieldRow
                    label="What is your project &amp; business goals?"
                    name="project_goals"
                    icon={NoteFieldIcon}
                    textarea
                    errors={state.errors?.project_goals}
                />
            </div>

            {/* The three reassurances, in the same order as the design. */}
            <ul className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                {hero.form.assurances.map((text, i) => {
                    const Icon = ASSURANCE_ICONS[i];
                    return (
                        <li
                            key={text}
                            className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.06em] text-onlight-muted uppercase"
                        >
                            <Icon className="h-[0.95rem] w-[0.95rem] text-magenta-500" />
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
                    action="hero_enquiry"
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
                        "px-8 py-[0.95rem] font-display text-[0.9rem] font-bold tracking-[0.08em] text-white uppercase",
                        "shadow-glow transition-[background-position,box-shadow] duration-500",
                        "disabled:pointer-events-none disabled:opacity-45",
                        "[&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:translate-x-[3px]",
                    )}
                >
                    {pending ? "Sending…" : hero.form.submit}
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
