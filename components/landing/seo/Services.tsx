import { services } from "@/content/landing/seo-services";
import { SeoIcon } from "./icons";

/**
 * Services — the industries marquee and the six "what's included" cards.
 *
 * The marquee is CSS only. The live page hard-codes its fourteen industries
 * twice inside one track and slides it -50%; here the list is held once in the
 * content module and rendered as two passes, the second `aria-hidden`, so the
 * loop is still seamless but a screen reader reads fourteen items rather than
 * twenty-eight. `animate-marquee` translates a pass by its own width plus the
 * flex gap, which is why `--marquee-gap` has to match the `gap-10` beside it.
 *
 * The label column is `min-w-max` and the track `min-w-0 flex-1`, so at 320px
 * the strip gives the label whatever it needs and the marquee runs in what is
 * left instead of forcing the row wider than the screen.
 */
export default function Services() {
    return (
        <section className="bg-white pb-[clamp(3.75rem,2.4rem+4.2vw,6.875rem)]">
            {/* ------------------------------------------ industries rail -- */}
            <div className="mb-[clamp(3.4375rem,2.5rem+3vw,5.625rem)] flex items-center overflow-hidden border-y border-seo-border bg-seo-card">
                <p className="m-0 min-w-max shrink-0 border-r border-seo-border px-[18px] py-4 font-display text-[0.6875rem] font-extrabold tracking-[0.16em] text-seo-body uppercase sm:px-[30px] sm:py-[18px] sm:text-sm sm:tracking-[0.2em]">
                    {services.railTitle}
                </p>

                <div className="flex min-w-0 flex-1 gap-10 overflow-hidden [--marquee-gap:2.5rem]">
                    {[0, 1].map((pass) => (
                        <div
                            key={pass}
                            aria-hidden={pass === 1}
                            className="flex min-w-full shrink-0 animate-marquee items-center gap-10 motion-reduce:animate-none"
                        >
                            {services.railItems.map((item) => (
                                <span
                                    key={item}
                                    className="relative shrink-0 text-xs font-bold whitespace-nowrap text-seo-body after:absolute after:top-1/2 after:right-[-1.375rem] after:-translate-y-1/2 after:text-seo-coral after:content-['•'] sm:text-sm"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-site">
                {/* -------------------------------------------- heading -- */}
                <div className="mx-auto mb-[clamp(1.875rem,0.5rem+5.5vw,4.375rem)] max-w-[820px] text-center">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {services.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-[clamp(1.375rem,0.95rem+1.9vw,2.5rem)] leading-[1.2] font-extrabold text-seo-ink">
                        {services.titleLead} <br className="hidden md:inline" />
                        {services.titleTrail}
                    </h2>

                    <p className="mx-auto mt-6 max-w-[760px] text-sm leading-[1.6] text-seo-body sm:text-base sm:leading-[1.9]">
                        {services.description}
                    </p>
                </div>

                {/* ---------------------------------------------- cards -- */}
                <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                    {services.items.map((item) => (
                        <li
                            key={item.title}
                            className="flex h-full items-start gap-[18px] rounded-[22px] border border-seo-border bg-white px-5 py-6 transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:px-6 sm:py-7"
                        >
                            <span className="grid size-[52px] shrink-0 place-items-center rounded-[14px] bg-seo-coral/[0.08]">
                                <SeoIcon name={item.icon} className="size-5 text-seo-coral" />
                            </span>

                            <div className="min-w-0">
                                <h3 className="font-display text-h5 leading-[1.4] font-extrabold text-seo-ink">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-[0.9375rem] leading-[1.8] text-seo-body">
                                    {item.text}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
