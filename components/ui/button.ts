import { cn } from "@/lib/cn";

/**
 * Button recipe, shared by <button>, <a> and <Link>.
 * Ported from the clduk `.cld-btn` rules.
 */

export type ButtonVariant =
  | "primary"
  | "ghost"
  | "outline"
  | "light"
  /* `/seo-services` only — that page runs the live template's magenta → coral →
     cream ramp rather than the site's violet → magenta, and sits on a white
     canvas. See the `gradient-seo` utility in globals.css. */
  | "seo"
  | "seo-outline";
export type ButtonSize = "md" | "lg";

/* `max-w-full` and a wrappable label are load-bearing, not cosmetic.
   `whitespace-nowrap` used to sit on this line, and it meant a button was as
   wide as its longest label no matter how narrow the column holding it — so on
   a 320px phone the hero CTA measured 359px inside a 280px column and hung 59px
   off the side of the screen. Every section on this site is `overflow-hidden`,
   so the document never scrolled sideways and the only responsive check that
   existed stayed silent; the label was simply sliced off. Wrapping is the
   safety net: a two-line pill is a design compromise, a guillotined CTA is a
   lost lead. Labels still sit on one line at every width where they fit. */
const base =
  "inline-flex max-w-full items-center justify-center gap-3 rounded-full font-display font-bold uppercase tracking-[0.06em] " +
  "text-balance transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-45 text-center leading-none cursor-pointer " +
  // The trailing arrow nudges forward with the button.
  "[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:translate-x-[3px]";

/* Fluid inline padding. The top of each clamp is the padding these buttons have
   always had, reached by ~900px (md) and ~1080px (lg), so nothing from tablet up
   moves a pixel. Below that the space is worth more to the label than to the
   pill: at 320px a fixed `px-9` spent 72 of the 280 available pixels on empty
   space either side of the text. */
const sizes: Record<ButtonSize, string> = {
  md: "px-[clamp(1.25rem,0.85rem+1.6vw,1.75rem)] py-[0.9rem] text-sm",
  lg: "px-[clamp(1.375rem,0.9rem+2vw,2.25rem)] py-[1.05rem] text-[0.9375rem]",
};

const variants: Record<ButtonVariant, string> = {
  // The gradient slides on hover: the image is 160% wide and its position moves
  // from one end to the other, so the fill shifts violet → magenta.
  primary:
    "text-white bg-[linear-gradient(97deg,var(--color-violet-500)_0%,var(--color-magenta-500)_100%)] " +
    "bg-[length:160%_100%] bg-[position:0%_50%] hover:bg-[position:100%_50%] " +
    "shadow-glow hover:shadow-[0_18px_54px_-12px_rgb(204_6_127/0.7)] " +
    "transition-[transform,box-shadow,background-position] duration-500",
  ghost:
    "text-white bg-white/[0.02] backdrop-blur-md shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)] " +
    "hover:bg-white/[0.08] hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.42)]",
  outline:
    "text-onlight shadow-[inset_0_0_0_1.5px_rgb(13_3_28/0.22)] " +
    "hover:bg-ink-900 hover:text-white hover:shadow-[inset_0_0_0_1.5px_var(--color-ink-900)]",
  light: "bg-white text-onlight shadow-md hover:bg-magenta-50 hover:text-magenta-700",
  // Same slide-on-hover trick as `primary`, on the SEO page's own three-stop ramp.
  seo:
    "text-white bg-[linear-gradient(90deg,var(--color-seo-pink)_0%,var(--color-seo-coral)_50%,var(--color-seo-cream)_100%)] " +
    "bg-[length:170%_100%] bg-[position:0%_50%] hover:bg-[position:100%_50%] " +
    "shadow-[0_12px_34px_-12px_rgb(209_0_143/0.6)] hover:shadow-[0_18px_44px_-12px_rgb(209_0_143/0.7)] " +
    "transition-[transform,box-shadow,background-position] duration-500",
  "seo-outline":
    "text-seo-ink shadow-[inset_0_0_0_1.5px_var(--color-seo-border)] bg-white " +
    "hover:text-seo-pink hover:shadow-[inset_0_0_0_1.5px_var(--color-seo-pink)]",
};

export function btn(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra?: string) {
  return cn(base, sizes[size], variants[variant], extra);
}
