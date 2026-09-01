import Image from "next/image";

import { credentials } from "@/content/about";
import { Eyebrow, Section, SectionHead, SectionHeading } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Skills & credentials.
 *
 * The tiles are dark on a light section, which looks like an inversion until you
 * look at the artwork: every logo in `/assets/img/credentials/` is white on
 * transparent, so on a white card there is nothing to see. The dark tile is what
 * makes them visible without re-cutting twelve third-party logos.
 *
 * Each group is a heading plus its logos rather than one long strip — the
 * grouping is the claim ("certified in these, for this discipline").
 */
export default function Credentials() {
    return (
        <Section tone="light">
            <div className="container-site">
                <SectionHead
                    className="reveal max-lg:flex-col max-lg:items-center max-lg:text-center"
                    action={<LeadButton variant="outline">{credentials.cta}</LeadButton>}
                >
                    <Eyebrow className="text-magenta-500 max-lg:justify-center max-lg:[&>span]:hidden">
                        {credentials.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={credentials.titleLead}
                        accent={credentials.titleAccent}
                        accentClassName="gradient-text-brand"
                    />
                </SectionHead>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {credentials.groups.map((group) => (
                        <div
                            key={group.title}
                            /* `translate`, not `transform`: Tailwind v4 implements
                               `-translate-y-*` with the standalone `translate`
                               property, so a list naming `transform` leaves the lift
                               to snap while the border eases. Same rule as
                               components/ui/TrustpilotBadge.tsx. */
                            className="reveal group rounded-lg border border-white/[0.11] bg-ink-900 p-6 transition-[border-color,translate] duration-300 ease-out hover:-translate-y-1 hover:border-magenta-500"
                        >
                            <h3 className="mb-4 border-b border-white/[0.11] pb-3 font-display text-body font-bold text-white">
                                {group.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-4">
                                {group.logos.map((logo) => (
                                    <Image
                                        key={logo.src}
                                        src={logo.src}
                                        alt={logo.name}
                                        width={175}
                                        height={50}
                                        sizes="(max-width: 640px) 28vw, (max-width: 992px) 14vw, 90px"
                                        className="h-7 w-auto opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
