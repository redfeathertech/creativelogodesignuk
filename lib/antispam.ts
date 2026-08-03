/**
 * Honeypot + fill-time anti-spam, carried over from the Laravel forms.
 *
 * Two cheap checks that catch naive bots without adding friction:
 *   1. A hidden field a human never sees and never fills in.
 *   2. A render timestamp — a form submitted implausibly fast was not typed
 *      by a person.
 *
 * The timestamp is stamped by the browser on mount rather than signed by the
 * server, because the homepage is statically prerendered: a build-time token
 * would be stale for every visitor after the first couple of hours. That makes
 * the timing check forgeable in principle, which is fine — reCAPTCHA is the
 * real gate, and these two run first purely to reject obvious junk cheaply.
 */

const MIN_FILL_MS = 2_000;
const MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12 hours — a long-lived open tab is legitimate.

export const HONEYPOT_FIELD = "hp_company_url";
export const TIMESTAMP_FIELD = "hp_ts";

export type AntiSpamResult = { ok: true } | { ok: false; reason: string };

export function checkAntiSpam(formData: FormData, now: number): AntiSpamResult {
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "");
  if (honeypot.trim() !== "") return { ok: false, reason: "honeypot" };

  const raw = String(formData.get(TIMESTAMP_FIELD) ?? "");
  const issued = Number(raw);

  // Absent or unparseable: skip the timing check rather than block a real
  // person whose JS failed. reCAPTCHA still has to pass.
  if (!raw || !Number.isFinite(issued)) return { ok: true };

  const elapsed = now - issued;
  // Clock skew can make `elapsed` negative; only reject when it is clearly
  // inside the window and too fast.
  if (elapsed >= 0 && elapsed < MIN_FILL_MS) return { ok: false, reason: "too-fast" };
  if (elapsed > MAX_AGE_MS) return { ok: false, reason: "expired" };

  return { ok: true };
}
