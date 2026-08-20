import Image from "next/image";
import Link from "next/link";

import { challenges } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";
import { btn } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Challenges / FAQ — the source for the FAQPage structured data.
 *
 * Two columns on desktop: the heading and the four-reason panel on the left,
 * the eight-item accordion on the right. Both stack to one column below `lg`.
 *
 * Native <details>/<summary>, still: the question text IS the control, it works
 * with no JS, and it needs no ARIA wiring. The live site puts the <h5> outside
 * the toggle button, leaving eight buttons with no accessible name (WCAG 4.1.2).
 * The shared `name` makes the group behave as a real accordion — opening one
 * closes the rest — natively, so this stays a server component.
 *
 * The open/close height transition is the `.accordion` rule in globals.css.
 */
export default function Challenges() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(160deg,#0d0714_0%,#180d2b_55%,#0d0714_100%)] py-section text-white">
      {/* Brand glow behind the content, then grain over it, so the near-black
          canvas never reads as flat black. Both are decorative layers. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-mesh opacity-45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-[0.18] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="relative z-[1] container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* ------------------------------- left ------------------------------ */}
        <div className="reveal">
          <Eyebrow>{challenges.eyebrow}</Eyebrow>

          {/* Sized locally rather than with `text-h2` so this long two-tone
              heading settles on four lines in its 5/12 column, not six. */}
          <h2 className="text-[clamp(1.625rem,1rem+2.6vw,2.75rem)] leading-[1.12] tracking-[-0.02em] text-white">
            {challenges.titleLead}{" "}
            <span className="gradient-text">{challenges.titleAccent}</span>
          </h2>

          <span
            className="mt-5 block h-0.5 w-[clamp(28px,6vw,60px)] rounded-sm bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]"
            aria-hidden="true"
          />

          <p className="mt-6 max-w-[46ch] text-lead text-white/70">
            {challenges.lead.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <ul className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.03] p-[clamp(1.25rem,0.75rem+2vw,2rem)] backdrop-blur-sm">
            {challenges.pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                className={
                  i === 0
                    ? "flex items-start gap-4 sm:gap-5"
                    : "mt-6 flex items-start gap-4 border-t border-white/[0.08] pt-6 sm:gap-5"
                }
              >
                <Image
                  src={pillar.icon}
                  alt={pillar.iconAlt}
                  width={78}
                  height={78}
                  unoptimized
                  className="size-14 shrink-0 sm:size-[68px]"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-h5 font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-body text-white/65">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <LeadButton size="lg" className="mt-10">
            {challenges.cta}
          </LeadButton>
        </div>

        {/* ------------------------------ right ------------------------------ */}
        <div className="reveal flex flex-col gap-3">
          {challenges.items.map((item, i) => (
            <details
              key={item.q}
              name="challenges"
              open={i === 0}
              className="accordion group/item rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 open:border-magenta-500/45 open:bg-[linear-gradient(120deg,rgb(204_6_127/0.14)_0%,rgb(102_46_145/0.14)_100%)] open:shadow-[0_18px_54px_-24px_rgb(204_6_127/0.75)]"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 p-[clamp(0.85rem,0.6rem+0.7vw,1.15rem)] marker:content-[''] sm:gap-4">
                <span
                  className="grid h-7 w-9 shrink-0 place-items-center rounded-md bg-white/[0.07] font-display text-[0.6875rem] font-bold text-white/70 transition-colors duration-300 group-open/item:bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] group-open/item:text-white"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Image
                  src={item.icon}
                  alt={item.iconAlt}
                  width={52}
                  height={52}
                  unoptimized
                  className="hidden size-10 shrink-0 sm:block"
                />

                <h3 className="min-w-0 flex-1 font-display text-[0.95rem] leading-snug font-bold text-white/85 transition-colors duration-300 group-open/item:text-white sm:text-[1.0625rem]">
                  {item.q}
                </h3>

                <span
                  className="relative grid size-7 shrink-0 place-items-center text-white/55 transition-[color,rotate] duration-300 ease-out group-open/item:rotate-180 group-open/item:text-magenta-300"
                  aria-hidden="true"
                >
                  <span className="absolute h-[2px] w-[13px] rounded-sm bg-current" />
                  <span className="absolute h-[13px] w-[2px] rounded-sm bg-current transition-opacity duration-300 group-open/item:opacity-0" />
                </span>
              </summary>

              <div className="px-[clamp(0.85rem,0.6rem+0.7vw,1.15rem)] pb-[clamp(1rem,0.7rem+0.8vw,1.35rem)]">
                <p className="max-w-[62ch] text-body text-white/70">{item.a}</p>

                <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <ul className="min-w-0">
                    {item.list.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 py-1 text-body text-white/85"
                      >
                        <span
                          className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full border border-magenta-300/60 text-magenta-300"
                          aria-hidden="true"
                        >
                          <CheckIcon className="size-[11px]" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="shrink-0 lg:border-l lg:border-white/[0.12] lg:pl-7">
                    <Link href={item.href} className={btn("ghost")}>
                      {item.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
