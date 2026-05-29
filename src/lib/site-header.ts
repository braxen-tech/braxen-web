import { cn } from "@/lib/utils";

/** Fixed header shell — blur + solid bg when scrolled so nav stays readable over light content. */
export function siteHeaderClass(scrolled: boolean) {
  return cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
    scrolled
      ? "border-b border-border bg-background/95 shadow-[0_8px_32px_rgb(0_0_0/0.55)] backdrop-blur-xl"
      : "bg-transparent",
  );
}

/** Hero-only invert effect; disabled once user scrolls. */
export function siteHeaderInnerClass(scrolled: boolean) {
  return cn(
    "flex items-center justify-between px-6 py-6 text-foreground md:px-10",
    !scrolled && "mix-blend-difference",
  );
}
