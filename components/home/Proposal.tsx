import Image from "next/image";

import { proposal } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import EnquiryForm from "@/components/forms/EnquiryForm";

/**
 * Proposal band — the last section before the footer, and the page's second
 * conversion point.
 *
 * Two columns on desktop, the same 5/7 split as the `Challenges` section above
 * it: the pitch and its three benefits on the left, a white enquiry card on the
 * right. Both stack to one column below `lg`.
 *
 * The card is the hero's card, not a second design of one — same
 * `components/forms/EnquiryForm`, same five fields, same gradient cap. What
 * differs is the head above it and the submit label, both from `content/home.ts`,
 * and the `source` it posts, which is what tells the two apart in the team's
 * notification email.
 *
 * The band used to render `ProposalForm`'s seven dark fields on a photograph.
 * Both went: the approved design draws this card white on a flat dark canvas,
 * and a visitor who has scrolled the whole page should not meet a second,
 * longer version of the form they already skipped in the fold.
 *
 * `source` is required, not defaulted, because this band closes `/about-us` as
 * well as the homepage — the design shares it, exactly as the Blade template
 * `@include`s one partial on both pages. A default would silently label About
 * Us enquiries as the homepage in the team's notification email, and the third
 * page to render this would inherit that same wrong label. See
 * `ENQUIRY_SOURCES` in app/actions/forms.ts for the keys.
 */
export default function Proposal({
    source,
}: {
    source: "home-proposal" | "about-proposal";
}) {
    return (
        <section
            id="proposal"
            className="relative isolate overflow-hidden bg-ink-950 py-section text-white"
        >
            {/* Brand glow, then grain over it, so the near-black canvas never
                reads as flat black. Both decorative. Lighter than the
                `Challenges` band above so the two dark sections read as two. */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-mesh opacity-35"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-[0.18] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative z-[1] container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                {/* ------------------------------ left ------------------------------ */}
                <div className="reveal max-lg:text-center">
                    <Eyebrow className="max-lg:justify-center max-lg:[&>span]:hidden">
                        {proposal.eyebrow}
                    </Eyebrow>

                    {/* Sized locally rather than with `text-h2`, same as the
                        `Challenges` heading above. `text-h2` tops out at 56px,
                        which is wider than this 5/12 column can hold: it breaks
                        "Free" off onto the line above and leaves the accent
                        phrase split across two lines. Capped at 2.9rem the
                        heading keeps the design's three-line shape, with
                        "Free Expert Proposal" whole on its own line. */}
                    <h2 className="text-[clamp(1.75rem,0.9rem+2.55vw,2.9rem)] leading-[1.12] tracking-[-0.02em] text-white">
                        {proposal.titleLead}{" "}
                        {/* `block`, so the gradient phrase always starts a line
                            of its own — the design's composition, and not
                            something wrapping can produce on its own here:
                            "Free Expert Proposal" is wider than "Project with
                            a Free", so no column width both breaks the one and
                            fits the other. */}
                        <span className="gradient-text block">
                            {proposal.titleAccent}
                        </span>
                    </h2>

                    <span
                        className="mt-5 block h-0.5 w-[clamp(28px,6vw,60px)] rounded-sm bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] max-lg:hidden"
                        aria-hidden="true"
                    />

                    <p className="mt-6 max-w-[46ch] text-lead text-white/70 max-lg:mx-auto">
                        {proposal.lead}
                    </p>

                    <ul className="mt-10 grid gap-7 max-lg:text-start">
                        {proposal.benefits.map((benefit) => (
                            <li
                                key={benefit.title}
                                className="flex items-start gap-4 sm:gap-5"
                            >
                                {/* `unoptimized`: the export is a 59px icon and
                                    already under 1KB, so a resize pipeline has
                                    nothing to take off it. Same call the
                                    Challenges pillars make. */}
                                <Image
                                    src={benefit.icon}
                                    alt={benefit.iconAlt}
                                    width={59}
                                    height={59}
                                    unoptimized
                                    className="size-13 shrink-0 sm:size-14"
                                />
                                <div className="min-w-0">
                                    <h3 className="font-display text-h5 font-bold text-white">
                                        {benefit.title}
                                    </h3>
                                    <p className="mt-1 text-body text-white/65">
                                        {benefit.body}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ------------------------------ right ----------------------------- */}
                <div className="reveal overflow-hidden rounded-sm bg-white shadow-[0_30px_80px_-30px_rgb(0_0_0/0.65)]">
                    {/* The gradient cap, as on the hero card. A block rather
                        than a border so it keeps its full weight at every
                        width. */}
                    <div
                        className="h-[5px] w-full bg-[linear-gradient(90deg,var(--color-violet-500)_0%,var(--color-magenta-500)_55%,var(--color-magenta-300)_100%)]"
                        aria-hidden="true"
                    />

                    <div className="p-[clamp(1.25rem,0.75rem+1.6vw,2rem)]">
                        <div className="flex items-start gap-4">
                            <Image
                                src={proposal.form.icon}
                                alt={proposal.form.iconAlt}
                                width={64}
                                height={64}
                                unoptimized
                                className="size-13 shrink-0 sm:size-15"
                            />
                            <div className="min-w-0">
                                <h3 className="font-display text-[clamp(1.3rem,1.05rem+0.8vw,1.7rem)] leading-tight font-extrabold text-onlight">
                                    {proposal.form.title}
                                </h3>
                                <p className="mt-1.5 text-[0.9rem] leading-[1.5] text-onlight-muted">
                                    {proposal.form.sub}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <EnquiryForm
                                source={source}
                                submitLabel={proposal.form.submit}
                                assurances={proposal.form.assurances}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
