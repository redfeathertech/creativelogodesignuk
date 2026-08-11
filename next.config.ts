import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import { join, sep } from "node:path";

/* The 2026-08 pillar restructure's old-URL -> new-URL table. Read with `fs`
   rather than imported: Next 16 swc-compiles this config to CJS and evaluates
   it under a virtual filename, so an import of a project TS module leans on
   the transpiler's require hook — a JSON read leans on nothing. `__dirname`
   is the directory the CLI resolved as the project; the `node_modules` guard
   strips the compiled-config location seen when the CLI is invoked from the
   wrong cwd, which otherwise fails with a misleading ENOENT here before its
   own "couldn't find app" error can say what is actually wrong.
   `content/routes.ts` imports the same JSON and validates every entry against
   the live route table at build time. */
const projectRoot = __dirname.includes(`${sep}node_modules${sep}`)
    ? __dirname.slice(0, __dirname.indexOf(`${sep}node_modules${sep}`))
    : __dirname;
const legacyServicePaths: Record<string, string> = JSON.parse(
    readFileSync(join(projectRoot, "content", "legacy-redirects.json"), "utf8"),
);

const nextConfig: NextConfig = {
    // Statically typed <Link href> across all 49 routes. Stable in v16.
    typedRoutes: true,
    poweredByHeader: false,
    images: {
        // AVIF first, WebP fallback. All imagery is local, so no remotePatterns.
        formats: ["image/avif", "image/webp"],
        // v16 requires every quality used anywhere to be declared here.
        qualities: [75, 90],
    },

    experimental: {
        // Inlines the CSS into <head>. The Next docs recommend this specifically
        // for atomic CSS like Tailwind: it removes a render-blocking request and
        // improves FCP/LCP for first-time visitors.
        inlineCss: true,
    },
    allowedDevOrigins: ["192.168.18.158"],

    /**
     * Every redirect here is a **301**, and every future one must be too.
     *
     * `permanent: true` would emit **308**, which is Next's default for a
     * permanent redirect and is what this table used before. 308 preserves the
     * request method where 301 allows a POST to become a GET; for the plain
     * GET page moves on this site the two are equivalent to Google, but 301 is
     * the status the SEO tooling, the client's reporting and decades of
     * migration guidance all expect to see. `statusCode` and `permanent` are
     * mutually exclusive — setting `statusCode` is the documented way to pin an
     * exact code (node_modules/next/dist/docs/.../redirects.md).
     */
    async redirects() {
        const permanent301 = (source: string, destination: string) => ({
            source,
            destination,
            statusCode: 301 as const,
        });

        return [
            // The 2026-08 pillar restructure: every pre-restructure service URL
            // 301s to its new nested home. The table lives in
            // content/legacy-redirects.json so the redirects, the build-time
            // guards in content/routes.ts and the legacy-slug resolution in
            // components can never disagree.
            ...Object.entries(legacyServicePaths).map(([source, destination]) =>
                permanent301(source, destination),
            ),
            // The SEO landing page's live URL. It was a standalone PHP folder, so
            // its address carries a file name; Next cannot serve a `.php` path
            // from a static route folder and there is no PHP left on the site.
            // `/seo-services/` needs no entry — `trailingSlash: false` already
            // redirects it to the clean path.
            permanent301("/seo-services/index.php", "/seo-services"),
            // The two brief forms' live URLs. Same reasoning as
            // `/seo-services/index.php` above: standalone PHP folders, so their
            // addresses carry a file name, and there is no PHP left on the site.
            permanent301("/website-brief/index.php", "/website-brief"),
            permanent301("/logo-brief/index.php", "/logo-brief"),
        ];
    },

    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                ],
            },
            {
                // Static, versioned media — safe to cache aggressively.
                source: "/assets/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
