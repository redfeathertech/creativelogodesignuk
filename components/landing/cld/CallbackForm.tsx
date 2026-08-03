"use client";

import { useActionState } from "react";

import { submitCallback } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import { Field } from "@/components/forms/Field";
import { FormStatus, HoneypotFields, useFormEngagement } from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { footer } from "@/content/landing/creative-logo-design";

/** The landing page footer's "Request a Callback" form: a name and a number. */
export default function CallbackForm() {
    const [state, formAction, pending] = useActionState(submitCallback, initialFormState);
    const { engaged, engagementProps } = useFormEngagement();

    if (state.status === "success") {
        return (
            <div className="rounded-xl border border-teal-500/40 bg-teal-500/10 p-6 text-center">
                <p className="font-display text-h5 font-bold text-white">
                    {footer.callback.success}
                </p>
                <p className="mt-2 text-sm text-white/70">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative grid gap-4" {...engagementProps}>
            <HoneypotFields />

            <Field
                label={footer.callback.name}
                name="full_name"
                required
                autoComplete="name"
                errors={state.errors?.full_name}
            />
            <Field
                label={footer.callback.phone}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                errors={state.errors?.phone}
            />

            <Recaptcha active={engaged} action="callback" />
            <FormStatus state={state} />

            <button type="submit" disabled={pending} className={btn("primary", "lg", "w-full")}>
                {pending ? "Sending…" : footer.callback.submit}
            </button>
        </form>
    );
}
