import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { PriceDisplay } from "../components/PriceDisplay";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { Toggle } from "../components/ui/Toggle";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import { useStore } from "../hooks/useStore";
import { Product } from "../types";
import { nowIso } from "../utils/dateUtils";
import { createId } from "../utils/id";

const foodPlaceholder = "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80";

export const ProductsPage = () => {
  const { store } = useStore();
  const { products, saveProduct, deleteProduct } = useProducts(store?.id);
  const { categories } = useCategories(store?.id);
  const [draft, setDraft] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  if (!store) return null;

  const filtered = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.categoryId === categoryFilter;
    const matchesAvailability = availabilityFilter === "all" || (availabilityFilter === "available" ? product.available : !product.available);
    return matchesSearch && matchesCategory && matchesAvailability;
  }), [availabilityFilter, categoryFilter, products, search]);

  const createProduct = () => {
    const date = nowIso();
    setDraft({
      id: createId("product"),
      storeId: store.id,
      categoryId: categories[0]?.id ?? "",
      name: "",
      description: "",
      price: 0,
      imageUrl: foodPlaceholder,
      available: true,
      featured: false,
      preparationTime: "20 min",
      createdAt: date,
      updatedAt: date,
    });
  };

  return (
    <DashboardLayout>
      <Card className="p-5">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-black text-ink">Produtos</h1>
            <p className="mt-1 text-sm text-stone-600">Crie, edite, destaque e controle disponibilidade.</p>
          </div>
          <Button icon={<Plus size={17} />} onClick={createProduct}>Criar produto</Button>
        </div>
        <div className="mb-5 grid gap-3 lg:grid-cols-3">
          <Input label="Buscar produto" value={search} onChange={(event) => setSearch(event.target.value)} />
          <Select label="Categoria" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">Todas</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </Select>
          <Select label="Disponibilidade" value={availabilityFilter} onChange={(event) => setAvailabilityFilter(event.target.value)}>
            <option value="all">Todos</option>
            <option value="available">Disponíveis</option>
            <option value="unavailable">Indisponíveis</option>
          </Select>
        </div>
        <div className="grid gap-3">
          {filtered.length ? filtered.map((product) => (
            <div key={product.id} className="grid gap-3 rounded-2xl border border-stone-100 p-3 sm:grid-cols-[80px_1fr_auto] sm:items-center">
              <img src={product.imageUrl} alt="" className="h-20 w-20 rounded-xl object-cover" />
              <div>
                <h3 className="font-black text-ink">{product.name}</h3>
                <p className="line-clamp-1 text-sm text-stone-600">{product.description}</p>
                <PriceDisplay price={product.price} promotionalPrice={product.promotionalPrice} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => saveProduct({ ...product, available: !product.available })}>{product.available ? "Pausar" : "Ativar"}</Button>
                <Button variant="secondary" onClick={() => saveProduct({ ...product, featured: !product.featured })}>{product.featured ? "Remover destaque" : "Destacar"}</Button>
                <Button variant="secondary" onClick={() => setDraft(product)}>Editar</Button>
                <Button variant="danger" className="px-3" onClick={() => window.confirm("Excluir produto?") && deleteProduct(product.id)}><Trash2 size={16} /></Button>
              </div>
            </div>
          )) : <EmptyState title="Você ainda não cadastrou nenhum produto." description="Adicione produtos com preço, descrição e disponibilidade para publicar seu cardápio." action={<Button onClick={createProduct}>Adicionar produto</Button>} />}
        </div>
      </Card>

      <Modal open={Boolean(draft)} title={draft?.name ? "Editar produto" : "Criar produto"} onClose={() => setDraft(null)}>
        {draft ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <Input label="Nome" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            <Select label="Categoria" value={draft.categoryId} onChange={(event) => setDraft({ ...draft, categoryId: event.target.value })}>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
            <div className="lg:col-span-2"><Textarea label="Descrição" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></div>
            <Input label="Preço" type="number" value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })} />
            <Input label="Preço promocional" type="number" value={draft.promotionalPrice ?? ""} onChange={(event) => setDraft({ ...draft, promotionalPrice: event.target.value ? Number(event.target.value) : undefined })} />
            <Input label="Imagem URL" value={draft.imageUrl} onChange={(event) => setDraft({ ...draft, imageUrl: event.target.value })} />
            <Input label="Tempo de preparo" value={draft.preparationTime} onChange={(event) => setDraft({ ...draft, preparationTime: event.target.value })} />
            <Toggle label="Disponível" checked={draft.available} onChange={(checked) => setDraft({ ...draft, available: checked })} />
            <Toggle label="Destaque" checked={draft.featured} onChange={(checked) => setDraft({ ...draft, featured: checked })} />
            <Button className="lg:col-span-2" onClick={() => { saveProduct(draft); setDraft(null); }}>Salvar produto</Button>
          </div>
        ) : null}
      </Modal>
    </DashboardLayout>
  );
};
