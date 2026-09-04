"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { whatYouGet } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { ChevronDown, ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * "What do you get" — the five service cards beside the monitor.
 *
 * Rebuilt to the approved dark design: the cards move to the left, the heading
 * and the monitor share the right, and the band drops from `bg-mist-100` onto
 * the client's backdrop. Not one string moved — see the notes on
 * `whatYouGet` in content/home.ts for what is net-new and what is verbatim.
 *
 * Two things about the markup are deliberate:
 *
 * 1. **Every card's body is always visible**, as in the design. Only the
 *    "Explore …" link is disclosed, so the cards are a selection control, not
 *    an accordion — `aria-pressed` buttons in a `role="group"`, the same
 *    reading components/home/Portfolio.tsx settled on for its filter row. A
 *    `tablist` would be a lie: there is no panel that appears and disappears.
 *
 * 2. **All five links stay in the DOM.** The collapsed ones are folded away
 *    with a `grid-template-rows` transition and `visibility`, not `display`,
 *    so the server-rendered HTML carries all five service URLs however the
 *    visitor leaves the section. On the live site none of these tabs link
 *    anywhere at all.
 *
 * The monitor is one flat image, deliberately. Its screen is part of the
 * supplied artwork, so nothing is composited into it and selecting a card does
 * not change it — the cards drive their own highlight and disclosure, nothing
 * else. An earlier pass layered a per-service screenshot over that screen; the
 * client asked for the image as supplied instead.
 */
export default function WhatYouGet() {
    const [active, setActive] = useState<number>(whatYouGet.defaultTab);

    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            {/* The band's backdrop. `object-cover` because the asset is a 1.85:1
                field and this band is taller than that on every phone — the
                glow curve and the dot sphere live in its bottom right, which is
                the corner cover keeps when it crops the sides. */}
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
                {/* Rows are explicit so the card column can span both of them on
                    the right-hand layout while the heading and the monitor
                    stack above one another beside it. Below `lg` the grid
                    collapses and DOM order takes over: heading, monitor, cards. */}
                <div className="grid gap-x-[clamp(2.5rem,1.5rem+4vw,4.5rem)] gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_auto]">
                    {/* ---------------------------------------- heading ---- */}
                    <div className="reveal max-lg:text-center lg:col-start-2 lg:row-start-1">
                        <Eyebrow className="max-lg:justify-center max-lg:[&>span]:hidden">
                            {whatYouGet.eyebrow}
                        </Eyebrow>

                        <h2 className="text-h2">
                            {whatYouGet.titleLead}{" "}
                            <span className="gradient-text">
                                {whatYouGet.titleAccent}
                            </span>
                            {whatYouGet.titleTrail}
                        </h2>

                        <p className="mt-6 max-w-[60ch] text-lead text-white/65 max-lg:mx-auto">
                            {whatYouGet.lead}
                        </p>

                        {/* The proof strip, rebuilt to the approved mock:
                            three bare marks sitting straight on the backdrop,
                            divided by hairlines — no plate, no fill, no border
                            around the row. Hairlines are borders on the items
                            after the first. The row stays three-across at
                            every width, as both mocks show, so the labels are
                            allowed to wrap to two lines rather than the row
                            stacking; the mark and the gaps shrink on a phone to
                            buy them the width to do it. */}
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
                                    {/* Native sizes differ by a pixel or two
                                        between the three marks, so they are
                                        fitted into one box rather than trusted
                                        to line up on their own. */}
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

                    {/* ---------------------------------------- monitor ---- */}
                    <div className="reveal lg:col-start-2 lg:row-start-2">
                        {/* Capped well under the artwork's native 743px on the
                            two-column layout: at full size the heading plus the
                            monitor run a couple of hundred pixels taller than
                            the card column beside them, and the cards — which
                            are centred against it — end up floating in the
                            middle of the band. Below `lg` there is nothing to
                            balance against, so it takes the full width. */}
                        <Image
                            src={whatYouGet.frame}
                            alt={whatYouGet.frameAlt}
                            aria-hidden="true"
                            width={743}
                            height={581}
                            sizes="(max-width: 1024px) 96vw, 42vw"
                            className="pointer-events-none mx-auto block h-auto w-full max-w-[743px] lg:max-w-[560px] xl:max-w-[640px]"
                        />
                    </div>

                    {/* ------------------------------------------ cards ---- */}
                    <div
                        role="group"
                        aria-label={whatYouGet.eyebrow}
                        className="reveal grid content-center gap-4 lg:col-start-1 lg:row-span-2 lg:row-start-1"
                    >
                        {whatYouGet.tabs.map((tab, i) => {
                            const on = i === active;
                            return (
                                <div
                                    key={tab.label}
                                    className={cn(
                                        "relative rounded-2xl border p-5 transition-[background-color,border-color,box-shadow] duration-300 ease-out sm:p-6",
                                        on
                                            ? "border-magenta-500/70 bg-[linear-gradient(97deg,var(--color-violet-800)_0%,var(--color-magenta-800)_100%)] shadow-glow"
                                            : "border-white/[0.08] bg-white/[0.03] hover:border-magenta-500/35 hover:bg-white/[0.05]",
                                    )}
                                >
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src={tab.icon}
                                            alt={tab.iconAlt}
                                            width={80}
                                            height={80}
                                            unoptimized
                                            className="size-11 shrink-0 sm:size-14"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-display text-ui-17 leading-[1.2] font-extrabold text-white sm:text-ui-19">
                                                {/* The whole card is the hit
                                                    area: the button is a bare
                                                    control stretched over it
                                                    with `absolute inset-0`, so
                                                    the heading text stays plain
                                                    text and the click target is
                                                    the card, not the label. */}
                                                <button
                                                    type="button"
                                                    aria-pressed={on}
                                                    onClick={() => setActive(i)}
                                                    className="cursor-pointer text-left before:absolute before:inset-0 before:rounded-2xl before:content-['']"
                                                >
                                                    {tab.label}
                                                </button>
                                            </h3>

                                            <p className="mt-1.5 text-sm leading-[1.55] text-white/65">
                                                {tab.body}
                                            </p>

                                            {/* Folded away rather than removed:
                                                see the note at the top of the
                                                file. `visibility` is what keeps
                                                the collapsed link out of the
                                                tab order and the a11y tree
                                                while still letting the row
                                                animate — `display: none` would
                                                not transition at all. */}
                                            <div
                                                className={cn(
                                                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                                                    on
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0",
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "overflow-hidden",
                                                        !on && "invisible",
                                                    )}
                                                >
                                                    <Link
                                                        href={tab.href}
                                                        /* Above the card's
                                                           stretched hit area,
                                                           or the button would
                                                           swallow the click. */
                                                        className="relative z-1 mt-3 inline-flex items-center gap-2 text-sm font-bold text-magenta-100 underline underline-offset-4 transition-colors hover:text-white"
                                                    >
                                                        Explore {tab.label}
                                                        <ArrowIcon />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                /* Dropped outright under 380px.
                                                   It is `aria-hidden` chrome,
                                                   and the 40px it holds is the
                                                   difference between a body
                                                   that wraps at five words and
                                                   one that wraps at three — the
                                                   active card is already
                                                   unmistakable from its fill. */
                                                "hidden size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out min-[380px]:grid sm:size-10",
                                                on
                                                    ? "rotate-180 border-transparent bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] text-white"
                                                    : "border-white/10 bg-white/[0.04] text-white/55",
                                            )}
                                        >
                                            <ChevronDown className="size-4" />
                                        </span>
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
