"use client";

import { QuoteDialogBase } from "@/components/landing/QuoteDialogBase";
import { quoteDialog } from "@/content/landing/lp";
import QuoteForm from "./QuoteForm";

/**
 * The quote modal, opened by every CTA on the page that is not a phone number
 * or a WhatsApp link — including all eighteen "START PROJECT" buttons.
 *
 * Behaviour lives in `QuoteDialogBase`, shared with the two other landing pages.
 */
export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
    return (
        <QuoteDialogBase
            copy={quoteDialog}
            titleId="lp-quote-dialog-title"
            renderForm={(packageName) => <QuoteForm packageName={packageName} />}
        >
            {children}
        </QuoteDialogBase>
    );
}

export { QuoteButton } from "@/components/landing/QuoteDialogBase";
