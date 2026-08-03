import type { LegalDoc } from "./types";

import { privacyPolicy } from "./privacy-policy";
import { termsAndConditions } from "./terms-and-conditions";
import { refundPolicy } from "./refund-policy";
import { cookiesPolicy } from "./cookies-policy";

export type { LegalDoc, LegalNode, Inline, InlineRun } from "./types";

/** Route path -> document. Keys must match the `legal` group in content/routes.ts. */
export const legalDocs: Record<string, LegalDoc> = {
    "/privacy-policy": privacyPolicy,
    "/terms-and-conditions": termsAndConditions,
    "/refund-policy": refundPolicy,
    "/cookies-policy": cookiesPolicy,
};

export function getLegalDoc(path: string): LegalDoc | undefined {
    return legalDocs[path];
}
