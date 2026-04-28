import { appConfig } from "../../config/appConfig";
import { PlanDefinition, Store } from "../../types";
import { sanitizeWhatsAppNumber } from "../../utils/sanitizeWhatsAppNumber";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface SubscriptionCardProps {
  plan: PlanDefinition;
  store?: Store;
  onRequest?: () => void;
}

export const SubscriptionCard = ({ plan, store, onRequest }: SubscriptionCardProps) => {
  const message = plan.id === "setup" ? "Olá! Quero contratar a configuração profissional do Meu ZapPedido." : `Olá! Quero assinar o plano ${plan.name} do Meu ZapPedido.`;
  const url = `https://wa.me/${sanitizeWhatsAppNumber(appConfig.supportWhatsApp)}?text=${encodeURIComponent(message)}`;
  const isCurrentPlan = store?.plan === plan.id;

  return (
    <Card className={`flex h-full flex-col p-6 ${plan.highlight ? "border-ember-500 shadow-soft" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-ink">{plan.name}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">{plan.description}</p>
        </div>
        {plan.highlight ? <span className="rounded-full bg-ember-600 px-3 py-1 text-xs font-black text-white">Popular</span> : null}
      </div>
      <p className="mt-5 text-3xl font-black text-ink">{plan.price}</p>
      <ul className="mt-5 flex-1 space-y-2 text-sm font-semibold text-stone-700">
        {plan.features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>
      <Button
        className="mt-6 w-full"
        variant={isCurrentPlan ? "secondary" : "primary"}
        onClick={() => {
          if (plan.id === "trial" && !store) {
            window.location.href = "/criar-conta";
            return;
          }
          onRequest?.();
          window.open(url, "_blank", "noopener,noreferrer");
        }}
      >
        {isCurrentPlan ? "Plano atual" : plan.id === "trial" && !store ? "Começar grátis" : plan.id === "starter" ? "Assinar Starter" : plan.id === "pro" ? "Assinar Pro" : "Quero configuração"}
      </Button>
    </Card>
  );
};
