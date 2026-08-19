"use client";

import { useState } from "react";
import Image from "next/image";

import { videoTestimonials } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { PlayIcon, StarIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import VideoLightbox from "./VideoLightbox";

/**
 * Video testimonials — a featured player beside a column of four compact cards,
 * every one of which opens components/home/VideoLightbox.tsx.
 *
 * Net-new; the live homepage has no equivalent. See the note on
 * `videoTestimonials` in content/home.ts for the two places this departs from
 * the mock and why.
 *
 * **Nothing is hosted here and nothing is embedded until a click.** The stills
 * are ordinary `next/image` assets and the Vimeo iframe is mounted by the
 * lightbox only while it is open, so the section's cost on first load is the
 * five thumbnails and no third-party bytes at all.
 *
 * A client component for the same reason as components/home/Portfolio.tsx — it
 * holds state (which card is playing). Every word of copy is still in the
 * prerendered HTML: the lightbox is the only thing gated behind hydration, and
 * it contains no text a crawler needs.
 *
 * No `VideoObject` structured data yet, deliberately. The schema needs a real
 * `contentUrl`, `uploadDate` and `thumbnailUrl`, and emitting those against a
 * placeholder Vimeo id would publish false data. Add it the moment the client's
 * own videos replace `videoTestimonials.vimeoId` — see docs/SEO-PLAYBOOK.md.
 */

const {
    eyebrow,
    titleLead,
    titleAccent,
    lead,
    vimeoId,
    playPrefix,
    close,
    items,
    bg,
} = videoTestimonials;

/* items[0] is the featured panel, the rest are the compact column. Destructured
   at module scope because the tuple is `as const` — this is what gives
   `featured` its own type, with the `avatar` and `result*` fields the other four
   do not carry. */
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
                alt=""
                aria-hidden="true"
                width={1920}
                height={1146}
                sizes="100vw"
                quality={85}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
            />

            <div className="container-site">
                {/* `minmax(0,…)` on both tracks, never `1fr`: a grid item defaults
                    to `min-width: auto`, and a compact card's longest word plus its
                    still is wider than a 320px phone. */}
                <div className="grid items-start gap-[clamp(2.5rem,1.5rem+3vw,3.5rem)] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    {/* ------------------------------------------ left column -- */}
                    <div>
                        <div className="reveal">
                            <Eyebrow>{eyebrow}</Eyebrow>

                            {/* The accent is `block` so it takes a line of its
                                own, which is how the approved design sets this
                                heading — the same call as `methodology`. It
                                changes where the line breaks fall and nothing
                                else: the two fields still concatenate to the
                                one heading string in the DOM. */}
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

                        {/* `relative` is the containing block the pull-quote goes
                            absolute against from `lg:` up. Below that it is an
                            ordinary block and the quote sits under the still
                            rather than covering two thirds of it. */}
                        <div className="reveal relative mt-10">
                            <div className="group relative aspect-[845/540] overflow-hidden rounded-lg border border-white/10">
                                <Image
                                    src={featured.thumb}
                                    alt=""
                                    aria-hidden="true"
                                    width={845}
                                    height={540}
                                    sizes="(max-width: 1024px) 92vw, 46vw"
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

                                {/* Centred on the still, and from `lg:` up nudged
                                    into the part of it the pull-quote does not
                                    cover. */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
                                >
                                    <span className="grid size-[clamp(3rem,10vw,4.5rem)] place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] text-white shadow-glow ring-4 ring-white/25 transition-transform duration-300 ease-out group-hover:scale-110 lg:-translate-x-[36%] [&>svg]:size-[clamp(1rem,3vw,1.375rem)] [&>svg]:translate-x-px">
                                        <PlayIcon />
                                    </span>
                                </span>

                                {/* Scrim, so the strapline stays legible whatever
                                    the still underneath it turns out to be. */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-linear-to-t from-ink-950/92 to-transparent"
                                />

                                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-[clamp(1rem,3vw,1.5rem)] lg:max-w-[62%]">
                                    <p className="font-display text-[clamp(0.9375rem,2.4vw,1.125rem)] font-extrabold text-white">
                                        {featured.client} — {featured.project}
                                    </p>

                                    <p className="mt-1 flex items-baseline gap-1.5 text-[clamp(0.75rem,2vw,0.875rem)] text-white/75">
                                        <span className="self-center text-magenta-300">
                                            <TrendIcon />
                                        </span>
                                        <span className="font-display font-bold text-magenta-300">
                                            {featured.resultValue}
                                        </span>
                                        {featured.resultText}
                                    </p>
                                </div>
                            </div>

                            {/* `pointer-events-none` from `lg:` up, where this
                                overlaps the tile: without it the part of the still
                                it covers would be dead to a click, which is not how
                                a single tile should behave. It carries no controls,
                                so nothing is made unreachable. */}
                            <figure className="mt-4 rounded-lg border border-violet-400/30 bg-violet-900/55 p-5 backdrop-blur-md lg:pointer-events-none lg:absolute lg:top-[16%] lg:right-[3.5%] lg:bottom-[8%] lg:mt-0 lg:flex lg:w-[36%] lg:flex-col lg:justify-center">
                                <QuoteGlyph className="w-[clamp(1.25rem,3vw,1.5rem)] text-violet-300" />

                                <Stars count={featured.stars} className="mt-3" />

                                <blockquote className="mt-3">
                                    <p className="text-[clamp(0.8125rem,1.6vw,0.9375rem)] leading-[1.55] text-white/85">
                                        {featured.quote}
                                    </p>
                                </blockquote>

                                <figcaption className="mt-5 flex items-center gap-3">
                                    <Image
                                        src={featured.avatar}
                                        alt=""
                                        aria-hidden="true"
                                        width={53}
                                        height={53}
                                        className="size-9 shrink-0 rounded-full"
                                    />

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
                        one item, and `auto-rows-fr` then divides the left
                        column's height into four equal rows.

                        The alternative, `content-between`, keeps each card at
                        its natural height and pushes the slack into the gaps —
                        which at this container width (1344px, against the
                        mock's 1074) means the still is tall enough to open
                        ~120px voids between cards. Growing the cards keeps the
                        rhythm the design has; growing the gaps does not. */}
                    <ul className="reveal grid gap-[clamp(0.75rem,2vw,1.125rem)] lg:auto-rows-fr lg:self-stretch">
                        {compact.map((item, i) => (
                            <li key={i} className="lg:h-full">
                                {/* `relative` is load-bearing twice over: it is the
                                    containing block for the stretched button, and it
                                    keeps that absolute box from resolving against
                                    the initial containing block instead. */}
                                <figure className="group relative grid h-full grid-cols-[auto_minmax(0,1fr)] items-center gap-[clamp(0.75rem,2.5vw,1rem)] rounded-lg border border-violet-400/25 bg-violet-950/45 p-3 transition-colors duration-300 ease-out hover:border-magenta-500/45 hover:bg-violet-900/55">
                                    <div className="relative w-[clamp(5.5rem,24vw,11rem)] shrink-0 overflow-hidden rounded-md">
                                        <Image
                                            src={item.thumb}
                                            alt=""
                                            aria-hidden="true"
                                            width={845}
                                            height={540}
                                            sizes="(max-width: 1024px) 24vw, 176px"
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
                                            <span className="flex min-w-0 flex-col">
                                                <cite className="truncate font-display text-[0.9375rem] font-bold text-white not-italic">
                                                    {item.client}
                                                </cite>
                                                <span className="truncate text-xs text-magenta-300">
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

                                        <Stars
                                            count={item.stars}
                                            className="mt-2 [&>svg]:size-[13px]"
                                        />
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
                    vimeoId={vimeoId}
                    title={`${playing.client} — ${playing.project}`}
                    closeLabel={close}
                    onClose={() => setActive(null)}
                />
            )}
        </section>
    );
}
