import { ClipboardList } from "lucide-react";
import { OrderCard } from "../components/dashboard/OrderCard";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { EmptyState } from "../components/ui/EmptyState";
import { useOrders } from "../hooks/useOrders";
import { useStore } from "../hooks/useStore";

export const OrdersPage = () => {
  const { store } = useStore();
  const { orders, updateOrderStatus } = useOrders(store?.id);

  return (
    <DashboardLayout>
      <div className="mb-5">
        <h1 className="text-2xl font-black text-ink">Pedidos</h1>
        <p className="mt-1 text-sm text-stone-600">Registros criados antes do envio para o WhatsApp.</p>
      </div>
      <div className="grid gap-3">
        {orders.length ? orders.map((order) => (
          <OrderCard key={order.id} order={order} onStatusChange={(status) => updateOrderStatus(order.id, status)} />
        )) : <EmptyState icon={<ClipboardList />} title="Nenhum pedido registrado" description="Quando um cliente enviar um pedido pelo cardápio público, ele aparecerá aqui." />}
      </div>
    </DashboardLayout>
  );
};
