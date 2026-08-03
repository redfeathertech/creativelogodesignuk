import Image from "next/image";
import { testimonials } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import Rail from "@/components/ui/Rail";
import { StarIcon } from "@/components/ui/icons";

/**
 * Testimonials.
 *
 * Deliberately NOT marked up as Review/AggregateRating — see
 * docs/SEO-PLAYBOOK.md. These have no named authors (only job titles), and
 * self-hosted reviews about your own business are ineligible for review rich
 * results on Organization/LocalBusiness. Marking them up risks a manual action.
 *
 * One dot per slide: the live site renders ten indicators for five slides, so
 * half of them do nothing.
 */
export default function Testimonials() {
  return (
    <section className="bg-mist-100 py-section text-onlight">
      {/* `grid-cols-[minmax(0,1fr)]` is load-bearing, not decoration. Below `lg:`
          this is a single-column grid, and a grid item defaults to
          `min-width: auto` — its min-content size. The rail's slides are
          `flex: 0 0 auto`, so their min-content is the full 46rem card, which
          blew the implicit column out to 945px and pushed the whole document
          sideways on every phone. The `lg:` template already guards against this
          with `minmax(0, …)`; the mobile one has to as well. */}
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
          <Eyebrow className="text-magenta-500">{testimonials.eyebrow}</Eyebrow>
          <h2 className="text-h2">
            {testimonials.titleLead}{" "}
            <span className="gradient-text-brand">{testimonials.titleAccent}</span>
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
                <figure
                  key={item.quote}
                  className="w-[min(100%,46rem)] rounded-lg border border-ink-900/[0.07] bg-white p-8 shadow-md"
                >
                  <div
                    className="mb-4 inline-flex gap-[3px] text-star"
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

                  <p className="mb-6 text-onlight-muted">{item.body}</p>

                  <figcaption className="flex flex-col gap-0.5">
                    <cite className="font-display text-sm font-extrabold tracking-[0.06em] text-onlight uppercase not-italic">
                      {item.role}
                    </cite>
                    <span className="text-sm text-onlight-muted">{item.org}</span>
                  </figcaption>
                </figure>
              ))}
            </Rail>
          </div>
        </div>
      </div>
    </section>
  );
}
