import { trust } from "@/content/landing/seo-services";
import { SeoIcon } from "./icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * The custom-plans banner and the four trust signals under it.
 *
 * The live page runs two edge-to-edge dark bands here — `#121212` for the
 * banner and `#1c1c1c` for the feature strip — which reads as a footer
 * dropped into the middle of a white page. One dark banner carries the
 * message; the four signals sit on the page's own white canvas, where the
 * pink icon discs stand out instead of being swallowed by a second near-black.
 *
 * The banner CTA is `href="#"` on the live page, like every other CTA there.
 * It opens the quote dialog, tagged with the banner's own name.
 */
export default function Trust() {
    return (
        <section className="bg-white py-[clamp(2rem,1.25rem+3vw,3.5rem)]">
            <div className="container-site">
                {/* -------------------------------------------------- banner -- */}
                <div className="flex flex-col items-center justify-center gap-6 rounded-[25px] bg-seo-ink px-6 py-8 text-center sm:px-10 lg:flex-row lg:gap-[30px] lg:text-left">
                    <p className="m-0 max-w-2xl text-[0.9375rem] leading-[1.6] font-medium text-white sm:text-[1.0625rem]">
                        {trust.bannerText}
                    </p>

                    <QuoteButton
                        packageName={trust.bannerText}
                        variant="seo"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        {trust.bannerCta}
                    </QuoteButton>
                </div>

                {/* ------------------------------------------------ features -- */}
                <ul className="m-0 mt-[clamp(1.75rem,1rem+2vw,2.5rem)] grid list-none grid-cols-1 gap-x-6 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
                    {trust.features.map((feature) => (
                        <li key={feature.title} className="flex items-center gap-3.5">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-seo-pink/[0.12]">
                                <SeoIcon name={feature.icon} className="size-5 text-seo-pink" />
                            </span>
                            <h3 className="m-0 min-w-0 font-display text-sm leading-[1.5] font-semibold tracking-[0.05em] text-seo-ink">
                                {feature.title}
                            </h3>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
