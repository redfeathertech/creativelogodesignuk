"use client";

import { useActionState } from "react";

import { submitLogoBrief } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import {
    FormStatus,
    HoneypotFields,
    useFormEngagement,
} from "@/components/forms/FormShell";
import Recaptcha from "@/components/forms/Recaptcha";
import { btn } from "@/components/ui/button";
import { BriefSectionBlock } from "@/components/landing/brief/fields";
import { sections, submitLabel, successTitle } from "@/content/landing/logo-brief";

/**
 * The logo brief's eighteen fields, one section.
 *
 * Everything visible is driven by `sections`, so the copy has exactly one home
 * and scripts/verify-brief-parity.py has one file to diff.
 *
 * The `action` passed to `<Recaptcha>` MUST stay `logo_brief` — it is what
 * `submitLogoBrief` asks siteverify to echo back, and a mismatch rejects
 * every submission with a message that blames the visitor's browser.
 */
export default function LogoBriefForm() {
    const [state, formAction, pending] = useActionState(
        submitLogoBrief,
        initialFormState,
    );
    const { engaged, engagementProps } = useFormEngagement();

    if (state.status === "success") {
        return (
            <div className="rounded-xl border border-emerald-600/40 bg-emerald-50 p-6 text-center">
                <p className="font-display text-lg font-bold text-onlight">
                    {successTitle}
                </p>
                <p className="mt-2 text-sm text-onlight-muted">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="relative" {...engagementProps}>
            <HoneypotFields />

            {sections.map((section) => (
                <BriefSectionBlock
                    key={section.title}
                    section={section}
                    errors={state.errors}
                />
            ))}

            <div className="mt-8 grid gap-4">
                <Recaptcha active={engaged} action="logo_brief" tone="light" />
                <FormStatus state={state} tone="light" />
                <button
                    type="submit"
                    disabled={pending}
                    className={btn("primary", "lg", "w-full")}
                >
                    {pending ? "Sending…" : submitLabel}
                </button>
            </div>
        </form>
    );
}
