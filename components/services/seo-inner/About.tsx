import Image from "next/image";

import type { ServiceAbout } from "@/content/services/types";
import { SxEyebrow, SxHeading, SxSection } from "./Shell";

/**
 * The two or three "about" slides, as a centred card row.
 *
 * The mock has no band for these. They are kept because they are real body
 * copy — "SEO Audit Services", "Website check", "Action plan" and their
 * paragraphs are indexed on the live page — and dropping a section is a
 * content change, which this redesign is not. They render in the new card
 * style on the lilac ground, between the split bands either side of them.
 *
 * Flex rather than grid: the row sizes cards to a 3-up track and centres what
 * is left over, so a module with two slides gets two centred thirds instead of
 * a hole where the third would be.
 */
export default function About({ data }: { data: ServiceAbout }) {
    return (
        <SxSection tone="lilac">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <SxEyebrow tone="light" className="justify-center">
                        {data.eyebrow}
                    </SxEyebrow>
                    <SxHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[65ch] text-lead text-onlight-muted">
                        {data.lead}
                    </p>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-6">
                    {data.slides.map((slide) => (
                        <div
                            key={slide.title}
                            className="reveal min-w-0 basis-full overflow-hidden rounded-lg bg-white shadow-[0_22px_54px_-30px_rgb(10_2_33/0.5)] min-[576px]:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
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
                                <h3 className="mb-2 font-display text-h5 font-bold text-onlight">
                                    {slide.title}
                                </h3>
                                <p className="text-sm text-onlight-muted">
                                    {slide.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SxSection>
    );
}
