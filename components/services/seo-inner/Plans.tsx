import Image from "next/image";

import type { ServiceHowItWorks } from "@/content/services/types";
import { SxEyebrow, SxHeading } from "./Shell";

/**
 * The three-step "how it works" band.
 *
 * The mock draws the step numbers as a connected row of chips sitting on top
 * of the cards, so the number is a positioned chip rather than a prefix on the
 * card title — which is also why it is `aria-hidden`: the `<ol>` already
 * carries the order for a screen reader, and "01. Choose a Plan" read aloud
 * repeats it.
 *
 * All three cards share one badge, as the mock does. The per-step
 * `key-point-N.svg` icons in content are thin white line art drawn for the
 * lighter shared service canvas and disappear against this one.
 */
export default function Plans({ data }: { data: ServiceHowItWorks }) {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas-2)] py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh-sx"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-grid-sx"
                aria-hidden="true"
            />

            <div className="relative container-site">
                <div className="reveal mx-auto max-w-[68ch] text-center">
                    <SxEyebrow className="justify-center">
                        {data.eyebrow}
                    </SxEyebrow>
                    <SxHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 text-lead text-white/60">
                        {data.lead}
                    </p>
                </div>

                {/* `pt-7` on the list leaves room for the chips, which are
                    pulled half out of the top of each card. */}
                <ol className="relative mt-14 grid gap-x-6 gap-y-14 pt-7 md:grid-cols-3">
                    {/* The dashed rule linking the three chips. Decorative, and
                        only drawn once the cards are actually side by side —
                        stacked, there is no row for it to run along. */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[16%] top-7 hidden border-t border-dashed border-[var(--sx-line)] md:block"
                    />

                    {data.steps.map((step, i) => (
                        <li
                            key={step.title}
                            className="reveal relative rounded-lg border border-[var(--sx-line)] bg-[var(--sx-card)] px-7 pt-14 pb-8 text-center backdrop-blur-sm transition-colors duration-300 ease-out hover:border-[var(--sx-line-hot)]"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border-4 border-[var(--sx-canvas-2)] bg-[linear-gradient(97deg,var(--sx-neon)_0%,var(--sx-violet)_100%)] font-display text-ui-15 font-extrabold text-white"
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <Image
                                src="/assets/img/services/seo-inner/plan-step.svg"
                                alt=""
                                aria-hidden="true"
                                width={117}
                                height={117}
                                className="mx-auto mb-6 size-16"
                            />

                            <h3 className="mb-3 text-h5 font-bold text-white">
                                {step.title}
                            </h3>
                            <p className="text-white/60">{step.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
