"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

const CITIES = [
  { key: "saoPaulo", tz: "America/Sao_Paulo" },
  { key: "lisboa", tz: "Europe/Lisbon" },
  { key: "novaYork", tz: "America/New_York" },
  { key: "delhi", tz: "Asia/Kolkata" },
] as const;

function CityClocks() {
  const t = useTranslations("home.footer.cities");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-8 md:gap-12 text-sm text-[var(--muted-foreground)]">
      {CITIES.map((city) => {
        const time = now.toLocaleTimeString("en-US", {
          timeZone: city.tz,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return (
          <div key={city.key}>
            <div className="text-xs uppercase tracking-widest mb-1">{t(`${city.key}.name`)}</div>
            <div className="font-medium text-[var(--foreground)]">{time}</div>
          </div>
        );
      })}
    </div>
  );
}

export function ZenarateFooter() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const base = `/${locale}`;

  const columns = [
    {
      label: t("sections.solutions"),
      links: [
        { title: "Agentes de IA", href: `${base}${ROUTES.aiAgents}` },
        { title: "Tech Squads", href: `${base}${ROUTES.techSquads}` },
        { title: "Clínicas", href: `${base}${ROUTES.clinics}` },
      ],
    },
    {
      label: "Recursos",
      links: [
        { title: "Cases", href: "#" },
        { title: "FAQ", href: "#faq" },
      ],
    },
    {
      label: "Empresa",
      links: [
        { title: "Sobre", href: "#" },
        { title: "Contato", href: `${base}#contato` },
      ],
    },
    {
      label: "Redes",
      links: [
        { title: "LinkedIn", href: SOCIAL_LINKS.linkedin },
        { title: "Instagram", href: SOCIAL_LINKS.instagram },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Clocks */}
        <div className="mb-12">
          <CityClocks />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16">
          {columns.map((col) => (
            <div key={col.label}>
              <h4 className="mb-4 text-xs uppercase tracking-widest">{col.label}</h4>
              <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-[var(--foreground)]"
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big brand name */}
        <div className="overflow-hidden">
          <div className="text-[clamp(4rem,15vw,12rem)] font-serif font-normal leading-none tracking-tight text-[var(--foreground)]">
            Braxen
          </div>
        </div>
      </div>
    </footer>
  );
}
