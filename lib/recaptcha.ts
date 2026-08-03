/**
 * Server-side reCAPTCHA v3 verification.
 *
 * v3 differs from v2 in three ways that matter here:
 *
 *  1. There is no widget and no pass/fail. Every submission returns a `score`
 *     from 0.0 (almost certainly a bot) to 1.0 (almost certainly a human), and
 *     it is this code's job to pick the threshold. Google's own default is 0.5;
 *     `RECAPTCHA_MIN_SCORE` overrides it without a redeploy if the live traffic
 *     turns out to sit lower.
 *  2. The token is bound to an *action* name chosen by the client. Verifying it
 *     is what stops a token minted on a cheap page being replayed against a
 *     form, so the action is checked here against a value the caller passes in
 *     — never against anything read out of the FormData.
 *  3. Tokens expire two minutes after they are issued. An expired one comes
 *     back as `success: false` with `timeout-or-duplicate`, which is a real
 *     rejection but a recoverable one, so it is logged distinctly from a
 *     genuine bot verdict.
 *
 * If RECAPTCHA_SECRET_KEY is not configured the check is skipped, so local
 * development and preview builds work without credentials. Production must set
 * it — `verifyRecaptcha` logs loudly when it is missing so this cannot be
 * shipped unnoticed.
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const DEFAULT_MIN_SCORE = 0.5;

/** Parsed once. An unparseable or out-of-range value falls back to the default. */
const MIN_SCORE = (() => {
    const raw = Number(process.env.RECAPTCHA_MIN_SCORE);
    return Number.isFinite(raw) && raw >= 0 && raw <= 1
        ? raw
        : DEFAULT_MIN_SCORE;
})();

interface SiteverifyResponse {
    success?: boolean;
    score?: number;
    action?: string;
    challenge_ts?: string;
    hostname?: string;
    "error-codes"?: string[];
}

/**
 * @param token          the value of the `g-recaptcha-response` field
 * @param expectedAction the action this form mints its token under. Must come
 *                       from the server action itself, not from the request.
 */
export async function verifyRecaptcha(
    token: string | null,
    expectedAction: string,
): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
        if (process.env.NODE_ENV === "production") {
            console.error(
                "[recaptcha] RECAPTCHA_SECRET_KEY is not set — captcha checks are disabled.",
            );
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
            console.error(
                "[recaptcha] verification request failed",
                res.status,
            );
            return false;
        }

        const data: SiteverifyResponse = await res.json();

        if (data.success !== true) {
            const codes = data["error-codes"] ?? [];
            // An expired or already-spent token is the one failure a real
            // person hits; everything else means the token was never valid.
            if (codes.includes("timeout-or-duplicate")) {
                console.warn("[recaptcha] token expired or already used");
            } else {
                console.warn("[recaptcha] verification rejected", codes);
            }
            return false;
        }

        // A v2 secret answering a v3 request returns success with no score. Do
        // not silently treat that as a pass — it would disable scoring outright.
        if (typeof data.score !== "number") {
            console.error(
                "[recaptcha] response carried no score — are these v2 keys?",
            );
            return false;
        }

        if (data.action !== expectedAction) {
            console.warn(
                `[recaptcha] action mismatch: got "${data.action}", expected "${expectedAction}"`,
            );
            return false;
        }

        if (data.score < MIN_SCORE) {
            console.warn(
                `[recaptcha] score ${data.score} below threshold ${MIN_SCORE}`,
            );
            return false;
        }

        return true;
    } catch (error) {
        console.error("[recaptcha] verification threw", error);
        return false;
    }
}
