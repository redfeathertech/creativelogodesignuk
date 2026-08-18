import Image from "next/image";
import Link from "next/link";
import { process, recentWork } from "@/content/home";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import Rail from "@/components/ui/Rail";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { btn } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";
import ProcessSteps from "./ProcessSteps";

/**
 * Process steps plus the "Our recent work" rail.
 *
 * The intro column carries the section's own call to action — the three steps
 * used to end on a full stop, with the next conversion point a whole section
 * away.
 *
 * Backdrop is a client-supplied image rather than `<Section tone="dark">`'s
 * mesh, so this band matches the hero. The `<section>` is hand-rolled for that
 * reason; the noise overlay goes with it, since the image carries its own
 * texture and the two grains cross-hatch.
 *
 * The work cards are links here. On the live site they are inert <article>
 * elements, wasting six prime internal-link slots on the homepage.
 */
export default function HowItWork() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-900 py-section text-white">
            {/* Brand mesh over the whole band, as on every other dark section.
                It fills the field above the backdrop, which only occupies the
                foot of the process half. */}
            <div
                className="pointer-events-none absolute inset-0 -z-20 bg-mesh"
                aria-hidden="true"
            />

            {/* The process half. `relative` so the backdrop below anchors to
                THIS block rather than the whole section — the section also
                carries the recent-work rail, which more than doubles its
                height. */}
            <div className="relative pb-[clamp(2rem,4vw,4.5rem)]">
                {/* The client backdrop, at its own 1920x730 aspect and pinned to
                    the foot of the process half — where its dot grid and its
                    curves are drawn.

                    NOT `object-cover`: the source is a 2.63:1 banner and this
                    band is nowhere near that ratio at any width, so cover
                    scales to the height and crops the sides — 76% of the width
                    at 1440, which is to say both corner motifs and everything
                    that makes the image worth having. Sized by width instead
                    (`h-auto`), so nothing is ever cropped or stretched; the
                    edges are masked off into the mesh around it, since the
                    image no longer reaches that far: hard at neither end, or
                    the bottom edge — which is the brightest part of the asset,
                    a magenta sweep — draws a rule straight across the page
                    where it meets the flat canvas under the rail. */}
                <Image
                    src={process.background}
                    alt=""
                    aria-hidden="true"
                    width={1920}
                    height={730}
                    sizes="100vw"
                    quality={90}
                    className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-auto w-full [mask-image:linear-gradient(180deg,transparent_0%,#000_32%,#000_72%,transparent_100%)]"
                />

                <div className="container-site">
                    <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                        <div className="reveal">
                            <Eyebrow>{process.eyebrow}</Eyebrow>
                            <SectionHeading
                                lead={process.titleLead}
                                accent={process.titleAccent}
                            />
                            {/* The rule under the heading in the approved design —
                            the eyebrow's mark repeated at the foot of the title
                            block, closing it off. */}
                            <span
                                aria-hidden="true"
                                className="mt-5 block h-0.5 w-[clamp(28px,6vw,60px)] rounded-sm bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]"
                            />

                            <p className="mt-6 max-w-[62ch] text-lead text-white/65">
                                {process.lead}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <LeadButton variant="primary">
                                    {process.primaryCta}
                                    <ArrowIcon />
                                </LeadButton>
                                {/* Same section, further down: the rail is what
                                "our work" means on this page, and there is no
                                portfolio route to send anyone to. */}
                                <Link
                                    href={process.workAnchor}
                                    className={btn("ghost")}
                                >
                                    {process.secondaryCta}
                                </Link>
                            </div>

                            {/* The two-up proof strip. One bordered panel with a
                            hairline between the items, splitting to a stack
                            below 576px — two marks plus two lines of label do
                            not fit a phone width side by side. The divider is a
                            border on the second item rather than its own
                            element, so it flips from vertical to horizontal
                            with the same rule. */}
                            <dl className="mt-10 grid gap-5 rounded-2xl border border-white/[0.11] bg-white/[0.03] p-5 backdrop-blur-[2px] min-[576px]:grid-cols-2 min-[576px]:gap-0">
                                {process.highlights.map((item, i) => (
                                    <div
                                        key={item.title}
                                        className={
                                            i === 0
                                                ? "flex items-center gap-3.5 min-[576px]:pe-5"
                                                : "flex items-center gap-3.5 border-t border-white/[0.11] pt-5 min-[576px]:border-t-0 min-[576px]:border-s min-[576px]:ps-5 min-[576px]:pt-0"
                                        }
                                    >
                                        {/* Complete badge in the asset, like the
                                        step marks — 60x60 native, rendered
                                        at 52. */}
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            aria-hidden="true"
                                            width={60}
                                            height={60}
                                            className="size-[52px] shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <dt className="font-display text-[1.0625rem] font-bold text-white">
                                                {item.title}
                                            </dt>
                                            <dd className="mt-0.5 text-sm leading-[1.5] text-white/60">
                                                {item.body}
                                            </dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <ProcessSteps />
                    </div>
                </div>
            </div>

            {/* ---- recent work ---- */}
            <div id="recent-work" className="container-site mt-section">
                <Rail
                    label={recentWork.title}
                    count={recentWork.items.length}
                    navPlacement="head"
                    heading={<h2 className="text-h2">{recentWork.title}</h2>}
                >
                    {recentWork.items.map((item) => (
                        <Link
                            key={item.img}
                            href={item.href}
                            className="group relative w-[clamp(240px,74vw,340px)] overflow-hidden rounded-lg bg-ink-800 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1.5"
                        >
                            <Image
                                src={item.img}
                                alt={`${item.lead} ${item.trail} project by Creative Logo Design`}
                                width={340}
                                height={425}
                                sizes="(max-width: 576px) 74vw, 340px"
                                className="block aspect-4/5 w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(7_2_15/0.88)_62%)] px-6 pt-8 pb-6">
                                <h3 className="font-display text-h4 leading-[1.1] font-extrabold text-white">
                                    <span className="block">{item.lead}</span>
                                    <span className="block">{item.trail}</span>
                                </h3>
                            </div>
                        </Link>
                    ))}
                </Rail>
            </div>
        </section>
    );
}
