import Image from "next/image";
import Link from "next/link";
import { contact, offices, site, social } from "@/content/site";
import { footerColumns, footerHeading, footerTagline, legalLinks } from "@/content/footer";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/ui/icons";

const socialIcons: Record<string, () => React.ReactElement> = {
  Facebook: FacebookIcon,
  X: XIcon,
  Instagram: InstagramIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-[var(--container-site)] px-gutter py-16">
        {/* 1fr/3fr, not 1fr/2.4fr: the right-hand side carries eight service
            columns since the pillar restructure, not four. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
          {/* ---- brand ---- */}
          <div>
            <Link href="/" aria-label="Creative Logo Design — home">
              <Image
                src="/assets/img/logo.webp"
                alt="Creative Logo Design"
                width={220}
                height={62}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{footerTagline}</p>

            <h2 className="mt-8 font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
              {footerHeading}
            </h2>
            <ul className="mt-4 flex items-center gap-3">
              {social.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label} (opens in a new tab)`}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-magenta-400 hover:text-magenta-300"
                    >
                      {Icon ? <Icon /> : item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Locations sits with the brand, not as a trailing link column:
                eight service columns divide evenly into the grid below and a
                ninth would leave a ragged row at every breakpoint. */}
            <h2 className="mt-10 mb-4 font-display text-xs font-bold tracking-[0.14em] text-white uppercase">
              Locations
            </h2>
            <ul className="space-y-4">
              {offices.map((office) => (
                <li key={office.country} className="text-[0.8125rem] leading-snug text-white/55">
                  <span className="mb-1 block font-semibold text-white/80">{office.country}</span>
                  <address className="not-italic">
                    {office.street},<br />
                    {office.locality}
                    {office.region ? `, ${office.region}` : ""}
                    {office.postalCode ? ` ${office.postalCode}` : ""}
                  </address>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-1.5 text-[0.8125rem]">
              <a
                href={`tel:${contact.phoneE164}`}
                className="block text-white/55 transition-colors hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="block break-all text-white/55 transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* ---- link columns ---- */}
          {/* min-w-0 on each column: grid items default to min-width:auto, so a
              column refuses to shrink below its longest word ("Optimisation")
              and pushes the grid wider than its track. */}
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading} className="min-w-0">
                <h2 className="mb-4 font-display text-xs font-bold tracking-[0.14em] text-white uppercase">
                  {column.href ? (
                    <Link href={column.href} className="transition-colors hover:text-magenta-300">
                      {column.heading}
                    </Link>
                  ) : (
                    column.heading
                  )}
                </h2>
                {/* space-y-2.5, not -2: these links are 15px tall, so 8px of
                    separation put them at a 23px pitch — a hair under the 24px
                    spacing that lets an undersized target still pass WCAG 2.5.8.
                    10px clears it, and the columns are dense on a phone. */}
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.8125rem] leading-snug text-white/55 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ---- legal bar ---- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>
            All Rights Reserved &copy; {year} {site.name}.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
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
