import { Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/PublicLayout";
import { Button } from "../components/ui/Button";

export const NotFoundPage = () => (
  <PublicLayout>
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black text-ink">Página não encontrada</h1>
      <p className="mt-3 text-stone-600">O link pode ter mudado ou o cardápio não existe.</p>
      <Link to="/"><Button className="mt-6">Voltar ao início</Button></Link>
    </section>
  </PublicLayout>
);
