import Link from "next/link";
import type { Route } from "next";

import { cn } from "@/lib/cn";

export interface Crumb {
    name: string;
    path: string;
}

/**
 * Breadcrumb trail for inner pages.
 *
 * Takes the same `{ name, path }[]` shape as `breadcrumbNode()` in `lib/seo.ts`,
 * so a page declares its trail once and feeds both the visible nav and the
 * `BreadcrumbList` JSON-LD from it. Google wants the two to agree; the only way
 * to guarantee that is to build them from one array.
 *
 * The last crumb is the current page: it is plain text with `aria-current`,
 * never a link to where the visitor already is.
 */
export default function Breadcrumbs({ trail, className }: { trail: readonly Crumb[]; className?: string }) {
    return (
        <nav aria-label="Breadcrumb" className={cn("text-xs tracking-[0.08em] uppercase", className)}>
            {/* 55%, not the 45% the clduk breadcrumb uses: at 12px over ink-950 that
                measures 4.45:1, a hair under the 4.5:1 AA floor. */}
            <ol className="flex flex-wrap items-center gap-2 text-white/55">
                {trail.map((crumb, i) => {
                    const isCurrent = i === trail.length - 1;

                    return (
                        <li key={crumb.path} className="inline-flex items-center gap-2">
                            {isCurrent ? (
                                <span aria-current="page" className="text-magenta-300">
                                    {crumb.name}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        href={crumb.path as Route}
                                        className="transition-colors hover:text-white"
                                    >
                                        {crumb.name}
                                    </Link>
                                    <span aria-hidden="true" className="text-white/25">
                                        /
                                    </span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
