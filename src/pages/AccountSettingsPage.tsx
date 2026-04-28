import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";

export const AccountSettingsPage = () => {
  const { user, logout } = useAuth();
  const [draft, setDraft] = useState(user);
  if (!draft) return null;

  return (
    <DashboardLayout>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Card className="p-5">
          <h1 className="text-2xl font-black text-ink">Dados da conta</h1>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input label="Nome" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            <Input label="Telefone" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
            <Input label="E-mail" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
            <Button className="self-end" onClick={() => authService.updateUser(draft)}>Salvar conta</Button>
          </div>
        </Card>
        <Card className="border-red-100 p-5">
          <h2 className="text-xl font-black text-red-700">Zona de perigo</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">Exclusão de loja ficará disponível quando o banco Firestore estiver conectado.</p>
          <Button className="mt-5 w-full" variant="secondary" onClick={logout}>Sair da conta</Button>
          <Button className="mt-2 w-full" variant="danger" onClick={() => window.alert("Exclusão permanente será ativada com backend de produção.")}>Excluir loja</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};
