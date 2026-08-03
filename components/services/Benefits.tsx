"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ServiceBenefits } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * "What you get" — an ARIA tab list with a cross-fading monitor preview.
 *
 * Same pattern as the homepage's `WhatYouGet`: the screenshots sit ON TOP of
 * the monitor artwork (the bezel image has an opaque screen area), and every
 * panel stays in the DOM — inactive ones are `hidden`, not unmounted — so all
 * five benefit descriptions are crawlable without JS.
 */
export default function Benefits({ data }: { data: ServiceBenefits }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = data.items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section tone="light-alt">
      <div className="container-site">
        <div className="reveal mb-12 max-w-[58ch]">
          <Eyebrow className="text-magenta-500">{data.eyebrow}</Eyebrow>
          <SectionHeading
            lead={data.heading}
            accent={data.headingAccent}
            accentClassName="gradient-text-brand"
          />
          <p className="mt-6 text-lead text-onlight-muted">{data.lead}</p>
        </div>

        <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          {/* ---- monitor ---- */}
          <div className="reveal relative">
            <div className="absolute top-[4.2%] left-[8.1%] z-[2] h-[68%] w-[83.8%] overflow-hidden rounded-[4px] bg-ink-850">
              {data.items.map((item, i) => (
                <Image
                  key={item.title}
                  src={item.image.src}
                  alt={`${item.title} preview`}
                  width={900}
                  height={560}
                  sizes="(max-width: 992px) 78vw, 46vw"
                  className={cn(
                    "absolute inset-0 size-full object-cover transition-[opacity,scale] duration-[600ms] ease-out",
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                />
              ))}
            </div>

            <Image
              src="/assets/img/home/monitor.webp"
              alt=""
              aria-hidden="true"
              width={1000}
              height={820}
              sizes="(max-width: 992px) 92vw, 55vw"
              className="pointer-events-none relative z-[1] block h-auto w-full"
            />
          </div>

          {/* ---- tabs ---- */}
          <div
            className="reveal grid gap-2"
            role="tablist"
            aria-label={data.eyebrow}
            aria-orientation="vertical"
          >
            {data.items.map((item, i) => {
              const selected = i === active;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-md border bg-white px-6 pt-2 pb-3 transition-[border-color,box-shadow] duration-300 ease-out",
                    selected
                      ? "border-transparent shadow-md ring-[1.5px] ring-magenta-500 ring-inset"
                      : "border-ink-900/10 hover:border-magenta-500/35",
                  )}
                >
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`benefit-tab-${i}`}
                    aria-controls={`benefit-panel-${i}`}
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="block w-full cursor-pointer py-3 text-left"
                  >
                    <span className="flex items-center justify-between gap-4 font-display text-h5 font-bold text-onlight">
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "shrink-0 transition-[rotate,color] duration-300",
                          selected && "rotate-180 text-magenta-500",
                        )}
                      />
                    </span>
                  </button>

                  <div
                    id={`benefit-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`benefit-tab-${i}`}
                    hidden={!selected}
                  >
                    <p className="text-onlight-muted">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
