import type { ServiceContentOverrides } from "./types";
import { appDevelopmentOverrides } from "./app-development";

/**
 * PLACEHOLDER CONTENT — the six App Development sub-service pages added for the
 * SEO plan's URL tree (`/app-development-services/android`,
 * `/app-development-services/ios`, …).
 *
 * None of these pages exists on the live Laravel site, so there is nothing to
 * port and nothing for `scripts/verify-content-parity.py` to check against.
 * Every section below is cloned from `./app-development` — the pillar page they
 * nest under — with only the page-identifying strings (title, meta description,
 * hero eyebrow/breadcrumb/heading/lead, marquee, whyChoose heading) swapped so
 * each page names itself. Images are the shared service art, same as every
 * other service page.
 *
 * This is the same arrangement as `./seo-placeholders`, and it graduates the
 * same way: when the SEO team's real copy and images land, each page gets its
 * own module in this directory and drops out of `PLACEHOLDER_MODULES` in the
 * parity script.
 *
 * Because `mergeContent` in ./index replaces whole sections rather than merging
 * them element-by-element, each section here is spread complete from
 * `appDevelopmentOverrides` — never partially.
 */

interface Placeholder {
    /** `<title>`, and `meta.title`. Must equal the route title in ../routes. */
    title: string;
    /** Hero eyebrow + breadcrumb label. */
    label: string;
    description: string;
    heading: string;
    headingAccent: string;
    lead: string;
}

function placeholderContent(p: Placeholder): ServiceContentOverrides {
    return {
        ...appDevelopmentOverrides,
        meta: { title: p.title, description: p.description },
        hero: {
            ...appDevelopmentOverrides.hero,
            eyebrow: p.label,
            breadcrumb: p.label,
            heading: p.heading,
            headingAccent: p.headingAccent,
            lead: p.lead,
            mediaAlt: `${p.title} services from Creative Logo Design`,
        },
        marquee: { text: p.label },
        whyChoose: {
            ...appDevelopmentOverrides.whyChoose,
            heading: "Why Choose Creative Logo Design for",
            headingAccent: `${p.title}?`,
        },
        cta: { ...appDevelopmentOverrides.cta },
    };
}

export const androidAppDevelopmentOverrides = placeholderContent({
    title: "Android App Development",
    label: "Android App Development",
    description:
        "Android app development from Creative Logo Design — native Kotlin apps built for the full spread of Android devices, tuned for Play Store approval and real-world performance.",
    heading: "Android apps built for every device",
    headingAccent: "your customers actually own",
    lead: "Native Kotlin development, Material Design interfaces and testing across the screen sizes, OS versions and hardware your audience really uses — not just the newest flagship.",
});

export const iosAppDevelopmentOverrides = placeholderContent({
    title: "iOS App Development",
    label: "iOS App Development",
    description:
        "iOS app development from Creative Logo Design — native Swift apps for iPhone and iPad, built to Apple's guidelines and shipped through App Store review without the guesswork.",
    heading: "iPhone and iPad apps that feel",
    headingAccent: "like they belong on the device",
    lead: "Native Swift and SwiftUI development, Human Interface Guidelines done properly, and an App Store submission handled by people who have been through review hundreds of times.",
});

export const crossPlatformAppDevelopmentOverrides = placeholderContent({
    title: "Cross-Platform App Development",
    label: "Cross-Platform App Development",
    description:
        "Cross-platform app development from Creative Logo Design — one codebase, iOS and Android, with the native feel and performance your users expect on both.",
    heading: "One build, both app stores,",
    headingAccent: "half the maintenance",
    lead: "A single shared codebase that ships to iOS and Android together — faster to launch, cheaper to maintain, and still native where it counts for speed and feel.",
});

export const flutterAppDevelopmentOverrides = placeholderContent({
    title: "Flutter App Development",
    label: "Flutter App Development",
    description:
        "Flutter app development from Creative Logo Design — fast, beautiful apps from a single Dart codebase, running natively on iOS, Android, web and desktop.",
    heading: "Pixel-perfect on every platform",
    headingAccent: "from one codebase",
    lead: "Flutter and Dart development with custom widgets, 60fps animation and a UI that looks exactly as designed on iOS, Android, web and desktop alike.",
});

export const reactNativeAppDevelopmentOverrides = placeholderContent({
    title: "React Native App Development",
    label: "React Native App Development",
    description:
        "React Native app development from Creative Logo Design — native iOS and Android apps from one React codebase, with over-the-air updates and fast iteration.",
    heading: "Ship to both stores",
    headingAccent: "at the speed of the web",
    lead: "React Native development with native modules where you need them, over-the-air updates where you want them, and a codebase your existing React team can read.",
});

export const appMaintenanceOverrides = placeholderContent({
    title: "App Maintenance & Support",
    label: "App Maintenance & Support",
    description:
        "Mobile app maintenance and support from Creative Logo Design — OS updates, bug fixes, monitoring and new features that keep your app live, fast and in the stores.",
    heading: "Launch day is the start,",
    headingAccent: "not the finish line",
    lead: "OS and SDK updates, crash monitoring, security patches, store compliance and steady feature work — the ongoing care that stops a working app quietly going stale.",
});
