import { about } from "@/content/home";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Full-bleed gradient band used to punctuate the page between section groups.
 *
 * Takes its heading as a prop and its CTA label from content/home.ts, so it
 * introduces no copy of its own — the caller composes it from strings that
 * already exist and already rank.
 *
 * Deliberately short: this is punctuation between sections, not a section, so
 * it uses `py-band` rather than `py-section`.
 */
export default function CtaBand({ heading }: { heading: string }) {
    return (
        <section className="relative isolate overflow-hidden bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] py-band text-white">
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative z-[1] container-site flex flex-wrap items-center justify-between gap-8">
                <p className="max-w-[34ch] min-w-0 font-display text-h3 font-extrabold">
                    {heading}
                </p>
                <LeadButton variant="light" size="lg">
                    {about.primaryCta}
                </LeadButton>
            </div>
        </section>
    );
}
