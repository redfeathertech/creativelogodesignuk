import Image from "next/image";

import { contact } from "@/content/site";
import { hero, heroForm } from "@/content/landing/seo-services";
import { serviceDefaults } from "@/content/services/defaults";
import { Eyebrow } from "@/components/ui/Section";
import { btn } from "@/components/ui/button";
import EnquiryForm from "./EnquiryForm";
import { QuoteButton } from "./QuoteDialog";

/**
 * Hero — the only H1 on the page, rebuilt on the shared service-page hero.
 *
 * Same frame as `components/services/Hero.tsx`: the `ink-950` canvas, the brand
 * mesh, the shared banner photograph at 30% behind it, an eyebrow bar over an
 * H1 whose second half carries `gradient-text`, and a 6fr/5fr split with the
 * artwork on the right. The stats sit under the copy as a `<dl>`, the way
 * `Advantages` sets its four figures on every other service page.
 *
 * The right column is explicitly a **mockup**: browser chrome, a search bar and
 * a ranked result illustrating what ranking looks like. It describes no real
 * client, and it is `aria-hidden` because reading "SPONSORED /
 * https://yourbusiness.com / #1 RANKING" aloud communicates nothing without the
 * visual framing. The four stats beneath the copy are real content and stay in
 * the accessibility tree.
 *
 * The enquiry form takes the slot the quick-link tiles occupy on the other
 * service pages — the same glass panel (`bg-ink-950/70`, a hairline ring and a
 * backdrop blur) pinned below the fold-line of the hero grid. It is the live
 * page's third hero column; a full-width panel is what stops a 6-field form
 * from being squeezed into a third of the container.
 */
export default function Hero() {
    const { banner } = serviceDefaults.hero;

    return (
        <section className="relative overflow-hidden bg-ink-950 py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 bg-mesh opacity-70"
                aria-hidden="true"
            />
            <Image
                src={banner.src}
                alt=""
                aria-hidden="true"
                width={banner.width}
                height={banner.height}
                // Above the fold, like the banner on every other service page.
                preload
                sizes="100vw"
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-30"
            />

            <div className="relative container-site">
                <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] [&>*]:min-w-0">
                    {/* ---------------------------------------------------- copy -- */}
                    <div className="reveal">
                        <Eyebrow>{hero.titleAccent}</Eyebrow>

                        <h1 className="text-h1 text-white">
                            {hero.titleLead}{" "}
                            <span className="gradient-text">{hero.titleAccent}</span>
                        </h1>

                        <p className="mt-6 max-w-[58ch] text-lead text-white/65">
                            {hero.description}
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <QuoteButton
                                packageName={hero.titleAccent}
                                variant="primary"
                                size="lg"
                            >
                                {hero.ctaPrimary}
                            </QuoteButton>
                            <a href={`tel:${contact.phoneE164}`} className={btn("ghost", "lg")}>
                                {hero.ctaPhone}
                            </a>
                        </div>

                        <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                            {hero.stats.map((stat) => (
                                <div key={stat.label}>
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd>
                                        <p className="gradient-text font-display text-h3 leading-none font-extrabold break-words">
                                            {stat.value}
                                        </p>
                                        <p className="mt-2 text-sm text-white/65">{stat.label}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* -------------------------------------------------- mockup -- */}
                    <div
                        aria-hidden="true"
                        className="reveal rounded-xl border border-white/[0.11] bg-white/[0.02] p-6 backdrop-blur-md sm:p-8"
                    >
                        <div className="mb-6 flex items-center gap-2">
                            <span className="size-3.5 shrink-0 rounded-full bg-[#ff5f57]" />
                            <span className="size-3.5 shrink-0 rounded-full bg-[#febc2e]" />
                            <span className="size-3.5 shrink-0 rounded-full bg-[#28c840]" />
                            <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-white/[0.06] px-4 py-2 text-xs text-white/65">
                                {hero.mockup.query}
                            </span>
                        </div>

                        <p className="m-0 font-display text-[0.6875rem] font-bold tracking-[0.14em] text-white/45 uppercase">
                            {hero.mockup.sponsored}
                        </p>
                        <p className="m-0 mt-1 truncate text-sm text-white/65">
                            {hero.mockup.url}
                        </p>

                        <div className="relative mt-8 rounded-lg border border-magenta-500/60 bg-ink-950/60 p-5">
                            <span className="absolute -top-3.5 left-5 rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] px-3 py-1 text-[0.625rem] font-bold tracking-[0.06em] text-white">
                                {hero.mockup.badge}
                            </span>
                            <p className="m-0 mt-1 font-display text-base font-bold text-white">
                                {hero.mockup.title}
                            </p>
                            <p className="m-0 mt-2 text-sm leading-[1.6] text-white/65">
                                {hero.mockup.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ------------------------------------------------------ form -- */}
                <div className="reveal mt-section rounded-xl bg-ink-950/70 p-6 ring-1 ring-white/10 backdrop-blur-md sm:p-8 lg:p-10">
                    <div className="grid gap-[clamp(2rem,1.25rem+3vw,3.5rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start">
                        <div>
                            <h2 className="text-h3 text-white">{heroForm.title}</h2>
                            <p className="mt-4 max-w-[42ch] text-white/65">
                                {heroForm.description}
                            </p>
                        </div>

                        <EnquiryForm packageName={hero.titleAccent} />
                    </div>
                </div>
            </div>
        </section>
    );
}
