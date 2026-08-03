"use client";

import { QuoteDialogBase } from "@/components/landing/QuoteDialogBase";
import { quoteDialog } from "@/content/landing/seo-services";
import EnquiryForm from "./EnquiryForm";

/**
 * Binds the shared dialog to this page's copy and form.
 *
 * `tone="light"` — the only light-canvas page in the build.
 *
 * Every CTA on the live page is `href="#"`: twelve dead links, including both
 * hero buttons, all three pricing "Get Started" buttons and both buttons in the
 * closing band. They open this instead, labelled with whatever the visitor
 * clicked, so the notification email says which plan generated the enquiry.
 */
export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
    return (
        <QuoteDialogBase
            tone="light"
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
