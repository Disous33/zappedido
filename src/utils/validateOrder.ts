import { CartItem, CustomerInfo, OrderType, Store } from "../types";
import { formatCurrency } from "./formatCurrency";
import { sanitizeWhatsAppNumber } from "./sanitizeWhatsAppNumber";

export type OrderValidationErrors = Partial<Record<keyof CustomerInfo | "cart" | "whatsapp" | "orderType", string>>;

export const validateOrder = (
  store: Store,
  cart: CartItem[],
  customer: CustomerInfo,
  orderType: OrderType,
) => {
  const errors: OrderValidationErrors = {};
  const subtotal = cart.reduce((sum, item) => sum + (item.product.promotionalPrice ?? item.product.price) * item.quantity, 0);

  if (cart.length === 0) errors.cart = "Adicione pelo menos um produto ao carrinho.";
  if (!customer.name.trim()) errors.name = "Informe seu nome.";
  if (!customer.phone.trim()) errors.phone = "Informe seu telefone.";
  if (orderType === "delivery" && !customer.address.trim()) errors.address = "Informe o endereço de entrega.";
  if (!sanitizeWhatsAppNumber(store.whatsappNumber)) errors.whatsapp = "O WhatsApp da loja não foi configurado.";
  if (subtotal < store.minimumOrderValue) errors.cart = `O pedido mínimo é ${formatCurrency(store.minimumOrderValue)}.`;
  if (orderType === "delivery" && !store.acceptsDelivery) errors.orderType = "Esta loja não aceita entrega.";
  if (orderType === "pickup" && !store.acceptsPickup) errors.orderType = "Esta loja não aceita retirada.";

  return errors;
};
