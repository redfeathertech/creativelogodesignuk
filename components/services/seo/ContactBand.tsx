import Image from "next/image";

import { contact, site, social } from "@/content/site";
import { footer } from "@/content/landing/seo-services";
import {
    FacebookIcon,
    InstagramIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
    XIcon,
} from "@/components/ui/icons";
import { Eyebrow, Section } from "@/components/ui/Section";

/**
 * The page's closing contact band.
 *
 * Before the 2026-08 redesign this was the page's OWN footer — it rendered in
 * `app/(landing)/`, so there was no site footer beneath it and it had to carry
 * the about paragraph, the contact block, the social row and the Google Partner
 * badge itself. The page is a service page now and the site footer supplies the
 * link graph, the legal links and the copyright line, so what is left here is
 * the part the site footer has no equivalent of: this page's own contact
 * column, its "stay connected" row and the partner badge.
 *
 * It is kept rather than dropped because none of that copy exists anywhere else
 * in the build, and it is laid out as a normal three-column section on the
 * `dark` surface rather than as a second footer.
 */

/* The three platforms `content/site.ts` carries, in its order. Keyed by label
   so the icon follows the content rather than a parallel array's index. */
const SOCIAL_ICONS = {
    Facebook: FacebookIcon,
    X: XIcon,
    Instagram: InstagramIcon,
} as const;

export default function ContactBand() {
    return (
        <Section tone="dark">
            <div className="container-site grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)]">
                {/* --------------------------------------------------- about -- */}
                <div className="reveal">
                    <Eyebrow>{site.name}</Eyebrow>
                    <p className="max-w-[62ch] text-lead text-white/65">{footer.about}</p>
                </div>

                {/* ------------------------------------------------- contact -- */}
                <div className="reveal">
                    <h2 className="font-display text-xs font-bold tracking-[0.14em] text-magenta-300 uppercase">
                        {footer.contactTitle}
                    </h2>

                    <ul className="m-0 mt-7 grid list-none gap-6 p-0 text-white/80">
                        <li>
                            <a
                                href={`mailto:${footer.email}`}
                                className="flex items-start gap-3.5 no-underline transition-colors hover:text-magenta-300"
                            >
                                <span className="mt-1 shrink-0 text-teal-500">
                                    <MailIcon />
                                </span>
                                <span className="min-w-0 break-words">{footer.email}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`tel:${contact.phoneE164}`}
                                className="flex items-start gap-3.5 no-underline transition-colors hover:text-magenta-300"
                            >
                                <span className="mt-1.5 shrink-0 text-teal-500">
                                    <PhoneIcon />
                                </span>
                                <span className="min-w-0">{footer.phone}</span>
                            </a>
                        </li>
                        <li className="flex items-start gap-3.5">
                            <span className="mt-1 shrink-0 text-teal-500">
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
                <div className="reveal">
                    <h2 className="font-display text-xs font-bold tracking-[0.14em] text-magenta-300 uppercase">
                        {footer.socialTitle}
                    </h2>

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
                                        className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-transparent hover:bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]"
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
        </Section>
    );
}
