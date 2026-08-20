"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A single review card on the homepage testimonials rail.
 *
 * Deliberately NOT marked up as Review/AggregateRating — see
 * docs/SEO-PLAYBOOK.md. Self-serving review markup on your own
 * Organization is the fastest route to a manual action.
 *
 * The full review text is always in the server-rendered HTML; "See more"
 * only lifts a CSS line clamp, so a crawler reads every word whether or not
 * JS ran. The button itself is hydration-only, because whether the text
 * overflows five lines depends on the rendered box, not the character count —
 * the same review clips at 320px and doesn't at 1440px.
 *
 * The design gives every card a bold headline above the review. These are real
 * Trustpilot reviews and none of them came with one, so rather than invent
 * copy the headline is **derived** from the review itself — the opening 45
 * characters, ellipsed. Nothing is added to the page that the reviewer did not
 * write, and `content/home.ts` keeps one field per review rather than two.
 */

/* Earthy tints in the spirit of the platform's generated avatars. Picked by a
   sum-of-code-points hash so a given reviewer keeps the same colour between
   renders — a random pick would differ server vs client and hydration would
   scream about it. */
const AVATAR_TINTS = [
    "bg-[#f2e7c9] text-[#4a3c12]",
    "bg-[#4b3a2a] text-[#f6efe4]",
    "bg-[#dfe7e2] text-[#2c3a33]",
    "bg-[#efdcd7] text-[#4a2f28]",
    "bg-[#dcdfea] text-[#2b3244]",
    "bg-[#3f4a44] text-[#e6efe9]",
];

function tintFor(name: string) {
    let sum = 0;
    for (const ch of name) sum += ch.codePointAt(0) ?? 0;
    return AVATAR_TINTS[sum % AVATAR_TINTS.length];
}

/**
 * First letter of the first name plus first letter of the last — "Tafadzwa
 * Zulu" -> "TZ". A reviewer who left only one name has no last initial to
 * take, so that case falls back to the first two letters of the one name:
 * "Conor" -> "CO".
 *
 * Spread rather than `charAt`, so a name that opens with an astral character
 * (an emoji, most CJK extension blocks) yields the whole code point instead of
 * half a surrogate pair.
 */
function initialsFor(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";

    if (parts.length === 1) {
        return [...parts[0]].slice(0, 2).join("").toUpperCase();
    }

    const first = [...parts[0]][0] ?? "";
    const last = [...parts[parts.length - 1]][0] ?? "";
    return (first + last).toUpperCase();
}

/** Headline for a review: its opening 45 characters, ellipsed. Newlines are
    collapsed first — a review that breaks its line inside the first 45
    characters would otherwise put the headline on two lines. */
const HEADLINE_CHARS = 28;

function headlineFor(body: string) {
    const flat = body.replace(/\s+/g, " ").trim();
    const chars = [...flat];
    if (chars.length <= HEADLINE_CHARS) return flat;
    return chars.slice(0, HEADLINE_CHARS).join("").trimEnd() + "...";
}

/* ------------------------------------------------------------- rating -- */
/* The rating bar, drawn from the platform's own 5-star asset rather than a
   generic star: five green tiles, each carrying the notched star the asset
   uses, on the same 96px pitch with an 8px gutter. One <svg> instead of five,
   because the asset is one strip and the tiles never wrap. `--color-rating` is
   the asset's #00b67a to the digit; the muted token is its pale unfilled tile,
   which is why a 4/5 could never read as a 4-star product rating. */
const STAR_PATH =
    "M48,64.7 L62.6,61 L68.7,79.8 L48,64.7 Z M81.6,40.4 L55.9,40.4 L48,16.2 L40.1,40.4 L14.4,40.4 L35.2,55.4 L27.3,79.6 L48.1,64.6 L60.9,55.4 L81.6,40.4 Z";

function RatingBar({
    stars,
    className,
}: {
    stars: number;
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 512 96"
            role="img"
            aria-label={`Rated ${stars} out of 5`}
            /* `self-start` is what keeps the bar its own width. The card is a
               flex column, so the default `align-items: stretch` blows the
               <svg> out to the full card width, and `preserveAspectRatio` then
               centres 117px of stars inside a 294px box — the bar reads as
               centred while every other row is flush left. */
            className={cn("h-5.5 w-auto self-start", className)}
        >
            {Array.from({ length: 5 }, (_, i) => (
                <g key={i} transform={`translate(${i * 104} 0)`}>
                    <rect
                        width="96"
                        height="96"
                        fill={
                            i < stars
                                ? "var(--color-rating)"
                                : "var(--color-rating-muted)"
                        }
                    />
                    <path d={STAR_PATH} fill="#fff" fillRule="nonzero" />
                </g>
            ))}
        </svg>
    );
}

export default function TestimonialCard({
    name,
    date,
    dateISO,
    stars,
    body,
    mark,
    markAlt,
}: {
    name: string;
    date: string;
    dateISO: string;
    stars: number;
    body: string;
    /** The decorative quote glyph in the top-right corner. */
    mark: string;
    markAlt: string;
}) {
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [clipped, setClipped] = useState(false);

    useEffect(() => {
        const el = bodyRef.current;
        /* Bail while expanded: the clamp is off, so scrollHeight === clientHeight
           and re-measuring would decide the text fits and pull "See less" out
           from under the reader. `clipped` simply holds its last collapsed
           value until the card is collapsed again. */
        if (!el || expanded) return;

        const measure = () => setClipped(el.scrollHeight - el.clientHeight > 1);
        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [expanded]);

    return (
        /* `relative` is load-bearing. Anything `position: absolute` inside a
           rail slide — an `sr-only` label, a decorative ::before — resolves its
           containing block at the nearest positioned ancestor, and with none it
           lands on the *initial* containing block. A box whose containing block
           sits outside the scroller is NOT clipped by `overflow-x: auto`, so it
           reports its static position (card 10, ~3.3k px in) as real document
           width and the whole page grows a horizontal scrollbar. `overflow:
           hidden` on the rail does not help; only a containing block inside it
           does.

           The design highlights the card in the middle of its three. A rail
           scrolls, so "the middle one" is not a fixed card — the highlight is
           therefore an interaction state: the magenta border and lift land on
           whichever card the pointer or keyboard is on. `focus-within` is what
           carries it for a keyboard, since the only focusable thing inside is
           the "See more" button. */
        <figure className="group relative flex w-[min(100%,21.5rem)] flex-col rounded-2xl border border-ink-900/10 bg-white p-6 text-onlight transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-magenta-500  focus-within:-translate-y-1 focus-within:border-magenta-500">
            <div className="flex items-start justify-between gap-3">
                <figcaption className="flex min-w-0 items-center gap-3">
                    <span
                        aria-hidden="true"
                        className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold",
                            tintFor(name),
                        )}
                    >
                        {initialsFor(name)} 
                    </span>

                    <span className="flex min-w-0 flex-col">
                        <cite className="truncate font-display text-[0.9375rem] font-bold not-italic">
                            {name}
                        </cite>
                        <time
                            dateTime={dateISO}
                            className="text-sm text-onlight-muted"
                        >
                            {date}
                        </time>
                    </span>
                </figcaption>

                {/* 48x36 native, drawn at 44x33 — a 1.1x source, so it stays
                    crisp on a 1x screen and never upscales past its own
                    pixels. Decorative: the review is the content. */}
                <Image
                    src={mark}
                    alt={markAlt}
                    aria-hidden="true"
                    width={48}
                    height={36}
                    className="mt-1 h-auto w-11 shrink-0 select-none"
                />
            </div>

            <RatingBar stars={stars} className="mt-4" />

            <blockquote className="mt-4">
                {/* Derived from the body below it, not a second field — see the
                    note at the top. `aria-hidden` because it is a truncated
                    repeat of the paragraph that follows: sighted readers get a
                    headline, a screen reader would get the opening sentence
                    twice. */}
                <p
                    aria-hidden="true"
                    className="font-display text-[0.9375rem] leading-[1.4] font-bold"
                >
                    “{headlineFor(body)}”
                </p>

                <p
                    ref={bodyRef}
                    className={cn(
                        "mt-2 text-[0.9375rem] leading-[1.55] whitespace-pre-line text-onlight-muted",
                        !expanded && "line-clamp-4",
                    )}
                >
                    {body}
                </p>
            </blockquote>

            {clipped && (
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    /* An `aria-label` rather than an `sr-only` span: ten cards
                       means ten more absolutely positioned boxes, and the label
                       reads the same either way. */
                    aria-label={`${expanded ? "See less" : "See more"} of ${name}'s review`}
                    className="mt-2 cursor-pointer self-start text-[0.9375rem] text-magenta-500 underline-offset-4 hover:underline"
                >
                    {expanded ? "See less" : "See more"}
                </button>
            )}
        </figure>
    );
}
