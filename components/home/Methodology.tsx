import Image from "next/image";

import { methodology } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { cn } from "@/lib/cn";

/* The dashed rings behind the photo. Concentric circles centred on it, each one
   masked so only its left and right flanks paint — a full ring would read as a
   target, and the approved design shows arcs sweeping out to either side. The
   mask is a pair of vertical fades: for a circle the box's top and bottom edges
   are the 12 and 6 o'clock arcs, so masking vertically leaves exactly the 3 and
   9 o'clock ones. `to-*` is what sets how much of each flank survives — the band
   runs from `100 - to` to `to` — and `from-50%` puts the only fully opaque pixel
   on the equator, so each arc fades out along its own length rather than ending
   on a cut. Shorter and fainter the further out it sits.

   Only the innermost survives below `xl`, where the diagram layout does. The
   outer two are ~2x the photo — wider than a phone — and three of them stacked
   inside 320px is a moiré. */
const arcs = [
    {
        size: "w-[132%]",
        fade: "mask-y-from-50% mask-y-to-78%",
        tone: "border-violet-300",
        at: "",
    },
    {
        size: "w-[166%]",
        fade: "mask-y-from-50% mask-y-to-72%",
        tone: "border-violet-200",
        at: "hidden xl:block",
    },
    {
        size: "w-[198%]",
        fade: "mask-y-from-50% mask-y-to-66%",
        tone: "border-mist-300",
        at: "hidden xl:block",
    },
];

/* Where the four nodes sit on the ring. A point at 45° on a circle is inset
   `(1 - sin45)/2` = 14.6% of the diameter from each edge, so the same pair of
   percentages places all four — as percentages they hold at every ring size. */
const nodes = [
    { at: "top-[14.6%] left-[14.6%]", tone: "border-violet-400" },
    { at: "top-[14.6%] left-[85.4%]", tone: "border-magenta-400" },
    { at: "top-[85.4%] left-[14.6%]", tone: "border-violet-400" },
    { at: "top-[85.4%] left-[85.4%]", tone: "border-magenta-400" },
];

/**
 * Methodology — the four steps around the centre photo.
 *
 * Rebuilt to the approved light design, and **no longer a client component**.
 * The section it replaces was `"use client"` for one reason: the centre of the
 * orbit swapped image as you opened each accordion panel. The design has one
 * photo and four cards that are all open at once, so there is no state left —
 * the whole band is server-rendered HTML with no JS behind it, and the four step
 * descriptions no longer depend on a `<details>` being opened to be read.
 *
 * Two things the rebuild drops, both deliberately:
 *
 * - **The orbiting tool ring.** Its eight icons were `/assets/img/tools/1.png`
 *   … `8.png`, and those files were renamed when the toolbox was rebuilt, so
 *   every one of them was already a 404. The tool marks still appear on the page
 *   in components/home/Toolbox.tsx, where they belong.
 * - **The four per-step photos.** The design has a single image at the centre
 *   and nothing swaps it.
 *
 * What it keeps is the "Get started" button, which the approved crop does not
 * show. It is live copy and the section's only conversion point, so it moves to
 * the foot of the band on the design's centre line rather than disappearing.
 *
 * ## The layout
 *
 * Three of them, and the widths they change at are measured rather than picked:
 *
 * - **From `xl`** the photo is taken out of flow and pinned to the centre of the
 *   card grid, and the grid's own column gap — one ring width less 2rem — is the
 *   hole it sits in. Each card therefore overlaps the ring's *bounding box* by
 *   1rem a side, but not the ring: a circle is much narrower than its box at the
 *   height the cards sit at, so the arc passes through the gap between them and
 *   the nodes at 14.6% stay in the open. That is also why the grid has a floor of
 *   one ring plus 6rem — it pushes the two rows apart until the widest part of
 *   the circle is clear of both of them.
 * - **`lg` to `xl`** is a plain 2x2 grid with the photo above it. The cards are
 *   ~330px wide at 1024, which is not enough for the copy *and* a hole in the
 *   middle: the arcs end up behind the cards and the step bodies wrap to five
 *   lines. The diagram is a wide-screen layout, so it waits for a wide screen.
 * - **Below `lg`** the diagram comes back, without the positioning: the block
 *   itself is the 2x2 grid, the `<ol>` is `display: contents` so its four cards
 *   flow into it directly, and the photo is a full-width row ordered between
 *   the two pairs. That is the approved phone layout — 01/02, photo, 03/04 —
 *   and nothing is taken out of flow to get it, so nothing can overlap: the
 *   ring sits in a row of its own. The `<ol>` keeps `role="list"`, which
 *   `display: contents` would otherwise drop from the accessibility tree.
 *
 *   The cards restack to suit the ~170px they get on a phone: the badge and the
 *   illustration share a top row, the step number runs inline with its title
 *   instead of above it, and the hairline between copy and illustration goes —
 *   there is nothing either side of it any more. The accent edge faces the
 *   photo here too, so each pair brackets it the way the four cards bracket the
 *   ring at `xl`.
 */
export default function Methodology() {
    return (
        /* `overflow-x-clip`, not `hidden`: the outer arc is ~2x the photo and
           runs past the viewport on a phone, and clip suppresses that without
           making the section a scroll container. */
        <section className="relative isolate overflow-x-clip bg-white py-section text-onlight">
            <div className="container-site">
                {/* ------------------------------------------- head ---- */}
                {/* Centred, which is the one thing this section's head does
                    differently from every other on the page — hence `flanked`
                    on the eyebrow, which repeats its rule on the far side so
                    the mark is symmetrical about the same axis. */}
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow flanked className="text-magenta-500">
                        {methodology.eyebrow}
                    </Eyebrow>

                    {/* The accent is a block, so the heading breaks after
                        "methodology" at every width — the two lines of the
                        design — rather than wherever the container happens to
                        run out. `mx-auto` on it because a block span would
                        otherwise take the full line box and its gradient would
                        start off-centre. */}
                    <h2 className="text-h2">
                        {methodology.titleLead}{" "}
                        <span className="gradient-text-brand mx-auto block">
                            {methodology.titleAccent}
                        </span>
                    </h2>

                    {/* The rule under the title, as in the design: the eyebrow's
                        mark repeated to close the block off. */}
                    <span
                        aria-hidden="true"
                        className="mx-auto mt-5 block h-0.5 w-[clamp(28px,6vw,60px)] rounded-sm bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]"
                    />

                    <p className="mx-auto mt-6 max-w-[56ch] text-lead text-pretty text-onlight-muted">
                        {methodology.lead}
                    </p>
                </div>

                {/* ---------------------------------------- diagram ---- */}
                {/* Capped well inside `container-site`: the container runs to
                    1560px and cards half that wide would leave the copy in each
                    one on a single line with 200px of white space after it. At
                    1180 they land at ~410px against a ~390px ring, which is the
                    one-to-one the design draws — and it is also the width at
                    which the longest step title fits on a single line. */}
                <div
                    className={cn(
                        "relative mx-auto mt-[clamp(2.5rem,1.5rem+4vw,4.5rem)] max-w-[1180px]",
                        /* Below `lg` this block IS the 2x2 grid the cards flow
                           into — see the layout note above. From `lg` it goes
                           back to a plain box, with the photo above it and the
                           `<ol>` doing its own grid. */
                        "grid grid-cols-2 items-stretch gap-3 min-[420px]:gap-4 lg:block",
                        // The one measurement everything else is derived from.
                        "[--ring:clamp(220px,74vw,320px)] xl:[--ring:clamp(330px,26vw,400px)]",
                    )}
                >
                    {/* -------------------------------------- photo ---- */}
                    {/* The positioning wrapper carries no `.reveal`: that class
                        animates `transform`, which is also what centres this
                        element from `xl` up, and the two cannot share the
                        property. The ring inside it reveals instead. */}
                    <div className="order-1 col-span-2 mx-auto mt-[clamp(1rem,4vw,1.75rem)] mb-[clamp(1rem,4vw,1.75rem)] w-[var(--ring)] lg:order-none lg:mt-0 lg:mb-10 xl:absolute xl:top-1/2 xl:left-1/2 xl:mb-0 xl:-translate-x-1/2 xl:-translate-y-1/2">
                        <div className="reveal relative aspect-square">
                            {arcs.map((arc) => (
                                <span
                                    key={arc.size}
                                    aria-hidden="true"
                                    className={cn(
                                        "pointer-events-none absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed",
                                        arc.size,
                                        arc.fade,
                                        arc.tone,
                                        arc.at,
                                    )}
                                />
                            ))}

                            {/* The ring is a gradient behind a white plate
                                behind the photo — three nested circles, so the
                                white gap the design shows between ring and
                                photo is padding, not a second border. Violet at
                                the leading edge running to magenta, the same
                                direction as every other brand ramp on the
                                site. */}
                            <div className="relative size-full rounded-full bg-[linear-gradient(100deg,var(--color-violet-400)_0%,var(--color-magenta-400)_100%)] p-[clamp(6px,1.4vw,9px)] shadow-[0_26px_60px_-32px_rgb(102_46_145/0.6)]">
                                <div className="size-full rounded-full bg-white p-[clamp(5px,1.1vw,8px)]">
                                    {/* Supplied pre-cropped to a circle at
                                        463px native, so it is never upscaled —
                                        the ring is 400px at its widest. */}
                                    <Image
                                        src={methodology.photo}
                                        alt={methodology.photoAlt}
                                        width={463}
                                        height={463}
                                        sizes="(max-width: 1024px) 60vw, 400px"
                                        className="size-full rounded-full object-cover"
                                    />
                                </div>

                                {/* The four nodes, each tinted to the part of
                                    the ramp it sits on. */}
                                {nodes.map((node) => (
                                    <span
                                        key={node.at}
                                        aria-hidden="true"
                                        className={cn(
                                            "absolute size-[clamp(11px,2.4vw,15px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white",
                                            node.at,
                                            node.tone,
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* -------------------------------------- steps ---- */}
                    {/* An `<ol>`: these are four ordered stages, and the visible
                        "01" … "04" are `aria-hidden` because the list itself
                        already carries the order.

                        `display: contents` below `lg`, so the four cards are
                        grid items of the block above rather than of this list —
                        that is the only way the photo can sit between rows
                        01/02 and 03/04 while staying outside the list. The
                        `role` is what keeps it a list to a screen reader once
                        the box it generates is gone.

                        `content-between` against a floor of one ring plus 6rem
                        is what splits the two rows to the top and foot of the
                        block, leaving the photo the middle. DOM order is
                        01–04 and the two-column flow puts them exactly where
                        the design does, so nothing is placed by hand. */}
                    <ol
                        role="list"
                        className="contents lg:mx-auto lg:grid lg:w-full lg:grid-cols-2 lg:gap-6 xl:min-h-[calc(var(--ring)+6rem)] xl:content-between xl:gap-x-[calc(var(--ring)-2rem)]"
                    >
                        {methodology.steps.map((step, i) => (
                            <li
                                key={step.title}
                                className={cn(
                                    "reveal group relative overflow-hidden rounded-2xl border border-ink-900/[0.07] bg-white",
                                    /* The phone card: badge and illustration
                                       share a top row, the copy runs under
                                       both. Placed by hand rather than left to
                                       auto-flow — DOM order is badge, copy,
                                       hairline, illustration, and the copy has
                                       to clear the row the other two share.
                                       From `lg` it is the row it always was. */
                                    "grid grid-cols-[auto_1fr] items-start gap-x-2 gap-y-2 p-3",
                                    "lg:flex lg:items-center lg:gap-3 lg:p-4",
                                    /* 01/02 keep the default order and the
                                       photo takes 1, so 03/04 land after it. */
                                    i > 1 && "order-2 lg:order-none",
                                    "shadow-[0_18px_44px_-30px_rgb(13_3_28/0.5)] transition-[transform,box-shadow,border-color] duration-300 ease-out",
                                    "hover:-translate-y-0.5 hover:border-magenta-500/25 hover:shadow-[0_24px_54px_-28px_rgb(204_6_127/0.4)]",
                                    /* The accent edge faces the photo: on the
                                       right of the left-hand column, on the
                                       left of the right-hand one. `overflow-
                                       hidden` on the card is what tapers it
                                       into the corner radius instead of letting
                                       a 3px bar stand proud of it. Below `xl`
                                       there is no centre to face, so every card
                                       takes it on the leading edge. */
                                    "before:absolute before:inset-y-0 before:start-0 before:w-[3px] before:bg-[linear-gradient(180deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] before:content-['']",
                                    i % 2 === 0 &&
                                        "before:start-auto before:end-0 lg:before:start-0 lg:before:end-auto xl:before:start-auto xl:before:end-0",
                                )}
                            >
                                {/* Complete badge in the asset — ring, fill and
                                    glyph are baked in — so nothing is drawn
                                    around it. 78px native, rendered at 54. */}
                                <Image
                                    src={step.icon}
                                    alt={step.iconAlt}
                                    width={78}
                                    height={78}
                                    unoptimized
                                    className="col-start-1 row-start-1 size-8 shrink-0 sm:size-10 lg:size-[54px]"
                                />

                                <div className="col-span-2 col-start-1 row-start-2 min-w-0 lg:flex-1">
                                    {/* On a phone the number runs into the
                                        title — "01. Discovery & Strategy" —
                                        which is why the `<h3>` is `inline`
                                        there: the two then wrap as one run of
                                        text rather than the number taking a
                                        line of its own on a ~145px card. From
                                        `lg` the heading is a block again and
                                        the number sits above it, as before.

                                        The number stays OUT of the heading:
                                        its text is the step title and nothing
                                        else. The full stop is a pseudo for the
                                        same reason — drawn where the design
                                        draws it, part of no string. */}
                                    {/* The strut: an inline run takes its line
                                        box from the block around it, so without
                                        this the two lines of a wrapped title sit
                                        a 16px/1.7 body line apart. */}
                                    <div className="text-ui-13 leading-[1.35] sm:text-ui-15">
                                        <span
                                            aria-hidden="true"
                                            className="me-1 font-display text-ui-13 leading-[1.3] font-extrabold text-violet-500 after:content-['.'] sm:text-ui-15 lg:me-0 lg:text-sm lg:leading-none lg:text-magenta-500 lg:after:content-none"
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {/* 13px on a phone, where the card is
                                            ~170px wide and the number sits on
                                            the same line; 1rem from `lg`, which
                                            is what keeps all four titles on one
                                            line at `xl`, where the copy column
                                            is ~230px and the longest of them
                                            ("Development & Execution") measures
                                            208 at that size. */}
                                        {/* `text-wrap`/`wrap-normal` undo the
                                            two globals.css puts on every
                                            heading: `balance` reflows this
                                            one against the number in front of
                                            it, and `break-word` then splits
                                            "Development" mid-word on a 320px
                                            phone even though the whole word
                                            fits its line. Both come back from
                                            `lg`, where the heading is a block
                                            of its own again. */}
                                        <h3 className="inline text-wrap wrap-normal font-display text-ui-13 leading-[1.3] font-extrabold text-violet-500 sm:text-ui-15 lg:mt-1.5 lg:block lg:text-balance lg:wrap-break-word lg:text-base lg:leading-[1.25] lg:text-onlight">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="mt-1.5 text-xs leading-[1.55] text-onlight-muted sm:text-ui-13 lg:text-sm lg:leading-[1.5]">
                                        {step.body}
                                    </p>
                                </div>

                                {/* The hairline is a `lg`-and-up thing: below
                                    that the illustration is in the card's top
                                    row and the copy is under it, so there is
                                    nothing on either side of a vertical rule.

                                    From `lg` the pair is sized to leave the step
                                    title one line at `xl` — at 1280 the card is
                                    403px and the copy column 220px, and
                                    "Development & Execution" measures 205. */}
                                <span
                                    aria-hidden="true"
                                    className="hidden w-px self-stretch bg-ink-900/[0.08] lg:block"
                                />
                                <Image
                                    src={step.art}
                                    alt={step.artAlt}
                                    aria-hidden="true"
                                    width={step.artW}
                                    height={step.artH}
                                    className="col-start-2 row-start-1 h-auto w-9 shrink-0 justify-self-end object-contain transition-transform duration-300 group-hover:scale-105 sm:w-11 lg:w-[clamp(52px,4.2vw,56px)]"
                                />
                            </li>
                        ))}
                    </ol>
                </div>

                {/* ------------------------------------------- cta ---- */}
                {/* On the diagram's centre line, not off to one side: the whole
                    band is symmetrical and a left-aligned button would be the
                    only thing in it that is not. */}
                <div className="reveal mt-[clamp(2.5rem,1.5rem+3vw,4rem)] flex justify-center">
                    <LeadButton variant="outline">{methodology.cta}</LeadButton>
                </div>
            </div>
        </section>
    );
}
