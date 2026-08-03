import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";

import SiteChrome from "@/components/chrome/SiteChrome";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * A 404 can be served for any URL, so it renders in the root layout rather than
 * inside a route group — which means it pulls in the chrome itself. Without
 * this the not-found page would ship with no header, no footer and no `#main`
 * for the skip link to reach.
 */
export default function NotFound() {
  return (
    <SiteChrome>
      <section className="relative overflow-hidden bg-ink-950 py-section">
        <div
          className="pointer-events-none absolute inset-0 bg-mesh opacity-70"
          aria-hidden="true"
        />
        <div className="relative container-site text-center">
          <p className="font-display text-h1 font-extrabold text-magenta-400">404</p>
          <h1 className="mt-4 text-h2 text-white">We couldn&rsquo;t find that page</h1>
          <p className="mx-auto mt-5 max-w-[48ch] text-lead text-white/60">
            The link may be out of date, or the page may have moved. Head back to the homepage and
            we&rsquo;ll point you in the right direction.
          </p>
          <Link
            href={"/" as Route}
            className="mt-9 inline-flex items-center justify-center rounded-full bg-[linear-gradient(97deg,var(--color-violet-500),var(--color-magenta-500))] px-9 py-[1.05rem] font-display text-sm font-bold tracking-[0.06em] text-white uppercase shadow-glow"
          >
            Back to home
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
