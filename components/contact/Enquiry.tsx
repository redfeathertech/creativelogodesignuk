import { enquiry } from "@/content/contact";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import ProposalForm from "@/components/forms/ProposalForm";
import { CheckIcon } from "@/components/ui/icons";

/**
 * The enquiry form, with the pitch pinned alongside it.
 *
 * Same shape as the homepage's `Proposal` band and the same `ProposalForm`
 * underneath — the redesign gives both pages the identical field set, so a
 * second form component would be two places to keep in content parity for no
 * gain. What differs is the copy (sentence case here, and no "no obligation"
 * clause), the tick colour, and the surface: the homepage band sits on a photo,
 * this one on the flat dark canvas one step lighter than the hero above it, so
 * the two dark sections read as two.
 */
export default function Enquiry() {
    return (
        <Section tone="dark">
            <div className="container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="reveal lg:sticky lg:top-32">
                    <Eyebrow>{enquiry.eyebrow}</Eyebrow>
                    <SectionHeading lead={enquiry.titleLead} accent={enquiry.titleAccent} />
                    <p className="mt-6 max-w-[62ch] text-lead text-white/65">{enquiry.lead}</p>

                    <ul className="mt-8 grid gap-4">
                        {enquiry.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-white/65">
                                <span
                                    className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full bg-magenta-500/20 text-magenta-300"
                                    aria-hidden="true"
                                >
                                    <CheckIcon className="size-3" />
                                </span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="reveal rounded-xl border border-white/[0.11] bg-white/[0.04] p-[clamp(1.5rem,1rem+2vw,2.5rem)] shadow-lg backdrop-blur-[16px]">
                    <ProposalForm source={enquiry.source} successTitle={enquiry.successTitle} />
                </div>
            </div>
        </Section>
    );
}
