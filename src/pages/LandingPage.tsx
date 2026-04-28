import { ArrowRight, CheckCircle2, MessageCircle, Store, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

const benefits = [
  "Sem aplicativo para o cliente baixar",
  "Pedido organizado direto no WhatsApp",
  "Cardápio bonito e fácil de atualizar",
  "Ideal para delivery, retirada e balcão",
  "Perfeito para pequenos negócios",
];

const businessTypes = ["Hamburguerias", "Pizzarias", "Açaíterias", "Lanchonetes", "Padarias", "Restaurantes", "Cozinhas delivery"];

const faqs = [
  ["Preciso instalar algum aplicativo?", "Não. O cliente acessa um link responsivo, escolhe os itens e envia o pedido pelo WhatsApp."],
  ["O pedido chega em algum painel?", "Nesta primeira versão, o pedido é enviado direto para o WhatsApp da loja com uma mensagem organizada."],
  ["Posso editar produtos e preços?", "Sim. O painel admin permite criar categorias, produtos, preços, fotos, disponibilidade e dados da loja."],
  ["Tem pagamento online?", "O MVP foca no WhatsApp. Pagamento online pode ser adicionado em versões futuras."],
];

export const LandingPage = () => (
  <main className="min-h-screen bg-[#fffaf5]">
    <Header />
    <section className="relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black backdrop-blur">ZapPedido</span>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">Transforme seu cardápio em um link de pedidos pelo WhatsApp</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-orange-50">
            Com o ZapPedido, seus clientes escolhem os produtos, montam o carrinho e enviam o pedido direto para o WhatsApp da sua loja.
          </p>
          <p className="mt-4 text-xl font-black text-amber-300">Seu cardápio online, seus pedidos direto no WhatsApp.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/admin" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ember-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-ember-700">
              <ArrowRight size={19} />
              Criar meu cardápio
            </Link>
            <Link to="/menu" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
              Ver demonstração
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-5">
        {benefits.map((benefit) => (
          <div key={benefit} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <CheckCircle2 className="text-ember-600" />
            <p className="mt-4 text-sm font-black leading-6 text-ink">{benefit}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black text-ink">Como funciona</h2>
          <p className="mt-3 text-stone-600">Um fluxo simples para vender mais sem complicar a operação.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Cadastre sua loja", "Configure nome, fotos, horários, entrega e WhatsApp."],
            ["Monte o cardápio", "Crie categorias, produtos, preços, destaques e disponibilidade."],
            ["Receba pedidos", "O cliente monta o carrinho e envia tudo organizado no WhatsApp."],
          ].map(([title, description], index) => (
            <div key={title} className="rounded-2xl bg-[#fffaf5] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-600 text-lg font-black text-white">{index + 1}</span>
              <h3 className="mt-5 text-xl font-black text-ink">{title}</h3>
              <p className="mt-2 leading-7 text-stone-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
      <div>
        <h2 className="text-3xl font-black text-ink">Preço inicial para pequenos negócios</h2>
        <p className="mt-3 text-stone-600">Comece com um cardápio funcional e evolua conforme sua loja cresce.</p>
      </div>
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <Store className="text-ember-600" />
          <h3 className="text-xl font-black">Plano Inicial</h3>
        </div>
        <p className="mt-5 text-4xl font-black text-ink">R$19,90<span className="text-base text-stone-500">/mês</span></p>
        <p className="mt-3 text-sm font-semibold text-stone-600">Configuração opcional: R$97 uma única vez.</p>
        <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-stone-700">Pagamento online com Mercado Pago ou Stripe pode ser adicionado em versões futuras.</p>
      </div>
    </section>

    <section className="bg-ink py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black">Feito para vender comida do jeito que o cliente já compra</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {businessTypes.map((type) => (
            <span key={type} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{type}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-black text-ink">Perguntas frequentes</h2>
      <div className="mt-8 space-y-3">
        {faqs.map(([question, answer]) => (
          <details key={question} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <summary className="cursor-pointer font-black text-ink">{question}</summary>
            <p className="mt-3 leading-7 text-stone-600">{answer}</p>
          </details>
        ))}
      </div>
    </section>

    <footer className="border-t border-orange-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-black text-ink"><UtensilsCrossed className="text-ember-600" /> ZapPedido</div>
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-600"><MessageCircle size={16} /> Pedidos direto no WhatsApp</div>
      </div>
    </footer>
  </main>
);
