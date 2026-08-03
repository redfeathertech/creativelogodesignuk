import Image from "next/image";
import type { ServiceAbout } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/** 2-3 "about" slides, laid out as a simple card grid. */
export default function About({ data }: { data: ServiceAbout }) {
  return (
    <Section tone="light-alt">
      <div className="container-site">
        <div className="reveal mx-auto max-w-[62ch] text-center">
          <Eyebrow className="justify-center text-magenta-500">{data.eyebrow}</Eyebrow>
          <SectionHeading
            lead={data.heading}
            accent={data.headingAccent}
            accentClassName="gradient-text-brand"
            className="mx-auto"
          />
          <p className="mt-6 text-lead text-onlight-muted">{data.lead}</p>
        </div>

        <div
          className={`mt-12 grid gap-6 ${data.slides.length === 2 ? "min-[576px]:grid-cols-2" : "min-[576px]:grid-cols-2 lg:grid-cols-3"}`}
        >
          {data.slides.map((slide) => (
            <div key={slide.title} className="reveal overflow-hidden rounded-lg bg-white shadow-md">
              <Image
                src={slide.image.src}
                alt=""
                aria-hidden="true"
                width={slide.image.width}
                height={slide.image.height}
                sizes="(max-width: 576px) 88vw, (max-width: 992px) 44vw, 30vw"
                className="aspect-video w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 font-display text-h5 font-bold text-onlight">{slide.title}</h3>
                <p className="text-sm text-onlight-muted">{slide.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
