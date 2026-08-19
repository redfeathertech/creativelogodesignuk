import Image from "next/image";

import { results } from "@/content/home";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";

/**
 * "The numbers" — the four success-rate stats.
 *
 * Rebuilt to the approved dark design. The section is now a single left-hand
 * column of stat cards over a full-bleed backdrop; the 3D bar chart, its icon
 * rail and the particle waves that fill the right half are all painted into
 * that one image, so the right column of the old two-column grid is gone along
 * with the conic-ring meter that used to sit in it. See the note on `results`
 * in content/home.ts for why dropping the ring loses no copy.
 *
 * A `<ul>`, not the `<dl>` this section used to be. The old markup put the
 * label in a `sr-only` `<dt>` *and* rendered it again inside the `<dd>`, so
 * every stat was announced twice; a list item that reads "40% Faster
 * time-to-market for apps" straight through says the same thing once. The
 * icons are `aria-hidden` — they repeat the label they sit beside.
 */
export default function Results() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            {/* Two treatments, because one does not survive the width range.

                Below `lg` the artwork *covers* the band, anchored left. It is a
                1.91:1 field and this band is more than twice as tall as it is
                wide on a phone, so cover drops roughly three quarters of the
                width — anchoring left keeps the empty, glowing half the cards
                sit on and crops the chart away entirely, rather than sliding it
                under them.

                From `lg` up the chart has to stay in the right-hand column, and
                cover cannot do that: the taller the band runs relative to the
                artwork's own 1.91:1, the deeper cover crops horizontally, and
                with the right edge pinned the chart marches leftwards until it
                is behind the cards. Measured, it lands under the heading at
                every width from 1024 to ~1900. So above `lg` the image keeps
                its natural aspect at the full width and is centred vertically
                instead — the chart then sits at a fixed 56–91% of the band, by
                construction, at any width.

                That leaves flat canvas above and below it, and the artwork's
                own edges are not `ink-950` — the top is a magenta glow, the
                foot a cold blue — so a hard cut shows as a seam. The two mask
                stops dissolve the last 8% of each edge into the section. */}
            <Image
                src={results.bg}
                alt=""
                aria-hidden="true"
                width={1920}
                height={1006}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-left lg:top-1/2 lg:bottom-auto lg:h-auto lg:-translate-y-1/2 lg:mask-t-from-92% lg:mask-b-from-92%"
            />

            <div className="container-site">
                {/* The right column is deliberately empty: it is the space the
                    backdrop's chart occupies. Declaring it as a grid column
                    rather than just capping the copy's width is what keeps the
                    two in step as the container grows — at 1920 the cards stop
                    exactly where the chart's plinth begins. */}
                <div className="grid gap-x-[clamp(2.5rem,1.5rem+4vw,4.5rem)] lg:grid-cols-2">
                    <div className="reveal">
                        <Eyebrow>{results.eyebrow}</Eyebrow>

                        <SectionHeading
                            lead={results.titleLead}
                            accent={results.titleAccent}
                            className="max-w-[20ch]"
                        />

                        <p className="mt-6 max-w-[56ch] text-lead text-white/65">
                            {results.lead}
                        </p>

                        <ul className="mt-9 grid gap-4 sm:gap-5">
                            {results.items.map((item) => (
                                <li
                                    key={item.label}
                                    /* The hairline is a gradient, so it is a
                                       1px parent behind an opaque child rather
                                       than a `border` — magenta at the leading
                                       edge fading to violet, as drawn. */
                                    className="rounded-2xl bg-[linear-gradient(105deg,var(--color-magenta-500)_0%,var(--color-violet-600)_55%,var(--color-violet-800)_100%)] p-px shadow-[0_20px_45px_-28px_rgb(204_6_127/0.75)]"
                                >
                                    <div className="flex items-center gap-4 rounded-[calc(var(--radius-2xl)-1px)] bg-[linear-gradient(105deg,rgb(24_10_45/0.94)_0%,rgb(11_3_24/0.88)_100%)] p-4 sm:gap-5 sm:p-5">
                                        {/* The plate, its ring and the glyph
                                            are all one asset — the artwork is
                                            a translucent magenta wash, so it
                                            picks up whatever the backdrop is
                                            doing behind the card. */}
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            aria-hidden="true"
                                            width={80}
                                            height={80}
                                            className="size-11 shrink-0 sm:size-14"
                                        />

                                        {/* Column below 420px: the figure, the
                                            rule and two lines of label do not
                                            fit on one row at 320px without the
                                            label wrapping to a word a line. */}
                                        <div className="flex min-w-0 flex-1 flex-col gap-1 min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-4 sm:gap-5">
                                            <Counter
                                                value={item.value}
                                                suffix={item.suffix}
                                                /* `tabular-nums` + a floor on
                                                   the width so the rules line
                                                   up down the stack while the
                                                   count-up runs through
                                                   narrower digits. */
                                                className="shrink-0 font-display text-[clamp(1.5rem,1.15rem+1.1vw,2.25rem)] leading-none font-extrabold tabular-nums min-[420px]:min-w-[5ch]"
                                            />

                                            <span
                                                aria-hidden="true"
                                                className="hidden h-10 w-px shrink-0 bg-white/15 min-[420px]:block sm:h-12"
                                            />

                                            <div className="min-w-0">
                                                <p className="font-display text-[1rem] leading-[1.25] font-extrabold text-white sm:text-[1.125rem]">
                                                    {item.label}
                                                </p>
                                                <p className="mt-1 text-sm leading-[1.4] text-white/55">
                                                    {item.note}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
