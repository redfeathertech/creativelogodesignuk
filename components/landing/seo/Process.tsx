import { process } from "@/content/landing/seo-services";

/**
 * Process — "From Audit to Page One in 4 Steps", on the dark canvas.
 *
 * The connecting rule is one absolutely-positioned hairline behind the row,
 * inset 10% either side so it stops short of the first and last circle rather
 * than running off the container. The live CSS parks it at `top: 74px`, which
 * is the centre of a 58px circle once Bootstrap's `gy-5` gutter margin has
 * collapsed through the wrapper; there is no collapsing here, so it is simply
 * placed at half the circle's height and the two agree visually.
 *
 * It is hidden below `lg`, where the steps sit two-up or stacked and a
 * horizontal line would connect nothing — the same breakpoint the live page
 * drops it at. Each item is `relative` so its circle paints over the rule.
 *
 * The eyebrow runs coral rather than the pink used on the light sections: that
 * is what the live CSS does on dark (`--rf-primary-light`), and pink on
 * near-black measures 3.7:1, under AA at this size.
 *
 * Step titles are `h3` on the live page too, so the levels run h2 → h3 unbroken.
 */
export default function Process() {
    return (
        <section className="overflow-hidden bg-seo-ink py-[clamp(3.75rem,2rem+5.5vw,6.875rem)]">
            <div className="container-site">
                {/* ------------------------------------------------- heading -- */}
                <div className="mb-[clamp(2.5rem,1.5rem+3.5vw,5.625rem)] text-center">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-coral uppercase">
                        {process.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-[clamp(1.375rem,1rem+1.9vw,2.5rem)] leading-[1.2] font-extrabold text-white">
                        {process.titleLead}
                        <br />
                        {process.titleTrail}
                    </h2>
                </div>

                {/* ------------------------------------------------ timeline -- */}
                <div className="relative">
                    {/* The rule the circles sit on. Decorative. */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-[10%] top-[1.8125rem] hidden h-px bg-white/15 lg:block"
                    />

                    <ol className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-12 p-0 md:grid-cols-2 lg:grid-cols-4">
                        {process.steps.map((step) => (
                            <li
                                key={step.number}
                                className="relative text-center"
                            >
                                <span className="mx-auto mb-7 flex size-[3.375rem] items-center justify-center rounded-full gradient-seo font-display text-base font-extrabold text-white sm:size-[3.625rem] sm:text-lg">
                                    {step.number}
                                </span>

                                <h3 className="font-display text-h5 leading-[1.3] font-extrabold text-white">
                                    {step.title}
                                </h3>

                                <p className="mx-auto mt-4 max-w-[16.25rem] text-sm leading-[1.8] text-white/60 lg:leading-[1.6]">
                                    {step.text}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
