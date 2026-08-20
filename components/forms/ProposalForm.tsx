"use client";

import { useActionState } from "react";
import { submitProposal } from "@/app/actions/forms";
import { initialFormState } from "@/lib/validation";
import { Field, TextareaField } from "./Field";
import { FormStatus, HoneypotFields, useFormEngagement } from "./FormShell";
import Recaptcha from "./Recaptcha";
import { btn } from "@/components/ui/button";

/**
 * The homepage and the contact page share this form: the redesign gives both
 * the identical field set, so they share the component and differ only in the
 * two strings below.
 *
 * `source` rides along as a hidden input rather than a schema field. The action
 * reads it to label the team's notification email, and never feeds it to
 * `proposalSchema` — so a visitor editing it in devtools cannot fail validation
 * on a field they cannot see.
 */
export default function ProposalForm({
  source,
  successTitle = "Thanks — we’ve got your brief",
}: {
  source?: string;
  successTitle?: string;
} = {}) {
  const [state, formAction, pending] = useActionState(submitProposal, initialFormState);
  const { engaged, engagementProps, errorsFor } = useFormEngagement(state);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-teal-500/40 bg-teal-500/10 p-8 text-center">
        <h3 className="text-h4 text-white">{successTitle}</h3>
        <p className="mt-3 text-sm text-white/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="relative" {...engagementProps}>
      <HoneypotFields />
      {source && <input type="hidden" name="form_source" value={source} />}

      <div className="grid grid-cols-1 gap-4 min-[576px]:grid-cols-2">
        <Field label="First Name" name="first_name" required autoComplete="given-name" errors={errorsFor("first_name")} />
        <Field label="Last Name" name="last_name" required autoComplete="family-name" errors={errorsFor("last_name")} />
        <Field label="Job Title" name="job_title" autoComplete="organization-title" errors={errorsFor("job_title")} />
        <Field label="Company" name="company" autoComplete="organization" errors={errorsFor("company")} />
        <Field label="Email" name="email" type="email" required autoComplete="email" errors={errorsFor("email")} />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" errors={errorsFor("phone")} />

        <TextareaField
          label="What are your business goals?"
          name="business_goals"
          rows={4}
          errors={errorsFor("business_goals")}
          className="col-span-full"
        />

        <div className="col-span-full flex flex-col gap-4">
          <Recaptcha active={engaged} action="proposal" />
          <FormStatus state={state} />
          <button type="submit" disabled={pending} className={btn("primary", "lg", "w-full")}>
            {pending ? "Sending…" : "Submit Now"}
          </button>
        </div>
      </div>
    </form>
  );
}
