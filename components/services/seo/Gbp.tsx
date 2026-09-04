import Image from "next/image";

import { gbp } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Gbp — "Win the Local Map Pack".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 2026-09 REDESIGN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Was a split with a hand-built dark mockup of a Business Profile panel filling
 * the left column. Rebuilt to the client's approved composition: their own
 * illustration left, the pitch and its checklist right, and the four insight
 * figures lifted out of the mockup into a light stat row that runs the full
 * width beneath the split.
 *
 * Every string is untouched — eyebrow, heading, standfirst, all five checklist
 * points, the card heading, all four stat labels/values/notes and the CTA
 * label, still gated in both directions by
 * `scripts/verify-seo-services-parity.py`. Only the artwork keys are new, and
 * those are NOT_COPY there.
 *
 * The figures describe no real client — they illustrate what a managed profile
 * reports — and they are plain labelled text, so they read fine aloud and stay
 * in the accessibility tree.
 *
 * Stat figures render as `<p>`, not the live page's `<h3>` — "1,842" titles
 * nothing, and `Hero` treats its four stat boxes the same way. The row's own
 * heading carries the `h3`.
 */

type Stat = (typeof gbp.stats)[number];

/**
 * Split a stat note into its figure and the words after it, so the figure can
 * take the brand magenta and the words plain black — "↑ +34%" / " vs last
 * month", "142" / " reviews".
 *
 * This is styling, not an edit: the halves render as adjacent inline runs, the
 * space between them is preserved in `rest`, and the note reads back character
 * for character. The content module has one string per note and no tone field,
 * so the shape of the copy — an optional arrow, one figure token, then prose —
 * is what carries the split.
 */
const splitNote = (note: Stat["note"]) => {
    const m = /^(↑\s*)?(\S+)(.*)$/.exec(note);
    return m ? { figure: `${m[1] ?? ""}${m[2]}`, rest: m[3] } : { figure: note, rest: "" };
};

export default function Gbp() {
    return (
        <Section tone="light">
            <div className="container-site">
                <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2">
                    {/* ------------------------------------------------ artwork -- */}
                    <div className="reveal min-w-0 lg:order-first">
                        <Image
                            src={gbp.image.src}
                            alt={gbp.imageAlt}
                            width={gbp.image.width}
                            height={gbp.image.height}
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            quality={90}
                            className="mx-auto h-auto w-full max-w-[34rem] rounded-md object-cover lg:max-w-none"
                        />
                    </div>

                    {/* --------------------------------------------------- copy -- */}
                    <div className="reveal min-w-0">
                        <Eyebrow className="text-magenta-500">{gbp.eyebrow}</Eyebrow>
                        <SectionHeading
                            lead={gbp.titleLead}
                            accent={gbp.titleTrail}
                            accentClassName="gradient-text-brand"
                            /* The accent breaks onto its own line, as the
                               mockup shows, rather than wrapping wherever the
                               column edge happens to land. */
                            className="text-[clamp(2rem,1.1rem+3vw,3.25rem)]/[1.14] [&>span]:block"
                        />

                        <p className="mt-6 max-w-[58ch] text-lead text-onlight-muted">
                            {gbp.description}
                        </p>

                        <ul className="m-0 mt-8 grid list-none gap-4 p-0">
                            {gbp.points.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-start gap-3 text-ui-15 text-onlight-muted"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                                    >
                                        <CheckIcon className="size-2.5" />
                                    </span>
                                    <span className="min-w-0">{point}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-9">
                            <LeadButton variant="primary" size="lg">
                                {gbp.cta}
                            </LeadButton>
                        </div>
                    </div>
                </div>

                {/* -------------------------------------------------- insights -- */}
                <div className="reveal mt-[clamp(2.5rem,1.5rem+4vw,4rem)]">
                    <h3 className="font-display text-sm font-bold tracking-[0.14em] text-magenta-600 uppercase">
                        {gbp.cardHeading}
                    </h3>

                    <ul className="m-0 mt-5 grid list-none gap-4 p-0 min-[576px]:grid-cols-2 lg:grid-cols-4">
                        {gbp.stats.map((stat) => {
                            const note = splitNote(stat.note);

                            return (
                                <li
                                    key={stat.label}
                                    className="flex min-w-0 flex-col rounded-sm border border-black/8 bg-white px-5 py-5 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-magenta-50">
                                            <Image
                                                src={stat.iconSrc}
                                                alt=""
                                                aria-hidden="true"
                                                width={stat.iconWidth}
                                                height={stat.iconHeight}
                                                className="h-7 w-auto"
                                            />
                                        </span>

                                        {/* Every figure carries the brand gradient —
                                            violet #662e91 to magenta #cc067f — so the
                                            row reads as one set rather than one flagged
                                            number and three plain ones. `highlight` on
                                            the first stat is no longer a colour
                                            switch. */}
                                        <p className="gradient-text-brand m-0 min-w-0 font-display text-h4 leading-none font-extrabold">
                                            {stat.value}
                                        </p>
                                    </div>

                                    <p className="m-0 mt-4 text-xs font-semibold tracking-[0.08em] text-onlight-muted uppercase">
                                        {stat.label}
                                    </p>

                                    <p className="m-0 mt-1.5 text-ui-13 leading-snug text-black">
                                        <span className="text-magenta-500">{note.figure}</span>
                                        {note.rest}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
