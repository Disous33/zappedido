import { Store } from "../types";
import { nowIso } from "../utils/dateUtils";
import { createUniqueSlug } from "../utils/generateSlug";
import { localDatabase } from "./localDatabase";

export const storeService = {
  getByOwner(ownerId: string) {
    return localDatabase.getData().stores.find((store) => store.ownerId === ownerId) ?? null;
  },
  getBySlug(slug: string) {
    return localDatabase.getData().stores.find((store) => store.slug === slug) ?? null;
  },
  update(store: Store) {
    const data = localDatabase.getData();
    const existing = data.stores.find((item) => item.id === store.id);
    const reservedSlugs = data.stores.filter((item) => item.id !== store.id).map((item) => item.slug);
    const slug = existing && existing.name === store.name ? store.slug : createUniqueSlug(store.name, reservedSlugs);
    const nextStore = { ...store, slug, updatedAt: nowIso() };
    localDatabase.saveData({ ...data, stores: data.stores.map((item) => (item.id === store.id ? nextStore : item)) });
    return nextStore;
  },
};
