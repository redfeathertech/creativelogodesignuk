import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Statically typed <Link href> across 43 routes. Stable in v16.
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

    async redirects() {
        return [
            // Carried over from Laravel: this singular URL never had a page and 500'd
            // since launch. Kept as a 308 so any external link still resolves.
            {
                source: "/content-management-system",
                destination: "/content-management-systems",
                permanent: true,
            },
            // The SEO landing page's live URL. It was a standalone PHP folder, so
            // its address carries a file name; Next cannot serve a `.php` path
            // from a static route folder and there is no PHP left on the site.
            // `/seo-services/` needs no entry — `trailingSlash: false` already
            // 308s it to the clean path.
            {
                source: "/seo-services/index.php",
                destination: "/seo-services",
                permanent: true,
            },
            // The two brief forms' live URLs. Same reasoning as
            // `/seo-services/index.php` above: standalone PHP folders, so their
            // addresses carry a file name, and there is no PHP left on the site.
            {
                source: "/website-brief/index.php",
                destination: "/website-brief",
                permanent: true,
            },
            {
                source: "/logo-brief/index.php",
                destination: "/logo-brief",
                permanent: true,
            },
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
