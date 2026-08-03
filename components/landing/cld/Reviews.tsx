import Image from "next/image";

import { IMG, reviews } from "@/content/landing/creative-logo-design";
import Rail from "@/components/ui/Rail";
import { StarIcon } from "@/components/ui/icons";

/**
 * Fourteen named client reviews, in the site's scroll-snap rail.
 *
 * Three things change and none of them is a word:
 *
 * - **The rating.** The live page prints five ❇️ emoji in a `<p>`. That is a
 *   sparkle, and a screen reader reads it as "sparkle" five times. Here it is
 *   the same `role="img"` star row every other rating on the site uses.
 * - **The carousel.** Bootstrap's carousel is replaced by `<Rail>` — all
 *   fourteen quotes are in the server-rendered HTML either way, but the rail
 *   needs no JS to be readable and its dots cannot desync.
 * - **The images.** The live page serves 2084px JPEGs (up to 1.1MB each) as
 *   64px circles. They are the clients' logos, and since the reviewer's name is
 *   already in the `<cite>` beside them they are decorative here.
 *
 * NOT marked up as `Review`/`AggregateRating` — see docs/SEO-PLAYBOOK.md.
 * Self-hosted reviews about your own business are ineligible for review rich
 * results and marking them up risks a manual action. Real names clear the
 * `author.name` blocker; they do not clear the self-serving one.
 */
export default function Reviews() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-70"
                aria-hidden="true"
            />

            <div className="container-site">
                <h2 className="reveal mb-10 text-center text-h2">{reviews.title}</h2>

                <Rail
                    label="Client reviews"
                    count={reviews.items.length}
                    itemNoun="review"
                    showDots
                    align="between"
                >
                    {reviews.items.map((review) => (
                        <figure
                            key={review.name}
                            className="flex w-[min(100%,34rem)] flex-col rounded-lg border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
                        >
                            <div
                                className="mb-4 inline-flex gap-[3px] text-star"
                                role="img"
                                aria-label="5 out of 5 stars"
                            >
                                {Array.from({ length: 5 }, (_, i) => (
                                    <StarIcon key={i} filled />
                                ))}
                            </div>

                            <blockquote className="flex-1 text-white/75">
                                &ldquo;{review.quote}&rdquo;
                            </blockquote>

                            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                                <Image
                                    src={`${IMG}/reviews/${review.avatar}.webp`}
                                    alt=""
                                    aria-hidden="true"
                                    width={160}
                                    height={160}
                                    sizes="48px"
                                    className="size-12 shrink-0 rounded-full bg-white/90 object-contain p-1"
                                />
                                <cite className="font-display text-sm font-extrabold tracking-[0.06em] text-white uppercase not-italic">
                                    {review.name}
                                </cite>
                            </figcaption>
                        </figure>
                    ))}
                </Rail>
            </div>
        </section>
    );
}
