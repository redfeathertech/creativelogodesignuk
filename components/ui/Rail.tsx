"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "./icons";

/**
 * Horizontal scroll-snap rail with arrow buttons and optional dots.
 *
 * Replaces Slick/Swiper: native scrolling means swipe, trackpad, keyboard and
 * momentum all work for free, and the dots can never desync from the content
 * because they are derived from scrollLeft rather than tracked separately.
 *
 * Slides are rendered by the server and passed in as children, so the markup
 * stays crawlable.
 *
 * `navPlacement="head"` puts the arrows on the section heading row instead of
 * under the rail — the arrangement the recent-work rail uses.
 */
export default function Rail({
    children,
    count,
    label,
    itemNoun = "slide",
    showDots = false,
    className,
    navClassName,
    align = "end",
    navPlacement = "below",
    heading,
    tone = "dark",
}: {
    children: React.ReactNode;
    count: number;
    label: string;
    /** Used to build dot labels, e.g. "Go to testimonial 2". A plain string
      rather than a render function — functions cannot cross the
      server/client boundary as props. */
    itemNoun?: string;
    showDots?: boolean;
    className?: string;
    navClassName?: string;
    /** Where the arrow cluster sits when dots are also shown. */
    align?: "end" | "between";
    navPlacement?: "below" | "head";
    /** Rendered opposite the arrows when `navPlacement` is "head". */
    heading?: React.ReactNode;
    /** Picks the arrow border colour for the surface behind it. */
    tone?: "dark" | "light";
}) {
    const railRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const sync = useCallback(() => {
        const rail = railRef.current;
        if (!rail) return;
        const first = rail.firstElementChild as HTMLElement | null;
        if (!first) return;

        const step =
            first.getBoundingClientRect().width +
            parseFloat(getComputedStyle(rail).columnGap || "0");
        setActive(step > 0 ? Math.round(rail.scrollLeft / step) : 0);
        setAtStart(rail.scrollLeft < 4);
        setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
    }, []);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;
        sync();
        rail.addEventListener("scroll", sync, { passive: true });
        window.addEventListener("resize", sync);
        return () => {
            rail.removeEventListener("scroll", sync);
            window.removeEventListener("resize", sync);
        };
    }, [sync]);

    const scrollBy = (dir: 1 | -1) => {
        const rail = railRef.current;
        if (!rail) return;
        const first = rail.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step =
            first.getBoundingClientRect().width +
            parseFloat(getComputedStyle(rail).columnGap || "0");
        rail.scrollBy({ left: step * dir, behavior: "smooth" });
    };

    const goTo = (i: number) => {
        const rail = railRef.current;
        if (!rail) return;
        const first = rail.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step =
            first.getBoundingClientRect().width +
            parseFloat(getComputedStyle(rail).columnGap || "0");
        rail.scrollTo({ left: step * i, behavior: "smooth" });
    };

    const arrowClass = cn(
        "grid size-[52px] cursor-pointer place-items-center rounded-full border bg-transparent text-current",
        "transition-all duration-300 ease-out",
        "enabled:hover:scale-[1.06] enabled:hover:border-transparent enabled:hover:text-white",
        "enabled:hover:bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]",
        "disabled:cursor-default disabled:opacity-30 bg-origin-border",
        tone === "dark" ? "border-white/20" : "border-ink-900/[0.18]",
    );

    const nav = (
        <div className="inline-flex gap-3">
            <button
                type="button"
                className={arrowClass}
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label={`Previous — ${label}`}
            >
                <ChevronLeft />
            </button>
            <button
                type="button"
                className={arrowClass}
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label={`Next — ${label}`}
            >
                <ChevronRight />
            </button>
        </div>
    );

    const rail = (
        <div
            ref={railRef}
            className={cn("rail gap-6 scroll-smooth py-3", className)}
            role="group"
            aria-label={label}
            tabIndex={0}
        >
            {children}
        </div>
    );

    if (navPlacement === "head") {
        return (
            <>
                <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
                    {heading}
                    {nav}
                </div>
                {rail}
            </>
        );
    }

    return (
        <>
            {rail}

            <div
                className={cn(
                    "mt-6 flex items-center gap-6",
                    align === "between" ? "justify-between" : "justify-end",
                    navClassName,
                )}
            >
                {showDots && (
                    /* gap-4, not gap-2: each dot carries a 24px invisible hit area
                       (below), and 16px of gap is the least that keeps two
                       neighbouring hit areas from overlapping — an overlap would
                       hand the tap to whichever dot paints last.

                       `flex-wrap` because that 24px pitch adds up: ten dots plus
                       the arrow cluster want 384px, and a 320px phone has 280px
                       of gutter-to-gutter room. Without it the row pushed the
                       document sideways — 84px at 320px, 45px at 360px. Wrapping
                       also lets `min-width: auto` resolve to one dot instead of
                       the whole strip, so the row can shrink at all. */
                    <div className="inline-flex flex-wrap items-center gap-4">
                        {Array.from({ length: count }, (_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to ${itemNoun} ${i + 1}`}
                                aria-current={i === active}
                                className={cn(
                                    "relative h-2 cursor-pointer rounded-full transition-all duration-300",
                                    /* The dot is 8px tall — nowhere near a thumb.
                                       This grows the touch target to 24px square
                                       (WCAG 2.5.8) around the same 8px visual. */
                                    "before:absolute before:top-1/2 before:left-1/2 before:h-6 before:w-full before:min-w-6",
                                    "before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
                                    i === active
                                        ? "w-7 bg-magenta-500 opacity-100"
                                        : "w-2 bg-current opacity-[0.28] hover:opacity-60",
                                )}
                            />
                        ))}
                    </div>
                )}

                {nav}
            </div>
        </>
    );
}
