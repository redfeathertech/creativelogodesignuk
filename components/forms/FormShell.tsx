"use client";

import { useId, useState } from "react";
import { HONEYPOT_FIELD } from "@/lib/antispam";
import type { FormState } from "@/lib/validation";

/**
 * Shared plumbing for both forms: the honeypot, and the "has the user engaged
 * yet" flag that gates the reCAPTCHA download.
 */

export function useFormEngagement() {
  const [engaged, setEngaged] = useState(false);

  // Any focus or pointer press inside the form counts as intent to submit.
  const engagementProps = {
    onFocus: () => setEngaged(true),
    onPointerDown: () => setEngaged(true),
  };

  return { engaged, engagementProps };
}

/**
 * The hidden honeypot input. Rendered inside every form.
 *
 * The `id` is generated, not the field name: any page with more than one form
 * renders this more than once, and a hardcoded id would be duplicated across
 * all of them — invalid HTML, and it silently breaks the `<label>` association
 * for every copy after the first. `/creative-logo-design` has three forms.
 *
 * The `name` stays `HONEYPOT_FIELD` regardless — that is what `checkAntiSpam`
 * reads off the FormData.
 */
export function HoneypotFields() {
  const id = useId();
  const honeypotId = `${HONEYPOT_FIELD}-${id}`;

  return (
    /* Positioned off-screen rather than display:none — some bots skip hidden
       inputs but happily fill visually-offset ones. That choice is also why
       the field has to be invisible to *autofill*, which does not skip an
       off-screen field the way it skips a display:none one: hence the name
       (see lib/antispam.ts) and the three opt-outs below, for 1Password,
       LastPass and Dashlane. They fill harder than the browser does and do not
       all honour autocomplete="off". */
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={honeypotId}>Leave this field empty</label>
      <input
        id={honeypotId}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        data-1p-ignore
        data-lpignore="true"
        data-form-type="other"
      />
    </div>
  );
}

/**
 * Result banner. Uses aria-live so the outcome is announced.
 *
 * `tone` matches `Field`'s: "light" exists for `/seo-services`, the only
 * light-canvas page. The dark banner's teal-on-translucent reads at roughly
 * 1.4:1 on white, so it is not a cosmetic variant.
 */
export function FormStatus({
  state,
  tone = "dark",
}: {
  state: FormState;
  tone?: "dark" | "light";
}) {
  if (state.status === "idle" || !state.message) {
    return <div aria-live="polite" className="sr-only" />;
  }

  const ok = state.status === "success";
  const cls = ok
    ? tone === "light"
      ? "rounded-md border border-emerald-600/40 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
      : "rounded-md border border-teal-500/40 bg-teal-500/10 px-4 py-3 text-sm text-teal-300"
    : tone === "light"
      ? "rounded-md border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700"
      : "rounded-md border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200";

  return (
    <div aria-live="polite" role={ok ? "status" : "alert"} className={cls}>
      {state.message}
    </div>
  );
}
