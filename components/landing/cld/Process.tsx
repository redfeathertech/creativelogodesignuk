import { process } from "@/content/landing/creative-logo-design";

/**
 * The four-stage design process.
 *
 * The live page draws the stage number as a background layer with the label
 * absolutely positioned on top of it, which is why "01" and "Discovery" overlap
 * on a narrow screen. Here the number is a decorative watermark behind a real
 * `<h3>` and cannot collide with it — and it is `aria-hidden`, because "01" read
 * aloud before every heading is noise.
 */
export default function Process() {
    return (
        <section className="bg-white py-section text-onlight">
            <div className="container-site">
                <h2 className="reveal text-center text-h2">{process.title}</h2>

                <ol className="mt-14 grid gap-6 min-[576px]:grid-cols-2 lg:grid-cols-4">
                    {process.steps.map((step) => (
                        <li
                            key={step.n}
                            className="reveal relative isolate overflow-hidden rounded-lg border border-ink-900/[0.08] bg-mist-100 p-7"
                        >
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -top-4 right-2 -z-10 font-display text-[5.5rem] leading-none font-extrabold text-ink-900/[0.06]"
                            >
                                {step.n}
                            </span>

                            <h3 className="text-h5 font-bold text-onlight">{step.title}</h3>
                            <p className="mt-3 text-onlight-muted">{step.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
