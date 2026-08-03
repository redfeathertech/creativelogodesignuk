import { proposal } from "@/content/home";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import ProposalForm from "@/components/forms/ProposalForm";
import { CheckIcon } from "@/components/ui/icons";

/** Proposal form on a glass card, with the pitch pinned alongside it. */
export default function Proposal() {
  return (
    <section
      id="proposal"
      className="relative isolate overflow-hidden bg-ink-950 bg-cover bg-center py-section text-white"
      style={{ backgroundImage: `url('${proposal.bg}')` }}
    >
      <div className="absolute inset-0 z-0 bg-mesh" aria-hidden="true" />
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgb(7_2_15/0.92),rgb(13_3_28/0.86))]"
        aria-hidden="true"
      />

      <div className="relative z-[1] container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="reveal lg:sticky lg:top-32">
          <Eyebrow>{proposal.eyebrow}</Eyebrow>
          <SectionHeading lead={proposal.titleLead} accent={proposal.titleAccent} />
          <p className="mt-6 max-w-[62ch] text-lead text-white/65">{proposal.lead}</p>

          <ul className="mt-8 grid gap-4">
            {proposal.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-white/65">
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

        <div className="reveal rounded-xl border border-white/[0.11] bg-white/[0.04] p-[clamp(1.5rem,1rem+2vw,2.5rem)] shadow-lg backdrop-blur-[16px]">
          <ProposalForm />
        </div>
      </div>
    </section>
  );
}
