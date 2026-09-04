import Image from "next/image";

import type { ServiceProcess } from "@/content/services/types";
import { SxEyebrow, SxHeading, SxNumber } from "./Shell";

/**
 * "How we work" — the supplied artwork on the left, the numbered steps stacked
 * as cards on the right.
 *
 * Five steps, not the mock's four: every service module carries five and the
 * copy is not ours to trim. The column scrolls with the page rather than
 * inside itself, so the fifth simply extends the stack past the artwork, which
 * is sticky on `lg` and up so it stays beside them.
 *
 * The chip is `aria-hidden` — the `<ol>` already carries the order.
 */
export default function Process({ data }: { data: ServiceProcess }) {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas)] py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh-sx"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay"
                aria-hidden="true"
            />

            <div className="relative container-site grid items-start gap-[clamp(2.5rem,1.5rem+5vw,4.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="reveal min-w-0 lg:sticky lg:top-28">
                    <SxEyebrow>{data.eyebrow}</SxEyebrow>
                    <SxHeading lead={data.heading} accent={data.headingAccent} />
                    <p className="mt-6 max-w-[52ch] text-lead text-white/60">
                        {data.lead}
                    </p>

                    <Image
                        src="/assets/img/services/seo-inner/process.png"
                        alt=""
                        aria-hidden="true"
                        width={640}
                        height={495}
                        sizes="(max-width: 992px) 88vw, 40vw"
                        className="mt-10 h-auto w-full rounded-lg shadow-[0_28px_64px_-28px_rgb(0_0_0/0.8)]"
                    />
                </div>

                <ol className="grid min-w-0 gap-4">
                    {data.steps.map((step, i) => (
                        <li
                            key={step.title}
                            className="reveal grid grid-cols-[auto_minmax(0,1fr)] gap-5 rounded-lg border border-[var(--sx-line)] bg-[var(--sx-card)] p-6 backdrop-blur-sm transition-colors duration-300 ease-out hover:border-[var(--sx-line-hot)] min-[576px]:p-7"
                        >
                            <SxNumber index={i + 1} />
                            <div className="min-w-0">
                                <h3 className="mb-2 text-h5 font-bold text-white">
                                    {step.title}
                                </h3>
                                <p className="text-white/60">{step.body}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
