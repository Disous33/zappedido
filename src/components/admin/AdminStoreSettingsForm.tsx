import { StoreSettings } from "../../types";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Toggle } from "../ui/Toggle";

interface AdminStoreSettingsFormProps {
  store: StoreSettings;
  onChange: (store: StoreSettings) => void;
}

export const AdminStoreSettingsForm = ({ store, onChange }: AdminStoreSettingsFormProps) => {
  const update = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) => onChange({ ...store, [key]: value });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Input label="Nome da loja" value={store.name} onChange={(event) => update("name", event.target.value)} />
      <Input label="WhatsApp" value={store.whatsappNumber} onChange={(event) => update("whatsappNumber", event.target.value)} />
      <div className="lg:col-span-2">
        <Textarea label="Descrição" value={store.description} onChange={(event) => update("description", event.target.value)} />
      </div>
      <Input label="URL do logo" value={store.logoUrl} onChange={(event) => update("logoUrl", event.target.value)} />
      <Input label="URL da capa" value={store.coverImageUrl} onChange={(event) => update("coverImageUrl", event.target.value)} />
      <Input label="Endereço" value={store.address} onChange={(event) => update("address", event.target.value)} />
      <Input label="Horário de funcionamento" value={store.openingHours} onChange={(event) => update("openingHours", event.target.value)} />
      <Input label="Instagram" value={store.instagramUrl} onChange={(event) => update("instagramUrl", event.target.value)} />
      <Input label="Pedido mínimo" type="number" min="0" step="0.01" value={store.minimumOrderValue} onChange={(event) => update("minimumOrderValue", Number(event.target.value))} />
      <Input label="Taxa de entrega" type="number" min="0" step="0.01" value={store.deliveryFee} onChange={(event) => update("deliveryFee", Number(event.target.value))} />
      <div className="grid gap-3 lg:col-span-2 lg:grid-cols-3">
        <Toggle label="Aceita entrega" checked={store.acceptsDelivery} onChange={(checked) => update("acceptsDelivery", checked)} />
        <Toggle label="Aceita retirada" checked={store.acceptsPickup} onChange={(checked) => update("acceptsPickup", checked)} />
        <Toggle label="Loja aberta" checked={store.isOpen} onChange={(checked) => update("isOpen", checked)} />
      </div>
    </div>
  );
};
