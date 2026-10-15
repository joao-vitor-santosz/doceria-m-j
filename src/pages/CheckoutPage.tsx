import { Bike, LoaderCircle, MessageCircle, Store } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PageTopBar } from "../components/layout/PageTopBar";
import { MenuBottomNav } from "../components/menu/MenuBottomNav";
import { siteConfig } from "../config/site";
import { useCart } from "../context/cart-context";
import { formatPrice } from "../utils/currency";
import {
  buildOrderMessage,
  getWhatsappOrderUrl,
  type DeliveryAddress,
  type FulfillmentMode,
} from "../utils/order-message";
import { getSelectionSummary } from "../utils/product-customization";
import { fetchAddressByCep } from "../utils/viacep";
import { EmptyCart } from "./CartPage";

type CheckoutForm = DeliveryAddress & {
  name: string;
  phone: string;
  fulfillment: FulfillmentMode | null;
};

type CheckoutField = keyof CheckoutForm;
type CheckoutErrors = Partial<Record<CheckoutField, string>>;
type CepStatus = "idle" | "loading" | "found" | "not-found" | "error";

const initialForm: CheckoutForm = {
  name: "",
  phone: "",
  fulfillment: null,
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  reference: "",
};

const fieldOrder: readonly CheckoutField[] = [
  "name",
  "phone",
  "fulfillment",
  "cep",
  "street",
  "number",
  "neighborhood",
  "city",
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [showErrors, setShowErrors] = useState(false);
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle");
  const [orderUrl, setOrderUrl] = useState<string | null>(null);
  const cepRequestRef = useRef<AbortController | null>(null);
  const errors = validateCheckout(form);
  const isDelivery = form.fulfillment === "delivery";

  useEffect(() => {
    document.title = `Finalizar pedido | ${siteConfig.name}`;
  }, []);

  useEffect(() => () => cepRequestRef.current?.abort(), []);

  function updateField<Field extends CheckoutField>(field: Field, value: CheckoutForm[Field]) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function handleCepChange(value: string) {
    const cep = formatCep(value);
    const cepDigits = getDigits(cep);

    updateField("cep", cep);
    cepRequestRef.current?.abort();

    if (cepDigits.length !== 8) {
      setCepStatus("idle");
      return;
    }

    const controller = new AbortController();
    cepRequestRef.current = controller;
    setCepStatus("loading");

    fetchAddressByCep(cepDigits, controller.signal)
      .then((address) => {
        if (!address) {
          setCepStatus("not-found");
          return;
        }

        setForm((currentForm) => ({
          ...currentForm,
          street: address.street || currentForm.street,
          neighborhood: address.neighborhood || currentForm.neighborhood,
          city: address.city || currentForm.city,
        }));
        setCepStatus("found");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;

        setCepStatus("error");
      });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstInvalidField = fieldOrder.find((field) => errors[field]);

    if (firstInvalidField || !form.fulfillment) {
      setShowErrors(true);
      document.getElementById(getFieldId(firstInvalidField ?? "fulfillment"))?.focus();
      return;
    }

    const message = buildOrderMessage({
      items,
      subtotal,
      customerName: form.name,
      customerPhone: form.phone,
      fulfillment: form.fulfillment,
      address: form.fulfillment === "delivery" ? form : undefined,
    });
    const url = getWhatsappOrderUrl(message);

    window.open(url, "_blank", "noopener,noreferrer");
    setOrderUrl(url);
  }

  function handleFinish() {
    clearCart();
    navigate({ to: "/menu" });
  }

  return (
    <main className="min-h-dvh bg-brand-cream pb-24 text-brand-navy">
      <PageTopBar
        title="Finalizar pedido"
        onBack={() => navigate({ to: "/carrinho" })}
        backLabel="Voltar ao carrinho"
      />
      <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        {items.length === 0 ? (
          <EmptyCart onBrowseMenu={() => navigate({ to: "/menu" })} />
        ) : orderUrl ? (
          <OrderSent orderUrl={orderUrl} onEdit={() => setOrderUrl(null)} onFinish={handleFinish} />
        ) : (
          <form className="space-y-8" noValidate onSubmit={handleSubmit}>
            <FormSection title="Seus dados">
              <TextField
                id={getFieldId("name")}
                label="Nome"
                value={form.name}
                onChange={(value) => updateField("name", value)}
                error={showErrors ? errors.name : undefined}
                autoComplete="name"
                maxLength={80}
              />
              <TextField
                id={getFieldId("phone")}
                label="Telefone (WhatsApp)"
                value={form.phone}
                onChange={(value) => updateField("phone", formatPhone(value))}
                error={showErrors ? errors.phone : undefined}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(69) 99999-9999"
              />
            </FormSection>

            <FormSection title="Como você quer receber?">
              <div
                className="grid gap-3 sm:grid-cols-2"
                role="radiogroup"
                aria-label="Forma de recebimento"
                aria-describedby={showErrors && errors.fulfillment ? "checkout-fulfillment-error" : undefined}
              >
                <FulfillmentOption
                  id={getFieldId("fulfillment")}
                  checked={form.fulfillment === "pickup"}
                  icon={<Store size={20} aria-hidden="true" />}
                  title="Retirada"
                  description="Enviamos o endereço para retirada pelo WhatsApp."
                  onSelect={() => updateField("fulfillment", "pickup")}
                />
                <FulfillmentOption
                  id="checkout-fulfillment-delivery"
                  checked={isDelivery}
                  icon={<Bike size={20} aria-hidden="true" />}
                  title="Delivery"
                  description="Taxa de entrega combinada pelo WhatsApp."
                  onSelect={() => updateField("fulfillment", "delivery")}
                />
              </div>
              {showErrors && errors.fulfillment && (
                <FieldError id="checkout-fulfillment-error">{errors.fulfillment}</FieldError>
              )}
            </FormSection>

            {isDelivery && (
              <FormSection title="Endereço de entrega">
                <div>
                  <TextField
                    id={getFieldId("cep")}
                    label="CEP"
                    value={form.cep}
                    onChange={handleCepChange}
                    error={showErrors ? errors.cep : undefined}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                  />
                  <CepStatusMessage status={cepStatus} />
                </div>
                <TextField
                  id={getFieldId("street")}
                  label="Rua"
                  value={form.street}
                  onChange={(value) => updateField("street", value)}
                  error={showErrors ? errors.street : undefined}
                  autoComplete="address-line1"
                  maxLength={120}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    id={getFieldId("number")}
                    label="Número"
                    value={form.number}
                    onChange={(value) => updateField("number", value)}
                    error={showErrors ? errors.number : undefined}
                    maxLength={20}
                  />
                  <TextField
                    id={getFieldId("complement")}
                    label="Complemento"
                    optional
                    value={form.complement}
                    onChange={(value) => updateField("complement", value)}
                    autoComplete="address-line2"
                    maxLength={60}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    id={getFieldId("neighborhood")}
                    label="Bairro"
                    value={form.neighborhood}
                    onChange={(value) => updateField("neighborhood", value)}
                    error={showErrors ? errors.neighborhood : undefined}
                    maxLength={80}
                  />
                  <TextField
                    id={getFieldId("city")}
                    label="Cidade"
                    value={form.city}
                    onChange={(value) => updateField("city", value)}
                    error={showErrors ? errors.city : undefined}
                    autoComplete="address-level2"
                    maxLength={80}
                  />
                </div>
                <TextField
                  id={getFieldId("reference")}
                  label="Ponto de referência"
                  optional
                  value={form.reference}
                  onChange={(value) => updateField("reference", value)}
                  maxLength={120}
                />
              </FormSection>
            )}

            <FormSection title="Resumo do pedido">
              <div className="rounded-3xl border border-brand-gold/30 bg-white p-5 shadow-card sm:p-6">
                <ul className="divide-y divide-brand-gold/20">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-4 py-3 first:pt-0">
                      <div className="min-w-0">
                        <p className="font-extrabold">
                          {item.quantity}x {item.product.name}
                        </p>
                        {getSelectionSummary(item.product.customizationGroups ?? [], item.optionQuantities).map(
                          ({ title, value }) => (
                            <p key={title} className="text-sm text-brand-navy/65">
                              {title}: {value}
                            </p>
                          ),
                        )}
                        {item.note && <p className="break-words text-sm text-brand-navy/55">Obs.: {item.note}</p>}
                      </div>
                      <span className="shrink-0 font-bold">{formatPrice(item.totalPrice)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-3 space-y-1.5 border-t border-brand-gold/30 pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="font-extrabold">Subtotal</dt>
                    <dd className="text-lg font-extrabold text-brand-gold-dark">{formatPrice(subtotal)}</dd>
                  </div>
                  {isDelivery && (
                    <div className="flex justify-between gap-4 text-brand-navy/65">
                      <dt>Taxa de entrega</dt>
                      <dd>A combinar</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 text-brand-navy/65">
                    <dt>Pagamento</dt>
                    <dd>Pix</dd>
                  </div>
                </dl>
              </div>
            </FormSection>

            <div>
              <button
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 text-sm font-extrabold text-brand-navy transition hover:bg-[#e8c17c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                type="submit"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Enviar pedido pelo WhatsApp
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-brand-navy/60">
                Vamos abrir o WhatsApp com o seu pedido pronto. É só enviar a mensagem para a gente confirmar.
              </p>
            </div>
          </form>
        )}
      </section>
      <MenuBottomNav activePage="cart" />
    </main>
  );
}

type OrderSentProps = { orderUrl: string; onEdit: () => void; onFinish: () => void };

function OrderSent({ orderUrl, onEdit, onFinish }: OrderSentProps) {
  return (
    <div className="rounded-3xl border border-brand-gold/30 bg-white p-6 text-center shadow-card sm:p-8" role="status">
      <MessageCircle className="mx-auto text-brand-gold-dark" size={36} aria-hidden="true" />
      <h2 className="mt-4 text-xl font-extrabold">Seu pedido está pronto no WhatsApp</h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
        Envie a mensagem por lá para concluir. Vamos confirmar o pedido e combinar os próximos passos com você.
      </p>
      <a
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 text-sm font-extrabold text-brand-navy transition hover:bg-[#e8c17c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        href={orderUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        O WhatsApp não abriu? Toque aqui
      </a>
      <div className="mt-6 flex flex-col gap-3 border-t border-brand-gold/25 pt-6 sm:flex-row sm:justify-center">
        <button
          className="rounded-xl bg-brand-navy px-5 py-3 text-sm font-extrabold text-brand-cream transition hover:bg-brand-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          type="button"
          onClick={onFinish}
        >
          Já enviei, esvaziar carrinho
        </button>
        <button
          className="rounded-xl border border-brand-gold/45 px-5 py-3 text-sm font-bold text-brand-navy transition hover:bg-brand-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          type="button"
          onClick={onEdit}
        >
          Voltar e editar
        </button>
      </div>
    </div>
  );
}

type FormSectionProps = { title: string; children: ReactNode };

function FormSection({ title, children }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

type FulfillmentOptionProps = {
  id: string;
  checked: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  onSelect: () => void;
};

function FulfillmentOption({ id, checked, icon, title, description, onSelect }: FulfillmentOptionProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition focus-within:ring-2 focus-within:ring-brand-gold/35 ${
        checked ? "border-brand-gold bg-white" : "border-brand-gold/30 bg-white/65 hover:border-brand-gold/65"
      }`}
      htmlFor={id}
    >
      <input
        className="mt-1 size-4 accent-brand-navy"
        id={id}
        type="radio"
        name="fulfillment"
        checked={checked}
        onChange={onSelect}
      />
      <span className="mt-0.5 text-brand-gold-dark">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-extrabold">{title}</span>
        <span className="mt-0.5 block text-sm text-brand-navy/65">{description}</span>
      </span>
    </label>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  type?: "text" | "tel";
  inputMode?: "text" | "tel" | "numeric";
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
};

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  optional = false,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  maxLength,
}: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold" htmlFor={id}>
        {label}
        {optional && <span className="font-medium text-brand-navy/55"> (opcional)</span>}
      </label>
      <input
        className={`w-full rounded-xl border bg-white px-3 py-3 outline-none placeholder:text-brand-navy/40 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25 ${
          error ? "border-brand-gold-dark" : "border-brand-gold/35"
        }`}
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p className="mt-1.5 text-xs font-bold text-brand-gold-dark" id={id}>
      {children}
    </p>
  );
}

function CepStatusMessage({ status }: { status: CepStatus }) {
  const messages: Record<CepStatus, ReactNode> = {
    idle: null,
    loading: (
      <span className="inline-flex items-center gap-1.5">
        <LoaderCircle className="animate-spin motion-reduce:animate-none" size={14} aria-hidden="true" />
        Buscando endereço...
      </span>
    ),
    found: "Endereço encontrado. Confira e complete os dados.",
    "not-found": "Não encontramos esse CEP. Preencha o endereço manualmente.",
    error: "Não foi possível buscar o CEP agora. Preencha o endereço manualmente.",
  };

  return (
    <p className="mt-1.5 min-h-4 text-xs font-semibold text-brand-navy/60" aria-live="polite">
      {messages[status]}
    </p>
  );
}

function validateCheckout(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const phoneDigits = getDigits(form.phone);

  if (form.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (phoneDigits.length < 10 || phoneDigits.length > 11) errors.phone = "Informe um telefone com DDD.";
  if (!form.fulfillment) errors.fulfillment = "Escolha retirada ou delivery.";

  if (form.fulfillment === "delivery") {
    if (getDigits(form.cep).length !== 8) errors.cep = "Informe um CEP com 8 números.";
    if (!form.street.trim()) errors.street = "Informe a rua.";
    if (!form.number.trim()) errors.number = "Informe o número (ou \"s/n\").";
    if (!form.neighborhood.trim()) errors.neighborhood = "Informe o bairro.";
    if (!form.city.trim()) errors.city = "Informe a cidade.";
  }

  return errors;
}

function getFieldId(field: CheckoutField) {
  return field === "fulfillment" ? "checkout-fulfillment-pickup" : `checkout-${field}`;
}

function getDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatPhone(value: string) {
  const digits = getDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCep(value: string) {
  const digits = getDigits(value).slice(0, 8);

  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}
