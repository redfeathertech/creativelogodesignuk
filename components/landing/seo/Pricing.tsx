import { pricing, quoteDialog } from "@/content/landing/seo-services";
import { SeoIcon } from "./icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * Pricing — three tiers, the middle one featured.
 *
 * The live card is `<h3 class="nv-pricing-price">$799<span>/mo</span></h3>`, so
 * the price is the card's heading and the plan name above it is a plain label.
 * That order is kept: the heading level moves to a correct `h3` under the
 * section's `h2`, which is what the live markup already used.
 *
 * `tier.price` arrives from the content module with its symbol already on it
 * (`"£799"`, or `"Custom"` for the open-ended tier, which is why `period` is an
 * empty string there). Nothing here formats currency.
 *
 * Only the featured tier carries a `badge`, so the tuple's union has to be
 * narrowed with `in` rather than read straight off `tier`.
 *
 * The live buttons are 56px full-width rectangles with a 12px radius. They are
 * the page's own pill instead — `btn()` is the one button recipe in this build
 * and a second shape here would be the only rectangle on the page. Every one is
 * a `QuoteButton` tagged with its plan, so the notification email names the tier
 * the visitor clicked; on the live page all three are `href="#"`.
 */

/** Decorative tick, standing in for the live list's `::before { content: "✓" }`. */
function Tick({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            <path
                d="m5 12.5 4.5 4.5L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Pricing() {
    return (
        <section className="bg-seo-card py-[clamp(3.75rem,2rem+5.5vw,6.875rem)]">
            <div className="container-site">
                {/* ------------------------------------------------- heading -- */}
                <div className="mx-auto mb-[clamp(3.125rem,2rem+3.5vw,4.375rem)] max-w-[47.5rem] text-center">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {pricing.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-h2 font-extrabold text-seo-ink">
                        {pricing.titleLead}
                        <br />
                        {pricing.titleTrail}
                    </h2>

                    <p className="mx-auto mt-6 max-w-[38.75rem] text-body leading-[1.85] text-seo-body">
                        {pricing.description}
                    </p>
                </div>

                {/* --------------------------------------------------- tiers -- */}
                <ul className="m-0 grid list-none gap-x-6 gap-y-10 p-0 md:grid-cols-2 lg:grid-cols-3">
                    {pricing.tiers.map((tier) => {
                        const badge = "badge" in tier ? tier.badge : null;

                        return (
                            <li
                                key={tier.name}
                                className={`relative flex h-full flex-col rounded-[24px] border px-5 py-7 transition-transform duration-300 hover:-translate-y-1.5 sm:px-[1.625rem] sm:py-[2.125rem] ${
                                    tier.featured
                                        ? "border-white/[0.08] bg-seo-ink shadow-[0_18px_45px_rgb(0_0_0/0.18)] lg:scale-[1.05]"
                                        : "border-black/[0.08] bg-white"
                                }`}
                            >
                                {badge ? (
                                    <span className="gradient-seo absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 font-display text-[0.6875rem] font-bold tracking-[0.125em] whitespace-nowrap text-white">
                                        {badge}
                                    </span>
                                ) : null}

                                <p
                                    className={`m-0 font-display text-[0.8125rem] font-bold tracking-[0.15em] uppercase ${
                                        tier.featured
                                            ? "text-white/55"
                                            : "text-seo-body"
                                    }`}
                                >
                                    {tier.name}
                                </p>

                                <h3
                                    className={`mt-3.5 font-display text-[clamp(2.375rem,1.6rem+2.4vw,3.25rem)] leading-none font-extrabold ${
                                        tier.featured
                                            ? "text-white"
                                            : "text-seo-ink"
                                    }`}
                                >
                                    {tier.price}
                                    {tier.period ? (
                                        <span className="text-[1.375rem] font-semibold">
                                            {tier.period}
                                        </span>
                                    ) : null}
                                </h3>

                                <p
                                    className={`mt-3.5 text-[0.9375rem] leading-[1.7] ${
                                        tier.featured
                                            ? "text-white/65"
                                            : "text-seo-body"
                                    }`}
                                >
                                    {tier.text}
                                </p>

                                <p className="mt-3">
                                    <span
                                        className={`inline-block rounded-full px-3 py-1 text-[0.8125rem] italic text-seo-coral ${
                                            tier.featured
                                                ? "bg-white/10"
                                                : "bg-seo-coral/[0.1]"
                                        }`}
                                    >
                                        {tier.keywords}
                                    </span>
                                </p>

                                <ul className="m-0 mt-6 grid list-none gap-4 p-0">
                                    {tier.points.map((point) => (
                                        <li
                                            key={point}
                                            className={`flex items-start gap-2.5 text-[0.9375rem] leading-[1.6] ${
                                                tier.featured
                                                    ? "text-white/[0.82]"
                                                    : "text-seo-ink"
                                            }`}
                                        >
                                            <span
                                                className={`mt-0.5 flex size-[1.125rem] shrink-0 items-center justify-center rounded-full ${
                                                    tier.featured
                                                        ? "bg-white/10"
                                                        : "bg-seo-coral/[0.08]"
                                                }`}
                                            >
                                                <Tick className="size-3 text-seo-coral" />
                                            </span>
                                            <span className="min-w-0">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-7">
                                    <QuoteButton
                                        packageName={tier.name}
                                        variant={
                                            tier.featured
                                                ? "seo"
                                                : "seo-outline"
                                        }
                                        size="lg"
                                        className="w-full"
                                    >
                                        {tier.cta}
                                    </QuoteButton>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <p className="mt-7 text-center text-sm text-seo-body">
                    {pricing.bottomText}
                </p>

                {/* ----------------------------------------------------- cta -- */}
                <div className="mt-10 border-t border-black/[0.08] pt-10 text-center">
                    <p className="mx-auto mb-5 max-w-[41.25rem] text-[0.9375rem] leading-[1.8] text-seo-body">
                        {pricing.ctaText}
                    </p>

                    {/* `btn()` sets `whitespace-nowrap` and `leading-none`, and
                        `cn()` concatenates rather than merges — this label is 24
                        uppercase characters and overflows a 320px viewport on one
                        line, so both are overridden as arbitrary properties, which
                        Tailwind emits after every named utility. */}
                    <QuoteButton
                        packageName={quoteDialog.reportPackage}
                        variant="seo"
                        size="lg"
                        className="max-w-full [line-height:1.4] [white-space:normal]"
                    >
                        <SeoIcon name="search" className="size-[1.125rem]" />
                        {pricing.ctaButton}
                    </QuoteButton>
                </div>
            </div>
        </section>
    );
}
