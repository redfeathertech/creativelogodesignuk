import type { ServiceCapabilities } from "@/content/services/types";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

export default function Capabilities({ data }: { data: ServiceCapabilities }) {
  return (
    <Section tone="light">
      <div className="container-site">
        <div className="reveal mx-auto max-w-[62ch] text-center">
          <Eyebrow className="justify-center text-magenta-500">{data.eyebrow}</Eyebrow>
          <SectionHeading
            lead={data.heading}
            accent={data.headingAccent}
            accentClassName="gradient-text-brand"
            className="mx-auto"
          />
        </div>

        <ul className="reveal mx-auto mt-10 grid max-w-[52rem] grid-cols-2 gap-4 min-[576px]:grid-cols-3">
          {/* Both the <li> and its label carry `min-w-0`.

              Each is an item of a different formatting context — the <li> is a
              grid item, the label a flex item — and both therefore default to
              `min-width: auto`, refusing to shrink below the longest
              capability word. Fixing only the label stopped any single element
              from visibly sticking out while the document still scrolled 7px
              on **all 36 service pages** at 320px, because the <li> was still
              sizing the two-column track. `break-words` then lets a word that
              is genuinely wider than its 132px cell break instead of push. */}
          {data.items.map((item) => (
            <li
              key={item}
              className="flex min-w-0 items-center gap-3 rounded-md border border-ink-900/[0.08] bg-white px-5 py-4 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full bg-magenta-50 text-magenta-600"
              >
                <CheckIcon className="size-4" />
              </span>
              <span className="min-w-0 font-display text-sm font-bold break-words text-onlight">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
