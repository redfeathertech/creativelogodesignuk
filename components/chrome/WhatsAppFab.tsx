import { contact } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Floating WhatsApp button. Inline SVG rather than the live site's
    hotlinked Wikimedia image. */
export default function WhatsAppFab() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="fixed bottom-5 left-5 z-[1000] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 ease-out hover:scale-110"
    >
      <WhatsAppIcon />
    </a>
  );
}
