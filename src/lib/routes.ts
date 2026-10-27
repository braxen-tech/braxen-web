/** Canonical English route slugs (without locale prefix). */
export const ROUTES = {
  clinics: "/clinics",
  aiAgents: "/ai-agents",
  techSquads: "/tech-squads",
  caseGrupoLima: "/cases/grupo-lima",
  casePlanoAssinatura: "/cases/plano-assinatura",
  caseArboreto: "/cases/arboreto",
  caseCpfSemPendencia: "/cases/cpf-sem-pendencia",
} as const;

/** Legacy Portuguese slugs → canonical English slugs (301 redirects). */
export const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  clinicas: "clinics",
  "atendimento-ia": "ai-agents",
};

export function localizedPath(locale: string, path: string): string {
  return `/${locale}${path}`;
}
