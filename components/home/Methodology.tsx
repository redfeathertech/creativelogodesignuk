"use client";

import Image from "next/image";
import { useState } from "react";
import { methodology } from "@/content/home";
import { Eyebrow, SectionHead, SectionHeading } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { cn } from "@/lib/cn";

/**
 * Methodology: an orbiting icon ring whose centre image follows the open step.
 *
 * The ring genuinely orbits — the track spins, each slot is parked at a fixed
 * angle, and every icon carries both a static rotation cancelling its slot
 * angle and an animated counter-rotation cancelling the track's spin, so the
 * logos stay upright instead of tumbling. Hovering pauses the whole assembly.
 *
 * The accordion is native <details>, so the four step descriptions are readable
 * with no JS at all. The live site builds the centre image URL as
 * `assets/images/home_assets${n}.png` — a missing slash that 404s on every load.
 */
export default function Methodology() {
  const [active, setActive] = useState(0);
  const count = methodology.orbitIcons.length;

  return (
    /* overflow-x-clip: the orbit tracks are square `inset-0` elements that
       spin; at 45° a square's bounding box is √2 wider than its layout box,
       and transform overflow extends the page's scrollable area — a real
       horizontal scroll on phones that comes and goes with the rotation
       angle. Clip (not hidden) so no scroll container is created. */
    <section className="relative isolate overflow-x-clip bg-ink-900 py-section text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.42] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="container-site">
        <SectionHead
          className="reveal"
          action={<LeadButton variant="ghost">{methodology.cta}</LeadButton>}
        >
          <Eyebrow>{methodology.eyebrow}</Eyebrow>
          <SectionHeading
            lead={methodology.titleLead}
            accent={methodology.titleAccent}
            className="mb-0"
          />
        </SectionHead>

        <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2">
          {/* ---- orbit ---- */}
          <div className="reveal">
            <div className="group relative mx-auto grid aspect-square w-[var(--orbit-size)] place-items-center [--orbit-icon:clamp(38px,9vw,48px)] [--orbit-r:calc(var(--orbit-size)*0.42)] [--orbit-size:min(440px,86vw)]">
              <span
                className="absolute inset-0 animate-orbit rounded-full border border-dashed border-white/20 group-hover:[animation-play-state:paused]"
                aria-hidden="true"
              />
              <span
                className="absolute inset-[18%] animate-orbit-inner rounded-full border border-white/20 opacity-45 group-hover:[animation-play-state:paused]"
                aria-hidden="true"
              />

              <div
                className="absolute inset-0 animate-orbit group-hover:[animation-play-state:paused]"
                aria-hidden="true"
              >
                {methodology.orbitIcons.map((icon, i) => {
                  const angle = (360 / count) * i;
                  return (
                    <span
                      key={icon}
                      className="absolute top-1/2 left-1/2 size-0"
                      style={{ transform: `rotate(${angle}deg) translateY(calc(var(--orbit-r) * -1))` }}
                    >
                      <Image
                        src={icon}
                        alt=""
                        width={48}
                        height={48}
                        style={{ transform: `rotate(${-angle}deg)` }}
                        className="absolute top-1/2 left-1/2 -mt-[calc(var(--orbit-icon)/2)] -ml-[calc(var(--orbit-icon)/2)] size-[var(--orbit-icon)] max-w-none animate-orbit-reverse rounded-full bg-white/95 object-contain p-[9px] shadow-md group-hover:[animation-play-state:paused]"
                      />
                    </span>
                  );
                })}
              </div>

              <div className="relative z-[2] aspect-square w-1/2 overflow-hidden rounded-full shadow-[0_24px_60px_-18px_rgb(7_2_15/0.6),0_0_0_6px_rgb(255_255_255/0.06)]">
                {methodology.steps.map((step, i) => (
                  <Image
                    key={step.img}
                    src={step.img}
                    alt={i === active ? `${step.title} — Creative Logo Design methodology` : ""}
                    width={240}
                    height={240}
                    className={cn(
                      "absolute inset-0 size-full object-cover transition-[opacity,scale] duration-300 ease-out",
                      i === active ? "scale-100 opacity-100" : "scale-[0.96] opacity-0",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---- accordion ---- */}
          <div className="reveal border-t border-white/[0.11]">
            {methodology.steps.map((step, i) => (
              <details
                key={step.title}
                open={i === 0}
                onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && setActive(i)}
                className="group/item border-b border-white/[0.11]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-h5 leading-snug font-bold text-white transition-colors marker:content-[''] hover:text-magenta-300">
                  {step.title}
                  <span
                    /* bg-origin-border is load-bearing: background-origin defaults to
                       padding-box while background-clip defaults to border-box, so with
                       a 1px transparent border the gradient tiles into that ring and
                       wraps its far-end colour round to the near edge — a crimson line
                       down one side of the circle and a violet one down the other. */
                    className="relative grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-origin-border transition-[background-color,border-color,rotate] duration-300 ease-out group-open/item:rotate-180 group-open/item:border-transparent group-open/item:bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] group-open/item:text-white"
                    aria-hidden="true"
                  >
                    <span className="absolute h-[2px] w-[14px] rounded-sm bg-current" />
                    <span className="absolute h-[14px] w-[2px] rounded-sm bg-current transition-opacity duration-300 group-open/item:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 text-white/65">{step.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
