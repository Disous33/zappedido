import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import { Order, OrderStatus } from "../types";

export const useOrders = (storeId?: string) => {
  const [orders, setOrders] = useState<Order[]>(() => (storeId ? orderService.list(storeId) : []));
  const refresh = () => setOrders(storeId ? orderService.list(storeId) : []);

  useEffect(() => {
    refresh();
    window.addEventListener("zappedido:data-change", refresh);
    return () => window.removeEventListener("zappedido:data-change", refresh);
  }, [storeId]);

  return {
    orders,
    updateOrderStatus: (orderId: string, status: OrderStatus) => {
      orderService.updateStatus(orderId, status);
      refresh();
    },
  };
};
