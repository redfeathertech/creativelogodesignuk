"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal for anything carrying `.reveal`.
 *
 * One observer for the whole document rather than a component per element, so
 * server components can opt in with a class name and stay server-rendered.
 *
 * The content is always in the HTML — only opacity/transform are animated — so
 * crawlers and no-JS users see everything regardless. The safety net below
 * reveals the page if the observer never fires for any reason.
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

    // Safety net: never leave content invisible.
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
