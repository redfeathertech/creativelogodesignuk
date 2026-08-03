import { difference } from "@/content/landing/seo-services";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Difference — the two-column "them vs us" comparison.
 *
 * Left card is the big-agency experience (red crosses), right card is ours
 * (green ticks, coral border, gradient badge). The live page renders both
 * titles as `h3` inside a section whose own title is an `h2`, so the level
 * ladder is already correct and carries over unchanged.
 *
 * The badge is the one place the live CSS could not be copied literally: it is
 * `white-space:nowrap` there because the template's brand name is one short
 * word. Ours is three, so the pill wraps and the highlighted card carries extra
 * top padding below `md` to leave room for the second line.
 */

/* fa-xmark — the red list marker. Drawn to the same 20px box as CheckIcon so
   the two lists' markers sit on the same optical baseline. */
const CrossIcon = ({ className }: { className?: string }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={className}
    >
        <path
            d="M5.5 5.5l9 9M14.5 5.5l-9 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

const card =
    "relative rounded-[24px] border-2 px-[clamp(1.375rem,0.75rem+2.1vw,2.375rem)] " +
    "pb-[clamp(2rem,1.55rem+1.4vw,2.625rem)]";

const cardTitle =
    "font-display text-sm font-extrabold tracking-[0.14em] uppercase";

const list = "m-0 mt-8 list-none space-y-5 p-0";

const item = "flex gap-3 text-body leading-[1.8] text-seo-body";

const marker = "mt-[0.35rem] shrink-0";

export default function Difference() {
    return (
        <section className="bg-white py-[clamp(3.75rem,1.9rem+5.9vw,6.875rem)]">
            <div className="container-site">
                {/* ------------------------------------------------- heading -- */}
                <div className="mx-auto mb-[clamp(2.5rem,1.5rem+2.5vw,4.375rem)] max-w-[53.125rem] text-center">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {difference.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-h3 font-extrabold text-balance text-seo-ink">
                        {difference.titleLead}
                        <br />
                        {difference.titleTrail}
                    </h2>

                    <p className="mx-auto mt-6 max-w-[47.5rem] text-body leading-[1.9] text-seo-body">
                        {difference.description}
                    </p>
                </div>

                {/* --------------------------------------------------- cards -- */}
                <div className="mx-auto grid max-w-[62.5rem] gap-6 lg:grid-cols-2">
                    {/* ----------------------------------------------- them -- */}
                    <div
                        className={`${card} border-seo-border bg-white pt-[clamp(2rem,1.55rem+1.4vw,2.625rem)]`}
                    >
                        <h3 className={`${cardTitle} text-seo-body`}>
                            {difference.bad.title}
                        </h3>

                        <ul className={list}>
                            {difference.bad.points.map((point) => (
                                <li key={point} className={item}>
                                    <CrossIcon
                                        className={`${marker} text-[#ff5b5b]`}
                                    />
                                    <span className="min-w-0">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ------------------------------------------------- us -- */}
                    <div
                        className={`${card} border-seo-coral bg-seo-coral/[0.03] pt-[3.25rem] md:pt-[2.625rem]`}
                    >
                        <p className="gradient-seo absolute -top-4 left-1/2 m-0 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full px-6 py-2.5 text-center font-display text-[0.625rem] leading-[1.4] font-bold tracking-[0.14em] text-white uppercase sm:text-xs">
                            {difference.good.badge}
                        </p>

                        <h3 className={`${cardTitle} text-seo-coral`}>
                            {difference.good.title}
                        </h3>

                        <ul className={list}>
                            {difference.good.points.map((point) => (
                                <li key={point} className={item}>
                                    <CheckIcon
                                        className={`${marker} text-[#7acb62]`}
                                    />
                                    <span className="min-w-0">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
