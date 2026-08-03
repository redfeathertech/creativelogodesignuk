import Link from "next/link";

import { industries } from "@/content/landing/seo-services";
import { SeoIcon } from "./icons";

/**
 * Industries — the page's one dark band.
 *
 * Six vertical cards on `#1b1b1b` panels over the `seo-ink` canvas, three up at
 * `lg` and two at `md`, exactly as the live `col-lg-4 col-md-6` grid resolves.
 *
 * The eyebrow runs coral rather than the pink used on the light sections: that
 * is what the live CSS does here (`--rf-primary-light`), and pink on near-black
 * measures 3.7:1, under AA for text this small.
 *
 * The live card titles are `h3`, so the levels already run h2 → h3 unbroken.
 * The closing line's "Get in touch" is `href="#"` on the live page; it points at
 * /contact-us here and stays an inline link rather than a pill, since it sits
 * mid-sentence.
 */
export default function Industries() {
    return (
        <section className="bg-seo-ink py-[clamp(3.75rem,2rem+5.5vw,6.875rem)]">
            <div className="container-site">
                {/* ------------------------------------------------- heading -- */}
                <div className="mx-auto mb-[clamp(2.5rem,1.5rem+3vw,4.375rem)] max-w-[820px] text-center">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-seo-coral uppercase">
                        {industries.eyebrow}
                    </p>

                    <h2 className="mt-4 font-display text-[clamp(1.375rem,1rem+1.9vw,2.5rem)] leading-[1.1] font-extrabold text-white">
                        {industries.title}
                    </h2>

                    <p className="mx-auto mt-7 max-w-[760px] text-sm leading-[1.85] text-white/70 lg:text-base lg:leading-[1.9]">
                        {industries.description}
                    </p>
                </div>

                {/* --------------------------------------------------- cards -- */}
                <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                    {industries.items.map((item) => (
                        <li
                            key={item.title}
                            className="rounded-[24px] border border-white/10 bg-[#1b1b1b] px-[1.375rem] py-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-white/20 sm:px-7 sm:py-8"
                        >
                            <span className="mb-6 flex size-13 shrink-0 items-center justify-center rounded-[14px] bg-seo-coral">
                                <SeoIcon name={item.icon} className="size-5 text-white" />
                            </span>

                            <h3 className="font-display text-h5 leading-[1.3] font-extrabold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-4 text-sm leading-[1.85] text-white/70">
                                {item.text}
                            </p>
                        </li>
                    ))}
                </ul>

                {/* --------------------------------------------- bottom line -- */}
                <p className="mx-auto mt-[clamp(2.25rem,1.5rem+2vw,3.4375rem)] max-w-[760px] text-center text-sm leading-[1.8] text-white/65 sm:text-[1.0625rem]">
                    {industries.bottomTextLead}{" "}
                    <Link
                        href="/contact-us"
                        className="font-bold text-seo-coral underline underline-offset-4 transition-colors duration-200 hover:text-white"
                    >
                        {industries.bottomLinkText}
                    </Link>{" "}
                    {industries.bottomTextTrail}
                </p>
            </div>
        </section>
    );
}
