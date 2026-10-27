"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FaqSection() {
  const t = useTranslations("home.faq");
  const items: { q: string; a: string }[] = t.raw("items") ?? [];

  return (
    <section className="px-6 py-24 md:px-10 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-display-2 text-center mb-16">
          {t("headingLead")}{" "}
          <em className="italic">{t("headingEm")}</em>.
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[var(--border)]">
              <AccordionTrigger className="py-6 text-left text-base font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--muted-foreground)] leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
