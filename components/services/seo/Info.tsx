import { info } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * Info — "What Is SEO — and Why Does It Matter?"
 *
 * The light section in the service-page rhythm: `Eyebrow` in `magenta-500`, a
 * `SectionHeading` whose trailing half carries `gradient-text-brand`, and the
 * two-column split the live page uses — the explanation on the left, a stats
 * card with a dark pull-quote beneath it on the right. Below `lg` they stack in
 * that order, which keeps the prose ahead of the numbers that support it.
 *
 * The quote card stays dark on the light surface. That inversion is the live
 * design and it is also what `Section tone="dark"` would give it, so the card
 * borrows the same `ink-900` ground rather than a fifth palette.
 */
export default function Info() {
    return (
        <Section tone="light">
            <div className="container-site grid items-start gap-[clamp(2.5rem,1.5rem+4vw,4.5rem)] lg:grid-cols-2">
                {/* ---------------------------------------------------- copy -- */}
                <div className="reveal">
                    <Eyebrow className="text-magenta-500">{info.eyebrow}</Eyebrow>

                    <SectionHeading
                        lead={info.titleLead}
                        accent={info.titleTrail}
                        accentClassName="gradient-text-brand"
                    />

                    <div className="mt-8 grid gap-7">
                        {info.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="max-w-[62ch] text-onlight-muted">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* --------------------------------------------- stats + quote -- */}
                <div className="grid gap-6">
                    <div className="reveal rounded-lg border border-ink-900/[0.08] bg-mist-100 p-6 shadow-sm sm:p-8 lg:p-10">
                        <h3 className="font-display text-xs font-bold tracking-[0.14em] text-magenta-500 uppercase">
                            {info.statsHeading}
                        </h3>

                        <ul className="m-0 mt-8 list-none divide-y divide-ink-900/[0.08] p-0">
                            {info.stats.map((stat) => (
                                <li
                                    key={stat.value}
                                    className="flex flex-col gap-2.5 py-7 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-6"
                                >
                                    <p className="gradient-text-brand m-0 font-display text-h3 leading-none font-extrabold sm:min-w-[5.5rem]">
                                        {stat.value}
                                    </p>
                                    <p className="m-0 min-w-0 text-sm text-onlight-muted">
                                        {stat.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <figure className="reveal relative isolate m-0 overflow-hidden rounded-lg bg-ink-900 p-8 text-white sm:p-10">
                        <div
                            className="pointer-events-none absolute inset-0 -z-10 bg-mesh"
                            aria-hidden="true"
                        />
                        <blockquote className="m-0 text-lead font-bold text-white">
                            {info.quote}
                        </blockquote>
                        <figcaption className="mt-7 font-display text-sm font-bold tracking-[0.13em] text-magenta-300">
                            {info.quoteAuthor}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </Section>
    );
}
