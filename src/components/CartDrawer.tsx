import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { CartItem, CustomerInfo, OrderType, StoreSettings } from "../types";
import { formatCurrency } from "../utils/currency";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Modal } from "./ui/Modal";
import { Textarea } from "./ui/Textarea";

interface CartDrawerProps {
  open: boolean;
  store: StoreSettings;
  items: CartItem[];
  orderType: OrderType;
  customer: CustomerInfo;
  errors: Partial<Record<keyof CustomerInfo | "cart" | "whatsapp", string>>;
  onClose: () => void;
  onOrderTypeChange: (type: OrderType) => void;
  onCustomerChange: (customer: CustomerInfo) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onSubmit: () => void;
}

export const CartDrawer = ({
  open,
  store,
  items,
  orderType,
  customer,
  errors,
  onClose,
  onOrderTypeChange,
  onCustomerChange,
  onIncrement,
  onDecrement,
  onRemove,
  onSubmit,
}: CartDrawerProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.promotionalPrice ?? item.product.price) * item.quantity, 0);
  const deliveryFee = orderType === "delivery" ? store.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  return (
    <Modal open={open} title="Seu pedido" onClose={onClose}>
      <div className="space-y-5">
        {errors.cart ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errors.cart}</p> : null}
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-orange-50 p-6 text-center">
              <ShoppingBag className="mx-auto text-ember-600" />
              <p className="mt-2 font-bold text-stone-700">Seu carrinho está vazio.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 rounded-2xl border border-stone-100 p-3">
                <img src={item.product.imageUrl} alt="" className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-ink">{item.product.name}</h3>
                  <p className="text-sm font-bold text-ember-700">{formatCurrency((item.product.promotionalPrice ?? item.product.price) * item.quantity)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="secondary" className="h-9 min-h-9 w-9 px-0" onClick={() => onDecrement(item.product.id)} aria-label="Diminuir">
                      <Minus size={15} />
                    </Button>
                    <span className="w-8 text-center font-black">{item.quantity}</span>
                    <Button variant="secondary" className="h-9 min-h-9 w-9 px-0" onClick={() => onIncrement(item.product.id)} aria-label="Aumentar">
                      <Plus size={15} />
                    </Button>
                    <Button variant="ghost" className="ml-auto h-9 min-h-9 w-9 px-0 text-red-600" onClick={() => onRemove(item.product.id)} aria-label="Remover">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-stone-100 p-1">
          <button type="button" disabled={!store.acceptsDelivery} onClick={() => onOrderTypeChange("delivery")} className={`rounded-xl px-3 py-3 text-sm font-black transition disabled:opacity-40 ${orderType === "delivery" ? "bg-white text-ember-700 shadow-sm" : "text-stone-600"}`}>
            Entrega
          </button>
          <button type="button" disabled={!store.acceptsPickup} onClick={() => onOrderTypeChange("pickup")} className={`rounded-xl px-3 py-3 text-sm font-black transition disabled:opacity-40 ${orderType === "pickup" ? "bg-white text-ember-700 shadow-sm" : "text-stone-600"}`}>
            Retirada
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Nome" value={customer.name} error={errors.name} onChange={(event) => onCustomerChange({ ...customer, name: event.target.value })} />
          <Input label="Telefone" value={customer.phone} error={errors.phone} onChange={(event) => onCustomerChange({ ...customer, phone: event.target.value })} />
          {orderType === "delivery" ? (
            <div className="sm:col-span-2">
              <Input label="Endereço de entrega" value={customer.address} error={errors.address} onChange={(event) => onCustomerChange({ ...customer, address: event.target.value })} />
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <Textarea label="Observações" value={customer.notes} onChange={(event) => onCustomerChange({ ...customer, notes: event.target.value })} placeholder="Ex: tirar cebola, ponto da carne, troco..." />
          </div>
        </div>

        <div className="rounded-2xl bg-stone-50 p-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <div className="mt-2 flex justify-between"><span>Taxa de entrega</span><strong>{formatCurrency(deliveryFee)}</strong></div>
          <div className="mt-3 flex justify-between border-t border-stone-200 pt-3 text-lg"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
        </div>

        {errors.whatsapp ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errors.whatsapp}</p> : null}
        <Button className="w-full" onClick={onSubmit}>Enviar pedido no WhatsApp</Button>
      </div>
    </Modal>
  );
};
