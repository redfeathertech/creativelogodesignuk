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
 * - **Below `lg`** the cards go to one column. Nothing is positioned at either
 *   of these two widths, so nothing can overlap.
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
                        // The one measurement everything else is derived from.
                        "[--ring:clamp(220px,52vw,300px)] xl:[--ring:clamp(330px,26vw,400px)]",
                    )}
                >
                    {/* -------------------------------------- photo ---- */}
                    {/* The positioning wrapper carries no `.reveal`: that class
                        animates `transform`, which is also what centres this
                        element from `xl` up, and the two cannot share the
                        property. The ring inside it reveals instead. */}
                    <div className="mx-auto mb-10 w-[var(--ring)] sm:mb-12 xl:absolute xl:top-1/2 xl:left-1/2 xl:mb-0 xl:-translate-x-1/2 xl:-translate-y-1/2">
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
                                        alt="Creative Logo Design methodology"
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

                        The 560px cap applies to the one-column layout only. A
                        card the full width of a tablet puts the step body on one
                        line with 300px of nothing after it, and leaves the
                        illustration marooned at the far edge; capped and centred,
                        the card keeps roughly the proportions it is drawn at and
                        sits under the photo above it.

                        `content-between` against a floor of one ring plus 6rem
                        is what splits the two rows to the top and foot of the
                        block, leaving the photo the middle. DOM order is
                        01–04 and the two-column flow puts them exactly where
                        the design does, so nothing is placed by hand. */}
                    <ol className="mx-auto grid w-full max-w-[560px] gap-5 sm:gap-6 lg:max-w-none lg:grid-cols-2 xl:min-h-[calc(var(--ring)+6rem)] xl:content-between xl:gap-x-[calc(var(--ring)-2rem)]">
                        {methodology.steps.map((step, i) => (
                            <li
                                key={step.title}
                                className={cn(
                                    "reveal group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-ink-900/[0.07] bg-white p-4",
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
                                        "xl:before:start-auto xl:before:end-0",
                                )}
                            >
                                {/* Complete badge in the asset — ring, fill and
                                    glyph are baked in — so nothing is drawn
                                    around it. 78px native, rendered at 54. */}
                                <Image
                                    src={step.icon}
                                    alt=""
                                    aria-hidden="true"
                                    width={78}
                                    height={78}
                                    className="size-12 shrink-0 sm:size-[54px]"
                                />

                                <div className="min-w-0 flex-1">
                                    <span
                                        aria-hidden="true"
                                        className="font-display text-sm leading-none font-extrabold text-magenta-500"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    {/* 1rem, a notch under the site's usual
                                        card title: it is what keeps all four of
                                        these on one line at `xl`, where the copy
                                        column is ~230px and the longest of them
                                        ("Development & Execution") measures 208
                                        at this size. The design draws them
                                        smaller still. */}
                                    <h3 className="mt-1.5 font-display text-[1rem] leading-[1.25] font-extrabold text-onlight">
                                        {step.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-[1.5] text-onlight-muted">
                                        {step.body}
                                    </p>
                                </div>

                                {/* The hairline and the illustration go
                                    together, and both drop below 480px: the
                                    pair costs ~80px of a 280px-wide card, which
                                    is the difference between a body that wraps
                                    at four words and one that wraps at two.

                                    Above that they are sized to leave the step
                                    title one line at `xl` — at 1280 the card is
                                    403px and the copy column 220px, and
                                    "Development & Execution" measures 205. */}
                                <span
                                    aria-hidden="true"
                                    className="hidden w-px self-stretch bg-ink-900/[0.08] min-[480px]:block"
                                />
                                <Image
                                    src={step.art}
                                    alt=""
                                    aria-hidden="true"
                                    width={step.artW}
                                    height={step.artH}
                                    className="hidden h-auto w-[clamp(52px,4.2vw,56px)] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 min-[480px]:block"
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
