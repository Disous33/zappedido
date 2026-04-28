import { CartItem, CustomerInfo, OrderType, StoreSettings } from "../types";
import { formatCurrency } from "./currency";

export const sanitizeWhatsAppNumber = (value: string) => value.replace(/\D/g, "");

export const buildWhatsAppMessage = (
  store: StoreSettings,
  items: CartItem[],
  customer: CustomerInfo,
  orderType: OrderType,
) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.promotionalPrice ?? item.product.price) * item.quantity, 0);
  const deliveryFee = orderType === "delivery" ? store.deliveryFee : 0;
  const total = subtotal + deliveryFee;
  const itemLines = items
    .map((item) => {
      const price = (item.product.promotionalPrice ?? item.product.price) * item.quantity;
      return `${item.quantity}x ${item.product.name} - ${formatCurrency(price)}`;
    })
    .join("\n");

  return [
    "Olá! Gostaria de fazer um pedido pelo ZapPedido.",
    "",
    `Loja: ${store.name}`,
    "",
    "Cliente:",
    `Nome: ${customer.name}`,
    `Telefone: ${customer.phone}`,
    "",
    `Tipo de pedido: ${orderType === "delivery" ? "Entrega" : "Retirada"}`,
    "",
    ...(orderType === "delivery" ? ["Endereço:", customer.address, ""] : []),
    "Itens:",
    itemLines,
    "",
    "Observações:",
    customer.notes || "Sem observações.",
    "",
    "Resumo:",
    `Subtotal: ${formatCurrency(subtotal)}`,
    `Taxa de entrega: ${formatCurrency(deliveryFee)}`,
    `Total: ${formatCurrency(total)}`,
    "",
    "Por favor, confirme meu pedido.",
  ].join("\n");
};

export const buildWhatsAppUrl = (
  store: StoreSettings,
  items: CartItem[],
  customer: CustomerInfo,
  orderType: OrderType,
) => {
  const phone = sanitizeWhatsAppNumber(store.whatsappNumber);
  const message = buildWhatsAppMessage(store, items, customer, orderType);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
