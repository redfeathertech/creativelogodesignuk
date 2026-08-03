"use client";

import { useLeadPanel } from "@/components/chrome/LeadPanel";
import { PlayIcon } from "@/components/ui/icons";

/**
 * Play-button CTA. A real <button> — the live site uses `href="#"`, which
 * crawlers follow and screen readers announce as a link to nowhere.
 *
 * The halo is a ring that expands and fades, not a filled disc: a disc washes
 * out the gradient underneath it at the start of every cycle.
 */
export default function PlayCta({ label }: { label: string }) {
  const { open } = useLeadPanel();

  return (
    <button
      type="button"
      onClick={open}
      className="group inline-flex cursor-pointer items-center gap-4 font-display text-base font-bold text-onlight"
    >
      <span className="relative grid size-[58px] shrink-0 place-items-center rounded-full bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white shadow-glow transition-transform duration-300 ease-spring group-hover:scale-[1.06]">
        <span
          className="absolute -inset-1.5 animate-pulse-ring rounded-full border-[1.5px] border-magenta-400"
          aria-hidden="true"
        />
        <span className="relative pl-0.5">
          <PlayIcon />
        </span>
      </span>
      <span className="transition-colors group-hover:text-magenta-600">{label}</span>
    </button>
  );
}
