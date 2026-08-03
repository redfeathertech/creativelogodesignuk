import Image from "next/image";

import { awards } from "@/content/landing/lp";

/**
 * The five award badges.
 *
 * On the live page these run in a Swiper carousel of seven slides holding five
 * distinct images — the first two are repeated to pad the loop — and every one
 * ships as `alt="Logo 1"` … `alt="Logo 7"`, so the awards the section exists to
 * claim are not stated anywhere a machine can read them. Each badge is named
 * here, once, and five fit a row at every width the design uses, so there is
 * nothing to scroll and no carousel to hydrate.
 */
export default function Awards() {
    return (
        <section className="bg-white py-section text-onlight">
            <div className="container-site">
                <h2 className="reveal text-center text-h2">{awards.title}</h2>

                <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-[clamp(1.5rem,1rem+4vw,4rem)] gap-y-10">
                    {awards.items.map((item) => (
                        <li key={item.src} className="reveal">
                            <Image
                                src={item.src}
                                alt={item.name}
                                width={item.width}
                                height={item.height}
                                className="h-24 w-auto sm:h-28"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
