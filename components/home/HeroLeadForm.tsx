import HeroEnquiryForm from "./HeroEnquiryForm";
import { hero } from "@/content/home";

/**
 * Hero lead-capture card — a white panel on the hero's dark canvas, capped by
 * the brand gradient rule. It replaces the old autoplay showreel in the
 * right-hand column: the video added nothing a crawler or a visitor converts
 * on; a form in the fold does.
 *
 * The light treatment is deliberate and is why this card does not reuse
 * `ProposalForm` — see `HeroEnquiryForm` for the field set and the reasoning.
 *
 * `overflow-y-auto` is the safety valve: the hero is pinned to one screen
 * height (`--hero-h`) on desktop, and the full field set is taller than that
 * on short viewports. Scrolling inside the card keeps the composition intact
 * instead of pushing the section past the fold.
 *
 * The column lives inside the hero's `container-site`, which supplies the
 * horizontal gutter — no `px` of its own, or the card pays it twice and drops
 * to 240px on a 320px screen. `lg:justify-end` puts the card's right edge on
 * the container edge, in line with the header CTA above it.
 */
export default function HeroLeadForm() {
    return (
        <div className="reveal relative flex min-h-[46svh] items-center justify-center overflow-y-auto py-hero-block lg:min-h-full lg:justify-end lg:ps-hero-pad lg:py-hero-block">
            <div className="hero-form w-full max-w-[30rem] overflow-hidden rounded-sm bg-white shadow-[0_30px_80px_-30px_rgb(0_0_0/0.65)]">
                {/* The gradient cap. A plain block rather than a border so it
                    keeps its full weight at every width. */}
                <div
                    className="h-[5px] w-full bg-[linear-gradient(90deg,var(--color-violet-500)_0%,var(--color-magenta-500)_55%,var(--color-magenta-300)_100%)]"
                    aria-hidden="true"
                />

                <div className="p-[clamp(1.25rem,0.75rem+1.6vw,2rem)]">
                    <h2 className="font-display text-[clamp(1.4rem,1.1rem+0.9vw,1.85rem)] leading-tight font-extrabold text-onlight">
                        {hero.form.titleLead}{" "}
                        <span className="text-magenta-500">
                            {hero.form.titleAccent}
                        </span>
                    </h2>
                    <p className="mt-2 mb-5 text-[0.95rem] text-onlight-muted">
                        {hero.form.sub}
                    </p>
                    <HeroEnquiryForm />
                </div>
            </div>
        </div>
    );
}
