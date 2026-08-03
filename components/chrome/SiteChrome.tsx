import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import { LeadPanelProvider } from "./LeadPanel";

/**
 * The full site shell: utility bar, sticky header with the mega-menu, footer,
 * WhatsApp FAB, and the lead-panel context every "Get a quote" button opens.
 *
 * This used to live directly in `app/layout.tsx`. It moved out when the first
 * landing page landed: `/creative-logo-design` is a paid-traffic page with no
 * navigation at all — deliberately, so the only ways off it are its own CTAs —
 * and a nested layout can never *remove* chrome a parent layout rendered.
 *
 * The root layout therefore keeps only `<html>`/`<body>` and the global scripts,
 * `app/(site)/layout.tsx` wraps everything in this, and `app/(landing)/` opts
 * out. Two consumers rather than one: `app/not-found.tsx` renders in the root
 * layout (a 404 can be served for any URL, in or out of a route group), so it
 * has to pull the chrome in itself.
 *
 * `<main id="main">` is here rather than in the root layout because it is the
 * skip link's target — every branch that renders page content must provide one.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Client provider wrapping server children — `children` is still
                rendered on the server and streamed in as a prop. */}
            <LeadPanelProvider>
                <Header />
                <main id="main">{children}</main>
                <Footer />
            </LeadPanelProvider>

            <WhatsAppFab />
        </>
    );
}
