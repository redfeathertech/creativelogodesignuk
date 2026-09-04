import Image from "next/image";

import { pricing, quoteDialog } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { QuoteButton } from "./QuoteDialog";

/**
 * Pricing — the three retainer tiers.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Rebuilt to the client's approved composition. Three changes to the card:
 *
 * 1. Each tier now opens with the client's SVG in a lavender tile, beside a
 *    two-line identity block — the tier name over its keyword allowance, which
 *    used to sit as a pill *below* the price and read as an afterthought.
 * 2. A hairline separates that header-and-price block from the checklist, so
 *    the eye lands on price, then features, rather than on one undivided run.
 * 3. The closing CTA is a gradient banner with the client's warning glyph,
 *    rather than a centred paragraph under a rule.
 *
 * **Layout only. No copy rewritten.** The keyword allowance is uppercased in
 * CSS, not in the content module, so the string stays the one the live page
 * carries. The banner's heading is the live run's own opening question split
 * off from the sentence that follows it — the two render adjacent and in
 * source order, so `scripts/verify-seo-services-parity.py` still matches the
 * run whole in both directions and neither of its lists needed an entry.
 *
 * The currency, the tier names and the two "Everything in …" references remain
 * rebrand decisions recorded in `content/landing/seo-services.ts`; nothing
 * about them lives here.
 *
 * Responsive: one column to 576px, two to `lg`, three above it. The header row
 * wraps to its own line only where the tile plus the longest tier name cannot
 * share a line, and the banner stacks its glyph above the copy below `md`,
 * where a 100px illustration beside text leaves the text about 40 characters.
 */
export default function Pricing() {
    return (
        <Section tone="lilac">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[60rem] text-center">
                    <Eyebrow flanked className="justify-center text-magenta-500">
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
                                className={`reveal relative flex h-full min-w-0 flex-col rounded-2xl bg-white p-6 transition-transform duration-300 hover:-translate-y-1.5 sm:p-8 ${
                                    tier.featured
                                        ? "shadow-lg ring-[1.5px] ring-magenta-500 ring-inset"
                                        : "border border-ink-900/[0.08] shadow-sm"
                                }`}
                            >
                                {badge ? (
                                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] px-5 py-2 font-display text-ui-11 font-bold tracking-[0.125em] whitespace-nowrap text-white">
                                        {badge}
                                    </span>
                                ) : null}

                                {/* -------------------------------- identity -- */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                    <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-magenta-50">
                                        <Image
                                            src={tier.icon}
                                            alt={tier.iconAlt}
                                            width={tier.iconWidth}
                                            height={tier.iconHeight}
                                            className="size-7 object-contain"
                                        />
                                    </span>

                                    <div className="min-w-0">
                                        <p className="m-0 font-display text-h6 leading-tight font-extrabold tracking-[0.02em] text-onlight uppercase">
                                            {tier.name}
                                        </p>
                                        {/* Uppercased here, not in `content/` —
                                            the string stays the live one. */}
                                        <p className="mt-1 font-display text-ui-11 font-bold tracking-[0.1em] text-magenta-600 uppercase">
                                            {tier.keywords}
                                        </p>
                                    </div>
                                </div>

                                {/* ---------------------------------- price -- */}
                                <h3 className="mt-6 font-display text-h2 leading-none font-extrabold text-onlight">
                                    {tier.price}
                                    {tier.period ? (
                                        <span className="text-h5 font-semibold text-onlight-muted">
                                            {tier.period}
                                        </span>
                                    ) : null}
                                </h3>

                                <p className="mt-3.5 text-sm text-onlight-muted">
                                    {tier.text}
                                </p>

                                <hr className="mt-6 border-0 border-t border-ink-900/[0.08]" />

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
                                    <LeadButton
                                        variant={tier.featured ? "primary" : "outline"}
                                        size="lg"
                                        className="w-full"
                                    >
                                        {tier.cta}
                                    </LeadButton>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <p className="reveal mt-10 text-center text-sm text-onlight-muted">
                    {pricing.bottomText}
                </p>

                {/* ----------------------------------------------------- cta -- */}
                <div className="reveal mt-10 border-t border-ink-900/[0.08] pt-10">
                    <div className="relative isolate overflow-hidden rounded-2xl bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] p-6 text-white sm:p-8 lg:p-10">
                        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
                            <Image
                                src={pricing.ctaIcon}
                                alt=""
                                aria-hidden="true"
                                width={pricing.ctaIconWidth}
                                height={pricing.ctaIconHeight}
                                className="h-12 w-auto shrink-0 md:h-[4.5rem]"
                            />

                            <div className="min-w-0">
                                <p className="m-0 font-display text-h4 leading-tight font-extrabold">
                                    {pricing.ctaHeading}
                                </p>
                                <p className="mt-2 max-w-[62ch] text-white/85">
                                    {pricing.ctaText}
                                </p>

                                {/* `btn()` sets `leading-none`, and `cn()`
                                    concatenates rather than merges — this label
                                    is 21 uppercase characters and needs to be
                                    allowed to wrap on a 320px viewport. */}
                                <QuoteButton
                                    packageName={quoteDialog.reportPackage}
                                    variant="light"
                                    size="lg"
                                    className="mt-6 max-w-full rounded-[8px]! [line-height:1.4] [white-space:normal]"
                                >
                                    {pricing.ctaButton}
                                </QuoteButton>
                            </div>

                            {/* Decorative. Sits at the right edge from `md` up,
                                where the row is horizontal and there is width to
                                spare; below that the banner is a narrow stack and
                                the artwork would only push the CTA down the fold. */}
                            <Image
                                src={pricing.ctaImage}
                                alt=""
                                aria-hidden="true"
                                width={pricing.ctaImageWidth}
                                height={pricing.ctaImageHeight}
                                className="ml-auto hidden h-auto w-[14rem] shrink-0 self-center md:block lg:w-[17.875rem]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
