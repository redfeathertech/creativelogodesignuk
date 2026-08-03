/**
 * Server-side reCAPTCHA v2 verification.
 *
 * If RECAPTCHA_SECRET_KEY is not configured the check is skipped, so local
 * development and preview builds work without credentials. Production must set
 * it — `verifyRecaptcha` logs loudly when it is missing so this cannot be
 * shipped unnoticed.
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyRecaptcha(token: string | null): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[recaptcha] RECAPTCHA_SECRET_KEY is not set — captcha checks are disabled.");
    }
    return true;
  }

  if (!token) return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[recaptcha] verification request failed", res.status);
      return false;
    }

    const data: { success?: boolean } = await res.json();
    return data.success === true;
  } catch (error) {
    console.error("[recaptcha] verification threw", error);
    return false;
  }
}
