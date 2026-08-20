import { cta, quoteDialog } from "@/content/landing/seo-services";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { QuoteButton } from "./QuoteDialog";

/**
 * Cta — the closing "Ready to Get More Customers from Google Search?" band.
 *
 * Identical frame to `components/services/Cta.tsx`: the `ink-950` canvas under
 * the brand mesh, a centred eyebrow, a two-tone `SectionHeading` and the buttons
 * beneath. The live band is an edge-to-edge magenta → coral → cream gradient
 * with white copy on it, which measures about 1.2:1 over the cream end — a
 * genuine contrast failure on the live page, and one the mesh canvas removes
 * rather than papers over with a scrim.
 *
 * The eyebrow is the section's own heading trail rather than new copy: this page
 * has no eyebrow string for its closing band, and the service-page `Cta` sets
 * one above every heading.
 *
 * Both buttons are `href="#"` on the live page. They open the quote dialog
 * instead, tagged so the notification email says which one was clicked — the
 * plain enquiry, or the free-report offer.
 */
export default function Cta() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 bg-mesh opacity-70"
                aria-hidden="true"
            />
            <div className="relative container-site text-center">
                <div className="reveal mx-auto max-w-[62ch]">
                    <Eyebrow className="justify-center">{quoteDialog.defaultPackage}</Eyebrow>
                    <SectionHeading
                        lead={cta.titleLead}
                        accent={cta.titleTrail}
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[52ch] text-lead text-white/65">
                        {cta.description}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                        <QuoteButton
                            packageName={quoteDialog.defaultPackage}
                            variant="primary"
                            size="lg"
                        >
                            {cta.primary}
                        </QuoteButton>
                        <QuoteButton
                            packageName={quoteDialog.reportPackage}
                            variant="ghost"
                            size="lg"
                        >
                            {cta.secondary}
                        </QuoteButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
