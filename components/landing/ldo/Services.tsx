import Image from "next/image";

import { contact } from "@/content/site";
import { services } from "@/content/landing/logo-design-offer";
import { btn } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";

/**
 * The nine capability cards.
 *
 * The live page renders each card title as an `<h5>` with no `<h2>`–`<h4>`
 * between it and the section heading. Levels are corrected here; the text is
 * not.
 */
export default function Services() {
    return (
        <Section tone="dark">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[70ch] text-center">
                    <h2 className="text-h2 uppercase">{services.title}</h2>
                    <p className="mt-5 text-lead text-white/65">{services.lead}</p>
                </div>

                <div className="mt-[clamp(2.5rem,1.5rem+4vw,4rem)] grid gap-5 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {services.items.map((item) => (
                        <div
                            key={item.title}
                            className="reveal rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-white/20"
                        >
                            <Image
                                src={item.icon}
                                alt=""
                                aria-hidden="true"
                                width={64}
                                height={64}
                                className="h-14 w-auto"
                            />
                            <h3 className="mt-5 text-h5 font-bold text-white">{item.title}</h3>
                            <p className="mt-3 text-white/65">{item.body}</p>
                        </div>
                    ))}
                </div>

                {/* `btn` is `whitespace-nowrap`, which is right for the short
                    labels it was written for. "Let's Discuss Your Project" is
                    26 characters and measures 337px at the `lg` padding — wider
                    than a 320px phone, which expands the layout viewport rather
                    than overflowing. Allowing this one pair to wrap is the fix;
                    relaxing the shared recipe would move every button on the
                    site. Measured over CDP, not guessed. */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    <a
                        href={`tel:${contact.phoneE164}`}
                        className={btn("primary", "lg", "max-w-full whitespace-normal")}
                    >
                        {services.ctaDiscuss}
                    </a>
                    <a
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btn("ghost", "lg", "max-w-full whitespace-normal")}
                    >
                        {services.ctaChat}
                    </a>
                </div>
            </div>
        </Section>
    );
}
