"use client";

import { useActionState } from "react";

import { submitLandingQuote } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import { Field, TextareaField } from "@/components/forms/Field";
import { FormStatus, HoneypotFields, useFormEngagement } from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { quoteDialog } from "@/content/landing/lp";

/**
 * The page's four-field enquiry form — hero card, package dialog and the
 * contact band.
 *
 * All three of the live page's forms have the same field set and differ only in
 * their submit text, so this is one component rather than three; the live bundle
 * ships the markup and the validation three times over, with three separate
 * copies of the same regex pair.
 *
 * The live inputs carry no `<label>` at all — only placeholders, which fails
 * WCAG 3.3.2 and leaves the field unnamed the moment a value is typed. Every
 * input here has a real floating label.
 *
 * `packageName` and `source` ride along as hidden inputs rather than schema
 * fields, the same arrangement the other landing pages use: the action matches
 * each against a fixed lookup before it reaches an email subject.
 */
export default function QuoteForm({
    packageName,
    source = "lp",
    submitLabel = quoteDialog.submit,
}: {
    packageName?: string;
    source?: string;
    submitLabel?: string;
}) {
    const [state, formAction, pending] = useActionState(submitLandingQuote, initialFormState);
    const { engaged, engagementProps, errorsFor } = useFormEngagement(state);

    if (state.status === "success") {
        return (
            <div className="rounded-xl border border-teal-500/40 bg-teal-500/10 p-6 text-center">
                <p className="font-display text-h5 font-bold text-white">
                    {quoteDialog.successTitle}
                </p>
                <p className="mt-2 text-sm text-white/70">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative grid gap-4" {...engagementProps}>
            <HoneypotFields />
            <input type="hidden" name="form_source" value={source} />
            {packageName && <input type="hidden" name="package" value={packageName} />}

            <Field
                label={quoteDialog.fullName}
                name="full_name"
                required
                autoComplete="name"
                errors={errorsFor("full_name")}
            />
            <Field
                label={quoteDialog.phone}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                errors={errorsFor("phone")}
            />
            <Field
                label={quoteDialog.email}
                name="email"
                type="email"
                required
                autoComplete="email"
                errors={errorsFor("email")}
            />
            <TextareaField
                label={quoteDialog.message}
                name="message"
                rows={3}
                errors={errorsFor("message")}
            />

            <Recaptcha active={engaged} action="landing_quote" />
            <FormStatus state={state} />

            <button type="submit" disabled={pending} className={btn("primary", "lg", "w-full")}>
                {pending ? "Sending…" : submitLabel}
            </button>
        </form>
    );
}
