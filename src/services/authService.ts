import { LoginPayload, RegisterPayload, Store, Subscription, User } from "../types";
import { addDays, nowIso } from "../utils/dateUtils";
import { createUniqueSlug } from "../utils/generateSlug";
import { createId } from "../utils/id";
import { localDatabase } from "./localDatabase";

const hashPassword = (password: string) => btoa(password);

export const authService = {
  getCurrentUser() {
    const userId = localDatabase.getSessionUserId();
    if (!userId) return null;
    return localDatabase.getData().users.find((user) => user.id === userId) ?? null;
  },
  register(payload: RegisterPayload) {
    const data = localDatabase.getData();
    const email = payload.email.trim().toLowerCase();
    if (data.users.some((user) => user.email.toLowerCase() === email)) {
      throw new Error("Este e-mail já está cadastrado.");
    }
    if (payload.password.length < 6) {
      throw new Error("A senha precisa ter pelo menos 6 caracteres.");
    }
    if (payload.password !== payload.confirmPassword) {
      throw new Error("As senhas não conferem.");
    }

    const userId = createId("user");
    const storeId = createId("store");
    const date = nowIso();
    const slug = createUniqueSlug(payload.storeName, data.stores.map((store) => store.slug));
    const user: User = {
      id: userId,
      name: payload.name.trim(),
      email,
      phone: payload.phone.trim(),
      passwordHash: hashPassword(payload.password),
      createdAt: date,
      updatedAt: date,
    };
    const store: Store = {
      id: storeId,
      ownerId: userId,
      name: payload.storeName.trim(),
      slug,
      businessType: payload.businessType,
      description: "",
      whatsappNumber: payload.phone.trim(),
      logoUrl: "",
      coverImageUrl: "",
      address: "",
      city: "",
      state: "",
      openingHours: "",
      instagramUrl: "",
      minimumOrderValue: 0,
      deliveryFee: 0,
      acceptsDelivery: true,
      acceptsPickup: true,
      isOpen: false,
      isActive: true,
      subscriptionStatus: "trialing",
      plan: "trial",
      trialEndsAt: addDays(new Date(), 7).toISOString(),
      createdAt: date,
      updatedAt: date,
    };
    const subscription: Subscription = {
      id: createId("subscription"),
      userId,
      storeId,
      plan: "trial",
      status: "trialing",
      paymentProvider: "manual_whatsapp",
      startedAt: date,
      expiresAt: store.trialEndsAt,
      createdAt: date,
      updatedAt: date,
    };

    localDatabase.saveData({
      ...data,
      users: [...data.users, user],
      stores: [...data.stores, store],
      subscriptions: [...data.subscriptions, subscription],
    });
    localDatabase.setSessionUserId(user.id);
    return user;
  },
  login(payload: LoginPayload) {
    const email = payload.email.trim().toLowerCase();
    const user = localDatabase.getData().users.find((item) => item.email.toLowerCase() === email);
    if (!user || user.passwordHash !== hashPassword(payload.password)) {
      throw new Error("E-mail ou senha inválidos.");
    }
    localDatabase.setSessionUserId(user.id);
    return user;
  },
  logout() {
    localDatabase.clearSession();
  },
  recoverPassword(email: string) {
    const exists = localDatabase.getData().users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase());
    if (!exists) throw new Error("Não encontramos uma conta com esse e-mail.");
    return true;
  },
  updateUser(user: User) {
    const data = localDatabase.getData();
    localDatabase.saveData({ ...data, users: data.users.map((item) => (item.id === user.id ? { ...user, updatedAt: nowIso() } : item)) });
  },
};
