import Image from "next/image";

import { tech } from "@/content/landing/lp";

/**
 * The platform marquee under the hero — CSS only.
 *
 * The live page clones the track with `document.querySelector(...).cloneNode()`
 * in a `useEffect`, so the second half of the loop exists only after hydration
 * and every logo's alt text is duplicated into the accessibility tree. Here the
 * duplicate pass is `aria-hidden`, so each platform is announced exactly once,
 * and the loop is a keyframe rather than a DOM mutation.
 */
export default function Tech() {
    return (
        <section
            className="overflow-hidden bg-white py-[clamp(2rem,1.5rem+3vw,3.5rem)] text-onlight"
            aria-label="Platforms we build on"
        >
            <div className="group mask-edges flex w-full gap-[clamp(2rem,5vw,4.5rem)] [--marquee-gap:clamp(2rem,5vw,4.5rem)]">
                {[0, 1].map((pass) => (
                    <div
                        key={pass}
                        aria-hidden={pass === 1}
                        className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-[clamp(2rem,5vw,4.5rem)] group-hover:[animation-play-state:paused]"
                    >
                        {tech.map((item) => (
                            <Image
                                key={item.src}
                                src={item.src}
                                alt={pass === 0 ? item.name : ""}
                                width={212}
                                height={108}
                                className="h-[clamp(30px,4.5vw,46px)] w-auto shrink-0 object-contain"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
