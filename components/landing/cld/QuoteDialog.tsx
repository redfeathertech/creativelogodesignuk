"use client";

import { QuoteDialogBase } from "@/components/landing/QuoteDialogBase";
import { quoteDialog } from "@/content/landing/creative-logo-design";
import QuoteForm from "./QuoteForm";

/**
 * The "Avail 70% Discount" modal, opened by every CTA on this landing page that
 * is not a phone number or a Stripe link — thirteen of them.
 *
 * All the behaviour lives in `QuoteDialogBase`, which `/logo-design-offer`
 * shares. This file is only the binding to this page's copy and its form.
 */
export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
    return (
        <QuoteDialogBase
            copy={quoteDialog}
            titleId="cld-quote-dialog-title"
            renderForm={(packageName) => <QuoteForm packageName={packageName} />}
        >
            {children}
        </QuoteDialogBase>
    );
}

export { QuoteButton } from "@/components/landing/QuoteDialogBase";
