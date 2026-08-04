import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import { buildMetadata, pageGraph } from "@/lib/seo";
import { routeByPath } from "@/content/routes";
import { intro, meta } from "@/content/landing/website-brief";
import BriefShell from "@/components/landing/brief/BriefShell";
import WebsiteBriefForm from "@/components/landing/brief/WebsiteBriefForm";

const PATH = "/website-brief";

const TRAIL = [
    { name: "Home", path: "/" },
    { name: "Website Design Brief", path: PATH },
] as const;

const route = routeByPath.get(PATH);
if (!route) throw new Error(`Unknown route "${PATH}" — add it to content/routes.ts`);

/**
 * The live page canonicals to the **homepage**. That is the same bug the other
 * four landing pages shipped and the client confirmed on 1 Aug 2026 is not to
 * be carried over — see docs/SEO-PLAYBOOK.md. Self-canonical here.
 *
 * The description is the live `<meta name="description">` verbatim.
 */
export const metadata: Metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: PATH,
    index: route.indexable,
});

export default function WebsiteBriefPage() {
    return (
        <>
            <JsonLd data={pageGraph(PATH, meta.title, meta.description, TRAIL)} />
            <BriefShell title={intro.title} description={intro.description}>
                <WebsiteBriefForm />
            </BriefShell>
        </>
    );
}
