import Image from "next/image";

import { work } from "@/content/landing/logo-design-offer";
import { Section } from "@/components/ui/Section";
import { QuoteButton } from "./QuoteDialog";

/**
 * "Our Work Speaks" — four industry sets, 36 client logos.
 *
 * The live page rotates the four sets on a five-second `setInterval` and keeps
 * exactly one in the DOM, so three of the four titles and three of the four
 * descriptions are never in the document. All four are rendered here, stacked.
 *
 * Each set's nine logos arrive from the live server as ONE bitmap with the whole
 * 3x3 grid baked into it, which is why all 36 client names were unreadable to
 * anything but a human eye — and why no logo could carry alt text. They are cut
 * into individual tiles (gutters detected, not pitch-guessed, so no 1px fringe
 * bands the corner) and each is named.
 */
export default function Work() {
    return (
        <Section tone="darker">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[70ch] text-center">
                    <h2 className="text-h2 uppercase">{work.title}</h2>
                    <p className="mt-5 text-lead text-white/65">{work.lead}</p>
                </div>

                <div className="mt-[clamp(2.5rem,1.5rem+4vw,4rem)] grid gap-[clamp(3rem,2rem+4vw,5rem)]">
                    {work.slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="grid items-center gap-[clamp(2rem,1rem+4vw,3.5rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]"
                        >
                            <div className="reveal">
                                <h3 className="text-h4">{slide.title}</h3>
                                <p className="mt-4 text-white/65">{slide.body}</p>
                                <QuoteButton variant="primary" className="mt-7">
                                    {work.cta}
                                </QuoteButton>
                            </div>

                            <ul className="reveal grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {slide.logos.map((logo) => (
                                    <li
                                        key={logo.src}
                                        className="overflow-hidden rounded-md bg-white/[0.04]"
                                    >
                                        <Image
                                            src={logo.src}
                                            alt={logo.name}
                                            width={560}
                                            height={330}
                                            sizes="(min-width: 1024px) 20vw, (min-width: 576px) 30vw, 45vw"
                                            className="h-auto w-full"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
