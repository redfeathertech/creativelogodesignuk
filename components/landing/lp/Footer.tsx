import Link from "next/link";

import { footer } from "@/content/landing/lp";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";

/**
 * The page's footer bar. No site navigation — this is a landing page.
 *
 * Two things the live version gets wrong, both fixed without touching a word:
 *
 * - Its two legal links point at `/terms-and-conditions.html` and
 *   `/privacy-policy.html`, and **both 404**. The pages exist without the
 *   `.html`, and both are routes here. The same live bug as
 *   `/logo-design-offer`. Link text is untouched.
 * - The three social links are icon-only with no accessible name at all, so a
 *   screen reader announces three unlabelled links. Each is named.
 */

const SOCIAL_ICONS = {
    Facebook: FacebookIcon,
    LinkedIn: LinkedInIcon,
    Instagram: InstagramIcon,
} as const;

export default function Footer() {
    return (
        <footer className="bg-ink-950 py-8 text-white">
            <div className="container-site flex flex-col items-center justify-between gap-5 text-sm text-white/60 md:flex-row">
                <ul className="flex gap-3">
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

                <p>{footer.copyright}</p>

                <ul className="flex items-center gap-3">
                    {footer.legal.map((item, i) => (
                        <li key={item.href} className="flex items-center gap-3">
                            {i > 0 && (
                                <span aria-hidden="true" className="text-white/25">
                                    |
                                </span>
                            )}
                            <Link href={item.href} className="transition-colors hover:text-white">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
