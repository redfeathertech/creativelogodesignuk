import type { BriefSection } from "./brief-types";

/**
 * `/logo-brief` — copy transcribed from the live
 * `https://creativelogodesign.co.uk/logo-brief/index.php`.
 *
 * TWO THINGS THAT LOOK LIKE MISTAKES AND ARE NOT:
 *
 * 1. One section heading, not four. The live source carries three more
 *    ("Your Vision & Preferences", "Branding & Design Needs",
 *    "Communication") commented out in the HTML, so they are not on the page
 *    and are not copy. Do not add them.
 * 2. "Color Preferences" is the live US spelling on an otherwise British site.
 *    The page ranks; the spelling stays.
 *
 * The `email` field is the ONE declared addition to either page — the live form
 * collects no email address, which is why it could never send a confirmation.
 * Declared in scripts/verify-brief-parity.py and approved 4 Aug 2026.
 *
 * Required-versus-optional is the live `js/script.js`: full_name (min 3),
 * business_name, business_description (min 5), business_stage, logo_style,
 * contact_method and contact_info (min 5). The live page marks none of them
 * visibly, so the rebuild marks them with `required` + `aria-required` and
 * changes no label text.
 */

export const meta = {
    title: "Logo Design Brief Form",
    description:
        "UK logo design brief form. Tell us about your business, your style preferences and how to reach you, and our designers will come back to you within one working day.",
};

export const intro = {
    title: "Logo Design Brief",
};

export const submitLabel = "Submit";
export const successTitle = "Brief received";

export const sections: readonly BriefSection[] = [
    {
        title: "About You & Your Business",
        fields: [
            {
                kind: "text",
                name: "full_name",
                label: "Your Full Name",
                placeholder: "Enter your full name",
                required: true,
                autoComplete: "name",
            },
            /* The declared addition. Placed after the name so the form still
               reads the way the live one does. */
            {
                kind: "email",
                name: "email",
                label: "Email Address",
                placeholder: "Enter your email address",
                required: true,
                autoComplete: "email",
            },
            {
                kind: "text",
                name: "business_name",
                label: "Business Name",
                placeholder: "Enter your business name",
                required: true,
                autoComplete: "organization",
            },
            {
                kind: "textarea",
                name: "business_description",
                label: "Business Description",
                placeholder: "Describe what your business does",
                required: true,
                rows: 4,
            },
            {
                kind: "select",
                name: "business_stage",
                label: "Business Stage",
                required: true,
                options: [
                    "Select stage",
                    "Starting Out",
                    "Growing Business",
                    "Established Business",
                ],
            },
            {
                kind: "text",
                name: "existing_presence",
                label: "Existing Website or Social Media",
                placeholder: "Website or social links (if any)",
            },
            {
                kind: "text",
                name: "brand_message",
                label: "Message or Feeling for the Logo",
                placeholder: "Example: Luxury, trust, reliability",
            },
            {
                kind: "text",
                name: "logo_inspiration",
                label: "Logos or Brands You Like",
                placeholder: "Share brands you like",
            },
            {
                kind: "select",
                name: "logo_style",
                label: "Logo Style Preference",
                required: true,
                options: [
                    "Select style",
                    "Icon + Text",
                    "Text Only",
                    "Icon Only",
                    "Badge / Emblem",
                ],
            },
            {
                kind: "text",
                name: "color_preferences",
                label: "Color Preferences",
                placeholder: "Example: Gold, Silver, Black",
            },
            {
                kind: "text",
                name: "font_preferences",
                label: "Font Preferences",
                placeholder: "Example: Elegant, Modern, Serif",
            },
            {
                kind: "text",
                name: "avoid",
                label: "Anything to Avoid",
                placeholder: "Example: Bright colours",
            },
            {
                kind: "text",
                name: "tagline",
                label: "Slogan / Tagline",
                placeholder: "Optional tagline",
            },
            {
                kind: "text",
                name: "logo_usage",
                label: "Main Logo Usage",
                placeholder: "Example: Website, uniforms, invoices",
            },
            {
                kind: "text",
                name: "branding_materials",
                label: "Other Branding Materials Needed",
                placeholder: "Example: Business cards, letterhead",
            },
            {
                kind: "select",
                name: "contact_method",
                label: "Preferred Contact Method",
                required: true,
                options: ["Select contact method", "WhatsApp", "Email", "Phone"],
            },
            {
                kind: "text",
                name: "contact_info",
                label: "Contact Information",
                placeholder: "Phone or email",
                required: true,
            },
            {
                kind: "select",
                name: "schedule_call",
                label: "Schedule a Quick Call?",
                options: ["Select option", "Yes", "No"],
            },
        ],
    },
];
