"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CustomerStories() {
  const t = useTranslations("home.customerStories");
  const scrollRef = useRef<HTMLDivElement>(null);

  const items: { quote: string; author: string }[] = t.raw("items") ?? [];
  const stats: { value: string; caption: string; source: string }[] = t.raw("stats") ?? [];

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
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
            <a href={t("viewAllHref")} className="mr-4 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
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
          <div key={i} className="min-w-[300px] max-w-[340px] shrink-0 snap-start">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-6">
              <div>
                <div className="mb-4 h-48 rounded-xl bg-[var(--muted)]" />
                <p className="mb-2 text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  {item.author.split("·")[1]?.trim() ?? "Cliente"}
                </p>
                <p className="text-display-3 leading-snug">"{item.quote.slice(0, 80)}…"</p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">{item.author.split("·")[0]?.trim()}</p>
                <span className="text-sm text-[var(--muted-foreground)]">Saiba mais →</span>
              </div>
            </div>
          </div>
        ))}

        {stats.map((stat, i) => (
          <div key={`stat-${i}`} className="min-w-[260px] max-w-[280px] shrink-0 snap-start">
            <div className="flex h-full flex-col justify-center rounded-2xl bg-[var(--muted)] p-8">
              <span className="text-display-1 font-serif">{stat.value}</span>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{stat.caption}</p>
              <p className="mt-4 text-xs text-[var(--muted-foreground)]">{stat.source}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
