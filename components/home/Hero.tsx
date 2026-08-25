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
                alt={hero.backgroundAlt}
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
                {/* Below `lg` the copy is the whole fold — one centred column,
                    as the approved mobile design has it. Above `lg` it is the
                    left half of a split banner and stays left-aligned, so every
                    mobile rule here is a `max-lg:` override rather than a
                    default the desktop layout has to undo. */}
                <div className="hero-copy reveal mx-auto flex w-full max-w-[46rem] flex-col justify-center py-hero-block max-lg:text-center lg:mx-0 lg:max-w-none lg:pe-hero-pad lg:pb-[var(--hero-foot)]">
                    {/* The eyebrow's leading hairline bar is a left-aligned
                        mark — it reads as a stray dash once the label is
                        centred, so the centred layout drops it. The bar is the
                        only `<span>` child; the label itself is a text node. */}
                    <Eyebrow className="max-lg:justify-center max-lg:[&>span]:hidden">
                        {hero.eyebrow}
                    </Eyebrow>

                    <h1 className="mb-hero-gap text-hero">
                        <span className="block">{hero.titleLead}</span>
                        <span className="gradient-text block">
                            {hero.titleAccent}
                        </span>
                    </h1>

                    {/* Tighter than the 1.65 body leading: at display size this reads as
              a standfirst, and five lines of it is the widest single block in
              the fold. */}
                    <p className="mb-hero-gap max-w-[52ch] text-lead leading-[1.55] text-white/65 max-lg:mx-auto">
                        {hero.sub}
                    </p>

                    {/* Below `sm` the two CTAs stack and fill the column: at
                        390px the primary already wrapped onto its own full-width
                        row while the ghost sat at its intrinsic width beside
                        nothing, which reads as a mistake. Flex items stretch by
                        default, so the direction is the whole change.

                        The four overrides on the buttons themselves are what a
                        320px screen needs. `btn` is `whitespace-nowrap` with
                        2.25rem of inline padding and 0.06em of tracking, which
                        runs "Request Growth Strategy" past the viewport there —
                        and past it invisibly, since the audit script measures
                        element boxes and the overflowing part is a text node.
                        Trimmed to 0.75rem, 0.5rem of icon gap and 0.04em, and
                        free to wrap, the label holds one line from 360px up (the
                        reference design’s single-line CTA) and breaks onto a
                        second at 320 instead of overflowing. None of that is
                        visible above 360: the button is stretched well past its
                        content, so the padding only sets a floor.
                        `leading-tight` is only so the second line has leading;
                        `btn` sets `leading-none` for the single-line case. */}
                    <div className="hero-ctas flex flex-wrap gap-4 max-lg:justify-center max-sm:flex-col max-sm:[&>*]:gap-2 max-sm:[&>*]:px-3 max-sm:[&>*]:leading-tight max-sm:[&>*]:tracking-[0.04em] max-sm:[&>*]:whitespace-normal">
                        <LeadButton variant="primary" size="lg">
                            {hero.primaryCta}
                            <ArrowIcon />
                        </LeadButton>
                        <Link href="/about-us" className={btn("ghost", "lg")}>
                            {hero.secondaryCta}
                        </Link>
                    </div>

                    {/* One rail, hairline-divided, at every width. The three
                        marks used to stack below `sm`, which spent ~130px of the
                        fold on three lines of what the design shows as one and
                        left the Trustpilot badge on the floor of the viewport,
                        under the WhatsApp FAB.

                        Below `sm` the items are equal thirds and everything
                        inside them is `vw`-scaled: three columns in the 280px a
                        320px screen leaves is 93px each, and fixed type does not
                        fit that. The label keeps its `nowrap` from `sm` up but
                        is free to wrap below it — measured, "Projects delivered"
                        holds one line from 360px up, and under that a second
                        line beats an overflow.

                        The dividers are borders on the items rather than
                        separate elements, so a wrap drops the leading rule with
                        the item instead of stranding it. */}
                    <dl className="mt-hero-gap flex flex-row items-center border-t border-white/[0.11] pt-hero-gap sm:flex-wrap sm:gap-0 lg:flex-nowrap">
                        {hero.trust.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex min-w-0 items-center gap-3 not-first:border-s not-first:border-white/[0.11] max-sm:flex-1 max-sm:justify-center max-sm:gap-[clamp(0.2rem,1.2vw,0.5rem)] max-sm:px-1 sm:pe-6 sm:ps-6 sm:first:ps-0 lg:gap-2.5 lg:pe-4 lg:ps-4 xl:gap-3 xl:pe-6 xl:ps-6"
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.iconAlt}
                                        width={48}
                                        height={48}
                                        unoptimized
                                        className="h-11 w-11 shrink-0 object-contain max-sm:h-[clamp(1rem,4vw,1.75rem)] max-sm:w-[clamp(1rem,4vw,1.75rem)] lg:h-9 lg:w-9 xl:h-11 xl:w-11"
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <dt className="sr-only">{item.label}</dt>
                                        <dd>
                                            <Counter
                                                value={item.value}
                                                suffix={item.suffix}
                                                className="gradient-text block font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.1rem)] leading-none font-extrabold max-sm:text-[clamp(0.875rem,4.2vw,1.5rem)]"
                                            />
                                            <span className="mt-1 block text-xs tracking-[0.1em] whitespace-nowrap text-white/40 uppercase max-sm:mt-0.5 max-sm:text-[clamp(0.4375rem,1.8vw,0.75rem)] max-sm:tracking-[0.02em] max-sm:whitespace-normal lg:tracking-wider">
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
                        full
                        className="mt-hero-gap max-lg:mx-auto [@media(min-width:62rem)_and_(max-width:74.99rem)_and_(max-height:60rem)]:ms-[max(0px,calc(5rem-var(--spacing-gutter)))] [@media(min-width:75rem)_and_(max-height:53rem)]:ms-[max(0px,calc(5rem-var(--spacing-gutter)))]"
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
            {/* An anchor, not a bare mark: the cue points at the next section
          (`#about`), so clicking it scrolls there. `scroll-behavior: smooth`
          and the `scroll-padding-top` that clears the sticky nav are both
          already set globally on `html`, so the anchor needs neither. Focusable
          and labelled, since it is a control now rather than decoration. */}
            <a
                href="#about"
                aria-label={hero.scrollCue}
                className="absolute bottom-5 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-1.5 text-xs tracking-[0.06em] text-white/45 transition-colors hover:text-white/80 focus-visible:text-white/80 [@media(min-height:800px)]:inline-flex"
            >
                <ScrollMouseIcon
                    className="h-9 w-auto text-white/75"
                    aria-hidden="true"
                />
                <span aria-hidden="true">{hero.scrollCue}</span>
            </a>
        </section>
    );
}
