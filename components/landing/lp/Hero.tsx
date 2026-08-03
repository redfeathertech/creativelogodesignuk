import Image from "next/image";

import { contact } from "@/content/site";
import { hero } from "@/content/landing/lp";
import { btn } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import TrustpilotBadge from "@/components/ui/TrustpilotBadge";
import { QuoteButton } from "./QuoteDialog";
import QuoteForm from "./QuoteForm";

/**
 * Hero — the only H1 on the page.
 *
 * Copy column on the left, the quote form on the right, which is the live
 * page's composition and the one the ad creative is built around.
 *
 * The live `<h1>` reads "Custom Web Design / Starts from" and stops: the price
 * that finishes the sentence is `saleprice.webp`, a bitmap carrying
 * `alt="199"` — no currency symbol and no context. So the headline offer, the
 * number the entire ad spend bids on, is invisible to a crawler and announces
 * as a bare "199" to a screen reader. It is HTML here, inside the same `<h1>`.
 */
export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 text-white">
            <Image
                src="/assets/img/landing/lp/hero-bg.webp"
                alt=""
                aria-hidden="true"
                width={1920}
                height={786}
                preload
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-35"
            />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden="true" />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-50 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] py-[clamp(2.5rem,1rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <div className="reveal">
                    <h1 className="text-h1">
                        {hero.titleLead}{" "}
                        <span className="block">
                            {hero.titleTrail} <span className="gradient-text">{hero.price}</span>
                        </span>
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
                        <QuoteButton
                            packageName={hero.ctaStartPackage}
                            variant="primary"
                            size="lg"
                        >
                            {hero.ctaStart}
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

                <div className="reveal relative isolate overflow-hidden rounded-lg border border-white/10 bg-ink-850/80 p-6 shadow-lg backdrop-blur-md sm:p-8">
                    <Image
                        src="/assets/img/landing/lp/form-bg.webp"
                        alt=""
                        aria-hidden="true"
                        width={900}
                        height={1012}
                        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-25"
                    />

                    <h2 className="text-h4 font-extrabold text-white">{hero.form.title}</h2>
                    <p className="mt-2 text-sm text-magenta-300">{hero.form.lead}</p>

                    <div className="mt-6">
                        <QuoteForm submitLabel={hero.form.submit} />
                    </div>
                </div>
            </div>
        </section>
    );
}
