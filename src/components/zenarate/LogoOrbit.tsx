"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { clientLogosByIndustry, type LogoCarouselItem } from "@/lib/client-logos-data";

const ALL_LOGOS: LogoCarouselItem[] = clientLogosByIndustry.flatMap((g) => g.logos);

const RINGS_DESKTOP = [
  { id: "small", radius: 240, count: 6, speed: 180, dir: 1 },
  { id: "medium", radius: 420, count: 10, speed: 135, dir: -1 },
  { id: "large", radius: 600, count: 16, speed: 90, dir: 1 },
] as const;

const RINGS_MOBILE = [
  { id: "small", radius: 130, count: 6, speed: 180, dir: 1 },
  { id: "medium", radius: 230, count: 8, speed: 135, dir: -1 },
  { id: "large", radius: 330, count: 12, speed: 90, dir: 1 },
] as const;

export function LogoOrbit() {
  const t = useTranslations("home.logoCloud");
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const RINGS = isMobile ? RINGS_MOBILE : RINGS_DESKTOP;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        const gsap = gsapMod.gsap;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const triggers: globalThis.ScrollTrigger[] = [];

        RINGS.forEach((ring) => {
          const el = section.querySelector(`[data-ring="${ring.id}"]`) as HTMLElement | null;
          if (!el) return;

          const proxy = { r: 0 };
          gsap.to(proxy, {
            r: ring.speed * ring.dir,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              onUpdate(self) {
                triggers.push(self);
              },
            },
            onUpdate() {
              el.style.transform = `translate(-50%, -50%) rotate(${proxy.r}deg)`;
            },
          });
        });

        cleanup = () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      }
    );

    return () => cleanup?.();
  }, []);

  let logoIdx = 0;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
      style={{ height: "clamp(700px, 100vw, 1100px)" }}
    >
      {/* Rings */}
      {RINGS.map((ring) => {
        const step = 360 / ring.count;
        const dots = Array.from({ length: ring.count }, (_, i) => {
          const logo = ALL_LOGOS[logoIdx++ % ALL_LOGOS.length];
          const angle = i * step;
          return { angle, logo };
        });

        return (
          <div
            key={ring.id}
            data-ring={ring.id}
            className="absolute top-1/2 left-1/2 rounded-full border border-[rgba(208,208,206,0.15)]"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              transform: "translate(-50%, -50%) rotate(0deg)",
            }}
          >
            {dots.map((dot, i) => {
              const rad = (dot.angle * Math.PI) / 180;
              const x = Math.cos(rad) * ring.radius;
              const y = Math.sin(rad) * ring.radius;
              const tileSize = isMobile
                ? (ring.id === "small" ? 64 : ring.id === "medium" ? 72 : 80)
                : (ring.id === "small" ? 110 : ring.id === "medium" ? 125 : 140);

              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: `${tileSize}px`,
                    height: `${tileSize}px`,
                    top: "50%",
                    left: "50%",
                    transform: `translate(calc(-50% + ${Math.round(x)}px), calc(-50% + ${Math.round(y)}px))`,
                  }}
                >
                  <div
                    className="grid h-full w-full place-items-center rounded-[14px] border border-[rgba(208,208,206,0.2)] bg-[#F5F5F2] p-2 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                    style={{
                      transform: `rotate(calc(-1 * var(--parent-rotation, 0deg)))`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dot.logo.src}
                      alt={dot.logo.name}
                      loading="lazy"
                      className="max-h-[70%] max-w-[70%] object-contain opacity-70 grayscale"
                      onError={(e) => {
                        const span = document.createElement("span");
                        span.className = "text-[0.5rem] font-medium text-center leading-tight text-[var(--muted-foreground)]";
                        span.textContent = dot.logo.name;
                        (e.target as HTMLElement).replaceWith(span);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Fade: radial center + top/bottom edges */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse 320px 240px at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.97) 35%, rgba(255,255,255,0) 100%),
            linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, transparent 12%, transparent 88%, rgba(255,255,255,0.95) 100%)
          `,
        }}
      />

      {/* Center heading */}
      <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-6">
        <h3 className="m-0 max-w-[16ch] text-center text-display-2 text-balance">
          {t("titleLead")}{" "}
          <em className="italic">{t("titleEm")}</em>{" "}
          {t("titleTail")}
        </h3>
      </div>
    </section>
  );
}
