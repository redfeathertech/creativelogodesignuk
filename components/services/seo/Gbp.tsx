import { gbp } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * Gbp — "Win the Local Map Pack", the mirror of On-Page SEO.
 *
 * The same `Solutions` split as {@link ./OnPage}, flipped and on the light
 * surface: a dark **mockup** of a Business Profile insights panel on the left,
 * the copy on the right. The numbers in that panel describe no real client —
 * they illustrate what a managed profile reports — but unlike the hero mockup
 * they are plain labelled figures, so they read fine aloud and stay in the
 * accessibility tree.
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

export default function Gbp() {
    return (
        <Section tone="light">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2">
                {/* ---------------------------------------------------- copy -- */}
                <div className="reveal min-w-0">
                    <Eyebrow className="text-magenta-500">{gbp.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={gbp.titleLead}
                        accent={gbp.titleTrail}
                        accentClassName="gradient-text-brand"
                    />

                    <p className="mt-6 max-w-[62ch] text-lead text-onlight-muted">
                        {gbp.description}
                    </p>

                    <ul className="m-0 mt-8 grid list-none gap-5 p-0">
                        {gbp.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-onlight-muted">
                                <span
                                    aria-hidden="true"
                                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-magenta-50 text-magenta-600"
                                >
                                    <CheckIcon className="size-3" />
                                </span>
                                <span className="min-w-0">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-9">
                        <QuoteButton packageName={gbp.eyebrow} variant="primary" size="lg">
                            {gbp.cta}
                        </QuoteButton>
                    </div>
                </div>

                {/* -------------------------------------------------- mockup -- */}
                <div className="reveal relative isolate min-w-0 overflow-hidden rounded-xl bg-ink-900 p-6 sm:p-8 lg:order-first">
                    <div
                        className="pointer-events-none absolute inset-0 -z-10 bg-mesh"
                        aria-hidden="true"
                    />

                    <h3 className="font-display text-sm font-bold tracking-[0.14em] text-white/55 uppercase">
                        {gbp.cardHeading}
                    </h3>

                    <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-3 p-0">
                        {gbp.stats.map((stat) => (
                            <li
                                key={stat.label}
                                className="min-w-0 rounded-md border border-white/[0.11] bg-white/[0.04] px-4 py-5"
                            >
                                <p className="m-0 text-xs font-semibold tracking-[0.08em] text-white/50 uppercase">
                                    {stat.label}
                                </p>

                                <p
                                    className={`m-0 mt-3.5 font-display text-h4 leading-none font-extrabold ${
                                        isHighlighted(stat) ? "text-teal-300" : "text-white"
                                    }`}
                                >
                                    {stat.value}
                                </p>

                                <p
                                    className={`m-0 mt-2.5 text-[0.8125rem] leading-snug ${
                                        isGrowth(stat) ? "text-teal-300" : "text-white/45"
                                    }`}
                                >
                                    {stat.note}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
