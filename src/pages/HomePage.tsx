import { BrandHeader } from "../components/brand/BrandHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { LinkList } from "../components/navigation/LinkList";
import { Entrance } from "../components/ui/Entrance";
import logo from "../assets/logo-mj.jpeg";
import { siteConfig } from "../config/site";

export function HomePage() {
  return (
    <main className="relative isolate grid min-h-dvh grid-rows-[1fr_auto] overflow-hidden bg-brand-canvas px-4 py-8 text-brand-navy sm:px-6 sm:py-12 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-page-glow" />
      <section
        className="mx-auto flex w-full max-w-136 flex-col items-center self-center"
        aria-labelledby="page-title"
      >
        <BrandHeader
          name={siteConfig.name}
          tagline={siteConfig.tagline}
          logoSrc={logo}
        />
        <LinkList links={siteConfig.links} siteName={siteConfig.name} />
      </section>
      <Entrance delay={680}>
        <SiteFooter message={siteConfig.footerMessage} />
      </Entrance>
    </main>
  );
}
