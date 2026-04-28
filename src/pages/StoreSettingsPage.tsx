import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Toggle } from "../components/ui/Toggle";
import { useStore } from "../hooks/useStore";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

export const StoreSettingsPage = () => {
  const { store, updateStore } = useStore();
  const location = useLocation();
  const [saved, setSaved] = useState(false);
  const { categories } = useCategories(store?.id);
  const { products } = useProducts(store?.id);
  if (!store) return null;
  const isReady = Boolean(store.name.trim() && store.whatsappNumber.trim() && categories.some((category) => category.active) && products.some((product) => product.available));
  const onboarding = (location.state as { onboarding?: string } | null)?.onboarding;

  const update = <K extends keyof typeof store>(key: K, value: (typeof store)[K]) => {
    updateStore({ ...store, [key]: value });
    setSaved(false);
  };

  return (
    <DashboardLayout>
      <Card className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-ink">Dados da loja</h1>
            <p className="mt-1 text-sm text-stone-600">Slug atual: <strong>{store.slug}</strong></p>
          </div>
          <Button onClick={() => setSaved(true)}>{saved ? "Salvo" : "Salvar"}</Button>
        </div>
        {onboarding ? <div className="mb-4 rounded-2xl bg-orange-50 p-4 text-sm font-black text-ember-800">{onboarding}</div> : null}
        <div className={`mb-5 rounded-2xl p-4 text-sm font-black ${isReady ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"}`}>
          {isReady ? "Seu cardápio está pronto para compartilhar." : "Seu cardápio ainda não está pronto. Configure dados da loja, crie uma categoria ativa e adicione um produto disponível."}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Input label="Nome da loja" value={store.name} onChange={(event) => update("name", event.target.value)} />
          <Input label="Slug / link público" value={store.slug} onChange={(event) => update("slug", event.target.value)} />
          <Input label="WhatsApp" value={store.whatsappNumber} onChange={(event) => update("whatsappNumber", event.target.value)} />
          <div className="lg:col-span-2"><Textarea label="Descrição" value={store.description} onChange={(event) => update("description", event.target.value)} /></div>
          <Input label="Logo URL" value={store.logoUrl} onChange={(event) => update("logoUrl", event.target.value)} />
          <Input label="Capa URL" value={store.coverImageUrl} onChange={(event) => update("coverImageUrl", event.target.value)} />
          <Input label="Endereço" value={store.address} onChange={(event) => update("address", event.target.value)} />
          <Input label="Cidade" value={store.city} onChange={(event) => update("city", event.target.value)} />
          <Input label="Estado" value={store.state} onChange={(event) => update("state", event.target.value)} />
          <Input label="Horário" value={store.openingHours} onChange={(event) => update("openingHours", event.target.value)} />
          <Input label="Instagram" value={store.instagramUrl} onChange={(event) => update("instagramUrl", event.target.value)} />
          <Input label="Pedido mínimo" type="number" value={store.minimumOrderValue} onChange={(event) => update("minimumOrderValue", Number(event.target.value))} />
          <Input label="Taxa de entrega" type="number" value={store.deliveryFee} onChange={(event) => update("deliveryFee", Number(event.target.value))} />
          <div className="grid gap-3 lg:col-span-2 lg:grid-cols-3">
            <Toggle label="Aceita entrega" checked={store.acceptsDelivery} onChange={(checked) => update("acceptsDelivery", checked)} />
            <Toggle label="Aceita retirada" checked={store.acceptsPickup} onChange={(checked) => update("acceptsPickup", checked)} />
            <Toggle label="Loja aberta" checked={store.isOpen} onChange={(checked) => update("isOpen", checked)} />
            <Toggle label="Cardápio ativo" checked={store.isActive} onChange={(checked) => update("isActive", checked)} />
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};
