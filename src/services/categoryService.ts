import { Category } from "../types";
import { nowIso } from "../utils/dateUtils";
import { createId } from "../utils/id";
import { localDatabase } from "./localDatabase";

export const categoryService = {
  list(storeId: string) {
    return localDatabase.getData().categories.filter((category) => category.storeId === storeId).sort((a, b) => a.sortOrder - b.sortOrder);
  },
  save(category: Category) {
    const data = localDatabase.getData();
    const date = nowIso();
    const exists = data.categories.some((item) => item.id === category.id);
    const nextCategory = { ...category, id: category.id || createId("category"), updatedAt: date, createdAt: category.createdAt || date };
    localDatabase.saveData({
      ...data,
      categories: exists ? data.categories.map((item) => (item.id === category.id ? nextCategory : item)) : [...data.categories, nextCategory],
    });
    return nextCategory;
  },
  delete(categoryId: string) {
    const data = localDatabase.getData();
    localDatabase.saveData({
      ...data,
      categories: data.categories.filter((category) => category.id !== categoryId),
      products: data.products.filter((product) => product.categoryId !== categoryId),
    });
  },
};
