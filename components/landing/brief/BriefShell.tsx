import Image from "next/image";

/**
 * The card both brief pages sit in.
 *
 * The live pages are a white card on a violet gradient with no header, footer
 * or navigation — deliberate: these are links the sales team sends to a named
 * client, and every exit is the submit button. That shape is kept; what
 * changes is that it is now built on the site's own tokens rather than a
 * standalone stylesheet, and the logo is a real `next/image` rather than an
 * unsized `<img>`.
 *
 * `<h1>` here, `<h2>` per section. The live pages open at `<h2>` and use `<h3>`
 * for sections, with no `<h1>` at all. Heading LEVELS may change where the text
 * does not — see docs/CONTENT-PARITY.md.
 */
export default function BriefShell({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,var(--color-violet-500)_0%,var(--color-ink-900)_100%)] px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-[0_30px_80px_-30px_rgb(7_2_15/0.6)] sm:p-10">
                <div className="flex justify-center">
                    <Image
                        src="/assets/img/logo-dark.webp"
                        alt="Creative Logo Design"
                        width={600}
                        height={260}
                        preload
                        className="h-11 w-auto"
                    />
                </div>

                <h1 className="mt-6 text-center font-display text-h4 font-bold text-onlight">
                    {title}
                </h1>

                {description && (
                    <p className="mx-auto mt-3 max-w-xl text-center text-sm text-onlight-muted">
                        {description}
                    </p>
                )}

                <div className="mt-8">{children}</div>
            </div>
        </div>
    );
}
