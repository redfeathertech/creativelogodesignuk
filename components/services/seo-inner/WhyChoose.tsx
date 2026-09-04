import Image from "next/image";

import type { ServiceWhyChoose } from "@/content/services/types";
import { SxEyebrow, SxHeading } from "./Shell";

/**
 * The six reasons, as a 3-up card grid on the dark canvas.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 — REBUILT ON THE "HOW IT WORKS" BACKDROP
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Same treatment as {@link Plans}, on the client's instruction that the two
 * bands share a surface: the `approach-bg` artwork bled to both viewport
 * edges, the same feathering scrim over it, the flanked centred eyebrow, and
 * glass cards with a hairline border and a top-to-bottom gradient fill.
 *
 * **Layout only. No copy changed.** The eyebrow, both halves of the heading
 * and all six titles and bodies are the strings each page's own `whyChoose`
 * module has always carried, still one `h3` per card;
 * `scripts/verify-content-parity.py` passes unchanged.
 *
 * The card's mark moved from a rounded square above the title to a gradient
 * disc beside it, so the title reads on the same line as the mark and the body
 * runs the full width of the card beneath both. It stays `aria-hidden`
 * decoration: `ServiceWhyChoose` carries no icon field, so the one supplied
 * mark serves all six and it says nothing the heading beside it does not. The
 * disc, its ramp and its hairline ring are drawn into the asset itself, so
 * there is no wrapper around it here.
 */
export default function WhyChoose({ data }: { data: ServiceWhyChoose }) {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas-2)] py-section text-white">
            {/* Sized rather than `fill`ed — `fill` emits no width/height, and
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
                </div>

                <ul className="mt-14 grid gap-5 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {data.features.map((feature) => (
                        <li
                            key={feature.title}
                            className="reveal min-w-0 rounded-2xl border border-[#CCCCCC54] bg-[linear-gradient(180deg,rgb(255_255_255/0.09)_0%,rgb(255_255_255/0.03)_45%,rgb(10_2_33/0.42)_100%)] p-6 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-md transition-colors duration-300 ease-out hover:border-[var(--sx-line-hot)] sm:p-7"
                        >
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/assets/img/services/seo-inner/why-choose.svg"
                                    alt=""
                                    aria-hidden="true"
                                    width={50}
                                    height={50}
                                    className="size-11 shrink-0 sm:size-[50px]"
                                />
                                <h3 className="min-w-0 font-display text-h5 font-bold text-white">
                                    {feature.title}
                                </h3>
                            </div>

                            <p className="mt-4 text-sm text-white/70">
                                {feature.body}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
