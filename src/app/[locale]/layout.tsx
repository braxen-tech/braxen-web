import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AttributionCapture } from "@/components/AttributionCapture";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { routing, type Locale } from "@/i18n/routing";

const OG_LOCALE_MAP: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

const HTML_LANG_MAP: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "home.metadata" });

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [HTML_LANG_MAP[loc], `/${loc}`]),
  ) as Record<string, string>;

  return {
    metadataBase: new URL("https://braxentech.com"),
    title: {
      default: t("title"),
      template: "%s — Braxen Tech",
    },
    description: t("description"),
    authors: [{ name: "Braxen Tech" }],
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      type: "website",
      locale: OG_LOCALE_MAP[locale as Locale],
      siteName: "Braxen Tech",
      images: [
        {
          url: "/og-home.jpg",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: ["/og-home.jpg"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const tJsonLd = await getTranslations({ locale, namespace: "jsonLd" });

  return (
    <html lang={HTML_LANG_MAP[locale]} suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <AttributionCapture />
            <JsonLd
              data={organizationJsonLd(tJsonLd("organizationDescription"), locale)}
            />
            <JsonLd data={websiteJsonLd(locale)} />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
