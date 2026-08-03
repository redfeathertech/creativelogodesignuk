import type { ServiceCta } from "@/content/services/types";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";

export default function Cta({ data }: { data: ServiceCta }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" aria-hidden="true" />
      <div className="relative container-site text-center">
        <div className="reveal mx-auto max-w-[62ch]">
          <Eyebrow className="justify-center">{data.eyebrow}</Eyebrow>
          <SectionHeading
            lead={data.heading}
            accent={data.headingAccent}
            className="mx-auto"
          />
          <p className="mx-auto mt-6 max-w-[52ch] text-lead text-white/65">{data.lead}</p>

          <div className="mt-9 flex justify-center">
            <LeadButton variant="primary" size="lg">
              {data.button}
            </LeadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
