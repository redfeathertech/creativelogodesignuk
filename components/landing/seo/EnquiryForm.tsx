"use client";

import { useActionState } from "react";

import { submitSeoEnquiry } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import { Field, TextareaField } from "@/components/forms/Field";
import { FormStatus, HoneypotFields, useFormEngagement } from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { heroForm } from "@/content/landing/seo-services";

/**
 * The page's six-field enquiry form — the hero card and the CTA dialog both
 * render it.
 *
 * The field set is the live form's, unchanged: two name fields and a free-text
 * subject, which no other form on this site collects. What is new is that every
 * input has a real `<label>`. The live inputs carry placeholders only, which
 * fails WCAG 3.3.2 and leaves each field unnamed the moment a value is typed —
 * the same defect the other three landing pages had.
 *
 * `tone="light"` on every control: this is the only light-canvas page in the
 * build, and the default dark styling is invisible on it.
 *
 * `packageName` rides in a hidden input rather than the schema, matching the
 * other landing pages — the action matches it against a `Set` built from the
 * content module before it can reach an email subject line.
 */
export default function EnquiryForm({
    packageName,
    submitLabel = heroForm.submit,
}: {
    packageName?: string;
    submitLabel?: string;
}) {
    const [state, formAction, pending] = useActionState(submitSeoEnquiry, initialFormState);
    const { engaged, engagementProps } = useFormEngagement();

    if (state.status === "success") {
        return (
            <div className="rounded-xl border border-emerald-600/40 bg-emerald-50 p-6 text-center">
                <p className="font-display text-h5 font-bold text-seo-ink">
                    {heroForm.successTitle}
                </p>
                <p className="mt-2 text-sm text-seo-body">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative grid gap-4" {...engagementProps}>
            <HoneypotFields />
            {packageName && <input type="hidden" name="package" value={packageName} />}

            <div className="grid gap-4 sm:grid-cols-2">
                <Field
                    tone="light"
                    label={heroForm.firstName}
                    name="first_name"
                    required
                    autoComplete="given-name"
                    errors={state.errors?.first_name}
                />
                <Field
                    tone="light"
                    label={heroForm.lastName}
                    name="last_name"
                    required
                    autoComplete="family-name"
                    errors={state.errors?.last_name}
                />
            </div>

            <Field
                tone="light"
                label={heroForm.email}
                name="email"
                type="email"
                required
                autoComplete="email"
                errors={state.errors?.email}
            />
            <Field
                tone="light"
                label={heroForm.subject}
                name="subject"
                required
                errors={state.errors?.subject}
            />
            <Field
                tone="light"
                label={heroForm.phone}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                errors={state.errors?.phone}
            />
            <TextareaField
                tone="light"
                label={heroForm.message}
                name="message"
                rows={5}
                required
                errors={state.errors?.message}
            />

            <Recaptcha active={engaged} action="seo_enquiry" />
            <FormStatus state={state} tone="light" />

            <button type="submit" disabled={pending} className={btn("seo", "lg", "w-full")}>
                {pending ? "Sending…" : submitLabel}
            </button>
        </form>
    );
}
