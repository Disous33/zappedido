export * from "./auth";
export * from "./category";
export * from "./order";
export * from "./product";
export * from "./store";
export * from "./subscription";

import { Category } from "./category";
import { Order } from "./order";
import { Product } from "./product";
import { Store } from "./store";
import { Subscription } from "./subscription";
import { User } from "./auth";

export interface AppData {
  users: User[];
  stores: Store[];
  categories: Category[];
  products: Product[];
  orders: Order[];
  subscriptions: Subscription[];
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export type StoreSettings = Store;
