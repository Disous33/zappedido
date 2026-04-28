import { useEffect, useState } from "react";
import { storeService } from "../services/storeService";
import { Store } from "../types";
import { useAuth } from "./useAuth";

export const useStore = () => {
  const { user } = useAuth();
  const [store, setStore] = useState<Store | null>(() => (user ? storeService.getByOwner(user.id) : null));

  useEffect(() => {
    const sync = () => setStore(user ? storeService.getByOwner(user.id) : null);
    sync();
    window.addEventListener("zappedido:data-change", sync);
    return () => window.removeEventListener("zappedido:data-change", sync);
  }, [user]);

  const updateStore = (nextStore: Store) => {
    const saved = storeService.update(nextStore);
    setStore(saved);
    return saved;
  };

  return { store, updateStore };
};
