import SiteChrome from "@/components/chrome/SiteChrome";

/**
 * Everything that wears the site's navigation: the homepage, About, Contact,
 * the 36 service pages and the four legal pages.
 *
 * Landing pages live in `app/(landing)/` and get their own, chrome-free shell.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return <SiteChrome>{children}</SiteChrome>;
}
