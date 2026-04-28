import { Plan } from "../types";
import { nowIso } from "../utils/dateUtils";
import { localDatabase } from "./localDatabase";

export const subscriptionService = {
  getByStore(storeId: string) {
    return localDatabase.getData().subscriptions.find((subscription) => subscription.storeId === storeId) ?? null;
  },
  requestUpgrade(storeId: string, plan: Plan) {
    const data = localDatabase.getData();
    const date = nowIso();
    localDatabase.saveData({
      ...data,
      stores: data.stores.map((store) => (store.id === storeId ? { ...store, plan, subscriptionStatus: "pending", updatedAt: date } : store)),
      subscriptions: data.subscriptions.map((subscription) =>
        subscription.storeId === storeId ? { ...subscription, plan, status: "pending", updatedAt: date } : subscription,
      ),
    });
  },
};
