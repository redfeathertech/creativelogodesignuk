import Image from "next/image";
import type { ServiceAbout } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/** 2-3 "about" slides, laid out as a simple card grid. */
export default function About({ data }: { data: ServiceAbout }) {
  return (
    <Section tone="light-alt">
      <div className="container-site">
        {/*
          The heading gets the full 56rem measure and the lead keeps the 62ch
          one: 62ch is measured in the body font, so it strangled long headings
          set in the much larger display size (`Our App Development Services`
          broke onto three lines while shorter titles stayed on one).
        */}
        <div className="reveal mx-auto max-w-[56rem] text-center">
          <Eyebrow className="justify-center text-magenta-500">{data.eyebrow}</Eyebrow>
          <SectionHeading
            lead={data.heading}
            accent={data.headingAccent}
            accentClassName="gradient-text-brand"
            className="mx-auto text-balance"
          />
          <p className="mx-auto mt-6 max-w-[65ch] text-lead text-onlight-muted">{data.lead}</p>
        </div>

        {/*
          Flex, not grid: the row always sizes cards to a 3-up track, then
          centres whatever is left over — 2 slides sit centred at one-third
          width each, and a 4th wraps onto its own centred row.
        */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {data.slides.map((slide) => (
            <div
              key={slide.title}
              className="reveal min-w-0 basis-full overflow-hidden rounded-lg bg-white shadow-md min-[576px]:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
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
