"use client";

import { useTranslations } from "next-intl";
import {
  SectionHeader,
  ScrollReveal,
  StaggerChildren,
} from "@/components/ui/scroll-reveal";
import type { IndustryGroup } from "@/lib/client-logos-data";

function LogoItem({
  name,
  src,
  subBrands,
}: {
  name: string;
  src: string;
  subBrands?: string[];
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-32 items-center justify-center sm:h-20 sm:w-40">
        <img
          src={src}
          alt={name}
          className="h-12 w-auto max-w-full object-contain opacity-60 grayscale transition-opacity hover:opacity-100 sm:h-14"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent && !parent.querySelector("span")) {
              const span = document.createElement("span");
              span.className =
                "text-sm font-medium text-muted-foreground opacity-60";
              span.textContent = name;
              parent.appendChild(span);
            }
          }}
        />
      </div>
      {subBrands && subBrands.length > 0 && (
        <span className="text-[10px] tracking-[0.1em] text-muted-foreground">
          {subBrands.join(" · ")}
        </span>
      )}
    </div>
  );
}

export function IndustryLogos({
  id = "clientes",
  groups,
}: {
  id?: string;
  groups: IndustryGroup[];
}) {
  const t = useTranslations("home.logos");

  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>
            </>
          }
          description={t("description")}
          align="center"
          className="mx-auto mb-14 max-w-2xl"
          titleClassName="font-sans text-3xl md:text-5xl"
          descriptionClassName="mt-5 max-w-none"
        />

        <StaggerChildren
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          stagger={0.08}
        >
          {groups.map((group) => (
            <ScrollReveal key={group.industry}>
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-primary">
                  {t(`industries.${group.industry}`)}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {group.logos.map((logo) => (
                    <LogoItem
                      key={logo.name}
                      name={logo.name}
                      src={logo.src}
                      subBrands={logo.subBrands}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
