/**
 * Hero-only inline icons: the five field marks in the enquiry card, the three
 * assurance marks under it, and the scroll cue. The stat marks are client-
 * supplied PNGs (`content/home.ts`), not drawn here.
 *
 * Kept beside the hero rather than in `components/ui/icons.tsx` because nothing
 * else on the site uses them — the shared file is for marks that recur.
 * All are stroke-drawn on `currentColor`, so the caller sets the colour.
 */

type IconProps = { className?: string };

const S = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            aria-hidden="true"
            focusable="false"
            {...S}
        >
            {children}
        </svg>
    );
}

/* ------------------------------------------------------ field marks -- */

export const UserFieldIcon = (p: IconProps) => (
    <Svg {...p}>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20.4a7 7 0 0 1 14 0" />
    </Svg>
);

export const PhoneFieldIcon = (p: IconProps) => (
    <Svg {...p}>
        <path d="M7.2 3.2 9.4 7 7.8 8.9a12.4 12.4 0 0 0 6.3 6.3L16 13.6l3.8 2.2a1 1 0 0 1 .4 1.3l-1.1 2.2a1.8 1.8 0 0 1-1.9 1C9.6 19.4 4.6 14.4 3.7 6.8a1.8 1.8 0 0 1 1-1.9l2.2-1.1a1 1 0 0 1 .3 0Z" />
    </Svg>
);

export const MailFieldIcon = (p: IconProps) => (
    <Svg {...p}>
        <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.2" />
        <path d="m3.6 6.4 8.4 6.4 8.4-6.4" />
    </Svg>
);

export const ServiceFieldIcon = (p: IconProps) => (
    <Svg {...p}>
        <path d="M9.2 17.2a6 6 0 1 1 5.6 0v1.6H9.2v-1.6Z" />
        <path d="M10 21h4" />
    </Svg>
);

export const NoteFieldIcon = (p: IconProps) => (
    <Svg {...p}>
        <path d="M6 3.2h8.4L19 7.8V20a.8.8 0 0 1-.8.8H6a.8.8 0 0 1-.8-.8V4a.8.8 0 0 1 .8-.8Z" />
        <path d="M14 3.4v4.6h4.6M8.4 12h7.2M8.4 15.4h7.2M8.4 18.8h4.4" />
    </Svg>
);

/* -------------------------------------------------- assurance marks -- */

export const NoObligationIcon = (p: IconProps) => (
    <Svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.4 14a4.4 4.4 0 0 0 7.2 0" />
        <path d="M9 9.6h.01M15 9.6h.01" />
    </Svg>
);

export const QuickResponseIcon = (p: IconProps) => (
    <Svg {...p}>
        <path d="M13.4 2.4 4.8 13.2h5.6l-.8 8.4 8.6-10.8h-5.6l.8-8.4Z" />
    </Svg>
);

export const ConfidentialIcon = (p: IconProps) => (
    <Svg {...p}>
        <path d="M12 2.6 19.6 5.4v6c0 4.4-3 8.4-7.6 10-4.6-1.6-7.6-5.6-7.6-10v-6L12 2.6Z" />
        <path d="m8.8 12.2 2.2 2.2 4.2-4.4" />
    </Svg>
);

/* ------------------------------------------------------- misc marks -- */

export const LockIcon = (p: IconProps) => (
    <Svg {...p}>
        <rect x="4.6" y="10.2" width="14.8" height="11.2" rx="2.2" />
        <path d="M8.2 10.2V7.4a3.8 3.8 0 0 1 7.6 0v2.8" />
    </Svg>
);

/**
 * Scroll cue — a mouse body with a wheel that pulses.
 *
 * Drawn at its own weight rather than through `Svg`: at the size the cue
 * renders, the shared 1.5 stroke reads as a hairline outline, not a mouse.
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
