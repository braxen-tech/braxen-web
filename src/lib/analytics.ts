import type { ContactAttribution } from "@/lib/attribution";

type Gtag = (
  command: "event" | "config" | "js",
  target: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackGenerateLead(input: {
  source?: string;
  attribution?: ContactAttribution;
}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const conversionId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
  const eventParams: Record<string, unknown> = {
    event_category: "contact",
    event_label: input.source ?? "unknown",
    page_path: window.location.pathname,
  };

  if (input.attribution?.utm_campaign) {
    eventParams.campaign = input.attribution.utm_campaign;
  }

  if (input.attribution?.utm_source) {
    eventParams.source = input.attribution.utm_source;
  }

  if (input.attribution?.gclid) {
    eventParams.gclid = input.attribution.gclid;
  }

  if (conversionId) {
    window.gtag("event", "conversion", {
      send_to: conversionId,
      ...eventParams,
    });
  }

  window.gtag("event", "generate_lead", eventParams);
}
