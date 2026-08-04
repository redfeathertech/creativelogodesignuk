import type { Metadata } from "next";

import HomeV2, { HOME_TITLE } from "@/components/home2/HomeV2";

/**
 * Preview route for the homepage redesign.
 *
 * NOT in content/routes.ts, so it never reaches sitemap.ts — and noindex on
 * top of that, because a live duplicate of the homepage's copy at a second URL
 * is exactly the kind of thing that costs rankings.
 *
 * This whole directory is deleted when the redesign is promoted.
 */
export const metadata: Metadata = {
    title: { absolute: `${HOME_TITLE} — v2 preview` },
    robots: { index: false, follow: false },
};

export default function HomeV2Preview() {
    return <HomeV2 />;
}
