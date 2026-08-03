import Image from "next/image";

import { contact } from "@/content/site";
import { combo } from "@/content/landing/lp";
import { btn } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * The All-In-One Combo band: four deliverable columns under one price.
 *
 * `£1199` exists on the live page **only** as pixels — an inline base64 PNG
 * with `alt="Combo Icon"`. No element states it in any textual form, so the
 * headline price of the page's biggest offer is unreadable to a crawler and
 * silent to a screen reader. The only other place the number appears at all is
 * the modal heading the "Order Now" button sets, which is not in the document
 * until it is clicked. Same problem, and the same fix, as the `£1599` tag on
 * /creative-logo-design and the `£1199` SVG on /logo-design-offer.
 *
 * The two band titles are `<div>`s on the live page, not headings. They are the
 * section's heading here.
 */
export default function Combo() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            <Image
                src="/assets/img/landing/lp/combo-bg.webp"
                alt=""
                aria-hidden="true"
                width={1920}
                height={1061}
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-30"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-70"
                aria-hidden="true"
            />

            <div className="container-site">
                <div className="reveal text-center">
                    <p className="text-sm font-semibold tracking-[0.08em] text-white/70">
                        {combo.eyebrow}
                    </p>
                    <h2 className="mt-3 text-h2">{combo.title}</h2>
                    <p className="mt-4 font-display text-h3 leading-none font-extrabold">
                        <span className="gradient-text">{combo.price}</span>
                    </p>
                </div>

                <div className="mt-[clamp(2.5rem,1.5rem+4vw,4rem)] grid items-stretch gap-5 min-[576px]:grid-cols-2 lg:grid-cols-4">
                    {combo.columns.map((column) => (
                        <div
                            key={column.title}
                            className="reveal flex flex-col rounded-lg border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md"
                        >
                            <Image
                                src={column.icon}
                                alt=""
                                aria-hidden="true"
                                width={100}
                                height={100}
                                className="mx-auto w-fit"
                            />
                            <h3 className="mt-4 font-display text-base font-extrabold tracking-[0.06em] text-white uppercase">
                                {column.title}
                            </h3>
                            <ul className="mt-4 grid gap-2.5">
                                {column.items.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 text-sm text-white/80"
                                    >
                                        <span className="mt-1 shrink-0 text-teal-300">
                                            <CheckIcon className="size-3.5" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    <QuoteButton
                        packageName={`${combo.title} - ${combo.price}`}
                        variant="primary"
                        size="lg"
                    >
                        {combo.ctaOrder}
                    </QuoteButton>
                    <a
                        href={`tel:${contact.phoneE164}`}
                        className={btn("ghost", "lg")}
                    >
                        {combo.ctaCall}
                    </a>
                </div>
            </div>
        </section>
    );
}
