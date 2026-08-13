"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { allServiceLinks, primaryNav, serviceNav } from "@/content/nav";
import { LeadButton } from "./LeadPanel";
import { ChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Primary navigation: sticky bar, services mega-menu, mobile drawer.
 *
 * The mega-menu is a two-pane rail: the 8 service pillars down the left
 * (mirroring the 2026-08 SEO plan's pillar/sub-service tree), the hovered
 * pillar's sub-services on the right. ALL eight panels are in the DOM on
 * every render — the inactive ones are `hidden` — so every service URL stays
 * crawlable from every page, exactly the property the old 4-column grid had.
 * The live Laravel site hides the trigger behind `javascript:void(0)`, which
 * leaves the Services hub unlinked entirely; this is the opposite.
 */
export default function Nav() {
    const [condensed, setCondensed] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [activeGroup, setActiveGroup] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const megaRef = useRef<HTMLLIElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const railRefs = useRef<(HTMLElement | null)[]>([]);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();

    const panelId = (i: number) => `services-panel-${i}`;

    // Hover intent: open immediately, but delay closing so moving the pointer
    // across the gap onto the panel (a positioned child) doesn't dismiss it.
    const openMega = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setMegaOpen(true);
    };
    const closeMegaSoon = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
    };

    const cancelSwitch = () => {
        if (switchTimer.current) clearTimeout(switchTimer.current);
    };
    /** Immediate — for focus, click and arrow keys, where any delay reads as lag. */
    const selectGroup = (i: number) => {
        cancelSwitch();
        setActiveGroup(i);
    };
    /**
     * Delayed — for the pointer only. Travelling diagonally from a rail row to a
     * link in its own panel crosses the rows below it; switching instantly would
     * swap the panel out from under the pointer mid-journey.
     */
    const switchGroupSoon = (i: number) => {
        cancelSwitch();
        switchTimer.current = setTimeout(() => setActiveGroup(i), 110);
    };

    const onRailKeyDown = (e: React.KeyboardEvent) => {
        const last = serviceNav.length - 1;
        let next: number | null = null;
        if (e.key === "ArrowDown")
            next = activeGroup === last ? 0 : activeGroup + 1;
        else if (e.key === "ArrowUp")
            next = activeGroup === 0 ? last : activeGroup - 1;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = last;
        if (next === null) return;
        e.preventDefault();
        selectGroup(next);
        railRefs.current[next]?.focus();
    };

    // A link is active on its own page; sub-paths of a section also count so a
    // service detail URL keeps its parent lit.
    const isActive = (href: string) =>
        href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);

    // Any service route being active lights up the "Services" trigger — mirrors
    // `$cldServicesActive` in the Laravel header.
    const servicesActive =
        allServiceLinks.some((l) => isActive(l.href)) ||
        serviceNav.some((g) => g.href && isActive(g.href));

    // A pillar counts as active when its own page is open OR any of its
    // sub-services is — a child page always lights its parent.
    const groupActive = (g: (typeof serviceNav)[number]) =>
        (!!g.href && isActive(g.href)) || g.items.some((i) => isActive(i.href));

    // Open the mega-menu on the pillar that owns the current page.
    useEffect(() => {
        const i = serviceNav.findIndex(groupActive);
        if (i >= 0) setActiveGroup(i);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Bullet marker for sub-service links, drawn as a pseudo-element so the
    // link stays a single block and wrapped text aligns past the dot.
    const bulletClass =
        "relative before:absolute before:left-3 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-current";

    useEffect(
        () => () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            if (switchTimer.current) clearTimeout(switchTimer.current);
        },
        [],
    );

    useEffect(() => {
        const onScroll = () => setCondensed(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close the mega-menu on outside click or Escape.
    useEffect(() => {
        if (!megaOpen) return;
        const onDown = (e: MouseEvent) => {
            if (megaRef.current && !megaRef.current.contains(e.target as Node))
                setMegaOpen(false);
        };
        // Escape hands focus back to the trigger. Without it the panel goes
        // `invisible` under whatever was focused inside it and the browser drops
        // focus to <body>, losing the keyboard user's place in the page.
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setMegaOpen(false);
            triggerRef.current?.focus();
        };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [megaOpen]);

    useEffect(() => {
        if (!drawerOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) =>
            e.key === "Escape" && setDrawerOpen(false);
        document.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            document.removeEventListener("keydown", onKey);
        };
    }, [drawerOpen]);

    const linkClass =
        "relative rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white";

    // Active state: white text + a 2px gradient underline inset from the sides,
    // matching `.cld-nav__link.is-active::after` on the live site.
    const activeClass =
        "text-white after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[linear-gradient(97deg,var(--color-magenta-500)_0%,var(--color-violet-500)_100%)]";

    return (
        /* The drawer and its overlay are siblings of <header>, NOT children of it.
       The header carries `backdrop-blur-lg`, and a backdrop-filter ancestor
       becomes the containing block for any `position: fixed` descendant — which
       demotes the drawer to behaving like `absolute`, so its off-canvas
       `translate-x-full` copy counted as real page overflow and let every route
       below `xl:` be swiped sideways by the full width of the drawer. Keeping
       them out here puts them under <body>, exactly where LeadPanel already
       sits. Both still render on the server, so every service link inside the
       drawer stays in the crawled HTML. */
        <>
            <header
                className={cn(
                    "sticky top-0 z-[1030] border-b border-white/[0.08] backdrop-blur-lg transition-[height,background-color] duration-300",
                    // Height comes from the token rather than from padding: the hero is
                    // sized as `100svh - --header-h`, so any drift here reappears as
                    // overflow below the fold.
                    condensed
                        ? "h-[var(--nav-h-condensed)] bg-ink-950/90"
                        : "h-[var(--nav-h)] bg-ink-950/70",
                )}
            >
                <nav
                    aria-label="Primary"
                    className="mx-auto flex h-full max-w-[var(--container-site)] items-center justify-between gap-6 px-gutter"
                >
                    <Link
                        href="/"
                        aria-label="Creative Logo Design — home"
                        className="shrink-0"
                    >
                        <Image
                            src="/assets/img/logo.webp"
                            alt="Creative Logo Design"
                            width={220}
                            height={56}
                            // The logo is above the fold on every page; it is the one asset
                            // worth preloading. (`priority` is deprecated in Next 16.)
                            preload
                            className={cn(
                                "w-auto transition-all duration-300",
                                condensed ? "h-9" : "h-11",
                            )}
                        />
                    </Link>

                    {/* ---- desktop ---- */}
                    <ul className="hidden items-center gap-1 xl:flex">
                        {primaryNav.slice(0, 2).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        linkClass,
                                        isActive(item.href) && activeClass,
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        <li
                            ref={megaRef}
                            className="relative"
                            onMouseEnter={openMega}
                            onMouseLeave={closeMegaSoon}
                        >
                            <button
                                ref={triggerRef}
                                type="button"
                                aria-expanded={megaOpen}
                                aria-controls="services-mega"
                                onClick={() => setMegaOpen((v) => !v)}
                                className={cn(
                                    linkClass,
                                    "inline-flex items-center gap-1.5",
                                    servicesActive && activeClass,
                                )}
                            >
                                Services
                                <ChevronDown
                                    className={cn(
                                        "transition-transform",
                                        megaOpen && "rotate-180",
                                    )}
                                />
                            </button>

                            <div
                                id="services-mega"
                                className={cn(
                                    "absolute top-full left-1/2 z-10 mt-3 w-[min(960px,92vw)] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-ink-850/98 shadow-lg backdrop-blur-xl transition-all duration-200",
                                    megaOpen
                                        ? "visible translate-y-0 opacity-100"
                                        : "invisible -translate-y-2 opacity-0",
                                )}
                            >
                                <div className="grid grid-cols-[290px_1fr]">
                                    {/* ---- pillar rail ----
                                        Roving tabindex: only the active row is in
                                        the tab sequence, and Up/Down/Home/End move
                                        between pillars. Without it, every rail row
                                        was a tab stop that re-pointed `activeGroup`
                                        on focus, so tabbing forward always ended on
                                        the last pillar and the other seven panels —
                                        30 of the 31 sub-service links — were
                                        unreachable by keyboard entirely. */}
                                    <ul
                                        className="border-r border-white/10 bg-ink-950/40 py-3"
                                        onKeyDown={onRailKeyDown}
                                    >
                                        <li
                                            className="sr-only"
                                            id="services-rail-hint"
                                        >
                                            Use the up and down arrow keys to
                                            browse service categories.
                                        </li>
                                        {serviceNav.map((group, i) => {
                                            const rowClass = cn(
                                                "relative flex w-full items-center justify-between gap-3 px-6 py-2.5 text-left text-sm font-semibold transition-colors",
                                                i === activeGroup
                                                    ? "bg-white/5 text-white before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-[linear-gradient(180deg,var(--color-magenta-500),var(--color-violet-500))]"
                                                    : "text-white/65 hover:text-white",
                                                groupActive(group) &&
                                                    "text-magenta-300",
                                            );
                                            const chevron = (
                                                <ChevronDown
                                                    className={cn(
                                                        "-rotate-90",
                                                        i === activeGroup
                                                            ? "text-magenta-300"
                                                            : "text-white/30",
                                                    )}
                                                />
                                            );
                                            /* Shared by both row kinds. `aria-controls`
                                               names the panel each row reveals; the
                                               active row carries the arrow-key hint so
                                               it is announced once on entry rather than
                                               eight times. */
                                            const rowProps = {
                                                ref: (
                                                    el: HTMLElement | null,
                                                ) => {
                                                    railRefs.current[i] = el;
                                                },
                                                tabIndex:
                                                    i === activeGroup ? 0 : -1,
                                                "aria-controls": panelId(i),
                                                "aria-describedby":
                                                    i === activeGroup
                                                        ? "services-rail-hint"
                                                        : undefined,
                                                onMouseEnter: () =>
                                                    switchGroupSoon(i),
                                                onFocus: () => selectGroup(i),
                                                className: rowClass,
                                            };
                                            return (
                                                <li key={group.label}>
                                                    {group.href ? (
                                                        <Link
                                                            {...rowProps}
                                                            href={group.href}
                                                            onClick={() =>
                                                                setMegaOpen(
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            {group.label}
                                                            {chevron}
                                                        </Link>
                                                    ) : (
                                                        /* No pillar page yet — the row only steers
                                                           the panel, it does not navigate, so it is
                                                           a disclosure control and says so. */
                                                        <button
                                                            {...rowProps}
                                                            type="button"
                                                            aria-expanded={
                                                                i ===
                                                                activeGroup
                                                            }
                                                            onClick={() =>
                                                                selectGroup(i)
                                                            }
                                                        >
                                                            {group.label}
                                                            {chevron}
                                                        </button>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {/* ---- sub-service panels ----
                                        All 8 render on the server; `hidden` keeps
                                        the inactive ones out of view and out of
                                        the tab order while their links stay in
                                        the crawled HTML. */}
                                    <div
                                        className="p-7"
                                        onMouseEnter={cancelSwitch}
                                    >
                                        {serviceNav.map((group, i) => (
                                            <div
                                                key={group.label}
                                                id={panelId(i)}
                                                role="group"
                                                aria-label={group.label}
                                                hidden={i !== activeGroup}
                                            >
                                                {group.href ? (
                                                    <Link
                                                        href={group.href}
                                                        onClick={() =>
                                                            setMegaOpen(false)
                                                        }
                                                        className="mb-4 inline-block font-display text-sm font-bold tracking-wide text-magenta-300 uppercase hover:text-magenta-200"
                                                    >
                                                        {group.label}
                                                    </Link>
                                                ) : (
                                                    <span className="mb-4 inline-block font-display text-sm font-bold tracking-wide text-magenta-300 uppercase">
                                                        {group.label}
                                                    </span>
                                                )}

                                                {group.items.length > 0 ? (
                                                    <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                                                        {group.items.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.href
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        onClick={() =>
                                                                            setMegaOpen(
                                                                                false,
                                                                            )
                                                                        }
                                                                        className={cn(
                                                                            "block rounded-md py-2 pr-3 pl-7 text-[0.8125rem] leading-snug transition-colors hover:bg-white/5 hover:text-white",
                                                                            bulletClass,
                                                                            "before:top-[1.05rem]",
                                                                            isActive(
                                                                                item.href,
                                                                            )
                                                                                ? "font-bold text-magenta-300"
                                                                                : "text-white/70 before:opacity-45",
                                                                        )}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                ) : (
                                                    group.href && (
                                                        <Link
                                                            href={group.href}
                                                            onClick={() =>
                                                                setMegaOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className="block rounded-md px-3 py-2 text-[0.8125rem] leading-snug text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                                                        >
                                                            Explore{" "}
                                                            {group.label} →
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>

                        {primaryNav.slice(2).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        linkClass,
                                        isActive(item.href) && activeClass,
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden xl:block">
                        <LeadButton variant="primary">
                            Get a Proposal
                        </LeadButton>
                    </div>

                    {/* ---- mobile trigger ---- */}
                    <button
                        type="button"
                        onClick={() => setDrawerOpen(true)}
                        aria-expanded={drawerOpen}
                        aria-controls="mobile-drawer"
                        className="grid size-11 place-items-center rounded-full border border-white/15 text-white xl:hidden"
                    >
                        <span className="sr-only">Open menu</span>
                        <svg
                            width="20"
                            height="14"
                            viewBox="0 0 20 14"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M0 1h20M0 7h20M0 13h20"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </nav>
            </header>

            {/* ---- mobile drawer ---- */}
            <div
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
                className={cn(
                    "fixed inset-0 z-[1040] bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
                    drawerOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0",
                )}
            />
            <div
                id="mobile-drawer"
                aria-label="Menu"
                /* `inert` when closed, and it must be the real thing: the drawer
                   is parked off-canvas with `translate-x-full`, which removes it
                   from view but NOT from the tab order. The previous
                   `{...(!drawerOpen && { inert: false })}` was a no-op in both
                   states — React omits a false boolean attribute — so on every
                   sub-xl viewport Tab walked ~55 off-screen links that were also
                   `aria-hidden`: focusable but invisible to assistive tech.
                   `inert` covers both, so `aria-hidden` is no longer needed. */
                inert={!drawerOpen}
                className={cn(
                    /* `overflow-y-auto` sits on the inner column rather than here, matching
             LeadPanel: the scroll then starts below the fixed edge instead of on
             it, and the padding scrolls with the content. */
                    "fixed top-0 right-0 z-[1045] flex h-dvh w-full max-w-[400px] flex-col border-l border-white/10 bg-ink-900 transition-transform duration-300 ease-out xl:hidden",
                    drawerOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <Image
                            src="/assets/img/logo.webp"
                            alt="Creative Logo Design"
                            width={160}
                            height={40}
                            className="h-9 w-auto"
                        />
                        <button
                            type="button"
                            onClick={() => setDrawerOpen(false)}
                            aria-label="Close menu"
                            className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 2l12 12M14 2L2 14"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <ul className="mb-4 space-y-1">
                        {primaryNav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setDrawerOpen(false)}
                                    className={cn(
                                        "block rounded-md px-3 py-2.5 font-display font-bold hover:bg-white/5",
                                        isActive(item.href)
                                            ? "text-magenta-300"
                                            : "text-white",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {serviceNav.map((group) => (
                        <details
                            key={group.label}
                            open={groupActive(group)}
                            className="border-t border-white/10 py-1"
                        >
                            <summary
                                className={cn(
                                    "cursor-pointer list-none px-3 py-2.5 font-display font-bold marker:content-['']",
                                    groupActive(group)
                                        ? "text-magenta-300"
                                        : "text-white",
                                )}
                            >
                                {group.label}
                            </summary>
                            <ul className="pb-2 pl-3">
                                {group.href && (
                                    <li>
                                        <Link
                                            href={group.href}
                                            onClick={() => setDrawerOpen(false)}
                                            className={cn(
                                                "block py-1.5 pr-3 pl-7 text-sm text-magenta-300",
                                                isActive(group.href) &&
                                                    "font-bold",
                                            )}
                                        >
                                            All {group.label}
                                        </Link>
                                    </li>
                                )}
                                {group.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setDrawerOpen(false)}
                                            className={cn(
                                                "block py-1.5 pr-3 pl-7 text-sm hover:text-white",
                                                bulletClass,
                                                "before:top-4",
                                                isActive(item.href)
                                                    ? "font-bold text-magenta-300"
                                                    : "text-white/70 before:opacity-45",
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}

                    <div className="mt-6" onClick={() => setDrawerOpen(false)}>
                        <LeadButton
                            variant="primary"
                            size="lg"
                            className="w-full"
                        >
                            Get a Proposal
                        </LeadButton>
                    </div>
                </div>
            </div>
        </>
    );
}
