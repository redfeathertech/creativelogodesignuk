import { faq } from "@/content/landing/seo-services";

/**
 * FAQ — nine questions on the white canvas, centred heading over a 900px column.
 *
 * The live page is a CSS-only accordion built from nine `<input type="radio">`
 * elements sharing one name. That gives exclusivity but two defects: the
 * question is a `<label>`, so the control has no role and no keyboard semantics
 * beyond the hidden radio, and because radios cannot be unchecked, whichever
 * panel is open can never be closed.
 *
 * Native `<details name="seo-faq">` gives the same one-at-a-time behaviour with
 * no JavaScript and no radios — the browser closes the sibling for us — while
 * every panel can also be closed, `<summary>` is a real button-like control, and
 * the answers stay in the DOM for crawlers whether open or shut. The first item
 * ships open, as on the live page.
 *
 * Deliberately not reproduced: the live `max-height: 0 → 300px` transition.
 * Animating a `<details>` open/close needs `::details-content` plus
 * `interpolate-size`, which is Chromium-only today and would mean hand-written
 * CSS; the panel snaps instead. The `+` still rotates 45° into a `×`.
 *
 * The live questions are `<label><span>` with no heading at all. They are `h3`
 * here so the section reads h2 → h3 with the text unchanged.
 */
export default function Faq() {
    return (
        <section className="bg-white py-[clamp(3.75rem,2rem+5.5vw,6.875rem)]">
            <div className="container-site">
                {/* ------------------------------------------------- heading -- */}
                <div className="mb-[clamp(2rem,1rem+3vw,4.375rem)] text-center">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {faq.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-[clamp(1.375rem,1rem+1.9vw,2.5rem)] leading-[1.2] font-extrabold text-seo-ink">
                        {faq.title}
                    </h2>
                </div>

                {/* ----------------------------------------------- accordion -- */}
                <div className="mx-auto max-w-[900px]">
                    {faq.items.map((item, index) => (
                        <details
                            key={item.q}
                            name="seo-faq"
                            open={index === 0}
                            className="group/item border-b border-seo-border"
                        >
                            <summary className="group/q flex cursor-pointer list-none items-center justify-between gap-4 py-[1.375rem] sm:gap-5 sm:py-7 [&::-webkit-details-marker]:hidden">
                                <h3 className="min-w-0 font-display text-base leading-[1.5] font-bold text-seo-ink transition-colors duration-200 group-hover/q:text-seo-pink sm:text-lg sm:leading-[1.6]">
                                    {item.q}
                                </h3>

                                {/* The live `+` glyph, drawn as two bars so it can rotate cleanly. */}
                                <span
                                    aria-hidden="true"
                                    className="relative grid size-6 shrink-0 place-items-center text-seo-pink transition-transform duration-300 ease-out group-open/item:rotate-45 sm:size-7"
                                >
                                    <span className="absolute h-0.5 w-5 rounded-sm bg-current sm:w-6" />
                                    <span className="absolute h-5 w-0.5 rounded-sm bg-current sm:h-6" />
                                </span>
                            </summary>

                            <p className="max-w-[760px] pb-[1.375rem] text-sm leading-[1.8] text-seo-body sm:pb-7 sm:text-base sm:leading-[1.9]">
                                {item.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
