import { contact } from "@/content/site";
import { hero, heroForm } from "@/content/landing/seo-services";
import { btn } from "@/components/ui/button";
import EnquiryForm from "./EnquiryForm";
import { QuoteButton } from "./QuoteDialog";

/**
 * Hero — the only H1 on the page.
 *
 * Three columns on the live page at `lg`: copy, a mocked-up Google result, and
 * the enquiry form. Below `lg` they stack in that order, which puts the form
 * last on a phone; the live page does the same and it is the right order —
 * the mockup is the argument for the form.
 *
 * The centre column is explicitly a **mockup**. Its browser chrome, search bar
 * and result card illustrate what ranking looks like; they describe no real
 * client. It is marked `aria-hidden` because reading "SPONSORED /
 * https://yourbusiness.com / #1 RANKING" aloud communicates nothing without the
 * visual framing — the four stat boxes underneath are real content and stay in
 * the accessibility tree.
 */
export default function Hero() {
    return (
        <section className="bg-white py-[clamp(2.5rem,1.5rem+4vw,5.625rem)]">
            {/* Every direct child carries `min-w-0`.
                A grid item defaults to `min-width: auto`, so it refuses to
                shrink below its content's min-content width — and the mockup's
                search bar is `truncate`, i.e. `white-space: nowrap`, whose
                min-content is the *whole* unbroken URL. In a one-column grid
                that one string sized the single track at 447px, and because
                every item shares that track, the h1, the lead paragraph and
                both cards were dragged 147px past a 320px viewport with it.
                `min-w-0` breaks the chain, and `truncate` then does what it
                says instead of pushing. */}
            {/* `container-site`, like the offer bar above and every section
                below, so the hero's edges line up with the rest of the page.

                This WAS full-bleed with a 50px gutter, because when
                `container-site` capped at 1280px three equal columns came out
                at 363px each, and a 70px `<h1>` in a 363px column wraps to
                **six lines** ("Boost / Your / Business / With / SEO /
                Services"). At the unified 1560px cap a column is 456px —
                within 2px of what the full-bleed layout gave at a 1560px
                viewport — and the heading ramp below freezes at the size
                that fits it. */}
            <div className="container-site grid items-center gap-[clamp(2.5rem,1.5rem+4vw,3rem)] lg:grid-cols-3 [&>*]:min-w-0">
                {/* ---------------------------------------------------- copy -- */}
                <div>
                    {/* The clamp tracks the column, not the viewport.

                        This heading lives in a third of the container, so its
                        real width is `(min(100vw, 1560px) - 2*gutter - 96) / 3`
                        — 273px at 992, 456px once the container caps. The
                        binding constraint is "Business With" staying on one
                        line: the approved wrap is three lines, and the phrase
                        costs ~7.69px of width per 1px of font size. The ramp
                        below is fitted to that column curve and holds 7-12px
                        of slack at every width from 992 to 2560, freezing at
                        3.65rem where the container stops growing.

                        Do not raise the cap to the ramp's "natural" 3.72rem
                        value at 1560px: it overflows the 456px column by 1.8px
                        and drops "With" onto a fourth line as a widow.
                        (The live page's 70px belonged to a full-bleed column
                        that kept widening past the container.)

                        The live CSS answers this with three stepped media
                        queries that disagree with each other — 70px, then
                        32px at ≤1199, then *back up* to 46px at ≤991, then
                        28px at ≤767. A continuous ramp is the same intent
                        without the reversal. */}
                    <h1 className="font-display text-[clamp(1.75rem,-0.52rem+4.27vw,3.65rem)] leading-[1.05] font-extrabold text-seo-ink">
                        {hero.titleLead}
                        <br />
                        <span className="text-seo-pink">{hero.titleAccent}</span>
                    </h1>

                    <p className="mt-6 text-[clamp(1rem,0.95rem+0.5vw,1.3125rem)] leading-[1.7] text-seo-body">
                        {hero.description}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <QuoteButton
                            packageName={hero.titleAccent}
                            variant="seo"
                            size="lg"
                        >
                            {hero.ctaPrimary}
                        </QuoteButton>
                        <a
                            href={`tel:${contact.phoneE164}`}
                            className={btn("seo-outline", "lg")}
                        >
                            {hero.ctaPhone}
                        </a>
                    </div>
                </div>

                {/* -------------------------------------------------- mockup -- */}
                <div className="rounded-[25px] bg-seo-card p-6 shadow-[0_10px_30px_rgb(0_0_0/0.05)]">
                    <div aria-hidden="true">
                        <div className="mb-6 flex items-center gap-2">
                            <span className="size-3.5 shrink-0 rounded-full bg-[#ff5f57]" />
                            <span className="size-3.5 shrink-0 rounded-full bg-[#febc2e]" />
                            <span className="size-3.5 shrink-0 rounded-full bg-[#28c840]" />
                            <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-white px-4 py-2 text-xs text-seo-body">
                                {hero.mockup.query}
                            </span>
                        </div>

                        <p className="m-0 text-[0.6875rem] font-bold tracking-[0.08em] text-seo-body uppercase">
                            {hero.mockup.sponsored}
                        </p>
                        <p className="m-0 mt-1 truncate text-sm text-seo-body">
                            {hero.mockup.url}
                        </p>

                        <div className="relative mt-6 mb-6 rounded-[20px] border-2 border-seo-pink bg-white p-5">
                            <span className="absolute -top-3.5 left-5 rounded-full bg-seo-pink px-3 py-1 text-[0.625rem] font-bold tracking-[0.06em] text-white">
                                {hero.mockup.badge}
                            </span>
                            <p className="m-0 mt-1 font-display text-base font-bold text-seo-ink">
                                {hero.mockup.title}
                            </p>
                            <p className="m-0 mt-2 text-sm leading-[1.6] text-seo-body">
                                {hero.mockup.description}
                            </p>
                        </div>
                    </div>

                    <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0">
                        {hero.stats.map((stat) => (
                            <li
                                key={stat.label}
                                className="rounded-[18px] bg-seo-ink p-5 text-white"
                            >
                                <p className="m-0 font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.625rem)] leading-none font-extrabold text-seo-cream">
                                    {stat.value}
                                </p>
                                <p className="m-0 mt-1.5 text-xs text-white/70">{stat.label}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ---------------------------------------------------- form -- */}
                <div className="rounded-[25px] border border-seo-border bg-white p-6 shadow-[0_10px_30px_rgb(0_0_0/0.05)] sm:p-8">
                    <h2 className="font-display text-h4 font-extrabold text-seo-ink">
                        {heroForm.title}
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-seo-body">{heroForm.description}</p>
                    <EnquiryForm />
                </div>
            </div>
        </section>
    );
}
