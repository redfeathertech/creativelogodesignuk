import Image from "next/image";
import { about } from "@/content/home";
import { Eyebrow, Section } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import Counter from "@/components/ui/Counter";
import PlayCta from "./PlayCta";

/**
 * About. Copy on the left, an offset two-image stack on the right sitting on a
 * soft brand glow, with the availability badge overhanging the lower edge.
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

                    <div className="mt-6 mb-12 flex flex-wrap items-center gap-6">
                        <LeadButton variant="outline">
                            {about.primaryCta}
                        </LeadButton>
                        <PlayCta label={about.playCta} />
                    </div>

                    <dl className="grid grid-cols-3 border-t border-ink-900/10">
                        {about.stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`px-3 pt-6 text-center ${i > 0 ? "border-l border-ink-900/10" : ""}`}
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

                    <div className="grid grid-cols-1 items-start gap-4 min-[576px]:grid-cols-2">
                        <Image
                            src={about.images.back.src}
                            alt={about.images.back.alt}
                            width={480}
                            height={640}
                            sizes="(max-width: 992px) 45vw, 24vw"
                            className="hidden aspect-[3/4] w-full rounded-lg object-cover shadow-lg min-[576px]:mt-[clamp(1.5rem,4vw,3.5rem)] min-[576px]:block"
                        />
                        <Image
                            src={about.images.front.src}
                            alt={about.images.front.alt}
                            width={480}
                            height={640}
                            sizes="(max-width: 992px) 45vw, 24vw"
                            className="aspect-[4/3] w-full rounded-lg object-cover shadow-lg min-[576px]:mb-[clamp(1.5rem,4vw,3.5rem)] min-[576px]:aspect-[3/4]"
                        />
                    </div>

                    {/* <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-display text-sm font-bold text-onlight shadow-lg min-[576px]:absolute min-[576px]:right-[clamp(-0.5rem,-1vw,0rem)] min-[576px]:bottom-[clamp(1rem,3vw,2.5rem)] min-[576px]:mt-0 min-[576px]:flex">
                        <span
                            className="size-2.5 shrink-0 rounded-full bg-teal-500 shadow-[0_0_0_4px_rgb(24_207_171/0.22)]"
                            aria-hidden="true"
                        />
                        {about.badge}
                    </div> */}
                </div>
            </div>
        </Section>
    );
}
