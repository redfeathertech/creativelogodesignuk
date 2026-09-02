import Image from "next/image";

import { services } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * Services — the six "what's included" cards.
 *
 * The cards stack the icon above the copy: white on `light-alt`, a hairline
 * border and a small radius rather than the site's usual pill-soft corners,
 * with the brand gradient carried by the artwork itself rather than a magenta
 * disc behind it.
 */
export default function Services() {
    return (
        <Section tone="light-alt">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[60rem] text-center">
                    <Eyebrow flanked className="justify-center text-magenta-500">
                        {services.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={services.titleLead}
                        accent={services.titleTrail}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[65ch] text-lead text-onlight-muted">
                        {services.description}
                    </p>
                </div>

                <ul className="m-0 mt-12 grid list-none gap-6 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {services.items.map((item) => (
                        <li
                            key={item.title}
                            className="reveal flex h-full min-w-0 flex-col items-start text-left rounded-sm border border-black/8 bg-white p-8 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1.5"
                        >
                            <Image
                                src={item.iconSrc}
                                alt=""
                                aria-hidden="true"
                                width={item.iconWidth}
                                height={item.iconHeight}
                                className="h-10 w-auto self-start"
                            />

                            <h3 className="mt-6 font-display text-h5 font-bold text-onlight">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-sm text-onlight-muted">{item.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
