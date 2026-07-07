"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  solutionAssets,
  solutionImageSrc,
  type SolutionAsset,
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
  features?: SolutionAsset[];
  className?: string;
};

export function AccordionFeatureSection({
  id,
  title,
  description,
  features = solutionAssets,
  className,
}: AccordionFeatureSectionProps) {
  const t = useTranslations("home.portfolio");
  const tSolutions = useTranslations("solutions.items");
  const [activeValue, setActiveValue] = useState(
    `item-${features[0]?.id ?? 1}`,
  );
  const activeFeature =
    features.find((feature) => `item-${feature.id}` === activeValue) ??
    features[0];

  const resolvedTitle: ReactNode =
    title ??
    (
      <>
        {t("title")}
        <span className="text-primary">{t("titleDot")}</span>
      </>
    );
  const resolvedDescription = description ?? t("description");
  const activeTitle = tSolutions(`${activeFeature.id}.title`);
  const activeTag = tSolutions(`${activeFeature.id}.tag`);

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
          title={resolvedTitle}
          description={resolvedDescription}
          className="mb-10 md:mb-14"
          titleClassName="font-sans text-heading-2"
          descriptionClassName="max-w-md"
        />

        <div
          className="flex w-full items-start justify-between gap-10 lg:gap-16"
          role="region"
          aria-label={t("regionLabel")}
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
                const featureTitle = tSolutions(`${feature.id}.title`);
                const featureTag = tSolutions(`${feature.id}.tag`);
                const featureDescription = tSolutions(
                  `${feature.id}.description`,
                );

                return (
                  <AccordionItem key={feature.id} value={itemValue}>
                    <AccordionTrigger className="cursor-pointer py-5 no-underline hover:no-underline">
                      <div className="text-left">
                        <p className="mb-1 text-[10px] tracking-[0.25em] uppercase text-primary">
                          {featureTag}
                        </p>
                        <h3
                          className={cn(
                            "font-sans text-xl leading-tight transition-colors md:text-2xl",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {featureTitle}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {featureDescription}
                      </p>
                      <div className="mt-5 md:hidden">
                        <img
                          src={solutionImageSrc(feature)}
                          alt={featureTitle}
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
              alt={activeTitle}
              className="aspect-4/3 w-full object-cover transition-opacity duration-300"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/75">
                {activeTag}
              </p>
              <p className="mt-1 font-sans text-lg text-white">
                {activeTitle}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export { AccordionFeatureSection as Feature197 };
