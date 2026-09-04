import Image from "next/image";

import { process } from "@/content/landing/seo-services";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";

/**
 * Process — "From Audit to Page One in 4 Steps".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The client's approved composition: the pillars' neon dot-and-line backdrop
 * under a two-column band — head plus artwork on the left, the four steps on
 * the right as glass cards threaded on a vertical gradient rail, each numbered
 * disc sitting on the rail and each card carrying its circular SVG icon.
 *
 * **Layout only. No copy changed.** Eyebrow, both halves of the heading, and
 * all four step titles and paragraphs are the strings this page has always
 * carried; `scripts/verify-seo-services-parity.py` gates them in both
 * directions. New strings are the four `iconAlt` values, which sit outside the
 * script's copy set by design (`NOT_COPY` skips keys ending `Alt`) — the icons
 * and the bulb are artwork the live page does not carry.
 *
 * The rail runs at every width — on narrow screens the cards indent and the
 * discs, a size down, sit on it against the card edge (the client's mobile
 * reference). Only the spur between disc and card is `lg`-only: below that the
 * two already touch, so there is no gap left to bridge.
 *
 * Step titles stay `h3`, as on the live page, so the levels run h2 → h3.
 */
export default function Process() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            {/* Sized rather than `fill`ed — `fill` emits no width/height, and
                every image in this build carries both. */}
            <Image
                src={process.background.src}
                alt=""
                aria-hidden="true"
                width={process.background.width}
                height={process.background.height}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center"
            />
            {/* Feathers the section into the ones above and below it and holds
                the body copy legible where the artwork's glow brightens. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_2_15/0.14)_0%,transparent_18%,transparent_82%,rgb(7_2_15/0.14)_100%)]"
            />

            <div className="container-site">
                <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-16">
                    <div className="reveal flex flex-col">
                        <Eyebrow>{process.eyebrow}</Eyebrow>
                        <SectionHeading
                            lead={process.titleLead}
                            accent={process.titleTrail}
                            accentClassName="bg-[linear-gradient(97deg,#7225AD_0%,#CC067F_100%)] bg-clip-text pb-[0.08em] text-transparent"
                            className="text-balance"
                        />
                        <Image
                            src={process.image.src}
                            alt=""
                            aria-hidden="true"
                            width={process.image.width}
                            height={process.image.height}
                            sizes="(min-width: 1024px) 44vw, 92vw"
                            className="mt-9 h-auto w-full rounded-2xl object-cover ring-1 ring-white/10 lg:min-h-0 lg:h-full lg:flex-1"
                        />
                    </div>

                    <ol className="relative m-0 grid list-none content-between gap-6 p-0 pl-[2.25rem] lg:pl-[4.5rem]">
                        {/* The rail the numbered discs are threaded on. It
                            overruns the list by 2.5rem at each end, so a stub
                            shows above 01 and below 04 and the two ends fade
                            out rather than stopping dead. */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-10 -bottom-10 left-[1.25rem] w-px bg-[linear-gradient(180deg,transparent_0%,var(--color-magenta-500)_12%,var(--color-violet-500)_88%,transparent_100%)] lg:left-[1.6rem]"
                        />

                        {process.steps.map((step) => (
                            <li key={step.number} className="reveal relative">
                                <span
                                    aria-hidden="true"
                                    className="absolute top-1/2 -left-[2.25rem] z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(97deg,#CC067F_0%,#7225AD_100%)] font-display text-[0.8125rem] font-extrabold text-white shadow-[0_0_28px_rgb(204_6_127/0.45)] lg:size-[52px] lg:-left-[4.5rem] lg:text-ui-17"
                                >
                                    {step.number}
                                </span>

                                {/* The spur that ties each disc to its own
                                    card, so the rail reads as four branches
                                    rather than a line running past them. */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute top-1/2 -left-[1.25rem] hidden h-px w-[1.25rem] bg-[linear-gradient(90deg,var(--color-magenta-500)_0%,rgb(255_255_255/0.18)_100%)] lg:block"
                                />

                                <div className="flex items-center gap-4 rounded-2xl border border-white/12 bg-[linear-gradient(103deg,rgb(114_37_173/0.34)_0%,rgb(23_9_38/0.72)_58%,rgb(204_6_127/0.28)_100%)] p-5 pl-6 backdrop-blur-sm sm:gap-5 sm:p-7">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="mb-2 text-h4 text-white">{step.title}</h3>
                                        <p className="text-white/70">{step.text}</p>
                                    </div>
                                    <Image
                                        src={step.icon}
                                        alt={step.iconAlt}
                                        width={72}
                                        height={72}
                                        className="size-12 shrink-0 sm:size-[72px]"
                                    />
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
