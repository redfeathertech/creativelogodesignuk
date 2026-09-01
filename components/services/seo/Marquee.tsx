import { services } from "@/content/landing/seo-services";

/**
 * The "Industries We Serve" rail, rebuilt on the service pages' `Marquee`.
 *
 * Same frame as `components/services/Marquee.tsx`: one repeating line of
 * brand-gradient text on the `ink-950` band that separates two sections. The
 * label rides in front of it, as on the live page, so the strip still says what
 * the names in it are.
 *
 * The live markup hard-codes its fourteen industries twice inside one track to
 * fake a seamless loop. They are held once in the content module here and
 * rendered as two passes, the second `aria-hidden`, so a screen reader reads
 * fourteen items rather than twenty-eight. `animate-marquee` translates a pass
 * by its own width plus the flex gap, which is why `--marquee-gap` has to match
 * the `gap-12` beside it.
 *
 * The label column is `min-w-max` and the track `min-w-0 flex-1`, so at 320px
 * the strip gives the label whatever it needs and the marquee runs in what is
 * left instead of forcing the row wider than the screen.
 */
export default function Marquee() {
    return (
        <div className="flex items-center overflow-hidden border-y border-white/[0.11] bg-ink-950">
            <p className="m-0 min-w-max shrink-0 border-r border-white/[0.11] px-[18px] py-4 font-display text-ui-11 font-extrabold tracking-[0.16em] text-white/50 uppercase sm:px-8 sm:py-5 sm:text-sm sm:tracking-[0.2em]">
                {services.railTitle}
            </p>

            <div className="flex min-w-0 flex-1 gap-12 overflow-hidden [--marquee-gap:3rem] py-6">
                {[0, 1].map((pass) => (
                    <div
                        key={pass}
                        aria-hidden={pass === 1}
                        className="flex min-w-full shrink-0 animate-marquee items-center gap-12 motion-reduce:animate-none"
                    >
                        {services.railItems.map((item) => (
                            <span
                                key={item}
                                className="gradient-text shrink-0 font-display text-h5 font-extrabold whitespace-nowrap uppercase"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
