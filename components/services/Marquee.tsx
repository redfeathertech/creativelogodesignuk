import type { ServiceMarquee } from "@/content/services/types";

/** A single repeating line of brand-gradient text — CSS-only, matches the
    marquee treatment used elsewhere on the site. */
export default function Marquee({ data }: { data: ServiceMarquee }) {
    const copies = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="overflow-hidden bg-ink-950 py-6">
            <span className="sr-only">{data.text}</span>
            <div
                className="flex w-full animate-marquee gap-12 whitespace-nowrap"
                aria-hidden="true"
            >
                {copies.map((i) => (
                    <span
                        key={i}
                        className="gradient-text shrink-0 font-display text-h3 font-extrabold uppercase"
                    >
                        {data.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
