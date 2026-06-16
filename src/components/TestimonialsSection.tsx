"use client";

import {
  ScrollReelTestimonials,
  type ScrollReelTestimonial,
} from "@/components/ScrollReelTestimonials";
import { SectionHeader } from "@/components/ui/scroll-reveal";
import { atendimentoIaTestimonials } from "@/lib/atendimento-ia-testimonials";

type TestimonialsSectionProps = {
  id?: string;
  testimonials?: ScrollReelTestimonial[];
  description?: string;
};

export function TestimonialsSection({
  id,
  testimonials = atendimentoIaTestimonials,
  description = "Resultados reais em atendimento, CRM e automação.",
}: TestimonialsSectionProps) {
  return (
    <section
      id={id}
      className="border-t border-border px-6 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-12"
          title={
            <>
              Quem já confia na{" "}
              <em className="italic text-muted-foreground">Braxen</em>
            </>
          }
          description={description}
          titleClassName="mb-0 font-sans text-3xl md:text-5xl"
          descriptionClassName="mx-auto mt-4 max-w-lg max-w-none"
        />

        <div className="flex justify-center">
          <ScrollReelTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
