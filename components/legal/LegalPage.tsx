import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";

import JsonLd from "@/components/JsonLd";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { getLegalDoc } from "@/content/legal";
import type { Inline, InlineRun, LegalNode } from "@/content/legal";

/**
 * Renders one of the four `legal` group routes.
 *
 * The documents are long — Terms of Use is 147 blocks — so the body is a single
 * measured column with an anchored contents list beside it on wide screens.
 * Everything is server-rendered: these pages are static and have no
 * interactivity beyond in-page anchors.
 *
 * Inline runs are React nodes, never `dangerouslySetInnerHTML`. See
 * `content/legal/types.ts` for why the source markup is modelled as data.
 */

/** Stable, readable anchor ids: "7. Chargebacks" -> "chargebacks". */
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/^[\d.]+\s*/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function plain(text: Inline): string {
    if (typeof text === "string") return text;
    return text
        .map((run) => (typeof run === "string" ? run : "b" in run ? run.b : run.a))
        .join("");
}

function Runs({ text }: { text: Inline }) {
    if (typeof text === "string") return <>{text}</>;

    return (
        <>
            {text.map((run: InlineRun, i) => {
                if (typeof run === "string") return <span key={i}>{run}</span>;
                if ("b" in run) return <strong key={i} className="font-semibold text-white">{run.b}</strong>;

                /* Internal hrefs stay typed routes; mail/tel/external pass through. */
                const external = /^(https?:|mailto:|tel:)/.test(run.href);
                const className =
                    "font-medium text-magenta-300 underline underline-offset-4 decoration-magenta-300/40 transition-colors hover:text-white hover:decoration-white/60";

                return external ? (
                    <a
                        key={i}
                        href={run.href}
                        className={className}
                        {...(run.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                    >
                        {run.a}
                    </a>
                ) : (
                    <Link key={i} href={run.href as Route} className={className}>
                        {run.a}
                    </Link>
                );
            })}
        </>
    );
}

function Node({ node }: { node: LegalNode }) {
    switch (node.type) {
        case "h2":
            return (
                <h2
                    id={slugify(plain(node.text))}
                    className="scroll-mt-28 pt-10 text-h3 text-white first:pt-0"
                >
                    <Runs text={node.text} />
                </h2>
            );

        case "h3":
            return (
                <h3
                    id={slugify(plain(node.text))}
                    className="scroll-mt-28 pt-6 font-display text-lg font-bold text-white"
                >
                    <Runs text={node.text} />
                </h3>
            );

        case "p":
            return (
                <p className="text-white/70">
                    <Runs text={node.text} />
                </p>
            );

        case "ul":
            return (
                <ul className="ml-1 space-y-2">
                    {node.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-white/70">
                            <span
                                aria-hidden="true"
                                className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-magenta-400"
                            />
                            <span>
                                <Runs text={item} />
                            </span>
                        </li>
                    ))}
                </ul>
            );

        case "table":
            return (
                /* Wide content scrolls in its own box — the page body must never
                   scroll sideways at 320px. */
                <div className="-mx-1 overflow-x-auto rounded-2xl shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
                    <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                        <thead>
                            <tr>
                                {node.head.map((cell, i) => (
                                    <th
                                        key={i}
                                        scope="col"
                                        className="border-b border-white/12 px-5 py-4 font-display text-xs font-bold tracking-[0.1em] text-white uppercase"
                                    >
                                        <Runs text={cell} />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {node.rows.map((row, r) => (
                                <tr key={r} className="border-b border-white/8 last:border-0">
                                    {row.map((cell, c) => (
                                        <td key={c} className="px-5 py-4 align-top text-white/70">
                                            <Runs text={cell} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
    }
}

function resolve(path: string) {
    const route = routeByPath.get(path);
    if (!route) throw new Error(`Unknown route "${path}" — add it to content/routes.ts`);

    const doc = getLegalDoc(path);
    if (!doc) throw new Error(`No legal document for "${path}" — add it to content/legal/index.ts`);

    return { route, doc };
}

/** Page metadata, so a route file stays four lines like every other one. */
export function legalMetadata(path: string): Metadata {
    const { route, doc } = resolve(path);

    return buildMetadata({
        title: doc.metaTitle,
        description: doc.metaDescription,
        path,
        /* content/routes.ts owns the indexing switch — the same flag that
           decides whether this URL is in the sitemap. */
        index: route.indexable,
    });
}

export default function LegalPage({ path }: { path: string }) {
    const { doc } = resolve(path);

    /*
     * The crumb reads `doc.title` — the H1 — not `doc.metaTitle`. Two of these
     * pages have a live <title> that disagrees with their own live H1
     * ("Cookies" vs "Cookie Policy"), and `metaTitle` holds the former so the
     * head stays faithful. On the page itself the heading is the right label.
     * Same split as the service pages; see content/routes.ts.
     */
    const trail: Crumb[] = [
        { name: "Home", path: "/" },
        { name: doc.title, path },
    ];

    const contents = doc.nodes
        .filter((n): n is Extract<LegalNode, { type: "h2" }> => n.type === "h2")
        .map((n) => ({ id: slugify(plain(n.text)), label: plain(n.text) }));

    return (
        <>
            <JsonLd
                data={pageGraph(path, doc.metaTitle, doc.metaDescription, trail)}
            />

            <Section tone="darker" className="pb-12">
                <div className="container-site">
                    <Breadcrumbs trail={trail} className="mb-6" />
                    <h1 className="text-h1 text-white">{doc.title}</h1>
                    <p className="mt-5 text-sm text-white/55">
                        Last updated{" "}
                        <span className="font-medium text-white/80">{doc.lastUpdated}</span>
                    </p>
                </div>
            </Section>

            <Section tone="dark" className="pt-0" ariaLabel={doc.title}>
                <div className="container-site">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
                        {/* `min-w-0` and `break-words`.

                            At `lg` the `minmax(0,1fr)` track already floors the
                            column at zero, but below `lg` this is a single
                            implicit `auto` track, so it is sized by the item's
                            min-content — and a grid item defaults to
                            `min-width: auto`, which refuses to shrink past it.
                            `support@creativelogodesign.co.uk` is 32 unbreakable
                            characters, so /cookies-policy rendered a 504px
                            column inside a 320px viewport and overflowed by
                            208px across five widths. `break-words` lets the
                            addresses wrap rather than merely be allowed to. */}
                        <div className="max-w-[68ch] min-w-0 space-y-4 text-base leading-relaxed break-words">
                            {doc.nodes.map((node, i) => (
                                <Node key={i} node={node} />
                            ))}
                        </div>

                        {/* Desktop only. Terms of Use has 30 sections, and putting 30
                            links above the document is a worse phone experience than
                            scrolling it — a collapsed <details> would be the middle
                            ground, but forcing it open again at lg is no longer
                            reliable now that Chrome hides ::details-content with
                            content-visibility. */}
                        {contents.length > 2 && (
                            <nav
                                aria-label="On this page"
                                className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
                            >
                                <h2 className="mb-4 font-display text-xs font-bold tracking-[0.14em] text-magenta-300 uppercase">
                                    On this page
                                </h2>
                                <ol className="space-y-2 border-l border-white/12 text-sm">
                                    {contents.map((c) => (
                                        <li key={c.id}>
                                            <a
                                                href={`#${c.id}`}
                                                className="-ml-px block border-l border-transparent py-1 pl-4 text-white/55 transition-colors hover:border-magenta-400 hover:text-white"
                                            >
                                                {c.label}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        )}
                    </div>
                </div>
            </Section>
        </>
    );
}
