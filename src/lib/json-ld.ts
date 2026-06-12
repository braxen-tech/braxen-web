import { SITE_URL, SOCIAL_LINKS_LIST } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Braxen Tech",
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description:
      "Software sob medida, agentes de IA e automações para empresas no Brasil.",
    sameAs: SOCIAL_LINKS_LIST,
    areaServed: "BR",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Braxen Tech",
    url: SITE_URL,
    inLanguage: "pt-BR",
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
