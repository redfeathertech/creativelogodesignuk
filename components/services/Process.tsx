import type { ServiceProcess } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/** 5 numbered process steps, static (no scroll-spy — that's `ProcessSteps`
    on the homepage, which this schema doesn't need for 5 short items). */
export default function Process({ data }: { data: ServiceProcess }) {
  return (
    <Section tone="dark">
      <div className="container-site">
        <div className="reveal mx-auto max-w-[62ch] text-center">
          <Eyebrow className="justify-center">{data.eyebrow}</Eyebrow>
          <SectionHeading lead={data.heading} accent={data.headingAccent} className="mx-auto" />
          <p className="mt-6 text-lead text-white/65">{data.lead}</p>
        </div>

        <ol className="mt-12 grid gap-2">
          {data.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-b border-white/[0.11] py-8 first:border-t"
            >
              <span
                aria-hidden="true"
                className="grid size-[52px] shrink-0 place-items-center rounded-full border border-white/20 font-display text-[1.1rem] font-extrabold text-white/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2 text-h4 text-white">{step.title}</h3>
                <p className="text-white/65">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
