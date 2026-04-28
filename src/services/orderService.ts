import { CartItem, CustomerInfo, Order, OrderStatus, OrderType, Store } from "../types";
import { nowIso } from "../utils/dateUtils";
import { createId } from "../utils/id";
import { localDatabase } from "./localDatabase";

export const orderService = {
  list(storeId: string) {
    return localDatabase.getData().orders.filter((order) => order.storeId === storeId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  create(store: Store, cart: CartItem[], customer: CustomerInfo, orderType: OrderType) {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.promotionalPrice ?? item.product.price) * item.quantity, 0);
    const deliveryFee = orderType === "delivery" ? store.deliveryFee : 0;
    const order: Order = {
      id: createId("order"),
      storeId: store.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: orderType === "delivery" ? customer.address : "",
      orderType,
      items: cart.map((item) => {
        const unitPrice = item.product.promotionalPrice ?? item.product.price;
        return { productId: item.product.id, name: item.product.name, quantity: item.quantity, unitPrice, total: unitPrice * item.quantity };
      }),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      notes: customer.notes,
      status: "new",
      createdAt: nowIso(),
    };
    const data = localDatabase.getData();
    localDatabase.saveData({ ...data, orders: [order, ...data.orders] });
    return order;
  },
  updateStatus(orderId: string, status: OrderStatus) {
    const data = localDatabase.getData();
    localDatabase.saveData({ ...data, orders: data.orders.map((order) => (order.id === orderId ? { ...order, status } : order)) });
  },
};
