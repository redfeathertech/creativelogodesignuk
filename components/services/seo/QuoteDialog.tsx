"use client";

import { QuoteDialogBase } from "@/components/landing/QuoteDialogBase";
import { quoteDialog } from "@/content/landing/seo-services";
import EnquiryForm from "./EnquiryForm";

/**
 * Binds the shared dialog to this page's copy and form.
 *
 * `tone="dark"` since the 2026-08 redesign — the page now sits on the site's
 * near-black service surface rather than the live template's white canvas, so
 * it takes the same dialog tone as every other page that uses this base.
 *
 * The page keeps its own dialog rather than switching to the site-wide
 * `LeadPanel`: this form is the live page's six-field set (two name fields and
 * a free-text subject, which no other form on the site collects), and each CTA
 * tags the enquiry with the plan the visitor clicked so the notification email
 * says which one generated it.
 *
 * Every CTA on the live page is `href="#"`: twelve dead links, including both
 * hero buttons, all three pricing "Get Started" buttons and both buttons in the
 * closing band. They open this instead.
 */
export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
    return (
        <QuoteDialogBase
            tone="dark"
            titleId="seo-quote-dialog-title"
            copy={{ title: quoteDialog.title, close: "Close" }}
            renderForm={(packageName) => (
                <EnquiryForm packageName={packageName ?? quoteDialog.defaultPackage} />
            )}
        >
            {children}
        </QuoteDialogBase>
    );
}

export { QuoteButton } from "@/components/landing/QuoteDialogBase";
