"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { process } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * The three process steps.
 *
 * Whichever step is sitting in the middle band of the viewport lights up its
 * number, so the list reads as a progression while it scrolls past the pinned
 * intro column. Hover does the same thing for pointer users. The observer only
 * toggles a class — all three steps are in the server-rendered HTML.
 */
export default function ProcessSteps() {
  const [activeSteps, setActiveSteps] = useState<boolean[]>(() =>
    process.steps.map(() => false),
  );
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const nodes = refs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveSteps((current) => {
          const next = [...current];
          entries.forEach((entry) => {
            const index = nodes.indexOf(entry.target as HTMLLIElement);
            if (index >= 0) next[index] = entry.isIntersecting;
          });
          return next;
        });
      },
      // Only the middle 16% of the viewport counts as "here".
      { rootMargin: "-42% 0px -42% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="grid gap-2">
      {process.steps.map((step, i) => {
        const active = activeSteps[i];
        return (
          <li
            key={step.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="reveal group relative grid grid-cols-1 gap-4 border-b border-white/[0.11] py-8 first:border-t min-[576px]:grid-cols-[auto_minmax(0,1fr)] min-[576px]:gap-6"
          >
            <span
              aria-hidden="true"
              className={cn(
                // bg-origin-border: without it the gradient tiles into the 1px
                // transparent border ring and wraps a crimson line down one edge.
                "grid size-[60px] shrink-0 place-items-center rounded-full border bg-origin-border font-display text-[1.3rem] font-extrabold",
                "transition-[background-color,color,border-color,transform] duration-300 ease-out",
                "group-hover:scale-[1.06] group-hover:border-transparent group-hover:text-white",
                "group-hover:bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]",
                active
                  ? "scale-[1.06] border-transparent bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                  : "border-white/20 text-white/40",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-[576px]:pr-16">
              <h3 className="mb-2 text-h3 text-white">{step.title}</h3>
              <p className="text-white/65">{step.body}</p>
            </div>

            <Image
              src={step.icon}
              alt=""
              aria-hidden="true"
              width={42}
              height={42}
              className={cn(
                "absolute top-8 right-0 hidden w-[42px] transition-opacity duration-300 min-[576px]:block",
                "group-hover:opacity-100",
                active ? "opacity-100" : "opacity-50",
              )}
            />
          </li>
        );
      })}
    </ol>
  );
}
