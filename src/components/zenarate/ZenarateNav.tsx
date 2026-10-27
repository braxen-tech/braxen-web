"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function ZenarateNav() {
  const t = useTranslations("home.nav");
  const locale = useLocale();
  const base = `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("industries"), href: `${base}#industrias` },
    { label: t("cases"), href: `${base}#cases` },
    { label: t("contact"), href: `${base}#contato` },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Left pill: logo + links */}
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-2.5 transition-all duration-300",
            scrolled
              ? "bg-white shadow-lg shadow-black/5"
              : "bg-white/95 shadow-lg shadow-black/5"
          )}
        >
          <a
            href={base}
            className="pl-3 pr-3 text-lg font-semibold tracking-tight text-[var(--foreground)]"
          >
            Braxen<span className="text-[var(--accent-gold)]">.</span>
          </a>

          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-5 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: language + CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher compact className="[&_button]:border-0 [&_button]:bg-white/95 [&_button]:shadow-lg [&_button]:shadow-black/5 [&_button]:text-[var(--foreground)]" />
          <a
            href={`${base}#contato`}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              scrolled
                ? "bg-[var(--accent-gold)] text-[#1a1a1a] hover:bg-[var(--accent-gold-hover)]"
                : "bg-white/95 text-[var(--foreground)] shadow-lg shadow-black/5 hover:bg-white"
            )}
          >
            {t("cta")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "rounded-full p-2 md:hidden transition-all",
            scrolled
              ? "bg-white text-[var(--foreground)] shadow-lg shadow-black/5"
              : "bg-white/95 text-[var(--foreground)] shadow-lg shadow-black/5"
          )}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 mt-1 overflow-visible rounded-2xl bg-white p-4 shadow-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <LanguageSwitcher compact />
            <a
              href={`${base}#contato`}
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-[var(--accent-gold)] px-4 py-2.5 text-center text-sm font-medium text-[#1a1a1a]"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
