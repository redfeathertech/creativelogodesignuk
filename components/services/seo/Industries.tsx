import Image from "next/image";
import Link from "next/link";

import { industries } from "@/content/landing/seo-services";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";

/**
 * Industries — six vertical cards, on the client's approved light composition.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Was a `darker` section with inline glyphs; now the pale `#F9F9FC` canvas from
 * the approved artwork, white cards on a hairline ring, and the client's own
 * circular SVG icons. The closing line becomes a gradient-ringed callout with
 * the warning mark, rather than a loose paragraph.
 *
 * **Layout only. No copy changed.** The heading is the same sentence, split at
 * "Specific Industry" so the second half can take the brand gradient, and the
 * closing line is the same sentence split at its first full stop so the
 * question can head the callout — both still render contiguously, which is what
 * `scripts/verify-seo-services-parity.py` checks in both directions.
 *
 * New strings are the `*Alt` values; keys ending `Alt` sit outside the parity
 * script's copy set (`NOT_COPY`) by design, the icons being artwork the live
 * page does not carry.
 *
 * Every card carries its own disc from the client's icon set, including
 * `industry-professional-services.svg`, which arrived after the first pass.
 */
export default function Industries() {
    return (
        <section className="relative isolate bg-[#F9F9FC] py-section text-onlight">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow flanked className="justify-center">
                        {industries.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={industries.titleLead}
                        accent={industries.titleAccent}
                        accentClassName="gradient-text-brand block"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[68ch] text-lead text-onlight/70">
                        {industries.description}
                    </p>
                </div>

                <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {industries.items.map((item) => (
                        <li
                            key={item.title}
                            className="reveal min-w-0 rounded-lg border border-black/[0.07] bg-white p-7 shadow-[0_1px_2px_rgb(16_12_32/0.04),0_12px_28px_-18px_rgb(16_12_32/0.28)]"
                        >
                            <Image
                                src={item.icon}
                                alt={item.iconAlt}
                                width={74}
                                height={74}
                                className="mb-5 size-14"
                            />

                            <h3 className="mb-2 text-h4">{item.title}</h3>

                            <p className="text-onlight/70">{item.text}</p>
                        </li>
                    ))}
                </ul>

                {/* The gradient ring is a padded gradient sheet with the white
                    card sitting inside it — a border cannot carry a gradient. */}
                <div className="reveal mt-10 rounded-lg overflow-hidden bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] p-[2px]">
                    <div className="flex flex-col items-start gap-5 rounded-[calc(0.5rem_-_2px)] bg-clip-padding bg-white px-7 py-7 sm:flex-row sm:items-center sm:gap-7">
                        <Image
                            src={industries.calloutIcon}
                            alt={industries.calloutIconAlt}
                            width={100}
                            height={72}
                            className="h-14 w-auto shrink-0"
                        />
                        <div className="min-w-0">
                            <h3 className="text-h4">{industries.calloutTitle}</h3>
                            <p className="mt-1 text-onlight/70">
                                {industries.bottomTextLead}{" "}
                                <Link
                                    href="/contact-us"
                                    className="font-bold text-magenta-500 underline underline-offset-4 transition-colors duration-200 hover:text-violet-500"
                                >
                                    {industries.bottomLinkText}
                                </Link>{" "}
                                {industries.bottomTextTrail}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
