import Image from "next/image";
import type { ServiceHowItWorks } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import Rail from "@/components/ui/Rail";

/** The 3-step "how it works" list plus the "recent work" rail. */
export default function HowItWorks({ data }: { data: ServiceHowItWorks }) {
    return (
        <Section tone="dark">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[65ch] text-center">
                    <Eyebrow className="justify-center">{data.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                        className="mx-auto"
                    />
                    <p className="mt-6 text-lead text-white/65">{data.lead}</p>
                </div>

                <ol className="mt-12 grid gap-6 md:grid-cols-3">
                    {data.steps.map((step, i) => (
                        <li
                            key={step.title}
                            className="reveal rounded-lg border border-white/[0.11] bg-white/[0.02] p-8"
                        >
                            <Image
                                src={step.icon.src}
                                alt=""
                                aria-hidden="true"
                                width={step.icon.width}
                                height={step.icon.height}
                                className="mb-6 h-11 w-auto"
                            />
                            <h3 className="mb-2 text-h4 text-white">
                                {String(i + 1).padStart(2, "0")}. {step.title}
                            </h3>
                            <p className="text-white/65">{step.body}</p>
                        </li>
                    ))}
                </ol>

                {/* ---- recent work ----
                    Was a static 3-column grid; now the same scroll-snap rail the
                    homepage uses, which is what the live service page shows (a
                    Slick carousel there — same arrangement, no jQuery here). */}
                <div className="mt-section">
                    <Rail
                        label={data.workHeading}
                        count={data.workImages.length}
                        itemNoun="project"
                        navPlacement="head"
                        heading={
                            <h2 className="reveal text-h2 text-white">
                                {data.workHeading}
                            </h2>
                        }
                    >
                        {data.workImages.map((img, i) => (
                            <article
                                key={i}
                                className="group w-[clamp(240px,74vw,340px)] overflow-hidden rounded-lg bg-ink-800 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1.5"
                            >
                                <Image
                                    src={img.src}
                                    alt=""
                                    aria-hidden="true"
                                    width={img.width}
                                    height={img.height}
                                    sizes="(max-width: 576px) 74vw, 340px"
                                    className="block aspect-4/5 w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                                />
                            </article>
                        ))}
                    </Rail>
                </div>
            </div>
        </Section>
    );
}
