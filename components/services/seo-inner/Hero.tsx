import Image from "next/image";

import type { ServiceHero } from "@/content/services/types";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { SxEyebrow, SxHeading } from "./Shell";

/**
 * SEO inner-page hero.
 *
 * Copy split follows the mock: eyebrow, a two-tone H1, the standfirst and the
 * page's two CTAs on the left, the neon SEO artwork on the right, over the
 * supplied particle-wave backdrop.
 *
 * `hero.tiles` — the 4 quick links every other service page carries (Mobile
 * App / Website / Branding / Social Media) — is deliberately NOT rendered here.
 * The shared hero shows them as an image panel and this one briefly showed them
 * as a pill row; the approved comp has neither, and dropping them frees the
 * width the artwork now takes.
 *
 * That is safe for the link graph, which is the one thing docs/CONTENT-PARITY.md
 * does not let a layout change touch: all four targets resolve (through
 * `currentPath`) to `/app-development-services`, `/web-design-services`,
 * `/branding-services` and
 * `/digital-marketing-services/social-media-marketing`, and every one of those
 * is linked from the chrome — the desktop mega-menu and the mobile drawer both
 * render from `content/nav.ts`, which lists all four. Nothing is orphaned, and
 * `content/` still carries the tiles untouched for the other 25 pages.
 */
export default function Hero({ hero }: { hero: ServiceHero }) {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas)] py-section text-white">
            {/* The supplied hero backdrop: a 2.17:1 field of particle wave with
                no subject in it, so `object-cover` may crop it freely.
                `object-bottom` because the wave lives in the lower third —
                that is the edge worth keeping when a short, wide viewport
                crops the (flat, empty) top away.

                It REPLACES `bg-mesh-sx` + `bg-grid-sx` here rather than
                layering over them: the supplied art already carries its own
                bloom and wave, and the mesh painted on top lifted the whole
                band several stops lighter than the approved comp — a washed
                mid-purple where the comp is near-black. The other dark
                sections keep both utilities; only the hero has artwork of its
                own to defer to.

                `bg-[var(--sx-canvas)]` on the section stays as the colour
                behind it while it loads. */}
            <Image
                src="/assets/img/services/seo-inner/hero-bg.webp"
                alt=""
                aria-hidden="true"
                width={1920}
                height={885}
                /* Above the fold on all 11 pages. (`priority` is deprecated in
                   Next 16.) */
                preload
                sizes="100vw"
                /* 90, not the default 75: the asset is a near-black gradient
                   with a fine particle dither, which bands visibly at 75. */
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-bottom"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative container-site">
                {/* 11fr/10fr, not 6fr/5fr: with the quick-link pills gone the
                    copy column no longer needs the extra share, and the near-
                    even split is what lets the artwork grow. */}
                <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,11fr)_minmax(0,10fr)]">
                    <div className="reveal min-w-0">
                        <SxEyebrow>{hero.eyebrow}</SxEyebrow>

                        <SxHeading
                            as="h1"
                            lead={hero.heading}
                            accent={hero.headingAccent}
                        />

                        <p className="mt-6 max-w-[58ch] text-lead text-white/60">
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

                    {/* ---- artwork ----
                        One shared illustration across all 11 pages, as supplied.
                        The glow behind it is a sibling layer rather than a
                        filter on the image: a `drop-shadow` on a 776px PNG with
                        this much transparent margin costs a visible frame on a
                        mid-range phone. */}
                    <div className="reveal relative min-w-0">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-[12%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(255_47_176/0.42)_0%,transparent_68%)] blur-2xl"
                        />
                        <Image
                            src="/assets/img/services/seo-inner/hero-art.png"
                            alt={hero.mediaAlt}
                            width={776}
                            height={776}
                            /* Above the fold on all 11 pages. (`priority` is
                               deprecated in Next 16.) */
                            preload
                            sizes="(max-width: 992px) 88vw, 46vw"
                            /* Was `max-w-[520px]`. The source is 776px square
                               and the column is wider than that inside
                               `container-site` (1560px), so the cap — not the
                               column — is what sets the rendered size. 720px
                               is the largest step that still leaves the art
                               shy of its native width, so it never upscales. */
                            className="mx-auto h-auto w-full max-w-[720px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
