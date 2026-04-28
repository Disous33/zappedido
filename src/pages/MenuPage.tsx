import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { CartDrawer } from "../components/CartDrawer";
import { CategoryTabs } from "../components/CategoryTabs";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { StoreHeader } from "../components/StoreHeader";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { ToastStack } from "../components/ui/ToastStack";
import { useAppData } from "../hooks/useAppData";
import { useToast } from "../hooks/useToast";
import { CartItem, CustomerInfo, OrderType, Product } from "../types";
import { formatCurrency } from "../utils/currency";
import { buildWhatsAppUrl, sanitizeWhatsAppNumber } from "../utils/whatsapp";

export const MenuPage = () => {
  const { data } = useAppData();
  const { toasts, showToast } = useToast();
  const activeCategories = data.categories.filter((category) => category.active).sort((a, b) => a.sortOrder - b.sortOrder);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>(data.store.acceptsDelivery ? "delivery" : "pickup");
  const [customer, setCustomer] = useState<CustomerInfo>({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo | "cart" | "whatsapp", string>>>({});

  const products = useMemo(() => {
    const allowedCategories = new Set(activeCategories.map((category) => category.id));
    return data.products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesFeatured = !featuredOnly || product.featured;
      return allowedCategories.has(product.categoryId) && matchesCategory && matchesSearch && matchesFeatured;
    });
  }, [activeCategories, activeCategory, data.products, featuredOnly, search]);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.promotionalPrice ?? item.product.price) * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + (orderType === "delivery" ? data.store.deliveryFee : 0);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { product, quantity: 1 }];
    });
    showToast("success", "Produto adicionado ao carrinho.");
  };

  const validateOrder = () => {
    const nextErrors: Partial<Record<keyof CustomerInfo | "cart" | "whatsapp", string>> = {};
    if (cart.length === 0) nextErrors.cart = "Adicione pelo menos um produto ao carrinho.";
    if (!customer.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!customer.phone.trim()) nextErrors.phone = "Informe seu telefone.";
    if (orderType === "delivery" && !customer.address.trim()) nextErrors.address = "Informe o endereço de entrega.";
    if (!sanitizeWhatsAppNumber(data.store.whatsappNumber)) nextErrors.whatsapp = "O WhatsApp da loja não foi configurado.";
    if (subtotal < data.store.minimumOrderValue) nextErrors.cart = `O pedido mínimo é ${formatCurrency(data.store.minimumOrderValue)}.`;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const sendOrder = () => {
    if (!validateOrder()) return;
    if (!data.store.isOpen && !window.confirm("A loja está fechada agora. Deseja enviar o pedido mesmo assim?")) return;

    window.open(buildWhatsAppUrl(data.store, cart, customer, orderType), "_blank", "noopener,noreferrer");
    setCart([]);
    setCartOpen(false);
    setErrors({});
    showToast("success", "Pedido enviado. Seu carrinho foi limpo.");
  };

  return (
    <main className="min-h-screen bg-[#fffaf5] pb-28">
      <Header />
      <StoreHeader store={data.store} />
      <ToastStack toasts={toasts} />

      <section className="mx-auto max-w-6xl px-4 py-6">
        {!data.store.isOpen ? (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            A loja está fechada no momento. Você ainda pode montar o pedido e confirmar antes de enviar.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={19} />
            <input
              className="w-full rounded-2xl border border-orange-100 bg-white py-3 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-ember-500 focus:ring-4 focus:ring-orange-100"
              placeholder="Buscar produtos"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <Button variant={featuredOnly ? "primary" : "secondary"} icon={<Sparkles size={17} />} onClick={() => setFeaturedOnly(!featuredOnly)}>
            Destaques
          </Button>
        </div>

        <div className="mt-5">
          <CategoryTabs categories={activeCategories} activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)
          ) : (
            <div className="lg:col-span-2">
              <EmptyState icon={<ShoppingBag />} title="Nenhum produto encontrado" description="Tente ajustar a busca ou selecionar outra categoria." />
            </div>
          )}
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-2xl sm:hidden">
        <Button className="w-full justify-between shadow-soft" onClick={() => setCartOpen(true)}>
          <span className="flex items-center gap-2"><ShoppingBag size={18} /> Ver carrinho ({itemCount})</span>
          <span>{formatCurrency(total)}</span>
        </Button>
      </div>
      <Button className="fixed bottom-6 right-6 z-40 hidden shadow-soft sm:inline-flex" icon={<ShoppingBag size={18} />} onClick={() => setCartOpen(true)}>
        Carrinho ({itemCount}) - {formatCurrency(total)}
      </Button>

      <CartDrawer
        open={cartOpen}
        store={data.store}
        items={cart}
        orderType={orderType}
        customer={customer}
        errors={errors}
        onClose={() => setCartOpen(false)}
        onOrderTypeChange={setOrderType}
        onCustomerChange={setCustomer}
        onIncrement={(productId) => setCart((current) => current.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))}
        onDecrement={(productId) => setCart((current) => current.flatMap((item) => (item.product.id === productId ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item])))}
        onRemove={(productId) => setCart((current) => current.filter((item) => item.product.id !== productId))}
        onSubmit={sendOrder}
      />
    </main>
  );
};
