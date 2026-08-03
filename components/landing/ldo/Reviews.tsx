import { reviews } from "@/content/landing/logo-design-offer";
import { Section } from "@/components/ui/Section";
import { StarIcon } from "@/components/ui/icons";

/**
 * The six named reviews.
 *
 * Rendered as a plain grid, not a carousel: the live page shows two at a time
 * and cycles, so four are absent from the document at any moment.
 *
 * **No `Review` or `AggregateRating` markup**, deliberately — these are
 * unverifiable first-party testimonials, and self-serving review markup is the
 * exact pattern that earns a manual action. Same rule as the homepage
 * testimonials; see docs/SEO-PLAYBOOK.md.
 */
export default function Reviews() {
    return (
        <Section tone="dark">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[70ch] text-center">
                    <h2 className="text-h2 uppercase">{reviews.title}</h2>
                    <p className="mt-5 text-lead text-white/65">{reviews.lead}</p>
                </div>

                <ul className="mt-[clamp(2.5rem,1.5rem+4vw,4rem)] grid items-stretch gap-5 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {reviews.items.map((item) => (
                        <li
                            key={item.author}
                            className="reveal flex flex-col rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
                        >
                            <div
                                className="flex gap-1 text-teal-300"
                                role="img"
                                aria-label="5 out of 5 stars"
                            >
                                {Array.from({ length: 5 }, (_, i) => (
                                    <StarIcon key={i} filled />
                                ))}
                            </div>

                            <h3 className="mt-4 text-h5 font-bold text-white">{item.title}</h3>
                            <p className="mt-3 flex-1 text-white/70">{item.body}</p>
                            <p className="mt-5 font-display text-sm font-bold text-white">
                                {item.author}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
