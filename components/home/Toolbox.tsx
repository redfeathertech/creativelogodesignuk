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
 * Four across from `lg:`, three from `md:`, two on phones. Sixteen tools divide
 * evenly by four, so the widest layout has no orphan on the last row.
 *
 * Below 27rem the icon sits above the label instead of beside it. Side by side
 * needs 180px of card — 32 padding + 44 icon + 16 gap + 88 for the longest name
 * ("Photoshop") — and two columns do not reach that until ~430px of viewport.
 *
 * Named breakpoints only, and no arbitrary min-width variant in px. Tailwind v4
 * cannot compare a px length to a rem one, so it emits every px-valued media
 * variant ahead of the rem-valued ones instead of in width order. A one-off px
 * variant here therefore lost the cascade to `md:grid-cols-3`, pinning the grid
 * at three on desktop. (Do not write the class form of such a variant in a
 * comment — the scanner reads comments too and will emit the rule.)
 *
 * Tool names are body text, not headings. The live site marks all 16 as `h4`,
 * which is heading spam — "Figma", "CSS" and "Vue" are labels, not section
 * titles.
 */
export default function Toolbox() {
    return (
        <section className="relative isolate bg-mist-100 py-section text-onlight">
            <div className="container-site">
                {/* Heading left, the lead-panel CTA right — the same row the
                    portfolio section above uses, so the two align. */}
                <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
                    <div>
                        <Eyebrow className="text-magenta-500">
                            {toolbox.eyebrow}
                        </Eyebrow>

                        {/* The mock stacks this heading: "Our toolbox" over
                            "for innovation". The cap that produces that break
                            is in `ch`, not px, so it tracks the fluid font size
                            and holds the same break at every width above `lg`
                            — measured, the line is 438px and the cap 398px at
                            1440, and 410 against 372 at 1024.

                            A cap and not a hard break element, which would
                            still be there on a phone, where the heading has
                            already wrapped three ways. No `text-balance` class
                            either — globals.css balances every heading on the
                            site, so adding one here would only repeat it. Below
                            `lg` the cap lifts: there is no button beside the
                            heading at that point, so it takes the container.

                            The accent's `after:` is the short rule under
                            "innovation" — a pseudo, so it adds no element and
                            cannot be read out. It paints its own background,
                            and `background-clip` is not an inherited property,
                            so the parent's clip-to-text does not erase it. */}
                        <h2 className="text-h2 lg:max-w-[11.5ch]">
                            {toolbox.titleLead}{" "}
                            <span className="gradient-text-brand relative">
                                {toolbox.titleAccent}
                            </span>
                        </h2>
                    </div>

                    <LeadButton variant="outline">{toolbox.cta}</LeadButton>
                </div>

                <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
                            className="group flex flex-col items-start gap-3 rounded-md border border-[color-mix(in_srgb,var(--tool)_38%,transparent)] bg-white p-4 shadow-[0_10px_26px_-16px_color-mix(in_srgb,var(--tool)_75%,transparent)] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--tool)_70%,transparent)] hover:shadow-[0_18px_38px_-16px_color-mix(in_srgb,var(--tool)_85%,transparent)] min-[27rem]:flex-row min-[27rem]:items-center min-[27rem]:gap-4 sm:p-5"
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
                                    "grid size-12 shrink-0 place-items-center rounded-[11px] sm:size-[3.25rem]",
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
                                            ? "size-12 sm:size-[3.25rem]"
                                            : "size-7 sm:size-8",
                                    )}
                                />
                            </span>

                            {/* min-w-0 so this can shrink as a flex item, and
                                break-words as the backstop — without both, a
                                name longer than the text column does not wrap,
                                it spills straight out through the card border. */}
                            <span className="min-w-0 flex-1">
                                <span className="block font-display text-[0.9375rem] leading-[1.2] font-bold break-words text-onlight sm:text-base">
                                    {tool.name}
                                </span>
                                <span className="mt-1 block text-xs text-onlight-muted">
                                    {tool.kind}
                                </span>
                            </span>

                            {/* The dot cluster from the design: a 3x3 field of
                                violet dots, drawn as one repeating radial
                                gradient rather than nine spans. Dropped below
                                27rem, where the card has already gone vertical
                                and the 18px it holds is the difference between
                                a name that wraps and one that does not. */}
                            <span
                                aria-hidden="true"
                                className="hidden size-[18px] shrink-0 self-center bg-[radial-gradient(var(--color-violet-400)_1.3px,transparent_1.4px)] bg-[length:7px_7px] opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100 min-[27rem]:block"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
