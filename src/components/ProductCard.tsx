import { Plus, Star } from "lucide-react";
import { Product } from "../types";
import { PriceDisplay } from "./PriceDisplay";
import { Button } from "./ui/Button";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => (
  <article className={`grid grid-cols-[108px_1fr] gap-3 rounded-2xl border bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft sm:grid-cols-[150px_1fr] ${product.available ? "border-orange-100" : "border-stone-200 opacity-70"}`}>
    <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      {product.featured ? (
        <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-ink shadow">
          <Star size={15} fill="currentColor" />
        </span>
      ) : null}
    </div>
    <div className="flex min-w-0 flex-col">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-black text-ink">{product.name}</h3>
        {!product.available ? <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-bold text-stone-500">Indisponível</span> : null}
      </div>
      <p className="mt-1 line-clamp-2 text-sm leading-5 text-stone-600">{product.description}</p>
      {product.preparationTime ? <span className="mt-2 text-xs font-bold text-stone-500">Preparo: {product.preparationTime}</span> : null}
      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
        <PriceDisplay price={product.price} promotionalPrice={product.promotionalPrice} />
        <Button type="button" className="h-10 min-h-10 shrink-0 px-3" disabled={!product.available} onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name}`}>
          <Plus size={18} />
        </Button>
      </div>
    </div>
  </article>
);
