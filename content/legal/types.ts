/**
 * The shape of a legal document.
 *
 * These four pages are the only place on the site where the copy is a legal
 * instrument rather than marketing prose, so it is carried over from the
 * Laravel views verbatim — parsed out of the Blade markup rather than retyped.
 *
 * Inline emphasis and links are modelled as data (`InlineRun`) instead of an
 * HTML string. That keeps the renderer free of `dangerouslySetInnerHTML`, and
 * it means a stray tag in the source can never become markup in the output.
 *
 * `nodes` is a flat, ordered list rather than a nested section tree: the source
 * documents number their own headings ("7.2 Chargebacks"), so the nesting is
 * already in the text and a tree would only add a second, disagreeing one.
 */

/** A run of text inside a block: plain, bold, or a link. */
export type InlineRun = string | { b: string } | { a: string; href: string };

/** A block's content — a bare string when it has no inline markup. */
export type Inline = string | InlineRun[];

export type LegalNode =
    | { type: "h2"; text: Inline }
    | { type: "h3"; text: Inline }
    | { type: "p"; text: Inline }
    | { type: "ul"; items: Inline[] }
    | { type: "table"; head: Inline[]; rows: Inline[][] };

export interface LegalDoc {
    /** The visible H1, e.g. "Terms of Use". */
    title: string;
    /** <title> and the metadata title. Matches content/routes.ts. */
    metaTitle: string;
    metaDescription: string;
    /** As printed on the live page, e.g. "9th January, 2026". */
    lastUpdated: string;
    nodes: LegalNode[];
}
