import Image from "next/image";
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
 * One dot per reachable scroll position — see Rail. The live site renders ten
 * indicators for five slides, so half of them do nothing.
 */
export default function Testimonials() {
    return (
        <section className="bg-mist-100 py-section text-onlight">
            {/* `grid-cols-[minmax(0,1fr)]` is load-bearing, not decoration. Below `lg:`
          this is a single-column grid, and a grid item defaults to
          `min-width: auto` — its min-content size. The rail's slides are
          `flex: 0 0 auto`, so their min-content is the full card, which blew
          the implicit column out past the viewport and pushed the whole
          document sideways on every phone. The `lg:` template already guards
          against this with `minmax(0, …)`; the mobile one has to as well. */}
            <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-[clamp(2rem,1.5rem+4vw,4rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
                <div className="reveal">
                    <Image
                        src={testimonials.mark}
                        alt=""
                        aria-hidden="true"
                        width={360}
                        height={360}
                        sizes="(max-width: 992px) 70vw, 320px"
                        className="mx-auto h-auto w-[min(320px,70%)]"
                    />
                </div>

                <div className="reveal">
                    <Eyebrow className="text-magenta-500">
                        {testimonials.eyebrow}
                    </Eyebrow>
                    <h2 className="text-h2">
                        {testimonials.titleLead}{" "}
                        <span className="gradient-text-brand">
                            {testimonials.titleAccent}
                        </span>
                    </h2>

                    <div className="mt-8">
                        <Rail
                            label="Client testimonials"
                            count={testimonials.items.length}
                            showDots
                            align="between"
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
                                />
                            ))}
                        </Rail>
                    </div>
                </div>
            </div>
        </section>
    );
}
