import { useEffect, useState } from "react";
import { BrandHeader } from "./components/brand/BrandHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { LinkList } from "./components/navigation/LinkList";
import { Entrance } from "./components/ui/Entrance";
import logo from "./assets/logo-mj.jpeg";
import { siteConfig } from "./config/site";
import { InformationPage } from "./pages/InformationPage";
import { MenuPage } from "./pages/MenuPage";
import { SignInPage } from "./pages/SignInPage";
import type { AppPage } from "./types/navigation";

function getCurrentPage(): AppPage {
  switch (window.location.pathname) {
    case "/menu":
      return "menu";
    case "/informacoes":
      return "information";
    case "/entrar":
      return "sign-in";
    default:
      return "home";
  }
}

const pagePaths: Record<AppPage, string> = {
  home: "/",
  menu: "/menu",
  information: "/informacoes",
  "sign-in": "/entrar",
};

function App() {
  const [page, setPage] = useState<AppPage>(getCurrentPage);

  useEffect(() => {
    function handlePopState() {
      setPage(getCurrentPage());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigateToPath(path: string) {
    window.history.pushState({}, "", path);
    setPage(getCurrentPage());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigate(page: AppPage) {
    navigateToPath(pagePaths[page]);
  }

  if (page === "menu") {
    return <MenuPage onBack={() => navigate("home")} onNavigate={navigate} />;
  }

  if (page === "information") {
    return <InformationPage onBack={() => navigate("menu")} onNavigate={navigate} />;
  }

  if (page === "sign-in") {
    return <SignInPage onBack={() => navigate("menu")} onNavigate={navigate} />;
  }

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
        <LinkList
          links={siteConfig.links}
          siteName={siteConfig.name}
          onInternalNavigate={navigateToPath}
        />
      </section>
      <Entrance delay={680}>
        <SiteFooter message={siteConfig.footerMessage} />
      </Entrance>
    </main>
  );
}

export default App;
