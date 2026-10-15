import { siteConfig } from "../config/site";
import type { ResolvedCartItem } from "./cart";
import { formatPrice } from "./currency";
import { getSelectionSummary } from "./product-customization";

export type FulfillmentMode = "pickup" | "delivery";

export type DeliveryAddress = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  reference: string;
};

export type OrderDetails = {
  items: readonly ResolvedCartItem[];
  subtotal: number;
  customerName: string;
  customerPhone: string;
  fulfillment: FulfillmentMode;
  address?: DeliveryAddress;
};

export function buildOrderMessage({
  items,
  subtotal,
  customerName,
  customerPhone,
  fulfillment,
  address,
}: OrderDetails) {
  const lines = [`Olá, ${siteConfig.name}! Gostaria de fazer um pedido:`, "", "*Itens*"];

  for (const item of items) {
    lines.push(`${item.quantity}x ${item.product.name} - ${formatPrice(item.totalPrice)}`);

    for (const { title, value } of getSelectionSummary(item.product.customizationGroups ?? [], item.optionQuantities)) {
      lines.push(`   ${title}: ${value}`);
    }

    if (item.note) lines.push(`   Obs.: ${item.note}`);
  }

  lines.push(
    "",
    `*Subtotal:* ${formatPrice(subtotal)}`,
    fulfillment === "delivery"
      ? "*Entrega:* Delivery (taxa de entrega a combinar)"
      : "*Entrega:* Retirada (aguardo o endereço para retirada)",
    "*Pagamento:* Pix",
    "",
    "*Cliente*",
    `Nome: ${customerName.trim()}`,
    `Telefone: ${customerPhone}`,
  );

  if (fulfillment === "delivery" && address) {
    const complement = address.complement.trim() ? ` - ${address.complement.trim()}` : "";

    lines.push(
      "",
      "*Endereço de entrega*",
      `${address.street.trim()}, ${address.number.trim()}${complement}`,
      `${address.neighborhood.trim()} - ${address.city.trim()}`,
      `CEP: ${address.cep}`,
    );

    if (address.reference.trim()) lines.push(`Referência: ${address.reference.trim()}`);
  }

  return lines.join("\n");
}

export function getWhatsappOrderUrl(message: string) {
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
