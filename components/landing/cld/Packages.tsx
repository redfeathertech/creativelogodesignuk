import { contact } from "@/content/site";
import {
    packageCta,
    packageGroups,
    packagesIntro,
    type Package,
} from "@/content/landing/creative-logo-design";
import { btn } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * The nine pricing cards: three logo, three branding, three website.
 *
 * Heading levels are the document's, not the design's — the live page picks
 * `h5`/`h6` by font size, which leaves nine package names below the "What you
 * will Get?" labels in the outline. The **text** is untouched; only the level
 * moves. That is the same correction docs/CONTENT-PARITY.md records for the
 * homepage's six section titles.
 *
 * "What you will Get?" becomes a `<p>` and splits the list in two. It is a list
 * label, not a section heading, and the live page nests it in a stray `<ul>`
 * between two `<li>`s — invalid markup that puts a heading inside a list.
 *
 * The nine Stripe Checkout URLs are carried over exactly. They are live payment
 * links; a typo in one is a lost sale, not a broken link.
 */

function PriceCard({ item }: { item: Package }) {
    return (
        <div
            className={`reveal relative flex flex-col rounded-lg border bg-white p-6 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-7 ${
                item.bestSeller
                    ? "border-magenta-500/40 shadow-[0_18px_54px_-24px_rgb(204_6_127/0.55)]"
                    : "border-ink-900/[0.08]"
            }`}
        >
            {item.bestSeller && (
                <span className="absolute -top-3 left-6 rounded-full bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] px-3.5 py-1 font-display text-[0.625rem] font-extrabold tracking-[0.1em] text-white uppercase">
                    Best Seller
                </span>
            )}

            <h3 className="text-h5 font-bold text-onlight">{item.name}</h3>
            <p className="mt-1 text-sm text-onlight-muted">{item.tagline}</p>

            <p className="mt-5 flex items-baseline gap-3 border-b border-ink-900/[0.08] pb-5">
                <span className="font-display text-h3 leading-none font-extrabold text-magenta-600">
                    {item.price}
                </span>
                <span className="text-onlight-muted line-through">{item.was}</span>
                <span className="text-sm text-onlight-muted">Only</span>
            </p>

            {/* `flex-1` on the list, not the card body: it is what makes the three
                CTA blocks in a row line up when the lists differ in length. */}
            <div className="flex-1">
                <ul className="mt-6 grid gap-2.5">
                    {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-onlight">
                            <span className="mt-1 shrink-0 text-teal-600">
                                <CheckIcon className="size-3.5" />
                            </span>
                            {feature}
                        </li>
                    ))}
                </ul>

                {item.deliverables && (
                    <>
                        <p className="mt-5 font-display text-xs font-extrabold tracking-[0.1em] text-onlight uppercase">
                            {item.deliverablesHeading}
                        </p>
                        <ul className="mt-3 grid gap-2.5">
                            {item.deliverables.map((entry) => {
                                const text = typeof entry === "string" ? entry : entry.text;
                                return (
                                    <li
                                        key={text}
                                        className="flex items-start gap-2.5 text-onlight"
                                    >
                                        <span className="mt-1 shrink-0 text-teal-600">
                                            <CheckIcon className="size-3.5" />
                                        </span>
                                        <span>
                                            {text}
                                            {typeof entry !== "string" && (
                                                <>
                                                    {" "}
                                                    <strong className="block text-sm font-semibold text-onlight-muted">
                                                        {entry.note}
                                                    </strong>
                                                </>
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>

            <div className="mt-7 grid gap-2.5">
                <QuoteButton packageName={item.name} variant="primary" className="w-full">
                    {packageCta.start}
                </QuoteButton>
                <a
                    href={item.buyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${packageCta.buy} — ${item.name} (opens in a new tab)`}
                    className={btn("outline", "md", "w-full")}
                >
                    {packageCta.buy}
                </a>
                <a
                    href={`tel:${contact.phoneE164}`}
                    className="text-center text-sm font-semibold text-onlight-muted transition-colors hover:text-magenta-600"
                >
                    {packageCta.call}
                </a>
            </div>
        </div>
    );
}

export default function Packages() {
    return (
        <section id="packages" className="bg-mist-100 py-section text-onlight">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[70ch] text-center">
                    <h2 className="text-h2">{packagesIntro.title}</h2>
                    <p className="mt-5 text-lead text-onlight-muted">{packagesIntro.lead}</p>
                </div>

                {packageGroups.map((group) => (
                    <div key={group.id} className="mt-[clamp(3rem,2rem+4vw,5rem)]">
                        <h2
                            id={group.id}
                            className="reveal mb-10 scroll-mt-24 text-center text-h3"
                        >
                            {group.title}
                        </h2>

                        {/* `items-stretch` so every card in a row is the height of
                            the tallest, which is what keeps the CTA blocks aligned. */}
                        <div className="grid items-stretch gap-6 min-[576px]:grid-cols-2 lg:grid-cols-3">
                            {group.items.map((item) => (
                                <PriceCard key={item.name} item={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
