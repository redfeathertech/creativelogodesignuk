import type { Metadata, Viewport } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

import { SITE_URL, site } from "@/content/site";
import Analytics from "@/components/Analytics";
import Chatra from "@/components/Chatra";
import Reveal from "@/components/ui/Reveal";

/* Self-hosted at build time — no requests leave the browser for these. */
const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    display: "swap",
});

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    // Required before any relative URL in a metadata field will build.
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Digital Marketing & Web Design Agency | Creative Logo Design",
        template: "%s | Creative Logo Design",
    },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    publisher: site.name,
    // The live site puts this tag after </footer>, where Google never reads it.
    verification: { google: site.googleSiteVerification },
    formatDetection: { telephone: false, address: false, email: false },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        siteName: site.name,
        locale: site.locale,
        url: `${SITE_URL}/`,
    },
    twitter: { card: "summary_large_image" },
};

/* themeColor/colorScheme/viewport belong here, not in `metadata` — they are
   deprecated in the metadata object as of Next 14. */
export const viewport: Viewport = {
    themeColor: "#0D031C",
    colorScheme: "dark",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang={site.lang}
            // Next 16 no longer overrides scroll-behavior during navigation; this
            // restores snap-to-top on route change alongside CSS smooth scrolling.
            data-scroll-behavior="smooth"
            className={`${montserrat.variable} ${raleway.variable}`}
        >
            <body className="bg-ink-900 font-body text-body text-white antialiased">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[2000] focus:rounded-md focus:bg-magenta-500 focus:px-4 focus:py-2 focus:text-white"
                >
                    Skip to content
                </a>

                {/* Chrome is NOT rendered here. `app/(site)/layout.tsx` wraps
                    its routes in <SiteChrome>; `app/(landing)/` deliberately
                    does not, because a landing page has no navigation and a
                    nested layout cannot remove what a parent already drew.
                    Each branch supplies its own <main id="main">. */}
                {children}

                <Reveal />
                <Analytics />
                <Chatra />
            </body>
        </html>
    );
}
