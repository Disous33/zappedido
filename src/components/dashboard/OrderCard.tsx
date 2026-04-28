import { Order, OrderStatus } from "../../types";
import { formatDateTime } from "../../utils/dateUtils";
import { formatCurrency } from "../../utils/formatCurrency";
import { Select } from "../ui/Select";

const statusLabels: Record<OrderStatus, string> = {
  new: "Novo",
  sent_to_whatsapp: "Enviado para WhatsApp",
  preparing: "Em preparo",
  finished: "Finalizado",
  cancelled: "Cancelado",
};

interface OrderCardProps {
  order: Order;
  onStatusChange: (status: OrderStatus) => void;
}

export const OrderCard = ({ order, onStatusChange }: OrderCardProps) => (
  <article className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="font-black text-ink">{order.customerName}</h3>
        <p className="text-sm text-stone-600">{order.customerPhone} • {formatDateTime(order.createdAt)}</p>
        <p className="mt-1 text-sm font-semibold text-ember-700">{order.orderType === "delivery" ? "Entrega" : "Retirada"} • {formatCurrency(order.total)}</p>
      </div>
      <div className="w-full sm:w-56">
        <Select label="Status" value={order.status} onChange={(event) => onStatusChange(event.target.value as OrderStatus)}>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </div>
    </div>
    <div className="mt-4 rounded-xl bg-stone-50 p-3 text-sm text-stone-700">
      {order.items.map((item) => (
        <p key={item.productId}>{item.quantity}x {item.name} - {formatCurrency(item.total)}</p>
      ))}
      {order.notes ? <p className="mt-2 font-semibold">Obs: {order.notes}</p> : null}
    </div>
  </article>
);
