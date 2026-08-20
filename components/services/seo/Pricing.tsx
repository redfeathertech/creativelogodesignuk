import { pricing, quoteDialog } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { SeoIcon } from "./icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * Pricing — the three retainer tiers.
 *
 * The `light-alt` surface with white cards, and the featured tier carries the
 * same `ring-magenta-500 ring-inset` + `shadow-md` treatment the `Benefits`
 * tabs use for their selected state — rather than the live page's inverted
 * near-black card, which was the one place on the page a card changed colour
 * to say "selected".
 *
 * The currency, the tier names and the two "Everything in …" references are
 * rebrand decisions recorded in `content/landing/seo-services.ts`; nothing
 * about them lives here.
 */
export default function Pricing() {
    return (
        <Section tone="light-alt">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow className="justify-center text-magenta-500">
                        {pricing.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={pricing.titleLead}
                        accent={pricing.titleTrail}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-onlight-muted">
                        {pricing.description}
                    </p>
                </div>

                {/* --------------------------------------------------- tiers -- */}
                <ul className="m-0 mt-12 grid list-none gap-x-6 gap-y-10 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {pricing.tiers.map((tier) => {
                        const badge = "badge" in tier ? tier.badge : null;

                        return (
                            <li
                                key={tier.name}
                                className={`reveal relative flex h-full min-w-0 flex-col rounded-lg bg-white p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                                    tier.featured
                                        ? "shadow-lg ring-[1.5px] ring-magenta-500 ring-inset"
                                        : "border border-ink-900/[0.08] shadow-sm"
                                }`}
                            >
                                {badge ? (
                                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] px-5 py-2 font-display text-[0.6875rem] font-bold tracking-[0.125em] whitespace-nowrap text-white">
                                        {badge}
                                    </span>
                                ) : null}

                                <p className="m-0 font-display text-[0.8125rem] font-bold tracking-[0.15em] text-onlight-muted uppercase">
                                    {tier.name}
                                </p>

                                <h3 className="mt-3.5 font-display text-h2 leading-none font-extrabold text-onlight">
                                    {tier.price}
                                    {tier.period ? (
                                        <span className="text-h5 font-semibold text-onlight-muted">
                                            {tier.period}
                                        </span>
                                    ) : null}
                                </h3>

                                <p className="mt-3.5 text-onlight-muted">{tier.text}</p>

                                <p className="mt-3">
                                    <span className="inline-block rounded-full bg-magenta-50 px-3 py-1 text-[0.8125rem] text-magenta-600 italic">
                                        {tier.keywords}
                                    </span>
                                </p>

                                <ul className="m-0 mt-6 grid list-none gap-4 p-0">
                                    {tier.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-3 text-sm text-onlight-muted"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-magenta-50 text-magenta-600"
                                            >
                                                <CheckIcon className="size-3" />
                                            </span>
                                            <span className="min-w-0">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-8">
                                    <QuoteButton
                                        packageName={tier.name}
                                        variant={tier.featured ? "primary" : "outline"}
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

                <p className="reveal mt-8 text-center text-sm text-onlight-muted">
                    {pricing.bottomText}
                </p>

                {/* ----------------------------------------------------- cta -- */}
                <div className="reveal mt-10 border-t border-ink-900/[0.08] pt-10 text-center">
                    <p className="mx-auto mb-6 max-w-[62ch] text-onlight-muted">
                        {pricing.ctaText}
                    </p>

                    {/* `btn()` sets `whitespace-nowrap` and `leading-none`, and
                        `cn()` concatenates rather than merges — this label is 24
                        uppercase characters and overflows a 320px viewport on one
                        line, so both are overridden as arbitrary properties, which
                        Tailwind emits after every named utility. */}
                    <QuoteButton
                        packageName={quoteDialog.reportPackage}
                        variant="primary"
                        size="lg"
                        className="max-w-full [line-height:1.4] [white-space:normal]"
                    >
                        <SeoIcon name="search" className="size-[1.125rem]" />
                        {pricing.ctaButton}
                    </QuoteButton>
                </div>
            </div>
        </Section>
    );
}
