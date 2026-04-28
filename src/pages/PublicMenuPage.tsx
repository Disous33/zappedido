import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer";
import { CategoryTabs } from "../components/CategoryTabs";
import { ProductCard } from "../components/ProductCard";
import { StoreHeader } from "../components/StoreHeader";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { useCart } from "../hooks/useCart";
import { categoryService } from "../services/categoryService";
import { orderService } from "../services/orderService";
import { productService } from "../services/productService";
import { storeService } from "../services/storeService";
import { CustomerInfo, OrderType } from "../types";
import { formatCurrency } from "../utils/formatCurrency";
import { generateWhatsAppMessage } from "../utils/generateWhatsAppMessage";
import { sanitizeWhatsAppNumber } from "../utils/sanitizeWhatsAppNumber";
import { setSeo } from "../utils/seo";
import { validateOrder, OrderValidationErrors } from "../utils/validateOrder";

export const PublicMenuPage = () => {
  const { storeSlug = "" } = useParams();
  const store = storeService.getBySlug(storeSlug);
  const categories = store ? categoryService.list(store.id).filter((category) => category.active) : [];
  const products = store ? productService.list(store.id) : [];
  const { cart, subtotal, itemCount, addProduct, increment, decrement, remove, clear } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [customer, setCustomer] = useState<CustomerInfo>({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (store) {
      setSeo(`${store.name} | Cardápio Digital - Meu ZapPedido`, store.description, store.coverImageUrl);
      setOrderType(store.acceptsDelivery ? "delivery" : "pickup");
    }
  }, [store?.id]);

  const filteredProducts = useMemo(() => {
    const allowedCategories = new Set(categories.map((category) => category.id));
    return products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesFeatured = !featuredOnly || product.featured;
      return product.available && allowedCategories.has(product.categoryId) && matchesCategory && matchesSearch && matchesFeatured;
    });
  }, [activeCategory, categories, featuredOnly, products, search]);

  if (!store) {
    return <UnavailablePage title="Cardápio não encontrado" description="Confira se o link está correto ou peça um novo link para o estabelecimento." />;
  }

  if (!store.isActive || store.subscriptionStatus === "expired" || store.subscriptionStatus === "inactive") {
    return <UnavailablePage title="Este cardápio está temporariamente indisponível." description="O estabelecimento precisa regularizar o acesso para voltar a receber pedidos." />;
  }

  if (!products.some((product) => product.available)) {
    return <UnavailablePage title="Esta loja ainda não possui produtos disponíveis." description="Tente novamente mais tarde ou fale com o estabelecimento." />;
  }

  const total = subtotal + (orderType === "delivery" ? store.deliveryFee : 0);

  const sendOrder = () => {
    const nextErrors = validateOrder(store, cart, customer, orderType);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setCartOpen(true);
      return;
    }
    if (!store.isOpen && !window.confirm("A loja está fechada no momento. Deseja enviar mesmo assim?")) return;

    const order = orderService.create(store, cart, customer, orderType);
    orderService.updateStatus(order.id, "sent_to_whatsapp");
    const message = generateWhatsAppMessage(store, cart, customer, orderType);
    const url = `https://wa.me/${sanitizeWhatsAppNumber(store.whatsappNumber)}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    setCartOpen(false);
    setSuccess(true);
  };

  return (
    <main className="min-h-screen bg-[#fffaf5] pb-28">
      <StoreHeader store={store} />
      <section className="mx-auto max-w-6xl px-4 py-6">
        {success ? <div className="mb-5 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-800">Pedido enviado para o WhatsApp. Obrigado!</div> : null}
        {!store.isOpen ? (
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            A loja está fechada no momento. Você ainda pode montar seu pedido, mas a confirmação depende do estabelecimento.
          </div>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={19} />
            <input className="w-full rounded-2xl border border-orange-100 bg-white py-3 pl-11 pr-4 text-sm font-medium outline-none focus:border-ember-500 focus:ring-4 focus:ring-orange-100" placeholder="Buscar produtos" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <Button variant={featuredOnly ? "primary" : "secondary"} icon={<Sparkles size={17} />} onClick={() => setFeaturedOnly(!featuredOnly)}>Destaques</Button>
        </div>
        <div className="mt-5"><CategoryTabs categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} /></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {filteredProducts.length ? filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addProduct} />) : (
            <div className="lg:col-span-2"><EmptyState icon={<ShoppingBag />} title="Nenhum produto disponível" description="Tente outra busca ou categoria." /></div>
          )}
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-2xl sm:hidden">
        <Button className="w-full justify-between shadow-soft" onClick={() => setCartOpen(true)}>
          <span>Carrinho ({itemCount})</span>
          <span>{formatCurrency(total)}</span>
        </Button>
      </div>
      <Button className="fixed bottom-6 right-6 z-40 hidden shadow-soft sm:inline-flex" icon={<ShoppingBag size={18} />} onClick={() => setCartOpen(true)}>
        Carrinho ({itemCount}) - {formatCurrency(total)}
      </Button>

      <CartDrawer
        open={cartOpen}
        store={store}
        items={cart}
        orderType={orderType}
        customer={customer}
        errors={errors}
        onClose={() => setCartOpen(false)}
        onOrderTypeChange={setOrderType}
        onCustomerChange={setCustomer}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={remove}
        onSubmit={sendOrder}
      />
    </main>
  );
};

const UnavailablePage = ({ title, description }: { title: string; description: string }) => (
  <main className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-4">
    <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-soft">
      <h1 className="text-2xl font-black text-ink">{title}</h1>
      <p className="mt-3 leading-7 text-stone-600">{description}</p>
    </div>
  </main>
);
