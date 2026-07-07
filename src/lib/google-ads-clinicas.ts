import { SITE_URL } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

export const CLINICAS_LANDING_PATH = ROUTES.clinics;

export const CLINICAS_CAMPAIGN_NAME = "Search | Clínicas | Atendimento Omnichannel";

export const CLINICAS_DEFAULT_UTM = {
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "clinicas-search",
} as const;

export const CLINICAS_NEGATIVE_KEYWORDS = [
  "grátis",
  "gratis",
  "curso",
  "emprego",
  "vaga",
  "como abrir clínica",
  "como abrir clinica",
  "software grátis",
  "software gratis",
  "planilha",
  "diy",
] as const;

export type ClinicasAdGroup = {
  name: string;
  intent: string;
  keywords: readonly string[];
  headlineHints: readonly string[];
};

export const CLINICAS_AD_GROUPS: readonly ClinicasAdGroup[] = [
  {
    name: "Agendamento",
    intent: "Quer resolver agenda",
    keywords: [
      "agendamento automático clínica",
      "agendamento automatico clinica",
      "agendar consulta online clínica",
      "agendar consulta online clinica",
    ],
    headlineHints: [
      "Agendamento automático para clínicas",
      "Agende consultas 24h",
    ],
  },
  {
    name: "Recepção omnichannel",
    intent: "Dor operacional",
    keywords: [
      "automação atendimento clínica",
      "automacao atendimento clinica",
      "centralizar atendimento clínica",
      "inbox única clínica",
    ],
    headlineHints: [
      "Atendimento omnichannel para clínicas",
      "WhatsApp, e-mail e chat unificados",
    ],
  },
  {
    name: "WhatsApp clínica",
    intent: "Canal mais buscado no vertical",
    keywords: [
      "automação whatsapp consultório",
      "automacao whatsapp consultorio",
      "atendimento whatsapp clínica",
      "atendimento whatsapp clinica",
    ],
    headlineHints: [
      "Automação WhatsApp para clínicas",
      "Atendimento WhatsApp 24h",
    ],
  },
  {
    name: "Confirmação / no-show",
    intent: "Dor de faltas",
    keywords: [
      "confirmação de consulta automática",
      "confirmacao de consulta automatica",
      "lembrete consulta automático",
      "lembrete consulta automatico",
    ],
    headlineHints: [
      "Confirmação automática de consultas",
      "Reduza faltas na clínica",
    ],
  },
  {
    name: "Chatbot / agente IA",
    intent: "Solução",
    keywords: [
      "chatbot para clínica",
      "chatbot para clinica",
      "agente ia clínica",
      "agente ia clinica",
      "chat no site clínica",
    ],
    headlineHints: [
      "Agente de IA para clínicas",
      "Chat inteligente no site",
    ],
  },
];

export const CLINICAS_AD_COPY = {
  headlines: [
    "Atendimento Omnichannel para Clínicas",
    "WhatsApp, e-mail, chat e SMS unificados",
    "Agendamento e triagem 24h",
    "Proposta em 24h · no ar em semanas",
  ],
  description:
    "Unifique WhatsApp, Gmail, Telegram, SMS e chat do site em uma inbox. Agente de IA com agenda integrada e handoff para recepção.",
} as const;

export function buildClinicasLandingUrl(
  overrides?: Partial<typeof CLINICAS_DEFAULT_UTM>,
): string {
  const params = new URLSearchParams({
    ...CLINICAS_DEFAULT_UTM,
    ...overrides,
  });

  return `${SITE_URL}${CLINICAS_LANDING_PATH}?${params.toString()}`;
}
