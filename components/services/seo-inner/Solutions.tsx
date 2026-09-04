import Image from "next/image";

import type { ServiceSolutions } from "@/content/services/types";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { SxEyebrow, SxHeading, SxSection } from "./Shell";

/**
 * "What we do" — artwork left, pitch and CTA right, on the lilac ground.
 *
 * The artwork is the supplied illustration rather than `solutions.image`
 * (`_shared/solutionsinbranding.png`), which is a photograph of a desk drawn
 * for the warmer shared service canvas. `imageAlt` is still the page's own
 * string, so the alt text keeps naming the service this page is about.
 */
export default function Solutions({ data }: { data: ServiceSolutions }) {
    return (
        <SxSection tone="lilac">
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,5rem)] lg:grid-cols-2">
                <div className="reveal min-w-0">
                    <Image
                        src="/assets/img/services/seo-inner/solutions.png"
                        alt={data.imageAlt}
                        width={640}
                        height={468}
                        sizes="(max-width: 992px) 88vw, 46vw"
                        className="mx-auto h-auto w-full max-w-[560px] rounded-lg shadow-[0_28px_64px_-32px_rgb(10_2_33/0.5)]"
                    />
                </div>

                <div className="reveal min-w-0">
                    <SxEyebrow tone="light">{data.eyebrow}</SxEyebrow>
                    <SxHeading lead={data.heading} accent={data.headingAccent} />
                    <p className="mt-6 max-w-[62ch] text-lead text-onlight-muted">
                        {data.lead}
                    </p>
                    <div className="mt-9">
                        <LeadButton variant="primary" size="lg">
                            Get started
                        </LeadButton>
                    </div>
                </div>
            </div>
        </SxSection>
    );
}
