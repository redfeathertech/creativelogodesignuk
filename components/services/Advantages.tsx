import Image from "next/image";
import type { ServiceAdvantages } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";

/** Animated stat counters over a background photo — the "Results" pattern
    from the homepage, re-keyed to per-service copy. */
export default function Advantages({ data }: { data: ServiceAdvantages }) {
    return (
        <Section tone="darker">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2">
                <div className="reveal">
                    <Eyebrow>{data.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                    />
                    <p className="mt-6 max-w-[62ch] text-lead text-white/65">
                        {data.lead}
                    </p>

                    <dl className="mt-8 grid grid-cols-2 gap-6">
                        {data.stats.map((stat) => (
                            <div key={stat.label}>
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    {/* `break-words`: three service pages carry a stat whose
                                        `suffix` is a sentence rather than a symbol — e.g.
                                        "+ years in headless CMS development" — so a single
                                        165px word lands in a 128px column at 320px and pushed
                                        the document 17px sideways. The copy is transcribed from
                                        the live page and is not ours to shorten, so the break
                                        happens here. Inert on the 93 stats whose suffix is "+". */}
                                    <p className="gradient-text font-display text-h3 leading-none font-extrabold break-words">
                                        {stat.prefix}
                                        <Counter
                                            value={stat.count}
                                            suffix={stat.suffix}
                                            className="inline"
                                        />
                                    </p>
                                    <p className="mt-2 text-sm text-white/65">
                                        {stat.label}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="reveal">
                    <Image
                        src={data.image.src}
                        alt={data.imageAlt}
                        width={data.image.width}
                        height={data.image.height}
                        sizes="(max-width: 992px) 88vw, 44vw"
                        className="h-auto w-full max-w-[480px] rounded-lg shadow-lg"
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
            </div>
        </Section>
    );
}
