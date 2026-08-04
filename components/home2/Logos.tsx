import Image from "next/image";

import { clientMarquee, clients } from "@/content/clients";

/**
 * Client logo marquee (v2).
 *
 * Moved from sixth on the page to second — a trust wall directly under the
 * hero, which is where every agency site that does this well puts it.
 *
 * Mechanically identical to components/home/Logos.tsx, and deliberately so:
 * the track is duplicated and translated by exactly -100% minus the gap, which
 * loops seamlessly with no JS. `--marquee-gap` MUST hold the same value as the
 * flex `gap` — the keyframe subtracts it, so a mismatch shows up as a visible
 * jump once per cycle. Each pass repeats the list `copiesPerPass` times so the
 * laid-out track is always wider than the viewport.
 *
 * Only the first copy of the first pass carries alt text. Every later copy is
 * decorative, so screen readers and crawlers see each logo exactly once.
 *
 * The one real change is the surface. v1 sits on white and desaturates the
 * artwork; here the band is dark, and since the artwork is dark-on-transparent
 * (see content/clients.ts) it has to be knocked out to white to be visible at
 * all. That rules out v1's grayscale→colour hover — inverted artwork has no
 * colour to restore — so hover lifts opacity instead.
 */
export default function Logos() {
    const copies = Array.from(
        { length: clientMarquee.copiesPerPass },
        (_, c) => c,
    );

    return (
        <section
            className="relative isolate overflow-hidden border-y border-white/[0.08] bg-ink-950 py-band"
            aria-label="Clients we work with"
        >
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay"
                aria-hidden="true"
            />

            <p className="relative z-[1] mb-8 text-center text-xs tracking-[0.14em] text-white/35 uppercase">
                {clientMarquee.label}
            </p>

            <div className="group relative z-[1] mask-edges flex w-full gap-[clamp(2rem,5vw,4.5rem)] [--marquee-gap:clamp(2rem,5vw,4.5rem)]">
                {[0, 1].map((pass) => (
                    <div
                        key={pass}
                        aria-hidden={pass === 1}
                        className="flex min-w-full shrink-0 animate-marquee items-center gap-[clamp(2rem,5vw,4.5rem)] group-hover:[animation-play-state:paused]"
                    >
                        {copies.map((copy) =>
                            clients.map((client) => {
                                const named = pass === 0 && copy === 0;
                                return (
                                    <div
                                        key={`${copy}-${client.src}`}
                                        aria-hidden={named ? undefined : true}
                                        className="group/logo grid shrink-0 place-items-center"
                                    >
                                        <Image
                                            src={client.src}
                                            alt={named ? `${client.name} logo` : ""}
                                            width={client.width}
                                            height={client.height}
                                            className="h-[clamp(34px,5vw,52px)] w-auto brightness-0 invert opacity-45 transition-opacity duration-300 group-hover/logo:opacity-100"
                                        />
                                    </div>
                                );
                            }),
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
