import { Product } from "./product";

export type OrderType = "delivery" | "pickup";
export type OrderStatus = "new" | "sent_to_whatsapp" | "preparing" | "finished" | "cancelled";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  storeId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderType: OrderType;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes: string;
  status: OrderStatus;
  createdAt: string;
}
