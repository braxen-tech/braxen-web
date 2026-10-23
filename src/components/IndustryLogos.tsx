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
  href,
}: {
  name: string;
  src: string;
  href?: string;
}) {
  const content = (
    <div className="flex h-16 w-28 items-center justify-center sm:h-20 sm:w-36 md:h-20 md:w-40">
      <img
        src={src}
        alt={name}
        className="h-10 w-auto max-w-full object-contain opacity-70 grayscale transition-opacity hover:opacity-100 dark:invert sm:h-12 md:h-14"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          const parent = (e.target as HTMLImageElement).parentElement;
          if (parent && !parent.querySelector("span")) {
            const span = document.createElement("span");
            span.className =
              "text-xs font-medium text-muted-foreground opacity-70";
            span.textContent = name;
            parent.appendChild(span);
          }
        }}
      />
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

export function IndustryLogos({
  id = "clientes",
  groups,
}: {
  id?: string;
  groups: IndustryGroup[];
}) {
  const t = useTranslations("home.logos");

  const allLogos = groups.flatMap((g) => g.logos);
  const industries = groups.map((g) => t(`industries.${g.industry}`));

  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>
            </>
          }
          align="center"
          className="mx-auto mb-10 max-w-2xl"
          titleClassName="font-sans text-3xl md:text-5xl"
        />

        <ScrollReveal>
          <p className="mb-8 text-center text-[10px] font-medium tracking-[0.25em] uppercase text-primary">
            {industries.join(" · ")}
          </p>
        </ScrollReveal>

        <StaggerChildren
          className="grid grid-cols-2 place-items-center gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          stagger={0.05}
        >
          {allLogos.map((logo) => (
            <ScrollReveal key={logo.name}>
              <LogoItem name={logo.name} src={logo.src} />
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
