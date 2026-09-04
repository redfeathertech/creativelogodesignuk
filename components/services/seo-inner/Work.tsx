import Image from "next/image";
import Link from "next/link";

import { seoWork } from "@/content/seo-work";
import Rail from "@/components/ui/Rail";
import { ArrowIcon } from "@/components/ui/icons";
import { SxEyebrow, SxHeading, SxSection, SX_RAMP } from "./Shell";

/**
 * "Our Recent SEO Work" — the portfolio rail, rebuilt to the approved mock.
 *
 * What changed from the first pass: the cards used to be the six shared
 * service illustrations with no captions at all, because
 * `howItWorks.workImages` carries no titles and inventing them would have put
 * new copy on eleven pages. The mock captions every card, so the rail now
 * renders `content/seo-work.ts` instead — the six REAL portfolio pieces the
 * homepage already shows, each with its own name, category and internal link.
 * That satisfies the mock and adds six live internal links per page rather
 * than six decorative images.
 *
 * The whole card is the link, so the corner arrow is `aria-hidden` — it is the
 * affordance the mock draws, not a second control. One link per card, not two
 * pointing at the same place.
 *
 * `navPlacement="sides"` floats an arrow over each edge of the rail, half in
 * the page gutter, exactly as the mock places them. Rail hides that pair below
 * 768px (a phone swipes), which is why the dots are on: a phone keeps a
 * visible control.
 */
export default function Work() {
    return (
        <SxSection tone="light">
            <div className="container-site">
                {/* Head: eyebrow + heading left, the pitch right. `items-end`
                    so the paragraph's last line sits on the heading baseline
                    the way the mock aligns them; it stacks under 1024px. */}
                <div className="reveal grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]">
                    <div className="min-w-0">
                        <SxEyebrow tone="light">{seoWork.eyebrow}</SxEyebrow>
                        <SxHeading
                            lead={seoWork.titleLead}
                            accent={seoWork.titleAccent}
                            className="text-onlight"
                        />
                    </div>

                    <p className="min-w-0 max-w-[62ch] text-ui-17 leading-[1.7] text-onlight-muted">
                        {seoWork.lead}
                    </p>
                </div>

                <div className="mt-[clamp(2rem,1.25rem+2.5vw,3.25rem)]">
                    <Rail
                        label={seoWork.title}
                        count={seoWork.items.length}
                        itemNoun="project"
                        navPlacement="sides"
                        tone="light"
                        showDots
                    >
                        {seoWork.items.map((item) => (
                            <Link
                                key={item.img}
                                href={item.href}
                                className="group flex w-[clamp(256px,76vw,322px)] flex-col overflow-hidden rounded-xl border border-ink-900/[0.07] bg-white transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--sx-neon)]/30"
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={item.img}
                                        alt={`${item.title} project by Creative Logo Design`}
                                        width={340}
                                        height={340}
                                        sizes="(max-width: 576px) 76vw, 322px"
                                        className="block aspect-square w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                                    />

                                    {/* Category pill. The dot is the neon
                                        accent rather than the site magenta —
                                        this band lives inside `.seo-inner`. */}
                                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 font-display text-ui-11 font-bold tracking-[0.1em] text-onlight uppercase shadow-sm backdrop-blur-[2px]">
                                        <span
                                            aria-hidden="true"
                                            className="size-1.5 rounded-full bg-[var(--sx-neon)]"
                                        />
                                        {item.label}
                                    </span>
                                </div>

                                <div className="flex flex-1 items-end justify-between gap-4 px-6 pt-5 pb-5">
                                    <div className="min-w-0">
                                        <h3 className="font-display text-lg leading-[1.15] font-extrabold text-onlight">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1.5 text-ui-15 text-onlight-muted">
                                            {item.blurb}
                                        </p>
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="relative grid size-11 shrink-0 place-items-center rounded-full border border-[var(--sx-violet)]/30 text-[var(--sx-violet)] transition-all duration-300 ease-out group-hover:border-transparent group-hover:text-white"
                                    >
                                        <span
                                            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                                            style={{ backgroundImage: SX_RAMP }}
                                        />
                                        <ArrowIcon className="relative size-4 -rotate-45" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </Rail>
                </div>
            </div>
        </SxSection>
    );
}
