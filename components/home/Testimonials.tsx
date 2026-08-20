import { testimonials } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import Rail from "@/components/ui/Rail";
import TestimonialCard from "./TestimonialCard";

/**
 * Testimonials.
 *
 * Deliberately NOT marked up as Review/AggregateRating — see
 * docs/SEO-PLAYBOOK.md. Self-hosted reviews about your own business are
 * ineligible for review rich results on Organization/LocalBusiness, so marking
 * them up risks a manual action rather than winning stars in the SERP.
 *
 * The band is centred rather than split down the middle: the 360px quote mark
 * that used to hold its own column beside the rail is gone, and the same glyph
 * now sits in the corner of each card. That hands the rail the full width, so
 * three cards read at once on a laptop instead of two and a sliver. Every word
 * of copy is unchanged; the lead under the heading is the one addition, and it
 * comes from the approved design.
 *
 * One dot per reachable scroll position — see Rail. Prev/next arrows float
 * over the left and right edges of the rail from 768px up; below that the
 * gutters are too narrow for a half-overhanging 52px circle, so a phone swipes
 * the rail or taps a dot — each dot is a real button.
 */
export default function Testimonials() {
    return (
        <section className="bg-mist-100 py-section text-onlight">
            <div className="container-site">
                {/* Same centred head as components/home/Methodology.tsx: a
                    flanked eyebrow, the two-tone title, the brand rule, then
                    the lead. */}
                <div className="reveal mx-auto max-w-[52rem] text-center">
                    <Eyebrow flanked className="text-magenta-500">
                        {testimonials.eyebrow}
                    </Eyebrow>

                    <h2 className="text-h2">
                        {testimonials.titleLead}{" "}
                        <span className="gradient-text-brand">
                            {testimonials.titleAccent}
                        </span>
                    </h2>

                    <span
                        aria-hidden="true"
                        className="mx-auto mt-5 block h-0.5 w-[clamp(28px,6vw,60px)] rounded-sm bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]"
                    />

                    <p className="mx-auto mt-6 max-w-[56ch] text-lead text-pretty text-onlight-muted">
                        {testimonials.lead}
                    </p>
                </div>

                {/* Capped at exactly three cards plus their two gaps —
                    3 x 21.5rem + 2 x 1.5rem = 67.5rem — so the row ends on a
                    card edge instead of slicing the third one.
                    `container-site` runs to 1560px, which would put four and a
                    half cards on the row and leave the head floating over a
                    band twice its width.

                    `grid-cols-[minmax(0,1fr)]` is load-bearing, not decoration:
                    a grid item defaults to `min-width: auto` — its min-content
                    size — and the rail's slides are `flex: 0 0 auto`, so their
                    min-content is the full card, which blows the column out
                    past the viewport and pushes the whole document sideways on
                    a phone. */}
                <div className="reveal mx-auto mt-12 grid max-w-[67.5rem] grid-cols-[minmax(0,1fr)]">
                    <Rail
                        label="Client testimonials"
                        count={testimonials.items.length}
                        showDots
                        navPlacement="sides"
                        itemNoun="testimonial"
                        tone="light"
                    >
                        {testimonials.items.map((item) => (
                            <TestimonialCard
                                key={item.name + item.dateISO}
                                name={item.name}
                                date={item.date}
                                dateISO={item.dateISO}
                                stars={item.stars}
                                body={item.body}
                                mark={testimonials.mark}
                                markAlt={testimonials.markAlt}
                            />
                        ))}
                    </Rail>
                </div>
            </div>
        </section>
    );
}
