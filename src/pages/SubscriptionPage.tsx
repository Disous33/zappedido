import { useState } from "react";
import { SubscriptionCard } from "../components/dashboard/SubscriptionCard";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { planDefinitions } from "../data/plans";
import { useStore } from "../hooks/useStore";
import { subscriptionService } from "../services/subscriptionService";
import { Plan } from "../types";
import { getDaysUntil } from "../utils/dateUtils";

export const SubscriptionPage = () => {
  const { store } = useStore();
  const [, setVersion] = useState(0);
  if (!store) return null;

  const requestUpgrade = (plan: Plan) => {
    subscriptionService.requestUpgrade(store.id, plan);
    setVersion((value) => value + 1);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-ink">Assinatura</h1>
        <p className="mt-1 text-sm text-stone-600">Planos prontos para pagamento manual via WhatsApp agora e gateway no futuro.</p>
      </div>
      <Card className="mb-6 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-stone-500">Plano atual</p>
            <h2 className="text-2xl font-black text-ink">{store.plan === "pro" ? "Pro" : store.plan === "starter" ? "Starter" : "Teste grátis"}</h2>
          </div>
          <Badge variant={store.subscriptionStatus === "active" ? "success" : store.subscriptionStatus === "pending" ? "warning" : store.subscriptionStatus === "expired" ? "danger" : "default"}>
            {store.subscriptionStatus === "trialing" ? `Teste: ${getDaysUntil(store.trialEndsAt)} dias restantes` : store.subscriptionStatus === "pending" ? "Pagamento pendente" : store.subscriptionStatus}
          </Badge>
        </div>
      </Card>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {planDefinitions.map((plan) => {
          const upgradePlan = plan.id === "starter" || plan.id === "pro" ? plan.id : null;
          return <SubscriptionCard key={plan.id} plan={plan} store={store} onRequest={upgradePlan ? () => requestUpgrade(upgradePlan) : undefined} />;
        })}
      </div>
    </DashboardLayout>
  );
};
