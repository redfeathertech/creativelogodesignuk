import Image from "next/image";

import { story } from "@/content/about";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * "Best in breed" — the three paragraphs that carry the page's substance, with
 * the studio shot alongside.
 *
 * Copy leads in the DOM as well as on screen: the image is decoration for a
 * text block, so it should not come first for a screen reader or a crawler.
 */
export default function Story() {
    return (
        <Section tone="light-alt">
            <div className="container-site grid items-center gap-[clamp(2rem,1.5rem+4vw,4.5rem)] lg:grid-cols-2">
                <div className="reveal">
                    <Eyebrow className="text-magenta-500">{story.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={story.titleLead}
                        accent={story.titleAccent}
                        accentClassName="gradient-text-brand"
                    />

                    <div className="mt-6 grid gap-4 text-onlight-muted">
                        {story.paragraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 32)} className="max-w-[62ch]">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    width={1404}
                    height={973}
                    sizes="(max-width: 992px) 92vw, 46vw"
                    className="reveal h-auto w-full rounded-lg shadow-lg"
                />
            </div>
        </Section>
    );
}
