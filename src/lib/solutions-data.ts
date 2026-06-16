import portfolioAiAgent from "@/assets/portfolio-ai-agent.jpg";
import portfolioCrm from "@/assets/portfolio-crm.jpg";
import portfolioDashboard from "@/assets/portfolio-dashboard.jpg";
import portfolioLeadScoring from "@/assets/portfolio-lead-scoring.jpg";
import portfolioErp from "@/assets/portfolio-erp.jpg";
import portfolioWhatsappAutomation from "@/assets/portfolio-whatsapp-automation.jpg";
import { imageSrc, type ImageSrc } from "@/lib/utils";

export type SolutionFeature = {
  id: number;
  title: string;
  tag: string;
  image: ImageSrc;
  description: string;
};

export const solutionFeatures: SolutionFeature[] = [
  {
    id: 1,
    title: "Agente de Atendimento",
    tag: "IA · WhatsApp",
    image: portfolioAiAgent,
    description:
      "Atendimento omnichannel com qualificação automática, respostas 24/7 e handoff para humanos quando necessário. Redução de até 80% nas ligações repetitivas.",
  },
  {
    id: 2,
    title: "Qualificação de Leads",
    tag: "IA · Automação",
    image: portfolioLeadScoring,
    description:
      "Triagem inteligente na conversa com scoring por IA generativa. Seu time comercial recebe apenas oportunidades prontas para avançar.",
  },
  {
    id: 3,
    title: "CRM Sob Medida",
    tag: "Software · CRM",
    image: portfolioCrm,
    description:
      "Pipeline comercial desenhado para o seu processo — integrado ao WhatsApp, e-mail e APIs externas. Sem licença genérica que ninguém usa.",
  },
  {
    id: 4,
    title: "Dashboard Operacional",
    tag: "Analytics · BI",
    image: portfolioDashboard,
    description:
      "Métricas de equipe, receita e operação em tempo real. Visibilidade do que importa para decidir rápido e escalar com controle.",
  },
  {
    id: 5,
    title: "ERP Interno",
    tag: "Software · Gestão",
    image: portfolioErp,
    description:
      "Controle de estoque, compras e faturamento conectado ao restante da operação. Software feito para o seu fluxo, não para um template.",
  },
  {
    id: 6,
    title: "Automação WhatsApp",
    tag: "Integração · Bot",
    image: portfolioWhatsappAutomation,
    description:
      "Fluxos de onboarding, follow-up e notificações automatizados no canal que seu cliente já usa. Integração com pagamentos, agenda e CRM.",
  },
];

export function solutionImageSrc(feature: SolutionFeature): string {
  return imageSrc(feature.image);
}
