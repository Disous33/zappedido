import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicLayout } from "../components/layout/PublicLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { setSeo } from "../utils/seo";

export const LoginPage = () => {
  const { login, recoverPassword, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSeo("Entrar no painel | Meu ZapPedido", "Acesse a área do lojista do Meu ZapPedido.");
    if (user) navigate("/painel");
  }, [navigate, user]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    try {
      login({ email, password });
      navigate("/painel");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
      setSuccess("");
    }
  };

  return (
    <PublicLayout>
      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2">
        <div>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-ember-700">Área do lojista</span>
          <h1 className="mt-4 text-4xl font-black text-ink">Entrar no painel</h1>
          <p className="mt-4 text-lg leading-8 text-stone-600">Acesse sua loja, edite seu cardápio e acompanhe os pedidos recebidos pelo WhatsApp.</p>
        </div>
        <Card className="p-6">
          <form className="space-y-4" onSubmit={submit}>
            <Input label="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input label="Senha" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
            {success ? <p className="rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">{success}</p> : null}
            <Button className="w-full" type="submit">Entrar no painel</Button>
            <button
              type="button"
              className="w-full text-sm font-bold text-ember-700"
              onClick={() => {
                try {
                  recoverPassword(email);
                  setSuccess("Enviamos as instruções de recuperação para seu e-mail.");
                  setError("");
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Informe um e-mail válido.");
                  setSuccess("");
                }
              }}
            >
              Esqueci minha senha
            </button>
            <p className="text-center text-sm text-stone-600">
              Ainda não tem conta profissional? <Link className="font-black text-ember-700" to="/criar-conta">Criar conta</Link>
            </p>
          </form>
        </Card>
      </section>
    </PublicLayout>
  );
};
