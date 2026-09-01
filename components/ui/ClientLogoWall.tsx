import Image from "next/image";

import { clients } from "@/content/clients";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";
import { cn } from "@/lib/cn";

/**
 * "Brands that trust our work" — the client logo wall.
 *
 * Shared by About Us and every service page ({@link components/about/Clients}
 * and {@link components/services/Clients}) so the one redesign lives in one
 * place. See `content/clients.ts` for why the mark set is dark-on-transparent
 * artwork, which is what lets it be knocked out to white and sit *on* the dark
 * canvas instead of inside a washed-out card.
 *
 * `grayscale invert` rather than `brightness-0 invert`: a flat silhouette
 * erases the wordmark inside marks that carry knocked-out white type (Dyktik,
 * Dats Mad). Inverting a desaturated image keeps that internal contrast — the
 * badge goes white, the type inside it stays dark.
 *
 * Hover flips the cell to white and drops the filter, which is the only way to
 * show a dark logo in its real colours on a near-black page.
 *
 * The eighth cell is the brand gradient carrying a stat. It squares off a
 * seven-item grid — 8 cells tile exactly at 2 and 4 columns, and any
 * arrangement of 7 leaves a hole where the seams would frame empty space.
 */
export function ClientLogoWall({
    eyebrow,
    titleLead,
    titleAccent,
    lead,
    stat,
}: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead?: string;
    stat: { value: number; suffix: string; label: string };
}) {
    return (
        <Section tone="darker">
            <div className="container-site grid gap-[clamp(2.5rem,1.5rem+4vw,4rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center">
                <div className="reveal">
                    <Eyebrow>{eyebrow}</Eyebrow>
                    <SectionHeading lead={titleLead} accent={titleAccent} />
                    {lead && <p className="mt-6 max-w-[46ch] text-white/60">{lead}</p>}
                </div>

                <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.11] bg-white/[0.11] sm:grid-cols-4">
                    {clients.map((client) => {
                        /* The set is height-normalised but comes in two shapes. Sizing
                           every mark to one height leaves the near-square badges at a
                           third of the optical mass of the wordmarks, so those get a
                           taller ceiling and the two read as the same size. */
                        const isBadge = client.width / client.height < 2;

                        return (
                            <div
                                key={client.src}
                                className="group grid aspect-[16/10] place-items-center bg-ink-950 p-4 transition-colors duration-300 ease-out hover:bg-white"
                            >
                                <Image
                                    src={client.src}
                                    alt={`${client.name} logo`}
                                    width={client.width}
                                    height={client.height}
                                    sizes="(max-width: 640px) 40vw, (max-width: 992px) 22vw, 16vw"
                                    /* `object-contain` is load-bearing, not decoration: the
                                       height is fixed and `max-w-full` is what stops a 3.7:1
                                       mark from touching the cell walls — at ~992px it clamps
                                       the width while the height stays put, which without this
                                       squashes the logo by a tenth. */
                                    className={cn(
                                        "w-auto max-w-full object-contain opacity-70 grayscale invert transition duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0",
                                        isBadge
                                            ? "h-[clamp(34px,4.4vw,50px)]"
                                            : "h-[clamp(24px,3.2vw,36px)]",
                                    )}
                                />
                            </div>
                        );
                    })}

                    <p className="grid aspect-[16/10] place-items-center bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] p-4 text-center">
                        <span>
                            <Counter
                                value={stat.value}
                                suffix={stat.suffix}
                                className="block font-display text-[clamp(1.35rem,1rem+1.4vw,1.9rem)] leading-none font-extrabold text-white"
                            />
                            {/* Not `white/75`: 11px uppercase over the magenta end of the
                                gradient measures 3.5:1, under the 4.5:1 AA floor for text
                                this size. At 90% it clears it at both ends of the ramp. */}
                            <span className="mt-1.5 block text-ui-11 tracking-[0.12em] text-white/90 uppercase">
                                {stat.label}
                            </span>
                        </span>
                    </p>
                </div>
            </div>
        </Section>
    );
}
