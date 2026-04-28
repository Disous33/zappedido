import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { Product } from "../types";

export const useProducts = (storeId?: string) => {
  const [products, setProducts] = useState<Product[]>(() => (storeId ? productService.list(storeId) : []));
  const refresh = () => setProducts(storeId ? productService.list(storeId) : []);

  useEffect(() => {
    refresh();
    window.addEventListener("zappedido:data-change", refresh);
    return () => window.removeEventListener("zappedido:data-change", refresh);
  }, [storeId]);

  return {
    products,
    saveProduct: (product: Product) => {
      productService.save(product);
      refresh();
    },
    deleteProduct: (productId: string) => {
      productService.delete(productId);
      refresh();
    },
  };
};
