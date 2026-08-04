import Image from "next/image";

import { about } from "@/content/home";
import { Eyebrow, Section } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import Counter from "@/components/ui/Counter";
import PlayCta from "@/components/home/PlayCta";

/**
 * About (v2) — "Still Wondering? Your Competitors Aren't Waiting".
 *
 * Every string is content/home.ts's, unchanged. The composition is new: the
 * photo pair moves to the left and goes large, overlapping on a diagonal with
 * a thick white outline separating them, and the stats read as a rule-divided
 * rail rather than three centred cells.
 *
 * This stays a LIGHT section, deliberately. `PlayCta` is styled for light
 * surfaces (`text-onlight`, magenta hover) and is imported unmodified from v1,
 * so a dark canvas here would render it near-invisible. Light also gives the
 * page the rhythm it wants — the hero and the logo band above are both dark.
 *
 * `about.badge` is NOT rendered, matching v1, where it is commented out. It is
 * live copy that was deliberately switched off; re-enabling it here would be a
 * content change smuggled in under a redesign.
 */
export default function About() {
    return (
        <Section tone="light">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                {/* Images. `overflow-x-clip` contains the glow, which bleeds past
                    this box on each side — off the edge of the viewport on a
                    phone, which left the page scrollable sideways. `clip` rather
                    than `hidden` so no scroll container is created. */}
                <div className="reveal relative min-w-0 overflow-x-clip">
                    <span
                        className="pointer-events-none absolute -inset-x-[6%] -inset-y-[12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(204_6_127/0.18),transparent_72%)] blur-[8px]"
                        aria-hidden="true"
                    />

                    {/* aspect-[5/6] holds the box open so the absolutely-placed
                        front image can never collapse the row, and nothing shifts
                        as the images decode. Below 576px the pair unstacks into a
                        single image — two overlapping photos at phone width leave
                        neither of them legible. */}
                    <div className="relative aspect-[5/6] w-full min-[576px]:block">
                        <Image
                            src={about.images.back.src}
                            alt={about.images.back.alt}
                            width={640}
                            height={800}
                            sizes="(max-width: 992px) 92vw, 40vw"
                            className="absolute top-0 right-0 hidden h-[80%] w-[76%] rounded-lg object-cover shadow-lg min-[576px]:block"
                        />
                        <Image
                            src={about.images.front.src}
                            alt={about.images.front.alt}
                            width={560}
                            height={700}
                            sizes="(max-width: 992px) 92vw, 34vw"
                            className="h-full w-full rounded-lg object-cover shadow-lg min-[576px]:absolute min-[576px]:bottom-0 min-[576px]:left-0 min-[576px]:h-[68%] min-[576px]:w-[62%] min-[576px]:outline-8 min-[576px]:outline-white"
                        />
                    </div>
                </div>

                <div className="reveal min-w-0">
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

                    <div className="mt-8 mb-12 flex flex-wrap items-center gap-6">
                        <LeadButton variant="primary" size="lg">
                            {about.primaryCta}
                        </LeadButton>
                        <PlayCta label={about.playCta} />
                    </div>

                    {/* Rules between the stats only, never at the outer edges —
                        hence the border on all but the first cell rather than a
                        `divide` utility, which would also rule the wrap seam. */}
                    <dl className="grid grid-cols-1 border-t border-ink-900/10 min-[480px]:grid-cols-3">
                        {about.stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`min-w-0 py-6 min-[480px]:px-5 ${
                                    i > 0
                                        ? "border-t border-ink-900/10 min-[480px]:border-t-0 min-[480px]:border-l"
                                        : ""
                                }`}
                            >
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <Counter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        className="gradient-text-brand block font-display text-[clamp(1.9rem,1.2rem+2.6vw,2.9rem)] leading-none font-extrabold tracking-[-0.02em]"
                                    />
                                    <span className="mt-2 block text-xs tracking-[0.08em] text-onlight-muted uppercase">
                                        {stat.label}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </Section>
    );
}
