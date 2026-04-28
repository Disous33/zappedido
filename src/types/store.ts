export type SubscriptionStatus = "trialing" | "active" | "pending" | "expired" | "inactive";
export type Plan = "trial" | "starter" | "pro";

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  businessType: string;
  description: string;
  whatsappNumber: string;
  logoUrl: string;
  coverImageUrl: string;
  address: string;
  city: string;
  state: string;
  openingHours: string;
  instagramUrl: string;
  minimumOrderValue: number;
  deliveryFee: number;
  acceptsDelivery: boolean;
  acceptsPickup: boolean;
  isOpen: boolean;
  isActive: boolean;
  subscriptionStatus: SubscriptionStatus;
  plan: Plan;
  trialEndsAt: string;
  createdAt: string;
  updatedAt: string;
}
