import { Navigate, Route, Routes } from "react-router-dom";
import { AccountSettingsPage } from "../pages/AccountSettingsPage";
import { CategoriesPage } from "../pages/CategoriesPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { OrdersPage } from "../pages/OrdersPage";
import { PricingPage } from "../pages/PricingPage";
import { ProductsPage } from "../pages/ProductsPage";
import { PublicMenuPage } from "../pages/PublicMenuPage";
import { RegisterPage } from "../pages/RegisterPage";
import { StoreSettingsPage } from "../pages/StoreSettingsPage";
import { SubscriptionPage } from "../pages/SubscriptionPage";
import { DemoPage } from "../pages/DemoPage";
import { SupportPage } from "../pages/SupportPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/entrar" element={<LoginPage />} />
    <Route path="/criar-conta" element={<RegisterPage />} />
    <Route path="/planos" element={<PricingPage />} />
    <Route path="/suporte" element={<SupportPage />} />
    <Route path="/demo" element={<DemoPage />} />
    <Route path="/cardapio/:storeSlug" element={<PublicMenuPage />} />
    <Route path="/painel" element={<DashboardPage />} />
    <Route path="/painel/loja" element={<StoreSettingsPage />} />
    <Route path="/painel/produtos" element={<ProductsPage />} />
    <Route path="/painel/categorias" element={<CategoriesPage />} />
    <Route path="/painel/pedidos" element={<OrdersPage />} />
    <Route path="/painel/assinatura" element={<SubscriptionPage />} />
    <Route path="/painel/configuracoes" element={<AccountSettingsPage />} />
    <Route path="/login" element={<Navigate to="/entrar" replace />} />
    <Route path="/register" element={<Navigate to="/criar-conta" replace />} />
    <Route path="/pricing" element={<Navigate to="/planos" replace />} />
    <Route path="/dashboard" element={<Navigate to="/painel" replace />} />
    <Route path="/dashboard/store" element={<Navigate to="/painel/loja" replace />} />
    <Route path="/dashboard/products" element={<Navigate to="/painel/produtos" replace />} />
    <Route path="/dashboard/categories" element={<Navigate to="/painel/categorias" replace />} />
    <Route path="/dashboard/orders" element={<Navigate to="/painel/pedidos" replace />} />
    <Route path="/dashboard/subscription" element={<Navigate to="/painel/assinatura" replace />} />
    <Route path="/dashboard/settings" element={<Navigate to="/painel/configuracoes" replace />} />
    <Route path="/admin" element={<Navigate to="/painel" replace />} />
    <Route path="/menu" element={<Navigate to="/demo" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
