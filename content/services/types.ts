/**
 * The service-page content schema, mirroring the shape of
 * `clduk/config/services_content/_defaults.php`.
 *
 * The Laravel controller merges a per-service file over `_defaults.php` ONE
 * LEVEL DEEP, per top-level section key — see the merge note in that file.
 * `ServiceContent` is the fully-resolved shape (what a component receives);
 * `ServiceContentOverrides` is the same shape with every section optional
 * (what a per-service file exports), since a service file may omit a section
 * entirely and fall back to `serviceDefaults`.
 */

export interface ServiceImage {
  src: string;
  width: number;
  height: number;
}

export interface ServiceMeta {
  title: string;
  description: string;
}

export interface HeroTile {
  label: string;
  /** A service route slug (no leading slash), e.g. "web-designing". */
  slug: string;
  icon: ServiceImage;
}

export interface ServiceHero {
  eyebrow: string;
  breadcrumb: string;
  heading: string;
  headingAccent: string;
  lead: string;
  banner: ServiceImage;
  media: ServiceImage;
  mediaAlt: string;
  ctaPrimary: string;
  ctaSecondary: string;
  /** Exactly 4 tiles. */
  tiles: HeroTile[];
}

export interface HowItWorksStep {
  title: string;
  body: string;
  icon: ServiceImage;
}

export interface ServiceHowItWorks {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  art: ServiceImage;
  /** Exactly 3 steps. */
  steps: HowItWorksStep[];
  workHeading: string;
  /** Exactly 6 images. */
  workImages: ServiceImage[];
}

export interface ServiceSolutions {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  image: ServiceImage;
  imageAlt: string;
}

export interface ServiceMarquee {
  text: string;
}

export interface BenefitItem {
  title: string;
  body: string;
  image: ServiceImage;
}

export interface ServiceBenefits {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  /** Exactly 5 items. */
  items: BenefitItem[];
}

export interface AdvantageStat {
  label: string;
  count: number;
  prefix: string;
  suffix: string;
  /** Decimal places for the animated counter, e.g. 4.7 -> decimals: 1. */
  decimals?: number;
}

export interface ServiceAdvantages {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  /** Exactly 4 stats. */
  stats: AdvantageStat[];
  image: ServiceImage;
  imageAlt: string;
}

export interface WhyChooseFeature {
  title: string;
  body: string;
}

export interface ServiceWhyChoose {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  /** Exactly 6 features. */
  features: WhyChooseFeature[];
}

export interface AboutSlide {
  title: string;
  body: string;
  image: ServiceImage;
}

export interface ServiceAbout {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  /** 2 or 3 slides. */
  slides: AboutSlide[];
}

export interface ServiceClients {
  /** null -> render the shared default client-logo strip. */
  logos: string[] | null;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ServiceProcess {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  /** Exactly 5 steps. */
  steps: ProcessStep[];
}

export interface ServiceCapabilities {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  /** Exactly 6 strings. */
  items: string[];
}

export interface ServiceCta {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  button: string;
}

export interface ServiceContent {
  meta: ServiceMeta;
  hero: ServiceHero;
  howItWorks: ServiceHowItWorks;
  solutions: ServiceSolutions;
  marquee: ServiceMarquee;
  benefits: ServiceBenefits;
  advantages: ServiceAdvantages;
  whyChoose: ServiceWhyChoose;
  about: ServiceAbout;
  clients: ServiceClients;
  process: ServiceProcess;
  capabilities: ServiceCapabilities;
  cta: ServiceCta;
}

/** Every section optional — what a per-service override file exports. */
export type ServiceContentOverrides = {
  [K in keyof ServiceContent]?: Partial<ServiceContent[K]>;
};
