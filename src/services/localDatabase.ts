import { AppData } from "../types";

const DATA_KEY = "meuzappedido.production.data";
const SESSION_KEY = "meuzappedido.production.session";

const emptyData: AppData = {
  users: [],
  stores: [],
  categories: [],
  products: [],
  orders: [],
  subscriptions: [],
};

export const localDatabase = {
  getData(): AppData {
    const rawData = localStorage.getItem(DATA_KEY);
    if (!rawData) {
      this.saveData(emptyData);
      return emptyData;
    }

    try {
      const parsed = JSON.parse(rawData) as AppData;
      if (!parsed.users || !parsed.stores || !parsed.products || !parsed.orders) throw new Error("Invalid data");
      return parsed;
    } catch {
      this.saveData(emptyData);
      return emptyData;
    }
  },
  saveData(data: AppData) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("zappedido:data-change"));
  },
  getSessionUserId() {
    return localStorage.getItem(SESSION_KEY);
  },
  setSessionUserId(userId: string) {
    localStorage.setItem(SESSION_KEY, userId);
    window.dispatchEvent(new Event("zappedido:auth-change"));
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("zappedido:auth-change"));
  },
};

export const firebaseIntegrationNotes = {
  auth: "Replace authService methods with Firebase Auth createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail and onAuthStateChanged.",
  firestore: "Replace localDatabase calls in services with Firestore collections: users, stores, categories, products, orders and subscriptions.",
};
