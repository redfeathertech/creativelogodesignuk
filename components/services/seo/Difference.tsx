import { difference } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Difference — the two-column "them vs us" comparison, on the light surface.
 *
 * Left card is the big-agency experience (red crosses), right card is ours
 * (green ticks, a brand-gradient badge and a magenta ring). The live page
 * renders both titles as `h3` inside a section whose own title is an `h2`, so
 * the level ladder is already correct and carries over unchanged.
 *
 * The badge is `white-space:nowrap` on the live page because the template's
 * brand name is one short word. Ours is three, so the pill wraps and the
 * highlighted card carries extra top padding below `md` to leave room for the
 * second line.
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

const cardTitle = "font-display text-sm font-extrabold tracking-[0.14em] uppercase";
const list = "m-0 mt-8 list-none grid gap-5 p-0";
const item = "flex gap-3 text-onlight-muted";
const marker = "mt-1 shrink-0";

export default function Difference() {
    return (
        <Section tone="light">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow className="justify-center text-magenta-500">
                        {difference.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={difference.titleLead}
                        accent={difference.titleTrail}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-onlight-muted">
                        {difference.description}
                    </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-[62.5rem] gap-6 lg:grid-cols-2">
                    {/* ----------------------------------------------- them -- */}
                    <div className="reveal rounded-lg border border-ink-900/[0.08] bg-white p-8 shadow-sm">
                        <h3 className={`${cardTitle} text-onlight-muted`}>
                            {difference.bad.title}
                        </h3>

                        <ul className={list}>
                            {difference.bad.points.map((point) => (
                                <li key={point} className={item}>
                                    <CrossIcon className={`${marker} text-[#ff5b5b]`} />
                                    <span className="min-w-0">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ------------------------------------------------- us -- */}
                    <div className="reveal relative rounded-lg bg-white p-8 pt-14 shadow-md ring-[1.5px] ring-magenta-500 ring-inset md:pt-11">
                        <p className="absolute -top-4 left-1/2 m-0 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] px-6 py-2.5 text-center font-display text-ui-10 leading-[1.4] font-bold tracking-[0.14em] text-white uppercase sm:text-xs">
                            {difference.good.badge}
                        </p>

                        <h3 className={`${cardTitle} text-magenta-500`}>
                            {difference.good.title}
                        </h3>

                        <ul className={list}>
                            {difference.good.points.map((point) => (
                                <li key={point} className={item}>
                                    <CheckIcon className={`${marker} text-teal-600`} />
                                    <span className="min-w-0">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
}
