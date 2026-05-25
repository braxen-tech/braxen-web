import type { Metadata } from "next";
import { WhatsappCrmPage } from "@/components/WhatsappCrmPage";

export const metadata: Metadata = {
  title: "Automação WhatsApp + CRM Chatwoot",
  description:
    "Agente de IA no WhatsApp com CRM Chatwoot integrado. Atendimento 24/7, qualificação automática de leads, agendamento via Cal.com e respostas em áudio com ElevenLabs. Setup sob medida pela Braxen.",
  openGraph: {
    title: "Automação WhatsApp + CRM Chatwoot — Braxen",
    description:
      "Atendimento automatizado com IA no WhatsApp, integrado ao Chatwoot. Leads qualificados, agendamentos e handoff para humanos — tudo rodando 24/7.",
    type: "website",
    images: [{ url: "/og-whatsapp-crm.jpg", width: 1200, height: 630, alt: "WhatsApp + CRM Chatwoot — Braxen" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-whatsapp-crm.jpg"],
  },
  alternates: {
    canonical: "/whatsapp-crm",
  },
};

export default function Page() {
  return <WhatsappCrmPage />;
}
