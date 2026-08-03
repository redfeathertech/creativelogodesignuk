import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { contact, site, social } from "@/content/site";
import { footer } from "@/content/landing/seo-services";
import { FacebookIcon, InstagramIcon, MapPinIcon, PhoneIcon, XIcon } from "@/components/ui/icons";
import { PaperPlaneIcon } from "./icons";

/**
 * The page's own footer — this is a landing page, so there is no site chrome.
 *
 * Three columns on the live page at `lg` (5/4/3 of twelve), two at `md`, one
 * below that. The live markup's logo link goes nowhere (`href="#"`), so the
 * logo is rendered as a plain image rather than a link to itself.
 *
 * Two things added on top of the live footer:
 *
 * - Its two legal links are `href="#"`. Both pages exist on this site, so
 *   `content` points them at the real routes and they are linked here.
 * - There is no copyright line at all. One is rendered from `site.name` and a
 *   year resolved once, at build — every route in this build prerenders, so
 *   this is a build-time constant and not a per-request value.
 */

/* The three platforms `content/site.ts` carries, in its order. Keyed by label
   so the icon follows the content rather than a parallel array's index. */
const SOCIAL_ICONS = {
    Facebook: FacebookIcon,
    X: XIcon,
    Instagram: InstagramIcon,
} as const;

const YEAR = new Date().getFullYear();

/* The one colour on this page outside the token set: the live footer's widget
   titles are #74d66f, a green that appears nowhere else in the stylesheet and
   is not part of the magenta → coral → cream ramp. Kept literal rather than
   pulled towards `seo-good` (#2cff9b), which is visibly a different green. */
const TITLE = "font-display text-base font-bold tracking-[0.0625em] text-[#74d66f] uppercase";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-seo-ink text-white">
            <div className="container-site grid gap-x-8 gap-y-12 py-[clamp(2.5rem,1.75rem+3vw,3.75rem)] md:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)]">
                {/* --------------------------------------------------- about -- */}
                <div>
                    <Image
                        src="/assets/img/logo.webp"
                        alt={footer.logoAlt}
                        width={599}
                        height={259}
                        sizes="180px"
                        className="h-auto w-[180px] max-w-full"
                    />

                    <p className="mt-8 max-w-[62ch] text-sm leading-[1.9] text-white/80 sm:text-base sm:leading-[2]">
                        {footer.about}
                    </p>
                </div>

                {/* ------------------------------------------------- contact -- */}
                <div>
                    <h3 className={TITLE}>{footer.contactTitle}</h3>

                    <ul className="m-0 mt-7 grid list-none gap-6 p-0 text-sm leading-[1.7] sm:text-base sm:leading-[1.8]">
                        <li>
                            <a
                                href={`mailto:${footer.email}`}
                                className="flex items-start gap-3.5 text-white no-underline transition-colors hover:text-seo-coral"
                            >
                                <PaperPlaneIcon className="mt-1 size-4 shrink-0" />
                                <span className="min-w-0 break-words">{footer.email}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`tel:${contact.phoneE164}`}
                                className="flex items-start gap-3.5 text-white no-underline transition-colors hover:text-seo-coral"
                            >
                                <span className="mt-1.5 shrink-0">
                                    <PhoneIcon />
                                </span>
                                <span className="min-w-0">{footer.phone}</span>
                            </a>
                        </li>
                        <li className="flex items-start gap-3.5 text-white">
                            <span className="mt-1 shrink-0">
                                <MapPinIcon />
                            </span>
                            <span className="min-w-0">
                                {footer.address}
                                <br />
                                {footer.addressSecond}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* -------------------------------------------------- social -- */}
                <div>
                    <h3 className={TITLE}>{footer.socialTitle}</h3>

                    <ul className="m-0 mt-7 flex list-none flex-wrap items-center gap-4 p-0">
                        {social.map(({ label, href }) => {
                            const Icon = SOCIAL_ICONS[label];
                            return (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${label} (opens in a new tab)`}
                                        className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-transparent hover:gradient-seo"
                                    >
                                        <Icon />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <Image
                        src="/assets/img/landing/seo-services/google-partner.webp"
                        alt={footer.partnerAlt}
                        width={150}
                        height={70}
                        sizes="150px"
                        className="mt-10 h-auto w-[150px] max-w-full"
                    />
                </div>
            </div>

            {/* ------------------------------------------------------ bottom -- */}
            <div className="border-t border-white/10">
                <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-center text-sm text-white/60 sm:flex-row sm:text-left">
                    <p className="m-0">
                        © {YEAR} {site.name}
                    </p>

                    <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-1 p-0">
                        {footer.legal.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href as Route}
                                    className="no-underline underline-offset-4 transition-colors hover:text-white hover:underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
