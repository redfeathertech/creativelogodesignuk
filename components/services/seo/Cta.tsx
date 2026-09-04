import Image from "next/image";

import { contact } from "@/content/site";
import { cta, quoteDialog } from "@/content/landing/seo-services";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { btn } from "@/components/ui/button";
import { CtaPhoneIcon } from "./heroIcons";

/**
 * Cta — the closing "Ready to Get More Customers from Google Search?" band.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The client's approved composition: their own wave backdrop bled edge to edge
 * on the `ink-950` canvas, a flanked eyebrow, the two-tone heading, the
 * standfirst and a pair of pills — the enquiry CTA and the phone number, the
 * same pairing the hero fold uses.
 *
 * **Layout only. No copy changed.** The live band is an edge-to-edge magenta →
 * coral → cream gradient with white copy on it, which measures about 1.2:1 over
 * the cream end — a genuine contrast failure the dark canvas removes rather than
 * papers over with a scrim. The eyebrow is the section's own heading trail
 * rather than new copy: this page has no eyebrow string for its closing band.
 *
 * Both buttons are `href="#"` on the live page. The primary opens the quote
 * dialog, tagged so the notification email says which CTA was clicked. The
 * live "Free SEO Report" pill was dropped from this band at the client's
 * request (2026-09): the approved composition is the enquiry CTA and the phone
 * number only. The label still ships elsewhere on the page (the quote dialog
 * tag), so nothing else needs to change for it.
 */
export default function Cta() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            {/* The backdrop. Sized rather than `fill`ed — every image in this
                build carries width/height — and `object-cover` over the band,
                which is shorter than the 1920x586 source at wide widths and
                taller than it on a phone. */}
            <Image
                src={cta.background.src}
                alt=""
                aria-hidden="true"
                width={cta.background.width}
                height={cta.background.height}
                sizes="100vw"
                quality={90}
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center"
            />
            {/* Holds the copy legible where the wave brightens on the right. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_90%_at_50%_50%,rgb(7_2_15/0.3)_0%,rgb(7_2_15/0.1)_60%,transparent_100%)]"
            />

            <div className="relative container-site text-center">
                <div className="reveal mx-auto max-w-[56rem]">
                    <Eyebrow flanked className="justify-center">
                        {quoteDialog.defaultPackage}
                    </Eyebrow>
                    <SectionHeading
                        lead={cta.titleLead}
                        accent={cta.titleTrail}
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[46rem] text-lead text-white/65">
                        {cta.description}
                    </p>

                    {/* Stacked full-width until both pills fit side by side —
                        at their intrinsic widths they overhang a 320px column,
                        and the section's `overflow-hidden` would slice the end
                        off rather than scroll it into view. */}
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                        <LeadButton
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            {cta.primary}
                        </LeadButton>
                        <a
                            href={`tel:${contact.phoneE164}`}
                            className={btn("ghost", "lg", "w-full sm:w-auto")}
                        >
                            <CtaPhoneIcon className="size-[1.15em]" />
                            {cta.phone}
                        </a>
                    </div>
</div>
</div>
</section>
    );
}
