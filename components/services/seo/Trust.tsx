import { trust } from "@/content/landing/seo-services";
import { Section } from "@/components/ui/Section";
import { SeoIcon } from "./icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * The custom-plans banner and the four trust signals under it.
 *
 * The live page runs two edge-to-edge near-black bands here, which read as a
 * footer dropped into the middle of a white page. On the service surface the
 * canvas is already dark, so the banner becomes the same hairline-ringed glass
 * panel the rest of the site uses for a callout, and the four signals sit on
 * the section's own ground with the brand-gradient icon discs `WhyChoose` uses.
 *
 * The banner CTA is `href="#"` on the live page, like every other CTA there.
 * It opens the quote dialog, tagged with the banner's own name.
 */
export default function Trust() {
    return (
        <Section tone="dark">
            <div className="container-site">
                {/* -------------------------------------------------- banner -- */}
                <div className="reveal flex flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.11] bg-white/[0.02] px-6 py-8 text-center backdrop-blur-md sm:px-10 lg:flex-row lg:gap-10 lg:text-left">
                    <p className="m-0 max-w-2xl text-lead text-white/80">{trust.bannerText}</p>

                    <QuoteButton
                        packageName={trust.bannerText}
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        {trust.bannerCta}
                    </QuoteButton>
                </div>

                {/* ------------------------------------------------ features -- */}
                <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-x-10 gap-y-8 p-0 min-[576px]:grid-cols-2 lg:grid-cols-4">
                    {trust.features.map((feature) => (
                        <li
                            key={feature.title}
                            className="reveal flex items-center gap-4 border-t border-white/[0.11] pt-8"
                        >
                            <span
                                aria-hidden="true"
                                className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                            >
                                <SeoIcon name={feature.icon} className="size-5" />
                            </span>
                            {/* `text-base`, not the `text-h5` the other card
                                titles use: four of these share one row at `lg`,
                                and at h5 "No Long-Term Contracts" and
                                "Dedicated Account Manager" both broke mid-word
                                in a 265px column. */}
                            <h3 className="m-0 min-w-0 font-display text-base leading-snug font-bold text-white">
                                {feature.title}
                            </h3>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
