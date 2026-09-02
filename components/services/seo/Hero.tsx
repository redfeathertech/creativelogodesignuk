import Image from "next/image";

import { contact } from "@/content/site";
import { hero } from "@/content/landing/seo-services";
import { Eyebrow } from "@/components/ui/Section";
import { btn } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";
import { ScrollMouseIcon } from "@/components/home/heroIcons";
import {
    STAT_ICONS,
    StatIconDefs,
    CtaPhoneIcon,
    type StatIconName,
} from "./heroIcons";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Hero — the only H1 on the page.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The fold is now the client's approved composition: a full-bleed particle
 * backdrop on the `ink-950` canvas, copy on the left, the neon SEO artwork on
 * the right, a four-column stat rail under the copy and a scroll cue on the
 * floor. It sits in one screen — `--hero-h`, the same viewport token the
 * homepage hero uses, less `--offerbar-h` for the strip this page carries
 * between the header and the hero — and every measure inside it (`text-hero`,
 * `hero-block`, `hero-gap`) tracks viewport height as well as width, so a short
 * laptop screen compresses the hero rather than pushing the stats past the fold.
 *
 * **Layout only. No copy changed.** The heading, standfirst, both CTA labels,
 * the four stats and the search-result mockup are the strings this page has
 * always carried, and `scripts/verify-seo-services-parity.py` still gates them
 * in both directions. The mockup was the fold's right column before this
 * redesign; the artwork took that slot, so the mockup moved one panel down and
 * now sits beside the enquiry form. Nothing was dropped — a removal would fail
 * the reverse pass, which checks every live text run still appears in the
 * prerendered HTML.
 *
 * Two things are new and are declared as such: `hero.scrollCue`, the accessible
 * name for the cue anchor, and the alt text on the artwork.
 *
 * The stat rail is a `<dl>`: each figure is real content and stays in the
 * accessibility tree, with the icon above it `aria-hidden` because a rocket
 * says nothing "Avg. traffic increase" does not. The mockup stays `aria-hidden`
 * for the same reason it always was — "SPONSORED / https://yourbusiness.com /
 * #1 RANKING" read aloud communicates nothing without the visual framing.
 *
 * The enquiry form keeps the full-width glass panel below the fold: it is the
 * live page's third hero column, and a full-width panel is what stops a
 * six-field form being squeezed into a third of the container.
 */
export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 text-white">
            {/* ---------------------------------------------- the fold shell --
                One background container for the WHOLE fold — the copy, the stat
                rail and the artwork all sit inside it, so there is no point at
                which one backdrop ends and another begins. It is `relative`, so
                everything absolute below is measured against the fold rather
                than the section (which also carries the panel underneath), and
                `overflow-hidden` so the artwork's glow and any oversized
                backdrop crop are clipped to it instead of widening the page. */}
            <div className="relative overflow-hidden">
                {/* The backdrop, bled to both viewport edges. Sized rather than
                `fill`ed — `fill` emits no width/height, and every image in this
                build carries both — and `preload` because it is the LCP paint.

                Its height is the FOLD, not the section. `object-cover` on a
                3840x1770 wave stretched over a section that also carries the
                form panel scales it ~2.5x and crops the whole composition off
                screen: the fold reads as flat black and the wave only surfaces
                behind the form. Pinned to the fold's own height it lands where
                the design puts it, and the section's `bg-ink-950` carries the
                panel below. */}
                <Image
                    src={hero.background.src}
                    alt=""
                    aria-hidden="true"
                    width={hero.background.width}
                    height={hero.background.height}
                    preload
                    sizes="100vw"
                    quality={90}
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-[calc(var(--hero-h)-var(--offerbar-h))] w-full object-cover object-center min-[1025px]:block"
                />
                {/* The tablet/phone backdrop, ≤1024px. Two things differ from the
                desktop wave and both are the seam fix.

                It is `inset-0`, not pinned to `--hero-h`: below `lg` the grid
                stacks, so the fold is the copy PLUS the stat rail PLUS the
                artwork and is routinely taller than one screen. A fixed height
                stops partway down and draws exactly the horizontal line this
                fixes; `inset-0` on the shell covers whatever the stacked fold
                ends up being, in one continuous paint behind all three.

                And it is the square crop, not the 3840x1770 panorama, which
                `object-cover` on a portrait box would blow up ~4x to a
                featureless sliver. */}
                <Image
                    src={hero.backgroundTablet.src}
                    alt=""
                    aria-hidden="true"
                    width={hero.backgroundTablet.width}
                    height={hero.backgroundTablet.height}
                    sizes="100vw"
                    quality={90}
                    className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center min-[1025px]:hidden"
                />
                {/* Holds the copy legible where the wave brightens, and keeps the
                canvas from reading as flat black where it does not. Same two
                geometries as the backdrop it tints, for the same reason. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(115%_95%_at_50%_38%,rgb(7_2_15/0.72)_0%,rgb(7_2_15/0.3)_58%,transparent_100%)] min-[1025px]:inset-x-0 min-[1025px]:top-0 min-[1025px]:bottom-auto min-[1025px]:h-[calc(var(--hero-h)-var(--offerbar-h))] lg:bg-[radial-gradient(115%_95%_at_12%_38%,rgb(7_2_15/0.72)_0%,rgb(7_2_15/0.3)_58%,transparent_100%)]"
                />
                {/* The blend into the section below. The tablet crop has hard
                edges of its own; fading its last few hundred pixels to the page
                canvas means the fold ends on a gradient rather than on the edge
                of an image. Desktop already ends on `bg-ink-950` under the
                pinned backdrop, so this is 1024 and below only. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-linear-to-b from-transparent to-[#0a0518] min-[1025px]:hidden"
                />

                <div className="relative container-site">
                    {/* ------------------------------------------------- the fold -- */}
                    {/* One screen exactly: the viewport less the header AND less the
                    offer strip between them, which `--hero-h` alone does not
                    know about — without the subtraction the fold runs
                    `--offerbar-h` past the bottom of the screen and takes the
                    scroll cue with it.

                    The floor padding is the WhatsApp FAB's corner. The FAB is
                    fixed bottom-left and owns the first 76px of it on every
                    page, and the stat rail is the lowest thing on the left of a
                    fold that is always exactly one screen tall — so unlike the
                    homepage, where the same rail sits mid-column, these two meet
                    at essentially every desktop size. Reserving the corner in
                    the fold's own padding keeps the rail flush with the heading;
                    the alternative, shifting the rail inline-start the way
                    `TrustpilotBadge` does, would step it 32px right of the H1 at
                    1440. Moving the FAB to bottom-right would retire this. */}
                    <div className="relative flex min-h-[calc(var(--hero-h)-var(--offerbar-h))] flex-col justify-center pt-hero-block pb-[calc(var(--spacing-hero-block)+4.75rem)]">
                        <div className="grid items-center gap-[clamp(1rem,1rem+2vw,1rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] [&>*]:min-w-0">
                            {/* ------------------------------------------- copy -- */}
                            {/* Centred until the columns split, like the homepage:
                            below `lg` the copy is the whole fold, so every
                            mobile rule here is a `max-lg:` override rather than
                            a default the desktop layout has to undo. The
                            eyebrow's leading hairline is a left-aligned mark and
                            reads as a stray dash once centred, so it is hidden
                            there — it is the only `<span>` child, the label
                            itself being a text node. */}
                            <div className="reveal max-lg:text-center">
                                <Eyebrow className="max-lg:justify-center max-lg:[&>span]:hidden">
                                    {hero.titleAccent}
                                </Eyebrow>

                                <h1 className="text-hero text-white">
                                    {hero.titleLead}{" "}
                                    <span className="bg-[linear-gradient(90deg,#7225AD_0%,#CC067F_100%)] bg-clip-text pb-[0.08em] text-transparent">
                                        {hero.titleAccent}
                                    </span>
                                </h1>

                                {/* Tighter than the 1.65 body leading: at display
                                size this reads as a standfirst. */}
                                <p className="mt-hero-gap max-w-[70ch] text-lead leading-[1.55] text-white/65 max-lg:mx-auto">
                                    {hero.description}
                                </p>

                                {/* Full-width and stacked until both pills fit side
                                by side. At their intrinsic widths they overhang
                                a 320px column, and the section's `overflow-hidden`
                                would slice the end off the primary CTA rather
                                than scroll it into view. */}
                                <div className="mt-hero-gap flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                                    {/* The site-wide "Ready to grow revenue?"
                                    slide-over, not this page's own quote
                                    dialog — the hero's primary CTA opens the
                                    same panel every other page's hero does. */}
                                    <LeadButton
                                        variant="primary"
                                        size="lg"
                                        className="w-full sm:w-auto"
                                    >
                                        {hero.ctaPrimary}
                                        <ArrowIcon />
                                    </LeadButton>
                                    <a
                                        href={`tel:${contact.phoneE164}`}
                                        className={btn(
                                            "ghost",
                                            "lg",
                                            "w-full sm:w-auto",
                                        )}
                                    >
                                        <CtaPhoneIcon className="size-[1.15em]" />
                                        {hero.ctaPhone}
                                    </a>
                                </div>

                                {/* The stat rail. Two-up on phones, four-up from
                                `sm`, hairline-divided by a leading border on
                                each item — which on a wrapped row would strand a
                                rule at the start of row two with nothing before
                                it, so the wrapper clips it: the rail is pulled
                                one padding step plus one border into the
                                `overflow`, and the first item of every row loses
                                its rule. Every rule that survives has a stat on
                                both sides of it. */}
                                <div className="mt-[clamp(1.75rem,1rem+2.5vh,3rem)] border-t border-white/[0.11] pt-[clamp(1.25rem,0.75rem+2vh,2.25rem)] overflow-hidden">
                                    {/* The gradient every stat mark strokes with.
                                    Declared once, referenced by id — see
                                    heroIcons.tsx. */}
                                    <StatIconDefs />
                                    <dl className="-ms-[calc(clamp(0.75rem,0.5rem+0.7vw,1.25rem)+1px)] grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                                        {hero.stats.map((stat) => {
                                            const Icon =
                                                STAT_ICONS[
                                                    stat.icon as StatIconName
                                                ];

                                            return (
                                                <div
                                                    key={stat.label}
                                                    className="min-w-0 border-s border-white/[0.11] px-[clamp(0.75rem,0.5rem+0.7vw,1.25rem)] max-lg:text-start"
                                                >
                                                    <Icon className="mb-3 size-[clamp(1.375rem,1.05rem+0.7vw,1.75rem)]" />
                                                    <dt className="sr-only">
                                                        {stat.label}
                                                    </dt>
                                                    <dd>
                                                        {/* Wrappable on purpose:
                                                        `min-w-0` is inert
                                                        against a nowrap label,
                                                        the item just shrinks and
                                                        the text walks out of
                                                        it. */}
                                                        <p className="gradient-text m-0 font-display text-[length:clamp(1.5rem,1.1rem+1.5vw,2.375rem)] leading-none font-extrabold break-words">
                                                            {stat.value}
                                                        </p>
                                                        <p className="m-0 mt-2 text-ui-10 tracking-[0.08em] text-white uppercase sm:text-ui-11">
                                                            {stat.label}
                                                        </p>
                                                    </dd>
                                                </div>
                                            );
                                        })}
                                    </dl>
                                </div>
                            </div>

                            {/* -------------------------------------- artwork -- */}
                            {/* Not `preload`ed: the H1 is the LCP element and the
                            backdrop behind it already claims the one preload
                            this fold should spend. Capped in viewport-height
                            units as well as width so it shrinks with the copy on
                            a short screen instead of pushing the stat rail down.
                            Ordered after the copy in the DOM at every width — on
                            mobile the approved design stacks it below. */}
                            <div className="reveal flex justify-center lg:justify-end">
                                <Image
                                    src={hero.illustration.src}
                                    alt={hero.illustrationAlt}
                                    width={hero.illustration.width}
                                    height={hero.illustration.height}
                                    sizes="(max-width: 63.99rem) 78vw, 40vw"
                                    quality={90}
                                    className="h-auto w-full max-w-[min(34rem,78vw,52svh)] object-contain drop-shadow-[0_28px_70px_rgb(204_6_127/0.35)] lg:max-w-[min(38rem,62svh)]"
                                />
                            </div>
                        </div>

                        {/* Decorative, and the first thing to go: below 800px of
                        viewport the space it occupies is worth more to the copy.
                        An anchor rather than a bare mark — it points at the
                        trust strip, so clicking it scrolls there. `scroll-behavior`
                        and the `scroll-padding-top` that clears the sticky nav
                        are both already set globally on `html`. */}
                        <a
                            href="#seo-trust"
                            aria-label={hero.scrollCue}
                            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-ui-11 tracking-[0.06em] text-white/45 transition-colors hover:text-white/80 focus-visible:text-white/80 [@media(min-height:800px)]:inline-flex"
                        >
                            <ScrollMouseIcon
                                className="h-9 w-auto text-white/75"
                                aria-hidden="true"
                            />
                            <span aria-hidden="true">{hero.scrollCue}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
