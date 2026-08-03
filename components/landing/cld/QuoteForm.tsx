"use client";

import { useActionState } from "react";

import { submitLandingQuote } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import { Field, TextareaField } from "@/components/forms/Field";
import { FormStatus, HoneypotFields, useFormEngagement } from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { quoteDialog } from "@/content/landing/creative-logo-design";

/**
 * The landing page's four-field quote form.
 *
 * One component for both places it appears — the hero offer card and the
 * package dialog — because the live page's two forms have an identical field
 * set and differ only in their submit label. The live page duplicates the
 * markup and the validation for each.
 *
 * `packageName` rides along as a hidden input rather than a schema field, the
 * same arrangement `ProposalForm` uses for `form_source`: the action matches it
 * against the packages the page offers before it reaches an email subject, so a
 * visitor editing it in devtools cannot fail validation on a field they cannot
 * see, and cannot inject a subject line either.
 */
export default function QuoteForm({
    packageName,
    submitLabel = quoteDialog.submit,
    successTitle = quoteDialog.successTitle,
}: {
    packageName?: string;
    submitLabel?: string;
    successTitle?: string;
}) {
    const [state, formAction, pending] = useActionState(submitLandingQuote, initialFormState);
    const { engaged, engagementProps } = useFormEngagement();

    if (state.status === "success") {
        return (
            <div className="rounded-xl border border-teal-500/40 bg-teal-500/10 p-6 text-center">
                <p className="font-display text-h5 font-bold text-white">{successTitle}</p>
                <p className="mt-2 text-sm text-white/70">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative grid gap-4" {...engagementProps}>
            <HoneypotFields />
            {packageName && <input type="hidden" name="package" value={packageName} />}

            <Field
                label={quoteDialog.fullName}
                name="full_name"
                required
                autoComplete="name"
                errors={state.errors?.full_name}
            />
            <Field
                label={quoteDialog.email}
                name="email"
                type="email"
                required
                autoComplete="email"
                errors={state.errors?.email}
            />
            <Field
                label={quoteDialog.phone}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                errors={state.errors?.phone}
            />
            <TextareaField
                label={quoteDialog.message}
                name="message"
                rows={3}
                errors={state.errors?.message}
            />

            <Recaptcha active={engaged} action="landing_quote" />
            <FormStatus state={state} />

            <button type="submit" disabled={pending} className={btn("primary", "lg", "w-full")}>
                {pending ? "Sending…" : submitLabel}
            </button>
        </form>
    );
}
