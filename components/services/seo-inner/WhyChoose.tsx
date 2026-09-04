import type { ServiceWhyChoose } from "@/content/services/types";
import { CheckIcon } from "@/components/ui/icons";
import { SX_RAMP, SxEyebrow, SxHeading } from "./Shell";

/**
 * The six reasons, as a 3-up card grid on the dark canvas.
 *
 * The shared service page renders the same six as a hairline-ruled list. The
 * mock boxes them, which is the only difference — same headings, same bodies,
 * same order, still one `h3` per card.
 */
export default function WhyChoose({ data }: { data: ServiceWhyChoose }) {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--sx-canvas-2)] py-section text-white">
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-mesh-sx"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-grid-sx"
                aria-hidden="true"
            />

            <div className="relative container-site">
                <div className="reveal mx-auto max-w-[56rem] text-center">
                    <SxEyebrow className="justify-center">
                        {data.eyebrow}
                    </SxEyebrow>
                    <SxHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                        className="mx-auto text-balance"
                    />
                </div>

                <ul className="mt-12 grid gap-4 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {data.features.map((feature) => (
                        <li
                            key={feature.title}
                            className="reveal min-w-0 rounded-lg border border-[var(--sx-line)] bg-[var(--sx-card)] p-7 backdrop-blur-sm transition-colors duration-300 ease-out hover:border-[var(--sx-line-hot)]"
                        >
                            <span
                                aria-hidden="true"
                                className="mb-5 grid size-11 place-items-center rounded-md text-white"
                                style={{ backgroundImage: SX_RAMP }}
                            >
                                <CheckIcon className="size-4" />
                            </span>
                            <h3 className="mb-2.5 text-h5 font-bold text-white">
                                {feature.title}
                            </h3>
                            <p className="text-white/60">{feature.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
