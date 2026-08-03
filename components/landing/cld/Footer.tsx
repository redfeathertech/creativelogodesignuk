import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { contact, offices } from "@/content/site";
import { footer } from "@/content/landing/creative-logo-design";
import { btn } from "@/components/ui/button";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedInIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
} from "@/components/ui/icons";
import CallbackForm from "./CallbackForm";

/**
 * The landing page's own footer — not the site footer.
 *
 * It carries a different social set from `content/site.ts` (LinkedIn rather
 * than X) and two links off the page, both legal. Those two are the only exits
 * from the page that are not a CTA, which is deliberate: everything else is a
 * phone number, a WhatsApp thread, a Stripe checkout or the quote dialog.
 *
 * The live page wraps its *entire* footer — address, phone, social links and
 * all — inside the callback `<form>` element. Only the two inputs belong in it.
 */

const socials = [
    { label: "Facebook", href: "https://www.facebook.com/Creativelogodesignuk/", Icon: FacebookIcon },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/creativelogo-design-uk/",
        Icon: LinkedInIcon,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/creative_logo_design_uk/",
        Icon: InstagramIcon,
    },
] as const;

const uk = offices[0];
const mapsHref = `https://www.google.com/maps?q=${encodeURIComponent(uk.address)}`;

export default function Footer() {
    return (
        <footer className="relative isolate overflow-hidden bg-ink-950 text-white">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden="true" />

            <div className="container-site grid gap-[clamp(2.5rem,1.5rem+4vw,4rem)] py-section lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <div className="reveal">
                    <Image
                        src="/assets/img/logo.webp"
                        alt="Creative Logo Design"
                        width={220}
                        height={56}
                        sizes="200px"
                        className="h-10 w-auto"
                    />

                    <p className="mt-6 max-w-[62ch] text-white/65">{footer.blurb}</p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href={contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={btn("primary")}
                        >
                            {footer.ctaChat}
                        </a>
                        <a href={`tel:${contact.phoneE164}`} className={btn("ghost")}>
                            {footer.ctaCall}
                        </a>
                    </div>

                    <ul className="mt-8 grid gap-3.5 text-white/70">
                        <li>
                            <a
                                href={mapsHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 transition-colors hover:text-white"
                            >
                                <span className="mt-0.5 shrink-0 text-teal-500">
                                    <MapPinIcon />
                                </span>
                                {uk.address}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-3 transition-colors hover:text-white"
                            >
                                <span className="shrink-0 text-teal-500">
                                    <MailIcon />
                                </span>
                                {contact.email}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`tel:${contact.phoneE164}`}
                                className="flex items-center gap-3 transition-colors hover:text-white"
                            >
                                <span className="shrink-0 text-teal-500">
                                    <PhoneIcon />
                                </span>
                                {contact.phoneDisplay}
                            </a>
                        </li>
                    </ul>

                    <ul className="mt-7 flex items-center gap-4">
                        {socials.map(({ label, href, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${label} (opens in a new tab)`}
                                    className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-magenta-500/50 hover:bg-white/10 hover:text-white"
                                >
                                    <Icon />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="reveal rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8 lg:self-start">
                    <h2 className="text-h4 font-extrabold text-white">{footer.callback.title}</h2>
                    <div className="mt-6">
                        <CallbackForm />
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-[linear-gradient(97deg,var(--color-violet-600)_0%,var(--color-magenta-600)_100%)]">
                <div className="container-site flex flex-col items-center justify-between gap-3 py-4 text-center text-sm text-white/85 sm:flex-row sm:text-left">
                    <p>
                        {footer.copyright}{" "}
                        <a
                            href={footer.builtBy.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-white underline-offset-4 hover:underline"
                        >
                            {footer.builtBy.label}
                        </a>
                    </p>
                    <p className="flex items-center gap-3">
                        <Link
                            href={"/privacy-policy" as Route}
                            className="underline-offset-4 hover:text-white hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        <span aria-hidden="true" className="text-white/40">
                            |
                        </span>
                        <Link
                            href={"/terms-and-conditions" as Route}
                            className="underline-offset-4 hover:text-white hover:underline"
                        >
                            Terms &amp; Conditions
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
