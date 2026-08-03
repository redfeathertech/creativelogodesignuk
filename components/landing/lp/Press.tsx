import Image from "next/image";

import { press } from "@/content/landing/lp";

/**
 * The three credibility marks between the services grid and the combo band.
 *
 * The live page ships them as `alt="Description 1"`, `"Description 2"` and
 * `"Description 3"` — so Google Premier Partner, Inc. 5000 and Forbes, the
 * three claims the strip exists to make, are named nowhere in the document.
 * Each is named here.
 *
 * No heading on the live page, so the section carries an `aria-label` rather
 * than inventing one — a landmark still needs a name.
 */
export default function Press() {
    return (
        <section
            className="bg-mist-100 py-[clamp(2rem,1.5rem+3vw,3.5rem)] text-onlight"
            aria-label="Recognition"
        >
            <ul className="container-site flex flex-wrap items-center justify-center gap-x-[clamp(1.5rem,1rem+4vw,4rem)] gap-y-6">
                {press.map((item) => (
                    <li key={item.src} className="reveal">
                        <Image
                            src={item.src}
                            alt={item.name}
                            width={400}
                            height={207}
                            className="h-[clamp(56px,8vw,84px)] w-auto object-contain"
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
