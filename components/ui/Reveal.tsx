"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Hand the reveal over to this script as early as possible.

   `.reveal` is `opacity: 0` in CSS with an animation that flips it visible on
   its own after 2s; this class cancels that animation, so setting it is the
   promise that the observer below will do the revealing instead. It runs at
   module scope rather than inside the effect because the effect waits for
   hydration — long enough on a slow connection for the failsafe to fire and
   pop every element in at once. If this chunk never loads, the class is never
   set and the CSS reveals the page without us. See app/globals.css.

   Guarded for the server pass: this module is imported by the root layout and
   evaluated during SSR, where `document` does not exist. */
if (typeof document !== "undefined") {
  document.documentElement.classList.add("reveal-js");
}

/**
 * Scroll-reveal for anything carrying `.reveal`.
 *
 * One observer for the whole document rather than a component per element, so
 * server components can opt in with a class name and stay server-rendered.
 *
 * The content is always in the HTML — only opacity/transform are animated —
 * but that alone does NOT mean crawlers and no-JS users see it: `opacity: 0`
 * is inlined into every page, so unrevealed content is invisible to anything
 * that renders. What guarantees it is the CSS failsafe in globals.css, which
 * needs no JS. The timeout below only covers the narrower case where this
 * script did load but the observer never fired.
 */
export default function Reveal() {
  // `Reveal` lives in the root layout, which persists across App Router client
  // navigations. Re-run on every pathname change so a page reached by client
  // navigation (not a full reload) gets its freshly-mounted `.reveal` nodes
  // observed — otherwise they stay at `opacity: 0` and the content is invisible.
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (nodes.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Stagger siblings so a grid cascades instead of popping at once.
          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
            : [];
          const index = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => observer.observe(n));

    // Narrow safety net: the observer loaded but never fired. The broader case
    // — this script never loading at all — is covered by the CSS failsafe.
    const failsafe = window.setTimeout(() => {
      nodes.forEach((n) => n.classList.add("is-visible"));
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
