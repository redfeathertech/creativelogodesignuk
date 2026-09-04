/**
 * The stat-tile chrome on the "By the numbers" band of the eleven SEO inner
 * service pages — the row label above the tiles, and the small trend line
 * under each one.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS IS NOT IN content/services/
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Same reasoning as `content/seo-work.ts`, which see. These strings have no
 * live counterpart: they are net-new chrome from the client's 2026-09 mock,
 * shared by all eleven pages. `scripts/verify-content-parity.py` walks every
 * module in `content/services/` and fails on anything it cannot match to a
 * baseline page, so chrome lives out here beside `content/home.ts` instead.
 *
 * The alternative — a `note` field on each of the four `advantages.stats`
 * entries in eleven service modules — would have put unported copy inside the
 * checked modules and multiplied it by forty-four.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ABOUT THE FIGURES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `notes` is POSITIONAL, not keyed to a stat: `ServiceAdvantages` carries no
 * field for it, and the eleven modules name their four stats differently, so
 * a line cannot be tied to a label without inventing per-page content. The
 * fourth tile takes the fourth line on every page.
 *
 * The client supplied these figures with the mock and reconfirmed them after
 * being told they are not derived from any of the eleven pages' own stats.
 * They are illustrative trend chrome. If any of them ever needs to be a real,
 * per-page measurement, it belongs on the stat in `content/services/*` — not
 * here.
 *
 * Each line splits in two because the mock colours it that way: `mark` in the
 * neon accent, `tail` in the muted body colour.
 */
export const seoNumbers = {
    /** Row label above the four tiles. */
    heading: "GBP Insights — This Month",

    notes: [
        { mark: "↑ +34%", tail: "vs last month" },
        { mark: "↑ +19%", tail: "vs last month" },
        { mark: "↑ +28%", tail: "vs last month" },
        { mark: "142", tail: "Reviews" },
    ],
} as const;
