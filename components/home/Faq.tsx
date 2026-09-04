import { faq } from "@/content/home";

/**
 * FAQ — the last content band on the homepage, sitting between the `Proposal`
 * form and the footer.
 *
 * Centred head over two independent columns, which is what makes it read as a
 * different block from `Challenges` further up the page rather than a second
 * run of it: that one is a 5/7 split with an icon and a service link per row,
 * this one is a plain two-up grid a visitor scans on the way out.
 *
 * Native `<details>`, same as every other accordion here: `<summary>` is a real
 * control with a real accessible name, and the answers stay in the
 * server-rendered HTML whether the panel is open or shut, which is the
 * condition the `FAQPage` node in lib/seo.ts depends on. Server component,
 * therefore, with no `"use client"`.
 *
 * The shared `name="home-faq"` makes all nine one exclusive group: opening any
 * question closes whichever was open, natively, with no JavaScript. `name`
 * groups by document, not by parent, so it reaches across both columns —
 * splitting the list into two stacks does not split the group.
 *
 * `ITEMS` is split by parity rather than in half so the DOM order stays the
 * source order: item 1 sits left, 2 right, 3 left. Reading across matches
 * reading the markup, which is what a keyboard or screen-reader user gets.
 *
 * The open/close height transition is the `.accordion` rule in globals.css.
 * Nothing here ships open: the band is a footer-adjacent reference, so an
 * expanded first row would just push the rest of the list down the page.
 *
 * Colours and type are the site's own — `ink` canvas under the brand mesh and
 * grain, `font-display` headings, the magenta→violet ramp on the accent word,
 * the eyebrow pill and the open row's border.
 */
export default function Faq() {
    return (
        <section
            id="faq"
            aria-labelledby="faq-title"
            className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#0C0026_0%,#0d031c_55%,#07020f_100%)] py-section text-white"
        >
            {/* Brand glow, then grain over it, so the near-black canvas never
                reads as flat black. Both decorative. */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-mesh opacity-40"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-[0.18] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative z-[1] container-site">
                {/* ------------------------------- head ------------------------------ */}
                <div className="reveal mx-auto max-w-[52rem] text-center">
                    {/* Pill, not the shared `Eyebrow`: that mark is a hairline bar
                        beside left-aligned text and reads as unbalanced under a
                        centred heading. Same brand ramp, different container. */}
                    <span className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] px-4 py-1.5 font-display text-xs font-bold tracking-[0.14em] text-white uppercase shadow-[0_10px_30px_-12px_rgb(204_6_127/0.9)]">
                        <svg
                            viewBox="0 0 24 24"
                            className="size-4 shrink-0"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.22" />
                            <path
                                d="M9.4 9a2.7 2.7 0 1 1 3.5 2.6c-.6.2-.9.7-.9 1.3v.5"
                                stroke="currentColor"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                            />
                            <circle cx="12" cy="16.6" r="1.15" fill="currentColor" />
                        </svg>
                        {faq.eyebrow}
                    </span>

                    <h2
                        id="faq-title"
                        className="mt-5 font-display text-[clamp(1.875rem,1.1rem+3.2vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.02em] text-white"
                    >
                        {faq.titleLead}{" "}
                        <span className="gradient-text">{faq.titleAccent}</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-[62ch] text-lead text-white/70">
                        {faq.lead}
                    </p>
                </div>

                {/* ------------------------------- list ------------------------------ */}
                {/* Two columns, each its own stack, rather than one grid of rows:
                    a grid would tie the two rows of a pair to a shared track
                    height, so opening one card would stretch the empty one beside
                    it. Below `md` the two stacks fall back to one, in source
                    order, because `left` and `right` are already interleaved. */}
                <div className="reveal mx-auto mt-[clamp(2.5rem,1.5rem+3vw,3.75rem)] grid max-w-6xl items-start gap-4 md:grid-cols-2 md:gap-5">
                    <div className="flex flex-col gap-4 md:gap-5">
                        {faq.items
                            .filter((_, i) => i % 2 === 0)
                            .map((item) => (
                                <Row key={item.q} item={item} />
                            ))}
                    </div>
                    <div className="flex flex-col gap-4 md:gap-5">
                        {faq.items
                            .filter((_, i) => i % 2 === 1)
                            .map((item) => (
                                <Row key={item.q} item={item} />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * One question card. Extracted only because it is rendered from two places —
 * the even column and the odd one — and a copy of a control is how the two
 * halves of an accordion drift apart.
 */
function Row({ item }: { item: (typeof faq.items)[number] }) {
    return (
        <details name="home-faq" className="accordion group/item rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 open:border-magenta-500/45 open:bg-[linear-gradient(120deg,rgb(204_6_127/0.14)_0%,rgb(102_46_145/0.14)_100%)] open:shadow-[0_18px_54px_-24px_rgb(204_6_127/0.75)]">
            <summary className="flex cursor-pointer list-none items-start gap-4 p-[clamp(1rem,0.75rem+0.8vw,1.4rem)] marker:content-[''] [&::-webkit-details-marker]:hidden">
                <h3 className="min-w-0 flex-1 font-display text-ui-15 leading-snug font-bold text-white/85 transition-colors duration-300 group-open/item:text-white sm:text-ui-17">
                    {item.q}
                </h3>

                {/* `+` drawn as two bars, the upright one fading out on open so the
                    mark becomes a `−`. Two bars, not a glyph: a `+`/`−` in the
                    display face are different widths and the swap would jog the
                    row. Top-aligned so it stays beside the first line of a
                    question that wraps to two. */}
                <span
                    className="relative mt-0.5 grid size-7 shrink-0 place-items-center text-white/55 transition-colors duration-300 group-open/item:text-magenta-300"
                    aria-hidden="true"
                >
                    <span className="absolute h-[2px] w-[15px] rounded-sm bg-current" />
                    <span className="absolute h-[15px] w-[2px] rounded-sm bg-current transition-opacity duration-300 group-open/item:opacity-0" />
                </span>
            </summary>

            <div className="px-[clamp(1rem,0.75rem+0.8vw,1.4rem)] pb-[clamp(1rem,0.7rem+0.8vw,1.4rem)]">
                <p className="text-body text-white/70">{item.a}</p>
            </div>
        </details>
    );
}
