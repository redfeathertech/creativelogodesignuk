"use client";

import { useCallback, useId, useState } from "react";
import { HONEYPOT_FIELD } from "@/lib/antispam";
import { ruleFor, validateValue } from "@/lib/form-rules";
import type { FormState } from "@/lib/validation";

/**
 * Shared plumbing for every form on the site: the honeypot, the "has the user
 * engaged yet" flag that gates the reCAPTCHA download, and the single
 * browser-side validation handler.
 */

type FieldErrors = Record<string, string[]>;

/** Every control in the form this handler has a rule for. */
function ruledControls(form: HTMLFormElement) {
  return Array.from(form.elements).filter(
    (el): el is HTMLInputElement =>
      el instanceof HTMLInputElement &&
      Boolean(el.name) &&
      el.name !== HONEYPOT_FIELD &&
      ruleFor(el.name, el.type) !== null,
  );
}

/**
 * Engagement + validation for one form.
 *
 * There is exactly one of these, spread onto every `<form>` in the project, so
 * the name and phone rules cannot drift between the twelve forms — they are
 * enforced here, from `lib/form-rules.ts`, which the Zod schemas read too.
 *
 * The handlers are attached to the form, not to each input: `focusout` and
 * `input` both bubble, so one listener covers however many fields a page's form
 * happens to have and no caller has to remember to wire a field up.
 *
 * `onSubmit` runs before React hands the submission to the Server Action, so
 * `preventDefault()` there stops the request from ever leaving the browser. The
 * server still re-validates — the browser is a courtesy, never the gate.
 *
 * Pass the `useActionState` state in so the returned `errorsFor` is the one
 * place a field asks for its message, whichever side produced it.
 */
export function useFormEngagement(state?: FormState) {
  const [engaged, setEngaged] = useState(false);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});

  /** Re-check one control and add or drop its message. */
  const checkControl = useCallback((el: HTMLInputElement) => {
    const message = validateValue(el.name, el.value, {
      required: el.required,
      inputType: el.type,
    });
    setClientErrors((prev) => {
      const current = prev[el.name]?.[0];
      if (current === message || (!current && !message)) return prev;
      const next = { ...prev };
      if (message) next[el.name] = [message];
      else delete next[el.name];
      return next;
    });
  }, []);

  const handleFieldEvent = useCallback(
    (event: React.SyntheticEvent) => {
      const el = event.target;
      if (el instanceof HTMLInputElement && ruleFor(el.name, el.type)) {
        checkControl(el);
      }
    },
    [checkControl],
  );

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const found: FieldErrors = {};
    let firstInvalid: HTMLInputElement | null = null;

    for (const el of ruledControls(form)) {
      const message = validateValue(el.name, el.value, {
        required: el.required,
        inputType: el.type,
      });
      if (message) {
        found[el.name] = [message];
        firstInvalid ??= el;
      }
    }

    setClientErrors(found);

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
    }
  }, []);

  const engagementProps = {
    // Any focus or pointer press inside the form counts as intent to submit.
    onFocus: () => setEngaged(true),
    onPointerDown: () => setEngaged(true),
    // focusout, in React's delegated form — it bubbles, unlike native blur.
    onBlur: handleFieldEvent,
    // Clears a message as soon as the visitor fixes the value.
    onInput: handleFieldEvent,
    onSubmit: handleSubmit,
  };

  /* Client messages win: they describe the value in the box right now, where a
     server message describes the one that was posted. */
  const fieldErrors: FieldErrors = { ...state?.errors, ...clientErrors };
  const errorsFor = (name: string): string[] | undefined => fieldErrors[name];

  return { engaged, engagementProps, fieldErrors, errorsFor };
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
