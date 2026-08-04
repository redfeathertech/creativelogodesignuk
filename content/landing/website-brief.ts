import type { BriefField, BriefSection } from "./brief-types";

/**
 * `/website-brief` — copy transcribed from the live
 * `https://creativelogodesign.co.uk/website-brief/index.php`.
 *
 * Required-versus-optional is taken from the live `js/script.js`, not from the
 * asterisks in the labels: the script requires client_name (min 3), company,
 * email, business_overview (min 5) and at least one website goal, and accepts
 * an empty phone but rejects one under 7 characters. Everything else is
 * optional. See docs/superpowers/specs/2026-08-04-brief-form-pages-design.md.
 */

export const meta = {
    title: "Website Brief Form",
    description:
        "Creative Logo Design is a UK based design agency specializing in custom logo design services. Our expert logo designers are ready to give your brand an identity.",
};

export const intro = {
    title: "Website Design Brief",
    description:
        "Please complete this form so we can better understand your business and website requirements.",
};

export const submitLabel = "Submit Website Brief";
export const successTitle = "Brief received";

export const sections: readonly BriefSection[] = [
    {
        title: "Client Details",
        fields: [
            {
                kind: "text",
                name: "client_name",
                label: "Full Name *",
                required: true,
                autoComplete: "name",
            },
            {
                kind: "text",
                name: "company",
                label: "Company Name *",
                required: true,
                autoComplete: "organization",
            },
            {
                kind: "email",
                name: "email",
                label: "Email Address *",
                required: true,
                autoComplete: "email",
            },
            {
                kind: "tel",
                name: "phone",
                label: "Phone / WhatsApp",
                autoComplete: "tel",
            },
        ],
    },
    {
        title: "Business Overview",
        fields: [
            {
                kind: "textarea",
                name: "business_overview",
                label: "Tell us about your business*",
                required: true,
                rows: 4,
            },
            {
                kind: "textarea",
                name: "products_services",
                label: "What products or services do you offer?",
                rows: 4,
            },
            {
                kind: "textarea",
                name: "business_difference",
                label: "What makes your business different from competitors?",
                rows: 4,
            },
            {
                kind: "select",
                name: "business_age",
                label: "How long have you been operating?",
                options: [
                    "Select",
                    "Less than 1 year",
                    "1-3 years",
                    "3-5 years",
                    "5-10 years",
                    "10+ years",
                ],
            },
        ],
    },
    {
        title: "Target Audience",
        fields: [
            {
                kind: "textarea",
                name: "ideal_customers",
                label: "Who are your ideal customers?",
                rows: 4,
            },
            {
                kind: "text",
                name: "locations_served",
                label: "Locations Served",
            },
            {
                kind: "text",
                name: "target_industries",
                label: "Target Industries",
            },
        ],
    },
    {
        title: "Website Goals *",
        fields: [
            {
                kind: "checkboxes",
                name: "website_goals[]",
                label: "Website Goals *",
                required: true,
                options: [
                    "Generate Leads",
                    "Receive Enquiries",
                    "Book Appointments",
                    "Sell Products Online",
                    "Showcase Portfolio",
                    "Build Brand Credibility",
                ],
            },
        ],
    },
    {
        title: "Services / Products",
        fields: [
            {
                kind: "textarea",
                name: "main_services_products",
                label: "List your main services or products",
                rows: 4,
            },
        ],
    },
    {
        title: "Competitors & Inspiration",
        fields: [
            { kind: "url", name: "competitor_1", label: "Competitor Website #1" },
            { kind: "url", name: "competitor_2", label: "Competitor Website #2" },
            { kind: "url", name: "competitor_3", label: "Competitor Website #3" },
            { kind: "url", name: "competitor_4", label: "Competitor Website #4" },
        ],
    },
    {
        title: "Website Features",
        fields: [
            {
                kind: "checkboxes",
                name: "website_features[]",
                label: "Website Features",
                options: [
                    "Contact Form",
                    "Online Booking",
                    "Online Payments",
                    "Quote Request Form",
                    "Gallery / Portfolio",
                    "Testimonials",
                    "Blog",
                    "Live Chat",
                    "Newsletter Signup",
                    "Membership Area",
                ],
            },
        ],
    },
    {
        title: "Pages Required",
        fields: [
            {
                kind: "checkboxes",
                name: "pages_required[]",
                label: "Pages Required",
                options: [
                    "Home",
                    "About Us",
                    "Services",
                    "Portfolio",
                    "Testimonials",
                    "Blog",
                    "FAQ",
                    "Contact",
                ],
            },
        ],
    },
    {
        title: "Additional Information",
        fields: [
            {
                kind: "textarea",
                name: "additional_notes",
                label: "Additional Notes",
                rows: 4,
            },
        ],
    },
];

/**
 * The three checkbox groups, as `Set`s the server action matches against.
 *
 * Same guard and the same reasoning as `LANDING_PACKAGES` in
 * `app/actions/forms.ts`: these values are visitor-editable and they land in an
 * email, so they are matched rather than echoed. Built from `sections` rather
 * than retyped, so adding an option can never leave it unrecognised. A `Map` of
 * `Set`s, not object literals — neither inherits `constructor`, which would
 * otherwise survive the membership test.
 *
 * Narrowed by the `[]` suffix on `name` (see `BriefField`'s own doc comment)
 * rather than by comparing `field.kind` to a literal, which would read to
 * scripts/verify-brief-parity.py as an untranscribed copy string and fail
 * FORWARD.
 */
export const CHECKBOX_OPTIONS: ReadonlyMap<string, ReadonlySet<string>> = new Map(
    sections
        .flatMap((section) => section.fields)
        .filter((field): field is Extract<BriefField, { kind: "checkboxes" }> =>
            field.name.endsWith("[]"),
        )
        .map((field) => [field.name, new Set(field.options)] as const),
);
