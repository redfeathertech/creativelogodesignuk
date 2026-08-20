import { contact } from "@/content/site";
import { onPage } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { btn } from "@/components/ui/button";
import { QuoteButton } from "./QuoteDialog";

/**
 * OnPage — "Your Website, Optimised From the Ground Up".
 *
 * The `Solutions` two-column split, on the dark surface: the pitch and its
 * checklist on the left, a mocked-up rankings dashboard on the right. Below
 * `lg` they stack in that order, which keeps the claim ahead of the evidence
 * for it.
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
 */

type Tone = (typeof onPage.rankings)[number]["tone"];

const tones: Record<Tone, string> = {
    good: "bg-teal-500/[0.12] text-teal-300",
    warn: "bg-star/[0.12] text-star",
};

export default function OnPage() {
    return (
        <Section tone="dark">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2">
                {/* ---------------------------------------------------- copy -- */}
                <div className="reveal">
                    <Eyebrow>{onPage.eyebrow}</Eyebrow>
                    <SectionHeading lead={onPage.titleLead} accent={onPage.titleTrail} />

                    <p className="mt-6 max-w-[62ch] text-lead text-white/65">
                        {onPage.description}
                    </p>

                    <ul className="m-0 mt-9 grid list-none gap-5 p-0">
                        {onPage.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-white/80">
                                <span
                                    aria-hidden="true"
                                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                                >
                                    <CheckIcon className="size-3" />
                                </span>
                                <span className="min-w-0">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <QuoteButton packageName={onPage.eyebrow} variant="primary" size="lg">
                            {onPage.ctaPrimary}
                        </QuoteButton>
                        <a href={`tel:${contact.phoneE164}`} className={btn("ghost", "lg")}>
                            {onPage.ctaPhone}
                        </a>
                    </div>
                </div>

                {/* ----------------------------------------------- dashboard -- */}
                <div className="reveal min-w-0 rounded-xl border border-white/[0.11] bg-white/[0.02] p-6 backdrop-blur-md sm:p-8">
                    <h3 className="font-display text-sm font-bold tracking-[0.14em] text-white/55 uppercase">
                        {onPage.rankingHeading}
                    </h3>

                    <ul className="m-0 mt-6 grid list-none gap-3 p-0">
                        {onPage.rankings.map((row) => (
                            <li
                                key={row.keyword}
                                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-md bg-white/[0.04] px-4 py-3.5"
                            >
                                <span className="min-w-0 text-sm font-semibold text-white">
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

                    <p className="m-0 mt-4 flex items-start gap-3 rounded-md border border-teal-500/[0.18] bg-teal-500/[0.05] px-4 py-4 text-sm font-semibold text-teal-300">
                        <CheckIcon className="mt-0.5 size-3.5 shrink-0" />
                        <span className="min-w-0">{onPage.rankingFooter}</span>
                    </p>
                </div>
            </div>
        </Section>
    );
}
