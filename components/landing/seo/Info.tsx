import { info } from "@/content/landing/seo-services";

/**
 * Info — "What Is SEO — and Why Does It Matter?"
 *
 * Two columns at `lg`: the explanation on the left, a stats card with a dark
 * pull-quote beneath it on the right. Below `lg` they stack in that order,
 * which keeps the prose ahead of the numbers that support it.
 *
 * The quote card is dark on an otherwise white section — that inversion is the
 * live design and is deliberate, not a stray token.
 *
 * The live CSS scales `.nx-seo-main-title` 40 → 48 → 34 → 22px and
 * `.nx-seo-quote-text` 15 → 21 → 18px as the viewport *narrows*, so the desktop
 * breakpoint is smaller than the tablet one in both cases. That is a bug in the
 * template's cascade rather than an intent worth porting; both use the design
 * system's fluid scale here instead, which lands on the same sizes everywhere
 * the live page is self-consistent.
 */
export default function Info() {
    return (
        <section className="bg-white py-[clamp(3.75rem,2.5rem+4vw,6.875rem)]">
            <div className="container-site grid items-start gap-[clamp(2.5rem,1.5rem+4vw,3.75rem)] lg:grid-cols-2">
                {/* ---------------------------------------------------- copy -- */}
                <div>
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {info.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-h2 font-extrabold text-seo-ink">
                        {info.titleLead}
                        <br />
                        {info.titleTrail}
                    </h2>

                    <div className="mt-8 space-y-7">
                        {info.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-body leading-[1.9] text-seo-body">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* --------------------------------------------- stats + quote -- */}
                <div className="space-y-[clamp(1.5rem,1rem+1.6vw,2.1875rem)]">
                    <div className="rounded-[28px] bg-seo-card p-6 sm:p-8 lg:p-10">
                        <h3 className="font-display text-xs font-bold tracking-[0.14em] text-seo-coral uppercase">
                            {info.statsHeading}
                        </h3>

                        <ul className="m-0 mt-8 list-none divide-y divide-black/[0.08] p-0">
                            {info.stats.map((stat) => (
                                <li
                                    key={stat.value}
                                    className="flex flex-col gap-2.5 py-7 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-5"
                                >
                                    <p className="m-0 font-display text-[clamp(2.125rem,1.7rem+1vw,2.625rem)] leading-none font-extrabold text-seo-coral sm:min-w-[75px] lg:min-w-[90px]">
                                        {stat.value}
                                    </p>
                                    <p className="m-0 min-w-0 text-sm leading-[1.8] text-seo-body sm:text-[0.9375rem]">
                                        {stat.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <figure className="m-0 rounded-[26px] bg-seo-ink p-7 sm:p-10 lg:p-[2.8125rem]">
                        <blockquote className="m-0 text-[clamp(1rem,0.94rem+0.3vw,1.125rem)] leading-[1.8] font-bold text-white">
                            {info.quote}
                        </blockquote>
                        <figcaption className="mt-7 font-display text-[0.9375rem] font-bold tracking-[0.13em] text-seo-coral">
                            {info.quoteAuthor}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
