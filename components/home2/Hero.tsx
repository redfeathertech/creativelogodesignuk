import Link from "next/link";

import { hero } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { btn } from "@/components/ui/button";
import Counter from "@/components/ui/Counter";
import TrustpilotBadge from "@/components/ui/TrustpilotBadge";
import HeroLeadForm from "@/components/home/HeroLeadForm";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * Hero (v2). The only H1 on the page.
 *
 * Every string, and the one-screen `--hero-h` sizing, carry over from
 * components/home/Hero.tsx unchanged — that file stays the revert target and
 * is imported from, never edited.
 *
 * What changes is the composition. The split goes 7/5 rather than 50/50, so
 * the headline gets the width the display scale wants; a glow bloom sits off
 * the top-left behind the H1, reading as a light source rather than a vignette;
 * and the hairline grid gives the canvas structure the flat mesh alone did not.
 *
 * `HeroLeadForm` is NOT wrapped in an extra `glass` card here: it already
 * carries its own blurred, hairlined surface and its own `ps-hero-pad`. A
 * second wrapper would double both the card and the column gap. It gets a
 * bloom layer behind it instead, which is the part it was missing.
 *
 * The half-viewport tint from v1 is gone. It existed to weight the form side
 * of a 50/50 split; at 7/5 the bloom does that job without a hard edge running
 * down the middle of the fold.
 */
export default function Hero() {
    return (
        <section className="relative isolate grid min-h-[var(--hero-h)] items-stretch overflow-hidden bg-ink-950 text-white">
            {/* mesh + grain + grid sit under everything */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-mesh"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-50 mix-blend-overlay"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-grid-fade opacity-60"
                aria-hidden="true"
            />

            {/* Bloom behind the headline. Offset to the top-left rather than
                centred: a centred glow reads as a vignette, an offset one reads
                as a light source, and the second is what lifts the type. */}
            <div
                className="pointer-events-none absolute -top-[14%] -left-[14%] z-0 aspect-square w-[clamp(520px,52vw,900px)] glow-bloom opacity-70"
                aria-hidden="true"
            />

            <div className="relative z-[1] container-site grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                {/* `--hero-foot` is the block padding plus room the scroll cue
                    used to occupy, and collapses back to plain padding on the
                    viewports too short to have shown it. */}
                <div className="reveal mx-auto flex w-full max-w-[46rem] min-w-0 flex-col justify-center py-hero-block lg:mx-0 lg:max-w-none lg:pe-hero-pad lg:pb-[var(--hero-foot)]">
                    <Eyebrow>{hero.eyebrow}</Eyebrow>

                    <h1 className="mb-hero-gap text-hero">
                        <span className="block">{hero.titleLead}</span>
                        <span className="gradient-text block">
                            {hero.titleAccent}
                        </span>
                    </h1>

                    {/* Tighter than the 1.65 body leading: at display size this
                        reads as a standfirst, and it is the widest single block
                        in the fold. */}
                    <p className="mb-hero-gap max-w-[52ch] text-lead leading-[1.55] text-white/65">
                        {hero.sub}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <LeadButton variant="primary" size="lg">
                            {hero.primaryCta}
                            <ArrowIcon />
                        </LeadButton>
                        <Link href="/about-us" className={btn("ghost", "lg")}>
                            {hero.secondaryCta}
                        </Link>
                    </div>

                    {/* `divide-x` on the flex row draws hairlines only BETWEEN
                        stats, never as a leading or trailing edge. It is held to
                        `sm:` because below that the row wraps and the dividers
                        would land in the middle of nowhere. */}
                    <dl className="mt-hero-gap flex flex-wrap items-center gap-y-4 border-t border-white/[0.11] pt-hero-gap sm:divide-x sm:divide-white/[0.14]">
                        {hero.trust.map((item) => (
                            <div
                                key={item.label}
                                className="flex min-w-0 flex-col gap-0.5 pe-8 sm:ps-8 sm:first:ps-0"
                            >
                                <dt className="sr-only">{item.label}</dt>
                                <dd>
                                    <Counter
                                        value={item.value}
                                        suffix={item.suffix}
                                        className="gradient-text block font-display text-[clamp(1.6rem,1.1rem+1.8vw,2.4rem)] leading-none font-extrabold"
                                    />
                                    <span className="block text-xs tracking-[0.1em] text-white/40 uppercase">
                                        {item.label}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>

                    {/* The inline-start offset is the WhatsApp-FAB keep-out: the
                        FAB is fixed bottom-left and owns the first 76px of that
                        corner on every page, and once the columns split this
                        badge is the lowest thing on the left. Two bands, because
                        how close it sits to the floor depends on width as well
                        as height — the narrower the copy column, the more lines
                        the H1 takes and the lower everything below it lands.
                        Carried over from v1 verbatim; the 7/5 split widens this
                        column, so if anything the clash is less likely, never
                        more. */}
                    <TrustpilotBadge
                        {...hero.trustpilot}
                        className="mt-hero-gap [@media(min-width:62rem)_and_(max-width:74.99rem)_and_(max-height:60rem)]:ms-[max(0px,calc(5rem-var(--spacing-gutter)))] [@media(min-width:75rem)_and_(max-height:53rem)]:ms-[max(0px,calc(5rem-var(--spacing-gutter)))]"
                    />
                </div>

                {/* `isolate` keeps the bloom from painting over the form card. */}
                <div className="relative isolate min-w-0">
                    <div
                        className="pointer-events-none absolute inset-[-12%] -z-10 glow-bloom opacity-55"
                        aria-hidden="true"
                    />
                    <HeroLeadForm />
                </div>
            </div>
        </section>
    );
}
