"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function InsightsGrid() {
  const t = useTranslations("home.insights");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const items: { category: string; title: string; href: string; image?: string }[] = t.raw("items") ?? [];

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-display-2">
            {t("headingLead")}{" "}
            <em className="italic">{t("headingEm")}</em>.
          </h2>
          <div className="flex items-center gap-2">
            <a href="#" className="mr-4 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              {t("viewAll")} →
            </a>
            <button onClick={() => scroll("left")} className="grid size-10 place-items-center rounded-full border border-[var(--border)] transition-colors hover:bg-[var(--muted)]" aria-label="Previous">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={() => scroll("right")} className="grid size-10 place-items-center rounded-full border border-[var(--border)] transition-colors hover:bg-[var(--muted)]" aria-label="Next">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="scrollbar-none flex gap-6 overflow-x-auto px-6 md:px-10 snap-x snap-mandatory pb-4">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href.startsWith("/") ? `/${locale}${item.href}` : item.href}
            className="group min-w-[280px] max-w-[300px] shrink-0 snap-start"
          >
            <div className="aspect-[3/2] rounded-xl bg-[var(--muted)] mb-4 overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[var(--muted)] to-[var(--border)] transition-transform group-hover:scale-105" />
              )}
            </div>
            <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
              {item.category}
            </span>
            <p className="mt-1 text-sm font-medium leading-snug group-hover:text-[var(--accent-gold)] transition-colors">
              {item.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
