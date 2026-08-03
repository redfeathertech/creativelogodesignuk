import { contact, social } from "@/content/site";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  XIcon,
} from "@/components/ui/icons";

const socialIcons: Record<string, () => React.ReactElement> = {
  Facebook: FacebookIcon,
  X: XIcon,
  Instagram: InstagramIcon,
};

/**
 * Utility bar above the header. Hidden below 1024px, as on the live site.
 *
 * Its height is set from `--topbar-h` rather than from padding, because the
 * hero sizes itself against `--header-h` and the two must agree exactly.
 */
export default function TopBar() {
  return (
    <div className="hidden h-[var(--topbar-h)] border-b border-white/[0.07] bg-ink-950 lg:block">
      <div className="mx-auto flex h-full max-w-[var(--container-wide)] items-center justify-between gap-6 px-gutter text-xs text-white/65">
        <div className="flex items-center gap-5">
          <a
            href={`tel:${contact.phoneE164}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <span className="text-teal-500">
              <PhoneIcon />
            </span>
            {contact.phoneDisplay}
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <span className="flex items-center gap-2">
            <span className="text-teal-500">
              <ClockIcon />
            </span>
            {contact.hours}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <span className="text-teal-500">
              <MailIcon />
            </span>
            {contact.email}
          </a>
        </div>

        <ul className="flex items-center gap-4">
          {social.map((item) => {
            const Icon = socialIcons[item.label];
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in a new tab)`}
                  className="block text-white/60 transition-colors hover:text-magenta-300"
                >
                  {Icon ? <Icon /> : item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
