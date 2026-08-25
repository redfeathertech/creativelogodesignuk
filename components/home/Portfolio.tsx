"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { recentWork } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import Rail from "@/components/ui/Rail";
import { btn } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------- filter marks -- */
/* One per filter id. Kept here rather than in components/ui/icons.tsx for the
   same reason as the hero's set: nothing else on the site draws them. */

const S = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

const filterIcons: Record<string, React.ReactElement> = {
    all: (
        <svg viewBox="0 0 24 24" {...S}>
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
        </svg>
    ),
    "web-design": (
        <svg viewBox="0 0 24 24" {...S}>
            <rect x="2.8" y="4.2" width="18.4" height="15.6" rx="2.2" />
            <path d="M2.8 9h18.4M6.2 6.6h.01M8.8 6.6h.01M11.4 6.6h.01" />
        </svg>
    ),
    "ui-ux": (
        <svg viewBox="0 0 24 24" {...S}>
            <path d="m4 3.4 6.6 16.2 2.3-6 6-2.4z" />
            <path d="m13.6 13.6 5.8 5.8" />
        </svg>
    ),
    branding: (
        <svg viewBox="0 0 24 24" {...S}>
            <path d="M12 2.8a9.2 9.2 0 1 0 0 18.4c1.2 0 1.9-.8 1.9-1.8 0-1.5-1.3-1.7-1.3-2.9 0-.9.7-1.6 1.7-1.6h1.5a4.4 4.4 0 0 0 4.4-4.4c0-4.2-3.7-7.7-8.2-7.7Z" />
            <path d="M7.6 11.4h.01M10 7.6h.01M14.4 7.4h.01" />
        </svg>
    ),
    "app-development": (
        <svg viewBox="0 0 24 24" {...S}>
            <rect x="6.4" y="2.6" width="11.2" height="18.8" rx="2.6" />
            <path d="M10.6 5.4h2.8M12 18.2h.01" />
        </svg>
    ),
    marketing: (
        <svg viewBox="0 0 24 24" {...S}>
            <path d="M3.4 9.4v5.2a1.6 1.6 0 0 0 1.6 1.6h2l7.4 4.2V3.6L7 7.8H5a1.6 1.6 0 0 0-1.6 1.6Z" />
            <path d="M18.4 8.6a4.6 4.6 0 0 1 0 6.8" />
        </svg>
    ),
};

/**
 * Portfolio — the "Our Recent Work" rail, lifted out of the dark process band
 * into a light section of its own with a filter row above it.
 *
 * It keeps the id the process section's secondary CTA points at
 * (`process.workAnchor`), so that link still lands here.
 *
 * A client component ONLY because the filter row holds state. The default
 * filter is "all", so the server-rendered HTML carries all six cards and all
 * six internal links — filtering never hides a link from a crawler, it only
 * narrows what a visitor is looking at.
 *
 * The cards deliberately do NOT carry `.reveal`: the observer in
 * components/ui/Reveal.tsx collects nodes on mount, so a card first rendered by
 * a later filter click would never be observed — it would sit at opacity 0
 * forever. The header and the chip row are stable across renders, so they can.
 */
export default function Portfolio() {
    const [active, setActive] = useState<string>("all");

    const shown =
        active === "all"
            ? recentWork.items
            : recentWork.items.filter((item) => item.category === active);

    const labelFor = (id: string) =>
        recentWork.filters.find((f) => f.id === id)?.label ?? "";

    return (
        <section
            id="recent-work"
            className="relative isolate bg-mist-100 py-section text-onlight"
        >
            <div className="container-site">
                {/* Heading left, the (as yet unlinked) portfolio CTA right. */}
                <div className="reveal flex flex-wrap items-end justify-between gap-x-12 gap-y-8 max-lg:flex-col max-lg:items-center max-lg:text-center">
                    <div>
                        <Eyebrow className="text-magenta-500 max-lg:justify-center max-lg:[&>span]:hidden">
                            {recentWork.eyebrow}
                        </Eyebrow>

                        <h2 className="text-h2">
                            {recentWork.titleLead}{" "}
                            <span className="gradient-text-brand">
                                {recentWork.titleAccent}
                            </span>
                        </h2>
                    </div>

                    {/* TODO — NOT A LINK YET. The portfolio page does not exist,
                        so this is a <span>, not a disabled <button>: nothing
                        announces itself to assistive tech as a control that
                        does nothing. Swap it for a <Link href="…"> the moment
                        that route ships. */}
                    <span className={btn("outline", "md", "select-none max-sm:w-full")}>
                        {recentWork.viewAll}
                    </span>
                </div>

                {/* Filter chips. Buttons with `aria-pressed`, not a tablist —
                    there are no tab panels here, only one rail being filtered. */}
                <div
                    className="reveal mt-12 flex flex-wrap gap-3 max-lg:justify-center"
                    role="group"
                    aria-label={`Filter ${recentWork.title.toLowerCase()}`}
                >
                    {recentWork.filters.map((filter) => {
                        const on = filter.id === active;
                        return (
                            <button
                                key={filter.id}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setActive(filter.id)}
                                className={cn(
                                    "inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-3",
                                    "font-display text-sm font-bold whitespace-nowrap",
                                    "transition-all duration-300 ease-out [&>svg]:size-[18px] [&>svg]:shrink-0",
                                    on
                                        ? "border-transparent bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] text-white shadow-glow"
                                        : "border-ink-900/[0.12] bg-white text-onlight hover:-translate-y-0.5 hover:border-magenta-500/45 hover:text-magenta-600",
                                )}
                            >
                                {filterIcons[filter.id]}
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-10">
                    {/* Remounted per filter so the rail starts at the first card
                        again — scrolled to card five and then filtered down to
                        one, the visitor would otherwise be left looking at empty
                        space until they scrolled back. */}
                    <Rail
                        key={active}
                        label={recentWork.title}
                        count={shown.length}
                        navPlacement="sides"
                        tone="light"
                    >
                        {shown.map((item) => (
                            <Link
                                key={item.img}
                                href={item.href}
                                className="group flex w-[clamp(258px,76vw,330px)] flex-col overflow-hidden rounded-lg border border-ink-900/[0.07] bg-white transition-all duration-300 ease-out hover:-translate-y-1.5"
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={item.img}
                                        alt={`${item.lead} ${item.trail} project by Creative Logo Design`}
                                        width={340}
                                        height={425}
                                        sizes="(max-width: 576px) 76vw, 330px"
                                        className="block aspect-4/5 w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                                    />

                                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 font-display text-[0.6875rem] font-bold tracking-[0.1em] text-onlight uppercase shadow-sm backdrop-blur-[2px]">
                                        <span
                                            aria-hidden="true"
                                            className="size-1.5 rounded-full bg-magenta-500"
                                        />
                                        {labelFor(item.category)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 px-6 py-5">
                                    <h3 className="font-display text-[1.125rem] leading-[1.15] font-extrabold text-onlight">
                                        {item.lead} {item.trail}
                                    </h3>

                                    <span
                                        aria-hidden="true"
                                        className="grid size-11 shrink-0 place-items-center rounded-full border border-magenta-500/25 text-magenta-500 transition-all duration-300 ease-out group-hover:border-transparent group-hover:bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] group-hover:text-white"
                                    >
                                        <ArrowIcon className="size-4 -rotate-45" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </Rail>
                </div>
            </div>
        </section>
    );
}
