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

                    {/* Full-width and stacked until both pills fit side by side.
                        They already stacked below `sm` — 359px + 208px has
                        never fitted in a 320px screen's 280px column — but they
                        stacked at their intrinsic widths, so the primary CTA
                        was 79px wider than the column it sat in and the hero's
                        `overflow-hidden` sliced the end off it. Full-width is
                        the fix that also reads as deliberate: two matched pills
                        rather than two ragged ones. */}
                    <div className="hero-ctas flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                        <LeadButton
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            {hero.primaryCta}
                            <ArrowIcon />
                        </LeadButton>
                        <Link
                            href="/about-us"
                            className={btn("ghost", "lg", "w-full sm:w-auto")}
                        >
                            {hero.secondaryCta}
                        </Link>
                    </div>

                    {/* One rail, hairline-divided, and it WRAPS. It used to be
                        `lg:flex-nowrap`, which forced three badges into a
                        column that is half the viewport from `lg` up and does
                        not offer their full 665px until 97rem. The badges are
                        `min-w-0` flex items that held `whitespace-nowrap`
                        labels, so being over-constrained neither shrank them
                        nor clipped them — each badge simply ran through the
                        next one's divider. Measured at rest, the rail needed
                        641px at 1440 and had 617: 24px of overlap, on every
                        width from 992 to ~1500. See `--rail-icon` in
                        globals.css for the scale that replaces it. Wrapping to
                        a second row costs one row of height under ~1215px and
                        cannot collide at any width.

                        The rule between badges is a leading border on each
                        badge, which on a wrapped row would strand a vertical
                        hairline at the start of row two with nothing before it.
                        The wrapper clips it: the rail is pulled one padding
                        step plus one border into the wrapper's `overflow`, so
                        the FIRST badge of EVERY row loses its rule and every
                        rule that survives has a badge on both sides of it. That
                        is also why the badges no longer need `first:ps-0`. */}
                    {/* `--rail-keepout` is the WhatsApp FAB's corner, and is
                        0px at every size where the two cannot meet — see
                        globals.css. It moves the rule with the badges rather
                        than just the badges, so the whole trust cluster steps
                        in as one block alongside the Trustpilot badge below,
                        which has always had the same offset. */}
                    <div className="mt-hero-gap border-t border-white/[0.11] pt-hero-gap ms-[var(--rail-keepout)] sm:overflow-hidden">
                        <dl className="flex flex-row items-start gap-2 max-sm:justify-center sm:-ms-[calc(var(--rail-pad)+1px)] sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-5">
                            {hero.trust.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex min-w-0 items-center gap-[var(--rail-gap)] max-sm:flex-1 max-sm:basis-0 max-sm:flex-col max-sm:gap-2 max-sm:text-center sm:border-s sm:border-white/[0.11] sm:pe-[var(--rail-pad)] sm:ps-[var(--rail-pad)]"
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.iconAlt}
                                        width={48}
                                        height={48}
                                        unoptimized
                                        className="size-[var(--rail-icon)] shrink-0 object-contain max-sm:size-9"
                                    />
                                    <div className="flex min-w-0 flex-col gap-0.5 max-sm:w-full">
                                        <dt className="sr-only">{item.label}</dt>
                                        <dd>
                                            <Counter
                                                value={item.value}
                                                suffix={item.suffix}
                                                className="gradient-text block font-display text-[length:clamp(1.5rem,1.1rem+1.6vw,var(--rail-num))] leading-none font-extrabold"
                                            />
                                            {/* Wrappable on purpose. `min-w-0`
                                                is inert against a nowrap label:
                                                the badge shrinks and the text
                                                walks out of it. Given the wrap
                                                above this is now a backstop, but
                                                it is the one that makes the rail
                                                safe at any label length. */}
                                            <span className="mt-1 block text-[length:var(--rail-label)] tracking-[0.1em] text-white/40 uppercase max-sm:text-[0.625rem] max-sm:tracking-[0.06em] lg:tracking-wider">
                                                {item.label}
                                            </span>
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </div>

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
