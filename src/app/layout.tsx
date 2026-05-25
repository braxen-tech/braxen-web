import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://braxentech.com"),
  title: {
    default: "Braxen Tech — Software sob medida, agentes de IA e automações",
    template: "%s — Braxen Tech",
  },
  description:
    "Desenvolvemos software sob medida, agentes de IA e automações que transformam operações manuais em crescimento real. WhatsApp, CRM, dashboards e mais.",
  authors: [{ name: "Braxen Tech" }],
  keywords: [
    "software sob medida",
    "agentes de IA",
    "automação WhatsApp",
    "CRM Chatwoot",
    "desenvolvimento de software",
    "inteligência artificial",
    "automação de processos",
    "dashboard",
    "Braxen",
  ],
  openGraph: {
    title: "Braxen Tech — Software sob medida, agentes de IA e automações",
    description:
      "Software sob medida, agentes de IA e automações que transformam operações manuais em crescimento real.",
    type: "website",
    locale: "pt_BR",
    siteName: "Braxen Tech",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Braxen Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Braxen Tech — Software sob medida, agentes de IA e automações",
    description:
      "Software sob medida, agentes de IA e automações que transformam operações manuais em crescimento real.",
    images: ["/og-home.jpg"],
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
      <body>{children}</body>
    </html>
  );
}
