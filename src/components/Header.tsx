import { Link, NavLink } from "react-router-dom";
import { ChefHat } from "lucide-react";

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-2 text-ink">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-600 text-white">
          <ChefHat size={21} />
        </span>
        <span className="text-lg font-black">ZapPedido</span>
      </Link>
      <nav className="flex items-center gap-1 text-sm font-bold">
        <NavLink to="/menu" className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-ember-50 text-ember-700" : "text-stone-600 hover:bg-stone-100"}`}>
          Cardápio
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? "bg-ember-50 text-ember-700" : "text-stone-600 hover:bg-stone-100"}`}>
          Admin
        </NavLink>
      </nav>
    </div>
  </header>
);
