import { packageGroups, packagesIntro, type Package } from "@/content/landing/logo-design-offer";
import { CheckIcon } from "@/components/ui/icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * The nine pricing cards: three logo, three branding, three website.
 *
 * The live page puts the three group names in a tab strip and keeps only the
 * selected group in the DOM, so six of the nine cards — six prices, six feature
 * lists — are never in the document at once. Here all three groups are stacked
 * and server-rendered, and the tab labels become the group headings. Same
 * words, and nothing is behind a click.
 *
 * Heading levels are the document's, not the design's: the live page picks
 * `h5`/`h6` by font size and renders each price as an `<h2>`, which puts nine
 * bare prices at section level in the outline. The **text** is untouched; only
 * the level moves — the same correction docs/CONTENT-PARITY.md records for the
 * homepage's six section titles.
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
                <span className="absolute -top-3 left-6 rounded-full bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] px-3.5 py-1 font-display text-ui-10 font-extrabold tracking-[0.1em] text-white uppercase">
                    {packagesIntro.bestSeller}
                </span>
            )}

            <h3 className="text-h5 font-bold text-onlight">{item.name}</h3>
            <p className="mt-1 text-sm text-onlight-muted">{item.tagline}</p>

            <p className="mt-5 flex items-baseline gap-3 border-b border-ink-900/[0.08] pb-5">
                <span className="font-display text-h3 leading-none font-extrabold text-magenta-600">
                    {item.price}
                </span>
                <span className="text-onlight-muted line-through">{item.was}</span>
            </p>

            {/* `flex-1` on the list, not the card body: it is what makes the
                CTA blocks in a row line up when the lists differ in length. */}
            <ul className="mt-6 grid flex-1 content-start gap-2.5">
                {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-onlight">
                        <span className="mt-1 shrink-0 text-teal-600">
                            <CheckIcon className="size-3.5" />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="mt-7">
                <QuoteButton packageName={item.name} variant="primary" className="w-full">
                    {packagesIntro.cta}
                </QuoteButton>
            </div>
        </div>
    );
}

export default function Packages() {
    return (
        <section id="packages" className="bg-mist-100 py-section text-onlight">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[70ch] text-center">
                    <h2 className="text-h2 uppercase">{packagesIntro.title}</h2>
                    <p className="mt-5 text-lead text-onlight-muted">{packagesIntro.lead}</p>
                </div>

                {packageGroups.map((group) => (
                    <div key={group.id} className="mt-[clamp(3rem,2rem+4vw,5rem)]">
                        <h3 id={group.id} className="reveal mb-10 scroll-mt-24 text-center text-h3">
                            {group.title}
                        </h3>

                        {/* `items-stretch` so every card in a row is the height of
                            the tallest, which keeps the CTA blocks aligned. */}
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
