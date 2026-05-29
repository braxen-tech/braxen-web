import { cn } from "@/lib/utils";

/** Fixed header shell — blur + solid bg when scrolled so nav stays readable over light content. */
export function siteHeaderClass(scrolled: boolean) {
  return cn(
    "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
    scrolled
      ? "border-b border-border bg-background/95 shadow-[0_8px_32px_rgb(0_0_0/0.55)] backdrop-blur-xl"
      : "bg-transparent mix-blend-difference",
  );
}

/** Inner flex container for nav items. */
export function siteHeaderInnerClass(_scrolled: boolean) {
  return "mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 text-foreground md:px-10 lg:px-16";
}
