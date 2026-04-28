import { Copy, Download, Eye, Package, Plus, RefreshCcw, Save, Store, Trash2, Upload } from "lucide-react";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AdminCategoryForm } from "../components/admin/AdminCategoryForm";
import { AdminProductForm } from "../components/admin/AdminProductForm";
import { AdminStoreSettingsForm } from "../components/admin/AdminStoreSettingsForm";
import { Header } from "../components/Header";
import { PriceDisplay } from "../components/PriceDisplay";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Modal } from "../components/ui/Modal";
import { ToastStack } from "../components/ui/ToastStack";
import { useAppData } from "../hooks/useAppData";
import { useToast } from "../hooks/useToast";
import { AppData, Category, Product } from "../types";
import { createId } from "../utils/id";
import { exportDataFile } from "../utils/storage";

type AdminTab = "store" | "products" | "categories" | "delivery" | "data";

const tabs: Array<{ id: AdminTab; label: string }> = [
  { id: "store", label: "Loja" },
  { id: "products", label: "Produtos" },
  { id: "categories", label: "Categorias" },
  { id: "delivery", label: "Entrega" },
  { id: "data", label: "Dados" },
];

const emptyProduct = (categoryId: string): Product => ({
  id: createId("product"),
  name: "",
  description: "",
  price: 0,
  categoryId,
  imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  available: true,
  featured: false,
});

const emptyCategory = (): Category => ({
  id: createId("category"),
  name: "",
  description: "",
  active: true,
  sortOrder: 99,
});

export const AdminPage = () => {
  const { data, setData, resetData } = useAppData();
  const { toasts, showToast } = useToast();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("store");
  const [productDraft, setProductDraft] = useState<Product | null>(null);
  const [categoryDraft, setCategoryDraft] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "product" | "category"; id: string; name: string } | null>(null);

  const stats = useMemo(() => {
    const availableProducts = data.products.filter((product) => product.available).length;
    const averageTicket = data.products
      .filter((product) => product.featured || product.categoryId === "combos")
      .slice(0, 3)
      .reduce((sum, product) => sum + (product.promotionalPrice ?? product.price), 0) / 3;
    return {
      totalProducts: data.products.length,
      availableProducts,
      categories: data.categories.length,
      averageTicket: Number.isFinite(averageTicket) ? averageTicket : 0,
    };
  }, [data]);

  const saveProduct = () => {
    if (!productDraft?.name.trim()) {
      showToast("error", "Informe o nome do produto.");
      return;
    }
    const exists = data.products.some((product) => product.id === productDraft.id);
    setData({
      ...data,
      products: exists ? data.products.map((product) => (product.id === productDraft.id ? productDraft : product)) : [...data.products, productDraft],
    });
    setProductDraft(null);
    showToast("success", "Produto salvo.");
  };

  const saveCategory = () => {
    if (!categoryDraft?.name.trim()) {
      showToast("error", "Informe o nome da categoria.");
      return;
    }
    const exists = data.categories.some((category) => category.id === categoryDraft.id);
    setData({
      ...data,
      categories: exists ? data.categories.map((category) => (category.id === categoryDraft.id ? categoryDraft : category)) : [...data.categories, categoryDraft],
    });
    setCategoryDraft(null);
    showToast("success", "Categoria salva.");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "product") {
      setData({ ...data, products: data.products.filter((product) => product.id !== deleteTarget.id) });
    } else {
      setData({
        ...data,
        categories: data.categories.filter((category) => category.id !== deleteTarget.id),
        products: data.products.filter((product) => product.categoryId !== deleteTarget.id),
      });
    }
    setDeleteTarget(null);
    showToast("success", "Item excluído.");
  };

  const copyMenuLink = async () => {
    const url = `${window.location.origin}/menu`;
    await navigator.clipboard.writeText(url);
    showToast("success", "Link do cardápio copiado.");
  };

  const importData = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result)) as AppData;
        if (!imported.store || !Array.isArray(imported.products) || !Array.isArray(imported.categories)) {
          throw new Error("Invalid file");
        }
        setData(imported);
        showToast("success", "Dados importados.");
      } catch {
        showToast("error", "Arquivo JSON inválido.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <main className="min-h-screen bg-[#fffaf5]">
      <Header />
      <ToastStack toasts={toasts} />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-ember-700">Painel administrativo</span>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">Gerencie seu cardápio</h1>
            <p className="mt-2 max-w-2xl text-stone-600">Atualize loja, produtos, categorias e dados de entrega. Tudo fica salvo no navegador via LocalStorage.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" icon={<Copy size={17} />} onClick={copyMenuLink}>Copiar link</Button>
            <Link to="/menu"><Button icon={<Eye size={17} />}>Ver cardápio</Button></Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Status", data.store.isOpen ? "Aberta" : "Fechada", <Store key="store" />],
            ["Produtos", String(stats.totalProducts), <Package key="package" />],
            ["Disponíveis", String(stats.availableProducts), <Package key="available" />],
            ["Categorias", String(stats.categories), <Store key="categories" />],
            ["Ticket estimado", new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(stats.averageTicket), <Package key="ticket" />],
          ].map(([label, value, icon]) => (
            <Card key={String(label)} className="p-5">
              <div className="flex items-center justify-between text-ember-600">{icon}<span className="text-xs font-black uppercase text-stone-400">{label}</span></div>
              <p className="mt-4 text-2xl font-black text-ink">{value}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto rounded-2xl border border-orange-100 bg-white p-2">
          {tabs.map((tab) => (
            <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-black transition ${activeTab === tab.id ? "bg-ember-600 text-white" : "text-stone-600 hover:bg-orange-50"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "store" ? (
            <Card className="p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-ink">Configurações da loja</h2>
                <Button icon={<Save size={17} />} onClick={() => showToast("success", "Dados salvos automaticamente.")}>Salvar</Button>
              </div>
              <AdminStoreSettingsForm store={data.store} onChange={(store) => setData({ ...data, store })} />
            </Card>
          ) : null}

          {activeTab === "products" ? (
            <Card className="p-5">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-black text-ink">Produtos</h2>
                <Button icon={<Plus size={17} />} onClick={() => setProductDraft(emptyProduct(data.categories[0]?.id ?? "general"))}>Criar produto</Button>
              </div>
              <div className="grid gap-3">
                {data.products.length ? data.products.map((product) => (
                  <div key={product.id} className="grid gap-3 rounded-2xl border border-stone-100 p-3 sm:grid-cols-[76px_1fr_auto] sm:items-center">
                    <img src={product.imageUrl} alt="" className="h-20 w-20 rounded-xl object-cover" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-ink">{product.name}</h3>
                        <span className={`rounded-full px-2 py-1 text-xs font-black ${product.available ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>{product.available ? "Disponível" : "Indisponível"}</span>
                        {product.featured ? <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-amber-800">Destaque</span> : null}
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-stone-600">{product.description}</p>
                      <PriceDisplay price={product.price} promotionalPrice={product.promotionalPrice} className="mt-1" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" onClick={() => setData({ ...data, products: data.products.map((item) => item.id === product.id ? { ...item, available: !item.available } : item) })}>Disponibilidade</Button>
                      <Button variant="secondary" onClick={() => setData({ ...data, products: data.products.map((item) => item.id === product.id ? { ...item, featured: !item.featured } : item) })}>Destaque</Button>
                      <Button variant="secondary" onClick={() => setProductDraft(product)}>Editar</Button>
                      <Button variant="danger" className="px-3" onClick={() => setDeleteTarget({ type: "product", id: product.id, name: product.name })}><Trash2 size={16} /></Button>
                    </div>
                  </div>
                )) : <EmptyState title="Nenhum produto cadastrado" description="Crie o primeiro item do seu cardápio." />}
              </div>
            </Card>
          ) : null}

          {activeTab === "categories" ? (
            <Card className="p-5">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-black text-ink">Categorias</h2>
                <Button icon={<Plus size={17} />} onClick={() => setCategoryDraft(emptyCategory())}>Criar categoria</Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {data.categories.map((category) => (
                  <div key={category.id} className="rounded-2xl border border-stone-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-ink">{category.name}</h3>
                        <p className="mt-1 text-sm text-stone-600">{category.description || "Sem descrição."}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-black ${category.active ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>{category.active ? "Visível" : "Oculta"}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="secondary" onClick={() => setData({ ...data, categories: data.categories.map((item) => item.id === category.id ? { ...item, active: !item.active } : item) })}>Alternar</Button>
                      <Button variant="secondary" onClick={() => setCategoryDraft(category)}>Editar</Button>
                      <Button variant="danger" className="px-3" onClick={() => setDeleteTarget({ type: "category", id: category.id, name: category.name })}><Trash2 size={16} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {activeTab === "delivery" ? (
            <Card className="p-5">
              <h2 className="mb-5 text-xl font-black text-ink">Entrega e retirada</h2>
              <AdminStoreSettingsForm store={data.store} onChange={(store) => setData({ ...data, store })} />
            </Card>
          ) : null}

          {activeTab === "data" ? (
            <Card className="p-5">
              <h2 className="text-xl font-black text-ink">Exportar, importar e restaurar</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Use JSON para guardar uma cópia do cardápio, migrar para outro navegador ou restaurar os dados de demonstração.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button icon={<Download size={17} />} onClick={() => exportDataFile(data)}>Exportar JSON</Button>
                <Button variant="secondary" icon={<Upload size={17} />} onClick={() => importInputRef.current?.click()}>Importar JSON</Button>
                <Button variant="danger" icon={<RefreshCcw size={17} />} onClick={() => { if (window.confirm("Restaurar os dados demo e apagar alterações locais?")) { resetData(); showToast("success", "Dados demo restaurados."); } }}>Restaurar demo</Button>
              </div>
              <input ref={importInputRef} type="file" accept="application/json" className="hidden" onChange={importData} />
            </Card>
          ) : null}
        </div>
      </section>

      <Modal open={Boolean(productDraft)} title={productDraft?.name ? "Editar produto" : "Criar produto"} onClose={() => setProductDraft(null)}>
        {productDraft ? (
          <div className="space-y-5">
            <AdminProductForm product={productDraft} categories={data.categories} onChange={setProductDraft} />
            <Button className="w-full" onClick={saveProduct}>Salvar produto</Button>
          </div>
        ) : null}
      </Modal>

      <Modal open={Boolean(categoryDraft)} title={categoryDraft?.name ? "Editar categoria" : "Criar categoria"} onClose={() => setCategoryDraft(null)}>
        {categoryDraft ? (
          <div className="space-y-5">
            <AdminCategoryForm category={categoryDraft} onChange={setCategoryDraft} />
            <Button className="w-full" onClick={saveCategory}>Salvar categoria</Button>
          </div>
        ) : null}
      </Modal>

      <Modal open={Boolean(deleteTarget)} title="Confirmar exclusão" onClose={() => setDeleteTarget(null)}>
        <p className="text-stone-700">Deseja excluir <strong>{deleteTarget?.name}</strong>? Essa ação não pode ser desfeita.</p>
        {deleteTarget?.type === "category" ? <p className="mt-2 text-sm font-semibold text-red-600">Produtos desta categoria também serão removidos.</p> : null}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </div>
      </Modal>
    </main>
  );
};
