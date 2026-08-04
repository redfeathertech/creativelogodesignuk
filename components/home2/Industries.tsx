import { industries } from "@/content/about";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * Industries (v2, new to the homepage).
 *
 * Copy is `content/about.ts`'s `industries`, reused verbatim — it is already
 * written, reviewed and shipping on /about-us. Nothing new is authored here.
 *
 * The 31 sectors render as plain text, NOT links. There is no non-arbitrary
 * mapping from these sectors onto the 36 service pages, and arbitrary internal
 * links are an SEO liability rather than a gain — so this section adds nothing
 * to the link graph. See the spec.
 *
 * CSS columns rather than a grid: 31 is an awkward count for a grid, which
 * would leave a ragged final row. Columns balance the flow instead.
 * `break-inside-avoid` stops an item splitting across the column boundary.
 */
export default function Industries() {
    return (
        <Section tone="darker">
            <div className="container-site">
                <div className="reveal mb-[clamp(2.5rem,1.5rem+3vw,4rem)] max-w-[60ch]">
                    <Eyebrow>{industries.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={industries.titleLead}
                        accent={industries.titleAccent}
                    />
                    <p className="mt-6 text-lead text-white/65">
                        {industries.lead}
                    </p>
                </div>

                <ul className="reveal columns-1 gap-x-10 min-[576px]:columns-2 lg:columns-3">
                    {industries.items.map((item) => (
                        <li
                            key={item}
                            className="flex break-inside-avoid items-center gap-3 border-b border-white/[0.09] py-3.5 text-white/75 transition-colors duration-300 hover:text-white"
                        >
                            <span
                                className="size-1.5 shrink-0 rounded-full bg-magenta-400"
                                aria-hidden="true"
                            />
                            <span className="min-w-0">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
