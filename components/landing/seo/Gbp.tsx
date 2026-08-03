import { gbp } from "@/content/landing/seo-services";
import { QuoteButton } from "./QuoteDialog";

/**
 * Gbp — "Win the Local Map Pack", the mirror of On-Page SEO.
 *
 * Two columns at `lg`: a dark **mockup** of a Business Profile insights panel on
 * the left, the copy on the right. The numbers in that panel describe no real
 * client — they illustrate what a managed profile reports — but unlike the hero
 * mockup they are plain labelled figures, so they read fine aloud and stay in
 * the accessibility tree.
 *
 * The copy is first in the DOM and the card is pulled left with `order-first` at
 * `lg`. The live page ships the card first, which puts the evidence ahead of the
 * argument on a phone and lands an `h3` ahead of the section's own `h2`; source
 * order is layout, not content, so it is reordered here and the visual result is
 * unchanged.
 *
 * Stat figures render as `<p>`, not the live page's `<h3>` — "1,842" titles
 * nothing, and `Hero` treats its four stat boxes the same way. The card's own
 * heading carries the `h3`.
 */

type Stat = (typeof gbp.stats)[number];

/** Only the first stat is flagged, so the key is absent from the other three. */
const isHighlighted = (stat: Stat) => "highlight" in stat && stat.highlight;

/**
 * The live card tints a growth note green and a plain note muted white, but the
 * content module has no tone field to say which is which. The arrow the copy
 * already carries is the marker.
 */
const isGrowth = (stat: Stat) => stat.note.startsWith("↑");

/** Decorative tick, standing in for the live list's `::before { content: "✓" }`. */
function Tick({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
            <path
                d="m5 12.5 4.5 4.5L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Gbp() {
    return (
        <section className="bg-seo-card py-[clamp(3.75rem,2rem+5.5vw,6.875rem)]">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+4vw,3.75rem)] lg:grid-cols-2">
                {/* ---------------------------------------------------- copy -- */}
                <div className="min-w-0">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {gbp.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-h2 font-extrabold text-seo-ink">
                        {gbp.titleLead}
                        <br />
                        {gbp.titleTrail}
                    </h2>

                    <p className="mt-7 max-w-[36.25rem] text-body leading-[1.9] text-seo-body">
                        {gbp.description}
                    </p>

                    <ul className="m-0 mt-8 grid list-none gap-4 p-0 sm:gap-[1.375rem]">
                        {gbp.points.map((point) => (
                            <li
                                key={point}
                                className="flex items-start gap-3.5 text-body leading-[1.8] text-seo-ink"
                            >
                                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-seo-coral/[0.08] text-seo-coral">
                                    <Tick className="size-3.5" />
                                </span>
                                <span className="min-w-0">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10">
                        <QuoteButton packageName={gbp.eyebrow} variant="seo" size="lg">
                            {gbp.cta}
                        </QuoteButton>
                    </div>
                </div>

                {/* -------------------------------------------------- mockup -- */}
                <div className="min-w-0 rounded-[26px] bg-seo-ink px-[1.125rem] py-6 sm:px-7 sm:py-[2.125rem] lg:order-first">
                    <h3 className="font-display text-[0.8125rem] font-semibold text-white/45">
                        {gbp.cardHeading}
                    </h3>

                    <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-3 p-0">
                        {gbp.stats.map((stat) => (
                            <li
                                key={stat.label}
                                className="min-w-0 rounded-[16px] bg-white/5 px-4 py-[1.125rem]"
                            >
                                <p className="m-0 text-[0.75rem] font-semibold tracking-[0.08em] text-white/50 uppercase">
                                    {stat.label}
                                </p>

                                <p
                                    className={`m-0 mt-3.5 font-display text-[clamp(1.375rem,1.1rem+0.9vw,1.75rem)] leading-[1.2] font-extrabold ${
                                        isHighlighted(stat) ? "text-seo-good" : "text-white"
                                    }`}
                                >
                                    {stat.value}
                                </p>

                                <p
                                    className={`m-0 mt-2.5 text-[0.8125rem] leading-snug ${
                                        isGrowth(stat) ? "text-seo-good" : "text-white/45"
                                    }`}
                                >
                                    {stat.note}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
