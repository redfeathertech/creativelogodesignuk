"use client";

import { useActionState } from "react";

import { submitLandingQuote } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import { Field, TextareaField } from "@/components/forms/Field";
import { FormStatus, HoneypotFields, useFormEngagement } from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { quoteDialog } from "@/content/landing/logo-design-offer";

/**
 * The page's four-field enquiry form — hero card, package dialog and footer.
 *
 * All three of the live page's forms have the same field set and differ only in
 * their labels and submit text, so this is one component rather than three; the
 * live bundle ships the markup and the validation three times over.
 *
 * `packageName` and `source` ride along as hidden inputs rather than schema
 * fields, the same arrangement `ProposalForm` uses for `form_source`: the action
 * matches each against a fixed lookup before it reaches an email subject, so a
 * visitor editing them in devtools cannot fail validation on a field they cannot
 * see, and cannot inject a subject line either.
 */
export default function QuoteForm({
    packageName,
    source = "logo-design-offer",
    submitLabel = quoteDialog.submit,
}: {
    packageName?: string;
    source?: string;
    submitLabel?: string;
}) {
    const [state, formAction, pending] = useActionState(submitLandingQuote, initialFormState);
    const { engaged, engagementProps } = useFormEngagement();

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
                errors={state.errors?.full_name}
            />
            <Field
                label={quoteDialog.phone}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                errors={state.errors?.phone}
            />
            <Field
                label={quoteDialog.email}
                name="email"
                type="email"
                required
                autoComplete="email"
                errors={state.errors?.email}
            />
            <TextareaField
                label={quoteDialog.message}
                name="message"
                rows={3}
                errors={state.errors?.message}
            />

            <Recaptcha active={engaged} />
            <FormStatus state={state} />

            <button type="submit" disabled={pending} className={btn("primary", "lg", "w-full")}>
                {pending ? "Sending…" : submitLabel}
            </button>
        </form>
    );
}
