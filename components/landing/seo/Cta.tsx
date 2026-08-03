import { cta, quoteDialog } from "@/content/landing/seo-services";
import { QuoteButton } from "./QuoteDialog";

/**
 * Cta — the closing "Ready to Get More Customers from Google Search?" band.
 *
 * The live band is edge-to-edge with square corners (`.yr-cta-box` is 100% wide
 * inside a container whose max-width and padding are both reset). It is a
 * rounded box on the page grid here so it lines up with the cards every section
 * above it uses, and so the section keeps the `bg-seo-card` canvas the live CSS
 * puts behind it.
 *
 * **The scrim is not decoration.** `gradient-seo` ends on `--color-seo-cream`
 * (#f3f1b2), and the live page sets this band's copy in white: white on that
 * cream measures about 1.2:1, and it is still under 2.1:1 across the whole
 * right-hand half of the ramp. That is a genuine failure on the live page, not
 * a look worth porting. The overlay darkens the ramp left-to-right — lightest
 * over the pink end, heaviest over the cream end — which holds white text
 * between 7:1 and 8:1 the whole way across and reads as a deliberate fade into
 * the near-black footer that follows. `rgb(18 18 18 …)` is `--color-seo-ink`;
 * it is written out because arbitrary values cannot take an alpha off a
 * custom property, the same way `button.ts` writes out the pink for its glow.
 *
 * Both buttons are `href="#"` on the live page. They open the quote dialog
 * instead, tagged so the notification email says which one was clicked — the
 * plain enquiry, or the free-report offer. The outline pill is the `ghost`
 * variant: a translucent white ring on colour, which is what every other
 * landing page in this build uses beside a `light` primary.
 *
 * The two labels are long, and `btn`'s pills never wrap. At 320px the content
 * box is 240px wide and "FREE SEO REPORT →" runs ~241px inside `lg`'s `px-9`,
 * so the padding is pulled back below `sm` where the buttons go full-width.
 */
export default function Cta() {
    return (
        <section className="bg-seo-card py-[clamp(2.5rem,1.5rem+3vw,5rem)]">
            <div className="container-site">
                <div className="relative isolate overflow-hidden rounded-[clamp(1.25rem,0.75rem+2vw,2rem)] gradient-seo px-5 py-[clamp(4.375rem,2.5rem+5vw,7.5rem)] text-center sm:px-8">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(18_18_18/0.30)_0%,rgb(18_18_18/0.42)_40%,rgb(18_18_18/0.62)_75%,rgb(18_18_18/0.80)_100%)]"
                    />

                    <h2 className="font-display text-[clamp(1.375rem,1rem+1.9vw,2.5rem)] leading-[1.2] font-extrabold text-white">
                        {cta.titleLead} <br className="hidden md:inline" />
                        {cta.titleTrail}
                    </h2>

                    <p className="mx-auto mt-7 max-w-[47.5rem] text-[0.875rem] leading-[1.8] text-white/90 sm:text-base sm:leading-[1.9]">
                        {cta.description}
                    </p>

                    <div className="mt-[clamp(2rem,1.5rem+1.5vw,2.625rem)] flex flex-wrap items-center justify-center gap-[clamp(0.875rem,0.6rem+0.8vw,1.125rem)]">
                        <QuoteButton
                            packageName={quoteDialog.defaultPackage}
                            variant="light"
                            size="lg"
                            className="w-full max-sm:px-6 sm:w-auto sm:min-w-[13.75rem]"
                        >
                            {cta.primary}
                        </QuoteButton>

                        <QuoteButton
                            packageName={quoteDialog.reportPackage}
                            variant="ghost"
                            size="lg"
                            className="w-full max-sm:px-6 sm:w-auto sm:min-w-[13.75rem]"
                        >
                            {cta.secondary}
                        </QuoteButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
