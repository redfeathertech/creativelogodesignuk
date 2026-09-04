import { recentWork } from "./home";

/**
 * The "Our Recent SEO Work" band on the eleven SEO inner service pages.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS IS NOT IN content/services/
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Two reasons, both about the parity gate.
 *
 * 1. `scripts/verify-content-parity.py` walks every `.ts` in
 *    `content/services/` and fails on any module it cannot match to a live
 *    baseline page. This band has no live counterpart — it is section chrome
 *    for the 2026-09 redesign, shared by all eleven pages — so it belongs
 *    beside `content/home.ts`, not among the checked service modules.
 *
 * 2. The obvious alternative was to widen `howItWorks.workHeading` in each
 *    service module. Those modules are shared with the other 25 service pages,
 *    where `workHeading` IS a checked, ported string ("Our recent work"), and
 *    two pages hold a named exemption for it in the gate. Rewording it here
 *    would have rewritten copy on pages this redesign never touched.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHERE THE CARDS COME FROM
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `recentWork.items` — the homepage portfolio rail. The approved mock captions
 * each card with a project name and a one-line description, and the six real
 * portfolio pieces already carry a name, a category and an internal link.
 * Inventing eleven pages' worth of client names to fill the same slots was the
 * alternative, and docs/CONTENT-PARITY.md rules that out.
 *
 * `blurbs` is the one new string per card. New UI chrome for a new band, on the
 * same footing as `recentWork.filters` — each one names the service the card
 * links to, so nothing here claims anything the linked page does not.
 */

/** Keyed by image path: the item's own field, and stable across reorders. */
const blurbs: Record<string, string> = {
    "/assets/img/work/app-development.webp": "iOS and Android builds",
    "/assets/img/work/blog-design.webp": "Corporate blog design",
    "/assets/img/work/branding-design.webp": "Brand identity systems",
    "/assets/img/work/seo-aeo.webp": "Search-ready web design",
    "/assets/img/work/social-media.webp": "Social media marketing",
    "/assets/img/work/ui-ux-design.webp": "UI and UX design",
};

const labelFor = (id: string) =>
    recentWork.filters.find((f) => f.id === id)?.label ?? "";

export const seoWork = {
    eyebrow: "Our SEO Portfolio",
    /* `title` is the rail's accessible name. `titleLead` + `titleAccent`
       concatenate to exactly it, so the heading and the label never drift. */
    title: "Our Recent SEO Work",
    titleLead: "Our Recent",
    titleAccent: "SEO Work",
    lead: "While you're weighing things up, your competitors are busy launching fresh websites, sharpening their brands, and snapping up your audience. Every day you wait is an opportunity they take. Don't just think, act now.",
    items: recentWork.items.map((item) => ({
        img: item.img,
        href: item.href,
        label: labelFor(item.category),
        title: `${item.lead} ${item.trail}`,
        blurb: blurbs[item.img] ?? "",
    })),
};
