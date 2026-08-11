import { routeByPath, type RouteEntry } from "@/content/routes";
import { getServiceContent } from "@/content/services";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/seo";

import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Solutions from "./Solutions";
import Marquee from "./Marquee";
import Benefits from "./Benefits";
import Advantages from "./Advantages";
import WhyChoose from "./WhyChoose";
import About from "./About";
import Clients from "./Clients";
import Process from "./Process";
import Capabilities from "./Capabilities";
import Cta from "./Cta";

/**
 * Renders one of the 36 "service" group routes from content/routes.ts.
 *
 * Every one of them now has real content mapped in content/services/index.ts,
 * which asserts that completeness at module load — so the throw below is a
 * guard for the type, not a path any build reaches.
 */
export default function ServicePage({ route }: { route: RouteEntry }) {
  const content = getServiceContent(route.path);

  if (!content) {
    throw new Error(`No service content for "${route.path}" — see content/services/index.ts`);
  }

  /*
   * The crumb reads `hero.breadcrumb`, not `route.title`. `route.title` is the
   * live `<title>`, and several of those are mechanically title-cased slugs
   * ("Ui Ux Design", "Custom Wordpress Developement") — faithful in the head,
   * unreadable on the page. See the note on `title` in content/routes.ts.
   *
   * A nested sub-service gets its pillar as a middle crumb — visible trail and
   * BreadcrumbList JSON-LD both, since both render from this one array. The
   * crumb only appears when the pillar page actually exists: `/automation-
   * services/*` pages skip it until their pillar is built, because a crumb is
   * a link and a link to an unbuilt page is a 404.
   */
  const pillarPath = route.path.slice(0, route.path.lastIndexOf("/"));
  const pillar = pillarPath ? routeByPath.get(pillarPath) : undefined;
  const pillarCrumb = pillar
    ? [{ name: getServiceContent(pillar.path)?.hero.breadcrumb ?? pillar.title, path: pillar.path }]
    : [];

  const trail = [
    { name: "Home", path: "/" },
    ...pillarCrumb,
    { name: content.hero.breadcrumb, path: route.path },
  ];

  return (
    <>
      {/* `route.title` here too, so the JSON-LD name and the <title> can never disagree. */}
      <JsonLd data={pageGraph(route.path, route.title, content.meta.description, trail)} />

      <Hero hero={content.hero} trail={trail} />
      <HowItWorks data={content.howItWorks} />
      <Solutions data={content.solutions} />
      <Marquee data={content.marquee} />
      <Benefits data={content.benefits} />
      <Advantages data={content.advantages} />
      <WhyChoose data={content.whyChoose} />
      <About data={content.about} />
      <Clients />
      <Process data={content.process} />
      <Capabilities data={content.capabilities} />
      <Cta data={content.cta} />
    </>
  );
}
