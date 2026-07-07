"use client";

import { useTranslations } from "next-intl";
import {
  ScrollReelTestimonials,
  type ScrollReelTestimonial,
} from "@/components/ScrollReelTestimonials";
import { SectionHeader } from "@/components/ui/scroll-reveal";
import { atendimentoIaTestimonialImages } from "@/lib/atendimento-ia-testimonials";

type TestimonialsSectionProps = {
  id?: string;
  testimonials?: ScrollReelTestimonial[];
  description?: string;
};

export function TestimonialsSection({
  id,
  testimonials,
  description,
}: TestimonialsSectionProps) {
  const t = useTranslations("home.testimonials");

  const resolvedTestimonials: ScrollReelTestimonial[] =
    testimonials ??
    atendimentoIaTestimonialImages.map((image, index) => ({
      quote: t(`items.${index}.quote`),
      author: t(`items.${index}.author`),
      alt: t(`items.${index}.alt`),
      image,
    }));

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
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>
            </>
          }
          description={description ?? t("description")}
          titleClassName="mb-0 font-sans text-3xl md:text-5xl"
          descriptionClassName="mx-auto mt-4 max-w-lg max-w-none"
        />

        <div className="flex justify-center">
          <ScrollReelTestimonials
            testimonials={resolvedTestimonials}
            labels={{
              prev: t("prev"),
              next: t("next"),
              region: t("regionLabel"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
