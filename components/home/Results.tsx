import { results } from "@/content/home";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";

/** Results panel over a background photo with a brand scrim. */
export default function Results() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink-950 bg-cover bg-center py-section text-white"
      style={{ backgroundImage: `url('${results.bg}')` }}
    >
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(100deg,rgb(7_2_15/0.94)_0%,rgb(13_3_28/0.78)_46%,rgb(102_46_145/0.42)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-[1] container-site grid items-center gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow>{results.eyebrow}</Eyebrow>
          <SectionHeading lead={results.titleLead} accent={results.titleAccent} />
          <p className="mt-6 max-w-[62ch] text-lead text-white/65">{results.lead}</p>

          <dl className="mt-8 grid gap-4">
            {results.items.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline gap-4 border-b border-white/[0.11] pb-4"
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="contents">
                  <Counter
                    value={item.value}
                    suffix={item.suffix}
                    className="min-w-[4.5ch] shrink-0 font-display text-h3 leading-none font-extrabold text-magenta-300"
                  />
                  <p className="text-white/65">{item.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal">
          {/* Conic-gradient ring: the outer layer spins, the inner disc stays put
              so the number never tumbles with it. */}
          <div className="relative mx-auto grid aspect-square w-[min(320px,78vw)] place-items-center rounded-full shadow-glow">
            <div
              className="absolute inset-0 animate-meter rounded-full bg-[conic-gradient(from_200deg,var(--color-magenta-500),var(--color-violet-500),var(--color-teal-500),var(--color-magenta-500))]"
              aria-hidden="true"
            />
            <div className="absolute inset-[3px] rounded-full bg-ink-950" aria-hidden="true" />
            <div className="relative z-[1] px-6 text-center">
              <Counter
                value={results.meter.value}
                suffix={results.meter.suffix}
                className="gradient-text block font-display text-[clamp(3rem,2rem+5vw,4.75rem)] leading-none font-extrabold tracking-[-0.03em]"
              />
              <p className="mx-auto mt-3 max-w-[20ch] text-sm text-white/65">
                {results.meter.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
