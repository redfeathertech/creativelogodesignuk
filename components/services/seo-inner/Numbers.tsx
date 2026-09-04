import Image from "next/image";

import type { ServiceAdvantages } from "@/content/services/types";
import Counter from "@/components/ui/Counter";
import { cn } from "@/lib/cn";
import { SxEyebrow, SxHeading, SxSection } from "./Shell";
import { STAT_ICONS } from "./icons";

/**
 * "By the numbers" — artwork left, pitch right, and the four counters lifted
 * out into a full-width tile row beneath the split, as the mock draws them.
 *
 * The figures render as `<p>`, not headings: a number titles nothing, and the
 * `<dl>` already pairs each one with its label.
 *
 * `break-words` on the figure is load-bearing. Three service modules carry a
 * stat whose `suffix` is a sentence rather than a symbol — "Over 20 years in
 * SEO and online marketing" — and that copy is transcribed from the live page,
 * so the break has to happen here rather than in content.
 */
export default function Numbers({ data }: { data: ServiceAdvantages }) {
    return (
        <SxSection tone="light">
            <div className="container-site">
                <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2">
                    <div className="reveal min-w-0">
                        <Image
                            src={data.image.src}
                            alt={data.imageAlt}
                            width={data.image.width}
                            height={data.image.height}
                            sizes="(max-width: 992px) 88vw, 46vw"
                            className="mx-auto h-auto w-full max-w-[480px] rounded-lg shadow-[0_28px_64px_-32px_rgb(10_2_33/0.5)]"
                        />
                    </div>

                    <div className="reveal min-w-0">
                        <SxEyebrow tone="light">{data.eyebrow}</SxEyebrow>
                        <SxHeading
                            lead={data.heading}
                            accent={data.headingAccent}
                        />
                        <p className="mt-6 max-w-[62ch] text-lead text-onlight-muted">
                            {data.lead}
                        </p>
                    </div>
                </div>

                <dl className="reveal mt-[clamp(2.5rem,1.5rem+4vw,4rem)] grid gap-4 min-[576px]:grid-cols-2 lg:grid-cols-4">
                    {data.stats.map((stat, i) => {
                        const Icon = STAT_ICONS[i % STAT_ICONS.length];
                        /* Most suffixes are a symbol — "+", "%". A handful of
                           modules carry a whole clause instead ("Over 20 years
                           in SEO and online marketing"), and that copy is
                           transcribed from the live page, so it is not ours to
                           shorten. Set at `text-h3` it fills the tile and
                           swamps its own label, so a wordy suffix steps the
                           figure down two rungs. Purely a size decision — every
                           character still renders. */
                        const wordy = stat.suffix.trim().split(/\s+/).length > 1;
                        return (
                            <div
                                key={stat.label}
                                className="min-w-0 rounded-lg border border-[rgb(157_78_221/0.16)] bg-[var(--sx-lilac)] p-6"
                            >
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <span className="mb-5 grid size-11 place-items-center rounded-full bg-white text-[var(--sx-neon)] shadow-[0_8px_20px_-10px_rgb(255_47_176/0.8)]">
                                        <Icon className="size-5" />
                                    </span>
                                    <p
                                        className={cn(
                                            "font-display leading-tight font-extrabold break-words text-[var(--sx-neon)]",
                                            wordy ? "text-h5" : "text-h3",
                                        )}
                                    >
                                        {stat.prefix}
                                        <Counter
                                            value={stat.count}
                                            suffix={stat.suffix}
                                            className="inline"
                                        />
                                    </p>
                                    <p className="mt-2.5 text-sm text-onlight-muted">
                                        {stat.label}
                                    </p>
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </div>
        </SxSection>
    );
}
