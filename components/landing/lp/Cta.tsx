import { contact } from "@/content/site";
import { cta } from "@/content/landing/lp";
import { btn } from "@/components/ui/button";

/**
 * The full-width "Let's Build Bespoke Web Solutions for Your Business" band.
 *
 * The live button opens WhatsApp, which is what it does here — it is one of the
 * two CTAs on the page that is not the quote modal.
 */
export default function Cta() {
    return (
        <section className="relative isolate overflow-hidden bg-[linear-gradient(97deg,var(--color-violet-600)_0%,var(--color-magenta-600)_100%)] py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-40 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
                <div className="reveal">
                    <h2 className="text-h2">
                        {cta.titleLead} <span className="block">{cta.titleTrail}</span>
                    </h2>
                    <p className="mt-5 max-w-[60ch] text-lead text-white/85">{cta.body}</p>
                </div>

                <div className="reveal lg:justify-self-end">
                    <a
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btn("light", "lg", "max-w-full whitespace-normal")}
                    >
                        {cta.button}
                    </a>
                </div>
            </div>
        </section>
    );
}
