import Image from "next/image";

import { methodology } from "@/content/home";
import {
    Eyebrow,
    SectionHead,
    SectionHeading,
} from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Methodology (v2) — four alternating editorial rows.
 *
 * v1 renders an orbiting icon ring with a native <details> accordion beside it.
 * Three things change here, all deliberate:
 *
 *   1. The four method images move from a half-width circle inside the orbit to
 *      full editorial scale. They are real photographs and were previously
 *      shown at ~110px.
 *   2. The accordion becomes plain rows, so all four step descriptions are
 *      visible at once rather than three of them being a click away. That is
 *      strictly more content rendered, not less.
 *   3. With no open/closed state left to track, this stops being a client
 *      component. v1 needs "use client" purely to sync the accordion to the
 *      orbit's centre image; nothing here hydrates at all.
 *
 * `methodology.orbitIcons` is consequently unused. It is a decorative asset
 * list, not copy — it stays in content/home.ts for v1, which still renders it.
 */
export default function Methodology() {
    return (
        <section className="relative isolate bg-ink-900 py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.42] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site">
                <SectionHead
                    className="reveal"
                    action={
                        <LeadButton variant="ghost">
                            {methodology.cta}
                        </LeadButton>
                    }
                >
                    <Eyebrow>{methodology.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={methodology.titleLead}
                        accent={methodology.titleAccent}
                        className="mb-0"
                    />
                </SectionHead>

                <ol className="flex flex-col gap-[clamp(2.5rem,1.5rem+3vw,4.5rem)]">
                    {methodology.steps.map((step, i) => {
                        const flipped = i % 2 === 1;
                        return (
                            <li
                                key={step.title}
                                className="reveal grid items-center gap-[clamp(1.5rem,1rem+3vw,4rem)] lg:grid-cols-2"
                            >
                                {/* `overflow-x-clip` contains the bloom, which
                                    bleeds 12% past this box on each side — off
                                    the viewport edge on a phone, which left the
                                    page scrollable sideways. `clip` rather than
                                    `hidden` so no scroll container is created. */}
                                <div
                                    className={`relative isolate min-w-0 overflow-x-clip ${flipped ? "lg:order-2" : ""}`}
                                >
                                    <div
                                        className="pointer-events-none absolute inset-[-12%] -z-10 glow-bloom opacity-45"
                                        aria-hidden="true"
                                    />
                                    <Image
                                        src={step.img}
                                        alt={`${step.title} — Creative Logo Design methodology`}
                                        width={720}
                                        height={540}
                                        sizes="(max-width: 992px) 92vw, 46vw"
                                        className="aspect-4/3 w-full rounded-lg object-cover shadow-lg"
                                    />
                                </div>

                                <div className="min-w-0">
                                    {/* Decorative: the <ol> already carries the
                                        ordering, so announcing "zero one" before
                                        each title would only be noise. */}
                                    <span
                                        className="gradient-text mb-2 block font-display text-numeral leading-[0.8] font-extrabold opacity-30"
                                        aria-hidden="true"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mb-4 text-h3 text-white">
                                        {step.title}
                                    </h3>
                                    <p className="max-w-[54ch] text-lead text-white/65">
                                        {step.body}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
