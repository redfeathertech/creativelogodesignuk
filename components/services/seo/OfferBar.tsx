import { contact } from "@/content/site";
import { topBar } from "@/content/landing/seo-services";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

/**
 * The offer strip, first thing in the page body.
 *
 * Before the 2026-08 redesign this page carried its own utility bar ABOVE its
 * own header, because it rendered in `app/(landing)/` with no site chrome. It
 * is a real service page now, so the site's `TopBar` and mega-menu header sit
 * above it and this keeps only the part the site chrome has no equivalent of:
 * the limited-time offer, and the two contact links that ride beside it.
 *
 * The live bar is magenta above 768px and a dark slate blue below it. Both
 * colours are now the site's own — the brand gradient on the wide layout, the
 * `ink-950` canvas the header already sits on when it stacks — so the strip
 * reads as part of the chrome above rather than as a third palette.
 */
export default function OfferBar() {
    return (
        <div className="bg-ink-950 text-white md:bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)]">
            <div className="container-site flex flex-col items-center gap-2 py-3 text-center text-xs sm:text-sm md:flex-row md:justify-between md:py-[5px] md:text-left">
                <p className="m-0 font-display font-semibold">{topBar.offer}</p>

                <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-1 p-0">
                    <li>
                        <a
                            href={`tel:${contact.phoneE164}`}
                            className="inline-flex items-center gap-2 text-white no-underline transition-opacity hover:opacity-80"
                        >
                            <PhoneIcon />
                            <span>
                                {topBar.phoneLabel} {topBar.phone}
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white no-underline transition-opacity hover:opacity-80"
                        >
                            <WhatsAppIcon />
                            <span>{topBar.chat}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
