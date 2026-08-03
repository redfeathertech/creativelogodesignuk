import Image from "next/image";
import Link from "next/link";

import { contact } from "@/content/site";
import { footer } from "@/content/landing/logo-design-offer";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedInIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
} from "@/components/ui/icons";
import QuoteForm from "./QuoteForm";

/**
 * The page's own footer. No site navigation — this is a landing page.
 *
 * Its two legal links are the one place the rebuild changes a destination: the
 * live page points them at `/terms-and-conditions.html` and
 * `/privacy-policy.html`, and **both 404** (verified with curl, 1 Aug 2026).
 * The pages exist without the `.html`, and both are routes here, so the links
 * now resolve. The link text is untouched. See docs/CONTENT-PARITY.md.
 */

const SOCIAL_ICONS = {
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    LinkedIn: LinkedInIcon,
} as const;

export default function Footer() {
    return (
        <footer className="relative isolate bg-ink-950 pt-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60"
                aria-hidden="true"
            />

            <div className="container-site">
                <div className="grid gap-[clamp(2.5rem,1.5rem+4vw,4rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
                    <div>
                        <Image
                            src="/assets/img/logo.webp"
                            alt="Creative Logo Design"
                            width={220}
                            height={56}
                            className="h-10 w-auto"
                        />
                        <p className="mt-6 max-w-[62ch] text-sm leading-[1.7] text-white/60">
                            {footer.about}
                        </p>

                        <ul className="mt-8 flex gap-3">
                            {footer.social.map((item) => {
                                const Icon = SOCIAL_ICONS[item.label as keyof typeof SOCIAL_ICONS];
                                return (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${item.label} (opens in a new tab)`}
                                            className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            <Icon />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        <h2 className="mt-10 text-h5 font-bold">{footer.contactTitle}</h2>
                        <ul className="mt-4 grid gap-3 text-white/70">
                            <li>
                                <a
                                    href={`tel:${contact.phoneE164}`}
                                    className="flex items-center gap-3 transition-colors hover:text-white"
                                >
                                    <PhoneIcon />
                                    {contact.phoneDisplay}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-3 break-all transition-colors hover:text-white"
                                >
                                    <MailIcon />
                                    {contact.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={footer.addressHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 transition-colors hover:text-white"
                                >
                                    <span className="mt-1 shrink-0">
                                        <MapPinIcon />
                                    </span>
                                    {footer.address}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
                        <h2 className="text-h4 font-extrabold">{footer.form.title}</h2>
                        <div className="mt-6">
                            <QuoteForm
                                source="logo-design-offer-callback"
                                submitLabel={footer.form.submit}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-[clamp(2.5rem,1.5rem+4vw,4rem)] border-t border-white/10 py-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/60">
                        <p>
                            {footer.copyright}{" "}
                            <strong className="font-semibold text-white/80">
                                {footer.copyrightBrand}
                            </strong>
                        </p>
                        <ul className="flex items-center gap-3">
                            {footer.legal.map((item, i) => (
                                <li key={item.href} className="flex items-center gap-3">
                                    {i > 0 && (
                                        <span aria-hidden="true" className="text-white/25">
                                            |
                                        </span>
                                    )}
                                    <Link
                                        href={item.href}
                                        className="transition-colors hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="mt-6 text-xs leading-[1.7] text-white/40">
                        <strong className="font-semibold text-white/55">
                            {footer.disclaimerLabel}
                        </strong>{" "}
                        {footer.disclaimer}
                    </p>
                </div>
            </div>
        </footer>
    );
}
