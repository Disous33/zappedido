import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";
import { Category } from "../types";

export const useCategories = (storeId?: string) => {
  const [categories, setCategories] = useState<Category[]>(() => (storeId ? categoryService.list(storeId) : []));
  const refresh = () => setCategories(storeId ? categoryService.list(storeId) : []);

  useEffect(() => {
    refresh();
    window.addEventListener("zappedido:data-change", refresh);
    return () => window.removeEventListener("zappedido:data-change", refresh);
  }, [storeId]);

  return {
    categories,
    saveCategory: (category: Category) => {
      categoryService.save(category);
      refresh();
    },
    deleteCategory: (categoryId: string) => {
      categoryService.delete(categoryId);
      refresh();
    },
  };
};
