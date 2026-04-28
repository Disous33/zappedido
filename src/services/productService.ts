import { Product } from "../types";
import { nowIso } from "../utils/dateUtils";
import { createId } from "../utils/id";
import { localDatabase } from "./localDatabase";

export const productService = {
  list(storeId: string) {
    return localDatabase.getData().products.filter((product) => product.storeId === storeId);
  },
  save(product: Product) {
    const data = localDatabase.getData();
    const date = nowIso();
    const exists = data.products.some((item) => item.id === product.id);
    const nextProduct = { ...product, id: product.id || createId("product"), updatedAt: date, createdAt: product.createdAt || date };
    localDatabase.saveData({
      ...data,
      products: exists ? data.products.map((item) => (item.id === product.id ? nextProduct : item)) : [...data.products, nextProduct],
    });
    return nextProduct;
  },
  delete(productId: string) {
    const data = localDatabase.getData();
    localDatabase.saveData({ ...data, products: data.products.filter((product) => product.id !== productId) });
  },
};
