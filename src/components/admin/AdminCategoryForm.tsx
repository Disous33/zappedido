import { Category } from "../../types";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Toggle } from "../ui/Toggle";

interface AdminCategoryFormProps {
  category: Category;
  onChange: (category: Category) => void;
}

export const AdminCategoryForm = ({ category, onChange }: AdminCategoryFormProps) => {
  const update = <K extends keyof Category>(key: K, value: Category[K]) => onChange({ ...category, [key]: value });

  return (
    <div className="grid gap-4">
      <Input label="Nome da categoria" value={category.name} onChange={(event) => update("name", event.target.value)} />
      <Textarea label="Descrição" value={category.description ?? ""} onChange={(event) => update("description", event.target.value)} />
      <Input label="Ordem" type="number" value={category.sortOrder} onChange={(event) => update("sortOrder", Number(event.target.value))} />
      <Toggle label="Categoria visível" checked={category.active} onChange={(checked) => update("active", checked)} />
    </div>
  );
};
