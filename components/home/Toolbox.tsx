import Image from "next/image";

import { toolbox } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { cn } from "@/lib/cn";

/**
 * "Creative toolkit" — the sixteen-tool grid, rebuilt to the approved design.
 *
 * Not one string moved: the eyebrow, the heading and the button label are the
 * live copy (see the note on `toolbox.cta` in content/home.ts for the one place
 * the mock rewrites existing copy and the rewrite is not taken). Everything
 * below is layout.
 *
 * **Each card is tinted by its own tool.** `tool.accent` — sampled from that
 * tool's own artwork, see content/home.ts — is handed to the card as a `--tool`
 * custom property and every coloured surface on it (hairline, glow, icon plate,
 * the hover state) is a `color-mix()` off that one value, so a tool's colour is
 * set in exactly one place and the sixteen cards cannot drift apart. Alpha comes
 * from `color-mix`, not from an `opacity` on the element, which would fade the
 * icon and the label with it.
 *
 * The card is a row at every width — mark on the left, name and kind beside it,
 * as drawn — and it stays three across on a phone, four from `lg:`. Sixteen
 * tools divide evenly by four, so the widest layout has no orphan on the last
 * row; the three-column rows leave "CSS" alone at the foot, as drawn.
 *
 * Three columns and a row card is the tightest combination on the page, so the
 * mark, the gaps and the type all step down to pay for it: a 20px plate and a
 * 4px gap at the narrowest, against 52px and 12px from `md`, with six type
 * steps on the name in between (the table further down). Measured over CDP at
 * 15 widths from 320 to 1440, every one of the sixteen names holds one line.
 *
 * A 4-step pad and a 3-step gap at `md`, not the 5 and 4 this had: with the
 * dot cluster and a 52px mark on a three-column card, 768 and 1024 left 80.6px
 * of text column against 91.7px for "Photoshop" at 16px, and six of the sixteen
 * names wrapped mid-word on desktop. Trimming 12px off the box takes the column
 * to 96.6px, and the cluster stays.
 *
 * Named breakpoints only, and no arbitrary min-width variant in px. Tailwind v4
 * cannot compare a px length to a rem one, so it emits every px-valued media
 * variant ahead of the rem-valued ones instead of in width order. A one-off px
 * variant here therefore lost the cascade to the named column variants, pinning
 * the grid at three on desktop. (Do not write the class form of such a variant in a
 * comment — the scanner reads comments too and will emit the rule.)
 *
 * Tool names are body text, not headings. The live site marks all 16 as `h4`,
 * which is heading spam — "Figma", "CSS" and "Vue" are labels, not section
 * titles.
 */
export default function Toolbox() {
    return (
        <section className="relative isolate bg-mist-100 py-section text-onlight">
            {/* One flex container for the whole band, not a head row with the
                grid under it: below `lg` the CTA moves to the foot of the
                section — under the grid, as drawn — and `order` is what gets it
                there without rendering the button twice. Above `lg` no `order`
                applies, so DOM order stands and the wrap puts the head and the
                button on one row with the full-width grid beneath. */}
            <div className="container-site flex flex-col lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-12">
                <div className="reveal max-lg:text-center">
                    <Eyebrow className="text-magenta-500 max-lg:justify-center max-lg:[&>span]:hidden">
                        {toolbox.eyebrow}
                    </Eyebrow>

                    {/* The mock stacks this heading: "Our toolbox" over
                        "for innovation". The cap that produces that break is in
                        `ch`, not px, so it tracks the fluid font size and holds
                        the same break at every width above `lg` — measured, the
                        line is 438px and the cap 398px at 1440, and 410 against
                        372 at 1024.

                        A cap and not a hard break element, which would still be
                        there on a phone, where the heading has already wrapped
                        three ways. No `text-balance` class either —
                        globals.css balances every heading on the site, so
                        adding one here would only repeat it. Below `lg` the cap
                        lifts: there is no button beside the heading at that
                        point, so it takes the container.

                        The accent's `after:` is the short rule under
                        "innovation" — a pseudo, so it adds no element and
                        cannot be read out. It paints its own background, and
                        `background-clip` is not an inherited property, so the
                        parent's clip-to-text does not erase it. */}
                    <h2 className="text-h2 lg:max-w-[11.5ch]">
                        {toolbox.titleLead}{" "}
                        <span className="gradient-text-brand relative">
                            {toolbox.titleAccent}
                        </span>
                    </h2>
                </div>

                {/* Centred, never full-bleed: the mock insets the pill from
                    both edges of the grid, and with three columns on a phone a
                    stretched button would run the width of the whole grid. */}
                <LeadButton
                    variant="outline"
                    className="max-lg:order-2 max-lg:mt-10 max-lg:self-center"
                >
                    {toolbox.cta}
                </LeadButton>

                {/* `w-full` so the grid takes a wrapped row of its own once the
                    container turns into a row at `lg`. */}
                <ul className="mt-12 grid w-full grid-cols-3 gap-2 max-lg:order-1 min-[30rem]:gap-3 md:gap-4 lg:grid-cols-4">
                    {toolbox.tools.map((tool) => (
                        <li
                            key={tool.name}
                            style={
                                { "--tool": tool.accent } as React.CSSProperties
                            }
                            /* `translate`, not `transform`: Tailwind v4 drives
                               `-translate-y-*` off the standalone `translate`
                               property, so a list naming `transform` left this
                               lift snapping while the shadow eased. */
                            className="group flex items-center gap-1 rounded-md border border-[color-mix(in_srgb,var(--tool)_38%,transparent)] bg-white p-2 shadow-[0_10px_26px_-16px_color-mix(in_srgb,var(--tool)_75%,transparent)] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--tool)_70%,transparent)] hover:shadow-[0_18px_38px_-16px_color-mix(in_srgb,var(--tool)_85%,transparent)] min-[22.5rem]:gap-1.5 min-[30rem]:gap-2 min-[30rem]:p-2.5 min-[36rem]:gap-3 min-[36rem]:p-3 md:gap-3 md:p-4"
                        >
                            {/* The mark, in a fixed square box so sixteen
                                assets of eight different aspect ratios still
                                line up down the column — `object-contain`
                                letterboxes each one inside it rather than
                                stretching it.

                                Two treatments, driven by `plated`: the ten
                                marks that ship as a coloured tile (the Adobe
                                six, Swift, MVVM, TypeScript, CSS) fill the box
                                and get no plate, because a tint behind an opaque
                                tile only shows as a rim around it. The six bare
                                glyphs sit inset on a plate mixed from their own
                                accent, which is what stops a white Figma mark
                                from floating on a white card. */}
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "grid size-5 shrink-0 place-items-center rounded-[6px] min-[22.5rem]:size-6 min-[22.5rem]:rounded-[7px] min-[30rem]:size-7 min-[36rem]:size-10 min-[36rem]:rounded-[11px] md:size-[3.25rem]",
                                    !tool.plated &&
                                        "bg-[color-mix(in_srgb,var(--tool)_10%,white)] transition-colors duration-300 ease-out group-hover:bg-[color-mix(in_srgb,var(--tool)_18%,white)]",
                                )}
                            >
                                <Image
                                    src={tool.icon}
                                    alt={`${tool.name} logo`}
                                    width={tool.w}
                                    height={tool.h}
                                    /* SVG is already the smallest form the
                                       optimiser could produce, and Next refuses
                                       to run it through /_next/image without
                                       `dangerouslyAllowSVG`. Alamofire and MVVM
                                       are still raster, so they keep the
                                       AVIF/WebP pipeline. */
                                    unoptimized={tool.icon.endsWith(".svg")}
                                    className={cn(
                                        "object-contain",
                                        tool.plated
                                            ? "size-5 min-[22.5rem]:size-6 min-[30rem]:size-7 min-[36rem]:size-10 md:size-[3.25rem]"
                                            : "size-3.5 min-[22.5rem]:size-4 min-[30rem]:size-[1.125rem] min-[36rem]:size-6 md:size-8",
                                    )}
                                />
                            </span>

                            {/* `min-w-0` so this can shrink as a flex item —
                                the card is a row at every width — and `break-words`
                                as the backstop: without both, a name longer than the
                                text column does not wrap, it spills straight out
                                through the card border. `flex-1` supplies
                                `flex-basis: 0%`, so the text column is whatever the
                                card has left after the mark and the gap.

                                The type steps below are measured off that remainder,
                                not picked. "Photoshop" is the widest of the sixteen
                                names and the only one with no space to break at, so it
                                is what every step is set against. Measured over CDP on
                                the built page, not computed — the text column is what
                                the card has left after its padding, the mark and the
                                gap, and the last column is the name at that step:

                                  width   text col   step   "Photoshop"
                                   320px    46.0px    8px      45.8px
                                   360px    53.3px    9px      51.6px
                                   375px    58.3px    9px      51.6px
                                   390px    63.3px   10px      57.3px
                                   414px    71.1px   11px      63.0px
                                   480px    79.1px   12px      68.7px
                                   576px    89.2px   14px      80.2px
                                   768px    96.6px   16px      91.7px

                                Each step is the largest size that still clears the
                                column at the width it fires. 320 is the one that needed
                                the box as well as the type: at 24px of plate and 6px of
                                gap the column is 40px and no readable size fits, so the
                                narrowest tier drops the plate to 20px and the gap to
                                4px, which buys the 6px that makes an 8px label fit.

                                `hyphens-auto` was tried here first and is not what
                                shipped: Chrome only hyphenates where the platform ships
                                a dictionary for the `lang`, and in headless it silently
                                falls back to the same mid-word cut, so it could not be
                                verified as the thing holding 320 together.
                                `break-words` stays as the backstop for a name none of
                                this anticipates. */}
                            <span className="min-w-0 flex-1">
                                <span className="block font-display text-[0.5rem] leading-[1.2] font-bold break-words text-onlight min-[22.5rem]:text-[0.5625rem] min-[23.5rem]:text-[0.625rem] min-[25rem]:text-[0.6875rem] min-[30rem]:text-xs min-[36rem]:text-sm md:text-base">
                                    {tool.name}
                                </span>
                                <span className="mt-0.5 block text-[0.4375rem] leading-[1.3] text-onlight-muted min-[22.5rem]:text-[0.5rem] min-[23.5rem]:text-[0.5625rem] min-[25rem]:text-[0.625rem] min-[30rem]:text-[0.6875rem] min-[36rem]:mt-1 min-[36rem]:text-xs">
                                    {tool.kind}
                                </span>
                            </span>

                            {/* The dot cluster from the design: a 3x3 field of
                                violet dots, drawn as one repeating radial
                                gradient rather than nine spans. Held back a
                                breakpoint further now: on a three-column card
                                the 18px it takes plus its gap is the whole
                                difference between "Photoshop" on one line and
                                on two, and the cluster is decoration. */}
                            <span
                                aria-hidden="true"
                                className="hidden size-[18px] shrink-0 self-center bg-[radial-gradient(var(--color-violet-400)_1.3px,transparent_1.4px)] bg-[length:7px_7px] opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100 md:block"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
