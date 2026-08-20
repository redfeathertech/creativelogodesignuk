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
 * Every control runs the DEFAULT dark tone. The 2026-08 redesign moved this
 * page off the live template's white canvas onto the same near-black service
 * surface every other inner page uses, so the `tone="light"` overrides this
 * file used to carry are gone.
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
    const { engaged, engagementProps, errorsFor } = useFormEngagement(state);

    if (state.status === "success") {
        return (
            <div className="rounded-lg border border-teal-500/40 bg-teal-500/8 p-6 text-center">
                <p className="font-display text-h5 font-bold text-white">
                    {heroForm.successTitle}
                </p>
                <p className="mt-2 text-sm text-white/65">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative grid gap-4" {...engagementProps}>
            <HoneypotFields />
            {packageName && <input type="hidden" name="package" value={packageName} />}

            <div className="grid gap-4 sm:grid-cols-2">
                <Field
                    label={heroForm.firstName}
                    name="first_name"
                    required
                    autoComplete="given-name"
                    errors={errorsFor("first_name")}
                />
                <Field
                    label={heroForm.lastName}
                    name="last_name"
                    required
                    autoComplete="family-name"
                    errors={errorsFor("last_name")}
                />
            </div>

            <Field
                label={heroForm.email}
                name="email"
                type="email"
                required
                autoComplete="email"
                errors={errorsFor("email")}
            />
            <Field
                label={heroForm.subject}
                name="subject"
                required
                errors={errorsFor("subject")}
            />
            <Field
                label={heroForm.phone}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                errors={errorsFor("phone")}
            />
            <TextareaField
                label={heroForm.message}
                name="message"
                rows={5}
                required
                errors={errorsFor("message")}
            />

            <Recaptcha active={engaged} action="seo_enquiry" />
            <FormStatus state={state} />

            <button type="submit" disabled={pending} className={btn("primary", "lg", "w-full")}>
                {pending ? "Sending…" : submitLabel}
            </button>
        </form>
    );
}
