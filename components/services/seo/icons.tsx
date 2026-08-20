/**
 * The icons `/seo-services` needs, as inline SVG.
 *
 * The live page pulls Font Awesome 6.5.1 off cdnjs — a
 * render-blocking stylesheet plus a webfont, for thirteen glyphs. Nothing else
 * in this build loads an icon font, and these are drawn from the same 24px
 * stroke grid as `components/ui/icons.tsx` so they sit correctly beside the
 * ones that module already exports.
 *
 * Keyed rather than exported one by one because the content module names its
 * icon by string (`icon: "shield"`), which keeps the copy diffable against the
 * live markup's Font Awesome class names.
 */

export type SeoIconName =
    | "shield"
    | "contract"
    | "chart"
    | "manager"
    | "house"
    | "heart"
    | "toolbox"
    | "location"
    | "file"
    | "globe"
    | "search"
    | "pulse"
    | "link";

type IconProps = { className?: string };

const S = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
            {children}
        </svg>
    );
}

/* fa-shield-halved */
const Shield = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6l7-3Z" />
        <path {...S} d="M12 3v18" />
    </Svg>
);

/* fa-file-contract */
const Contract = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path {...S} d="M14 3v5h5" />
        <path {...S} d="M8.5 12.5h5M8.5 16h3" />
    </Svg>
);

/* fa-chart-column */
const Chart = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M4 20h16" />
        <path {...S} d="M7 20v-6M12 20V7M17 20v-9" />
    </Svg>
);

/* fa-user-tie */
const Manager = ({ className }: IconProps) => (
    <Svg className={className}>
        <circle {...S} cx="12" cy="7.5" r="3.5" />
        <path {...S} d="M5 20.5a7 7 0 0 1 14 0" />
        <path {...S} d="M12 11.5l1.4 2.2-1.4 4-1.4-4 1.4-2.2Z" />
    </Svg>
);

/* fa-house */
const House = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M4 10.5 12 4l8 6.5" />
        <path {...S} d="M6 9.8V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.8" />
        <path {...S} d="M10 20v-5h4v5" />
    </Svg>
);

/* fa-heart */
const Heart = ({ className }: IconProps) => (
    <Svg className={className}>
        <path
            {...S}
            d="M12 20s-7-4.4-7-9a3.8 3.8 0 0 1 7-2.1A3.8 3.8 0 0 1 19 11c0 4.6-7 9-7 9Z"
        />
    </Svg>
);

/* fa-toolbox */
const Toolbox = ({ className }: IconProps) => (
    <Svg className={className}>
        <rect {...S} x="3" y="8.5" width="18" height="11" rx="2" />
        <path {...S} d="M9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5" />
        <path {...S} d="M3 13h18M10 11.5v3M14 11.5v3" />
    </Svg>
);

/* fa-location-dot */
const Location = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z" />
        <circle {...S} cx="12" cy="10.5" r="2.5" />
    </Svg>
);

/* fa-file-lines */
const File = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path {...S} d="M14 3v5h5" />
        <path {...S} d="M8.5 13h7M8.5 16.5h7M8.5 9.5h2" />
    </Svg>
);

/* fa-globe */
const Globe = ({ className }: IconProps) => (
    <Svg className={className}>
        <circle {...S} cx="12" cy="12" r="8.5" />
        <path {...S} d="M3.5 12h17" />
        <path {...S} d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
    </Svg>
);

/* fa-magnifying-glass */
const Search = ({ className }: IconProps) => (
    <Svg className={className}>
        <circle {...S} cx="11" cy="11" r="6.5" />
        <path {...S} d="m16 16 4 4" />
    </Svg>
);

/* fa-heart-pulse */
const Pulse = ({ className }: IconProps) => (
    <Svg className={className}>
        <path
            {...S}
            d="M12 20s-7-4.4-7-9a3.8 3.8 0 0 1 7-2.1A3.8 3.8 0 0 1 19 11c0 4.6-7 9-7 9Z"
        />
        <path {...S} d="M5.5 12h3l1.5-2.5 2 5 1.5-2.5h3" />
    </Svg>
);

/* fa-link */
const LinkIcon = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1.5 1.5" />
        <path {...S} d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5L12.5 17" />
    </Svg>
);

export const seoIcons: Record<SeoIconName, (props: IconProps) => React.ReactElement> = {
    shield: Shield,
    contract: Contract,
    chart: Chart,
    manager: Manager,
    house: House,
    heart: Heart,
    toolbox: Toolbox,
    location: Location,
    file: File,
    globe: Globe,
    search: Search,
    pulse: Pulse,
    link: LinkIcon,
};

/** Resolves a content-module icon key to its component. */
export function SeoIcon({ name, className }: { name: SeoIconName; className?: string }) {
    const Component = seoIcons[name];
    return <Component className={className} />;
}

/* fa-paper-plane — footer email row. */
export const PaperPlaneIcon = ({ className }: IconProps) => (
    <Svg className={className}>
        <path {...S} d="M20.5 3.5 3 10.2l6.4 2.4L20.5 3.5Z" />
        <path {...S} d="M20.5 3.5 13.8 21l-4.4-8.4L20.5 3.5Z" />
    </Svg>
);
