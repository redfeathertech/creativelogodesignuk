/**
 * Client logos — shared by the homepage marquee and the About Us logo wall.
 *
 * Lives outside `content/home.ts` because two pages render the same list, and a
 * client that appears on one and not the other reads as an error.
 *
 * The artwork is dark-on-transparent WebP. That is what lets the About page
 * knock each mark out to white on the dark canvas (`brightness-0 invert`) and
 * lift the filter on hover — and it is why the clduk redesign's own logo grid
 * could not: the set it used is opaque, full-colour artwork on a cream
 * background, so every cell had to be a white card. See docs/DESIGN-SYSTEM.md.
 *
 * `name` is the accessible name for each mark, read off the artwork itself. The
 * live site labels all of them generically, which tells a screen-reader user
 * nothing and wastes the image-SEO signal.
 *
 * The intrinsic sizes are real, not nominal: the set is height-normalised to
 * 71px but comes in two widths, so one shared `width`/`height` pair would give
 * the square marks a 3.7:1 box and stretch them. Both surfaces size by height
 * and let width follow.
 */
export const clients = [
    { name: "AutoKeyFix", src: "/assets/img/logos/logo1.webp", width: 264, height: 71 },
    { name: "Amonition", src: "/assets/img/logos/logo2.webp", width: 264, height: 71 },
    { name: "Dyktik", src: "/assets/img/logos/logo3.webp", width: 94, height: 71 },
    { name: "Donna Holmes", src: "/assets/img/logos/logo4.webp", width: 94, height: 71 },
    { name: "DM Brickwork & Construction", src: "/assets/img/logos/logo5.webp", width: 264, height: 71 },
    { name: "Dats Mad Collective", src: "/assets/img/logos/logo6.webp", width: 94, height: 71 },
    { name: "Alpha Bell Vue", src: "/assets/img/logos/logo7.webp", width: 264, height: 71 },
] as const;

/**
 * Homepage marquee settings.
 *
 * `copiesPerPass` repeats the list inside a single pass: seven logos measure
 * roughly 1400px laid out, so two copies clear any viewport up to ~2800px,
 * which is what keeps the track gapless. Only the first copy is announced.
 */
export const clientMarquee = {
    label: "Trusted by brands across the UK, USA and UAE",
    copiesPerPass: 2,
} as const;

/**
 * "Brands that trust our work" heading for the service pages' logo wall
 * (`components/services/Clients.tsx`). Identical across every service route
 * on the live site — verified against `/branding`, `/seo` and `/web-designing`
 * — so it is a shared constant rather than a per-service content field.
 */
export const serviceClientWall = {
    eyebrow: "Our clients",
    titleLead: "Brands that trust",
    titleAccent: "our work",
    stat: { value: 1200, suffix: "+", label: "Projects delivered" },
} as const;
