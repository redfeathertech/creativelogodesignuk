import Image from "next/image";

import { contact } from "@/content/site";
import { services } from "@/content/landing/lp";
import { btn } from "@/components/ui/button";

/**
 * The nine capability cards.
 *
 * The live section is a flat orange band; the card titles are `<h5>`s with no
 * `h3`/`h4` between them and the section heading. Levels are corrected here;
 * the text is not.
 */
export default function Services() {
    return (
        <section className="relative isolate overflow-hidden bg-[linear-gradient(97deg,var(--color-violet-600)_0%,var(--color-magenta-600)_100%)] py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-40 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site">
                <div className="reveal mx-auto max-w-[70ch] text-center">
                    <h2 className="text-h2">{services.title}</h2>
                    <p className="mt-5 text-lead text-white/85">
                        {services.lead}
                    </p>
                </div>

                <div className="mt-[clamp(2.5rem,1.5rem+4vw,4rem)] grid items-stretch gap-5 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {services.items.map((item) => (
                        <div
                            key={item.title}
                            className="reveal flex flex-col rounded-lg border border-white/20 bg-white/[0.08] p-6 backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-white/40"
                        >
                            <Image
                                src={item.icon}
                                alt=""
                                aria-hidden="true"
                                width={120}
                                height={120}
                                className="w-fit mx-auto"
                            />
                            <h3 className="mt-5 text-h5 font-bold text-white">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-white/85">{item.body}</p>
                        </div>
                    ))}
                </div>

                {/* `btn` is `whitespace-nowrap`, which is right for the short
                    labels it was written for. "Let's Discuss Your Project" is
                    wider than a 320px phone, which expands the layout viewport
                    rather than overflowing. Allowing this pair to wrap is the
                    fix; relaxing the shared recipe would move every button on
                    the site. Same measurement as /logo-design-offer. */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    <a
                        href={`tel:${contact.phoneE164}`}
                        className={btn(
                            "light",
                            "lg",
                            "max-w-full whitespace-normal",
                        )}
                    >
                        {services.ctaDiscuss}
                    </a>
                    <a
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btn(
                            "ghost",
                            "lg",
                            "max-w-full whitespace-normal",
                        )}
                    >
                        {services.ctaChat}
                    </a>
                </div>
            </div>
        </section>
    );
}
