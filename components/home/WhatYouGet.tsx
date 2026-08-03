"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { whatYouGet } from "@/content/home";
import { Eyebrow } from "@/components/ui/Section";
import { ChevronDown, ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * "What do you get" — an ARIA tab list with a cross-fading monitor preview.
 *
 * The screenshots sit ON TOP of the monitor artwork, not behind it: the bezel
 * image has an opaque screen area, so stacking it above the previews hides
 * every one of them.
 *
 * Every panel is in the DOM (inactive ones are `hidden`), so all five service
 * descriptions and their links are crawlable. Each tab now links to its
 * service page; on the live site none of them link anywhere.
 */
export default function WhatYouGet() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = whatYouGet.tabs.length - 1;
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
    <section className="relative isolate bg-mist-100 py-section text-onlight">
      <div className="container-site">
        <div className="reveal mb-12 max-w-[58ch]">
          <Eyebrow className="text-magenta-500">{whatYouGet.eyebrow}</Eyebrow>
          <h2 className="text-h2">
            {whatYouGet.titleLead}{" "}
            <span className="gradient-text-brand">{whatYouGet.titleAccent}</span>
            {whatYouGet.titleTrail}
          </h2>
          <p className="mt-6 text-lead text-onlight-muted">{whatYouGet.lead}</p>
        </div>

        <div className="grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          {/* ---- monitor ---- */}
          <div className="reveal relative">
            {/* Screenshots sit inside the bezel window, above the artwork. */}
            <div className="absolute top-[4.2%] left-[8.1%] z-[2] h-[68%] w-[83.8%] overflow-hidden rounded-[4px] bg-ink-850">
              {whatYouGet.tabs.map((tab, i) => (
                <Image
                  key={tab.label}
                  src={tab.shot}
                  alt={`${tab.label} preview`}
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
              src={whatYouGet.frame}
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
            aria-label={whatYouGet.eyebrow}
            aria-orientation="vertical"
          >
            {whatYouGet.tabs.map((tab, i) => {
              const selected = i === active;
              return (
                <div
                  key={tab.label}
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
                    id={`offer-tab-${i}`}
                    aria-controls={`offer-panel-${i}`}
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="block w-full cursor-pointer py-3 text-left"
                  >
                    <span className="flex items-center justify-between gap-4 font-display text-h5 font-bold text-onlight">
                      {tab.label}
                      <ChevronDown
                        className={cn(
                          "shrink-0 transition-[rotate,color] duration-300",
                          selected && "rotate-180 text-magenta-500",
                        )}
                      />
                    </span>
                  </button>

                  <div
                    id={`offer-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`offer-tab-${i}`}
                    hidden={!selected}
                  >
                    <p className="text-onlight-muted">{tab.body}</p>
                    <Link
                      href={tab.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-magenta-600 transition-colors hover:text-magenta-500"
                    >
                      Explore {tab.label}
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
