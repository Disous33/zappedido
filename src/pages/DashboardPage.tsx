import { Copy, ExternalLink, Package, Plus, ShoppingBag, Store as StoreIcon, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { appConfig } from "../config/appConfig";
import { StatsCard } from "../components/dashboard/StatsCard";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useCategories } from "../hooks/useCategories";
import { useOrders } from "../hooks/useOrders";
import { useProducts } from "../hooks/useProducts";
import { useStore } from "../hooks/useStore";
import { getDaysUntil } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatCurrency";

export const DashboardPage = () => {
  const { store } = useStore();
  const { products } = useProducts(store?.id);
  const { categories } = useCategories(store?.id);
  const { orders } = useOrders(store?.id);
  if (!store) return null;

  const menuUrl = `${appConfig.appDomain}/cardapio/${store.slug}`;
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink">Visão geral</h1>
          <p className="mt-2 text-stone-600">Acompanhe sua loja, pedidos e ações rápidas.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" icon={<Copy size={17} />} onClick={() => navigator.clipboard.writeText(menuUrl)}>Copiar link</Button>
          <Link to={`/cardapio/${store.slug}`}><Button icon={<ExternalLink size={17} />}>Abrir cardápio</Button></Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatsCard label="Status" value={store.isOpen ? "Aberta" : "Fechada"} icon={<StoreIcon />} />
        <StatsCard label="Produtos" value={String(products.length)} icon={<Package />} />
        <StatsCard label="Disponíveis" value={String(products.filter((product) => product.available).length)} icon={<Package />} />
        <StatsCard label="Categorias" value={String(categories.length)} icon={<Tag />} />
        <StatsCard label="Receita estimada" value={formatCurrency(revenue)} icon={<ShoppingBag />} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <Card className="p-5">
          <h2 className="text-xl font-black text-ink">Link público</h2>
          <p className="mt-2 break-all rounded-2xl bg-orange-50 p-4 text-sm font-bold text-ember-800">{menuUrl}</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <Link to="/painel/produtos"><Button className="w-full" icon={<Plus size={17} />}>Adicionar produto</Button></Link>
            <Link to="/painel/loja"><Button className="w-full" variant="secondary">Editar loja</Button></Link>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Conheça nosso cardápio: ${menuUrl}`)}`} target="_blank" rel="noreferrer"><Button className="w-full" variant="secondary">Compartilhar</Button></a>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-black text-ink">Assinatura</h2>
          <p className="mt-3 text-sm text-stone-600">Plano atual: <strong>{store.plan === "pro" ? "Pro" : store.plan === "starter" ? "Starter" : "Teste grátis"}</strong></p>
          <p className="mt-2 text-sm text-stone-600">Status: <strong>{store.subscriptionStatus === "trialing" ? "Em teste" : store.subscriptionStatus}</strong></p>
          {store.subscriptionStatus === "trialing" ? <p className="mt-2 text-sm font-bold text-ember-700">Faltam {getDaysUntil(store.trialEndsAt)} dias para terminar o teste.</p> : null}
          <Link to="/painel/assinatura"><Button className="mt-5 w-full">Ver planos</Button></Link>
        </Card>
      </div>
      {(products.length === 0 || categories.length === 0) ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products.length === 0 ? (
            <Card className="p-5">
              <h2 className="text-xl font-black text-ink">Você ainda não cadastrou produtos.</h2>
              <p className="mt-2 text-sm text-stone-600">Adicione seus itens para que o cardápio público possa receber pedidos.</p>
              <Link to="/painel/produtos"><Button className="mt-5">Adicionar primeiro produto</Button></Link>
            </Card>
          ) : null}
          {categories.length === 0 ? (
            <Card className="p-5">
              <h2 className="text-xl font-black text-ink">Você ainda não criou categorias.</h2>
              <p className="mt-2 text-sm text-stone-600">Crie categorias para organizar seu cardápio por tipo de produto.</p>
              <Link to="/painel/categorias"><Button className="mt-5">Criar primeira categoria</Button></Link>
            </Card>
          ) : null}
        </div>
      ) : null}
    </DashboardLayout>
  );
};
