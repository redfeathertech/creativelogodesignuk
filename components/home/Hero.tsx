import Image from "next/image";
import Link from "next/link";

import { hero } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { btn } from "@/components/ui/button";
import Counter from "@/components/ui/Counter";
import TrustpilotBadge from "@/components/ui/TrustpilotBadge";
import HeroLeadForm from "./HeroLeadForm";
import { ArrowIcon } from "@/components/ui/icons";
import { ScrollMouseIcon } from "./heroIcons";

/**
 * Hero. The only H1 on the page.
 *
 * A split composition inside `container-site`, like every other section: the
 * copy column's left edge lines up with the logo in the header above it, and
 * the form card's right edge with the header CTA. Only the backgrounds bleed —
 * the mesh behind everything, and the tint behind the form half, which runs to
 * the viewport edge via an absolute layer. That layer can split at `left-1/2`
 * because the container is centred, so its column boundary IS the section's
 * midline.
 *
 * The section is exactly one screen tall: `--hero-h` is `100svh` less the
 * header that sits above it, so the whole composition — down to the stats — is
 * on screen at load with nothing to scroll for. Everything inside it is sized
 * off viewport height as well as width (`text-hero`, `hero-block`, `hero-gap`),
 * so a short laptop screen compresses the hero instead of overflowing it.
 *
 * Heading text is unchanged from the live site — it ranks, and the SEO brief is
 * content parity. The layout, semantics and asset handling are all new.
 */
export default function Hero() {
    return (
        <section className="relative isolate grid min-h-[var(--hero-h)] items-stretch overflow-hidden bg-ink-950 text-white">
            {/* One backdrop across the whole section. It is a single image
                rather than the old mesh + rings + half-width tint: those made
                the copy half and the form half read as two panels, when the
                design is one banner. Sized rather than `fill`ed: `fill` emits
                no width/height, and every image in this build carries both.
                `object-cover` still bleeds it to both viewport edges at any
                aspect ratio, and `preload` because it is the LCP background. */}
            <Image
                src={hero.background}
                alt=""
                aria-hidden="true"
                width={1920}
                height={885}
                preload
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
            />

            {/* An even split rather than the old 5/7. At 5/7 the copy column is only
          ~490px on a 1440 screen, which wraps the H1 onto a third line and the
          CTAs onto a second row — ~150px the fold does not have. */}
            <div className="relative z-[1] container-site grid grid-cols-1 lg:grid-cols-2">
                {/* `--hero-foot` is the block padding plus room for the scroll cue —
            and collapses back to plain padding on the viewports too short to
            show the cue at all. */}
                <div className="hero-copy reveal mx-auto flex w-full max-w-[46rem] flex-col justify-center py-hero-block lg:mx-0 lg:max-w-none lg:pe-hero-pad lg:pb-[var(--hero-foot)]">
                    <Eyebrow>{hero.eyebrow}</Eyebrow>

                    <h1 className="mb-hero-gap text-hero">
                        <span className="block">{hero.titleLead}</span>
                        <span className="gradient-text block">
                            {hero.titleAccent}
                        </span>
                    </h1>

                    {/* Tighter than the 1.65 body leading: at display size this reads as
              a standfirst, and five lines of it is the widest single block in
              the fold. */}
                    <p className="mb-hero-gap max-w-[52ch] text-lead leading-[1.55] text-white/65">
                        {hero.sub}
                    </p>

                    <div className="hero-ctas flex flex-wrap gap-4">
                        <LeadButton variant="primary" size="lg">
                            {hero.primaryCta}
                            <ArrowIcon />
                        </LeadButton>
                        <Link href="/about-us" className={btn("ghost", "lg")}>
                            {hero.secondaryCta}
                        </Link>
                    </div>

                    {/* One rail, hairline-divided. The dividers are borders on
                        the items rather than separate elements, so a wrap drops
                        the leading rule with the item instead of stranding it. */}
                    <dl className="mt-hero-gap flex flex-col gap-4 border-t border-white/[0.11] pt-hero-gap sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
                        {hero.trust.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-3 sm:pe-6 sm:ps-6 sm:first:ps-0 sm:not-first:border-s sm:not-first:border-white/[0.11]"
                                >
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        aria-hidden="true"
                                        width={48}
                                        height={48}
                                        className="h-11 w-11 shrink-0"
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <dt className="sr-only">{item.label}</dt>
                                        <dd>
                                            <Counter
                                                value={item.value}
                                                suffix={item.suffix}
                                                className="gradient-text block font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.1rem)] leading-none font-extrabold"
                                            />
                                            <span className="mt-1 block text-xs tracking-[0.1em] text-white/40 uppercase">
                                                {item.label}
                                            </span>
                                        </dd>
                                    </div>
                                </div>
                        ))}
                    </dl>

                    {/* Closes the trust cluster at the foot of the copy column.
                        `mt-hero-gap` ties it to the same viewport-height rhythm
                        as everything above it, so a short screen compresses the
                        gap rather than pushing the badge past the fold.

                        The inline-start offset is the same WhatsApp-FAB keep-out
                        the scroll cue uses: the FAB is fixed bottom-left and owns
                        the first 76px of that corner on every page, and once the
                        columns split the badge is the lowest thing on the left.
                        Measured, the FAB reaches the badge on 31 of 71 desktop
                        sizes without it — 1366×768 and 1440×720 among them.

                        Two bands, because how close the badge sits to the floor
                        depends on the width as well as the height: the narrower
                        the copy column, the more lines the H1 takes and the lower
                        everything below it lands. So the wide band only needs the
                        offset below 53rem of height, while the narrow one needs it
                        up to 60rem. Above those the badge is nowhere near the FAB
                        and stays flush with the heading — which is every maximised
                        desktop window. `max()` holds the offset to the smallest
                        value that clears the FAB, and to zero if the gutter ever
                        grows past it on its own. Moving the FAB to bottom-right
                        would retire both lines.

                        The subtrahend is the copy column's real left inset: the
                        container gutter, now the hero shares `container-site`
                        with the chrome. Once the container's max-width binds
                        (>1560px) the true inset is larger and the offset
                        overshoots by up to 2rem — visible only on viewports both
                        wider than 1560px and shorter than 848px, and only as the
                        badge sitting slightly right of the heading. */}
                    <TrustpilotBadge
                        {...hero.trustpilot}
                        className="mt-hero-gap [@media(min-width:62rem)_and_(max-width:74.99rem)_and_(max-height:60rem)]:ms-[max(0px,calc(5rem-var(--spacing-gutter)))] [@media(min-width:75rem)_and_(max-height:53rem)]:ms-[max(0px,calc(5rem-var(--spacing-gutter)))]"
                    />
                </div>

                <HeroLeadForm />
            </div>

            {/* Decorative, and the first thing to go: below 800px of viewport the
          88px it occupies is worth more to the copy. Paired with --hero-foot,
          which stops reserving that space at the same breakpoint.

          The `max()` keeps it clear of the WhatsApp FAB, which is fixed at
          bottom-left and owns the first 76px of that corner on every page —
          only visible as a clash now that the hero ends inside the fold. */}
            {/* Decorative, and the first thing to go: below 800px of viewport the
          space it occupies is worth more to the copy. Paired with --hero-foot,
          which stops reserving that space at the same breakpoint. */}
            <span
                className="pointer-events-none absolute bottom-5 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-1.5 text-xs tracking-[0.06em] text-white/45 [@media(min-height:800px)]:inline-flex"
                aria-hidden="true"
            >
                <ScrollMouseIcon className="h-9 w-auto text-white/75" />
                {hero.scrollCue}
            </span>
        </section>
    );
}
