import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * Browser chrome around a piece of work.
 *
 * Pure CSS — the "chrome" is a bar with three dots and a stub address field.
 * It exists to make the artwork read as a shipped product rather than a
 * floating asset, which is most of the difference between a portfolio grid and
 * a case-study showcase.
 *
 * The chrome bar is decorative and carries no text, so it is aria-hidden. The
 * image inside keeps its real alt text.
 *
 * The inner panel is white on purpose: the logo artwork is dark-on-transparent
 * (see content/clients.ts), so it needs a light surface to be legible — which
 * is also what a browser viewport actually looks like.
 */
export default function DeviceFrame({
    src,
    alt,
    width,
    height,
    className,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}) {
    return (
        <div className={cn("glass overflow-hidden rounded-lg", className)}>
            <div
                className="flex items-center gap-2 border-b border-white/[0.09] px-4 py-3"
                aria-hidden="true"
            >
                <span className="size-2.5 shrink-0 rounded-full bg-white/20" />
                <span className="size-2.5 shrink-0 rounded-full bg-white/20" />
                <span className="size-2.5 shrink-0 rounded-full bg-white/20" />
                <span className="ms-3 h-2.5 min-w-0 flex-1 rounded-full bg-white/[0.08]" />
            </div>

            <div className="grid place-items-center bg-white p-[clamp(1.5rem,1rem+3vw,3.5rem)]">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes="(max-width: 992px) 88vw, 42vw"
                    className="h-auto w-full max-w-[26rem] object-contain"
                />
            </div>
        </div>
    );
}
