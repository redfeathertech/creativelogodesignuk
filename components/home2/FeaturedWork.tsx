import Link from "next/link";

import { featuredWork } from "@/content/home2";
import { Eyebrow } from "@/components/ui/Section";
import { btn } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";
import DeviceFrame from "./DeviceFrame";

/**
 * Featured work (v2, new section).
 *
 * The section carrying the most visual weight on the page: alternating
 * full-bleed rows, framed artwork on one side, copy on the other, sides
 * swapping each row.
 *
 * The alternation is computed rather than done with an `:nth-child` selector.
 * A selector would be shorter and considerably harder to read, and this is
 * layout logic, not styling — the parity of the index is the actual concept.
 *
 * Rendered entirely on the server. Nothing here is stateful, so nothing here
 * needs to hydrate.
 */
export default function FeaturedWork() {
    return (
        <section
            className="relative isolate overflow-hidden bg-ink-950 py-section text-white"
            aria-label="Selected work"
        >
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-grid-fade opacity-70"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative z-[1] container-site">
                <div className="reveal mb-[clamp(3rem,2rem+3vw,5rem)] max-w-[60ch]">
                    <Eyebrow>{featuredWork.eyebrow}</Eyebrow>
                    <h2 className="mb-5 text-h2">
                        {featuredWork.titleLead}{" "}
                        <span className="gradient-text">
                            {featuredWork.titleAccent}
                        </span>
                    </h2>
                    <p className="text-lead text-white/65">
                        {featuredWork.lead}
                    </p>
                </div>

                <div className="flex flex-col gap-[clamp(3rem,2rem+4vw,6rem)]">
                    {featuredWork.items.map((item, i) => {
                        const flipped = i % 2 === 1;
                        return (
                            <article
                                key={item.name}
                                className="reveal grid items-center gap-[clamp(2rem,1.5rem+3vw,4.5rem)] lg:grid-cols-2"
                            >
                                <div
                                    className={`relative isolate min-w-0 ${flipped ? "lg:order-2" : ""}`}
                                >
                                    <div
                                        className="pointer-events-none absolute inset-[-15%] -z-10 glow-bloom opacity-55"
                                        aria-hidden="true"
                                    />
                                    <DeviceFrame
                                        src={item.image}
                                        alt={`${item.name} logo design`}
                                        width={640}
                                        height={640}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="mb-4 inline-flex rounded-full border border-white/15 px-4 py-1.5 text-xs tracking-[0.12em] text-white/55 uppercase">
                                        {item.sector}
                                    </p>
                                    <h3 className="mb-4 text-h3">{item.name}</h3>
                                    <p className="max-w-[52ch] text-lead text-white/65">
                                        {item.body}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="reveal mt-[clamp(3rem,2rem+3vw,5rem)] flex justify-center">
                    <Link
                        href={featuredWork.ctaHref}
                        className={btn("ghost", "lg")}
                    >
                        {featuredWork.cta}
                        <ArrowIcon />
                    </Link>
                </div>
            </div>
        </section>
    );
}
