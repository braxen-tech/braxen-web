import type { Locale } from "@/i18n/routing";

/** Section anchor slugs per locale, so in-page hash links match the displayed language. */
export const ANCHORS = {
  pain: { pt: "problema", en: "pain", es: "problema" },
  howWeDo: { pt: "como-fazemos", en: "how-we-do", es: "como-lo-hacemos" },
  deliveries: { pt: "entregas", en: "deliveries", es: "entregas" },
  team: { pt: "lideranca", en: "leadership", es: "liderazgo" },
  contact: { pt: "contato", en: "contact", es: "contacto" },
  services: { pt: "servicos", en: "services", es: "servicios" },
  challenges: { pt: "desafios", en: "challenges", es: "desafios" },
  howItWorks: { pt: "como-funciona", en: "how-it-works", es: "como-funciona" },
  differentials: {
    pt: "diferenciais",
    en: "differentiators",
    es: "diferenciales",
  },
  profiles: { pt: "perfis", en: "profiles", es: "perfiles" },
  faq: { pt: "faq", en: "faq", es: "faq" },
  superpowers: { pt: "superpoderes", en: "superpowers", es: "superpoderes" },
} as const satisfies Record<string, Record<Locale, string>>;

export type AnchorKey = keyof typeof ANCHORS;

/** `locale` accepts the raw string from `useLocale()`, which next-intl types as `string`. */
export function anchorId(locale: string, key: AnchorKey): string {
  return ANCHORS[key][locale as Locale];
}

export function anchorHref(locale: string, key: AnchorKey): string {
  return `#${anchorId(locale, key)}`;
}
