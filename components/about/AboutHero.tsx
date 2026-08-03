import Image from "next/image";
import Link from "next/link";

import { aboutHero } from "@/content/about";
import { Eyebrow } from "@/components/ui/Section";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { btn } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * Page hero — the pattern every inner page will share.
 *
 * Unlike the homepage hero this is not a full-screen composition: an inner page
 * has to show that it is an inner page, so the header, breadcrumb and heading
 * are all visible at once and the section ends inside the fold.
 *
 * The artwork is a transparent-background collage, so it gets a soft brand glow
 * behind it instead of the rounded card the clduk redesign gave it — a card with
 * a shadow around transparent art draws a box where the visitor sees none.
 */
export default function AboutHero({ trail }: { trail: readonly Crumb[] }) {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-[clamp(3rem,1.5rem+6vw,6rem)] text-white">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden="true" />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.42] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="container-site">
                <Breadcrumbs trail={trail} className="mb-8" />

                <div className="grid items-center gap-[clamp(2rem,1.5rem+4vw,4rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                    <div className="reveal">
                        <Eyebrow>{aboutHero.eyebrow}</Eyebrow>

                        <h1 className="text-h1">
                            {aboutHero.titleLead}{" "}
                            <span className="gradient-text">{aboutHero.titleAccent}</span>
                        </h1>

                        <p className="mt-6 max-w-[62ch] text-lead text-white/65">{aboutHero.lead}</p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <LeadButton variant="primary" size="lg">
                                {aboutHero.primaryCta}
                                <ArrowIcon />
                            </LeadButton>
                            <Link href="/contact-us" className={btn("ghost", "lg")}>
                                {aboutHero.secondaryCta}
                            </Link>
                        </div>
                    </div>

                    <div className="reveal relative mx-auto w-full max-w-[520px] lg:max-w-none">
                        <div
                            className="pointer-events-none absolute inset-[12%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(204_6_127/0.45),transparent_70%)] blur-3xl"
                            aria-hidden="true"
                        />
                        {/* `sizes` describes the wrapper, not the viewport —
                            the image is capped at 520px until `lg` and is 5/12
                            of the container above it. Same geometry as the
                            contact hero. */}
                        <Image
                            src={aboutHero.image.src}
                            alt={aboutHero.image.alt}
                            width={2000}
                            height={2000}
                            sizes="(min-width: 62rem) 584px, (min-width: 36rem) 520px, 92vw"
                            preload
                            className="h-auto w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
