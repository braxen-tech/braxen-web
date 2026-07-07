import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ROUTES } from "@/lib/routes";

const HTML_LANG_MAP: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

const PATHS = [
  { path: "", priority: 1 as const, changeFrequency: "monthly" as const },
  { path: ROUTES.aiAgents, priority: 0.9 as const, changeFrequency: "monthly" as const },
  { path: ROUTES.clinics, priority: 0.9 as const, changeFrequency: "monthly" as const },
  { path: ROUTES.techSquads, priority: 0.9 as const, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://braxentech.com";
  const now = new Date();

  return PATHS.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => {
      const alternateLanguages = Object.fromEntries(
        routing.locales.map((loc) => [
          HTML_LANG_MAP[loc],
          `${baseUrl}/${loc}${path}`,
        ]),
      );

      return {
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ...alternateLanguages,
            "x-default": `${baseUrl}/${routing.defaultLocale}${path}`,
          },
        },
      };
    }),
  );
}
