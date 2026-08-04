/**
 * Honeypot anti-spam, carried over from the Laravel forms.
 *
 * One cheap check: a hidden field a human never sees and never fills in. It
 * runs ahead of reCAPTCHA purely to reject obvious junk without spending a
 * siteverify round-trip — reCAPTCHA is the real gate.
 *
 * The field *name* matters more than it looks, and is the reason this file no
 * longer says `hp_company_url`. Chrome classifies form fields by regex over
 * `name`/`id`/`label`, and has ignored `autocomplete="off"` for contact
 * profiles for a decade — so a trap whose name contains `company` is filled
 * alongside the real Company field for every visitor with a saved profile.
 * That is a rejected lead, not a caught bot. Keep this name free of anything
 * an autofill heuristic recognises: company, name, email, phone, address,
 * url, title, organization.
 *
 * The fill-time check that used to live here is gone. It was stamped by the
 * browser (the pages are prerendered, so a server-issued token would be stale
 * for everyone after the first couple of hours), which made it forgeable by
 * design; and because React 19 resets an uncontrolled form once its action
 * resolves, the mount-effect that wrote the stamp never re-ran and the field
 * was empty — and therefore skipped — on every attempt after the first.
 */

export const HONEYPOT_FIELD = "hp_field";

export type AntiSpamResult = { ok: true } | { ok: false; value: string };

export function checkAntiSpam(formData: FormData): AntiSpamResult {
  const value = String(formData.get(HONEYPOT_FIELD) ?? "").trim();
  return value === "" ? { ok: true } : { ok: false, value };
}
