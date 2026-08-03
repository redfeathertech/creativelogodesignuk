import { cta } from "@/content/landing/logo-design-offer";
import { QuoteButton } from "./QuoteDialog";

/** The full-width "Let's Create Something Extraordinary!" band. */
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
                        {cta.titleLead} <span className="block">{cta.titleAccent}</span>
                    </h2>
                    <p className="mt-5 max-w-[60ch] text-lead text-white/85">{cta.body}</p>
                </div>

                <div className="reveal lg:justify-self-end">
                    <QuoteButton variant="light" size="lg">
                        {cta.button}
                    </QuoteButton>
                </div>
            </div>
        </section>
    );
}
