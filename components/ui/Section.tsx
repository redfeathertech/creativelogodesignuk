import { cn } from "@/lib/cn";

/**
 * Small eyebrow label above a section heading.
 *
 * The leading hairline bar is part of the mark — it is what ties the eyebrow to
 * the heading beneath it on every section of the clduk design.
 *
 * `flanked` adds the matching bar on the far side, for the sections whose head
 * is centred rather than left-aligned (components/home/Methodology.tsx). The
 * second bar mirrors the gradient so the pair reads outward from the label
 * instead of both ramping the same way.
 */
export function Eyebrow({
  children,
  className,
  flanked = false,
}: {
  children: React.ReactNode;
  className?: string;
  flanked?: boolean;
}) {
  const bar =
    "h-0.5 w-[clamp(28px,6vw,60px)] shrink-0 rounded-sm bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]";

  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-3 font-display text-xs font-bold tracking-[0.14em] text-magenta-300 uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className={bar} />
      {children}
      {flanked && <span aria-hidden="true" className={cn(bar, "rotate-180")} />}
    </span>
  );
}

/**
 * Section wrapper. `tone` picks the surface, which also flips the text colours
 * for everything inside via the `text-*` class on the section.
 *
 * Dark sections carry the brand mesh and a film grain, so the near-black canvas
 * never reads as flat black.
 */
export function Section({
  children,
  tone = "dark",
  className,
  id,
  ariaLabel,
}: {
  children: React.ReactNode;
  tone?: "dark" | "darker" | "light" | "light-alt";
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  const tones = {
    dark: "bg-ink-900 text-white",
    darker: "bg-ink-950 text-white",
    light: "bg-white text-onlight",
    "light-alt": "bg-mist-100 text-onlight",
  } as const;

  const isDark = tone === "dark" || tone === "darker";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative isolate py-section", tones[tone], className)}
    >
      {isDark && (
        <>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.42] mix-blend-overlay"
            aria-hidden="true"
          />
        </>
      )}
      {children}
    </section>
  );
}

/**
 * Section header: title on the left, an optional action on the right, stacking
 * on narrow screens.
 */
export function SectionHead({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mb-12 flex flex-wrap items-end justify-between gap-6", className)}
    >
      <div className="max-w-[58ch]">{children}</div>
      {action}
    </div>
  );
}

/**
 * Section heading. `lead` + `accent` render as one <h2> with the accent span
 * carrying the brand gradient — matching the approved design, where every
 * section title has a two-tone treatment.
 *
 * `accentClassName` swaps the gradient for the saturated brand ramp on light
 * surfaces, where the pale one has too little contrast.
 */
export function SectionHeading({
  lead,
  accent,
  trail,
  as: Tag = "h2",
  className,
  accentClassName = "gradient-text",
}: {
  lead: string;
  accent?: string;
  trail?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  accentClassName?: string;
}) {
  return (
    <Tag className={cn(Tag === "h1" ? "text-h1" : "text-h2", className)}>
      {lead}
      {accent && (
        <>
          {" "}
          <span className={accentClassName}>{accent}</span>
        </>
      )}
      {trail}
    </Tag>
  );
}
