import Image from "next/image";
import type { ServiceHowItWorks } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/** The 3-step "how it works" list plus a 6-image "recent work" strip. */
export default function HowItWorks({ data }: { data: ServiceHowItWorks }) {
  return (
    <Section tone="dark">
      <div className="container-site">
        <div className="reveal mx-auto max-w-[62ch] text-center">
          <Eyebrow className="justify-center">{data.eyebrow}</Eyebrow>
          <SectionHeading lead={data.heading} accent={data.headingAccent} className="mx-auto" />
          <p className="mt-6 text-lead text-white/65">{data.lead}</p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {data.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal rounded-lg border border-white/[0.11] bg-white/[0.02] p-8"
            >
              <Image
                src={step.icon.src}
                alt=""
                aria-hidden="true"
                width={step.icon.width}
                height={step.icon.height}
                className="mb-6 h-11 w-auto"
              />
              <h3 className="mb-2 text-h4 text-white">
                {String(i + 1).padStart(2, "0")}. {step.title}
              </h3>
              <p className="text-white/65">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-section">
          <h2 className="reveal mb-8 text-h3 text-white">{data.workHeading}</h2>
          <div className="grid grid-cols-2 gap-4 min-[576px]:grid-cols-3">
            {data.workImages.map((img, i) => (
              <div key={i} className="reveal overflow-hidden rounded-lg bg-ink-800">
                <Image
                  src={img.src}
                  alt=""
                  aria-hidden="true"
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 576px) 46vw, (max-width: 992px) 30vw, 22vw"
                  className="aspect-[4/5] size-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
