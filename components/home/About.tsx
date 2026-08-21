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
        <Section tone="light">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,5rem)] lg:grid-cols-2">
                <div className="reveal">
                    <Eyebrow className="text-magenta-500">
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

                    <p className="max-w-[62ch] text-lead text-onlight-muted">
                        {about.lead}
                    </p>

                    <div className="mt-6 mb-10 flex flex-wrap items-center gap-4">
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
                        Below `sm` the three stack: an icon plus two lines of
                        label does not fit three-up at a phone width without
                        the second line wrapping mid-word. */}
                    <ul className="flex flex-col gap-5 border-y border-ink-900/10 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
                        {about.features.map((feature) => (
                            <li
                                key={feature.title}
                                className="flex items-center gap-3 sm:pe-5 sm:ps-5 sm:first:ps-0 sm:not-first:border-s sm:not-first:border-ink-900/10"
                            >
                                <Image
                                    src={feature.icon}
                                    alt={feature.iconAlt}
                                    width={48}
                                    height={48}
                                    unoptimized
                                    className="h-9 w-9 shrink-0 object-contain"
                                />
                                <div className="min-w-0">
                                    <span className="gradient-text-brand block font-display text-[clamp(1rem,0.9rem+0.4vw,1.125rem)] leading-none font-extrabold tracking-[0.02em] uppercase">
                                        {feature.title}
                                    </span>
                                    <span className="mt-1.5 block text-[0.6875rem] tracking-[0.08em] text-onlight-muted uppercase">
                                        {feature.label}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
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
                        offsets do that without absolute positioning, so the
                        pair still reflows to a single column on a phone. */}
                    <div className="grid grid-cols-1 items-start gap-5 min-[576px]:grid-cols-2">
                        <Image
                            src={about.images.back.src}
                            alt={about.images.back.alt}
                            width={480}
                            height={640}
                            sizes="(max-width: 992px) 45vw, 24vw"
                            className="hidden aspect-[3/4] w-full rounded-2xl object-cover shadow-[0_24px_60px_-24px_rgb(13_3_28/0.35)] min-[576px]:mt-[clamp(1.5rem,4vw,3.5rem)] min-[576px]:block"
                        />
                        <Image
                            src={about.images.front.src}
                            alt={about.images.front.alt}
                            width={480}
                            height={640}
                            sizes="(max-width: 992px) 45vw, 24vw"
                            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_24px_60px_-24px_rgb(13_3_28/0.35)] min-[576px]:mb-[clamp(1.5rem,4vw,3.5rem)] min-[576px]:aspect-[3/4]"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
