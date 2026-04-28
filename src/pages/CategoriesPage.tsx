import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Textarea } from "../components/ui/Textarea";
import { Toggle } from "../components/ui/Toggle";
import { useCategories } from "../hooks/useCategories";
import { useStore } from "../hooks/useStore";
import { Category } from "../types";
import { nowIso } from "../utils/dateUtils";
import { createId } from "../utils/id";

export const CategoriesPage = () => {
  const { store } = useStore();
  const { categories, saveCategory, deleteCategory } = useCategories(store?.id);
  const [draft, setDraft] = useState<Category | null>(null);
  if (!store) return null;

  const createCategory = () => {
    const date = nowIso();
    setDraft({ id: createId("category"), storeId: store.id, name: "", description: "", active: true, sortOrder: categories.length + 1, createdAt: date, updatedAt: date });
  };

  return (
    <DashboardLayout>
      <Card className="p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-ink">Categorias</h1>
            <p className="mt-1 text-sm text-stone-600">Organize o cardápio e controle a ordem de exibição.</p>
          </div>
          <Button icon={<Plus size={17} />} onClick={createCategory}>Criar</Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {categories.length ? categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-stone-100 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-ink">{category.sortOrder}. {category.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">{category.description || "Sem descrição."}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-black ${category.active ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>{category.active ? "Ativa" : "Oculta"}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => saveCategory({ ...category, active: !category.active })}>Alternar</Button>
                <Button variant="secondary" onClick={() => setDraft(category)}>Editar</Button>
                <Button variant="danger" className="px-3" onClick={() => window.confirm("Excluir categoria e seus produtos?") && deleteCategory(category.id)}><Trash2 size={16} /></Button>
              </div>
            </div>
          )) : (
            <div className="md:col-span-2">
              <EmptyState title="Crie categorias para organizar seu cardápio." description="Use categorias como hambúrgueres, bebidas, combos ou sobremesas." action={<Button onClick={createCategory}>Criar categoria</Button>} />
            </div>
          )}
        </div>
      </Card>
      <Modal open={Boolean(draft)} title={draft?.name ? "Editar categoria" : "Criar categoria"} onClose={() => setDraft(null)}>
        {draft ? (
          <div className="space-y-4">
            <Input label="Nome" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            <Textarea label="Descrição" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
            <Input label="Ordem" type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })} />
            <Toggle label="Ativa" checked={draft.active} onChange={(checked) => setDraft({ ...draft, active: checked })} />
            <Button className="w-full" onClick={() => { saveCategory(draft); setDraft(null); }}>Salvar categoria</Button>
          </div>
        ) : null}
      </Modal>
    </DashboardLayout>
  );
};
