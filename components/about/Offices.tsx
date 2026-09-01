import Image from "next/image";

import { locations } from "@/content/about";
import { contact, offices } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { btn } from "@/components/ui/button";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";

/** The heading block above the cards. Only the copy differs between pages. */
export interface OfficesCopy {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: string;
    cta: string;
}

/**
 * The three offices. Shared by About Us and Contact Us, which in the redesign
 * render the identical cards under a differently-worded heading — hence `copy`.
 *
 * Addresses, numbers and photos come from `content/site.ts` — the same record
 * the footer prints and the `Organization` JSON-LD publishes, so the page can
 * never claim an address the structured data contradicts.
 *
 * Each card links out to Google Maps rather than embedding one: an embed is a
 * third-party iframe, ~900KB of it, for what a link does.
 */
export default function Offices({ copy = locations }: { copy?: OfficesCopy }) {
    return (
        <Section tone="light">
            <div className="container-site">
                <div className="reveal mb-12 max-w-[58ch] max-lg:mx-auto max-lg:text-center">
                    <Eyebrow className="text-magenta-500 max-lg:justify-center max-lg:[&>span]:hidden">
                        {copy.eyebrow}
                    </Eyebrow>
                    <SectionHeading
                        lead={copy.titleLead}
                        accent={copy.titleAccent}
                        accentClassName="gradient-text-brand"
                    />
                    <p className="mt-6 text-lead text-onlight-muted">{copy.lead}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {offices.map((office) => (
                        <article
                            key={office.country}
                            /* `translate`, not `transform`: Tailwind v4 implements
                               `-translate-y-*` with the standalone `translate`
                               property, so naming `transform` here would ease the
                               shadow while the card jumps. See
                               components/ui/TrustpilotBadge.tsx. */
                            className="reveal flex flex-col overflow-hidden rounded-lg border border-ink-900/10 bg-white shadow-sm transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
                        >
                            <Image
                                src={office.image}
                                alt={office.imageAlt}
                                width={664}
                                height={400}
                                sizes="(max-width: 640px) 92vw, (max-width: 992px) 46vw, 30vw"
                                className="aspect-[16/10] w-full object-cover"
                            />

                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="font-display text-h5 font-bold tracking-[0.06em] text-onlight uppercase">
                                    {office.country}
                                </h3>

                                <ul className="mt-4 mb-6 grid gap-3 text-sm text-onlight-muted">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-0.5 shrink-0 text-magenta-500" aria-hidden="true">
                                            <MapPinIcon />
                                        </span>
                                        <address className="not-italic">{office.address}</address>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-0.5 shrink-0 text-magenta-500" aria-hidden="true">
                                            <PhoneIcon />
                                        </span>
                                        {/* E.164, not the live site's local form — that one
                                            cannot be dialled from the USA or Dubai pages. */}
                                        <a
                                            href={`tel:${office.phoneE164}`}
                                            className="transition-colors hover:text-magenta-500 hover:underline"
                                        >
                                            {office.phoneDisplay}
                                        </a>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-0.5 shrink-0 text-magenta-500" aria-hidden="true">
                                            <MailIcon />
                                        </span>
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="break-all transition-colors hover:text-magenta-500 hover:underline"
                                        >
                                            {contact.email}
                                        </a>
                                    </li>
                                </ul>

                                {/* Three identical "Get directions" labels on one page is
                                    exactly the case WCAG 2.4.4 is about, so each one names
                                    its office to a screen reader. */}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Get directions to the ${office.country} office (opens in a new tab)`}
                                    className={btn("outline", "md", "mt-auto self-start")}
                                >
                                    {copy.cta}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
