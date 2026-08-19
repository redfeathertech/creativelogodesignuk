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
 * under the rail; `"sides"` floats one over each edge of the rail itself,
 * which is what the portfolio section uses.
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
    navPlacement?: "below" | "head" | "sides";
    /** Rendered opposite the arrows when `navPlacement` is "head". */
    heading?: React.ReactNode;
    /** Picks the arrow border colour for the surface behind it. */
    tone?: "dark" | "light";
}) {
    const railRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    /* One dot per REACHABLE scroll position, not per slide. The rail scrolls a
       card at a time but stops at `scrollWidth - clientWidth`, so with N slides
       and V of them in view only N - V + 1 positions exist — the trailing V - 1
       dots could never light up. Measured rather than assumed, because V is a
       function of viewport width: 1 on a phone, 3 on a desktop. Starts at
       `count` so the server-rendered markup and the first client render agree;
       the mount-time `sync()` corrects it before paint. */
    const [pages, setPages] = useState(count);
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
        /* Derived from the scroll range through the same `round(x / step)` the
           active index uses, so the last dot is always the one the last scroll
           position resolves to — no rounding seam between the two. */
        const reachable =
            step > 0
                ? Math.min(
                      count,
                      Math.max(
                          1,
                          Math.round(
                              (rail.scrollWidth - rail.clientWidth) / step,
                          ) + 1,
                      ),
                  )
                : 1;
        setPages(reachable);
        setActive(
            step > 0
                ? Math.min(reachable - 1, Math.round(rail.scrollLeft / step))
                : 0,
        );
        setAtStart(rail.scrollLeft < 4);
        setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
    }, [count]);

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
        "size-[52px] cursor-pointer place-items-center rounded-full border text-current",
        /* `sides` hides the arrows below 768px — see the note at the bottom
           of the component. The display utility has to be decided HERE rather
           than tacked on at the call site: `hidden` and `grid` set the same
           property, so which one wins would come down to stylesheet order. */
        navPlacement === "sides" ? "hidden md:grid" : "grid",
        "transition-all duration-300 ease-out",
        "enabled:hover:scale-[1.06] enabled:hover:border-transparent enabled:hover:text-white",
        "enabled:hover:bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]",
        "disabled:cursor-default disabled:opacity-30 bg-origin-border",
        /* Floating over the rail means each circle sits half on a card and half
           on the section, so it needs a surface of its own; in a heading or
           footer row it has the section to itself and stays transparent. */
        navPlacement === "sides"
            ? "bg-white shadow-[0_10px_30px_-12px_rgb(7_2_15/0.35)]"
            : "bg-transparent",
        tone === "dark" ? "border-white/20" : "border-ink-900/[0.18]",
    );

    const arrow = (dir: 1 | -1, extra?: string) => (
        <button
            type="button"
            className={cn(arrowClass, extra)}
            onClick={() => scrollBy(dir)}
            disabled={dir === -1 ? atStart : atEnd}
            aria-label={`${dir === -1 ? "Previous" : "Next"} — ${label}`}
        >
            {dir === -1 ? <ChevronLeft /> : <ChevronRight />}
        </button>
    );

    const nav = (
        <div className="inline-flex gap-3">
            {arrow(-1)}
            {arrow(1)}
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

    if (navPlacement === "sides") {
        return (
            <div className="relative">
                {rail}

                {/* Each circle straddles the rail edge, so half of it — 26px —
                    lands in the page gutter. The gutter is 20px at 320px, which
                    is why these are hidden below 768px rather than allowed to
                    push the document sideways; a phone swipes the rail. Pinned
                    at 42% rather than dead centre so they land on the artwork
                    like the design, not on the card's title row. */}
                {arrow(
                    -1,
                    "absolute top-[42%] left-0 -translate-x-1/2 -translate-y-1/2",
                )}
                {arrow(
                    1,
                    "absolute top-[42%] right-0 translate-x-1/2 -translate-y-1/2",
                )}
            </div>
        );
    }

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
                        {Array.from({ length: pages }, (_, i) => (
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
