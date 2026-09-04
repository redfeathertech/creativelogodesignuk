import Image from "next/image";

import type { ServiceAdvantages } from "@/content/services/types";
import { seoNumbers } from "@/content/seo-numbers";
import Counter from "@/components/ui/Counter";
import { cn } from "@/lib/cn";
import { SX_RAMP_DEEP, SxEyebrow, SxHeading, SxSection } from "./Shell";

/**
 * The band's artwork, as supplied — one flat image for all eleven pages.
 *
 * Same call as `Benefits`: the client's 2026-09 mock draws a single audit
 * illustration here, so `data.image` / `data.imageAlt` go unrendered. The
 * per-page artwork stays in `content/services/*` untouched — no copy moves
 * either way, and nothing in `scripts/verify-content-parity.py` covers it.
 */
const ART = "/assets/img/services/seo-inner/numbers-art.webp";

/**
 * The stat mark, also as supplied — one gradient glyph, repeated across the
 * four tiles exactly as the mock draws it.
 *
 * This replaces the four inline marks from `./icons`. They were positional
 * (`ServiceAdvantages` carries no icon field), so nothing was keyed to a
 * label and nothing is lost by collapsing them to one. `unoptimized` because
 * the file is an SVG — the optimiser would only re-encode it, and its
 * gradients are already the brand ramp.
 */
const STAT_ICON = "/assets/img/services/seo-inner/numbers-stat.svg";

/**
 * "By the numbers" — artwork left, pitch right, and the four counters lifted
 * out into a full-width tile row beneath the split, as the mock draws them.
 *
 * The tiles are the mock's white cards: a lilac plate holding the mark, the
 * figure inline beside it, the label underneath in small caps and a trend line
 * below that. The row label and the four trend lines are net-new chrome with
 * no live counterpart, so they come from `content/seo-numbers.ts` rather than
 * from the eleven checked service modules — read that file's header before
 * changing either.
 *
 * The figures render as `<p>`, not headings: a number titles nothing, and the
 * `<dl>` already pairs each one with its label.
 *
 * `break-words` on the figure is load-bearing. Three service modules carry a
 * stat whose `suffix` is a sentence rather than a symbol — "Over 20 years in
 * SEO and online marketing" — and that copy is transcribed from the live page,
 * so the break has to happen here rather than in content.
 */
export default function Numbers({ data }: { data: ServiceAdvantages }) {
    return (
        <SxSection tone="light">
            <div className="container-site">
                <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
                    {/* Below `lg` the artwork centres under its own cap. From
                        `lg` it fills the column edge to edge, so its left side
                        lines up with the first stat tile below rather than
                        sitting inset from it. */}
                    <div className="reveal min-w-0">
                        <Image
                            src={ART}
                            alt=""
                            aria-hidden="true"
                            width={718}
                            height={444}
                            sizes="(max-width: 1024px) 92vw, 50vw"
                            className="mx-auto h-auto w-full max-w-[640px] rounded-[10px] lg:mx-0 lg:max-w-none"
                        />
                    </div>

                    <div className="reveal min-w-0">
                        <SxEyebrow tone="light">{data.eyebrow}</SxEyebrow>
                        {/* `capitalize` is presentation only — the heading
                            text in the HTML is untouched, so nothing changes
                            for a crawler. See docs/CONTENT-PARITY.md. */}
                        <SxHeading
                            lead={data.heading}
                            accent={data.headingAccent}
                            ramp={SX_RAMP_DEEP}
                            className="capitalize"
                        />
                        <p className="mt-6 max-w-[62ch] text-lead text-onlight-muted">
                            {data.lead}
                        </p>
                    </div>
                </div>

                {/* The row label. `<p>`, not a heading: the tiles below are a
                    `<dl>`, so this titles a list and not a section, and the
                    band already has its own `h2`.

                    `#cc067f` is the closing stop of `SX_RAMP_DEEP` — the same
                    magenta the heading and the figures ramp into, which is why
                    it is that hex and not `--sx-neon`. */}
                <p className="reveal mt-[clamp(2.5rem,1.5rem+4vw,4rem)] font-display text-ui-15 font-bold text-[#cc067f] uppercase">
                    {seoNumbers.heading}
                </p>

                <dl className="reveal mt-5 grid gap-4 min-[576px]:grid-cols-2 lg:grid-cols-4">
                    {data.stats.map((stat, i) => {
                        /* Positional, and wrapped rather than indexed
                           straight: a module is free to carry three stats or
                           five. See content/seo-numbers.ts. */
                        const note =
                            seoNumbers.notes[i % seoNumbers.notes.length];
                        /* Most suffixes are a symbol — "+", "%". A handful of
                           modules carry a whole clause instead ("Over 20 years
                           in SEO and online marketing"), and that copy is
                           transcribed from the live page, so it is not ours to
                           shorten. Set at the figure size it fills the tile and
                           swamps its own label, so a wordy suffix steps the
                           figure down a rung. Purely a size decision — every
                           character still renders. */
                        const wordy =
                            stat.suffix.trim().split(/\s+/).length > 1;
                        return (
                            <div
                                key={stat.label}
                                className="min-w-0 rounded-[10px] border border-[rgb(157_78_221/0.16)] bg-white px-4.5 py-4 shadow-[0_6px_18px_-14px_rgb(10_2_33/0.45)]"
                            >
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <div
                                        className={cn(
                                            "flex gap-3",
                                            /* A one-line figure centres against
                                               its plate; a wordy suffix wraps to
                                               three lines and would leave the
                                               plate floating in the middle of
                                               them. */
                                            wordy
                                                ? "items-start"
                                                : "items-center",
                                        )}
                                    >
                                        {/* `rounded-sm`, not `rounded-lg`:
                                            this theme's radius scale is
                                            re-tuned in app/globals.css, where
                                            `lg` is 22px — on a 40px plate that
                                            reads as a circle. `sm` is the 8px
                                            step. */}
                                        <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-[var(--sx-lilac)]">
                                            <Image
                                                src={STAT_ICON}
                                                alt=""
                                                aria-hidden="true"
                                                width={40}
                                                height={40}
                                                unoptimized
                                                className="size-8"
                                            />
                                        </span>
                                        {/* The figure carries the heading's
                                            deep ramp as clipped text. Same
                                            treatment as `SxHeading`, and for
                                            the same reason it is applied
                                            inline: `background-clip: text`
                                            needs a painted background, and a
                                            utility could only carry one ramp.
                                            `pb` keeps descenders — the "y" of
                                            "years", the "p" of "percent" —
                                            inside the painted box. */}
                                        <p
                                            className={cn(
                                                "min-w-0 bg-clip-text pb-[0.08em] font-display leading-tight font-extrabold break-words text-transparent",
                                                /* Between the `h4` and `h3`
                                                   steps — the tokens jump
                                                   28px -> 38px and the tile
                                                   wants the rung in between,
                                                   so this one is spelled out
                                                   rather than tokenised. */
                                                wordy
                                                    ? "text-h5"
                                                    : "text-[clamp(1.375rem,1.05rem+1.4vw,2rem)]",
                                            )}
                                            style={{
                                                backgroundImage: SX_RAMP_DEEP,
                                            }}
                                        >
                                            {stat.prefix}
                                            <Counter
                                                value={stat.count}
                                                suffix={stat.suffix}
                                                className="inline"
                                            />
                                        </p>
                                    </div>

                                    <p className="mt-3 font-display text-ui-11 font-semibold tracking-widest text-onlight uppercase">
                                        {stat.label}
                                    </p>

                                    <p className="mt-1.5 text-ui-11 text-onlight-muted">
                                        <span className="font-semibold text-[var(--sx-neon)]">
                                            {note.mark}
                                        </span>{" "}
                                        {note.tail}
                                    </p>
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </div>
        </SxSection>
    );
}
