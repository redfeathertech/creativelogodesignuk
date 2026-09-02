import Image from "next/image";

import { serviceClientWall, seoClientLogos } from "@/content/clients";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";
import { cn } from "@/lib/cn";

/**
 * "Brands that trust our work" for the SEO pillar.
 *
 * The shared `components/services/Clients.tsx` renders the dark eight-cell wall
 * every other service page uses. That wall lands badly here: it would drop a
 * near-black block between `Proposal` and the light `Info` section, and the
 * knockout treatment it relies on erases the colour the client's own marks are
 * recognised by.
 *
 * So this is the same section on the SEO page's own light surface — centred
 * head, then one white rail carrying the five marks in full colour, hairline
 * seams between the cells and no card per logo.
 *
 * **Layout only. No copy changed.** Eyebrow, both halves of the heading and the
 * stat all come from `serviceClientWall`, the shared constant the other 35
 * service pages render, so this page still says exactly what they say.
 *
 * The marks are greyscale at rest and resolve to colour on hover, which keeps
 * five unrelated palettes from fighting each other. `group-hover` never fires
 * on touch, so under `(hover: none)` they are simply shown in colour rather
 * than left grey forever.
 */
export default function Clients() {
    return (
        <Section tone="light-alt">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[60rem] text-center">
                    <Eyebrow flanked className="justify-center text-magenta-500">
                        {serviceClientWall.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={serviceClientWall.titleLead}
                        accent={serviceClientWall.titleAccent}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mt-6 flex items-baseline justify-center gap-2 font-display text-[clamp(0.95rem,0.8rem+0.5vw,1.25rem)] font-extrabold tracking-[0.12em] text-magenta-500 uppercase">
                        <Counter
                            value={serviceClientWall.stat.value}
                            suffix={serviceClientWall.stat.suffix}
                        />
                        {serviceClientWall.stat.label}
                    </p>
                </div>

                {/* `gap-px` over the wrapper's own fill is what draws the seams:
                    each cell paints white and the 1px the grid leaves between
                    them shows the wrapper through. Two columns until `md`, then
                    all five across. Five over two columns leaves the last cell
                    alone on its row, so it spans both and the rail keeps a
                    straight bottom edge. */}
                <ul className="reveal mx-auto mt-12 grid max-w-[62rem] list-none grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-950/[0.08] p-0 shadow-[0_18px_40px_-28px_rgb(7_2_15/0.35)] ring-1 ring-ink-950/[0.08] md:grid-cols-5">
                    {seoClientLogos.map((logo, i) => (
                        <li
                            key={logo.src}
                            className={cn(
                                "group grid aspect-[16/10] place-items-center bg-white p-4 sm:p-5 transition-colors duration-300 ease-out hover:bg-mist-100 md:aspect-[3/2]",
                                i === seoClientLogos.length - 1 && "max-md:col-span-2",
                            )}
                        >
                            <Image
                                src={logo.src}
                                alt={`${logo.name} logo`}
                                width={logo.width}
                                height={logo.height}
                                sizes="(min-width: 768px) 13vw, 45vw"
                                /* `max-w-full` with `object-contain`: the height
                                   is fixed, so without it the 4.3:1 wordmarks
                                   push past the cell walls at the narrow end. */
                                className="h-[clamp(40px,5.6vw,60px)] w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:grayscale-0"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
