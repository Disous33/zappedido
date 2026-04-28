import { Mail, MessageCircle } from "lucide-react";
import { appConfig } from "../config/appConfig";
import { PublicLayout } from "../components/layout/PublicLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { sanitizeWhatsAppNumber } from "../utils/sanitizeWhatsAppNumber";

export const SupportPage = () => {
  const supportUrl = `https://wa.me/${sanitizeWhatsAppNumber(appConfig.supportWhatsApp)}?text=${encodeURIComponent("Olá! Preciso de suporte no Meu ZapPedido.")}`;

  return (
    <PublicLayout>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-4xl font-black text-ink">Suporte Meu ZapPedido</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone-600">Fale com a equipe para ajuda com planos, configuração ou dúvidas sobre sua loja.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <MessageCircle className="mx-auto text-ember-600" />
            <h2 className="mt-4 text-xl font-black text-ink">WhatsApp</h2>
            <a href={supportUrl} target="_blank" rel="noreferrer"><Button className="mt-5 w-full">Chamar suporte</Button></a>
          </Card>
          <Card className="p-6">
            <Mail className="mx-auto text-ember-600" />
            <h2 className="mt-4 text-xl font-black text-ink">E-mail</h2>
            <p className="mt-3 font-bold text-stone-700">{appConfig.supportEmail}</p>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
};
