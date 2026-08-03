import { contact } from "@/content/site";
import { topBar } from "@/content/landing/seo-services";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

/**
 * The offer bar above the hero.
 *
 * The live bar is magenta above 768px and switches to a dark slate blue
 * (`#11314f`) below it, via two overlapping media queries that set the same
 * three properties twice. One `md:` switch here, same two colours.
 */
export default function TopBar() {
    return (
        <div className="bg-[#11314f] text-white md:bg-seo-pink">
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
