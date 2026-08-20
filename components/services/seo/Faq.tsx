import { faq } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * FAQ — nine questions on the light surface, centred head over a 900px column.
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
        <Section tone="light">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow className="justify-center text-magenta-500">{faq.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={faq.title}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                </div>

                <div className="reveal mx-auto mt-12 max-w-[56rem]">
                    {faq.items.map((item, index) => (
                        <details
                            key={item.q}
                            name="seo-faq"
                            open={index === 0}
                            className="group/item border-b border-ink-900/[0.08] first:border-t"
                        >
                            <summary className="group/q flex cursor-pointer list-none items-center justify-between gap-5 py-7 [&::-webkit-details-marker]:hidden">
                                <h3 className="min-w-0 font-display text-h5 font-bold text-onlight transition-colors duration-200 group-hover/q:text-magenta-500">
                                    {item.q}
                                </h3>

                                {/* The live `+` glyph, drawn as two bars so it can rotate cleanly. */}
                                <span
                                    aria-hidden="true"
                                    className="relative grid size-7 shrink-0 place-items-center text-magenta-500 transition-transform duration-300 ease-out group-open/item:rotate-45"
                                >
                                    <span className="absolute h-0.5 w-6 rounded-sm bg-current" />
                                    <span className="absolute h-6 w-0.5 rounded-sm bg-current" />
                                </span>
                            </summary>

                            <p className="max-w-[62ch] pb-7 text-onlight-muted">{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </Section>
    );
}
