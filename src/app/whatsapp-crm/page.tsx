import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { WhatsappCrmPage } from "@/components/WhatsappCrmPage";
import { whatsappCrmFaq } from "@/lib/faq-data";
import { faqPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Automação WhatsApp + CRM Inteligente",
  description:
    "Agente de IA no WhatsApp com CRM integrado. Atendimento 24/7, qualificação automática de leads, agendamento e respostas em áudio. Setup sob medida pela Braxen.",
  openGraph: {
    title: "Automação WhatsApp + CRM Inteligente — Braxen",
    description:
      "Atendimento automatizado com IA no WhatsApp, CRM integrado. Leads qualificados, agendamentos e handoff para humanos — tudo rodando 24/7.",
    type: "website",
    images: [{ url: "/og-whatsapp-crm.jpg", width: 1200, height: 630, alt: "WhatsApp + CRM — Braxen" }],
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
  return (
    <>
      <JsonLd data={faqPageJsonLd(whatsappCrmFaq)} />
      <WhatsappCrmPage />
    </>
  );
}
