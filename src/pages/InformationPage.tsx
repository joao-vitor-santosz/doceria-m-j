import { CreditCard, MapPin, Store, Timer } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { PageTopBar } from "../components/layout/PageTopBar";
import { MenuBottomNav } from "../components/menu/MenuBottomNav";
import logo from "../assets/logo-mj.jpeg";
import { storeConfig } from "../config/store";
import { siteConfig } from "../config/site";

const informationItems = [
  { icon: MapPin, title: "Endereço", content: storeConfig.address },
  { icon: Timer, title: "Horário de funcionamento", content: storeConfig.openingHours },
  { icon: CreditCard, title: "Formas de pagamento", content: storeConfig.paymentMethods },
] as const;

export function InformationPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-dvh bg-brand-cream pb-24 text-brand-navy">
      <PageTopBar title="Sobre a doceria" onBack={() => navigate({ to: "/menu" })} />
      <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col items-center border-b border-brand-gold/30 pb-8 text-center">
          <img
            className="size-28 rounded-3xl border-2 border-brand-gold object-cover shadow-logo"
            src={logo}
            alt="Logo da Doceria M&J"
          />
          <h2 className="mt-4 text-2xl font-extrabold">{siteConfig.name}</h2>
          <p className="mt-1 text-sm font-bold text-brand-gold-dark">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-brand-navy/70">
            Doces preparados com carinho para tornar cada momento mais gostoso.
          </p>
        </div>
        <div className="divide-y divide-brand-gold/25">
          {informationItems.map(({ icon: Icon, title, content }) => (
            <section key={title} className="flex gap-4 py-6">
              <Icon className="mt-0.5 shrink-0 text-brand-gold-dark" size={21} aria-hidden="true" />
              <div>
                <h3 className="font-extrabold">{title}</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-brand-navy/65">{content}</p>
              </div>
            </section>
          ))}
        </div>
        <section className="mt-3 rounded-3xl bg-brand-navy p-6 text-brand-cream">
          <div className="flex items-center gap-2 text-brand-gold">
            <Store size={20} aria-hidden="true" />
            <h3 className="font-extrabold">Atendimento</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-brand-cream/80">
            Os dados de atendimento serão atualizados em breve.
          </p>
        </section>
      </section>
      <MenuBottomNav activePage="information" />
    </main>
  );
}
