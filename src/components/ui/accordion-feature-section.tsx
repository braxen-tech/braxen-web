"use client";

import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  solutionFeatures,
  solutionImageSrc,
  type SolutionFeature,
} from "@/lib/solutions-data";
import { cn } from "@/lib/utils";
import {
  ScrollReveal,
  SectionHeader,
} from "@/components/ui/scroll-reveal";

export type AccordionFeatureSectionProps = {
  id?: string;
  title?: ReactNode;
  description?: string;
  features?: SolutionFeature[];
  className?: string;
};

export function AccordionFeatureSection({
  id,
  title = (
    <>
      Entregas<span className="text-primary">.</span>
    </>
  ),
  description = "De agentes de IA a dashboards sob medida — cada projeto é construído para o seu processo.",
  features = solutionFeatures,
  className,
}: AccordionFeatureSectionProps) {
  const [activeValue, setActiveValue] = useState(`item-${features[0]?.id ?? 1}`);
  const activeFeature =
    features.find((feature) => `item-${feature.id}` === activeValue) ??
    features[0];

  return (
    <section
      id={id}
      className={cn(
        "border-t border-border px-6 py-24 md:px-10 md:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={title}
          description={description}
          className="mb-10 md:mb-14"
          titleClassName="font-sans text-heading-2"
          descriptionClassName="max-w-md"
        />

        <div
          className="flex w-full items-start justify-between gap-10 lg:gap-16"
          role="region"
          aria-label="Entregas e projetos da Braxen"
        >
          <div className="w-full md:w-1/2">
            <Accordion
              type="single"
              collapsible={false}
              value={activeValue}
              onValueChange={(value) => {
                if (value) setActiveValue(value);
              }}
              className="w-full"
            >
              {features.map((feature) => {
                const itemValue = `item-${feature.id}`;
                const isActive = activeValue === itemValue;

                return (
                  <AccordionItem key={feature.id} value={itemValue}>
                    <AccordionTrigger className="cursor-pointer py-5 no-underline hover:no-underline">
                      <div className="text-left">
                        <p className="mb-1 text-[10px] tracking-[0.25em] uppercase text-primary">
                          {feature.tag}
                        </p>
                        <h3
                          className={cn(
                            "font-sans text-xl leading-tight transition-colors md:text-2xl",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {feature.title}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                      <div className="mt-5 md:hidden">
                        <img
                          src={solutionImageSrc(feature)}
                          alt={feature.title}
                          className="aspect-4/3 w-full rounded-sm object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          <ScrollReveal className="relative m-auto hidden w-1/2 overflow-hidden rounded-sm border border-border bg-muted md:block">
            <img
              key={activeFeature.id}
              src={solutionImageSrc(activeFeature)}
              alt={activeFeature.title}
              className="aspect-4/3 w-full object-cover transition-opacity duration-300"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/75">
                {activeFeature.tag}
              </p>
              <p className="mt-1 font-sans text-lg text-white">
                {activeFeature.title}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export { AccordionFeatureSection as Feature197 };
