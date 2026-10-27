"use client";

import { useTranslations } from "next-intl";

export function HighlightBanner() {
  const t = useTranslations("home.highlight");

  return (
    <section className="relative mx-6 overflow-hidden rounded-3xl md:mx-10 lg:mx-auto lg:max-w-7xl" style={{ minHeight: 420 }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/highlight-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center justify-center p-8 md:p-16" style={{ minHeight: 420 }}>
        <div className="mx-auto max-w-lg rounded-2xl border border-white/15 bg-white/40 p-8 text-center shadow-lg backdrop-blur-sm md:p-12">
          <h3 className="text-display-3">
            {t("headingLead")}
            <br />
            <em className="italic">{t("headingEm")}</em>
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700">
            {t("description")}
          </p>
          {t("cta") && (
            <a href={t("href")} className="btn btn-pill mt-6 inline-flex">
              {t("cta")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
