import type { ServiceContentOverrides } from "./types";
import { marketingAndSalesAutomationOverrides } from "./marketing-and-sales-automation";

/**
 * PLACEHOLDER CONTENT — the `/automation-services` pillar page and five of its
 * six sub-services.
 *
 * `/automation-services/marketing-sales-automation` is NOT here: it is a real
 * ported page (`./marketing-and-sales-automation`), and it is the module
 * everything below is cloned from. Nothing else in this group exists on the live
 * Laravel site, so there is nothing to port and nothing for
 * `scripts/verify-content-parity.py` to check against.
 *
 * Note the source module's own `meta.title` is `"SEO"` — a live copy-paste
 * defect kept deliberately and listed in `TITLE_CORRECTIONS`
 * (content/services/index.ts). The clones below all set their own title, so the
 * defect does not propagate.
 *
 * Same arrangement as the other `*-placeholders` modules; see
 * docs/CONTENT-PARITY.md.
 */

interface Placeholder {
    /** `<title>`, and `meta.title`. Must equal the route title in ../routes. */
    title: string;
    /** Hero eyebrow + breadcrumb label. */
    label: string;
    description: string;
    heading: string;
    headingAccent: string;
    lead: string;
}

function placeholderContent(p: Placeholder): ServiceContentOverrides {
    return {
        ...marketingAndSalesAutomationOverrides,
        meta: { title: p.title, description: p.description },
        hero: {
            ...marketingAndSalesAutomationOverrides.hero,
            eyebrow: p.label,
            breadcrumb: p.label,
            heading: p.heading,
            headingAccent: p.headingAccent,
            lead: p.lead,
            mediaAlt: `${p.title} from Creative Logo Design`,
        },
        marquee: { text: p.label },
        whyChoose: {
            ...marketingAndSalesAutomationOverrides.whyChoose,
            heading: "Why Choose Creative Logo Design for",
            headingAccent: `${p.title}?`,
        },
        cta: { ...marketingAndSalesAutomationOverrides.cta },
    };
}

/** The pillar page. */
export const automationServicesOverrides = placeholderContent({
    title: "Automation Services",
    label: "Automation Services",
    description:
        "Business automation services from Creative Logo Design — CRM, workflow, email and AI automation that take the repetitive work off your team and keep nothing falling through the cracks.",
    heading: "Let the software do the parts",
    headingAccent: "nobody should be doing by hand",
    lead: "CRM and workflow automation, email sequences, chatbots and AI-assisted processes — joined up so your tools talk to each other and your team stops re-keying the same data.",
});

export const crmAutomationOverrides = placeholderContent({
    title: "CRM Automation",
    label: "CRM Automation",
    description:
        "CRM automation from Creative Logo Design — pipelines, lead routing and follow-up sequences set up so no enquiry goes cold and your data stays clean.",
    heading: "A pipeline that updates itself",
    headingAccent: "while your team sells",
    lead: "Lead capture and routing, deal stages, task automation, data hygiene rules and reporting — configured in HubSpot, Salesforce, Pipedrive or whatever you already run.",
});

export const workflowAutomationOverrides = placeholderContent({
    title: "Workflow Automation",
    label: "Workflow Automation",
    description:
        "Workflow automation from Creative Logo Design — connect the tools you already use and remove the manual handoffs that slow every process down.",
    heading: "Join up your tools",
    headingAccent: "and delete the manual handoffs",
    lead: "Approvals, onboarding, invoicing, handovers and internal notifications — mapped, automated and monitored so work moves without anyone chasing it.",
});

export const emailAutomationOverrides = placeholderContent({
    title: "Email Automation",
    label: "Email Automation",
    description:
        "Email automation from Creative Logo Design — welcome, nurture, abandoned-cart and win-back sequences that keep selling long after they are set up.",
    heading: "Sequences that keep working",
    headingAccent: "long after you set them up",
    lead: "Welcome and nurture flows, abandoned cart and browse recovery, re-engagement and post-purchase series — segmented, tested and reported on properly.",
});

export const chatbotDevelopmentOverrides = placeholderContent({
    title: "Chatbot Development",
    label: "Chatbot Development",
    description:
        "Chatbot development from Creative Logo Design — assistants that answer real questions, qualify leads and hand over to a human at the right moment.",
    heading: "Answer instantly,",
    headingAccent: "hand over at the right moment",
    lead: "Website and messaging-platform bots that qualify enquiries, answer from your own content, book appointments, and escalate to a person before they frustrate anyone.",
});

export const aiAutomationOverrides = placeholderContent({
    title: "AI Automation",
    label: "AI Automation",
    description:
        "AI automation from Creative Logo Design — practical AI applied to real business processes, with the guardrails and human review that keep it trustworthy.",
    heading: "AI pointed at the work",
    headingAccent: "that actually costs you time",
    lead: "Document handling, summarisation, classification, drafting and support triage — built around your data, with human review where the stakes call for it.",
});
