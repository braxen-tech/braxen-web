import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { TechSquadsPage } from "@/components/TechSquadsPage";
import { TECH_SQUADS_FAQ_COUNT } from "@/lib/faq-data";
import { faqPageJsonLd } from "@/lib/json-ld";
import { ROUTES } from "@/lib/routes";
import { routing, type Locale } from "@/i18n/routing";

const HTML_LANG_MAP: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({
    locale,
    namespace: "techSquads.metadata",
  });

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [
      HTML_LANG_MAP[loc],
      `/${loc}${ROUTES.techSquads}`,
    ]),
  ) as Record<string, string>;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      images: [
        {
          url: "/og-tech-squads.jpg",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-tech-squads.jpg"],
    },
    alternates: {
      canonical: `/${locale}${ROUTES.techSquads}`,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}${ROUTES.techSquads}`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "techSquads.faq" });
  const items = Array.from({ length: TECH_SQUADS_FAQ_COUNT }, (_, i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }));

  return (
    <>
      <JsonLd data={faqPageJsonLd(items)} />
      <TechSquadsPage />
    </>
  );
}
