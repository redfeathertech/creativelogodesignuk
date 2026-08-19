"use client";

import { useEffect, useRef } from "react";

/**
 * The modal a video testimonial opens into.
 *
 * Rendered by the parent ONLY while a card is active, which is the whole point:
 * until someone clicks, there is no iframe in the tree, so the page makes no
 * request to Vimeo, sets no third-party cookie and downloads none of the player
 * bundle. Closing unmounts it again and the video stops with it — no need to
 * postMessage a pause into a cross-origin frame.
 *
 * The mechanics mirror components/landing/QuoteDialogBase.tsx (focus trap,
 * Escape, scroll lock, focus restore) rather than sharing it, because that
 * component is a context provider wrapped around a form and this needs none of
 * that. What it deliberately copies is the mounted-only-while-open shape: the
 * closed state has no focusable content to hide, so it cannot reproduce the
 * `inert={false}` bug logged against the lead panel in docs/PROGRESS.md.
 */

/* `iframe` is in the list so Tab can reach the player itself, not just the
   close button beside it. */
const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export default function VideoLightbox({
    vimeoId,
    title,
    closeLabel,
    onClose,
}: {
    vimeoId: string;
    /** Names both the dialog and the iframe, e.g. "AutoKeyFix — Website Redesign & SEO". */
    title: string;
    closeLabel: string;
    onClose: () => void;
}) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        /* Captured on mount rather than passed down: the parent sets state from
           the card's own onClick, so the trigger still holds focus at this
           point and there is nothing to thread through props. */
        const trigger = document.activeElement as HTMLElement | null;

        const { body } = document;
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        const prevOverflow = body.style.overflow;
        const prevPadding = body.style.paddingRight;
        body.style.overflow = "hidden";
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

        closeRef.current?.focus();

        /* Escape stops working once focus is inside the player, because those
           keystrokes belong to a cross-origin document we cannot listen to.
           That is why the close button is always visible over the frame rather
           than tucked into a corner of it. */
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
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
            document.removeEventListener("keydown", onKeyDown);
            body.style.overflow = prevOverflow;
            body.style.paddingRight = prevPadding;
            trigger?.focus();
        };
    }, [onClose]);

    /* `dnt=1` is Vimeo's do-not-track switch: no cookies, no analytics, no
       session recording. The three chrome flags strip the uploader furniture so
       the frame reads as the client's video rather than a Vimeo page. */
    const src =
        `https://player.vimeo.com/video/${vimeoId}` +
        "?autoplay=1&dnt=1&title=0&byline=0&portrait=0";

    return (
        <>
            <div
                onClick={onClose}
                aria-hidden="true"
                className="fixed inset-0 z-[1040] bg-ink-950/85 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-[1045] grid place-items-center overflow-y-auto overscroll-contain p-4 sm:p-6">
                <div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                    /* Capped on BOTH axes. Width alone leaves a 16:9 frame taller
                       than a landscape phone, which puts the player's own
                       controls off-screen; `max-h` with the aspect ratio doing
                       the width lets it shrink to fit either way round. */
                    className="relative m-auto w-full max-w-[64rem]"
                >
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label={closeLabel}
                        /* Sits above the frame on small screens and outside its
                           top-right corner from `sm:` up, so it never covers the
                           player's own controls. */
                        className="absolute -top-11 right-0 grid size-9 cursor-pointer place-items-center rounded-full border border-white/20 text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:-top-12 sm:-right-1"
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

                    <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-lg">
                        <iframe
                            src={src}
                            title={title}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="size-full border-0"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
