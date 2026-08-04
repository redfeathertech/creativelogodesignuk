import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { intro, meta } from "@/content/landing/logo-brief";
import BriefShell from "@/components/landing/brief/BriefShell";
import LogoBriefForm from "@/components/landing/brief/LogoBriefForm";

const PATH = "/logo-brief";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Logo Design Brief", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * Self-canonical, like every other rebuilt page — the live one points at the
 * homepage. This is also the first version of the page with a meta description:
 * the live `<head>` is a title, a viewport, three OG tags and that canonical.
 */
export const metadata: Metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: PATH,
    index: route.indexable,
});

export default function LogoBriefPage() {
    return (
        <>
            <JsonLd data={pageGraph(PATH, meta.title, meta.description, TRAIL)} />
            <BriefShell title={intro.title}>
                <LogoBriefForm />
            </BriefShell>
        </>
    );
}
