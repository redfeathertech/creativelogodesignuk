import ProposalForm from "@/components/forms/ProposalForm";

/**
 * Hero lead-capture panel — replaces the old autoplay showreel in the
 * right-hand column of the split. The video added nothing a crawler or a
 * visitor converts on; a form in the fold does. Reuses `ProposalForm` (already
 * shared by `/contact-us` and the homepage proposal section) rather than a
 * bespoke field set, so there is one validation schema and one server action
 * for every lead entry point on the site.
 *
 * `overflow-y-auto` is the safety valve: the hero is pinned to one screen
 * height (`--hero-h`) on desktop, and the full field set is taller than that
 * on short viewports. Scrolling inside the card keeps the composition intact
 * instead of pushing the section past the fold.
 *
 * The column lives inside the hero's `container-site`, which supplies the
 * horizontal gutter — no `px` of its own, or the card pays it twice and drops
 * to 240px on a 320px screen. The half-viewport tint sits on the section, not
 * here, so it can bleed past the container. `lg:justify-end` puts the card's
 * right edge on the container edge, in line with the header CTA above it.
 */
export default function HeroLeadForm() {
  return (
    <div className="reveal relative flex min-h-[46svh] items-center justify-center overflow-y-auto py-hero-block lg:min-h-full lg:ps-hero-pad lg:justify-end lg:py-hero-block">
      <div className="hero-form w-full max-w-[32rem] rounded-xl border border-white/[0.11] bg-white/[0.04] p-[clamp(1.25rem,0.75rem+2vw,2rem)] shadow-lg backdrop-blur-[16px]">
        <h2 className="text-h5 text-white">Request your free proposal</h2>
        <p className="mt-2 mb-6 text-sm text-white/65">
          Tell us about your project and a strategist will be in touch.
        </p>
        <ProposalForm source="hero" />
      </div>
    </div>
  );
}
