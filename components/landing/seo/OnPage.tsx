import { contact } from "@/content/site";
import { onPage } from "@/content/landing/seo-services";
import { btn } from "@/components/ui/button";
import { QuoteButton } from "./QuoteDialog";

/**
 * OnPage — "Your Website, Optimised From the Ground Up".
 *
 * Two columns at `lg`: the pitch and its checklist on the left, a dark mocked-up
 * rankings dashboard on the right. Below `lg` they stack in that order, which
 * keeps the claim ahead of the evidence for it.
 *
 * The dashboard is a mockup but it is **not** `aria-hidden`: unlike the hero's
 * browser chrome, every row here is a sentence — "plumber near me, Position #1"
 * reads perfectly well without the visual framing, and the keyword set is the
 * clearest statement on the page of what the service actually targets. The
 * position pills therefore carry their status as text ("Position #4"), never as
 * colour alone; the green/amber tint is redundant reinforcement.
 *
 * Tone is data, so its classes are looked up from a literal map — Tailwind scans
 * source text and cannot see an interpolated class name.
 *
 * Two live-CSS details are deliberately not reproduced. The ranking rows drop to
 * a column below 375px via a hard breakpoint; `flex-wrap` gets the same result at
 * any width the keyword happens to need, so no breakpoint is needed. And the
 * heading over the card is `rgba(255,255,255,0.45)`, which lands just under 4.5:1
 * on `#121212` at 13px — it is set at 55% here, indistinguishable by eye and
 * legible.
 */

type Tone = (typeof onPage.rankings)[number]["tone"];

const tones: Record<Tone, string> = {
    good: "bg-seo-good/[0.12] text-seo-good",
    warn: "bg-seo-warn/[0.12] text-seo-warn",
};

/** Decorative tick, standing in for the live list's `::before { content: "✓" }`. */
function Tick({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
            <path
                d="m5 12.5 4.5 4.5L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function OnPage() {
    return (
        <section className="bg-white py-[clamp(3.75rem,2.5rem+4vw,6.875rem)]">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+4vw,3.75rem)] lg:grid-cols-2">
                {/* ---------------------------------------------------- copy -- */}
                <div>
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {onPage.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-h2 font-extrabold text-seo-ink">
                        {onPage.titleLead}
                        <br />
                        {onPage.titleTrail}
                    </h2>

                    <p className="mt-7 max-w-[37.5rem] text-body leading-[1.9] text-seo-body">
                        {onPage.description}
                    </p>

                    <ul className="m-0 mt-9 grid list-none gap-5 p-0">
                        {onPage.points.map((point) => (
                            <li
                                key={point}
                                className="flex items-start gap-3.5 text-body leading-[1.7] text-seo-ink"
                            >
                                <span
                                    aria-hidden="true"
                                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-seo-coral/[0.08] text-seo-coral"
                                >
                                    <Tick className="size-3.5" />
                                </span>
                                <span className="min-w-0">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <QuoteButton packageName={onPage.eyebrow} variant="seo" size="lg">
                            {onPage.ctaPrimary}
                        </QuoteButton>
                        <a
                            href={`tel:${contact.phoneE164}`}
                            className={btn("seo-outline", "lg")}
                        >
                            {onPage.ctaPhone}
                        </a>
                    </div>
                </div>

                {/* ----------------------------------------------- dashboard -- */}
                <div className="rounded-[26px] bg-seo-ink px-[1.125rem] py-6 sm:px-[1.625rem] sm:py-[2.125rem]">
                    <h3 className="text-[0.8125rem] leading-[1.5] text-white/55">
                        {onPage.rankingHeading}
                    </h3>

                    <ul className="m-0 mt-6 grid list-none gap-3 p-0">
                        {onPage.rankings.map((row) => (
                            <li
                                key={row.keyword}
                                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[14px] bg-white/[0.04] px-4 py-3.5"
                            >
                                <span className="min-w-0 text-sm font-semibold text-white sm:text-[0.9375rem]">
                                    {row.keyword}
                                </span>
                                <span
                                    className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold ${tones[row.tone]}`}
                                >
                                    {row.position}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="m-0 mt-4 flex items-start gap-2.5 rounded-xl border border-seo-good/[0.18] bg-seo-good/[0.05] px-[1.125rem] py-4 text-xs leading-[1.6] font-semibold text-seo-good sm:text-sm">
                        <Tick className="mt-0.5 size-3.5 shrink-0" />
                        <span className="min-w-0">{onPage.rankingFooter}</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
