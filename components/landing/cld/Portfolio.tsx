import Image from "next/image";

import { IMG, portfolio } from "@/content/landing/creative-logo-design";
import { Eyebrow } from "@/components/ui/Section";

/**
 * The ten-logo work grid.
 *
 * The artwork is opaque, full-colour and painted on its own pale background —
 * the same asset problem `content/clients.ts` documents. So each mark keeps a
 * card here rather than being knocked out to white; a cream-on-dark logo cannot
 * be filtered into a monochrome one without destroying it.
 *
 * The tiles are square, and the images are re-cut square at build time onto
 * each logo's own background colour rather than letterboxed into one — see the
 * note on `portfolio.tile` in the content module.
 *
 * Alt text is per-logo. The live grid ships one alt attribute across all ten
 * images ("Portfolio Image 1", on the second), which wastes the image-SEO
 * signal and leaves nine unnamed images for a screen reader to announce by
 * filename.
 */
export default function Portfolio() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-70"
                aria-hidden="true"
            />

            <div className="container-site">
                <div className="reveal mx-auto max-w-[64ch] text-center">
                    <Eyebrow>{portfolio.eyebrow}</Eyebrow>
                    <h2 className="text-h2">{portfolio.title}</h2>
                    <p className="mt-5 text-lead text-white/65">{portfolio.lead}</p>
                </div>

                {/* `aspect-square` on each cell and `h-full object-cover` on the
                    image, not `h-auto`: grid rows stretch to the tallest cell, so
                    a cell shorter than its row paints a strip of the dark card
                    under the logo. The sources are already square, which makes
                    the cover a no-op — this is what keeps it that way if one
                    ever is not. */}
                <ul className="reveal mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {portfolio.items.map((item) => (
                        <li
                            key={item.src}
                            className="group aspect-square overflow-hidden rounded-md border border-white/10 bg-white/[0.04] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-magenta-500/40 hover:shadow-glow"
                        >
                            <Image
                                src={`${IMG}/work/${item.src}.webp`}
                                alt={item.alt}
                                width={portfolio.tile.width}
                                height={portfolio.tile.height}
                                // Two up at 320px, five up from 992 — the widest
                                // a cell is ever drawn is 280px, at the 1560px
                                // container cap: (1464 - 4x16 gap) / 5.
                                sizes="(max-width: 575px) 45vw, (max-width: 991px) 30vw, 280px"
                                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
