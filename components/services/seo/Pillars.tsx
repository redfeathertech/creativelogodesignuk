import { pillars } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Pillars — "How Our SEO Service Works", three cards.
 *
 * Laid out on the `About` card grammar: `light-alt` surface, centred head, and
 * white cards with a `shadow-md` lift. The live page tints each card's top edge
 * a different colour (`accent` in the content module — and on the live page the
 * "blue" rule actually resolves to the same coral as the rest of the ramp). On
 * the brand palette the three tints become one shared gradient rule across the
 * top of every card, which is what the rest of the site does with an accent
 * edge; the tag keeps a per-card colour so the three are still told apart.
 *
 * The accent is data, so the classes have to be looked up from a literal map:
 * Tailwind scans source text, and a template-interpolated class name is
 * invisible to it. Every string below is therefore written out in full.
 */

type Accent = (typeof pillars.items)[number]["accent"];

const accentText: Record<Accent, string> = {
    blue: "text-violet-500",
    green: "text-teal-600",
    pink: "text-magenta-500",
};

export default function Pillars() {
    return (
        <Section tone="light-alt">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow className="justify-center text-magenta-500">
                        {pillars.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={pillars.title}
                        accentClassName="gradient-text-brand"
                        className="mx-auto text-balance"
                    />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-onlight-muted">
                        {pillars.description}
                    </p>
                </div>

                <ul className="m-0 mt-12 grid list-none gap-6 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {pillars.items.map((item) => (
                        <li
                            key={item.tag}
                            className="reveal min-w-0 overflow-hidden rounded-lg bg-white shadow-md"
                        >
                            {/* The live card's tinted top edge, as a bar rather
                                than a border — a `border-image` gradient squares
                                off the corners the card is rounded on. */}
                            <div
                                aria-hidden="true"
                                className="h-[5px] w-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]"
                            />

                            <div className="p-8">
                                <p
                                    className={`m-0 font-display text-[0.8125rem] font-bold tracking-[0.2em] uppercase ${accentText[item.accent]}`}
                                >
                                    {item.tag}
                                </p>

                                <h3 className="mt-5 font-display text-h5 font-bold text-onlight">
                                    {item.title}
                                </h3>

                                <p className="mt-5 text-sm text-onlight-muted">{item.text}</p>

                                <ul className="m-0 mt-7 grid list-none gap-4 p-0">
                                    {item.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-3 text-sm text-onlight-muted"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-magenta-50 text-magenta-600"
                                            >
                                                <CheckIcon className="size-3" />
                                            </span>
                                            <span className="min-w-0">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
