import Image from "next/image";
import { clientMarquee, clients } from "@/content/clients";

/**
 * Client logo marquee — CSS only.
 *
 * The track is duplicated and translated by exactly -100% minus the gap, which
 * loops seamlessly with no JS. Hovering pauses the run.
 *
 * Each pass repeats the logo list `copiesPerPass` times so the laid-out track is
 * always wider than the viewport. `min-w-full` is only a floor: if the content
 * were narrower than 100% it would pad the track with dead space, and that blank
 * stretch scrolls past as a visible hole in the band.
 *
 * Only the first copy of the first pass carries alt text. Every later copy is
 * decorative, so screen readers and crawlers see each logo exactly once.
 */
export default function Logos() {
  const copies = Array.from({ length: clientMarquee.copiesPerPass }, (_, c) => c);

  return (
    <section
      className="overflow-hidden bg-white py-[clamp(2.5rem,1.5rem+4vw,4.5rem)] text-onlight"
      aria-label="Clients we work with"
    >
      <p className="mb-8 text-center text-sm font-semibold tracking-[0.14em] text-onlight-muted uppercase">
        {clientMarquee.label}
      </p>

      <div className="group mask-edges flex w-full gap-[clamp(2rem,5vw,4.5rem)] [--marquee-gap:clamp(2rem,5vw,4.5rem)]">
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
                      className="h-[clamp(34px,5vw,52px)] w-auto opacity-55 grayscale transition-[filter,opacity] duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
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
