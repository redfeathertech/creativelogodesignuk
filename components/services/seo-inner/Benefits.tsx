"use client";

import Image from "next/image";
import { useState } from "react";

import type { ServiceBenefits } from "@/content/services/types";
import { whatYouGet } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/** The band's artwork, as supplied — one flat image, nothing composited in. */
const ART = "/assets/img/services/seo-inner/client-benefits.webp";

/**
 * "Client benefits" — rebuilt as the homepage's "What We Deliver" band.
 *
 * Same arrangement, same surface and the same controls as
 * `components/home/WhatYouGet`: the five cards hold the left column, the
 * heading with its proof strip and the artwork share the right, and the band
 * sits on the homepage's `offer-bg` backdrop rather than the seo-inner canvas.
 * The client asked for the two sections to match, so the treatment is taken
 * from there wholesale rather than re-derived here.
 *
 * Two consequences of that, both deliberate:
 *
 * 1. **Every card's body is always visible** and the artwork does not change
 *    with the selection, so the cards are a highlight control and not an
 *    accordion or a tab list — `aria-pressed` buttons in a `role="group"`, as
 *    on the homepage. The earlier pass here was a real `tablist` because each
 *    item swapped a screenshot into a monitor; with one flat image that
 *    contract would be a lie.
 * 2. **`item.image` goes unrendered.** The per-item screenshots stay in
 *    `content/services/*` untouched — no copy moves either way, and nothing in
 *    `scripts/verify-content-parity.py` covers them — but this band no longer
 *    has a surface to show them on.
 *
 * One thing the homepage has that this band does not: the chevron pill on the
 * right of each card. Dropped on the client's instruction. It was `aria-hidden`
 * chrome, and with no panel to disclose the fill already says which card is
 * selected.
 *
 * The three proof badges are the homepage's, imported rather than re-declared;
 * they are net-new UI chrome with no live equivalent (see the note on
 * `whatYouGet.benefits` in content/home.ts).
 */
export default function Benefits({ data }: { data: ServiceBenefits }) {
    const [active, setActive] = useState(0);

    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            <Image
                src={whatYouGet.background}
                alt={whatYouGet.backgroundAlt}
                aria-hidden="true"
                width={1920}
                height={1039}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-right-bottom"
            />

            <div className="container-site">
                {/* Rows are explicit so the card column can span both of them
                    on the right-hand layout while the heading and the artwork
                    stack above one another beside it. Below `lg` the grid
                    collapses and DOM order takes over: heading, art, cards. */}
                <div className="grid gap-x-[clamp(2.5rem,1.5rem+4vw,4.5rem)] gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_auto]">
                    {/* ---------------------------------------- heading ---- */}
                    <div className="reveal max-lg:text-center lg:col-start-2 lg:row-start-1">
                        <Eyebrow className="max-lg:justify-center max-lg:[&>span]:hidden">
                            {data.eyebrow}
                        </Eyebrow>

                        <h2 className="text-h2">
                            {data.heading}{" "}
                            <span className="gradient-text">
                                {data.headingAccent}
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[60ch] text-lead text-white/65 max-lg:mx-auto">
                            {data.lead}
                        </p>

                        {/* The proof strip: three bare marks straight on the
                            backdrop, divided by hairlines — no plate, no fill,
                            no border around the row. Stays three-across at
                            every width, so the labels wrap rather than the row
                            stacking. */}
                        <ul className="mt-9 grid grid-cols-3 max-lg:text-start">
                            {whatYouGet.benefits.map((benefit, i) => (
                                <li
                                    key={benefit.label}
                                    className={cn(
                                        "flex items-center gap-2 py-1 pe-2 sm:gap-3 sm:pe-4",
                                        i > 0 &&
                                            "border-s border-white/[0.14] ps-3 sm:ps-4",
                                    )}
                                >
                                    <Image
                                        src={benefit.icon}
                                        alt={benefit.iconAlt}
                                        width={40}
                                        height={36}
                                        className="size-7 shrink-0 object-contain sm:size-9"
                                    />
                                    <span className="font-display text-ui-13 leading-tight font-semibold text-balance text-white sm:text-ui-15">
                                        {benefit.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* -------------------------------------------- art ---- */}
                    <div className="reveal lg:col-start-2 lg:row-start-2">
                        {/* Capped under the artwork's native width on the
                            two-column layout: at full size the heading plus
                            the art run taller than the card column beside
                            them, which is centred against it. */}
                        <Image
                            src={ART}
                            alt=""
                            aria-hidden="true"
                            width={1276}
                            height={1000}
                            sizes="(max-width: 1024px) 92vw, 42vw"
                            className="pointer-events-none mx-auto block h-auto w-full max-w-[620px] lg:max-w-[520px] xl:max-w-[580px]"
                        />
                    </div>

                    {/* ------------------------------------------ cards ---- */}
                    <div
                        role="group"
                        aria-label={data.eyebrow}
                        className="reveal grid content-center gap-4 lg:col-start-1 lg:row-span-2 lg:row-start-1"
                    >
                        {data.items.map((item, i) => {
                            const on = i === active;
                            return (
                                <div
                                    key={item.title}
                                    className={cn(
                                        "relative rounded-2xl border p-5 transition-[background-color,border-color,box-shadow] duration-300 ease-out sm:p-6",
                                        on
                                            ? "border-magenta-500/70 bg-[linear-gradient(97deg,var(--color-violet-800)_0%,var(--color-magenta-800)_100%)] shadow-glow"
                                            : "border-white/[0.08] bg-white/[0.03] hover:border-magenta-500/35 hover:bg-white/[0.05]",
                                    )}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* The homepage's own marks, at the
                                            homepage's size — each is an 80px
                                            circle with its gradient plate
                                            already drawn in, so there is no
                                            wrapper here. They are positional:
                                            `ServiceBenefits` carries no icon
                                            field, and the eleven SEO
                                            sub-service pages name their five
                                            items differently, so a mark cannot
                                            be keyed to a title without
                                            inventing per-page content. Read
                                            through `whatYouGet.tabs` rather
                                            than re-listing the five paths, so
                                            the two bands cannot drift apart.
                                            `alt=""`: on the homepage the mark
                                            names its own service, here it is
                                            decoration beside a heading that
                                            already says what the card is. */}
                                        <Image
                                            src={
                                                whatYouGet.tabs[
                                                    i % whatYouGet.tabs.length
                                                ].icon
                                            }
                                            alt=""
                                            aria-hidden="true"
                                            width={80}
                                            height={80}
                                            unoptimized
                                            className="size-11 shrink-0 sm:size-14"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-display text-ui-17 leading-[1.2] font-extrabold text-white sm:text-ui-19">
                                                {/* The whole card is the hit
                                                    area: a bare control
                                                    stretched over it, so the
                                                    heading stays plain text
                                                    and the click target is the
                                                    card, not the label. */}
                                                <button
                                                    type="button"
                                                    aria-pressed={on}
                                                    onClick={() => setActive(i)}
                                                    className="cursor-pointer text-left before:absolute before:inset-0 before:rounded-2xl before:content-['']"
                                                >
                                                    {item.title}
                                                </button>
                                            </h3>

                                            <p className="mt-1.5 text-sm leading-[1.55] text-white/65">
                                                {item.body}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
