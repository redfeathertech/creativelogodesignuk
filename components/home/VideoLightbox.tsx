"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";

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
    portrait = false,
    title,
    closeLabel,
    onClose,
}: {
    vimeoId: string;
    /**
     * True for a 9:16 upload — every client testimonial so far is filmed on a
     * phone. Vimeo letterboxes the video inside whatever box the iframe is
     * given, so a portrait clip in the default 16:9 frame draws about a third
     * the picture with two black bars either side of it. This swaps the frame
     * to 9:16 and caps its height against the viewport instead of its width.
     */
    portrait?: boolean;
    /** Names both the dialog and the iframe, e.g. "LH Carpentry — Logo Design". */
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

    /* PORTALLED TO <body>, and it has to be. The section that renders this is
       `isolate`, which opens a stacking context — so in place, the overlay's
       z-1040 and the dialog's z-1045 are only ever compared against each other
       and against that ONE section, never against the chrome. The sticky Nav is
       z-1030 at the root and therefore painted on top of the whole modal,
       swallowing the close button; the WhatsApp FAB (z-1000) came through it
       too. `position: fixed` was never the problem — the stacking context was.

       Safe to reach for `document` unguarded: the parent only mounts this from
       a click handler, so it never renders on the server. */
    return createPortal(
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
                    /* Both branches size the frame so it always fits on screen,
                       because the aspect ratio below turns whatever width lands
                       here into a height. */
                    className={cn(
                        "relative m-auto",
                        /* Portrait is sized off the VIEWPORT HEIGHT, not the
                           width: at 9:16 a frame wide enough to look deliberate
                           is taller than any laptop. `100dvh` minus ~8rem
                           leaves room for the wrapper padding and the close
                           button that sits above the frame; the 24rem cap stops
                           it turning into a skyscraper on a tall monitor, and
                           the 100% term keeps it inside a narrow phone. */
                        portrait
                            ? "w-[min(24rem,100%,calc((100dvh-8rem)*0.5625))]"
                            : "w-full max-w-[64rem]",
                    )}
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

                    <div
                        className={cn(
                            "w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-lg",
                            portrait ? "aspect-[9/16]" : "aspect-video",
                        )}
                    >
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
        </>,
        document.body,
    );
}
