/**
 * The four marks on the stat tiles, and the tick used on the card grids.
 *
 * Inline rather than files under `public/`: each is a handful of paths, they
 * are only ever drawn at 20-24px, and inlining means the tiles paint with the
 * HTML instead of waiting on four more requests. `currentColor` throughout, so
 * a tile picks its own accent.
 */

const box = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;

export const ChartIcon = ({ className }: { className?: string }) => (
    <svg {...box} className={className} aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M6 21V11" />
        <path d="M12 21V4" />
        <path d="M18 21v-6" />
    </svg>
);

export const TargetIcon = ({ className }: { className?: string }) => (
    <svg {...box} className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
);

export const TrendIcon = ({ className }: { className?: string }) => (
    <svg {...box} className={className} aria-hidden="true">
        <path d="M3 16.5 9 10l4 4 7.2-7.2" />
        <path d="M15.5 6.5h5v5" />
    </svg>
);

export const BadgeIcon = ({ className }: { className?: string }) => (
    <svg {...box} className={className} aria-hidden="true">
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14.2-1.3 6.3 4.8-2.6 4.8 2.6-1.3-6.3" />
    </svg>
);

/** Cycled across the four stat tiles, in the order the tiles render. */
export const STAT_ICONS = [ChartIcon, TargetIcon, TrendIcon, BadgeIcon];
