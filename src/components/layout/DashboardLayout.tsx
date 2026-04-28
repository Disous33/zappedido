import { ExternalLink, LogOut } from "lucide-react";
import { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useStore } from "../../hooks/useStore";
import { getDaysUntil } from "../../utils/dateUtils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const { store } = useStore();

  if (!user) return <Navigate to="/entrar" replace />;

  return (
    <div className="min-h-screen bg-[#fffaf5] lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1 pb-24 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-stone-500">{store?.name ?? "Sua loja"}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant={store?.subscriptionStatus === "active" ? "success" : store?.subscriptionStatus === "expired" ? "danger" : "warning"}>
                  {store?.plan === "pro" ? "Pro" : store?.plan === "starter" ? "Starter" : "Teste grátis"}
                </Badge>
                {store?.subscriptionStatus === "trialing" ? <Badge>faltam {getDaysUntil(store.trialEndsAt)} dias</Badge> : null}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {store ? (
                <Link to={`/cardapio/${store.slug}`}>
                  <Button variant="secondary" className="hidden sm:inline-flex" icon={<ExternalLink size={16} />}>Ver cardápio</Button>
                </Link>
              ) : null}
              <Button variant="ghost" className="h-10 min-h-10 w-10 px-0 lg:hidden" onClick={logout} aria-label="Sair">
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
};
