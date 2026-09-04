import type { ServiceCta } from "@/content/services/types";
import { contact } from "@/content/site";
import { btn } from "@/components/ui/button";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { PhoneIcon } from "@/components/ui/icons";
import { SxEyebrow, SxHeading } from "./Shell";

/**
 * The closing band.
 *
 * Two CTAs, as the mock draws them: the page's own `cta.button` opening the
 * lead panel, and the site phone number beside it as a real `tel:` link. The
 * number is `contact.phoneDisplay`, the same string the top bar and footer
 * render — not a second copy of it.
 */
export default function Cta({ data }: { data: ServiceCta }) {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas-2)] py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh-sx"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-grid-sx"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative container-site text-center">
                <div className="reveal mx-auto max-w-[65ch]">
                    <SxEyebrow className="justify-center">
                        {data.eyebrow}
                    </SxEyebrow>
                    <SxHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[56ch] text-lead text-white/60">
                        {data.lead}
                    </p>

                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <LeadButton variant="primary" size="lg">
                            {data.button}
                        </LeadButton>
                        <a
                            href={`tel:${contact.phoneE164}`}
                            className={btn("ghost", "lg")}
                        >
                            <PhoneIcon />
                            {contact.phoneDisplay}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
