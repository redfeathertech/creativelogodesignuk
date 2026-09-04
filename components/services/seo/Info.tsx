import Image from "next/image";

import { info } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * Info — "What Is SEO — and Why Does It Matter?"
 *
 * The light section in the service-page rhythm: `Eyebrow` in `magenta-500`, a
 * `SectionHeading` whose trailing half carries `gradient-text-brand`, and a
 * four-cell 7/5 split on a 12-column grid — the explanation (7) beside the
 * illustration (5), the stats card (7) beside the dark pull-quote (5) beneath.
 *
 * On one column the four cells stack in source order (copy → image → stats →
 * quote), which keeps the prose ahead of the numbers that support it. On `lg`
 * the two rows align on their own baselines, so the stats card and the quote
 * card always start level however tall the prose runs.
 *
 * The three stat marks are the supplied SVG badges. They are decorative — each
 * stat's value and sentence carry the meaning — so they are `alt=""` and
 * `aria-hidden`, and the parity script never sees them.
 *
 * The quote card stays dark on the light surface. That inversion is the live
 * design and it is also what `Section tone="dark"` would give it, so the card
 * borrows the same `ink-900` ground rather than a fifth palette.
 */

const statIcons = [
    "/assets/img/services/seo/stat-68.svg",
    "/assets/img/services/seo/stat-75.svg",
    "/assets/img/services/seo/stat-14x.svg",
] as const;

export default function Info() {
    return (
        <Section tone="light">
            <div className="container-site grid items-start gap-x-[clamp(2rem,1.25rem+3vw,3.5rem)] gap-y-[clamp(2.5rem,1.5rem+4vw,4.5rem)] lg:grid-cols-12">
                {/* ---------------------------------------------------- copy -- */}
                <div className="reveal min-w-0 lg:col-span-7">
                    <Eyebrow className="text-magenta-500">{info.eyebrow}</Eyebrow>

                    <SectionHeading
                        lead={`${info.titleLead} ${info.titleTrail.replace(" Does It Matter?", "")}`}
                        accent="Does It Matter?"
                        accentClassName="bg-[linear-gradient(90deg,#7225AD_0%,#CC067F_100%)] bg-clip-text pb-[0.08em] text-transparent"
                    />

                    <div className="mt-8 grid gap-7">
                        {info.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="max-w-[80c] text-onlight-muted">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* --------------------------------------------------- image -- */}
                <div className="reveal min-w-0 overflow-hidden rounded-lg bg-ink-900 shadow-md lg:col-span-5">
                    <Image
                        src="/assets/img/services/seo/what-is-seo.webp"
                        alt=""
                        aria-hidden="true"
                        width={598}
                        height={671}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* --------------------------------------------------- stats -- */}
                <div className="reveal min-w-0 rounded-lg border border-ink-900/[0.08] bg-mist-100 p-6 sm:p-8 pb-[21px] shadow-sm lg:col-span-7">
                    <ul className="m-0 grid list-none gap-6 p-0 min-[480px]:grid-cols-3 min-[480px]:gap-0 min-[480px]:divide-x min-[480px]:divide-ink-900/[0.08]">
                        {info.stats.map((stat, i) => (
                            <li
                                key={stat.value}
                                className="min-w-0 min-[480px]:px-5 min-[480px]:first:pl-0 min-[480px]:last:pr-0"
                            >
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={statIcons[i]}
                                        alt=""
                                        aria-hidden="true"
                                        width={55}
                                        height={55}
                                        className="size-9 shrink-0 sm:size-10"
                                    />
                                    <p className="gradient-text-brand m-0 font-display text-h4 leading-none font-extrabold">
                                        {stat.value}
                                    </p>
                                </div>

                                <p className="m-0 mt-4 text-sm text-onlight-muted">{stat.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --------------------------------------------------- quote -- */}
                <figure className="reveal relative isolate m-0 min-w-0 overflow-hidden rounded-lg bg-ink-900 p-8 text-white sm:p-10 lg:col-span-5">
                    <div
                        className="pointer-events-none absolute inset-0 -z-10 bg-mesh"
                        aria-hidden="true"
                    />
                    <blockquote className="m-0 text-[calc(var(--text-lead)-2px)] leading-[1.65] font-bold text-white">
                        {info.quote}
                    </blockquote>
                    <figcaption className="mt-7 font-display text-sm font-bold tracking-[0.13em] text-magenta-300">
                        {info.quoteAuthor}
                    </figcaption>
                </figure>
            </div>
        </Section>
    );
}
