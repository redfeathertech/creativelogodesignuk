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
 * The mega-menu and drawer links are always present in the DOM and merely
 * hidden with CSS, so every one of the 36 service URLs is crawlable from the
 * homepage. The live site hides the trigger behind `javascript:void(0)`, which
 * leaves the Services hub unlinked entirely.
 */
export default function Nav() {
    const [condensed, setCondensed] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const megaRef = useRef<HTMLLIElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();

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

    useEffect(
        () => () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
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
        const onKey = (e: KeyboardEvent) =>
            e.key === "Escape" && setMegaOpen(false);
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
       sits. Both still render on the server, so the 36 service links inside the
       drawer stay in the crawled HTML. */
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
                    className="mx-auto flex h-full max-w-[var(--container-wide)] items-center justify-between gap-6 px-gutter"
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
                                    "absolute top-full left-1/2 z-10 mt-3 w-[min(1100px,92vw)] -translate-x-1/2 rounded-xl border border-white/10 bg-ink-850/98 p-8 shadow-lg backdrop-blur-xl transition-all duration-200",
                                    megaOpen
                                        ? "visible translate-y-0 opacity-100"
                                        : "invisible -translate-y-2 opacity-0",
                                )}
                            >
                                <div className="grid grid-cols-4 gap-8">
                                    {serviceNav.map((group) => (
                                        <div key={group.label}>
                                            {group.href ? (
                                                <Link
                                                    href={group.href}
                                                    onClick={() =>
                                                        setMegaOpen(false)
                                                    }
                                                    className="mb-3 block font-display text-sm font-bold tracking-wide text-magenta-300 uppercase hover:text-magenta-200"
                                                >
                                                    {group.label}
                                                </Link>
                                            ) : (
                                                <span className="mb-3 block font-display text-sm font-bold tracking-wide text-magenta-300 uppercase">
                                                    {group.label}
                                                </span>
                                            )}
                                            <ul className="space-y-1.5">
                                                {group.items.map((item) => (
                                                    <li key={item.href}>
                                                        <Link
                                                            href={item.href}
                                                            onClick={() =>
                                                                setMegaOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className={cn(
                                                                "block text-[0.8125rem] leading-snug transition-colors hover:text-white",
                                                                isActive(
                                                                    item.href,
                                                                )
                                                                    ? "font-bold text-magenta-300"
                                                                    : "text-white/70",
                                                            )}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
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
                aria-hidden={!drawerOpen}
                {...(!drawerOpen && { inert: false })}
                // {...(!drawerOpen && { inert: "" as unknown as boolean })}
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
                            className="border-t border-white/10 py-1"
                        >
                            <summary className="cursor-pointer list-none px-3 py-2.5 font-display font-bold text-white marker:content-['']">
                                {group.label}
                            </summary>
                            <ul className="pb-2 pl-3">
                                {group.href && (
                                    <li>
                                        <Link
                                            href={group.href}
                                            onClick={() => setDrawerOpen(false)}
                                            className="block px-3 py-1.5 text-sm text-magenta-300"
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
                                                "block px-3 py-1.5 text-sm hover:text-white",
                                                isActive(item.href)
                                                    ? "text-magenta-300"
                                                    : "text-white/70",
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
