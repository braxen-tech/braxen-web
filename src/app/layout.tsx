import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://braxentech.com"),
  title: {
    default: "Braxen Tech — Software sob medida, agentes de IA e automações",
    template: "%s — Braxen Tech",
  },
  description:
    "Desenvolvemos software sob medida, agentes de IA e automações para empresas no Brasil. Primeira entrega em semanas. Fale conosco — resposta em 24h.",
  authors: [{ name: "Braxen Tech" }],
  openGraph: {
    title: "Braxen Tech — Software sob medida, agentes de IA e automações",
    description:
      "Software sob medida, agentes de IA e automações para empresas no Brasil. Primeira entrega em semanas. Resposta em 24h.",
    type: "website",
    locale: "pt_BR",
    siteName: "Braxen Tech",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Braxen Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Braxen Tech — Software sob medida, agentes de IA e automações",
    description:
      "Software sob medida, agentes de IA e automações para empresas no Brasil. Primeira entrega em semanas. Resposta em 24h.",
    images: ["/og-home.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
