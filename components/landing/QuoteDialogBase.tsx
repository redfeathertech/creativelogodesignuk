"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { btn, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/**
 * The quote modal every landing-page CTA opens, minus the copy and the form.
 *
 * Both landing pages need the same behaviour — focus trap, Escape, scroll lock,
 * "which package was clicked" — and differ only in their wording and which form
 * they show. That split lives here: this file owns the mechanics, and each page
 * wraps it in a two-line provider bound to its own content module.
 *
 * Replaces the live pages' jQuery + Magnific Popup pairing, and with it the two
 * libraries.
 *
 * The dialog is **mounted only while open**, deliberately. `LeadPanel` keeps its
 * panel in the tree so it can slide, and pays for that with focusable content
 * inside `aria-hidden="true"` when closed (see docs/PROGRESS.md — the
 * `inert={false}` no-op). Nothing here needs an exit animation, so unmounting
 * removes the whole class of bug rather than working around it, and it keeps the
 * form's `useActionState` from carrying a stale result into the next open.
 */

interface QuoteDialogApi {
    /** `packageName` labels the enquiry email with the package that was clicked. */
    open: (packageName?: string) => void;
    close: () => void;
}

const QuoteDialogContext = createContext<QuoteDialogApi | null>(null);

function useQuoteDialog(): QuoteDialogApi {
    const ctx = useContext(QuoteDialogContext);
    if (!ctx) throw new Error("useQuoteDialog must be used inside a quote dialog provider");
    return ctx;
}

const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function QuoteDialogBase({
    children,
    copy,
    titleId,
    renderForm,
    tone = "dark",
}: {
    children: React.ReactNode;
    copy: { title: string; close: string };
    /** Unique per page, so two providers could never collide on one document. */
    titleId: string;
    /** `packageName` is `undefined` when the CTA that opened it named no package. */
    renderForm: (packageName: string | undefined) => React.ReactNode;
    /** "light" for `/seo-services`, the only light-canvas page. */
    tone?: "dark" | "light";
}) {
    const light = tone === "light";
    const [pkg, setPkg] = useState<string | null>(null);
    const [shown, setShown] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const restoreFocus = useRef<HTMLElement | null>(null);

    const isOpen = pkg !== null;

    const open = useCallback((packageName?: string) => {
        restoreFocus.current = document.activeElement as HTMLElement | null;
        // "" rather than undefined: `null` is the closed state, so an unlabelled
        // CTA still has to produce a non-null value to open the dialog.
        setPkg(packageName ?? "");
    }, []);

    const close = useCallback(() => {
        setShown(false);
        setPkg(null);
        restoreFocus.current?.focus();
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        // Scroll lock, compensating for the scrollbar so the page behind the
        // overlay does not jump sideways as it disappears.
        const { body } = document;
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        const prevOverflow = body.style.overflow;
        const prevPadding = body.style.paddingRight;
        body.style.overflow = "hidden";
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

        // One frame after mount, so the entrance transition has a state to move
        // from. Nothing depends on it firing — the dialog is usable either way.
        const raf = requestAnimationFrame(() => setShown(true));
        dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
                return;
            }
            if (event.key !== "Tab" || !dialogRef.current) return;

            const nodes = Array.from(
                dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
            ).filter((n) => n.offsetParent !== null);
            if (nodes.length === 0) return;

            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener("keydown", onKeyDown);
            body.style.overflow = prevOverflow;
            body.style.paddingRight = prevPadding;
        };
    }, [isOpen, close]);

    return (
        <QuoteDialogContext.Provider value={{ open, close }}>
            {children}

            {isOpen && (
                <>
                    <div
                        onClick={close}
                        aria-hidden="true"
                        className={cn(
                            "fixed inset-0 z-[1040] bg-ink-950/75 backdrop-blur-sm transition-opacity duration-300",
                            shown ? "opacity-100" : "opacity-0",
                        )}
                    />

                    {/* The wrapper scrolls, not the dialog: on a 320x568 phone the
                        form is taller than the viewport, and a dialog that clips
                        its own submit button cannot be submitted. */}
                    <div className="fixed inset-0 z-[1045] grid overflow-y-auto overscroll-contain p-4 sm:place-items-center sm:p-6">
                        <div
                            ref={dialogRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={titleId}
                            className={cn(
                                "relative m-auto w-full max-w-[30rem] rounded-lg border",
                                "p-6 shadow-lg transition-all duration-300 ease-out sm:p-8",
                                light
                                    ? "border-seo-border bg-white"
                                    : "border-white/10 bg-ink-850",
                                shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                            )}
                        >
                            {/* The mesh is a dark-canvas texture; on white it reads as dirt. */}
                            {!light && (
                                <div
                                    className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-mesh opacity-60"
                                    aria-hidden="true"
                                />
                            )}

                            <button
                                type="button"
                                onClick={close}
                                aria-label={copy.close}
                                className={cn(
                                    "absolute top-4 right-4 grid size-9 place-items-center rounded-full border transition-colors",
                                    light
                                        ? "border-seo-border text-seo-body hover:bg-seo-card hover:text-seo-ink"
                                        : "border-white/15 text-white/70 hover:bg-white/10 hover:text-white",
                                )}
                            >
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path
                                        d="M2 2l12 12M14 2L2 14"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                            <h2
                                id={titleId}
                                className={cn(
                                    "pr-10 text-h4 font-extrabold",
                                    light ? "text-seo-ink" : "text-white",
                                )}
                            >
                                {copy.title}
                            </h2>
                            {pkg && (
                                <p
                                    className={cn(
                                        "mt-1 text-sm",
                                        light ? "text-seo-pink" : "text-magenta-300",
                                    )}
                                >
                                    {pkg}
                                </p>
                            )}

                            <div className="mt-6">{renderForm(pkg || undefined)}</div>
                        </div>
                    </div>
                </>
            )}
        </QuoteDialogContext.Provider>
    );
}

/**
 * A CTA that opens the dialog.
 *
 * A real `<button>`, never `href="javascript:;"` — which is what the live
 * pages' equivalents are. Those are unreachable by keyboard in the usual sense,
 * announce as links to a screen reader, and do nothing at all with JavaScript
 * off.
 */
export function QuoteButton({
    children,
    packageName,
    variant = "primary",
    size = "md",
    className,
}: {
    children: React.ReactNode;
    packageName?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}) {
    const { open } = useQuoteDialog();
    return (
        <button
            type="button"
            onClick={() => open(packageName)}
            className={btn(variant, size, className)}
        >
            {children}
        </button>
    );
}
