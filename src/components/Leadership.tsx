"use client";

import {
  CircularTestimonials,
  type CircularTestimonial,
} from "@/components/CircularTestimonials";
import { SectionHeader } from "@/components/ui/scroll-reveal";

const members: CircularTestimonial[] = [
  {
    name: "Hugo Lemos",
    designation: "Head of Product & UI/UX",
    src: "/hugo_profile.webp",
    quote:
      "Traduzo problemas de negócio em interfaces que funcionam — cada tela, cada fluxo e cada detalhe pensados para o usuário final e para o resultado da operação.",
  },
  {
    name: "Neemias Rocha",
    designation: "Head of Sales",
    src: "/neemias_profile.webp",
    quote:
      "Com dez anos conectando estratégia comercial à execução, entendo a dor do cliente antes da primeira reunião e garanto valor mensurável desde o dia um.",
  },
  {
    name: "Rodrigo Gama",
    designation: "Head of Engineering",
    src: "/rodrigo_profile.webp",
    quote:
      "Conduzo times pequenos em ciclos curtos, com foco em entregas que sustentam carga real sem quebrar na segunda versão.",
  },
  {
    name: "Tiago Rocha",
    designation: "Head of AI & Platform",
    src: "/tiago_profile.webp",
    quote:
      "Projeto agentes e automações que geram valor real, e mantenho a plataforma por trás deles confiável, observável e pronta para escalar.",
  },
];

export function Leadership() {
  return (
    <section
      id="leadership"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-12 md:mb-16"
          title={
            <>
              Liderança técnica{" "}
              <em className="italic text-muted-foreground">de alto nível</em>.
            </>
          }
          description="Nosso time carrega experiência das maiores empresas de tecnologia do mundo. Cada projeto da Braxen é conduzido por especialistas que já entregaram sistemas críticos em escala."
          titleClassName="mb-0 font-sans text-heading-2"
          descriptionClassName="mx-auto max-w-2xl leading-relaxed mt-8 max-w-none"
        />

        <CircularTestimonials testimonials={members} />
      </div>
    </section>
  );
}
