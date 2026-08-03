import Image from "next/image";

import { contact } from "@/content/site";
import { topBar } from "@/content/landing/lp";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { QuoteButton } from "./QuoteDialog";

/**
 * The page's only chrome: an offer bar and a logo.
 *
 * No navigation, by design — this is a paid-traffic page whose only exits are
 * its own CTAs. It is why `app/(landing)/` exists as a route group separate
 * from `app/(site)/`.
 *
 * The live page marks the offer line up as an `<h5>`, so its heading outline
 * opens at level 5 and then jumps to the `<h1>` below. It is a paragraph here —
 * same words, and the outline is no longer broken before the page has said
 * anything.
 */
export default function TopBar() {
    return (
        <header className="relative isolate bg-ink-950">
            <div className="border-b border-white/[0.07] bg-[linear-gradient(97deg,var(--color-violet-600)_0%,var(--color-magenta-600)_100%)]">
                <div className="mx-auto flex max-w-[var(--container-wide)] flex-col items-center justify-between gap-2 px-gutter py-2 text-center sm:flex-row sm:gap-6 sm:text-left">
                    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold text-white sm:justify-start">
                        {topBar.offer}
                        <QuoteButton
                            packageName={topBar.offerCtaTitle}
                            variant="light"
                            className="px-3.5 py-1.5 text-[0.6875rem] tracking-[0.04em] normal-case"
                        >
                            {topBar.offerCta}
                        </QuoteButton>
                    </p>

                    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-white/85">
                        <li>
                            <a
                                href={`tel:${contact.phoneE164}`}
                                className="flex items-center gap-2 transition-colors hover:text-white"
                            >
                                <PhoneIcon />
                                {topBar.phone}
                            </a>
                        </li>
                        <li>
                            <a
                                href={contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 transition-colors hover:text-white"
                            >
                                <span className="[&>svg]:size-4">
                                    <WhatsAppIcon />
                                </span>
                                {topBar.chat}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mx-auto flex max-w-[var(--container-wide)] items-center justify-center px-gutter py-5 lg:justify-start">
                <Image
                    src="/assets/img/logo.webp"
                    alt="Creative Logo Design"
                    width={220}
                    height={56}
                    // Above the fold on the one page a paid click lands on.
                    // (`priority` is deprecated in Next 16.)
                    preload
                    className="h-10 w-auto sm:h-11"
                />
            </div>
        </header>
    );
}
