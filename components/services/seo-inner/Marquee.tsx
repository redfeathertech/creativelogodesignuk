import type { ServiceMarquee } from "@/content/services/types";

import { SX_RAMP } from "./Shell";

/**
 * The repeating brand line between the two split bands.
 *
 * Same component as the shared service page's, re-coloured onto this family's
 * canvas and neon ramp. The text is duplicated 60 times to fill any viewport,
 * so the visible copies are `aria-hidden` and one `sr-only` copy carries the
 * line for assistive tech.
 */
export default function Marquee({ data }: { data: ServiceMarquee }) {
    const copies = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="overflow-hidden border-y border-[var(--sx-line)] bg-[var(--sx-canvas)] py-6">
            <span className="sr-only">{data.text}</span>
            <div
                className="flex w-full animate-marquee gap-12 whitespace-nowrap"
                aria-hidden="true"
            >
                {copies.map((i) => (
                    <span
                        key={i}
                        className="shrink-0 bg-clip-text pb-[0.08em] font-display text-h3 font-extrabold text-transparent uppercase"
                        style={{ backgroundImage: SX_RAMP }}
                    >
                        {data.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
