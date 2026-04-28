import { Clock, Instagram, MapPin } from "lucide-react";
import { StoreSettings } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

interface StoreHeaderProps {
  store: StoreSettings;
}

export const StoreHeader = ({ store }: StoreHeaderProps) => (
  <section className="overflow-hidden rounded-b-[2rem] bg-white shadow-soft">
    <div className="relative h-44 bg-stone-200 sm:h-56">
      {store.coverImageUrl ? <img src={store.coverImageUrl} alt="" className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gradient-to-br from-orange-200 via-amber-100 to-red-100" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/5" />
      <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
        {store.logoUrl ? (
          <img src={store.logoUrl} alt={`Logo ${store.name}`} className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-lg" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-ember-600 text-2xl font-black text-white shadow-lg">
            {store.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 pb-1 text-white">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${store.isOpen ? "bg-green-500" : "bg-red-500"}`}>
            {store.isOpen ? "Aberto agora" : "Fechado"}
          </span>
          <h1 className="mt-2 truncate text-2xl font-black sm:text-4xl">{store.name}</h1>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-6xl px-4 py-5">
      <p className="text-sm leading-6 text-stone-700 sm:text-base">{store.description}</p>
      <div className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2 lg:grid-cols-4">
        <span className="flex items-center gap-2"><MapPin size={16} /> {store.address}</span>
        <span className="flex items-center gap-2"><Clock size={16} /> {store.openingHours}</span>
        <span>Pedido mínimo: <strong>{formatCurrency(store.minimumOrderValue)}</strong></span>
        {store.instagramUrl ? (
          <a className="flex items-center gap-2 font-semibold text-ember-700" href={store.instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} /> Instagram
          </a>
        ) : null}
      </div>
    </div>
  </section>
);
