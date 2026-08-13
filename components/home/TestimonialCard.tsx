"use client";

import { useEffect, useRef, useState } from "react";
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

/** First two letters of the display name, e.g. "Conor" -> "CO". */
function initialsFor(name: string) {
    return [...name.trim()].slice(0, 2).join("").toUpperCase();
}

function RatingBar({ stars }: { stars: number }) {
    return (
        <div
            className="flex gap-[3px]"
            role="img"
            aria-label={`Rated ${stars} out of 5`}
        >
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    aria-hidden="true"
                    className={cn(
                        "grid size-[22px] place-items-center",
                        i < stars ? "bg-rating" : "bg-rating-muted",
                    )}
                >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="#fff">
                        <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5Z" />
                    </svg>
                </span>
            ))}
        </div>
    );
}

export default function TestimonialCard({
    name,
    date,
    dateISO,
    stars,
    body,
}: {
    name: string;
    date: string;
    dateISO: string;
    stars: number;
    body: string;
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
           does. */
        <figure className="relative flex w-[min(100%,19.5rem)] flex-col rounded-lg border border-ink-900/[0.12] bg-white p-6 text-onlight">
            <figcaption className="flex items-center gap-3">
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

            <div className="mt-4">
                <RatingBar stars={stars} />
            </div>

            <blockquote className="mt-4">
                <p
                    ref={bodyRef}
                    className={cn(
                        "text-[0.9375rem] leading-[1.55] whitespace-pre-line",
                        !expanded && "line-clamp-5",
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
