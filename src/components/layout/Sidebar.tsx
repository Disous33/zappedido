import { BarChart3, ClipboardList, CreditCard, FolderTree, LogOut, Package, Settings, Store } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { to: "/painel", label: "Início", icon: BarChart3 },
  { to: "/painel/loja", label: "Loja", icon: Store },
  { to: "/painel/produtos", label: "Produtos", icon: Package },
  { to: "/painel/categorias", label: "Categorias", icon: FolderTree },
  { to: "/painel/pedidos", label: "Pedidos", icon: ClipboardList },
  { to: "/painel/assinatura", label: "Assinatura", icon: CreditCard },
  { to: "/painel/configuracoes", label: "Configurações", icon: Settings },
];

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-orange-100 bg-white p-4 lg:sticky lg:top-0 lg:block">
      <div className="flex h-full flex-col">
        <div className="rounded-2xl bg-ink p-4 text-white">
          <p className="text-xl font-black">Meu ZapPedido</p>
          <p className="mt-1 text-xs text-orange-100">Painel do lojista</p>
        </div>
        <nav className="mt-5 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/painel"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                    isActive ? "bg-ember-600 text-white" : "text-stone-600 hover:bg-orange-50 hover:text-ink"
                  }`
                }
              >
                <Icon size={18} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
        <button type="button" onClick={logout} className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
};
