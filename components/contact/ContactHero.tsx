import Image from "next/image";

import { contactHero } from "@/content/contact";
import { contact } from "@/content/site";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import { btn } from "@/components/ui/button";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";

/**
 * Contact hero — the same inner-page shell as `AboutHero`: header, breadcrumb
 * and heading all visible at once, and the section ends inside the fold.
 *
 * The two calls to action are the page's whole reason for existing, so unlike
 * the About hero neither of them opens a panel — one dials, one composes an
 * email. Both are plain links, which means they work with JavaScript disabled
 * and a crawler can see the phone number and address in the HTML.
 *
 * The artwork is a transparent-background collage, so it gets a soft brand glow
 * behind it rather than the rounded card the clduk redesign gave it — a card
 * with a shadow around transparent art draws a box where the visitor sees none.
 */
export default function ContactHero({ trail }: { trail: readonly Crumb[] }) {
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
                        <Eyebrow>{contactHero.eyebrow}</Eyebrow>

                        <SectionHeading
                            as="h1"
                            lead={contactHero.titleLead}
                            accent={contactHero.titleAccent}
                            trail={contactHero.titleTrail}
                        />

                        <p className="mt-6 max-w-[62ch] text-lead text-white/65">{contactHero.lead}</p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {/* The icons are wrapped so the button recipe's
                                `[&>svg]` arrow nudge does not reach them — it is
                                meant for a trailing arrow, and on a leading icon
                                it squeezes the gap on hover. */}
                            <a href={`tel:${contact.phoneE164}`} className={btn("primary", "lg")}>
                                <span className="shrink-0" aria-hidden="true">
                                    <PhoneIcon />
                                </span>
                                {contact.phoneDisplay}
                            </a>
                            <a href={`mailto:${contact.email}`} className={btn("ghost", "lg")}>
                                <span className="shrink-0" aria-hidden="true">
                                    <MailIcon />
                                </span>
                                {contactHero.secondaryCta}
                            </a>
                        </div>
                    </div>

                    <div className="reveal relative mx-auto w-full max-w-[520px] lg:max-w-none">
                        <div
                            className="pointer-events-none absolute inset-[12%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(204_6_127/0.45),transparent_70%)] blur-3xl"
                            aria-hidden="true"
                        />
                        {/* `sizes` describes the wrapper above it, not the
                            viewport: the image is capped at 520px until `lg`,
                            and above `lg` it is 5/12 of the container, which
                            tops out with the container itself at 1560px.
                            Measured widths: 280px at 320, 520px from 576 to
                            991, 355px at 992, 533px at 1440, 583px at 1560 and
                            up. A vw-proportional `sizes` would claim 813px at
                            991 and make the browser fetch a candidate two steps
                            too large — on a preloaded image. */}
                        <Image
                            src={contactHero.image.src}
                            alt={contactHero.image.alt}
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
