import { contact } from "@/content/site";
import { discountBand } from "@/content/landing/creative-logo-design";
import { btn } from "@/components/ui/button";

/**
 * The full-bleed discount band between the pricing and the combo package.
 *
 * The live page centres a "SPECIAL OFFER / SALE / UPTO 70% OFF / SHOP NOW ›"
 * bitmap here — 54KB of PNG containing a call to action that no crawler can
 * read and no screen reader can announce. It is HTML here, so "70% off" is real
 * text and the only clickable things in the band are the two real CTAs.
 */
export default function DiscountBand() {
    return (
        <section
            className="relative isolate overflow-hidden bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] py-[clamp(2.5rem,1.5rem+4vw,4rem)] text-white"
            aria-labelledby="cld-discount-title"
        >
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-30 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site grid items-center gap-8 text-center lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,5fr)] lg:text-left">
                <div className="reveal">
                    <p className="text-sm tracking-[0.08em] text-white/75 uppercase">
                        {discountBand.kicker}
                    </p>
                    <h2 id="cld-discount-title" className="mt-2 text-h3">
                        {discountBand.titleLead}{" "}
                        <span className="text-star">{discountBand.titleAccent}</span>
                    </h2>
                </div>

                {/* The discount medallion, rebuilt from the live page's bitmap. */}
                <p
                    className="reveal mx-auto grid size-[clamp(7rem,18vw,9rem)] place-items-center rounded-full border-2 border-star/60 bg-ink-950/25 text-center backdrop-blur-sm"
                    aria-hidden="true"
                >
                    <span className="block">
                        <span className="block text-[0.5625rem] font-bold tracking-[0.12em] text-white/75 uppercase">
                            {discountBand.badgeKicker}
                        </span>
                        <span className="block font-display text-h3 leading-none font-extrabold text-star">
                            {discountBand.badgeValue}
                        </span>
                        <span className="block font-display text-xs font-extrabold tracking-[0.14em] text-white uppercase">
                            {discountBand.badgeSuffix}
                        </span>
                    </span>
                </p>

                <div className="reveal">
                    <p className="text-white/85">{discountBand.support}</p>
                    <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                        <a href={`tel:${contact.phoneE164}`} className={btn("light")}>
                            {contact.phoneDisplay}
                        </a>
                        <a
                            href={contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={btn("ghost")}
                        >
                            {discountBand.chat}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
