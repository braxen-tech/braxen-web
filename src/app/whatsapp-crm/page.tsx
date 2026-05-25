import type { Metadata } from "next";
import { WhatsappCrmPage } from "@/components/WhatsappCrmPage";

export const metadata: Metadata = {
  title: "Automação WhatsApp + CRM Chatwoot — Braxen",
  description:
    "Agente de IA no WhatsApp com CRM Chatwoot integrado. Atendimento 24/7, qualificação automática de leads, agendamento via Cal.com e respostas em áudio com ElevenLabs. Setup sob medida pela Braxen.",
  openGraph: {
    title: "Automação WhatsApp + CRM Chatwoot — Braxen",
    description:
      "Atendimento automatizado com IA no WhatsApp, integrado ao Chatwoot. Leads qualificados, agendamentos e handoff para humanos — tudo rodando 24/7.",
    type: "website",
  },
};

export default function Page() {
  return <WhatsappCrmPage />;
}
