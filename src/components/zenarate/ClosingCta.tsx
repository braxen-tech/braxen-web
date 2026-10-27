"use client";

import { useTranslations } from "next-intl";

export function ClosingCta({ ctaHref }: { ctaHref: string }) {
  const t = useTranslations("home.closingCta");

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d2d2d] via-[#3d3530] to-[#1a1a1a]" />
      <div className="absolute inset-0 bg-[url('/hero-2.mp4')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <h2 className="text-display-1 text-white">
          {t("headingLead")}{" "}
          <em className="italic">{t("headingEm")}</em>{" "}
          {t("headingTail")}{" "}
          <em className="italic">{t("headingEm2")}</em>.
        </h2>
        <div className="mt-10">
          <a href={ctaHref} className="btn btn-gold">
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
