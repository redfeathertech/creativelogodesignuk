"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary.
 *
 * Next 16 names the retry callback `unstable_retry` — the older `reset` prop
 * no longer exists.
 *
 * This boundary sits above every route group, so it replaces the chrome as well
 * as the page. It carries its own `<main id="main">` because the root layout no
 * longer renders one — the skip link has to land somewhere even here.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <main id="main">
      <section className="bg-ink-950 py-section">
        <div className="container-site text-center">
          <h1 className="text-h2 text-white">Something went wrong</h1>
          <p className="mx-auto mt-5 max-w-[48ch] text-lead text-white/60">
            Sorry — that didn&rsquo;t load as expected. Try again, and if it keeps happening please
            get in touch.
          </p>
          <button
            type="button"
            onClick={unstable_retry}
            className="mt-9 inline-flex cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(97deg,var(--color-violet-500),var(--color-magenta-500))] px-9 py-[1.05rem] font-display text-sm font-bold tracking-[0.06em] text-white uppercase shadow-glow"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
