import Image from "next/image";
import { toolbox } from "@/content/home";
import { Eyebrow, Section, SectionHead, SectionHeading } from "@/components/ui/Section";
import { LeadButton } from "@/components/chrome/LeadPanel";

/**
 * Tool grid. Four across from `lg:`, three from `md:`, two on phones. Sixteen
 * tools divide evenly by four, so the widest layout has no orphan on the last
 * row.
 *
 * Below 27rem the icon sits above the label instead of beside it. Side by side
 * needs 180px of card — 32 padding + 44 icon + 16 gap + 88 for the longest name
 * ("Photoshop") — and two columns do not reach that until ~430px of viewport.
 *
 * Named breakpoints only, and no arbitrary min-width variant. Tailwind v4 cannot
 * compare a px length to a rem one, so it emits every px-valued media variant
 * ahead of the rem-valued ones instead of in width order. A one-off px variant
 * here therefore lost the cascade to `md:grid-cols-3`, pinning the grid at three
 * on desktop. (Do not write the class form of such a variant in a comment — the
 * scanner reads comments too and will emit the rule.)
 *
 * Tool names are <p>, not headings. The live site marks all 16 as <h4>, which
 * is heading spam — "Figma", "CSS" and "Vue" are labels, not section titles.
 */
export default function Toolbox() {
  return (
    <Section tone="light">
      <div className="container-site">
        <SectionHead
          className="reveal"
          action={<LeadButton variant="outline">{toolbox.cta}</LeadButton>}
        >
          <Eyebrow className="text-magenta-500">{toolbox.eyebrow}</Eyebrow>
          <SectionHeading
            lead={toolbox.titleLead}
            accent={toolbox.titleAccent}
            accentClassName="gradient-text-brand"
            className="mb-0"
          />
        </SectionHead>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {toolbox.tools.map((tool) => (
            <li
              key={tool.name}
              /* `translate`, not `transform`: Tailwind v4 drives `-translate-y-*`
                 off the standalone `translate` property, so a list naming
                 `transform` left this lift snapping while the shadow eased. */
              className="reveal flex flex-col items-start gap-2 rounded-md border border-ink-900/[0.08] bg-white p-4 transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-magenta-500/30 hover:shadow-md min-[27rem]:flex-row min-[27rem]:items-center min-[27rem]:gap-4"
            >
              <Image
                src={tool.icon}
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="size-11 shrink-0 object-contain"
              />
              {/* min-w-0 so this can shrink as a flex item, and break-words as the
                  backstop — without both, a name longer than the text column does
                  not wrap, it spills straight out through the card border. */}
              <span className="min-w-0">
                <span className="block font-display leading-[1.2] font-bold break-words text-onlight">
                  {tool.name}
                </span>
                <span className="mt-0.5 block text-xs text-onlight-muted">{tool.kind}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
