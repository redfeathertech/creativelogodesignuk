"use client";

import { useEffect, useState } from "react";

/**
 * reCAPTCHA v3, loaded lazily.
 *
 * v3 has no widget and nothing to click — it scores the visitor in the
 * background and hands back a token, which rides to the server in the hidden
 * input below under the same `g-recaptcha-response` name v2 used. So every form
 * keeps its existing markup and every server action keeps reading the same
 * field; only what fills it changed.
 *
 * The live site pulls reCAPTCHA (~500KB across sub-requests) on every page
 * load, for two forms that are below the fold or behind an offcanvas. Here the
 * script is only fetched once the visitor actually interacts with a form, which
 * keeps it off the critical path entirely. That lazy load matters more under v3
 * than it did under v2: v3 wants to be on *every* page, and this site would pay
 * that cost on all 49 routes for the sake of six forms.
 *
 * Tokens expire two minutes after `execute` resolves, and a form sitting open
 * while someone types will outlive that easily. The token is therefore minted
 * on first interaction and re-minted on an interval below the expiry, so
 * whatever is in the input when the form posts is always fresh.
 *
 * When no site key is configured nothing loads and the server-side check is a
 * no-op, so local development needs no credentials.
 */

declare global {
    interface Window {
        grecaptcha?: {
            ready: (cb: () => void) => void;
            execute: (
                siteKey: string,
                opts: { action: string },
            ) => Promise<string>;
        };
    }
}

const SCRIPT_ID = "recaptcha-api";
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/** Google expires tokens at 120s. Refresh with room to spare. */
const REFRESH_MS = 100_000;

/**
 * `active` flips true on first interaction with the parent form.
 *
 * `action` names this form to reCAPTCHA — it is echoed back by the siteverify
 * call and checked there, which is what stops a token minted elsewhere being
 * replayed here. Google only accepts `A-Za-z/_` in an action name.
 */
export default function Recaptcha({
    active,
    action,
    tone = "dark",
    disclosure = true,
}: {
    active: boolean;
    action: string;
    /** Panel this renders on — "dark" (default) for the usual dark panels, "light" for white cards. */
    tone?: "dark" | "light";
    /**
     * Google's terms require the badge or the disclosure wording naming both
     * policies, and the badge is hidden site-wide — so this defaults to true
     * and only a caller that renders the same wording itself may switch it off.
     * The homepage hero card does: the wording is part of its design, set with
     * a lock mark and brand links.
     */
    disclosure?: boolean;
}) {
    const [token, setToken] = useState("");
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!active || !SITE_KEY) return;

        let cancelled = false;

        const mint = () => {
            if (cancelled || !window.grecaptcha?.execute) return;
            window.grecaptcha
                .execute(SITE_KEY, { action })
                .then((next) => {
                    if (cancelled) return;
                    setToken(next);
                    setFailed(false);
                })
                .catch(() => !cancelled && setFailed(true));
        };

        const start = () => {
            if (cancelled || !window.grecaptcha?.ready) return;
            window.grecaptcha.ready(mint);
        };

        let poll = 0;
        let timeout = 0;

        if (window.grecaptcha?.ready) {
            start();
        } else {
            const existing = document.getElementById(SCRIPT_ID);
            if (!existing) {
                const script = document.createElement("script");
                script.id = SCRIPT_ID;
                script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
                script.async = true;
                script.defer = true;
                script.onerror = () => !cancelled && setFailed(true);
                document.head.appendChild(script);
            }

            // grecaptcha appears asynchronously after the script loads, and a second
            // form mounting later shares whatever the first one injected.
            poll = window.setInterval(() => {
                if (window.grecaptcha?.ready) {
                    window.clearInterval(poll);
                    start();
                }
            }, 120);
            timeout = window.setTimeout(() => {
                window.clearInterval(poll);
                if (!window.grecaptcha?.ready && !cancelled) setFailed(true);
            }, 12_000);
        }

        // Armed straight away: `mint` no-ops until grecaptcha exists, and by the
        // first tick 100s later it always will.
        const refresh = window.setInterval(mint, REFRESH_MS);

        return () => {
            cancelled = true;
            window.clearInterval(poll);
            window.clearTimeout(timeout);
            window.clearInterval(refresh);
        };
    }, [active, action]);

    if (!SITE_KEY) return null;

    return (
        /* No reserved height and no container query any more: v3 renders nothing,
       so there is no fixed-size iframe to fit into 320px and nothing that can
       shift the page when it appears. The v2 compact-variant machinery went
       with it.

       The disclosure is not decoration — Google's terms require either the
       floating badge or this exact wording naming both policies. The badge is
       hidden in globals.css because the bottom-right corner already belongs to
       the WhatsApp button, so this text is what keeps us compliant. */
        <div>
            <input
                type="hidden"
                name="g-recaptcha-response"
                value={token}
                readOnly
            />
            {!disclosure ? null : failed ? (
                <p
                    className={
                        tone === "light"
                            ? "text-xs text-onlight-muted"
                            : "text-xs text-white/50"
                    }
                >
                    The captcha could not load. Please check your connection and
                    refresh the page.
                </p>
            ) : (
                <p
                    className={
                        tone === "light"
                            ? "text-xs text-onlight-muted"
                            : "text-xs text-white/40"
                    }
                >
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                            tone === "light"
                                ? "underline underline-offset-2 hover:text-onlight"
                                : "underline underline-offset-2 hover:text-white/70"
                        }
                    >
                        Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                            tone === "light"
                                ? "underline underline-offset-2 hover:text-onlight"
                                : "underline underline-offset-2 hover:text-white/70"
                        }
                    >
                        Terms of Service
                    </a>{" "}
                    apply.
                </p>
            )}
        </div>
    );
}
