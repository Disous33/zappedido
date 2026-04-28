import { Menu, MessageCircle } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/Button";

export const Header = () => (
  <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-2 text-ink">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-600 text-white">
          <MessageCircle size={20} />
        </span>
        <span className="text-lg font-black">Meu ZapPedido</span>
      </Link>
      <nav className="hidden items-center gap-1 text-sm font-bold md:flex">
        {[
          ["/", "Início"],
          ["/#como-funciona", "Como funciona"],
          ["/#recursos", "Recursos"],
          ["/planos", "Planos"],
          ["/suporte", "Suporte"],
        ].map(([to, label]) => (
          <a key={to} href={to} className="rounded-lg px-3 py-2 text-stone-600 hover:bg-stone-100">{label}</a>
        ))}
        <NavLink to="/entrar" className="rounded-lg px-3 py-2 text-stone-600 hover:bg-stone-100">Entrar</NavLink>
        <Link to="/criar-conta"><Button>Criar conta profissional</Button></Link>
      </nav>
      <Link to="/criar-conta" className="md:hidden">
        <Button className="h-10 min-h-10 w-10 px-0" aria-label="Menu"><Menu size={18} /></Button>
      </Link>
    </div>
  </header>
);
