"use client";

import { useActionState } from "react";
import { submitLead } from "@/app/actions/forms";
import { initialFormState, HELP_OPTIONS, SOURCE_OPTIONS } from "@/lib/validation";
import { Field, TextareaField, SelectField } from "./Field";
import { FormStatus, HoneypotFields, useFormEngagement } from "./FormShell";
import Recaptcha from "./Recaptcha";
import { btn } from "@/components/ui/button";

export default function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialFormState);
  const { engaged, engagementProps } = useFormEngagement();

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-teal-500/40 bg-teal-500/10 p-6">
        <h3 className="text-h5 text-white">Thanks — message received</h3>
        <p className="mt-2 text-sm text-white/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="relative" {...engagementProps}>
      <HoneypotFields />

      <div className="grid grid-cols-1 gap-4 min-[576px]:grid-cols-2">
        <Field label="First Name" name="first_name" required autoComplete="given-name" errors={state.errors?.first_name} />
        <Field label="Last Name" name="last_name" required autoComplete="family-name" errors={state.errors?.last_name} />
        <Field label="Email" name="email" type="email" required autoComplete="email" errors={state.errors?.email} />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" errors={state.errors?.phone} />
        <Field label="Company" name="company" required autoComplete="organization" errors={state.errors?.company} />
        <SelectField label="How did you hear about us?" name="source" options={SOURCE_OPTIONS} required errors={state.errors?.source} />

        <fieldset className="col-span-full m-0 border-0 p-0">
          <legend className="mb-3 font-display text-xs font-bold tracking-[0.14em] text-white/50 uppercase">
            Help my business
          </legend>
          <div className="flex flex-wrap gap-2">
            {HELP_OPTIONS.map((option) => (
              <label
                key={option}
                className="cursor-pointer rounded-full border border-white/[0.11] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 has-checked:border-transparent has-checked:bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] has-checked:text-white"
              >
                <input type="checkbox" name="help" value={option} className="sr-only" />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <TextareaField
          label="Project details"
          name="project_details"
          rows={3}
          errors={state.errors?.project_details}
          className="col-span-full"
        />

        <div className="col-span-full flex flex-col gap-4">
          <Recaptcha active={engaged} action="lead" />
          <FormStatus state={state} />
          <button type="submit" disabled={pending} className={btn("primary", "lg", "w-full")}>
            {pending ? "Sending…" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
