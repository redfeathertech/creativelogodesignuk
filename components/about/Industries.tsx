import { industries } from "@/content/about";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * The sectors chip cloud.
 *
 * A real `<ul>`: thirty-one industry names are a list, and read as one by a
 * screen reader instead of a wall of loose text. The hover state is the brand
 * gradient, which is the only place on the page a chip becomes a solid.
 */
export default function Industries() {
    return (
        <Section tone="dark">
            <div className="container-site">
                <div className="reveal mb-12 max-w-[58ch]">
                    <Eyebrow>{industries.eyebrow}</Eyebrow>
                    <SectionHeading lead={industries.titleLead} accent={industries.titleAccent} />
                    <p className="mt-6 text-lead text-white/65">{industries.lead}</p>
                </div>

                <ul className="reveal flex flex-wrap gap-3">
                    {industries.items.map((industry) => (
                        <li
                            key={industry}
                            /* `translate`, not `transform` — Tailwind v4 drives
                               `-translate-y-*` off the standalone `translate`
                               property, and 31 chips snapping on hover is very
                               visible. See components/ui/TrustpilotBadge.tsx. */
                            className="rounded-full border border-white/[0.11] bg-white/[0.04] bg-origin-border px-4 py-2 font-display text-xs font-bold tracking-[0.08em] text-white/65 uppercase transition-[background-color,border-color,color,translate] duration-200 ease-out hover:-translate-y-0.5 hover:border-transparent hover:bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] hover:text-white"
                        >
                            {industry}
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
