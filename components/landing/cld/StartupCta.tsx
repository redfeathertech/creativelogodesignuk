import Image from "next/image";

import { contact } from "@/content/site";
import { startupCta } from "@/content/landing/creative-logo-design";
import { btn } from "@/components/ui/button";
import { QuoteButton } from "./QuoteDialog";

/** "We Offer a Complete Package for Entrepreneurs and Startups." */
export default function StartupCta() {
    return (
        <section
            className="relative isolate overflow-hidden bg-[linear-gradient(97deg,var(--color-magenta-600)_0%,var(--color-violet-600)_100%)] text-white"
            aria-labelledby="cld-startup-title"
        >
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-30 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site grid items-center gap-8 py-[clamp(2.5rem,1.5rem+4vw,4rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <div className="reveal">
                    <p className="text-sm text-white/75">{startupCta.kicker}</p>
                    {/* The explicit space is load-bearing: `block` puts the two
                        halves on their own lines visually, but without it the
                        text nodes butt together as "Packagefor" for anything
                        reading the DOM — a crawler, a screen reader, or the
                        parity check. */}
                    <h2 id="cld-startup-title" className="mt-2 text-h3">
                        {startupCta.titleLead}{" "}
                        <span className="block text-star">{startupCta.titleTrail}</span>
                    </h2>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <QuoteButton variant="light" size="lg">
                            {startupCta.cta}
                        </QuoteButton>
                        <a href={`tel:${contact.phoneE164}`} className={btn("ghost", "lg")}>
                            {contact.phoneDisplay}
                        </a>
                    </div>
                </div>

                <Image
                    src={startupCta.image.src}
                    alt=""
                    aria-hidden="true"
                    width={startupCta.image.width}
                    height={startupCta.image.height}
                    sizes="(max-width: 991px) 80vw, 480px"
                    className="reveal mx-auto h-auto w-full max-w-[30rem] lg:justify-self-end"
                />
            </div>
        </section>
    );
}
