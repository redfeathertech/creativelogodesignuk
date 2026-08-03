import Image from "next/image";

import { support } from "@/content/landing/logo-design-offer";
import { PhoneIcon } from "@/components/ui/icons";

/**
 * The three-up support strip above the footer.
 *
 * The middle item's icon is a 25KB base64 `data:` URI inlined into the live
 * markup — it cannot be cached, and it is re-sent with the document on every
 * visit. It is the shared phone icon here, so nothing is downloaded at all.
 */
export default function Support() {
    return (
        <section className="bg-[linear-gradient(97deg,var(--color-violet-600)_0%,var(--color-magenta-600)_100%)] py-10 text-white">
            <ul className="container-site grid gap-6 text-center sm:grid-cols-3 sm:text-left">
                {support.map((item) => (
                    <li key={item.label}>
                        <a
                            href={item.href}
                            {...(item.href.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            className="flex flex-col items-center gap-3 transition-opacity hover:opacity-85 sm:flex-row"
                        >
                            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/15">
                                {item.icon ? (
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        aria-hidden="true"
                                        width={48}
                                        height={48}
                                        className="size-7 object-contain"
                                    />
                                ) : (
                                    <span className="[&>svg]:size-5">
                                        <PhoneIcon />
                                    </span>
                                )}
                            </span>
                            <span>
                                <span className="block text-xs text-white/75">{item.label}</span>
                                <span className="block font-display font-bold">{item.value}</span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
