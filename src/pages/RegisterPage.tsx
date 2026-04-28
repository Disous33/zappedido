import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicLayout } from "../components/layout/PublicLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { useAuth } from "../hooks/useAuth";
import { setSeo } from "../utils/seo";

const businessTypes = ["Hamburgueria", "Pizzaria", "Açaíteria", "Marmitaria", "Lanchonete", "Restaurante", "Doceria", "Padaria", "Outro"];

export const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    businessType: "Hamburgueria",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setSeo("Criar conta profissional | Meu ZapPedido", "Crie sua conta profissional e configure seu cardápio digital.");
    if (user) navigate("/painel");
  }, [navigate, user]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    try {
      register(form);
      navigate("/painel/loja", { state: { onboarding: "Agora vamos configurar seu cardápio." } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível criar sua conta.");
    }
  };

  return (
    <PublicLayout>
      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1fr]">
        <div>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-ember-700">Área do lojista</span>
          <h1 className="mt-4 text-4xl font-black text-ink">Criar conta profissional</h1>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            Cadastre seu negócio, configure seu cardápio e compartilhe um link profissional para receber pedidos no WhatsApp.
          </p>
        </div>
        <Card className="p-6">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
            <Input label="Nome completo" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            <Input label="WhatsApp da loja" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
            <Input label="E-mail" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
            <Input label="Senha" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            <Input label="Confirmar senha" type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} required />
            <Input label="Nome do negócio" value={form.storeName} onChange={(event) => setForm({ ...form, storeName: event.target.value })} required />
            <div className="sm:col-span-2">
              <Select label="Tipo de negócio" value={form.businessType} onChange={(event) => setForm({ ...form, businessType: event.target.value })}>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </div>
            {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">{error}</p> : null}
            <Button className="sm:col-span-2" type="submit">Criar conta profissional</Button>
            <p className="text-center text-sm text-stone-600 sm:col-span-2">
              Já tem conta profissional? <Link className="font-black text-ember-700" to="/entrar">Entrar no painel</Link>
            </p>
          </form>
        </Card>
      </section>
    </PublicLayout>
  );
};
