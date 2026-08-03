import { contact } from "@/content/site";
import { combo } from "@/content/landing/creative-logo-design";
import { btn } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * The All-In-One Combo package.
 *
 * The price tag is the reason this section is worth reading twice: on the live
 * page **£1599 exists only inside `tag-01.webp`**. No element states the combo
 * price as text, so the page's headline offer is invisible to Google and to
 * anyone using a screen reader. Rebuilding the tag in HTML does not change the
 * copy — it is the first time the copy has been readable at all.
 */
export default function Combo() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-900 py-section text-white">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden="true" />

            <div className="container-site">
                <div className="grid gap-[clamp(2rem,1rem+4vw,3.5rem)] lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
                    <div className="reveal order-2 lg:order-1">
                        <p className="font-display text-sm font-bold tracking-[0.1em] text-magenta-300 uppercase">
                            {combo.kicker}
                        </p>
                        <h2 className="mt-3 text-h2">
                            <span className="gradient-text">{combo.title}</span>
                        </h2>
                        <p className="mt-5 max-w-[64ch] text-lead text-white/65">{combo.lead}</p>

                        <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                            {combo.columns.map((column) => (
                                <div key={column.title}>
                                    <h3 className="font-display text-h5 font-bold text-white">
                                        {column.title}
                                    </h3>
                                    <ul className="mt-3 grid gap-2">
                                        {column.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2.5 text-white/75"
                                            >
                                                <span className="mt-1 shrink-0 text-teal-400">
                                                    <CheckIcon className="size-3.5" />
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <QuoteButton
                                packageName={combo.tag.kicker}
                                variant="primary"
                                size="lg"
                            >
                                {combo.ctaOrder}
                            </QuoteButton>
                            <a href={`tel:${contact.phoneE164}`} className={btn("ghost", "lg")}>
                                {combo.ctaCall}
                            </a>
                        </div>
                    </div>

                    {/* ------------------------------------------- price tag -- */}
                    <div className="reveal order-1 justify-self-center lg:order-2 lg:self-center">
                        <p className="grid w-[clamp(13rem,26vw,16rem)] rotate-[-4deg] gap-1 rounded-lg border border-star/40 bg-[linear-gradient(160deg,var(--color-magenta-500)_0%,var(--color-violet-600)_100%)] px-6 py-7 text-center shadow-lg">
                            <span className="font-display text-sm font-extrabold tracking-[0.14em] text-star uppercase">
                                {combo.tag.kicker}
                            </span>
                            <span className="text-xs tracking-[0.06em] text-white/75 uppercase">
                                {combo.tag.sub}
                            </span>
                            <span className="mt-1 font-display text-h2 leading-none font-extrabold text-white">
                                {combo.tag.price}
                            </span>
                            <span className="font-display text-xs font-extrabold tracking-[0.16em] text-star uppercase">
                                {combo.tag.suffix}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
