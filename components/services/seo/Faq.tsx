import Image from "next/image";

import { faq } from "@/content/landing/seo-services";
import { Eyebrow } from "@/components/ui/Section";

/**
 * FAQ — two columns on the dark canvas, mirroring the homepage `Challenges`
 * block: heading, lead and the four-reason panel on the left, the numbered
 * nine-item accordion on the right. Both stack to one column below `lg`.
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
 * The open/close height transition is the `.accordion` rule in globals.css, the
 * same one the homepage accordion uses.
 *
 * The live questions are `<label><span>` with no heading at all. They are `h3`
 * here so the section reads h2 → h3 with the text unchanged.
 */
export default function Faq() {
    return (
        <section className="relative isolate overflow-hidden bg-[linear-gradient(160deg,#0d0714_0%,#180d2b_55%,#0d0714_100%)] py-section text-white">
            {/* Brand glow behind the content, then grain over it, so the
                near-black canvas never reads as flat black. Decorative. */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-mesh opacity-45"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-[0.18] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative z-[1] container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                {/* ----------------------------- left ---------------------------- */}
                <div className="reveal max-lg:text-center">
                    <Eyebrow className="max-lg:justify-center max-lg:[&>span]:hidden">
                        {faq.eyebrow}
                    </Eyebrow>

                    <h2 className="text-[clamp(1.875rem,1.1rem+3.2vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.02em] text-white">
                        {faq.titleLead}{" "}
                        <span className="gradient-text-brand-lr">{faq.titleAccent}</span>
                    </h2>

                    <p className="mt-6 max-w-[46ch] text-lead text-white/70 max-lg:mx-auto">
                        {faq.lead.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </p>

                    <ul className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.03] p-[clamp(1.25rem,0.75rem+2vw,2rem)] backdrop-blur-sm max-lg:text-start">
                        {faq.pillars.map((pillar, i) => (
                            <li
                                key={pillar.title}
                                className={
                                    i === 0
                                        ? "flex items-start gap-4 sm:gap-5"
                                        : "mt-6 flex items-start gap-4 border-t border-white/[0.08] pt-6 sm:gap-5"
                                }
                            >
                                <Image
                                    src={pillar.icon}
                                    alt={pillar.iconAlt}
                                    width={78}
                                    height={78}
                                    unoptimized
                                    className="size-14 shrink-0 sm:size-[68px]"
                                />
                                <div className="min-w-0">
                                    <h3 className="font-display text-h5 font-bold text-white">
                                        {pillar.title}
                                    </h3>
                                    <p className="mt-1 text-body text-white/65">{pillar.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ---------------------------- right ---------------------------- */}
                <div className="reveal flex flex-col gap-3">
                    {faq.items.map((item, i) => (
                        <details
                            key={item.q}
                            name="seo-faq"
                            open={i === 0}
                            className="accordion group/item rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 open:border-magenta-500/45 open:bg-[linear-gradient(120deg,rgb(204_6_127/0.14)_0%,rgb(102_46_145/0.14)_100%)] open:shadow-[0_18px_54px_-24px_rgb(204_6_127/0.75)]"
                        >
                            <summary className="flex cursor-pointer list-none items-center gap-3 p-[clamp(0.85rem,0.6rem+0.7vw,1.15rem)] marker:content-[''] sm:gap-4 [&::-webkit-details-marker]:hidden">
                                <span
                                    className="grid h-7 w-9 shrink-0 place-items-center rounded-md bg-white/[0.07] font-display text-ui-11 font-bold text-white/70 transition-colors duration-300 group-open/item:bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] group-open/item:text-white"
                                    aria-hidden="true"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <h3 className="min-w-0 flex-1 font-display text-ui-15 leading-snug font-bold text-white/85 transition-colors duration-300 group-open/item:text-white sm:text-ui-17">
                                    {item.q}
                                </h3>

                                {/* The live `+` glyph, drawn as two bars so it can rotate cleanly. */}
                                <span
                                    className="relative grid size-7 shrink-0 place-items-center text-white/55 transition-[color,rotate] duration-300 ease-out group-open/item:rotate-45 group-open/item:text-magenta-300"
                                    aria-hidden="true"
                                >
                                    <span className="absolute h-[2px] w-[13px] rounded-sm bg-current" />
                                    <span className="absolute h-[13px] w-[2px] rounded-sm bg-current" />
                                </span>
                            </summary>

                            <div className="px-[clamp(0.85rem,0.6rem+0.7vw,1.15rem)] pb-[clamp(1rem,0.7rem+0.8vw,1.35rem)]">
                                <p className="max-w-[62ch] pl-[3rem] text-body text-white/70 max-sm:pl-0">
                                    {item.a}
                                </p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
