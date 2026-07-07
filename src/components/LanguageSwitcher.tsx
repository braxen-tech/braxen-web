"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({ className, compact = false }: Props) {
  const t = useTranslations("language");
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const changeLocale = (locale: Locale) => {
    setOpen(false);
    if (locale === activeLocale) return;
    if (typeof globalThis.document !== "undefined") {
      const oneYear = 60 * 60 * 24 * 365;
      // eslint-disable-next-line react-hooks/immutability
      globalThis.document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${oneYear}; samesite=lax`;
    }
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("label")}
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border bg-transparent px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-card cursor-pointer disabled:opacity-60",
          compact && "px-2",
        )}
      >
        <Globe className="size-3.5" aria-hidden />
        <span>{activeLocale.toUpperCase()}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-md border border-border bg-background shadow-lg"
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              role="menuitem"
              onClick={() => changeLocale(loc)}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-card cursor-pointer",
                loc === activeLocale && "text-primary",
              )}
            >
              <span>{t(loc)}</span>
              {loc === activeLocale && (
                <Check className="size-3.5" aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
