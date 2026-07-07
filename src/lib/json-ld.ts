import { SITE_URL, SOCIAL_LINKS_LIST } from "@/lib/site";

const LOCALE_TO_INLANGUAGE: Record<string, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

export function organizationJsonLd(description: string, locale = "pt") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Braxen Tech",
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description,
    sameAs: SOCIAL_LINKS_LIST,
    inLanguage: LOCALE_TO_INLANGUAGE[locale] ?? "pt-BR",
  };
}

export function websiteJsonLd(locale = "pt") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Braxen Tech",
    url: SITE_URL,
    inLanguage: LOCALE_TO_INLANGUAGE[locale] ?? "pt-BR",
  };
}

export function faqPageJsonLd(
  items: ReadonlyArray<{ q: string; a: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
