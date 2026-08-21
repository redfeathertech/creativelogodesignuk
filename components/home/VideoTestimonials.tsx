"use client";

import { useState } from "react";
import Image from "next/image";

import { videoTestimonials } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { PlayIcon, StarIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import VideoLightbox from "./VideoLightbox";

/**
 * Video testimonials — a featured player beside a column of three compact cards,
 * every one of which opens components/home/VideoLightbox.tsx.
 *
 * Net-new; the live homepage has no equivalent. See the note on
 * `videoTestimonials` in content/home.ts for the two places this departs from
 * the mock and why.
 *
 * **Nothing is hosted here and nothing is embedded until a click.** The stills
 * are ordinary `next/image` assets and the Vimeo iframe is mounted by the
 * lightbox only while it is open, so the section's cost on first load is the
 * four thumbnails and no third-party bytes at all.
 *
 * A client component for the same reason as components/home/Portfolio.tsx — it
 * holds state (which card is playing). Every word of copy is still in the
 * prerendered HTML: the lightbox is the only thing gated behind hydration, and
 * it contains no text a crawler needs.
 *
 * No `VideoObject` structured data yet, deliberately. The ids are now the
 * clients' real uploads, so the blocker is no longer false data — it is that
 * the schema also wants an `uploadDate` and a `description` per video, and
 * those have to come from the client rather than be guessed. Next job on this
 * section; see docs/SEO-PLAYBOOK.md.
 */

const {
    eyebrow,
    titleLead,
    titleAccent,
    lead,
    playPrefix,
    close,
    items,
    bg,
    bgAlt,
} = videoTestimonials;

/* items[0] is the featured panel, the rest are the compact column. Destructured
   at module scope because the tuple is `as const` — this is what gives
   `featured` its own type, with the `result*` fields the other three do not
   carry. */
const [featured, ...compact] = items;

const HEADING_ID = "video-testimonials-heading";

/* ------------------------------------------------------------ quote mark -- */
/* Kept here rather than components/ui/icons.tsx for the same reason as the
   Portfolio filter marks: nothing else on the site draws it. Rotated a half turn
   so it reads as a closing quote, matching the design. */
function QuoteGlyph({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 23 18"
            fill="currentColor"
            aria-hidden="true"
            className={cn("rotate-180", className)}
        >
            <path d="M0 18V9.6C0 4.3 3.1.6 8.2 0l.9 2.9C6.4 3.9 4.8 5.7 4.6 8h3.6v10H0Z" />
            <path d="M13.8 18V9.6C13.8 4.3 16.9.6 22 0l.9 2.9c-2.7 1-4.3 2.8-4.5 5.1h3.6v10h-8.2Z" />
        </svg>
    );
}

/* ---------------------------------------------------------------- stars -- */
function Stars({ count, className }: { count: number; className?: string }) {
    return (
        <div
            role="img"
            aria-label={`Rated ${count} out of 5`}
            className={cn("flex gap-0.5 text-star", className)}
        >
            {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < count} />
            ))}
        </div>
    );
}

/* --------------------------------------------------------- result arrow -- */
function TrendIcon() {
    return (
        <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M2 11.5 6.2 6.8l2.9 2.6L14 3.6" />
            <path d="M10.2 3.6H14v3.8" />
        </svg>
    );
}

export default function VideoTestimonials() {
    /* Index into `items`, or null when nothing is playing. */
    const [active, setActive] = useState<number | null>(null);
    const playing = active === null ? null : items[active];

    const labelFor = (item: (typeof items)[number]) =>
        `${playPrefix} ${item.client} — ${item.project}, ${item.durationSpoken}`;

    return (
        <section
            id="video-testimonials"
            aria-labelledby={HEADING_ID}
            className="relative isolate overflow-hidden bg-ink-950 py-section text-white"
        >
            {/* The artwork is a 1.68:1 field of glow and dot grid with no subject
                in it, so `object-cover` can crop it at any width without losing
                anything — unlike the Results backdrop, which has a chart that has
                to stay in its column. */}
            <Image
                src={bg}
                alt={bgAlt}
                aria-hidden="true"
                width={1920}
                height={1146}
                sizes="100vw"
                quality={85}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
            />

            <div className="container-site">
                {/* The heading block spans the full width rather than sitting in
                    the left column. Its own `max-w` caps still hold, so it draws
                    identically — but it no longer adds ~330px to the left
                    column's height, which is what the right-hand column is
                    stretched against. With three compact cards instead of four
                    that difference is the whole ball game: measured against the
                    still alone the cards land at their natural size, measured
                    against heading + still they stretch to ~280px each and open
                    ~85px of dead space above and below their content. */}
                <div className="reveal">
                    <Eyebrow>{eyebrow}</Eyebrow>

                    {/* The accent is `block` so it takes a line of its own,
                        which is how the approved design sets this heading — the
                        same call as `methodology`. It changes where the line
                        breaks fall and nothing else: the two fields still
                        concatenate to the one heading string in the DOM. */}
                    <h2 id={HEADING_ID} className="text-h2 max-w-[22ch]">
                        {titleLead}{" "}
                        <span className="gradient-text-brand block">
                            {titleAccent}
                        </span>
                    </h2>

                    <p className="mt-6 max-w-[52ch] text-lead text-white/65">
                        {lead}
                    </p>
                </div>

                {/* `minmax(0,…)` on both tracks, never `1fr`: a grid item defaults
                    to `min-width: auto`, and a compact card's longest word plus its
                    still is wider than a 320px phone. */}
                <div className="mt-10 grid items-start gap-[clamp(2.5rem,1.5rem+3vw,3.5rem)] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    {/* ------------------------------------------ left column -- */}
                    <div>
                        {/* `relative` is the containing block the pull-quote goes
                            absolute against from `xl:` up. Below that it is an
                            ordinary block and the quote sits under the still
                            rather than covering two thirds of it — at `lg` the
                            still is only ~330px tall and the quote card does not
                            fit inside it without clipping its own text. */}
                        <div className="reveal relative">
                            <div className="group relative aspect-[845/540] overflow-hidden rounded-lg border border-white/10">
                                <Image
                                    src={featured.thumb}
                                    alt={`Video testimonial from ${featured.client} about their ${featured.project}`}
                                    width={1690}
                                    height={1080}
                                    sizes="(max-width: 1024px) 92vw, 56vw"
                                    className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                                />

                                {/* `aria-hidden` because the spoken form is already
                                    folded into the play button's accessible name —
                                    without it the length is announced twice, once
                                    read out digit by digit. */}
                                <span
                                    aria-hidden="true"
                                    className="absolute top-3 left-3 rounded-md bg-ink-950/65 px-2 py-0.5 font-display text-xs font-bold text-white/90 backdrop-blur-[2px]"
                                >
                                    {featured.duration}
                                </span>

                                {/* An empty button carrying the whole tile. A
                                    <button> takes phrasing content only, so the
                                    blockquote below could not live inside one —
                                    stretching an aria-labelled control over the
                                    card is what gives the entire still a hit area
                                    without nesting a quote inside a control. */}
                                <button
                                    type="button"
                                    onClick={() => setActive(0)}
                                    aria-label={labelFor(featured)}
                                    className="absolute inset-0 z-20 cursor-pointer"
                                />

                                {/* Centred on the still, and from `xl:` up nudged
                                    left into the part of it the pull-quote does
                                    not cover. Below `xl` it lifts instead: the
                                    quote card has dropped out of the tile by
                                    then, so the only thing left to dodge is the
                                    caption along the foot, which on a phone is
                                    two lines of client-and-project plus the
                                    strapline and reaches the middle of the
                                    still. */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
                                >
                                    <span className="grid size-[clamp(3rem,10vw,4.5rem)] place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] text-white shadow-glow ring-4 ring-white/25 transition-transform duration-300 ease-out group-hover:scale-110 max-xl:-translate-y-[14%] xl:-translate-x-[36%] [&>svg]:size-[clamp(1rem,3vw,1.375rem)] [&>svg]:translate-x-px">
                                        <PlayIcon />
                                    </span>
                                </span>

                                {/* Scrim, so the strapline stays legible whatever
                                    the still underneath it turns out to be. */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-linear-to-t from-ink-950/92 to-transparent"
                                />

                                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-[clamp(1rem,3vw,1.5rem)] xl:max-w-[62%]">
                                    <p className="font-display text-[clamp(0.9375rem,2.4vw,1.125rem)] font-extrabold text-white">
                                        {featured.client} — {featured.project}
                                    </p>

                                    {/* Flows as ONE paragraph, not a flex row.
                                        As a flex row each span is its own item,
                                        so a strapline that names services rather
                                        than a single "156%" wraps into two
                                        stacked blocks and the arrow ends up
                                        orphaned beside them. Inline, the whole
                                        line wraps the way a sentence does. */}
                                    <p className="mt-1 text-[clamp(0.75rem,2vw,0.875rem)] text-white/75">
                                        <span className="mr-1.5 inline-block translate-y-px text-magenta-300">
                                            <TrendIcon />
                                        </span>
                                        <span className="font-display font-bold text-magenta-300">
                                            {featured.resultValue}
                                        </span>{" "}
                                        {featured.resultText}
                                    </p>
                                </div>
                            </div>

                            {/* `pointer-events-none` from `lg:` up, where this
                                overlaps the tile: without it the part of the still
                                it covers would be dead to a click, which is not how
                                a single tile should behave. It carries no controls,
                                so nothing is made unreachable. */}
                            <figure className="mt-4 rounded-lg border border-violet-400/30 bg-violet-900/55 p-5 backdrop-blur-md xl:pointer-events-none xl:absolute xl:top-[14%] xl:right-[3.5%] xl:bottom-[8%] xl:mt-0 xl:flex xl:w-[36%] xl:flex-col xl:justify-center">
                                <QuoteGlyph className="w-[clamp(1.25rem,3vw,1.5rem)] text-violet-300" />

                                <Stars count={featured.stars} className="mt-3" />

                                <blockquote className="mt-3">
                                    <p className="text-[clamp(0.8125rem,1.6vw,0.9375rem)] leading-[1.55] text-white/85">
                                        {featured.quote}
                                    </p>
                                </blockquote>

                                <figcaption className="mt-5 flex items-center gap-3">
                                    {/* `w-auto` beside a fixed height is what lets
                                        one box hold marks of any proportion — the
                                        three we have run from 1:1 to 3:1. Without
                                        it Tailwind's `h-9` fights `next/image`'s
                                        intrinsic width attribute and the wide ones
                                        squash. */}
                                    {featured.logo && (
                                        <Image
                                            src={featured.logo.src}
                                            alt={featured.logo.alt}
                                            width={featured.logo.width}
                                            height={featured.logo.height}
                                            className="h-9 w-auto max-w-24 shrink-0 object-contain object-left"
                                        />
                                    )}

                                    <span className="flex min-w-0 flex-col">
                                        <cite className="truncate font-display text-[0.9375rem] font-bold text-white not-italic">
                                            {featured.client}
                                        </cite>
                                        <span className="truncate text-xs text-white/60">
                                            {featured.project}
                                        </span>
                                    </span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                    {/* ----------------------------------------- right column -- */}
                    {/* `self-stretch` overrides the row's `items-start` for this
                        one item, and `auto-rows-fr` then divides the still's
                        height into three equal rows.

                        The alternative, `content-between`, keeps each card at
                        its natural height and pushes the slack into the gaps —
                        which at this container width (1344px, against the
                        mock's 1074) opens ~90px voids between cards. Growing the
                        cards keeps the rhythm the design has; growing the gaps
                        does not. Three rows against the still alone come out at
                        ~150px each, which is close enough to a card's natural
                        height that the stretch reads as padding. */}
                    <ul className="reveal grid gap-[clamp(0.75rem,2vw,1.125rem)] lg:auto-rows-fr lg:self-stretch">
                        {compact.map((item, i) => (
                            <li key={i} className="lg:h-full">
                                {/* `relative` is load-bearing twice over: it is the
                                    containing block for the stretched button, and it
                                    keeps that absolute box from resolving against
                                    the initial containing block instead. */}
                                <figure className="group relative grid h-full grid-cols-[auto_minmax(0,1fr)] items-center gap-[clamp(0.75rem,2.5vw,1rem)] rounded-lg border border-violet-400/25 bg-violet-950/45 p-3 transition-colors duration-300 ease-out hover:border-magenta-500/45 hover:bg-violet-900/55">
                                    {/* The stills are title cards with the client's
                                        name burnt into them, so they have to stay
                                        big enough to read. `24vw` holds the ratio
                                        against the card on phones; from `lg:` up
                                        the card is a fixed fraction of the grid,
                                        so the width is pinned per breakpoint
                                        instead. */}
                                    <div className="relative w-[clamp(6.5rem,24vw,11rem)] shrink-0 overflow-hidden rounded-md lg:w-44 xl:w-50">
                                        <Image
                                            src={item.thumb}
                                            alt={`Video testimonial from ${item.client} about their ${item.project}`}
                                            width={768}
                                            height={480}
                                            sizes="(max-width: 640px) 24vw, 200px"
                                            className="block aspect-[16/10] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                                        />

                                        <span
                                            aria-hidden="true"
                                            className="absolute top-1.5 left-1.5 rounded bg-ink-950/65 px-1.5 py-px font-display text-[0.625rem] font-bold text-white/90"
                                        >
                                            {item.duration}
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 grid place-items-center"
                                        >
                                            <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] text-white ring-2 ring-white/30 transition-transform duration-300 ease-out group-hover:scale-110 [&>svg]:size-3 [&>svg]:translate-x-px">
                                                <PlayIcon />
                                            </span>
                                        </span>
                                    </div>

                                    <div className="min-w-0">
                                        <figcaption className="flex items-start justify-between gap-2">
                                            {/* Wraps rather than truncates. At
                                                `lg` the text column is only what
                                                is left of a 2fr track after a
                                                176px still — about 180px — and
                                                "Plum Creek Lawn Care" clipped to
                                                "Plum Creek Law…" there and on a
                                                phone. A second line costs the
                                                card nothing: the grid row grows.
                                                Nothing shares this line, which is
                                                the point — put a 3:1 wordmark
                                                beside the name at that width and
                                                the name collapses to one word per
                                                line. */}
                                            <span className="flex min-w-0 flex-col">
                                                <cite className="font-display text-[0.9375rem] leading-tight font-bold text-white not-italic">
                                                    {item.client}
                                                </cite>
                                                <span className="mt-0.5 text-xs text-magenta-300">
                                                    {item.project}
                                                </span>
                                            </span>

                                            <QuoteGlyph className="mt-0.5 w-4 shrink-0 text-violet-300/70" />
                                        </figcaption>

                                        <blockquote className="mt-2">
                                            <p className="line-clamp-2 text-[0.8125rem] leading-[1.5] text-white/70">
                                                {item.quote}
                                            </p>
                                        </blockquote>

                                        {/* The client's own mark rides the star
                                            row, not the name row. This is the one
                                            line in the card with spare width —
                                            five 13px stars are ~80px — so a
                                            wordmark can sit opposite them at any
                                            breakpoint without pushing anything
                                            around. `h-6 w-auto` lets one box hold
                                            marks from 1:1 to 3:1; clients who
                                            have not sent one just leave the right
                                            side empty. */}
                                        <div className="mt-2 flex items-center justify-between gap-2">
                                            <Stars
                                                count={item.stars}
                                                className="[&>svg]:size-[13px]"
                                            />

                                            {item.logo && (
                                                <Image
                                                    src={item.logo.src}
                                                    alt={item.logo.alt}
                                                    width={item.logo.width}
                                                    height={item.logo.height}
                                                    className="h-6 w-auto max-w-18 shrink-0 object-contain object-right"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Last in the DOM so it stacks over the card
                                        without needing a z-index — see the featured
                                        tile for why the control wraps nothing. */}
                                    <button
                                        type="button"
                                        onClick={() => setActive(i + 1)}
                                        aria-label={labelFor(item)}
                                        className="absolute inset-0 cursor-pointer"
                                    />
                                </figure>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {playing && (
                <VideoLightbox
                    vimeoId={playing.vimeoId}
                    portrait={playing.portrait}
                    title={`${playing.client} — ${playing.project}`}
                    closeLabel={close}
                    onClose={() => setActive(null)}
                />
            )}
        </section>
    );
}
