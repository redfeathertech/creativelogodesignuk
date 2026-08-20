import { services } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SeoIcon } from "./icons";

/**
 * Services — the six "what's included" cards.
 *
 * The industries rail that opens this block on the live page is its own
 * component now ({@link ./Marquee}), because the service pages put their
 * marquee between two sections rather than inside one.
 *
 * The cards are the `About` card grammar with the icon inline rather than a
 * cover image: white on `light-alt`, `shadow-md`, and the same magenta disc the
 * rest of the site uses for a section icon.
 */
export default function Services() {
    return (
        <Section tone="light-alt">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow className="justify-center text-magenta-500">
                        {services.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={services.titleLead}
                        accent={services.titleTrail}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-onlight-muted">
                        {services.description}
                    </p>
                </div>

                <ul className="m-0 mt-12 grid list-none gap-6 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {services.items.map((item) => (
                        <li
                            key={item.title}
                            className="reveal flex h-full min-w-0 items-start gap-5 rounded-lg bg-white p-8 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1.5"
                        >
                            <span
                                aria-hidden="true"
                                className="grid size-12 shrink-0 place-items-center rounded-md bg-magenta-50 text-magenta-600"
                            >
                                <SeoIcon name={item.icon} className="size-5" />
                            </span>

                            <div className="min-w-0">
                                <h3 className="font-display text-h5 font-bold text-onlight">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm text-onlight-muted">{item.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
