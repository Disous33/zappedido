import { ArrowRight, CheckCircle2, MessageCircle, Smartphone, Store, UtensilsCrossed } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/PublicLayout";
import { SubscriptionCard } from "../components/dashboard/SubscriptionCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { planDefinitions } from "../data/plans";
import { setSeo } from "../utils/seo";

const benefits = ["Sem aplicativo para o cliente baixar", "Pedido organizado direto no WhatsApp", "Cardápio bonito e fácil de atualizar", "Ideal para delivery, retirada e balcão", "Perfeito para pequenos negócios"];
const steps = ["Cadastre sua loja", "Adicione seus produtos", "Compartilhe seu link", "Receba pedidos no WhatsApp"];
const businessTypes = ["Hamburgueria", "Pizzaria", "Açaíteria", "Marmitaria", "Doceria", "Lanchonete", "Pastelaria", "Restaurante"];
const features = ["Link público personalizado", "Carrinho de compras", "Categorias e produtos", "Pedido por WhatsApp", "Taxa de entrega", "Retirada ou entrega", "Painel administrativo", "Planos acessíveis"];
const faqs = [
  ["O cliente precisa baixar aplicativo?", "Não. O cliente acessa seu link pelo navegador do celular."],
  ["Posso receber pedido direto no WhatsApp?", "Sim. O pedido é enviado com itens, totais e dados do cliente organizados."],
  ["Posso editar os produtos?", "Sim. Você edita produtos, categorias, preços, fotos e disponibilidade pelo painel."],
  ["Serve para delivery?", "Serve para delivery, retirada e balcão."],
  ["Tem taxa por pedido?", "Não nesta versão. Os planos são mensais e simples."],
  ["Posso cancelar quando quiser?", "Sim. A estrutura de assinatura está pronta para cancelamento manual."],
  ["Vocês configuram para mim?", "Sim. Existe o serviço de configuração profissional por pagamento único."],
];

export const LandingPage = () => {
  useEffect(() => setSeo("Meu ZapPedido | Cardápio digital para negócios de comida", "Crie seu cardápio digital e receba pedidos direto no WhatsApp."), []);

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-ink text-white">
        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black">Área profissional para negócios de comida</span>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">Crie seu cardápio digital e receba pedidos direto no WhatsApp</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-orange-50">O Meu ZapPedido ajuda pequenos negócios a venderem pelo WhatsApp com um cardápio online bonito, simples e profissional.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/criar-conta"><Button className="w-full px-6 sm:w-auto" icon={<ArrowRight size={18} />}>Criar minha conta</Button></Link>
              <Link to="/demo"><Button variant="secondary" className="w-full px-6 sm:w-auto">Ver demonstração</Button></Link>
            </div>
          </div>
          <div className="hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-soft backdrop-blur lg:block">
            <div className="rounded-[1.5rem] bg-[#fffaf5] p-4 text-ink">
              <div className="h-36 rounded-2xl bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80)" }} />
              <div className="-mt-8 ml-4 h-16 w-16 rounded-2xl border-4 border-white bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=300&q=80)" }} />
              <h3 className="mt-3 text-xl font-black">Sua Hamburgueria</h3>
              <div className="mt-4 space-y-3">
                {["X-Bacon Artesanal", "Combo Classic", "Batata com Cheddar"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
                    <span className="font-bold">{item}</span>
                    <span className="text-sm font-black text-ember-700">Adicionar</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-5">
          {benefits.map((benefit) => <Card key={benefit} className="p-5"><CheckCircle2 className="text-ember-600" /><p className="mt-4 text-sm font-black leading-6 text-ink">{benefit}</p></Card>)}
        </div>
      </section>

      <section id="como-funciona" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-ink">Como funciona</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => <div key={step} className="rounded-2xl bg-[#fffaf5] p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-600 font-black text-white">{index + 1}</span><h3 className="mt-4 font-black text-ink">{step}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-ink">Feito para todo tipo de comida</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessTypes.map((type) => <Card key={type} className="p-5"><UtensilsCrossed className="text-ember-600" /><h3 className="mt-4 font-black text-ink">{type}</h3></Card>)}
        </div>
      </section>

      <section id="recursos" className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black">Recursos para vender com menos atrito</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => <div key={feature} className="rounded-2xl bg-white/10 p-4 font-bold"><Smartphone className="mb-3 text-amber-300" />{feature}</div>)}
          </div>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-ink">Planos</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{planDefinitions.map((plan) => <SubscriptionCard key={plan.id} plan={plan} />)}</div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-ink">Perguntas frequentes</h2>
        <div className="mt-8 space-y-3">
          {faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"><summary className="cursor-pointer font-black text-ink">{question}</summary><p className="mt-3 leading-7 text-stone-600">{answer}</p></details>)}
        </div>
      </section>

      <section className="bg-ember-600 px-4 py-16 text-center text-white">
        <h2 className="text-3xl font-black">Comece hoje com seu cardápio digital</h2>
        <Link to="/criar-conta"><Button variant="secondary" className="mt-6">Criar minha conta</Button></Link>
      </section>

      <footer className="border-t border-orange-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-black text-ink"><Store className="text-ember-600" /> Meu ZapPedido</div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-stone-600"><Link to="/planos">Planos</Link><Link to="/suporte">Suporte</Link><a href="https://instagram.com/zappedido">Instagram</a><span><MessageCircle size={14} className="inline" /> WhatsApp</span></div>
        </div>
      </footer>
    </PublicLayout>
  );
};
