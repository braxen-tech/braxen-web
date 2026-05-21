import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Braxen Tech — Software, sculpted.",
  description:
    "Braxen Tech is a software house crafting digital systems with the patience of a stonemason and the precision of an engineer.",
  authors: [{ name: "Braxen Tech" }],
  openGraph: {
    title: "Braxen Tech — Software, sculpted.",
    description:
      "A software house where code is craft. Systems, products, and platforms.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
