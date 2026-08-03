"use client";

import { useEffect, useRef, useState } from "react";

/**
 * reCAPTCHA v2, loaded lazily.
 *
 * The live site pulls reCAPTCHA (~500KB across sub-requests) on every page
 * load, for two forms that are below the fold or behind an offcanvas. Here the
 * script is only fetched once the visitor actually interacts with a form,
 * which keeps it off the critical path entirely.
 *
 * When no site key is configured the widget is skipped and the server-side
 * check is a no-op, so local development needs no credentials.
 *
 * The widget is a fixed-size iframe — 304x78 normally, 164x144 compact — and
 * cannot be made fluid. At 320px the form card is 230px wide inside its
 * padding, so the normal widget pushes the whole page 29px wider than the
 * viewport (measured). Below 304px of room it therefore renders compact, which
 * is exactly what that variant exists for. The clduk redesign instead scales
 * the normal widget by 0.86 and clips the overflow, which still overflows at
 * 320px — this is the fix that reference needed.
 */

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; theme?: string; size?: "normal" | "compact" },
      ) => number;
      reset: (id?: number) => void;
    };
    __cldRecaptchaReady?: boolean;
  }
}

/** Width of the normal widget. Narrower than this and it will not fit. */
const NORMAL_WIDTH = 304;

const SCRIPT_ID = "recaptcha-api";
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/** `active` flips true on first interaction with the parent form. */
export default function Recaptcha({ active }: { active: boolean }) {
  const holder = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!active || !SITE_KEY || rendered.current) return;

    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || rendered.current || !holder.current || !window.grecaptcha) return;
      try {
        window.grecaptcha.render(holder.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          // Measured at render time, which is after first interaction and so
          // after layout has settled.
          size: holder.current.clientWidth < NORMAL_WIDTH ? "compact" : "normal",
        });
        rendered.current = true;
      } catch {
        // Already rendered into this node — harmless.
        rendered.current = true;
      }
    };

    if (window.grecaptcha?.render) {
      renderWidget();
      return;
    }

    const existing = document.getElementById(SCRIPT_ID);
    if (!existing) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onerror = () => !cancelled && setFailed(true);
      document.head.appendChild(script);
    }

    // The API sets window.grecaptcha asynchronously after the script loads.
    const poll = window.setInterval(() => {
      if (window.grecaptcha?.render) {
        window.clearInterval(poll);
        renderWidget();
      }
    }, 120);
    const timeout = window.setTimeout(() => {
      window.clearInterval(poll);
      if (!rendered.current && !cancelled) setFailed(true);
    }, 12_000);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.clearTimeout(timeout);
    };
  }, [active]);

  if (!SITE_KEY) return null;

  return (
    /* Two elements, not one: a container query matches descendants of the
       container, never the container itself, so the reserved height has to sit
       on a child of the element carrying `@container`.

       That reserve has to match whichever variant will render or the widget
       shifts the page when it appears. Tailwind compiles `@max-[304px]` to
       `@container not (min-width: 304px)` — true below 304px, the same test as
       `clientWidth < NORMAL_WIDTH` above, so the two decisions cannot disagree
       at the boundary. */
    <div className="@container">
      {/* `overflow-x-auto` is the belt to that braces: the variant is chosen
          once, at first interaction, and re-rendering to change it would throw
          away an already-solved captcha. So if the viewport narrows afterwards
          — a phone rotating back to portrait — a now-too-wide widget scrolls
          inside this box instead of pushing the page sideways. */}
      <div className="min-h-[78px] max-w-full overflow-x-auto @max-[304px]:min-h-[144px]">
        <div ref={holder} />
        {failed && (
          <p className="text-xs text-white/50">
            The captcha could not load. Please check your connection and refresh the page.
          </p>
        )}
      </div>
    </div>
  );
}
