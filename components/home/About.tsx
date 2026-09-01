import Image from "next/image";
import { about } from "@/content/home";
import { Eyebrow, Section } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * About. Copy on the left, an offset two-image stack on the right sitting on a
 * soft brand glow.
 *
 * Both CTAs open the lead panel — they always did, the second was just dressed
 * as a play button — so they are now a plain primary/outline pair, matching the
 * hero and every other section.
 */
export default function About() {
    return (
        <Section tone="light" id="about">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,5rem)] lg:grid-cols-2">
                <div className="reveal max-lg:text-center">
                    <Eyebrow className="text-magenta-500 max-lg:justify-center max-lg:[&>span]:hidden">
                        {about.eyebrow}
                    </Eyebrow>

                    <h2 className="mb-6 text-h2">
                        {about.titleLead}
                        <br />
                        {about.titleMid}{" "}
                        <span className="gradient-text-brand">
                            {about.titleAccent}
                        </span>
                    </h2>

                    <p className="max-w-[62ch] text-lead text-onlight-muted max-lg:mx-auto">
                        {about.lead}
                    </p>

                    <div className="mt-6 mb-10 flex flex-wrap items-center gap-4 max-lg:justify-center max-sm:flex-col max-sm:items-stretch">
                        <LeadButton variant="primary">
                            {about.primaryCta}
                            <ArrowIcon />
                        </LeadButton>
                        <LeadButton variant="outline">
                            {about.secondaryCta}
                        </LeadButton>
                    </div>

                    {/* Three proof points, ruled top and bottom with a
                        divider between each — the same rail the hero uses, on
                        the light canvas. The dividers are borders on the items
                        rather than separate elements, so a wrap drops the
                        leading rule with its item instead of stranding it.
                        Three-up at every width. Below `md` the icon sits above
                        the label instead of beside it — side-by-side is what
                        overflowed a phone, not the three columns themselves —
                        and each item takes an equal third so the dividers line
                        up under the centred copy above. */}
                    <div className="border-y border-ink-900/10 py-6">
                        <ul className="flex flex-row flex-wrap items-stretch md:items-center">
                            {about.features.map((feature) => (
                                <li
                                    key={feature.title}
                                    className="flex min-w-0 flex-1 basis-0 flex-col items-center gap-2 px-2 text-center not-first:border-s not-first:border-ink-900/10 md:flex-none md:basis-auto md:flex-row md:gap-3 md:px-0 md:pe-5 md:ps-5 md:text-start md:first:ps-0"
                                >
                                    <Image
                                        src={feature.icon}
                                        alt={feature.iconAlt}
                                        width={48}
                                        height={48}
                                        unoptimized
                                        className="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9"
                                    />
                                    <div className="min-w-0">
                                        <span className="gradient-text-brand block font-display text-[clamp(1rem,0.9rem+0.4vw,1.125rem)] leading-none font-extrabold tracking-[0.02em] uppercase">
                                            {feature.title}
                                        </span>
                                        <span className="mt-1.5 block text-ui-11 tracking-[0.08em] text-onlight-muted uppercase">
                                            {feature.label}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* `overflow-x-clip` contains the glow below. It bleeds 6% past
                    this box on each side, which is off the edge of the viewport on
                    a phone and left the page scrollable sideways by ~10px. `clip`
                    rather than `hidden` so no scroll container is created — that
                    would break the sticky column on the other side of this grid. */}
                <div className="reveal relative overflow-x-clip">
                    <span
                        className="pointer-events-none absolute -inset-y-[12%] -inset-x-[6%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(204_6_127/0.16),transparent_72%)] blur-[8px]"
                        aria-hidden="true"
                    />

                    {/* The stack: the back plate sits high and to the right,
                        the front one drops below it. `items-start` plus the
                        offsets do that without absolute positioning. Both
                        plates show at every width — two-up on a phone as well,
                        so the pair reads as a stack there instead of the front
                        one standing alone. */}
                    <div className="grid grid-cols-2 items-start gap-4 sm:gap-5">
                        <Image
                            src={about.images.back.src}
                            alt={about.images.back.alt}
                            width={480}
                            height={640}
                            sizes="(max-width: 992px) 45vw, 24vw"
                            className="aspect-[3/4] w-full rounded-2xl object-cover shadow-[0_24px_60px_-24px_rgb(13_3_28/0.35)] md:mt-[clamp(1.5rem,4vw,3.5rem)]"
                        />
                        <Image
                            src={about.images.front.src}
                            alt={about.images.front.alt}
                            width={480}
                            height={640}
                            sizes="(max-width: 992px) 45vw, 24vw"
                            className="aspect-[3/4] w-full rounded-2xl object-cover shadow-[0_24px_60px_-24px_rgb(13_3_28/0.35)] md:mb-[clamp(1.5rem,4vw,3.5rem)]"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
