import Image from "next/image";

import type { ServiceHowItWorks } from "@/content/services/types";
import Rail from "@/components/ui/Rail";
import { SxSection } from "./Shell";

/**
 * The recent-work rail, lifted out of the "how it works" band into a light
 * section of its own — the arrangement the mock uses.
 *
 * The six images are the shared service art and carry no titles in content, so
 * the cards are images alone. The mock captions each card; inventing captions
 * would put copy on eleven pages that exists nowhere in `content/`, so the
 * cards stay uncaptioned and the section is headed by `workHeading`.
 *
 * `alt=""` + `aria-hidden`: decorative, exactly as the shared service page
 * treats the same six files.
 */
export default function Work({ data }: { data: ServiceHowItWorks }) {
    return (
        <SxSection tone="light">
            <div className="container-site">
                <Rail
                    label={data.workHeading}
                    count={data.workImages.length}
                    itemNoun="project"
                    navPlacement="head"
                    tone="light"
                    heading={
                        <h2 className="reveal text-h2 text-onlight">
                            {data.workHeading}
                        </h2>
                    }
                >
                    {data.workImages.map((img, i) => (
                        <article
                            key={i}
                            className="group w-[clamp(240px,74vw,340px)] overflow-hidden rounded-lg bg-[var(--sx-lilac)] shadow-[0_18px_44px_-24px_rgb(10_2_33/0.45)] transition-transform duration-300 ease-out hover:-translate-y-1.5"
                        >
                            <Image
                                src={img.src}
                                alt=""
                                aria-hidden="true"
                                width={img.width}
                                height={img.height}
                                sizes="(max-width: 576px) 74vw, 340px"
                                className="block aspect-4/5 w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                            />
                        </article>
                    ))}
                </Rail>
            </div>
        </SxSection>
    );
}
