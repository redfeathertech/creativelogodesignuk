import Image from "next/image";

import { contact } from "@/content/site";
import { onPage } from "@/content/landing/seo-services";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/ui/icons";
import { btn } from "@/components/ui/button";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * OnPage — "Your Website, Optimised From the Ground Up".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Was a `Section tone="dark"` split with a hand-built rankings card filling the
 * right column. Rebuilt to the client's approved composition, the same grammar
 * {@link ./Difference} already runs: the neon backdrop on the `ink-950` canvas
 * feathered top and bottom, the pitch and its checklist left, and the client's
 * own monitor mockup right. The checklist rows are separated by hairlines
 * rather than gaps, and the phone CTA is the white pill from the mockup rather
 * than the glass `ghost` one.
 *
 * Eyebrow, heading, standfirst, all five checklist points and both CTA labels
 * are untouched — the strings this page has always carried, still gated in both
 * directions by `scripts/verify-seo-services-parity.py`.
 *
 * THE RANKINGS CARD IS GONE (client's call, 2026-09). The monitor does not
 * stand in for it: the mockup's monitor is a picture of a SERP, and a picture
 * is not text, so the seven keyword rows and the “18 keywords moved to page 1”
 * line left the page rather than moving into the artwork. That is a deliberate
 * removal of live copy, which is why every one of those runs is now declared in
 * the parity script's REPLACED set — the reverse pass keeps failing on any
 * *other* drop. Same shape as the trust strip cut earlier in this redesign.
 */

export default function OnPage() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            {/* Sized rather than `fill`ed — `fill` emits no width/height, and
                every image in this build carries both. */}
            <Image
                src={onPage.background.src}
                alt=""
                aria-hidden="true"
                width={onPage.background.width}
                height={onPage.background.height}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center"
            />
            {/* Feathers the section into the ones above and below it. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_2_15/0.55)_0%,transparent_20%,transparent_80%,rgb(7_2_15/0.55)_100%)]"
            />

            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[1.15fr_0.85fr]">
                {/* ---------------------------------------------------- copy -- */}
                <div className="reveal min-w-0">
                    <Eyebrow className="text-magenta-400">{onPage.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={onPage.titleLead}
                        accent={onPage.titleTrail}
                        accentClassName="gradient-text-brand"
                        /* The site's `text-h2` clamp is sized for a
                           full-width head: at 1280 it lands on 61px, and
                           "Your Website, Optimised" alone then needs 716px of
                           a 641px column, so the title ran to three ragged
                           lines. This ramp is the same floor and a gentler
                           slope, which keeps the two-line break the mockup
                           shows from `lg` up. The block accent guarantees the
                           break falls after "Optimised" rather than wherever
                           the column edge happens to land. */
                        className="text-[clamp(2.3rem,1.25rem+3.5vw,3.8rem)]/[1.12] [&>span]:block"
                    />

                    <p className="mt-6 max-w-[54ch] text-lead text-white/65">
                        {onPage.description}
                    </p>

                    {/* Hairline under every row but the last, so the list reads
                        as a spec sheet rather than a loose bullet stack. */}
                    <ul className="m-0 mt-9 grid max-w-[46rem] list-none gap-0 p-0">
                        {onPage.points.map((point) => (
                            <li
                                key={point}
                                className="flex items-start gap-3.5 border-b border-white/[0.09] py-3.5 text-white/80 last:border-b-0"
                            >
                                <span
                                    aria-hidden="true"
                                    className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                                >
                                    <CheckIcon className="size-2.5" />
                                </span>
                                <span className="min-w-0 text-ui-15">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <LeadButton variant="primary" size="lg">
                            {onPage.ctaPrimary}
                            <ArrowIcon />
                        </LeadButton>
                        <a href={`tel:${contact.phoneE164}`} className={btn("light", "lg")}>
                            <PhoneIcon />
                            {onPage.ctaPhone}
                        </a>
                    </div>
                </div>

                {/* ------------------------------------------------- monitor -- */}
                <div className="reveal min-w-0 self-end">
                    <Image
                        src={onPage.monitor.src}
                        alt={onPage.monitorAlt}
                        width={onPage.monitor.width}
                        height={onPage.monitor.height}
                        sizes="(min-width: 1024px) 40vw, 92vw"
                        quality={90}
                        className="mx-auto h-auto w-full max-w-[42rem] lg:max-w-none"
                    />
                </div>
            </div>

        </section>
    );
}
