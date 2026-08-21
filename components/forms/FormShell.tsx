"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HONEYPOT_FIELD } from "@/lib/antispam";
import {
  checkboxGroups,
  fieldKey,
  FOCUS_ATTR,
  normaliseControl,
  validatableControls,
  validateControl,
  VALID_ATTR,
  type ValidatableControl,
} from "@/lib/form-rules";
import type { FormState } from "@/lib/validation";

/**
 * Shared plumbing for every form on the site: the honeypot, the "has the user
 * engaged yet" flag that gates the reCAPTCHA download, and the single
 * browser-side validation handler.
 */

type FieldErrors = Record<string, string[]>;

/** Shared empty set, so the "no dismissals" path allocates nothing per render. */
const EMPTY_KEYS: ReadonlySet<string> = new Set();

/** Focus a control without the browser's own jump, then bring it into view. */
function revealAndFocus(el: HTMLElement) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  el.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "center",
  });
  el.focus({ preventScroll: true });
}

/**
 * The element a failed control should send the visitor to.
 *
 * A hidden input cannot take focus, so `components/forms/Select` points at its
 * own trigger button with `data-focus-target`.
 */
function focusTargetFor(el: ValidatableControl): HTMLElement {
  const id = el.getAttribute(FOCUS_ATTR);
  const target = id && document.getElementById(id);
  return target instanceof HTMLElement ? target : el;
}

/**
 * Engagement + validation for one form.
 *
 * There is exactly one of these, spread onto every `<form>` in the project, so
 * the rules cannot drift between the twelve forms — they are enforced here,
 * from `lib/form-rules.ts`, which the Zod schemas read too.
 *
 * The handlers are attached to the form, not to each input: `focusout` and
 * `input` both bubble, so one listener covers however many fields a page's form
 * happens to have and no caller has to remember to wire a field up.
 *
 * ### When a message appears
 *
 * Not while the visitor is still typing a field for the first time — a "Enter a
 * valid email address" under a box that currently reads "a" is noise, and it is
 * the single most common thing forms get wrong. A field is *touched* once it
 * has been left, or once a submit has been attempted; only then does it show a
 * message. After that it re-checks on every keystroke, so the message clears
 * the moment the value is fixed rather than on the next blur.
 *
 * ### What the browser is allowed to say
 *
 * Nothing. The form carries `noValidate`, so the platform's own bubbles are
 * off and every message on the site is one of ours, in one voice, in one place
 * under the field — instead of half the fields showing a native tooltip that
 * vanishes on the next click and is invisible to a screen reader.
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
  /**
   * Fields whose server message the visitor has since answered.
   *
   * Without this a "Required" from the action would sit under a field they
   * have just filled in, because a passing field contributes no client message
   * to override it.
   *
   * It carries the response it was collected against. A new `state` is a new
   * verdict on newly posted values, so the old dismissals stop applying the
   * moment the object identity changes — no reset, and no second render to
   * perform one.
   */
  const [resolved, setResolved] = useState<{
    owner: FormState | undefined;
    keys: ReadonlySet<string>;
  }>({ owner: state, keys: new Set() });
  const touched = useRef<Set<string>>(new Set());
  const submitted = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const setError = useCallback((key: string, message: string | null) => {
    setClientErrors((prev) => {
      const current = prev[key]?.[0];
      if (current === message || (!current && !message)) return prev;
      const next = { ...prev };
      if (message) next[key] = [message];
      else delete next[key];
      return next;
    });
  }, []);

  /**
   * Paint — or clear — the success state on one control.
   *
   * A tick means "this is answered and it is right", so it needs both halves:
   * a message-free *and* non-empty field the visitor has actually been in. An
   * empty optional box has nothing to be right about, and a green outline on a
   * field nobody has touched is decoration pretending to be feedback.
   */
  const markValid = useCallback((el: ValidatableControl, valid: boolean) => {
    /* Painted on the element the visitor can see. For every real input that is
       the input itself; for the custom dropdown it is the trigger button the
       hidden input already points at, since a hidden input has no border to
       turn green. */
    const target = focusTargetFor(el);
    if (valid) target.setAttribute(VALID_ATTR, "true");
    else target.removeAttribute(VALID_ATTR);
  }, []);

  /**
   * Re-check one control.
   *
   * `announce` is false while a field is still untouched: a new message is
   * withheld, but an existing one is always cleared as soon as the value is
   * good. Errors should be easy to get rid of and hard to trip over.
   */
  const checkControl = useCallback(
    (el: ValidatableControl, announce: boolean) => {
      const key = fieldKey(el.name);
      const message = validateControl(el);

      markValid(el, !message && announce && el.value.trim() !== "");

      if (message && !announce) return;
      setError(key, message);
      if (!message) {
        setResolved((prev) => {
          if (prev.owner !== state) return { owner: state, keys: new Set([key]) };
          if (prev.keys.has(key)) return prev;
          return { owner: state, keys: new Set(prev.keys).add(key) };
        });
      }
    },
    [markValid, setError, state],
  );

  const handleFieldEvent = useCallback(
    (event: React.SyntheticEvent, markTouched: boolean) => {
      const el = event.target;
      if (
        !(el instanceof HTMLInputElement) &&
        !(el instanceof HTMLTextAreaElement) &&
        !(el instanceof HTMLSelectElement)
      ) {
        return;
      }
      if (!el.name || el.name === HONEYPOT_FIELD) return;

      const key = fieldKey(el.name);

      /* A checkbox or radio belongs to its group, which only the submit pass
         and the post-render sweep below can judge. Ticking one is an answer,
         though, so its group's message goes. */
      if (
        el instanceof HTMLInputElement &&
        (el.type === "checkbox" || el.type === "radio")
      ) {
        if (el.checked) setError(key, null);
        return;
      }

      /* The dropdown posts through a hidden input, which is never focused and
         so is never left. Its value can only change because the visitor picked
         an option, and picking one is an answer — so that counts as touching
         it, and its message and tick behave like every other field. */
      const chosen = el instanceof HTMLInputElement && el.type === "hidden";
      if (chosen) touched.current.add(key);

      if (markTouched) {
        touched.current.add(key);
        /* Tidy the box the visitor has just left: ends trimmed, double spaces
           collapsed. Only the whitespace — a phone number keeps its separators
           until submit, when `normaliseControl` strips them for the action. */
        normaliseControl(el, { stripPhone: false });
      }
      checkControl(el, touched.current.has(key) || submitted.current);
    },
    [checkControl, setError],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const form = event.currentTarget;
      const found: FieldErrors = {};
      let firstInvalid: HTMLElement | null = null;

      submitted.current = true;

      for (const el of validatableControls(form, HONEYPOT_FIELD)) {
        /* Before the check, not after: the value the action receives is the
           normalised one, so no visitor is ever rejected for punctuation this
           was about to remove. Nothing is lost — the boxes keep their values
           either way, this only tidies them. */
        normaliseControl(el);

        const message = validateControl(el);
        markValid(el, !message && el.value.trim() !== "");
        if (message) {
          const key = fieldKey(el.name);
          /* First message wins: two controls can share a key only when the
             markup is wrong, and silently overwriting would hide it. */
          found[key] ??= [message];
          firstInvalid ??= focusTargetFor(el);
        }
      }

      for (const group of checkboxGroups(form, HONEYPOT_FIELD)) {
        if (group.boxes.some((box) => box.checked)) continue;
        found[fieldKey(group.name)] = [group.message];
        firstInvalid ??= group.boxes[0];
      }

      setClientErrors(found);

      if (firstInvalid) {
        event.preventDefault();
        /* Sixty fields on /website-brief: focus alone can leave the message
           off-screen, which reads as a submit button that does nothing. The
           values all stay put — nothing is cleared on a failed submit. */
        revealAndFocus(firstInvalid);
      }
    },
    [markValid],
  );

  /**
   * A rejected submission should land the visitor on the first thing to fix.
   *
   * `state` only changes when the action has answered, so this runs once per
   * response. It touches the DOM and nothing else — the dismissals from the
   * previous round are dropped by `resolved`'s owner check below rather than
   * by a setState here, which would cost every form an extra render.
   */
  useEffect(() => {
    if (state?.status !== "error" || !state.errors) return;

    submitted.current = true;

    const form = formRef.current;
    if (!form) return;

    for (const el of validatableControls(form, HONEYPOT_FIELD)) {
      if (state.errors[fieldKey(el.name)]) {
        revealAndFocus(focusTargetFor(el));
        return;
      }
    }
  }, [state]);

  const engagementProps = {
    ref: formRef,
    /* Ours are the only messages: see the note above. */
    noValidate: true,
    // Any focus or pointer press inside the form counts as intent to submit.
    onFocus: () => setEngaged(true),
    onPointerDown: () => setEngaged(true),
    // focusout, in React's delegated form — it bubbles, unlike native blur.
    onBlur: (e: React.FocusEvent) => handleFieldEvent(e, true),
    // Clears a message as soon as the visitor fixes the value.
    onInput: (e: React.FormEvent) => handleFieldEvent(e, false),
    onChange: (e: React.FormEvent) => handleFieldEvent(e, false),
    onSubmit: handleSubmit,
  };

  /* Client messages win: they describe the value in the box right now, where a
     server message describes the one that was posted — and a server message
     the visitor has since answered is dropped outright. */
  const dismissed = resolved.owner === state ? resolved.keys : EMPTY_KEYS;
  const serverErrors: FieldErrors = Object.fromEntries(
    Object.entries(state?.errors ?? {}).filter(([key]) => !dismissed.has(key)),
  );
  const fieldErrors: FieldErrors = { ...serverErrors, ...clientErrors };
  const errorsFor = (name: string): string[] | undefined =>
    fieldErrors[fieldKey(name)];

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
