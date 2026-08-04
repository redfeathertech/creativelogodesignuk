import Image from "next/image";
import Link from "next/link";

import { process, recentWork } from "@/content/home";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import Rail from "@/components/ui/Rail";
import ProcessSteps from "./ProcessSteps";

/**
 * Process steps plus the "Our recent work" rail (v2).
 *
 * The intro column stays pinned while the steps scroll past it — the two
 * halves are read together, not one after the other.
 *
 * The work cards remain links. On the live site they are inert <article>
 * elements, wasting six prime internal-link slots on the homepage; that fix
 * carries over, and the rail keeps using the shared `Rail` component rather
 * than a second carousel implementation.
 *
 * `process.art` is NOT rendered, matching v1 where it is commented out.
 */
export default function HowItWork() {
    return (
        <Section tone="dark">
            <div className="container-site">
                <div className="grid items-start gap-[clamp(2.5rem,1.5rem+5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                    <div className="reveal min-w-0 lg:sticky lg:top-32">
                        <Eyebrow>{process.eyebrow}</Eyebrow>
                        <SectionHeading
                            lead={process.titleLead}
                            accent={process.titleAccent}
                        />
                        <p className="mt-6 max-w-[62ch] text-lead text-white/65">
                            {process.lead}
                        </p>
                    </div>

                    <div className="min-w-0">
                        <ProcessSteps />
                    </div>
                </div>

                {/* ---- recent work ---- */}
                <div className="mt-section">
                    <Rail
                        label={recentWork.title}
                        count={recentWork.items.length}
                        navPlacement="head"
                        heading={
                            <h2 className="text-h2">{recentWork.title}</h2>
                        }
                    >
                        {recentWork.items.map((item) => (
                            <Link
                                key={item.img}
                                href={item.href}
                                className="group relative w-[clamp(240px,74vw,340px)] overflow-hidden rounded-lg bg-ink-800 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1.5"
                            >
                                <Image
                                    src={item.img}
                                    alt={`${item.lead} ${item.trail} project by Creative Logo Design`}
                                    width={340}
                                    height={425}
                                    sizes="(max-width: 576px) 74vw, 340px"
                                    className="block aspect-4/5 w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                                />
                                {/* The gradient scrim is what keeps the title
                                    legible over an arbitrary photograph — it is
                                    load-bearing for contrast, not decoration. */}
                                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(7_2_15/0.88)_62%)] px-6 pt-8 pb-6">
                                    <h3 className="font-display text-h4 leading-[1.1] font-extrabold text-white">
                                        <span className="block">
                                            {item.lead}
                                        </span>
                                        <span className="block">
                                            {item.trail}
                                        </span>
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </Rail>
                </div>
            </div>
        </Section>
    );
}
