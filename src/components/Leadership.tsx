"use client";

import { useTranslations } from "next-intl";
import {
  CircularTestimonials,
  type CircularTestimonial,
} from "@/components/CircularTestimonials";
import { SectionHeader } from "@/components/ui/scroll-reveal";

const memberSlots = [
  { key: 0, src: "/hugo_profile.webp" },
  { key: 1, src: "/neemias_profile.webp" },
  { key: 2, src: "/rodrigo_profile.webp" },
  { key: 3, src: "/tiago_profile.webp" },
];

export function Leadership() {
  const t = useTranslations("home.leadership");

  const members: CircularTestimonial[] = memberSlots.map((slot, index) => ({
    name: t(`members.${index}.name`),
    designation: t(`members.${index}.designation`),
    quote: t(`members.${index}.quote`),
    src: slot.src,
  }));

  return (
    <section id="leadership" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-12 md:mb-16"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>.
            </>
          }
          description={t("description")}
          titleClassName="mb-0 font-sans text-heading-2"
          descriptionClassName="mx-auto max-w-2xl leading-relaxed mt-8 max-w-none"
        />

        <CircularTestimonials
          testimonials={members}
          labels={{ prev: t("prev"), next: t("next") }}
        />
      </div>
    </section>
  );
}
