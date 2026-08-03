"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import LeadForm from "@/components/forms/LeadForm";
import { btn } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/**
 * The "Ready to grow revenue?" slide-over, opened from CTAs across the page.
 *
 * Replaces the Bootstrap offcanvas (and with it the whole Bootstrap JS bundle).
 * Provides its own focus trap, Escape handling and scroll lock.
 */

interface LeadPanelApi {
  open: () => void;
  close: () => void;
}

const LeadPanelContext = createContext<LeadPanelApi | null>(null);

export function useLeadPanel(): LeadPanelApi {
  const ctx = useContext(LeadPanelContext);
  if (!ctx) throw new Error("useLeadPanel must be used inside <LeadPanelProvider>");
  return ctx;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function LeadPanelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    restoreFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Scroll lock without the layout shift a scrollbar disappearing causes.
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      );
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
    };
  }, [isOpen, close]);

  return (
    <LeadPanelContext.Provider value={{ open, close }}>
      {children}

      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[1040] bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-panel-title"
        aria-hidden={!isOpen}
        {...(!isOpen && { inert: false })}
        className={cn(
          "fixed top-0 right-0 z-[1045] flex h-dvh w-full max-w-[560px] flex-col",
          "border-l border-white/10 bg-ink-900 shadow-lg transition-transform duration-400 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 sm:p-8">
          <div>
            <h2 id="lead-panel-title" className="text-h4 text-white">
              READY TO GROW REVENUE?
            </h2>
            <p className="mt-1.5 text-sm text-white/60">
              Digital experiences that have driven growth since 1998.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close the enquiry form"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">{isOpen && <LeadForm />}</div>
      </div>
    </LeadPanelContext.Provider>
  );
}

/** CTA that opens the panel. Used everywhere the live site used a `#` link. */
export function LeadButton({
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  variant?: Parameters<typeof btn>[0];
  size?: Parameters<typeof btn>[1];
  className?: string;
}) {
  const { open } = useLeadPanel();
  return (
    <button type="button" onClick={open} className={btn(variant, size, className)}>
      {children}
    </button>
  );
}
