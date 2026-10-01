import { Mail, UserRound } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PageTopBar } from "../components/layout/PageTopBar";
import { MenuBottomNav } from "../components/menu/MenuBottomNav";
import logo from "../assets/logo-mj.jpeg";
type AuthMode = "sign-in" | "sign-up";

export function SignInPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [submitted, setSubmitted] = useState(false);
  const isSignUp = mode === "sign-up";

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-dvh bg-brand-cream pb-24 text-brand-navy">
      <PageTopBar
        title={isSignUp ? "Criar conta" : "Entrar"}
        onBack={() => navigate({ to: "/menu" })}
      />
      <section className="mx-auto w-full max-w-md px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-card sm:p-8">
          <img
            className="mx-auto size-20 rounded-2xl border border-brand-gold/35 object-cover"
            src={logo}
            alt="Logo da Doceria M&J"
          />
          <h2 className="mt-5 text-center text-2xl font-extrabold">
            {isSignUp ? "Crie sua conta" : "Que bom ter você aqui"}
          </h2>
          <p className="mt-2 text-center text-sm leading-relaxed text-brand-navy/65">
            {isSignUp
              ? "Cadastre-se para acompanhar seus pedidos com mais praticidade."
              : "Entre para manter suas informações prontas para os próximos pedidos."}
          </p>

          <div
            className="mt-6 grid grid-cols-2 rounded-xl bg-brand-cream p-1"
            role="tablist"
            aria-label="Opção de acesso"
          >
            <AuthModeButton
              active={!isSignUp}
              label="Entrar"
              onClick={() => changeMode("sign-in")}
            />
            <AuthModeButton
              active={isSignUp}
              label="Cadastrar"
              onClick={() => changeMode("sign-up")}
            />
          </div>

          <button
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-brand-navy px-4 py-3.5 text-sm font-bold text-brand-cream transition hover:bg-brand-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            type="button"
            onClick={() => setSubmitted(true)}
          >
            <span className="grid size-5 place-items-center rounded-full bg-white text-xs font-extrabold text-brand-navy">
              G
            </span>
            Continuar com Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs font-bold text-brand-navy/45">
            <span className="h-px flex-1 bg-brand-gold/25" />
            ou use seu e-mail
            <span className="h-px flex-1 bg-brand-gold/25" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <Field
                label="Nome"
                name="name"
                type="text"
                autoComplete="name"
                icon={<UserRound size={18} />}
              />
            )}
            <Field
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              icon={<Mail size={18} />}
            />
            <Field
              label="Senha"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
            <button
              className="w-full rounded-xl bg-brand-gold px-4 py-3.5 text-sm font-extrabold text-brand-navy transition hover:bg-[#e8c17c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              type="submit"
            >
              {isSignUp ? "Criar minha conta" : "Entrar com e-mail"}
            </button>
          </form>
          {submitted && (
            <p className="mt-4 rounded-xl bg-brand-cream px-4 py-3 text-center text-sm font-semibold text-brand-gold-dark">
              Autenticação disponível quando o backend for conectado.
            </p>
          )}
        </div>
      </section>
      <MenuBottomNav activePage="sign-in" />
    </main>
  );
}

type AuthModeButtonProps = { active: boolean; label: string; onClick: () => void };

function AuthModeButton({ active, label, onClick }: AuthModeButtonProps) {
  return (
    <button
      className={`rounded-lg px-3 py-2 text-sm font-extrabold transition ${
        active ? "bg-white text-brand-navy shadow-sm" : "text-brand-navy/55"
      }`}
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  autoComplete: string;
  icon?: ReactNode;
};

function Field({ label, name, type, autoComplete, icon }: FieldProps) {
  return (
    <label className="block text-sm font-bold text-brand-navy">
      <span className="mb-1.5 block">{label}</span>
      <span className="relative block">
        {icon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold-dark"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          className={`w-full rounded-xl border border-brand-gold/35 bg-white py-3 outline-none placeholder:text-brand-navy/40 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25 ${
            icon ? "px-10" : "px-3"
          }`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
        />
      </span>
    </label>
  );
}
