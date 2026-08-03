import { contact } from "@/content/site";
import { contactSection } from "@/content/landing/lp";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import QuoteForm from "./QuoteForm";

/**
 * The "Let's Build Your Digital Future" contact band.
 *
 * The live form posts to `/lp/php_mailer/index.php` and, on success, navigates
 * the browser to `thanks.php` — so a submission is a full page load and the
 * visitor leaves the page. This one is a Server Action that swaps the form for
 * a success state in place.
 *
 * The live "Contact Us" label above the heading is an `<h3>` sitting above an
 * `<h2>`, which inverts the outline. It is an eyebrow paragraph here.
 */
export default function Contact() {
    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60"
                aria-hidden="true"
            />

            <div className="container-site grid gap-[clamp(2.5rem,1.5rem+4vw,4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="reveal">
                    <p className="font-display text-xs font-bold tracking-[0.14em] text-magenta-300 uppercase">
                        {contactSection.eyebrow}
                    </p>
                    <h2 className="mt-4 text-h2">
                        {contactSection.titleLead}{" "}
                        <span className="block gradient-text">{contactSection.titleTrail}</span>
                    </h2>

                    <ul className="mt-8 grid gap-4 text-white/70">
                        <li>
                            <a
                                href={`tel:${contact.phoneE164}`}
                                className="flex items-center gap-3 transition-colors hover:text-white"
                            >
                                <PhoneIcon />
                                {contactSection.phone}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-3 break-all transition-colors hover:text-white"
                            >
                                <MailIcon />
                                {contactSection.email}
                            </a>
                        </li>
                        <li>
                            <a
                                href={contactSection.addressHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 transition-colors hover:text-white"
                            >
                                <span className="mt-1 shrink-0">
                                    <MapPinIcon />
                                </span>
                                {contactSection.address}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="reveal rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
                    <QuoteForm
                        source="lp-contact"
                        submitLabel={contactSection.form.submit}
                    />
                </div>
            </div>
        </section>
    );
}
