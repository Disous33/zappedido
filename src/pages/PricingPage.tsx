import { useEffect } from "react";
import { SubscriptionCard } from "../components/dashboard/SubscriptionCard";
import { PublicLayout } from "../components/layout/PublicLayout";
import { planDefinitions } from "../data/plans";
import { setSeo } from "../utils/seo";

export const PricingPage = () => {
  useEffect(() => setSeo("Planos | Meu ZapPedido", "Planos acessíveis para vender pelo WhatsApp."), []);

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-black text-ink">Planos simples para vender mais</h1>
          <p className="mt-4 text-lg text-stone-600">Comece grátis, evolua para produtos ilimitados e contrate a configuração profissional quando quiser.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {planDefinitions.map((plan) => <SubscriptionCard key={plan.id} plan={plan} />)}
        </div>
      </section>
    </PublicLayout>
  );
};
