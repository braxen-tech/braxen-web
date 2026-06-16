import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { AtendimentoIaPage } from "@/components/AtendimentoIaPage";
import { atendimentoIaFaq } from "@/lib/faq-data";
import { faqPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Agentes de IA Omnichannel + CRM Integrado",
  description:
    "Agentes de IA no WhatsApp, Telegram, e-mail e chat no site. CRM integrado, agendamentos, vendas e integração com suas APIs. Proposta em 24h.",
  openGraph: {
    title: "Agentes de IA Omnichannel + CRM Integrado — Braxen",
    description:
      "Agentes de IA que atendem em todos os canais com CRM integrado. Agenda, vendas na conversa e integração com suas APIs. Proposta em 24h.",
    type: "website",
    images: [
      {
        url: "/og-atendimento-ia.jpg",
        width: 1200,
        height: 630,
        alt: "Agentes de IA omnichannel — Braxen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-atendimento-ia.jpg"],
  },
  alternates: {
    canonical: "/atendimento-ia",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(atendimentoIaFaq)} />
      <AtendimentoIaPage />
    </>
  );
}
