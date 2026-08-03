import Image from "next/image";

import { foodApp, work } from "@/content/landing/lp";
import { Section } from "@/components/ui/Section";

/**
 * "Our Work Speaks" — four project write-ups, then the app case study.
 *
 * The live page rotates the four projects on a five-second `setInterval` and
 * keeps exactly one in the DOM, so three of the four titles and three of the
 * four descriptions have never been in a crawlable document. All four are
 * rendered here, stacked and alternating sides.
 *
 * Each live title carries a literal `</br>` and is injected with
 * `dangerouslySetInnerHTML`. The break is two fields in the content module
 * instead, so no markup string reaches the renderer — a stray tag in the copy
 * can never become an element.
 *
 * All four live images share one placeholder `alt="Project example"`. Each is
 * described here.
 */
export default function Work() {
    return (
        <Section tone="darker">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[70ch] text-center">
                    <h2 className="text-h2">{work.title}</h2>
                    <p className="mt-5 text-lead text-white/65">{work.lead}</p>
                </div>

                <div className="mt-[clamp(2.5rem,1.5rem+4vw,4rem)] grid gap-[clamp(3rem,2rem+4vw,5rem)]">
                    {work.slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            className="grid items-center gap-[clamp(1.75rem,1rem+4vw,3.5rem)] lg:grid-cols-2"
                        >
                            <div
                                className={`reveal ${i % 2 === 1 ? "lg:order-2" : ""}`}
                            >
                                <h3 className="text-h4">
                                    {slide.titleLead}{" "}
                                    <span className="block">
                                        {slide.titleTrail}
                                    </span>
                                </h3>
                                <p className="mt-4 text-white/65">
                                    {slide.body}
                                </p>
                            </div>

                            <Image
                                src={slide.image}
                                alt={slide.imageAlt}
                                width={1000}
                                height={575}
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="reveal h-auto w-full rounded-lg"
                            />
                        </div>
                    ))}

                    <div className="grid items-center gap-[clamp(1.75rem,1rem+4vw,3.5rem)] lg:grid-cols-2">
                        <div className="reveal">
                            <h3 className="text-h4">{foodApp.title}</h3>
                            <p className="mt-4 text-white/65">{foodApp.body}</p>
                        </div>

                        <Image
                            src={foodApp.image}
                            alt={foodApp.imageAlt}
                            width={538}
                            height={600}
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="reveal mx-auto h-auto w-full max-w-[420px]"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
