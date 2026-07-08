"use client";

import { Check, X } from "lucide-react";
import {
  ScrollReveal,
  SectionHeader,
  StaggerChildren,
} from "@/components/ui/scroll-reveal";
import { cn, imageSrc, type ImageSrc } from "@/lib/utils";

export type FeatureListItem = {
  title: string;
  description: string;
};

export type FeatureSectionProps = {
  id?: string;
  title: string;
  subtitle: string;
  items: FeatureListItem[];
  image: ImageSrc;
  imageAlt: string;
  variant?: "problem" | "solution";
  reverse?: boolean;
  className?: string;
};

export function FeatureSection({
  id,
  title,
  subtitle,
  items,
  image,
  imageAlt,
  variant = "solution",
  reverse = false,
  className,
}: FeatureSectionProps) {
  const Icon = variant === "problem" ? X : Check;

  return (
    <section id={id} className={cn("px-6 py-20 md:px-10 md:py-28", className)}>
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-8 rounded-sm p-6 md:p-8 lg:grid-cols-2 lg:gap-12",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="flex flex-col gap-8 md:gap-10">
            <SectionHeader
              title={title}
              description={subtitle}
              titleClassName="max-w-xl font-sans text-heading-2"
              descriptionClassName="max-w-xl text-base md:text-lg"
            />

            <StaggerChildren className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:pl-2">
              {items.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <Icon
                    className={cn(
                      "mt-1 size-4 shrink-0",
                      variant === "problem"
                        ? "text-muted-foreground"
                        : "text-primary",
                    )}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-sans text-sm md:text-base">
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </div>

          <ScrollReveal className="overflow-hidden rounded-sm border border-border bg-muted">
            <img
              src={imageSrc(image)}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover grayscale-[0.15]"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export { FeatureSection as Feature };
