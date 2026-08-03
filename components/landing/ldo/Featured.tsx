import Image from "next/image";

import { featured } from "@/content/landing/logo-design-offer";

/**
 * "As Featured In" — five press wordmarks.
 *
 * The live page runs these in an Owl Carousel that duplicates the first two
 * logos to fill the track, so the same two names are announced twice. Five
 * items fit a row at every width the design uses, so there is nothing to
 * scroll: it is a plain list, and each logo is named once.
 */
export default function Featured() {
    return (
        <section className="bg-white py-section text-onlight">
            <div className="container-site">
                <h2 className="reveal text-center text-h2">{featured.title}</h2>

                <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-[clamp(2rem,1rem+5vw,5rem)] gap-y-10">
                    {featured.items.map((item) => (
                        <li key={item.name} className="reveal">
                            <Image
                                src={item.src}
                                alt={item.name}
                                width={180}
                                height={48}
                                className="h-7 w-auto opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-8"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
