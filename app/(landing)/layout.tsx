import WhatsAppFab from "@/components/chrome/WhatsAppFab";

/**
 * Landing pages: no site navigation, no site footer, no mega-menu.
 *
 * These are paid-traffic pages. Every exit is one of their own CTAs, which is
 * exactly why they cannot live under `app/(site)/` — a nested layout can add
 * chrome but never remove what a parent already rendered.
 *
 * Each landing page brings its own header and footer, so all this layout owns
 * is `<main id="main">` (the skip link's target, which used to come from the
 * root layout) and the WhatsApp button, which every landing page has.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main id="main">{children}</main>
            <WhatsAppFab />
        </>
    );
}
