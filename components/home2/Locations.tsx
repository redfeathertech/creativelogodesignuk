import Image from "next/image";

import { locations } from "@/content/about";
import { offices } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * Locations (v2, new to the homepage).
 *
 * Copy is `content/about.ts`'s `locations`; the office details come from
 * `content/site.ts`, the same source the footer and the Organization JSON-LD
 * read. Nothing is authored here and nothing is duplicated — a fourth office,
 * or a changed phone number, propagates to all four places at once.
 *
 * Two accessibility details that are easy to get wrong:
 *
 *   - The phone link uses `phoneE164` for the href and `phoneDisplay` for the
 *     text. A bare "0204…" cannot be dialled from abroad;
 *     docs/CONTENT-PARITY.md lists that as a fixed defect on the live site and
 *     it must not come back.
 *   - Each "Get directions" link is given an accessible name naming its office.
 *     Three identically-labelled links are indistinguishable to anyone reading
 *     the page by its link list.
 */
export default function Locations() {
    return (
        <Section tone="dark">
            <div className="container-site">
                <div className="reveal mb-[clamp(2.5rem,1.5rem+3vw,4rem)] max-w-[60ch]">
                    <Eyebrow>{locations.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={locations.titleLead}
                        accent={locations.titleAccent}
                    />
                    <p className="mt-6 text-lead text-white/65">
                        {locations.lead}
                    </p>
                </div>

                <ul className="grid gap-6 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {offices.map((office) => (
                        <li
                            key={office.country}
                            className="reveal group glass min-w-0 overflow-hidden rounded-lg transition-transform duration-300 ease-out hover:-translate-y-1.5"
                        >
                            {/* 664x400 is the intrinsic pair components/about/
                                Offices.tsx already uses for the same artwork —
                                explicit rather than `fill`, so the ratio is
                                declared and nothing shifts as it decodes. */}
                            <div className="relative w-full overflow-hidden">
                                <Image
                                    src={office.image}
                                    alt={office.imageAlt}
                                    width={664}
                                    height={400}
                                    sizes="(max-width: 576px) 92vw, (max-width: 992px) 46vw, 31vw"
                                    className="aspect-[16/10] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgb(7_2_15/0.82))]"
                                    aria-hidden="true"
                                />
                                <h3 className="absolute bottom-4 left-5 font-display text-h4 font-extrabold text-white">
                                    {office.country}
                                </h3>
                            </div>

                            <div className="p-6">
                                <address className="mb-4 text-white/65 not-italic">
                                    {office.address}
                                </address>

                                <a
                                    href={`tel:${office.phoneE164}`}
                                    className="mb-5 inline-block font-display font-bold text-white transition-colors hover:text-magenta-300"
                                >
                                    {office.phoneDisplay}
                                </a>

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${locations.cta} — ${office.country} office`}
                                    className="flex items-center gap-2 text-sm font-bold text-magenta-300 transition-colors hover:text-magenta-200"
                                >
                                    {locations.cta}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
