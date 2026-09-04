"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import type { ServiceBenefits } from "@/content/services/types";
import { whatYouGet } from "@/content/home";
import { ChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { SxEyebrow, SxHeading } from "./Shell";

/**
 * The five client benefits as a vertical tab list, with the selected one's
 * screenshot cross-fading inside the monitor.
 *
 * Same contract as the shared `components/services/Benefits`: a full ARIA
 * tablist with arrow-key navigation, and every panel stays in the DOM
 * (`hidden`, never unmounted) so all five descriptions are crawlable without
 * JavaScript. What differs is the surface and the column order, which the mock
 * flips — the list leads on the left and the monitor sits under the heading on
 * the right.
 *
 * The three proof badges are the homepage's, imported rather than re-declared.
 * They are net-new UI chrome with no live equivalent (see the note on
 * `whatYouGet.benefits` in content/home.ts), so sharing them adds no page copy
 * that has to be kept in parity with anything.
 */
export default function Benefits({ data }: { data: ServiceBenefits }) {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const onKeyDown = (event: React.KeyboardEvent, index: number) => {
        const last = data.items.length - 1;
        let next: number | null = null;

        if (event.key === "ArrowDown" || event.key === "ArrowRight")
            next = index === last ? 0 : index + 1;
        if (event.key === "ArrowUp" || event.key === "ArrowLeft")
            next = index === 0 ? last : index - 1;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = last;

        if (next === null) return;
        event.preventDefault();
        setActive(next);
        tabRefs.current[next]?.focus();
    };

    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas)] py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh-sx"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay"
                aria-hidden="true"
            />

            {/* `lg:items-center`, not `items-start`: the tab list is a fixed
                five cards while the right column is heading + badges + a
                monitor, and the right side always runs the taller of the two.
                Aligning to the start banked all of that difference as dead
                space under the last tab; centring splits it. */}
            <div className="relative container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2 lg:items-center">
                {/* ------------------------------------------------- tabs -- */}
                <div
                    className="reveal order-2 grid min-w-0 gap-3 lg:order-1"
                    role="tablist"
                    aria-label={data.eyebrow}
                    aria-orientation="vertical"
                >
                    {data.items.map((item, i) => {
                        const selected = i === active;
                        return (
                            <div
                                key={item.title}
                                className={cn(
                                    "rounded-md border px-6 pt-2 pb-3 backdrop-blur-sm transition-colors duration-300 ease-out",
                                    selected
                                        ? "border-[var(--sx-line-hot)] bg-white/[0.06]"
                                        : "border-[var(--sx-line)] bg-[var(--sx-card)] hover:border-[var(--sx-line-hot)]",
                                )}
                            >
                                <button
                                    ref={(el) => {
                                        tabRefs.current[i] = el;
                                    }}
                                    type="button"
                                    role="tab"
                                    id={`sx-benefit-tab-${i}`}
                                    aria-controls={`sx-benefit-panel-${i}`}
                                    aria-selected={selected}
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => setActive(i)}
                                    onKeyDown={(e) => onKeyDown(e, i)}
                                    className="block w-full cursor-pointer py-3 text-left"
                                >
                                    <span className="flex items-center justify-between gap-4 font-display text-h5 font-bold text-white">
                                        {item.title}
                                        <ChevronDown
                                            className={cn(
                                                "shrink-0 transition-[rotate,color] duration-300",
                                                selected
                                                    ? "rotate-180 text-[var(--sx-neon)]"
                                                    : "text-white/40",
                                            )}
                                        />
                                    </span>
                                </button>

                                <div
                                    id={`sx-benefit-panel-${i}`}
                                    role="tabpanel"
                                    aria-labelledby={`sx-benefit-tab-${i}`}
                                    hidden={!selected}
                                >
                                    <p className="text-white/60">{item.body}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --------------------------------------- copy + monitor -- */}
                <div className="order-1 min-w-0 lg:order-2">
                    <div className="reveal">
                        <SxEyebrow>{data.eyebrow}</SxEyebrow>
                        <SxHeading
                            lead={data.heading}
                            accent={data.headingAccent}
                        />
                        <p className="mt-6 max-w-[58ch] text-lead text-white/60">
                            {data.lead}
                        </p>

                        <ul className="mt-8 flex flex-wrap gap-3">
                            {whatYouGet.benefits.map((benefit) => (
                                <li
                                    key={benefit.label}
                                    className="inline-flex items-center gap-2.5 rounded-full border border-[var(--sx-line)] bg-[var(--sx-card)] py-2 pr-4 pl-2.5"
                                >
                                    <Image
                                        src={benefit.icon}
                                        alt=""
                                        aria-hidden="true"
                                        width={28}
                                        height={28}
                                        className="size-6 shrink-0"
                                    />
                                    <span className="font-display text-ui-13 font-bold text-white/75">
                                        {benefit.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* The screenshots sit ON TOP of the monitor artwork — its
                        screen area is opaque, so the panel is positioned over
                        it rather than composited into it. Percentages are
                        measured off the 1000x820 asset. */}
                    <div className="reveal relative mx-auto mt-10 max-w-[560px]">
                        <div className="absolute top-[4.2%] left-[8.1%] z-[2] h-[68%] w-[83.8%] overflow-hidden rounded-[4px] bg-[var(--sx-canvas-2)]">
                            {data.items.map((item, i) => (
                                <Image
                                    key={item.title}
                                    src={item.image.src}
                                    alt={`${item.title} preview`}
                                    width={900}
                                    height={560}
                                    sizes="(max-width: 992px) 78vw, 46vw"
                                    className={cn(
                                        "absolute inset-0 size-full object-cover transition-[opacity,scale] duration-[600ms] ease-out",
                                        i === active
                                            ? "scale-100 opacity-100"
                                            : "scale-[1.04] opacity-0",
                                    )}
                                />
                            ))}
                        </div>

                        <Image
                            src="/assets/img/home/monitor.webp"
                            alt=""
                            aria-hidden="true"
                            width={1000}
                            height={820}
                            sizes="(max-width: 992px) 92vw, 46vw"
                            className="pointer-events-none relative z-[1] block h-auto w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
