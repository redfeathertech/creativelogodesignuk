"use client";

import { QuoteDialogBase } from "@/components/landing/QuoteDialogBase";
import { quoteDialog } from "@/content/landing/logo-design-offer";
import QuoteForm from "./QuoteForm";

/**
 * The quote modal, opened by every CTA on the page that is not a phone number
 * or a WhatsApp link — including all nine "START PROJECT" buttons.
 *
 * Behaviour lives in `QuoteDialogBase`, shared with `/creative-logo-design`.
 */
export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
    return (
        <QuoteDialogBase
            copy={quoteDialog}
            titleId="ldo-quote-dialog-title"
            renderForm={(packageName) => <QuoteForm packageName={packageName} />}
        >
            {children}
        </QuoteDialogBase>
    );
}

export { QuoteButton } from "@/components/landing/QuoteDialogBase";
