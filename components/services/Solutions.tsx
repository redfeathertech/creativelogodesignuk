import Image from "next/image";
import type { ServiceSolutions } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";

export default function Solutions({ data }: { data: ServiceSolutions }) {
  return (
    <Section tone="light">
      <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,5rem)] lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow className="text-magenta-500">{data.eyebrow}</Eyebrow>
          <SectionHeading
            lead={data.heading}
            accent={data.headingAccent}
            accentClassName="gradient-text-brand"
          />
          <p className="mt-6 max-w-[62ch] text-lead text-onlight-muted">{data.lead}</p>
          <div className="mt-8">
            <LeadButton variant="outline" size="lg">
              Get started
            </LeadButton>
          </div>
        </div>

        <div className="reveal">
          <Image
            src={data.image.src}
            alt={data.imageAlt}
            width={data.image.width}
            height={data.image.height}
            sizes="(max-width: 992px) 88vw, 44vw"
            className="mx-auto h-auto w-full max-w-[520px] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </Section>
  );
}
