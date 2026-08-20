import Image from "next/image";
import Link from "next/link";
import { contact, offices, site } from "@/content/site";
import {
  footerColumns,
  footerHeading,
  footerSocial,
  footerTagline,
  legalLinks,
  locationsHeading,
} from "@/content/footer";
import {
  FacebookIcon,
  FooterChatIcon,
  FooterPhoneIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/ui/icons";

const socialIcons: Record<string, () => React.ReactElement> = {
  Facebook: FacebookIcon,
  X: XIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
};

/**
 * The one-line address the design prints, wrapped by the column rather than by
 * hand-placed <br>s.
 *
 * `content/site.ts` holds the parts *and* a verbatim `address` string, and this
 * deliberately uses the parts: the verbatim form punctuates the UK office
 * "Wembley, England, HA0 4LY", where the design has no comma before the
 * postcode. Joining locality and "region postcode" as one segment gives
 * "Wembley, England HA0 4LY" for the UK and still reads correctly for the US
 * ("Edison, NJ 08817") and Dubai, which has no postcode at all.
 */
const oneLineAddress = (office: (typeof offices)[number]) =>
  [office.street, office.locality, [office.region, office.postalCode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");

/** Shared by the five column headings and the Locations heading. */
const HEADING = "font-display text-xs font-bold tracking-[0.14em] text-white uppercase";
/** The magenta rule under every heading. */
const RULE = "mt-2.5 block h-[3px] w-8 rounded-full bg-gradient-to-r from-magenta-500 to-violet-400";
const LINK =
  "block text-[0.8125rem] leading-snug text-white/55 transition-colors hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-aurora border-t border-white/10">
      <div className="container-site py-16 lg:py-20">
        {/* Six columns, and the tracks are NOT equal. The brand column carries
            the full email address, and SEO/Locations carry the two longest
            strings in the footer ("Answer Engine Optimisation (AEO)" and the
            Dubai address). Equal 1fr tracks wrap all three; these ratios come
            from the signed-off design's own column widths.

            minmax(0,…) rather than bare fr: an fr track's automatic minimum is
            min-content, so the contact block below — which is allowed to run a
            little wider than its column — would otherwise inflate track 1 and
            steal width from the other five. */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 min-[86.25rem]:grid-cols-[minmax(0,1.49fr)_minmax(0,1.05fr)_minmax(0,1.02fr)_minmax(0,1.32fr)_minmax(0,1.04fr)_minmax(0,1.12fr)] min-[86.25rem]:gap-x-6">
          {/* ---- brand ---------------------------------------------------- */}
          {/* Spans the whole row below xl so the contact block never strands a
              half-empty cell beside a service column. */}
          <div className="sm:col-span-2 md:col-span-3 min-[86.25rem]:col-span-1">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block">
              <Image
                src="/assets/img/logo.webp"
                alt={site.name}
                width={220}
                height={62}
                className="h-16 w-auto"
              />
            </Link>

            <p className="mt-6 max-w-[17rem] text-[0.8125rem] leading-relaxed text-white/55">
              {footerTagline}
            </p>

            <h2 className="mt-8 font-display text-[0.8125rem] font-bold tracking-[0.11em] text-white uppercase">
              {footerHeading}
            </h2>

            <ul className="mt-4 flex flex-wrap items-center gap-2.5">
              {footerSocial.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label} (opens in a new tab)`}
                      className="grid size-10 place-items-center rounded-lg bg-white/[0.07] text-white/85 ring-1 ring-white/15 transition-colors hover:bg-magenta-500 hover:text-white hover:ring-magenta-500"
                    >
                      {Icon ? <Icon /> : item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* The design lets this block run into the gutter so the email fits
                on one line — the service column beside it has already ended by
                this height, so nothing collides. */}
            <ul className="mt-9 space-y-3.5 min-[86.25rem]:w-[calc(100%+1.5rem)]">
              <li>
                <a
                  href={`tel:${contact.phoneE164}`}
                  className="group flex items-center gap-3 text-[0.8125rem] text-white/65 transition-colors hover:text-white"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-white/80 ring-1 ring-white/25 transition-colors group-hover:text-magenta-300 group-hover:ring-magenta-400">
                    <FooterPhoneIcon />
                  </span>
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-3 text-[0.8125rem] break-words text-white/65 transition-colors hover:text-white"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-white/80 ring-1 ring-white/25 transition-colors group-hover:text-magenta-300 group-hover:ring-magenta-400">
                    <FooterChatIcon />
                  </span>
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* ---- service columns ------------------------------------------ */}
          {/* min-w-0: grid items default to min-width:auto, so a column would
              refuse to shrink below its longest word and push the grid wider
              than its track. */}
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="min-w-0">
              <h2 className={HEADING}>
                {column.href ? (
                  <Link href={column.href} className="transition-colors hover:text-magenta-300">
                    {column.heading}
                  </Link>
                ) : (
                  column.heading
                )}
              </h2>
              <span className={RULE} aria-hidden="true" />
              {/* space-y-3, not -2: these links are 13px tall, so 8px of
                  separation put them at a 23px pitch — a hair under the 24px
                  that lets an undersized target still pass WCAG 2.5.8. */}
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* ---- locations ------------------------------------------------ */}
          <section className="min-w-0" aria-labelledby="footer-locations">
            <h2 id="footer-locations" className={HEADING}>
              {locationsHeading}
            </h2>
            <span className={RULE} aria-hidden="true" />
            <ul className="mt-5 space-y-6">
              {offices.map((office) => (
                <li key={office.country}>
                  <h3 className="text-[0.9375rem] font-semibold text-white">{office.country}</h3>
                  <address className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/55 not-italic">
                    {oneLineAddress(office)}
                  </address>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* ---- legal bar ---------------------------------------------------- */}
      {/* The divider is full-bleed in the design, so it sits on this wrapper
          rather than inside the container. */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-7 lg:flex-row">
          <p className="text-[0.8125rem] text-white/55">
            All Rights Reserved &copy; {year} {site.name}.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8125rem] text-white/45 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
