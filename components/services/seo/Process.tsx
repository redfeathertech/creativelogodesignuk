import { process } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

/**
 * Process — "From Audit to Page One in 4 Steps".
 *
 * Rebuilt on `components/services/Process.tsx`: numbered rows separated by
 * hairlines, the number in a ringed disc on the left and the step beside it.
 * That replaces the live page's four-across timeline with its connecting rule,
 * which had nothing in common with the way every other service page sets a
 * process — and it reads at 320px without a breakpoint, where the horizontal
 * rule connected nothing and had to be hidden below `lg`.
 *
 * The numbers come from the content module (`step.number`) rather than the
 * index, so what renders is still the live page's own "01"–"04".
 *
 * Step titles are `h3` on the live page too, so the levels run h2 → h3 unbroken.
 */
export default function Process() {
    return (
        <Section tone="dark">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[62ch] text-center">
                    <Eyebrow className="justify-center">{process.eyebrow}</Eyebrow>
                    <SectionHeading
                        lead={process.titleLead}
                        accent={process.titleTrail}
                        className="mx-auto text-balance"
                    />
                </div>

                <ol className="m-0 mt-12 grid list-none gap-2 p-0">
                    {process.steps.map((step) => (
                        <li
                            key={step.number}
                            className="reveal grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-b border-white/[0.11] py-8 first:border-t"
                        >
                            <span
                                aria-hidden="true"
                                className="grid size-[52px] shrink-0 place-items-center rounded-full border border-white/20 font-display text-[1.1rem] font-extrabold text-white/60"
                            >
                                {step.number}
                            </span>
                            <div className="min-w-0">
                                <h3 className="mb-2 text-h4 text-white">{step.title}</h3>
                                <p className="text-white/65">{step.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </Section>
    );
}
