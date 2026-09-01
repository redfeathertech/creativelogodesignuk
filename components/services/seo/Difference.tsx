import Image from "next/image";

import { difference } from "@/content/landing/seo-services";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Difference — the two-column "them vs us" comparison.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Was a light section with two flat white cards. Rebuilt to the client's
 * approved composition: the neon backdrop on the `ink-950` canvas, a centred
 * head with the flanked eyebrow, and two glass cards — the big-agency one on a
 * plain hairline border, ours ringed in magenta with an outer glow. Each card
 * heads with the client's own circular SVG, and the rows are separated by
 * hairlines rather than gaps.
 *
 * **Layout only. No copy changed.** Eyebrow, heading, standfirst, both card
 * titles and all ten list points are the strings this page has always carried,
 * and `scripts/verify-seo-services-parity.py` still gates them in both
 * directions. The "THE … DIFFERENCE" badge is not in the client's mockup and is
 * no longer rendered (client's call, 2026-09); `difference.good.badge` stays in
 * the content module so the parity script keeps its live counterpart mapped.
 *
 * The new keys are the backdrop and the two `icon` paths; `src`/`icon` sit
 * outside the parity script's copy set (`NOT_COPY`), the artwork being
 * something the live page does not carry. Both icons are decorative — the card
 * title beside each says which side it marks — so they take `alt=""`.
 */

const cardTitle = "font-display text-base font-extrabold tracking-[0.1em] uppercase";
const list = "m-0 mt-6 list-none grid p-0";
const item = "flex items-start gap-3 py-3.5 text-sm text-white/70";

export default function Difference() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            {/* Sized rather than `fill`ed — `fill` emits no width/height, and
                every image in this build carries both. */}
            <Image
                src={difference.background.src}
                alt=""
                aria-hidden="true"
                width={difference.background.width}
                height={difference.background.height}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center"
            />
            {/* Feathers the section into the ones above and below it. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_2_15/0.55)_0%,transparent_20%,transparent_80%,rgb(7_2_15/0.55)_100%)]"
            />

            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow flanked className="justify-center text-magenta-400">
                        {difference.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={difference.titleLead}
                        accent={difference.titleTrail}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-white/65">
                        {difference.description}
                    </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-[74rem] items-start gap-6 lg:grid-cols-2">
                    {/* ----------------------------------------------- them -- */}
                    <div className="reveal min-w-0 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgb(255_255_255/0.06)_0%,rgb(7_2_15/0.45)_100%)] p-8 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <Image
                                src={difference.bad.icon}
                                alt=""
                                aria-hidden="true"
                                width={33}
                                height={33}
                                className="size-8 shrink-0"
                            />
                            <h3 className={`${cardTitle} text-white`}>
                                {difference.bad.title}
                            </h3>
                        </div>

                        <ul className={list}>
                            {difference.bad.points.map((point) => (
                                <li
                                    key={point}
                                    className={`${item} border-b border-white/[0.07] last:border-b-0`}
                                >
                                    {/* The plain dot marker — the crossed-out
                                        side carries no tick. */}
                                    <span
                                        aria-hidden="true"
                                        className="mt-1.5 size-2 shrink-0 rounded-full bg-magenta-400"
                                    />
                                    <span className="min-w-0">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ------------------------------------------------- us -- */}
                    <div className="reveal relative min-w-0 rounded-2xl bg-[linear-gradient(180deg,rgb(168_85_247/0.16)_0%,rgb(7_2_15/0.5)_100%)] p-8 shadow-[0_0_60px_-12px_rgb(217_70_239/0.55)] ring-[1.5px] ring-magenta-500 ring-inset backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <Image
                                src={difference.good.icon}
                                alt=""
                                aria-hidden="true"
                                width={41}
                                height={39}
                                className="size-8 shrink-0 object-contain"
                            />
                            <h3 className={`${cardTitle} text-white`}>
                                {difference.good.title}
                            </h3>
                        </div>

                        <ul className={list}>
                            {difference.good.points.map((point) => (
                                <li
                                    key={point}
                                    className={`${item} border-b border-white/[0.07] text-white/80 last:border-b-0`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                                    >
                                        <CheckIcon className="size-3" />
                                    </span>
                                    <span className="min-w-0">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
