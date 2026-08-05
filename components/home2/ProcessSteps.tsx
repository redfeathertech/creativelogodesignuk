"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { process } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * The three process steps (v2).
 *
 * Observer logic is carried over from components/home/ProcessSteps.tsx
 * verbatim — whichever step sits in the middle 16% of the viewport lights up,
 * hover does the same for pointer users, and all three steps are in the
 * server-rendered HTML because the observer only toggles a class.
 *
 * What changes is the numeral. v1 draws it as a 60px gradient-filled disc; here
 * it is set at `text-numeral` and bleeds behind the step's text as a graphic
 * element, which is the editorial device the whole redesign is built on.
 *
 * The numeral stays `aria-hidden`: the real ordering is the <ol>, and letting a
 * screen reader announce "zero one" before every step title is noise.
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
                        className="reveal group relative grid grid-cols-1 gap-4 overflow-hidden border-b border-white/[0.11] py-10 first:border-t min-[576px]:grid-cols-[auto_minmax(0,1fr)] min-[576px]:gap-8"
                    >
                        {/* `leading-[0.8]` and the negative inline-start pull the
                            numeral's optical edge onto the column edge — digits
                            carry side bearing that a plain box does not. */}
                        <span
                            aria-hidden="true"
                            className={cn(
                                "gradient-text -ms-1 block shrink-0 font-display text-numeral leading-[0.8] font-extrabold transition-opacity duration-500 ease-out min-[576px]:w-[2.2em]",
                                "group-hover:opacity-100",
                                active ? "opacity-100" : "opacity-30",
                            )}
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 self-center min-[576px]:pr-16">
                            <h3 className="mb-3 text-h3 text-white">
                                {step.title}
                            </h3>
                            <p className="max-w-[54ch] text-white/65">
                                {step.body}
                            </p>
                        </div>

                        {/* <Image
                            src={step.icon}
                            alt=""
                            aria-hidden="true"
                            width={42}
                            height={42}
                            className={cn(
                                "absolute top-10 right-0 hidden w-[42px] transition-opacity duration-300 min-[576px]:block",
                                "group-hover:opacity-100",
                                active ? "opacity-100" : "opacity-50",
                            )}
                        /> */}
                    </li>
                );
            })}
        </ol>
    );
}
