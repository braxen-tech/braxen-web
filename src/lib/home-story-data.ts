import chapterProblem from "@/assets/chapter-problem.jpg";
import chapterSolution from "@/assets/chapter-solution.jpg";
import type { FeatureSectionProps } from "@/components/ui/feature";

export const painFeature: Omit<
  FeatureSectionProps,
  "variant" | "reverse" | "className"
> = {
  id: "problema",
  title: "Sua operação trava antes de escalar",
  subtitle:
    "Você sabe que precisa de tecnologia — mas não de mais uma ferramenta genérica que ninguém vai usar.",
  image: chapterProblem,
  imageAlt:
    "Equipe sobrecarregada com processos manuais e planilhas desorganizadas",
  items: [
    {
      title: "Leads sem resposta",
      description:
        "Oportunidades esfriam enquanto o time está ocupado apagando incêndio.",
    },
    {
      title: "Equipe no limite",
      description:
        "Operação manual consome capacidade que deveria ir para crescimento.",
    },
    {
      title: "Planilhas que ninguém confia",
      description:
        "Dados espalhados, versões desatualizadas e zero visibilidade real.",
    },
    {
      title: "Ferramentas genéricas",
      description:
        "Licenças caras que não encaixam no processo e viram passivo.",
    },
  ],
};

export const solutionFeature: Omit<
  FeatureSectionProps,
  "variant" | "reverse" | "className"
> = {
  id: "como-fazemos",
  title: "Tecnologia feita pro seu processo, entrega em semanas",
  subtitle:
    "Mapeamos onde trava, construímos o que resolve e colocamos no ar com impacto mensurável.",
  image: chapterSolution,
  imageAlt: "Dashboard e automações sob medida integrados à operação",
  items: [
    {
      title: "Diagnóstico e build sob medida",
      description:
        "Agente de IA, CRM e dashboard desenhados para o seu fluxo — sem template, sem licença.",
    },
    {
      title: "Integração com o que você já usa",
      description:
        "WhatsApp, pagamentos, APIs externas e processos internos conectados de ponta a ponta.",
    },
    {
      title: "Primeira entrega em semanas",
      description:
        "Ciclos curtos com validação antes de ir pro ar — não projetos de meses sem resultado.",
    },
    {
      title: "Impacto mensurável",
      description:
        "Você acompanha cada etapa e mede o efeito real. Se não funcionar, a gente ajusta.",
    },
  ],
};
