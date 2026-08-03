import Link from "next/link";
import { challenges } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { btn } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * Challenges / FAQ — the source for the FAQPage structured data.
 *
 * A full-bleed brand-gradient panel with the intro pinned beside the list.
 *
 * Native <details>/<summary>: the question text IS the control, it works with
 * no JS, and it needs no ARIA wiring. The live site puts the <h5> outside the
 * toggle button, leaving eight buttons with no accessible name (WCAG 4.1.2).
 */
export default function Challenges() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] py-section text-white">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="relative z-[1] container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div className="reveal lg:sticky lg:top-32">
          <Eyebrow className="text-[#ffd9ee]">{challenges.eyebrow}</Eyebrow>
          <h2 className="mb-8 text-h3 text-white">{challenges.title}</h2>
          <LeadButton variant="light" size="lg">
            {challenges.cta}
          </LeadButton>
        </div>

        <div className="reveal border-t border-white/25">
          {challenges.items.map((item) => (
            <details key={item.q} className="group/item border-b border-white/25">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-h5 leading-snug font-bold text-white transition-colors marker:content-[''] hover:text-[#ffd9ee]">
                {item.q}
                <span
                  className="relative grid size-10 shrink-0 place-items-center rounded-full border border-white/45 transition-[background-color,border-color,color,rotate] duration-300 ease-out group-open/item:rotate-180 group-open/item:border-transparent group-open/item:bg-white group-open/item:text-magenta-600"
                  aria-hidden="true"
                >
                  <span className="absolute h-[2px] w-[14px] rounded-sm bg-current" />
                  <span className="absolute h-[14px] w-[2px] rounded-sm bg-current transition-opacity duration-300 group-open/item:opacity-0" />
                </span>
              </summary>

              <div className="max-w-[62ch] pb-6">
                <p className="mb-4 text-white/85">{item.a}</p>
                <ul className="mb-4 list-disc pl-[1.1rem]">
                  {item.list.map((point) => (
                    <li key={point} className="mb-2 text-white/85">
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={item.href} className={btn("light")}>
                  {item.ctaLabel}
                  <ArrowIcon />
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
