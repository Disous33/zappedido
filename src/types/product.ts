export interface Product {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  imageUrl: string;
  available: boolean;
  featured: boolean;
  preparationTime: string;
  addOns?: string;
  createdAt: string;
  updatedAt: string;
}
