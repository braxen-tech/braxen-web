import type { Metadata } from "next";
import { TechSquadsPage } from "@/components/TechSquadsPage";

export const metadata: Metadata = {
  title: "Tech Squads — Times de Tecnologia Sob Medida",
  description:
    "Squads completos de desenvolvimento, produto, dados e IA integrados ao seu time. Profissionais seniores, gestão técnica ativa e flexibilidade total. Monte seu squad com a Braxen.",
  openGraph: {
    title: "Tech Squads — Times de Tecnologia Sob Medida — Braxen",
    description:
      "Squads de desenvolvimento, produto, dados e IA integrados ao seu time. Sem inflar estrutura, sem meses de recrutamento.",
    type: "website",
    images: [
      {
        url: "/og-tech-squads.jpg",
        width: 1200,
        height: 630,
        alt: "Tech Squads — Braxen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-tech-squads.jpg"],
  },
  alternates: {
    canonical: "/tech-squads",
  },
};

export default function Page() {
  return <TechSquadsPage />;
}
