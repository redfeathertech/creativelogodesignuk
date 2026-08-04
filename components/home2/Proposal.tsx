import Image from "next/image";

import { proposal } from "@/content/home";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import ProposalForm from "@/components/forms/ProposalForm";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Proposal form on a glass card, with the pitch pinned alongside it (v2).
 *
 * `ProposalForm` is imported unchanged. It is shared with /contact-us, the
 * hero and the lead panel, and it is wired to one validation schema and one
 * server action — there is no version of this redesign that justifies touching
 * it.
 *
 * As with Results, the background moves from a CSS `background-image` to
 * `next/image`, so it actually goes through the image pipeline.
 *
 * `id="proposal"` is kept: it is an in-page anchor target, and dropping it
 * would break any link pointing at it.
 */
export default function Proposal() {
    return (
        <section
            id="proposal"
            className="relative isolate overflow-hidden bg-ink-950 py-section text-white"
        >
            <Image
                src={proposal.bg}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="absolute inset-0 -z-10 object-cover"
            />
            <div className="absolute inset-0 z-0 bg-mesh" aria-hidden="true" />
            <div
                className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgb(7_2_15/0.92),rgb(13_3_28/0.86))]"
                aria-hidden="true"
            />

            <div className="relative z-[1] container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="reveal min-w-0 lg:sticky lg:top-32">
                    <Eyebrow>{proposal.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={proposal.titleLead}
                        accent={proposal.titleAccent}
                    />
                    <p className="mt-6 max-w-[62ch] text-lead text-white/65">
                        {proposal.lead}
                    </p>

                    <ul className="mt-8 grid gap-4">
                        {proposal.benefits.map((benefit) => (
                            <li
                                key={benefit}
                                className="flex items-start gap-3 text-white/65"
                            >
                                <span
                                    className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-500"
                                    aria-hidden="true"
                                >
                                    <CheckIcon className="size-3" />
                                </span>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="reveal glass min-w-0 rounded-xl p-[clamp(1.5rem,1rem+2vw,2.5rem)]">
                    <ProposalForm />
                </div>
            </div>
        </section>
    );
}
