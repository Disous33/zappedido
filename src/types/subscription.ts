import { Plan, SubscriptionStatus } from "./store";

export interface Subscription {
  id: string;
  userId: string;
  storeId: string;
  plan: Plan;
  status: SubscriptionStatus;
  paymentProvider: "manual_whatsapp" | "stripe" | "mercado_pago";
  startedAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanDefinition {
  id: Plan | "setup";
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}
