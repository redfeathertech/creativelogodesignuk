import Image from "next/image";

import { credentials } from "@/content/about";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * Awards & recognition (v2, new to the homepage).
 *
 * Copy and artwork are `content/about.ts`'s `credentials`, reused verbatim.
 *
 * The artwork is white-on-transparent (see the note in content/about.ts), so
 * the tiles MUST sit on a dark surface — on white the badges are invisible.
 * That is why this is a `darker` section with glass tiles rather than the
 * light treatment the About page uses.
 *
 * Badge dimensions (175x50) are the ones components/about/Credentials.tsx
 * already uses for the same artwork — explicit, not `fill`, so the intrinsic
 * ratio is declared and there is no layout shift as each file decodes.
 *
 * `credentials.cta` is not rendered: this is a recognition wall between two
 * other CTAs (the toolbox button above, the testimonials below), and a third
 * competing call to action in that stretch reads as pressure, not persuasion.
 */
export default function Awards() {
    return (
        <Section tone="darker" ariaLabel="Awards and recognition">
            <div className="container-site">
                <div className="reveal mb-[clamp(2.5rem,1.5rem+3vw,4rem)] max-w-[60ch]">
                    <Eyebrow>{credentials.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={credentials.titleLead}
                        accent={credentials.titleAccent}
                    />
                </div>

                <div className="grid gap-8 min-[576px]:grid-cols-2 lg:grid-cols-4">
                    {credentials.groups.map((group) => (
                        <div key={group.title} className="reveal min-w-0">
                            <h3 className="mb-5 text-xs tracking-[0.12em] text-white/45 uppercase">
                                {group.title}
                            </h3>
                            <ul className="grid gap-3">
                                {group.logos.map((logo) => (
                                    <li
                                        key={logo.src}
                                        className="glass grid min-w-0 place-items-center rounded-md px-5 py-7 transition-transform duration-300 ease-out hover:-translate-y-1"
                                    >
                                        <Image
                                            src={logo.src}
                                            alt={logo.name}
                                            width={175}
                                            height={50}
                                            sizes="(max-width: 576px) 44vw, (max-width: 992px) 22vw, 130px"
                                            className="h-8 w-auto max-w-full object-contain opacity-80 transition-opacity duration-300 ease-out hover:opacity-100"
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
