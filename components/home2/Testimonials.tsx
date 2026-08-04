import Image from "next/image";

import { testimonials } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import Rail from "@/components/ui/Rail";
import { StarIcon } from "@/components/ui/icons";

/**
 * Testimonials (v2).
 *
 * Deliberately NOT marked up as Review/AggregateRating — see
 * docs/SEO-PLAYBOOK.md. These have no named authors (only job titles), and
 * self-hosted reviews about your own business are ineligible for review rich
 * results on Organization/LocalBusiness. Marking them up risks a manual
 * action. This is not an oversight and must not be "fixed".
 *
 * One dot per slide, from the shared `Rail`: the live site renders ten
 * indicators for five slides, so half of them do nothing.
 *
 * v2 changes the arrangement only — the quote mark goes oversized and sits
 * behind the heading rather than occupying its own column, which buys the
 * cards the full width of the section.
 */
export default function Testimonials() {
    return (
        <section className="relative isolate overflow-hidden bg-mist-100 py-section text-onlight">
            {/* `grid-cols-[minmax(0,1fr)]` is load-bearing, not decoration. This
                is a single-column grid, and a grid item defaults to
                `min-width: auto` — its min-content size. The rail's slides are
                `flex: 0 0 auto`, so their min-content is the full card, which
                blows the implicit column out and pushes the whole document
                sideways on every phone. */}
            <div className="relative z-[1] container-site grid grid-cols-[minmax(0,1fr)]">
                <div className="reveal relative mb-10 max-w-[60ch]">
                    <Image
                        src={testimonials.mark}
                        alt=""
                        aria-hidden="true"
                        width={360}
                        height={360}
                        sizes="220px"
                        className="pointer-events-none absolute -top-10 -left-6 -z-10 h-auto w-[clamp(120px,18vw,220px)] opacity-[0.13]"
                    />

                    <Eyebrow className="text-magenta-500">
                        {testimonials.eyebrow}
                    </Eyebrow>
                    <h2 className="text-h2">
                        {testimonials.titleLead}{" "}
                        <span className="gradient-text-brand">
                            {testimonials.titleAccent}
                        </span>
                    </h2>
                </div>

                <div className="min-w-0">
                    <Rail
                        label="Client testimonials"
                        count={testimonials.items.length}
                        showDots
                        align="between"
                        itemNoun="testimonial"
                        tone="light"
                    >
                        {testimonials.items.map((item) => (
                            <figure
                                key={item.quote}
                                className="flex w-[min(88vw,34rem)] flex-col rounded-lg border border-ink-900/[0.07] bg-white p-[clamp(1.5rem,1rem+2vw,2.5rem)] shadow-md"
                            >
                                <div
                                    className="mb-5 inline-flex gap-[3px] text-star"
                                    role="img"
                                    aria-label={`${item.stars} out of 5 stars`}
                                >
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <StarIcon key={i} filled={i < item.stars} />
                                    ))}
                                </div>

                                <blockquote className="mb-4 font-display text-h5 leading-[1.45] font-bold text-onlight">
                                    &ldquo;{item.quote}&rdquo;
                                </blockquote>

                                <p className="mb-6 text-onlight-muted">
                                    {item.body}
                                </p>

                                {/* mt-auto pins the attribution to the card floor,
                                    so a short quote and a long one still line
                                    their citations up across the rail. */}
                                <figcaption className="mt-auto flex flex-col gap-0.5 border-t border-ink-900/[0.07] pt-5">
                                    <cite className="font-display text-sm font-extrabold tracking-[0.06em] text-onlight uppercase not-italic">
                                        {item.role}
                                    </cite>
                                    <span className="text-sm text-onlight-muted">
                                        {item.org}
                                    </span>
                                </figcaption>
                            </figure>
                        ))}
                    </Rail>
                </div>
            </div>
        </section>
    );
}
