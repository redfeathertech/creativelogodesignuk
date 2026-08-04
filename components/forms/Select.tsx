"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { FieldTone } from "./Field";

/**
 * Custom listbox replacing the native <select>.
 *
 * The OS draws a native option list with its own colours, so on the near-black
 * canvas it renders as a bright system menu that ignores every token in
 * `@theme`. This is the ARIA 1.2 combobox/listbox pattern instead: a button that
 * owns the popup, a listbox of options, and a hidden input carrying the value
 * into the server action.
 *
 * No library. select2 needs jQuery, which this build dropped on purpose, and
 * everything it offers beyond styling (search, tags, remote data) is dead weight
 * for a five-option field.
 *
 * The value is submitted by `<input type="hidden">`, which is exempt from
 * constraint validation — so `required` is enforced server-side by zod and the
 * message comes back through `state.errors`. A visually hidden *required*
 * <select> would have been the alternative and is a trap: Chrome refuses to
 * submit and logs "An invalid form control is not focusable" with no visible UI.
 */

const PLACEHOLDER = "Please choose…";

/**
 * `brief` is the third skin, for the two brief pages: white card, mist borders,
 * static labels rendered above by the caller. It rides on the same listbox
 * rather than a fourth hand-rolled dropdown — only the class tables differ.
 */
export type SelectSkin = FieldTone | "brief";

const TRIGGER: Record<SelectSkin, string> = {
    dark:
        "border-white/[0.11] bg-white/[0.04] text-white " +
        "hover:border-white/20 " +
        "aria-[invalid=true]:border-red-400/60",
    light:
        "border-seo-border bg-white text-seo-ink " +
        "hover:border-seo-body/50 " +
        "aria-[invalid=true]:border-red-500",
    brief:
        "border-mist-300 bg-white text-onlight " +
        "hover:border-mist-400 " +
        "aria-[invalid=true]:border-red-500",
};

/* Written out per tone — Tailwind v4 scans for literal class names. */
const TRIGGER_OPEN: Record<SelectSkin, string> = {
    dark: "border-magenta-400 bg-white/[0.07] shadow-[0_0_0_3px_rgb(204_6_127/0.22)]",
    light: "border-seo-pink bg-white shadow-[0_0_0_3px_rgb(209_0_143/0.16)]",
    brief: "border-magenta-500 bg-white ring-2 ring-magenta-500/30",
};

const PANEL: Record<SelectSkin, string> = {
    dark: "border-white/[0.14] bg-ink-850/95 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.75)]",
    light: "border-seo-border bg-white shadow-[0_24px_60px_-12px_rgb(17_17_17/0.18)]",
    brief: "border-mist-300 bg-white shadow-[0_24px_60px_-12px_rgb(17_17_17/0.18)]",
};

const OPTION_ACTIVE: Record<SelectSkin, string> = {
    dark: "bg-white/[0.08] text-white",
    light: "bg-seo-pink/[0.08] text-seo-ink",
    brief: "bg-magenta-500/[0.08] text-onlight",
};

const OPTION_IDLE: Record<SelectSkin, string> = {
    dark: "text-white/70",
    light: "text-seo-body",
    brief: "text-onlight-muted",
};

const OPTION_SELECTED: Record<SelectSkin, string> = {
    dark: "text-magenta-300",
    light: "text-seo-pink",
    brief: "text-magenta-600",
};

const VALUE_MUTED: Record<SelectSkin, string> = {
    dark: "text-white/35",
    light: "text-seo-body/70",
    brief: "text-mist-500",
};

const CHEVRON: Record<SelectSkin, string> = {
    dark: "text-magenta-300",
    light: "text-seo-pink",
    brief: "text-mist-500",
};

/** The floating variant's own label. The brief pages label from outside. */
const labelBase = (tone: FieldTone) =>
    "pointer-events-none absolute top-[1.05rem] left-[1.1rem] origin-top-left " +
    "-translate-y-[0.62rem] scale-[0.74] transition-colors duration-200 ease-out " +
    (tone === "light" ? "text-seo-pink" : "text-magenta-300");

const hintClass = (tone: FieldTone) =>
    tone === "light"
        ? "mt-[0.35rem] block text-xs text-red-600"
        : "mt-[0.35rem] block text-xs text-[#ff9a9a]";

export function SelectField({
    label,
    name,
    options,
    required,
    errors,
    className,
    tone = "dark",
    variant = "floating",
    placeholder = PLACEHOLDER,
    labelledBy,
    describedBy,
    triggerId,
}: {
    label: string;
    name: string;
    options: readonly string[];
    required?: boolean;
    errors?: string[];
    className?: string;
    tone?: SelectSkin;
    /**
     * `plain` drops the floating label and the error line: the brief pages own
     * both, and rendering a second copy of either would duplicate the words.
     */
    variant?: "floating" | "plain";
    /** Empty-state text. The brief pages pass the live form's own "Select…". */
    placeholder?: string;
    /** `plain` only — the id of the caller's <label>. */
    labelledBy?: string;
    /** `plain` only — the id of the caller's error message. */
    describedBy?: string;
    /** `plain` only — so the caller's <label for> resolves to the trigger. */
    triggerId?: string;
}) {
    const reactId = useId();
    const id = triggerId ?? reactId;
    const plain = variant === "plain";
    const listId = `${id}-list`;
    const errorId = `${id}-error`;
    const hasError = Boolean(errors?.length);

    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    /* Which option the keyboard is on. -1 while nothing is highlighted. */
    const [active, setActive] = useState(-1);
    /* The popup drops down unless there isn't room, then it flips above. */
    const [flip, setFlip] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    /* Type-ahead buffer, matching native <select> behaviour. */
    const typed = useRef({ query: "", at: 0 });

    const close = useCallback((refocus = true) => {
        setOpen(false);
        setActive(-1);
        if (refocus) triggerRef.current?.focus();
    }, []);

    const openList = useCallback(() => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            /* ~18rem panel + the 0.4rem offset. */
            setFlip(
                window.innerHeight - rect.bottom < 300 && rect.top > 300,
            );
        }
        setActive(value ? options.indexOf(value) : 0);
        setOpen(true);
    }, [options, value]);

    const choose = useCallback(
        (option: string) => {
            setValue(option);
            close();
        },
        [close],
    );

    /* Pointer or focus leaving the control dismisses it — no refocus, or the
       click that landed elsewhere would be yanked back. */
    useEffect(() => {
        if (!open) return;
        const onPointer = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) close(false);
        };
        const onFocus = (e: FocusEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) close(false);
        };
        /* The flip decision was measured at open time; a resize invalidates it. */
        const onResize = () => close(false);
        document.addEventListener("pointerdown", onPointer);
        document.addEventListener("focusin", onFocus);
        window.addEventListener("resize", onResize);
        return () => {
            document.removeEventListener("pointerdown", onPointer);
            document.removeEventListener("focusin", onFocus);
            window.removeEventListener("resize", onResize);
        };
    }, [open, close]);

    /* Keep the highlighted row in view when arrowing past the scroll edge. */
    useEffect(() => {
        if (!open || active < 0) return;
        listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
    }, [open, active]);

    const move = (delta: number) => {
        setActive((i) => {
            const next = i < 0 ? (delta > 0 ? 0 : options.length - 1) : i + delta;
            return Math.min(options.length - 1, Math.max(0, next));
        });
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
            case "ArrowUp":
                e.preventDefault();
                if (!open) openList();
                else move(e.key === "ArrowDown" ? 1 : -1);
                return;
            case "Home":
            case "End":
                if (!open) return;
                e.preventDefault();
                setActive(e.key === "Home" ? 0 : options.length - 1);
                return;
            case "Enter":
            case " ":
                e.preventDefault();
                if (!open) openList();
                else if (active >= 0) choose(options[active]);
                return;
            case "Escape":
                if (open) {
                    e.preventDefault();
                    close();
                }
                return;
            case "Tab":
                if (open) close(false);
                return;
        }

        if (e.key.length !== 1 || e.altKey || e.ctrlKey || e.metaKey) return;
        /* Keystrokes within a second extend the query; after that it restarts. */
        const now = e.timeStamp;
        typed.current.query =
            (now - typed.current.at < 1000 ? typed.current.query : "") +
            e.key.toLowerCase();
        typed.current.at = now;
        const hit = options.findIndex((o) =>
            o.toLowerCase().startsWith(typed.current.query),
        );
        if (hit < 0) return;
        e.preventDefault();
        if (open) setActive(hit);
        else choose(options[hit]);
    };

    return (
        <div ref={rootRef} className={cn("relative", className)}>
            <input type="hidden" name={name} value={value} />

            <button
                ref={triggerRef}
                id={id}
                type="button"
                role="combobox"
                aria-controls={listId}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-labelledby={
                    plain
                        ? labelledBy && `${labelledBy} ${id}`
                        : `${id}-label ${id}`
                }
                aria-required={required}
                aria-invalid={hasError || undefined}
                aria-describedby={
                    plain ? describedBy : hasError ? errorId : undefined
                }
                onClick={() => (open ? close() : openList())}
                onKeyDown={onKeyDown}
                className={cn(
                    "flex w-full min-w-0 items-center gap-2 border text-left focus:outline-none",
                    "transition-[border-color,background-color,box-shadow] duration-300 ease-out",
                    plain
                        ? "rounded-lg px-3.5 py-2.5 text-sm"
                        : "rounded-md px-[1.1rem] pt-[1.4rem] pb-[0.6rem] leading-[1.4]",
                    TRIGGER[tone],
                    open && TRIGGER_OPEN[tone],
                )}
            >
                {/* min-w-0 so a long option truncates instead of widening the grid cell. */}
                <span
                    className={cn(
                        "min-w-0 flex-1 truncate",
                        !value && VALUE_MUTED[tone],
                    )}
                >
                    {value || placeholder}
                </span>
                <svg
                    viewBox="0 0 12 8"
                    aria-hidden="true"
                    className={cn(
                        "h-2 w-3 shrink-0 transition-transform duration-300 ease-out",
                        open && "rotate-180",
                        CHEVRON[tone],
                    )}
                >
                    <path
                        d="M1 1.5 6 6.5l5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {!plain && (
                <span id={`${id}-label`} className={labelBase(tone as FieldTone)}>
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                </span>
            )}

            <ul
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label={plain ? label : undefined}
                aria-labelledby={plain ? undefined : `${id}-label`}
                tabIndex={-1}
                /* Kept mounted so the popup can animate both ways; `hidden`
                   would drop it from the a11y tree mid-transition. */
                className={cn(
                    "absolute z-30 max-h-72 w-full overflow-y-auto overscroll-contain rounded-md border p-1.5",
                    "backdrop-blur-md transition-[opacity,transform] duration-200 ease-out",
                    PANEL[tone],
                    flip ? "bottom-full mb-[0.4rem]" : "top-full mt-[0.4rem]",
                    open
                        ? "visible translate-y-0 opacity-100"
                        : cn(
                              "invisible opacity-0",
                              flip ? "translate-y-1" : "-translate-y-1",
                          ),
                )}
            >
                {options.map((option, i) => {
                    const selected = option === value;
                    return (
                        <li
                            key={option}
                            role="option"
                            aria-selected={selected}
                            onClick={() => choose(option)}
                            onPointerMove={() => setActive(i)}
                            className={cn(
                                "flex cursor-pointer items-center gap-2 rounded-[6px] px-3 py-2 text-sm",
                                "transition-colors duration-150",
                                i === active
                                    ? OPTION_ACTIVE[tone]
                                    : OPTION_IDLE[tone],
                                selected &&
                                    cn("font-medium", OPTION_SELECTED[tone]),
                            )}
                        >
                            <span className="min-w-0 flex-1 truncate">
                                {option}
                            </span>
                            {selected && (
                                <svg
                                    viewBox="0 0 12 12"
                                    aria-hidden="true"
                                    className="h-3 w-3 shrink-0"
                                >
                                    <path
                                        d="M1.5 6.5 4.5 9.5 10.5 2.5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </li>
                    );
                })}
            </ul>

            {hasError && !plain && (
                <span id={errorId} className={hintClass(tone as FieldTone)}>
                    {errors![0]}
                </span>
            )}
        </div>
    );
}
