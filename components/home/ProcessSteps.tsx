"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { process } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * The three process steps, as a timeline: a brand spine down the left with a
 * numbered node per step, each tied by a hairline to its card.
 *
 * Whichever step is sitting in the middle band of the viewport lights up — its
 * node brightens and lifts, and its card border picks up the brand ramp — so
 * the list reads as a progression while it scrolls past the intro column. Hover
 * does the same thing for pointer users. The observer only toggles a class; all
 * three steps are in the server-rendered HTML.
 *
 * The spine, the connectors and the horizontal layout all start at 576px. Below
 * that the node sits above its card and the timeline reads top-to-bottom as a
 * plain list — 60px of node plus a connector plus a card does not fit a phone
 * without the card copy wrapping every second word.
 */
export default function ProcessSteps() {
    const [activeSteps, setActiveSteps] = useState<boolean[]>(() =>
        process.steps.map(() => false),
    );
    const refs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        if (!("IntersectionObserver" in window)) return;

        const nodes = refs.current.filter(Boolean) as HTMLLIElement[];
        if (nodes.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                setActiveSteps((current) => {
                    const next = [...current];
                    entries.forEach((entry) => {
                        const index = nodes.indexOf(
                            entry.target as HTMLLIElement,
                        );
                        if (index >= 0) next[index] = entry.isIntersecting;
                    });
                    return next;
                });
            },
            // Only the middle 16% of the viewport counts as "here".
            { rootMargin: "-42% 0px -42% 0px" },
        );

        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    return (
        <ol className="relative grid gap-5 min-[576px]:gap-6">
            {/* The spine. Centred on the 60px nodes (`left-[30px]`) and faded at
                both ends so it reads as continuing past the first and last
                cards rather than stopping dead against them. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-[30px] hidden w-px bg-[linear-gradient(180deg,transparent,var(--color-magenta-500)_12%,var(--color-magenta-500)_88%,transparent)] min-[576px]:block"
            />

            {process.steps.map((step, i) => {
                const active = activeSteps[i];

                return (
                    <li
                        key={step.title}
                        ref={(el) => {
                            refs.current[i] = el;
                        }}
                        className="reveal group relative grid grid-cols-1 items-center gap-4 min-[576px]:grid-cols-[60px_minmax(0,1fr)] min-[576px]:gap-8"
                    >
                        {/* Node. Sits above the spine, and its ring is opaque
                            so the line does not show through the fill. */}
                        <span
                            aria-hidden="true"
                            className={cn(
                                // bg-origin-border: without it the gradient tiles into the 1px
                                // transparent border ring and wraps a crimson line down one edge.
                                "relative z-[1] grid size-[54px] shrink-0 place-items-center rounded-full bg-origin-border min-[576px]:size-[60px]",
                                "bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]",
                                "font-display text-[1.15rem] font-extrabold text-white min-[576px]:text-[1.3rem]",
                                "transition-[transform,box-shadow] duration-300 ease-out",
                                "group-hover:scale-[1.06] group-hover:shadow-[0_0_28px_-2px_rgb(204_6_127/0.85)]",
                                active
                                    ? "scale-[1.06] shadow-[0_0_28px_-2px_rgb(204_6_127/0.85)]"
                                    : "shadow-[0_0_18px_-6px_rgb(204_6_127/0.7)]",
                            )}
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Connector: spans exactly the 2rem column gap. */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-[60px] top-1/2 hidden h-px w-8 bg-[linear-gradient(90deg,var(--color-magenta-500),rgb(204_6_127/0.2))] min-[576px]:block"
                        />

                        <article
                            className={cn(
                                "relative flex items-center gap-4 rounded-2xl border p-5 min-[576px]:gap-6 min-[576px]:p-6",
                                // Left-weighted magenta wash easing into violet, so the
                                // card sits on the backdrop rather than over it.
                                "bg-[linear-gradient(103deg,rgb(204_6_127/0.20)_0%,rgb(27_15_51/0.42)_48%,rgb(102_46_145/0.20)_100%)]",
                                "transition-[border-color,box-shadow,transform] duration-300 ease-out",
                                "group-hover:-translate-y-0.5 group-hover:border-magenta-400/60 group-hover:shadow-[0_18px_44px_-24px_rgb(204_6_127/0.9)]",
                                active
                                    ? "border-magenta-400/60 shadow-[0_18px_44px_-24px_rgb(204_6_127/0.9)]"
                                    : "border-magenta-500/25",
                            )}
                        >
                            <div className="min-w-0">
                                <h3 className="mb-2 font-display text-h4 font-extrabold text-white">
                                    {step.title}
                                </h3>
                                <p className="text-white/65">{step.body}</p>
                            </div>

                            {/* The client asset is the whole badge — ring,
                                fill and glow are baked in — so nothing is drawn
                                around it. Rendered at most 84px against a 117px
                                source, so it never upscales.

                                Dropped below 360px, where the mark plus its gap
                                would leave the card copy under 170px to wrap in
                                and "Development" breaks mid-word. */}
                            <Image
                                src={step.icon}
                                alt=""
                                aria-hidden="true"
                                width={117}
                                height={117}
                                sizes="84px"
                                className="hidden size-[clamp(52px,8vw,84px)] shrink-0 transition-transform duration-300 group-hover:scale-105 min-[360px]:block"
                            />
                        </article>
                    </li>
                );
            })}
        </ol>
    );
}
