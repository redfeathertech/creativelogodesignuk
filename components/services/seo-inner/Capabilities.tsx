import type { ServiceCapabilities } from "@/content/services/types";
import { CheckIcon } from "@/components/ui/icons";
import { SX_RAMP, SxEyebrow, SxHeading, SxSection } from "./Shell";

/**
 * The six capabilities, as a 3-up card grid on white.
 *
 * `capabilities.items` is a list of bare strings — the schema carries no body
 * copy for them — so each card is its mark and its label. The mock shows a
 * paragraph under each; writing one would put invented copy on eleven pages,
 * so the cards stay as the content actually is.
 *
 * `min-w-0` on both the `<li>` and its label is deliberate. Each belongs to a
 * different formatting context — the `<li>` is a grid item, the label a flex
 * item — and both default to `min-width: auto`, refusing to shrink below the
 * longest capability word. Fixing only one still lets the other size the
 * track, which is what pushed the document sideways at 320px on the shared
 * service page.
 */
export default function Capabilities({ data }: { data: ServiceCapabilities }) {
    return (
        <SxSection tone="light">
            <div className="container-site">
                <div className="reveal mx-auto max-w-[62ch] text-center">
                    <SxEyebrow tone="light" className="justify-center">
                        {data.eyebrow}
                    </SxEyebrow>
                    <SxHeading
                        lead={data.heading}
                        accent={data.headingAccent}
                        className="mx-auto text-balance"
                    />
                </div>

                <ul className="mt-12 grid gap-4 min-[576px]:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((item) => (
                        <li
                            key={item}
                            className="reveal flex min-w-0 items-center gap-4 rounded-lg border border-[rgb(157_78_221/0.16)] bg-[var(--sx-lilac)] px-6 py-5 transition-colors duration-300 ease-out hover:border-[var(--sx-line-hot)]"
                        >
                            <span
                                aria-hidden="true"
                                className="grid size-10 shrink-0 place-items-center rounded-md text-white"
                                style={{ backgroundImage: SX_RAMP }}
                            >
                                <CheckIcon className="size-4" />
                            </span>
                            <span className="min-w-0 font-display text-ui-15 font-bold break-words text-onlight">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </SxSection>
    );
}
