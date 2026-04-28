import { PlanDefinition } from "../types";

export const planDefinitions: PlanDefinition[] = [
  {
    id: "trial",
    name: "Teste grátis",
    price: "7 dias grátis",
    description: "Para validar seu cardápio digital sem compromisso.",
    features: ["Até 10 produtos", "Link do cardápio", "Pedidos pelo WhatsApp", "Sem pagamento online"],
  },
  {
    id: "starter",
    name: "Starter",
    price: "R$ 19,90/mês",
    description: "Para negócios que querem vender pelo WhatsApp todos os dias.",
    features: ["Produtos ilimitados", "Categorias ilimitadas", "Pedidos pelo WhatsApp", "Link personalizado", "Suporte básico"],
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 29,90/mês",
    description: "Mais recursos para cardápios com operação mais ativa.",
    features: ["Tudo do Starter", "Destaques de produtos", "Relatórios simples", "Cupons de desconto", "Visual mais premium", "Suporte prioritário"],
  },
  {
    id: "setup",
    name: "Configuração profissional",
    price: "R$ 97 único",
    description: "Nós deixamos seu cardápio pronto para divulgar.",
    features: ["Configuração completa", "Cadastro inicial de produtos", "Ajuste visual", "Entrega do link pronto"],
  },
];
