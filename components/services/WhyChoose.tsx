import type { ServiceWhyChoose } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

export default function WhyChoose({ data }: { data: ServiceWhyChoose }) {
  return (
    <Section tone="dark">
      <div className="container-site">
        <div className="reveal mx-auto max-w-[62ch] text-center">
          <Eyebrow className="justify-center">{data.eyebrow}</Eyebrow>
          <SectionHeading lead={data.heading} accent={data.headingAccent} className="mx-auto" />
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-8 min-[576px]:grid-cols-2 lg:grid-cols-3">
          {data.features.map((feature) => (
            <li key={feature.title} className="reveal border-t border-white/[0.11] pt-8">
              <h3 className="mb-2 flex items-center gap-3 text-h5 font-bold text-white">
                <span
                  aria-hidden="true"
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                >
                  <CheckIcon className="size-3" />
                </span>
                {feature.title}
              </h3>
              <p className="text-white/65">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
