"use client";

import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  image: string;
}

interface FlowingLogosProps {
  data: Logo[];
  variant?: "default" | "wide";
  className?: string;
}

export function FlowingLogos({
  data,
  variant = "default",
  className,
}: FlowingLogosProps) {
  const logoHeight = variant === "wide" ? "h-10 md:h-12" : "h-8 md:h-10";

  return (
    <div
      className={cn(
        "group flex gap-[var(--gap)] overflow-hidden [--gap:2rem]",
        className
      )}
    >
      {Array.from({ length: 2 }).map((_, setIndex) => (
        <div
          key={setIndex}
          className="flex shrink-0 animate-[canopy-x_var(--duration,30s)_linear_infinite] items-center gap-[var(--gap)]"
          aria-hidden={setIndex === 1}
        >
          {data.map((logo, i) => (
            <div
              key={`${setIndex}-${i}`}
              className="flex shrink-0 items-center justify-center px-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.image}
                alt={logo.name}
                className={cn(
                  "max-w-[120px] object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:max-w-[160px]",
                  logoHeight
                )}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
