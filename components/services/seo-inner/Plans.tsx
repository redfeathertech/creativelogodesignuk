import Image from "next/image";

import type { ServiceHowItWorks } from "@/content/services/types";
import { SxEyebrow, SxHeading } from "./Shell";

/**
 * The three-step "how it works" band.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 — REBUILT ON THE PILLAR ("OUR APPROACH") COMPOSITION
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Same arrangement as {@link components/services/seo/Pillars}, the pillar
 * page's "OUR APPROACH" band: the neon dot-and-line backdrop, a centred head
 * with the flanked eyebrow, a numbered badge rail (01 · 02 · 03) threaded on a
 * hairline above the grid, and glass cards below it — hairline border, a
 * top-to-bottom gradient fill, and the step icon at the head of each.
 *
 * **Layout only. No copy changed.** Eyebrow, both halves of the heading, the
 * standfirst and all three step titles and paragraphs are the strings each
 * page's own `howItWorks` module has always carried;
 * `scripts/verify-content-parity.py` still passes unchanged.
 *
 * Two deliberate departures from the pillar band, both forced by the content
 * shape rather than by taste:
 *
 * - There is no `PILLAR nn` tag line inside the card. Those are strings the
 *   pillar page carries in content; inventing an equivalent here would be new
 *   copy on eleven ranking pages. The badge above the card carries the order.
 * - There is no checklist. `ServiceHowItWorks` has no `points`, and the same
 *   rule applies.
 *
 * The palette stays the page's own — `--sx-neon` / `--sx-violet` scoped under
 * `.seo-inner`, not the site-wide magenta the pillar band uses — so the band
 * still reads as part of this page rather than a transplant. The badge is
 * `aria-hidden`: the `<ol>` already carries the order.
 *
 * All three cards share one icon, as before. The per-step `key-point-N.svg`
 * art in content is thin white line work drawn for the lighter shared service
 * canvas and disappears against this one.
 */
export default function Plans({ data }: { data: ServiceHowItWorks }) {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas-2)] py-section text-white">
            {/* The pillar band's backdrop, bled to both viewport edges and
                sized rather than `fill`ed — `fill` emits no width/height, and
                every image in this build carries both. */}
            <Image
                src="/assets/img/services/seo/approach-bg.webp"
                alt=""
                aria-hidden="true"
                width={3840}
                height={2125}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center opacity-80"
            />
            {/* Holds the body copy legible where the artwork's glow brightens,
                and feathers the section into the ones above and below it. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(17_5_46/0.55)_0%,rgb(17_5_46/0.12)_20%,rgb(17_5_46/0.12)_80%,rgb(17_5_46/0.55)_100%)]"
            />

            <div className="relative container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <SxEyebrow flanked className="justify-center">
                        {data.eyebrow}
                    </SxEyebrow>
                    <SxHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-white/65">
                        {data.lead}
                    </p>
                </div>

                <div className="relative mt-14">
                    {/* The rail the step badges are threaded on. `top` is the
                        badge's own vertical centre — the badge is 2.75rem.
                        Drawn only from `lg`, where the grid is genuinely three
                        across; stacked, it would run through empty space. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[16.67%] top-[1.375rem] hidden h-px bg-[linear-gradient(90deg,transparent_0%,var(--sx-violet)_18%,var(--sx-neon)_50%,var(--sx-violet)_82%,transparent_100%)] opacity-70 lg:block"
                    />

                    <ol className="m-0 grid list-none gap-x-6 gap-y-12 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                        {data.steps.map((step, i) => (
                            <li
                                key={step.title}
                                className="reveal relative flex min-w-0 flex-col items-center"
                            >
                                <span
                                    aria-hidden="true"
                                    className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--sx-neon)_0%,var(--sx-violet)_100%)] font-display text-ui-13 font-bold text-white shadow-[0_0_24px_rgb(157_78_221/0.6)] ring-4 ring-[var(--sx-canvas-2)]"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <div className="mt-6 w-full min-w-0 flex-1 rounded-2xl border border-[var(--sx-line)] bg-[linear-gradient(180deg,rgb(255_255_255/0.09)_0%,rgb(255_255_255/0.03)_45%,rgb(10_2_33/0.42)_100%)] p-8 text-center shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-md transition-colors duration-300 ease-out hover:border-[var(--sx-line-hot)]">
                                    <Image
                                        src="/assets/img/services/seo-inner/plan-step.svg"
                                        alt=""
                                        aria-hidden="true"
                                        width={117}
                                        height={117}
                                        className="mx-auto size-[5.25rem]"
                                    />

                                    <h3 className="mt-6 font-display text-h5 font-bold text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mt-4 text-sm text-white/70">
                                        {step.body}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
