import { Link } from "react-router-dom";
import { demoCategories, demoProducts, demoStore } from "../data/demoData";
import { PublicLayout } from "../components/layout/PublicLayout";
import { ProductCard } from "../components/ProductCard";
import { StoreHeader } from "../components/StoreHeader";
import { Button } from "../components/ui/Button";

export const DemoPage = () => (
  <PublicLayout>
    <div className="bg-amber-50 px-4 py-3 text-center text-sm font-black text-amber-900">Demonstração do cardápio. Estes dados não fazem parte de uma loja real.</div>
    <StoreHeader store={demoStore} />
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-ink">Veja como seu cardápio pode ficar</h1>
          <p className="mt-1 text-sm text-stone-600">A demonstração é separada da área profissional e não cria dados reais.</p>
        </div>
        <Link to="/criar-conta"><Button>Criar conta profissional</Button></Link>
      </div>
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {demoCategories.map((category) => <span key={category.id} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-black text-stone-700">{category.name}</span>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {demoProducts.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} onAdd={() => window.alert("Esta é apenas uma demonstração. Crie uma conta para configurar sua loja.")} />)}
      </div>
    </section>
  </PublicLayout>
);
