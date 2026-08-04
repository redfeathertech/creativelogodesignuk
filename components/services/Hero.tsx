import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import type { ServiceHero } from "@/content/services/types";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Service-page hero: eyebrow/heading/lead over the brand mesh, a banner +
 * media image pair, and the shared 4-tile quick-link row that appears on
 * every service page (self-link included, matching the pre-migration
 * design in clduk).
 */
export default function Hero({
    hero,
    trail,
}: {
    hero: ServiceHero;
    trail: readonly Crumb[];
}) {
    return (
        <section className="relative overflow-hidden bg-ink-950 py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 bg-mesh opacity-70"
                aria-hidden="true"
            />
            <Image
                src={hero.banner.src}
                alt=""
                aria-hidden="true"
                width={hero.banner.width}
                height={hero.banner.height}
                // Above the fold on all 36 service pages. (`priority` is deprecated in Next 16.)
                preload
                sizes="100vw"
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-30"
            />

            <div className="relative container-site">
                {/* <Breadcrumbs trail={trail} className="mb-6" /> */}

                <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
                    <div className="reveal">
                        <span className="mb-4 inline-flex items-center gap-3 font-display text-xs font-bold tracking-[0.14em] text-magenta-300 uppercase">
                            <span
                                aria-hidden="true"
                                className="h-0.5 w-[clamp(28px,6vw,60px)] shrink-0 rounded-sm bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]"
                            />
                            {hero.eyebrow}
                        </span>

                        <h1 className="text-h1 text-white">
                            {hero.heading}{" "}
                            <span className="gradient-text">
                                {hero.headingAccent}
                            </span>
                        </h1>

                        <p className="mt-6 max-w-[58ch] text-lead text-white/65">
                            {hero.lead}
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <LeadButton variant="primary" size="lg">
                                {hero.ctaPrimary}
                            </LeadButton>
                            <LeadButton variant="ghost" size="lg">
                                {hero.ctaSecondary}
                            </LeadButton>
                        </div>
                    </div>

                    <div className="reveal">
                        <Image
                            src={hero.media.src}
                            alt={hero.mediaAlt}
                            width={hero.media.width}
                            height={hero.media.height}
                            preload
                            sizes="(max-width: 992px) 80vw, 40vw"
                            className="mx-auto h-auto w-full max-w-[480px] drop-shadow-[0_22px_44px_rgb(7_2_15/0.5)]"
                        />
                    </div>
                </div>

                {/* ---- quick-link tiles ----
                    Full-bleed artwork inside one dark panel, as on the live
                    page. The label rides a wash that only appears on hover or
                    keyboard focus — `pointer-coarse` pins both open on touch,
                    where neither state exists. */}
                <div className="reveal mt-section rounded-xl bg-ink-950/70 p-3 ring-1 ring-white/10 backdrop-blur-md min-[576px]:p-4">
                    {/* 2-up until `lg` (62rem), then 4-up — the same two steps
                        the live page's `col-lg-3 col-sm-6` makes. */}
                    <ul className="grid grid-cols-2 gap-3 min-[576px]:gap-4 lg:grid-cols-4">
                        {hero.tiles.map((tile) => (
                            <li key={tile.label}>
                                <Link
                                    href={`/${tile.slug}` as Route}
                                    className="group relative block overflow-hidden rounded-lg border-[3px] border-transparent bg-size-[300%_300%] hover:animate-tile-ring hover:bg-[linear-gradient(135deg,#ffffff,#ff6a00,var(--color-magenta-500),#ff6a00,#ffffff)] focus-visible:animate-tile-ring focus-visible:bg-[linear-gradient(135deg,#ffffff,#ff6a00,var(--color-magenta-500),#ff6a00,#ffffff)] focus-visible:outline-none"
                                >
                                    <Image
                                        src={tile.icon.src}
                                        alt=""
                                        aria-hidden="true"
                                        width={tile.icon.width}
                                        height={tile.icon.height}
                                        sizes="(max-width: 992px) 46vw, 23vw"
                                        /* `bg-ink-900` matters: the gradient ring is painted on
                                           the link's border box, so an image that has not
                                           decoded yet would let it flood the whole tile. */
                                        className="aspect-[500/628] h-auto w-full bg-ink-900 object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                                    />

                                    <span className="absolute inset-0 grid place-items-center bg-[#030405]/0 p-3 text-center transition-colors duration-500 group-hover:bg-[#030405]/70 group-focus-visible:bg-[#030405]/70 pointer-coarse:bg-[#030405]/60">
                                        <span className="font-display text-h4 font-bold text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100 lg:text-h3">
                                            {tile.label}
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
