import { cn } from "@/lib/cn";

/**
 * Surface primitives for the 11 SEO inner service pages.
 *
 * A parallel set to `components/ui/Section`, not a replacement for it: those
 * primitives are wired to `ink-900` / `mist-100` / `magenta-500`, which are
 * theme tokens shared by the other 25 service pages and the whole of the site
 * chrome. This family runs its own deeper canvas and neon accent, declared as
 * page-scoped custom properties under `.seo-inner` in app/globals.css.
 *
 * Everything here is a server component. Nothing on these pages needs state
 * except the benefits tab list and the work rail, which bring their own.
 */

/** The neon ramp, used for accent words and for every gradient chip. */
export const SX_RAMP =
    "linear-gradient(97deg,var(--sx-neon) 0%,var(--sx-violet) 100%)";

/**
 * The deep brand ramp, violet -> magenta, left to right. Signed off for the
 * light bands — "What we do" and "By the numbers" — whose softer ground takes
 * an accent built from the brand pair rather than the neon one tuned for the
 * dark canvas.
 */
export const SX_RAMP_DEEP = "linear-gradient(90deg,#662e91 0%,#cc067f 100%)";

type Tone = "dark" | "dark-2" | "light" | "lilac" | "lilac-soft";

/**
 * Section wrapper.
 *
 * The two dark tones differ only in ground colour. That is enough: the mesh
 * and grid layers sit on top of both, so two adjacent dark sections read as
 * two bands rather than one long one.
 */
export function SxSection({
    children,
    tone = "dark",
    className,
    id,
}: {
    children: React.ReactNode;
    tone?: Tone;
    className?: string;
    id?: string;
}) {
    const isDark = tone === "dark" || tone === "dark-2";

    const grounds: Record<Tone, string> = {
        dark: "bg-[var(--sx-canvas)] text-white",
        "dark-2": "bg-[var(--sx-canvas-2)] text-white",
        light: "bg-white text-onlight",
        lilac: "bg-[var(--sx-lilac)] text-onlight",
        "lilac-soft": "bg-[#f8f2ff] text-onlight",
    };

    return (
        <section
            id={id}
            className={cn(
                "relative isolate overflow-hidden py-section",
                grounds[tone],
                className,
            )}
        >
            {isDark && (
                <>
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
                </>
            )}
            {children}
        </section>
    );
}

/**
 * Eyebrow label with the design's hairline bar.
 *
 * `tone` only picks the label colour — the bar is the neon ramp on both
 * surfaces, which is what ties the light and dark bands together.
 *
 * `flanked` adds the matching bar on the far side, for the centred heads. The
 * second bar is mirrored so the pair reads outward from the label rather than
 * both ramping the same way — the same treatment `components/ui/Section`'s
 * `Eyebrow` uses everywhere else on the site.
 */
export function SxEyebrow({
    children,
    tone = "dark",
    flanked = false,
    className,
}: {
    children: React.ReactNode;
    tone?: "dark" | "light";
    flanked?: boolean;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "mb-4 inline-flex items-center gap-3 font-display text-xs font-bold tracking-[0.16em] uppercase",
                tone === "dark" ? "text-[#ff7fd0]" : "text-[var(--sx-neon)]",
                className,
            )}
        >
            <span
                aria-hidden="true"
                className="h-0.5 w-[clamp(28px,6vw,60px)] shrink-0 rounded-sm"
                style={{ backgroundImage: SX_RAMP }}
            />
            {children}
            {flanked && (
                <span
                    aria-hidden="true"
                    className="h-0.5 w-[clamp(28px,6vw,60px)] shrink-0 rotate-180 rounded-sm"
                    style={{ backgroundImage: SX_RAMP }}
                />
            )}
        </span>
    );
}

/**
 * Section heading. `lead` and `accent` are separate content fields on every
 * service module, and the accent half always carries the neon ramp as clipped
 * text — the two-tone treatment the mock uses on every band.
 *
 * `background-clip: text` needs a painted background, so the ramp is applied
 * inline rather than through a utility: the two grounds want different
 * stops and a single `@utility` could only carry one.
 */
export function SxHeading({
    lead,
    accent,
    as: Tag = "h2",
    className,
    ramp = SX_RAMP,
}: {
    lead: string;
    accent?: string;
    as?: "h1" | "h2";
    className?: string;
    /** Override the accent ramp — see `SX_RAMP_DEEP`. */
    ramp?: string;
}) {
    return (
        <Tag className={cn(Tag === "h1" ? "text-h1" : "text-h2", className)}>
            {lead}
            {accent && (
                <>
                    {" "}
                    <span
                        className="bg-clip-text pb-[0.08em] text-transparent"
                        style={{ backgroundImage: ramp }}
                    >
                        {accent}
                    </span>
                </>
            )}
        </Tag>
    );
}

/**
 * The numbered chip on the plan and process cards — a gradient ring with the
 * two-digit index inside it. `aria-hidden`: the order is already carried by
 * the `<ol>` the chips sit in, so reading "01" aloud only doubles it up.
 */
export function SxNumber({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "grid size-12 shrink-0 place-items-center rounded-full font-display text-ui-15 font-extrabold text-white",
                className,
            )}
            style={{ backgroundImage: SX_RAMP }}
        >
            {String(index).padStart(2, "0")}
        </span>
    );
}
