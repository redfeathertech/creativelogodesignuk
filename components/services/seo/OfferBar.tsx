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
 * The strip runs one solid gradient at every width — magenta #CC067F on the
 * left to violet #6E0BBA on the right — over the `ink-950` canvas the header
 * above it sits on, so it reads as part of the chrome rather than as a third
 * palette.
 */
export default function OfferBar() {
    return (
        <div className="border-b border-white/[0.07] bg-ink-950 text-white/70 bg-[linear-gradient(90deg,#CC067F_0%,#6E0BBA_100%)]">
            {/* A flat height rather than one derived from padding — `--hero-h`
                already subtracts `--offerbar-h`, and a strip whose real height
                drifts from that token is what puts the hero's scroll cue below
                the fold. See the token in globals.css. */}
            <div className="container-site flex h-[var(--offerbar-h)] flex-col items-center justify-center gap-1 text-center text-ui-11 sm:text-xs md:flex-row md:justify-between md:text-left">
                <p className="m-0 flex items-center gap-2 font-display font-semibold text-white">
                    <span aria-hidden="true" className="text-white">
                        &bull;
                    </span>
                    {topBar.offer}
                </p>

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
