import Image from "next/image";

import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * Trustpilot review badge.
 *
 * Two pieces, for two different reasons:
 *
 * - The **star row** is inline SVG. Trustpilot's rating boxes are a flat green
 *   square plus a white five-point star, which vector reproduces exactly and
 *   stays crisp at any size — a bitmap of it would not.
 * - The **logo lockup** (star + wordmark) is a bitmap, because the wordmark is
 *   a licensed typeface. It is the asset the live site already serves, cropped
 *   to the lockup so it can sit on one line beside the stars. It is drawn at
 *   28px tall against a 50px-tall source, so it is still ~1.8× oversampled.
 *
 * A rating figure and review count are only shown where a caller passes them.
 * They are claims about a third party and go stale the moment a review lands,
 * so they are never assumed here.
 */

/* Five-point star inscribed in a 36×36 box: outer radius 13.5, inner 5.16
   (0.382 × outer — the pentagram ratio Trustpilot's mark uses). */
const STAR_PATH =
  "M18 4.5 21.03 13.83 30.84 13.83 22.9 19.59 25.93 28.92 18 23.16 " +
  "10.06 28.92 13.09 19.59 5.16 13.83 14.97 13.83Z";

const TRUSTPILOT_GREEN = "#00b67a";

/** The rating row: `count` filled boxes, 36 wide with a 4 gutter between. */
function TrustpilotStars({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${count * 40 - 4} 36`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`translate(${i * 40} 0)`}>
          <rect width="36" height="36" fill={TRUSTPILOT_GREEN} />
          <path d={STAR_PATH} fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

/**
 * `rating` and `reviewCount` are optional: they are claims about a third party
 * and go stale the moment a review lands, so they are never assumed here. The
 * homepage passes both (its design states them); the landing heroes pass
 * neither and fall back to `label`.
 *
 * `full` is the phone treatment from the approved hero design: below `sm` the
 * pill chrome comes off and the badge becomes a full-width bar with the review
 * count always shown, sized in `vw` so the whole lockup — stars, rating, logo
 * and count — still fits the 280px a 320px screen leaves inside the gutter.
 * Everything from `sm` up is untouched, so the landing heroes, which do not
 * pass it, keep the pill at every width.
 */
export default function TrustpilotBadge({
  href,
  label,
  logo,
  logoAlt,
  stars,
  linkLabel,
  className,
  rating,
  reviewCount,
  full = false,
}: {
  href: string;
  label: string;
  logo: string;
  logoAlt: string;
  stars: number;
  linkLabel: string;
  className?: string;
  rating?: string;
  reviewCount?: string;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      /* The badge is one link, so it gets one accessible name — everything
         inside it is decorative to a screen reader. */
      aria-label={`${linkLabel} (opens in a new tab)`}
      className={cn(
        /* Compact is the base size; the full size is an enhancement gated on
           BOTH axes having room — 40rem of width (below it a 320px screen only
           leaves 280px of column, and everything inside is `shrink-0`) and
           54rem of height (below it the hero has no vertical slack left to
           spend, and the badge is the last thing that should push it past the
           fold). Written as one combined query rather than `sm:` plus a
           max-height override, so there is no variant ordering to get wrong —
           the same trap `--breakpoint-lg` documents in globals.css. */
        "group relative inline-flex w-fit max-w-full items-center gap-2.5 rounded-full",
        "border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 backdrop-blur-md",
        "[@media(min-width:40rem)_and_(min-height:54rem)]:gap-3",
        "[@media(min-width:40rem)_and_(min-height:54rem)]:px-4",
        "[@media(min-width:40rem)_and_(min-height:54rem)]:py-2.5",
        /* `translate`, not `transform`: Tailwind v4 implements `-translate-y-*`
           with the standalone `translate` property, so a transition list naming
           `transform` leaves the hover lift to snap. */
        "transition-[translate,border-color,background-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--tp)_45%,transparent)]",
        "hover:bg-white/[0.08] hover:shadow-[0_16px_40px_-16px_color-mix(in_srgb,var(--tp)_60%,transparent)]",
        full &&
          "max-sm:w-full max-sm:justify-center max-sm:gap-[clamp(0.25rem,1.8vw,0.625rem)] " +
            "max-sm:rounded-none max-sm:border-transparent max-sm:bg-transparent " +
            "max-sm:px-0 max-sm:py-1 max-sm:backdrop-blur-none",
        className,
      )}
      style={{ "--tp": TRUSTPILOT_GREEN } as React.CSSProperties}
    >
      <TrustpilotStars
        count={stars}
        className={cn(
          "h-4 w-auto shrink-0 [@media(min-width:40rem)_and_(min-height:54rem)]:h-[17px]",
          full && "max-sm:h-[clamp(0.75rem,4.1vw,1.25rem)]",
        )}
      />

      {rating && (
        <span
          className={cn(
            "shrink-0 font-display text-sm leading-none font-extrabold text-white [@media(min-width:40rem)_and_(min-height:54rem)]:text-ui-15",
            full && "max-sm:text-[clamp(0.6875rem,3.4vw,1rem)]",
          )}
          aria-hidden="true"
        >
          {rating}
        </span>
      )}

      <span
        className={cn(
          "h-4 w-px shrink-0 bg-white/15 [@media(min-width:40rem)_and_(min-height:54rem)]:h-5",
          full && "max-sm:h-[clamp(0.625rem,2.8vw,1rem)]",
        )}
        aria-hidden="true"
      />

      <Image
        src={logo}
        alt={logoAlt}
        width={200}
        height={50}
        quality={90}
        className={cn(
          "h-6 w-auto shrink-0 [@media(min-width:40rem)_and_(min-height:54rem)]:h-7",
          full && "max-sm:h-[clamp(0.875rem,5.2vw,1.5rem)]",
        )}
        aria-hidden="true"
      />

      {/* Hidden between lg and xl: that is the band where the hero splits into
          two columns but the copy column has not grown back, and the label is
          the only part of the badge that is not the Trustpilot mark itself. */}
      <span
        className={cn(
          "hidden text-xs font-semibold tracking-[0.02em] whitespace-nowrap text-white/55 transition-colors duration-300 group-hover:text-white/85 sm:inline lg:hidden xl:inline",
          full && "max-sm:inline max-sm:text-[clamp(0.5rem,2.9vw,0.75rem)]",
        )}
        aria-hidden="true"
      >
        {reviewCount ?? label}
      </span>

      {/* Dropped from the full-width bar: with the pill gone there is no
          affordance for it to sit inside, and the count needs the room. */}
      <ArrowIcon
        className={cn(
          "shrink-0 text-white/45 transition-all duration-300 ease-out group-hover:translate-x-[3px] group-hover:text-white/85",
          full && "max-sm:hidden",
        )}
      />
    </a>
  );
}
