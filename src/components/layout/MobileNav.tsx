import { BarChart3, ClipboardList, FolderTree, Package, Store } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/painel", label: "Início", icon: BarChart3 },
  { to: "/painel/loja", label: "Loja", icon: Store },
  { to: "/painel/produtos", label: "Produtos", icon: Package },
  { to: "/painel/categorias", label: "Categorias", icon: FolderTree },
  { to: "/painel/pedidos", label: "Pedidos", icon: ClipboardList },
];

export const MobileNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-orange-100 bg-white px-2 pb-2 pt-1 lg:hidden">
    {links.map((link) => {
      const Icon = link.icon;
      return (
        <NavLink key={link.to} to={link.to} end={link.to === "/painel"} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-black ${isActive ? "text-ember-700" : "text-stone-500"}`}>
          <Icon size={18} />
          {link.label}
        </NavLink>
      );
    })}
  </nav>
);
