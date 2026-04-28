import { Category, Product } from "../../types";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Toggle } from "../ui/Toggle";

interface AdminProductFormProps {
  product: Product;
  categories: Category[];
  onChange: (product: Product) => void;
}

export const AdminProductForm = ({ product, categories, onChange }: AdminProductFormProps) => {
  const update = <K extends keyof Product>(key: K, value: Product[K]) => onChange({ ...product, [key]: value });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Input label="Nome do produto" value={product.name} onChange={(event) => update("name", event.target.value)} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-stone-700">Categoria</span>
        <select
          className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-ember-500 focus:ring-4 focus:ring-orange-100"
          value={product.categoryId}
          onChange={(event) => update("categoryId", event.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <div className="lg:col-span-2">
        <Textarea label="Descrição" value={product.description} onChange={(event) => update("description", event.target.value)} />
      </div>
      <Input label="Preço" type="number" min="0" step="0.01" value={product.price} onChange={(event) => update("price", Number(event.target.value))} />
      <Input
        label="Preço promocional"
        type="number"
        min="0"
        step="0.01"
        value={product.promotionalPrice ?? ""}
        onChange={(event) => update("promotionalPrice", event.target.value ? Number(event.target.value) : undefined)}
      />
      <Input label="URL da imagem" value={product.imageUrl} onChange={(event) => update("imageUrl", event.target.value)} />
      <Input label="Tempo de preparo" value={product.preparationTime ?? ""} onChange={(event) => update("preparationTime", event.target.value)} />
      <div className="lg:col-span-2">
        <Textarea label="Adicionais opcionais" value={product.addOns ?? ""} onChange={(event) => update("addOns", event.target.value)} />
      </div>
      <div className="grid gap-3 lg:col-span-2 lg:grid-cols-2">
        <Toggle label="Produto disponível" checked={product.available} onChange={(checked) => update("available", checked)} />
        <Toggle label="Produto em destaque" checked={product.featured} onChange={(checked) => update("featured", checked)} />
      </div>
    </div>
  );
};
