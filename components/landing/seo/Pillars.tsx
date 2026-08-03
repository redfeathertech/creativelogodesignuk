import { pillars } from "@/content/landing/seo-services";

/**
 * Pillars — "How Our SEO Service Works", three accented cards.
 *
 * The accent is data (`item.accent`), so the classes have to be looked up from
 * a literal map: Tailwind scans source text, and a template-interpolated class
 * name is invisible to it. Every string below is therefore written out in full.
 *
 * On the live page the `zt-seo-border-blue` card is not blue — the rule resolves
 * to `--rf-primary-light`, the same coral as the rest of the ramp. The key name
 * is kept (it is content-module data) and mapped to the coral token, which is
 * what actually renders.
 *
 * Borders are declared per side rather than as `border` + a `border-t-*`
 * override: two utilities that set the same property leave the winner up to
 * Tailwind's emitted order, and nothing here overlaps this way.
 */

type Accent = (typeof pillars.items)[number]["accent"];

const accents: Record<Accent, { border: string; text: string }> = {
    blue: { border: "border-t-seo-coral", text: "text-seo-coral" },
    green: { border: "border-t-green-500", text: "text-green-600" },
    pink: { border: "border-t-seo-pink", text: "text-seo-pink" },
};

/** Decorative tick, standing in for the live list's `::before { content: "✓" }`. */
function Tick({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
            <path
                d="m5 12.5 4.5 4.5L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Pillars() {
    return (
        <section className="bg-seo-card py-[clamp(3.75rem,2rem+5.5vw,6.875rem)]">
            <div className="container-site">
                <div className="mx-auto mb-[clamp(3.125rem,2rem+3.5vw,4.375rem)] max-w-[53.125rem] text-center">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-pink uppercase">
                        {pillars.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-h2 font-extrabold text-seo-ink">
                        {pillars.title}
                    </h2>

                    <p className="mt-6 text-body leading-[1.85] text-seo-body">
                        {pillars.description}
                    </p>
                </div>

                <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                    {pillars.items.map((item) => {
                        const accent = accents[item.accent];

                        return (
                            <li
                                key={item.tag}
                                className={`rounded-[22px] border-x border-b border-t-[5px] border-x-black/[0.08] border-b-black/[0.08] bg-white px-[1.375rem] py-[1.875rem] shadow-[0_10px_25px_rgb(0_0_0/0.03)] transition-transform duration-300 hover:-translate-y-1.5 sm:px-[1.875rem] sm:py-10 ${accent.border}`}
                            >
                                <p
                                    className={`m-0 font-display text-[0.8125rem] font-bold tracking-[0.2em] uppercase ${accent.text}`}
                                >
                                    {item.tag}
                                </p>

                                <h3 className="mt-5 font-display text-h5 font-extrabold text-seo-ink">
                                    {item.title}
                                </h3>

                                <p className="mt-5 text-sm leading-[1.85] text-seo-body">
                                    {item.text}
                                </p>

                                <ul className="m-0 mt-7 grid list-none gap-4 p-0">
                                    {item.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-2.5 text-sm leading-snug text-seo-body"
                                        >
                                            <Tick
                                                className={`mt-px size-4 shrink-0 ${accent.text}`}
                                            />
                                            <span className="min-w-0">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
