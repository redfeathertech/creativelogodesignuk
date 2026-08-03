import Image from "next/image";

import { IMG, services } from "@/content/landing/creative-logo-design";

/**
 * The four capability cards.
 *
 * The live page renders four `<h3>`s with nothing above them — the section has
 * no heading at all, so the outline jumps straight from the CTA band's `<h3>`
 * to four more at the same level with no parent. The `<h2>` here is the one
 * string on this page that is not carried over from the live site; it is an
 * addition, and no existing wording changes. See docs/CONTENT-PARITY.md.
 *
 * The icons are the live page's own line art — transparent magenta strokes,
 * which is exactly what a dark canvas wants, so they are used unaltered.
 */
export default function Services() {
    return (
        <section className="bg-ink-900 py-section text-white">
            <div className="container-site">
                <h2 className="reveal mx-auto max-w-[24ch] text-center text-h2">
                    {services.title}
                </h2>

                <ul className="mt-14 grid gap-6 min-[576px]:grid-cols-2 lg:grid-cols-4">
                    {services.items.map((item) => (
                        <li
                            key={item.title}
                            className="reveal rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-magenta-500/40 hover:bg-white/[0.06]"
                        >
                            <Image
                                src={`${IMG}/services/${item.icon}.webp`}
                                alt=""
                                aria-hidden="true"
                                width={195}
                                height={195}
                                sizes="56px"
                                className="h-14 w-14"
                            />
                            <h3 className="mt-5 text-h5 font-bold text-white">{item.title}</h3>
                            <p className="mt-3 text-white/65">{item.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
