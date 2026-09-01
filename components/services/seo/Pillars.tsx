import Image from "next/image";

import { pillars } from "@/content/landing/seo-services";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Pillars — "How Our SEO Service Works", three cards.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Rebuilt to the client's approved composition: the neon dot-and-line backdrop
 * on the `ink-950` canvas, a centred head with the flanked eyebrow, a numbered
 * step rail (01 · 02 · 03) threaded on a hairline above the grid, and three
 * glass cards — purple hairline border, a top-to-bottom dark gradient, and the
 * client's circular SVG icon at the head of each.
 *
 * **Layout only. No copy changed.** Heading, standfirst, the three `PILLAR nn`
 * tags, titles, body copy and every checklist point are the strings this page
 * has always carried, and `scripts/verify-seo-services-parity.py` still gates
 * them in both directions — the tag in particular stays rendered because the
 * reverse pass requires every live text run to survive. The step badge shows
 * only the numeral and is `aria-hidden`: it is a visual restatement of the tag
 * beside it, so announcing "01" twice would be noise.
 *
 * New strings are the three `iconAlt` values in the content module. Keys ending
 * `Alt` sit outside the parity script's copy set by design (`NOT_COPY`), the
 * icons being artwork the live page does not carry.
 *
 * The connector hairline is drawn only from `lg`, where the grid is genuinely
 * three across; below that the cards stack and a line between them would run
 * through empty space. It is inset to the middle third so it starts and ends
 * under the outer badges rather than at the container edges.
 */
export default function Pillars() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            {/* The backdrop, bled to both viewport edges and sized rather than
                `fill`ed — `fill` emits no width/height, and every image in this
                build carries both. It covers the section's whole height, so
                `object-cover` crops it rather than stretching the composition. */}
            <Image
                src={pillars.background.src}
                alt=""
                aria-hidden="true"
                width={pillars.background.width}
                height={pillars.background.height}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center"
            />
            {/* Holds the body copy legible where the artwork's glow brightens,
                and feathers the section into the ones above and below it. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_2_15/0.12)_0%,transparent_18%,transparent_82%,rgb(7_2_15/0.14)_100%)]"
            />

            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow flanked className="justify-center">
                        {pillars.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={pillars.title}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-white/70">
                        {pillars.description}
                    </p>
                </div>

                <div className="relative mt-14">
                    {/* The rail the step badges are threaded on. `top` is the
                        badge's own vertical centre — the badge is 2.75rem. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[16.67%] top-[1.375rem] hidden h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-violet-500)_18%,var(--color-magenta-500)_50%,var(--color-violet-500)_82%,transparent_100%)] opacity-70 lg:block"
                    />

                    <ul className="m-0 grid list-none gap-x-6 gap-y-12 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                        {pillars.items.map((item) => (
                            <li
                                key={item.tag}
                                className="reveal relative flex min-w-0 flex-col items-center"
                            >
                                {/* The numeral only — the full "PILLAR nn" tag
                                    is inside the card, and is what a screen
                                    reader gets. */}
                                <span
                                    aria-hidden="true"
                                    className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] font-display text-ui-13 font-bold text-white shadow-[0_0_24px_rgb(168_85_247/0.55)] ring-4 ring-ink-950/80"
                                >
                                    {item.tag.slice(-2)}
                                </span>

                                <div className="mt-6 w-full min-w-0 flex-1 rounded-2xl border border-violet-400/25 bg-[linear-gradient(180deg,rgb(255_255_255/0.09)_0%,rgb(255_255_255/0.03)_45%,rgb(7_2_15/0.35)_100%)] p-8 text-center shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-md">
                                    <Image
                                        src={item.icon}
                                        alt={item.iconAlt}
                                        width={117}
                                        height={117}
                                        className="mx-auto size-[5.25rem]"
                                    />

                                    <p className="m-0 mt-6 font-display text-ui-13 font-bold tracking-[0.2em] text-magenta-300 uppercase">
                                        {item.tag}
                                    </p>

                                    <h3 className="mt-3 font-display text-h5 font-bold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-sm text-white/70">{item.text}</p>

                                    <ul className="m-0 mt-7 grid list-none gap-4 p-0 text-left">
                                        {item.points.map((point) => (
                                            <li
                                                key={point}
                                                className="flex items-start gap-3 text-sm text-white/75"
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
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
