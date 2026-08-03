import Image from "next/image";

import { contact } from "@/content/site";
import { consultCta } from "@/content/landing/creative-logo-design";
import { btn } from "@/components/ui/button";

/** "Get Your Perfect Logo – Schedule a Free Call" */
export default function ConsultCta() {
    return (
        <section
            className="relative isolate overflow-hidden bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] text-white"
            aria-labelledby="cld-consult-title"
        >
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-30 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site grid items-center gap-[clamp(2rem,1rem+4vw,3.5rem)] py-section lg:grid-cols-2">
                <div className="reveal">
                    <h2 id="cld-consult-title" className="text-h2">
                        {consultCta.title}
                    </h2>
                    <p className="mt-5 max-w-[52ch] text-lead text-white/80">{consultCta.lead}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href={`tel:${contact.phoneE164}`} className={btn("light", "lg")}>
                            {consultCta.ctaCall}
                        </a>
                        <a
                            href={contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={btn("ghost", "lg")}
                        >
                            {consultCta.ctaChat}
                        </a>
                    </div>
                </div>

                <Image
                    src={consultCta.image.src}
                    alt={consultCta.image.alt}
                    width={consultCta.image.width}
                    height={consultCta.image.height}
                    sizes="(max-width: 991px) 92vw, 560px"
                    className="reveal h-auto w-full rounded-md"
                />
            </div>
        </section>
    );
}
