export type OrderType = "delivery" | "pickup";

export interface StoreSettings {
  name: string;
  description: string;
  whatsappNumber: string;
  logoUrl: string;
  coverImageUrl: string;
  address: string;
  openingHours: string;
  instagramUrl: string;
  minimumOrderValue: number;
  deliveryFee: number;
  acceptsDelivery: boolean;
  acceptsPickup: boolean;
  isOpen: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  categoryId: string;
  imageUrl: string;
  available: boolean;
  featured: boolean;
  preparationTime?: string;
  addOns?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  sortOrder: number;
}

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

export interface AppData {
  store: StoreSettings;
  categories: Category[];
  products: Product[];
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}
