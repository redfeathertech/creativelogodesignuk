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

const base =
  "inline-flex items-center justify-center gap-3 rounded-full font-display font-bold uppercase tracking-[0.06em] " +
  "whitespace-nowrap transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-45 text-center leading-none cursor-pointer " +
  // The trailing arrow nudges forward with the button.
  "[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:translate-x-[3px]";

const sizes: Record<ButtonSize, string> = {
  md: "px-7 py-[0.9rem] text-sm",
  lg: "px-9 py-[1.05rem] text-[0.9375rem]",
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
