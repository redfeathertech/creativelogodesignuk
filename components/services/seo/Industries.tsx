import Link from "next/link";

import { industries } from "@/content/landing/seo-services";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SeoIcon } from "./icons";

/**
 * Industries — six vertical cards on the `darker` surface.
 *
 * Three up at `lg` and two at `min-[576px]`, which is the two steps the live
 * `col-lg-4 col-md-6` grid makes and the same two the rest of the service
 * sections use. The cards take the hairline-ring treatment the site uses for a
 * dark card rather than the live page's second near-black panel colour.
 *
 * The live card titles are `h3`, so the levels already run h2 → h3 unbroken.
 * The closing line's "Get in touch" is `href="#"` on the live page; it points at
 * /contact-us here and stays an inline link rather than a pill, since it sits
 * mid-sentence.
 */
export default function Industries() {
    return (
        <Section tone="darker">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <Eyebrow className="justify-center">{industries.eyebrow}</Eyebrow>
                    <SectionHeading lead={industries.title} className="mx-auto text-balance" />
                    <p className="mx-auto mt-6 max-w-[62ch] text-lead text-white/65">
                        {industries.description}
                    </p>
                </div>

                <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {industries.items.map((item) => (
                        <li
                            key={item.title}
                            className="reveal min-w-0 rounded-lg border border-white/[0.11] bg-white/[0.02] p-8 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-white/20"
                        >
                            <span
                                aria-hidden="true"
                                className="mb-6 grid size-12 shrink-0 place-items-center rounded-md bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)] text-white"
                            >
                                <SeoIcon name={item.icon} className="size-5" />
                            </span>

                            <h3 className="mb-2 text-h4 text-white">{item.title}</h3>

                            <p className="text-white/65">{item.text}</p>
                        </li>
                    ))}
                </ul>

                <p className="reveal mx-auto mt-12 max-w-[62ch] text-center text-white/65">
                    {industries.bottomTextLead}{" "}
                    <Link
                        href="/contact-us"
                        className="font-bold text-magenta-300 underline underline-offset-4 transition-colors duration-200 hover:text-white"
                    >
                        {industries.bottomLinkText}
                    </Link>{" "}
                    {industries.bottomTextTrail}
                </p>
            </div>
        </Section>
    );
}
