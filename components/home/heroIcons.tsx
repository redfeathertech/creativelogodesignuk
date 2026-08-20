/**
 * Hero-only inline icons.
 *
 * One mark left: the scroll cue. The enquiry card's field, assurance and lock
 * marks used to live here too, and moved to `components/forms/fieldIcons.tsx`
 * when the proposal band started rendering the same card — the shared file is
 * for marks that recur, and those eight now do. The stat marks are
 * client-supplied PNGs (`content/home.ts`), not drawn here.
 */

type IconProps = { className?: string };

/**
 * Scroll cue — a mouse body with a wheel that pulses.
 *
 * Drawn at its own weight rather than at the shared 1.5 stroke: at the size the
 * cue renders, that reads as a hairline outline, not a mouse.
 */
export const ScrollMouseIcon = ({ className }: IconProps) => (
    <svg
        viewBox="0 0 24 34"
        className={className}
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2.4" y="1.8" width="19.2" height="30.4" rx="9.6" />
        <path
            d="M12 8v5.4"
            strokeWidth={2.8}
            className="animate-scroll-hint origin-top"
        />
    </svg>
);
