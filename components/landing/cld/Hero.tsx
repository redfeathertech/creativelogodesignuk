import { contact } from "@/content/site";
import { hero } from "@/content/landing/creative-logo-design";
import { btn } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import TrustpilotBadge from "@/components/ui/TrustpilotBadge";
import { QuoteButton } from "./QuoteDialog";
import QuoteForm from "./QuoteForm";

/**
 * Hero — the only H1 on the page.
 *
 * Copy column on the left, the £35 offer card and its four-field form on the
 * right, which is the live page's composition and the one the ad creative is
 * built around.
 *
 * The two price flashes the live page draws as bitmaps ("£35 / 70% OFF" hanging
 * tag, "MEGA SAVER DEAL" sticker) are HTML here. Both bake their text into the
 * image, so on the live page the headline price is invisible to a crawler and
 * unreadable to a screen reader — 75KB of PNG for text the page could just say.
 */
export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 text-white">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden="true" />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-50 mix-blend-overlay"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -top-[26%] -left-[16%] -z-10 aspect-square w-[clamp(420px,44vw,720px)] rounded-full bg-rings opacity-40"
                aria-hidden="true"
            />

            {/* One padding declaration, not two: `py-section` here plus a
                `pb-section` on the wrapper stacked to ~14rem of dead space
                under the fold. */}
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] py-[clamp(2.5rem,1rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <div className="reveal">
                    <h1 className="text-h1">
                        {hero.titleLead} <span className="gradient-text">{hero.titleAccent}</span>{" "}
                        {hero.titleTrail}
                    </h1>

                    <p className="mt-6 max-w-[54ch] text-lead leading-[1.6] text-white/65">
                        {hero.lead}
                    </p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                        {hero.checklist.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-white/85">
                                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-300">
                                    <CheckIcon className="size-3" />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                        <QuoteButton variant="primary" size="lg">
                            {hero.ctaQuote}
                        </QuoteButton>
                        <a href="#packages" className={btn("ghost", "lg")}>
                            {hero.ctaPricing}
                        </a>
                        <a href={`tel:${contact.phoneE164}`} className={btn("ghost", "lg")}>
                            {contact.phoneDisplay}
                        </a>
                    </div>

                    <TrustpilotBadge
                        className="mt-8"
                        href={hero.trustpilot.href}
                        label={hero.trustpilot.label}
                        linkLabel={hero.trustpilot.linkLabel}
                        logo="/assets/img/trustpilot-logo.png"
                        logoAlt="Trustpilot"
                        stars={5}
                    />
                </div>

                {/* ---------------------------------------------- offer card -- */}
                <div className="reveal relative w-full max-w-[30rem] justify-self-center lg:justify-self-end">
                    {/* The flash overlaps the card corner, so it is pulled out of
                        flow — but only from `sm:` up. Below that there is no
                        margin to overlap into and it would sit off-screen. */}
                    <p
                        className="mb-3 inline-flex rotate-[-3deg] rounded-full bg-star px-4 py-1.5 font-display text-xs font-extrabold tracking-[0.08em] text-ink-950 uppercase shadow-md sm:absolute sm:-top-4 sm:-right-2 sm:z-10 sm:mb-0"
                        aria-hidden="true"
                    >
                        {hero.offer.flash}
                    </p>

                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-lg backdrop-blur-md sm:p-8">
                        <p className="font-display text-h5 font-bold text-white">
                            {hero.offer.packageName}
                        </p>
                        <p className="mt-1 text-sm text-magenta-300">{hero.offer.discount}</p>

                        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/10 pb-5">
                            <span className="font-display text-h2 leading-none font-extrabold text-white">
                                {hero.offer.price}
                            </span>
                            {/* Both struck-through prices are the live page's — see
                                docs/CONTENT-PARITY.md. */}
                            <span className="text-white/45 line-through">{hero.offer.was}</span>
                            <span className="text-white/45 line-through">
                                {hero.offer.wasSecondary}
                            </span>
                            <span className="text-sm text-white/55">{hero.offer.only}</span>
                            <span className="w-full text-xs font-bold tracking-[0.06em] text-[#ff8080] uppercase">
                                {hero.offer.urgency}
                            </span>
                        </div>

                        <div className="mt-6">
                            <QuoteForm
                                packageName={hero.offer.packageName}
                                submitLabel={hero.offer.submit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
