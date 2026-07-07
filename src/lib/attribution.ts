export const ATTRIBUTION_STORAGE_KEY = "braxen_attribution";

export type ContactAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
};

const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

type AttributionParamKey = (typeof ATTRIBUTION_PARAM_KEYS)[number];

const MAX_ATTRIBUTION_LENGTH = 200;

export function readAttributionFromSearchParams(
  params: URLSearchParams,
): ContactAttribution {
  const attribution: ContactAttribution = {};

  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      attribution[key] = value.slice(0, MAX_ATTRIBUTION_LENGTH);
    }
  }

  return attribution;
}

export function hasAttributionData(
  attribution: ContactAttribution,
): boolean {
  return Object.values(attribution).some((value) => value?.length > 0);
}

export function readStoredAttribution(): ContactAttribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ContactAttribution;
    return sanitizeAttribution(parsed);
  } catch {
    return {};
  }
}

export function storeAttribution(attribution: ContactAttribution): void {
  if (typeof window === "undefined" || !hasAttributionData(attribution)) return;
  sessionStorage.setItem(
    ATTRIBUTION_STORAGE_KEY,
    JSON.stringify(sanitizeAttribution(attribution)),
  );
}

export function captureAttributionFromUrl(): ContactAttribution {
  if (typeof window === "undefined") return {};

  const fromUrl = readAttributionFromSearchParams(
    new URLSearchParams(window.location.search),
  );

  if (hasAttributionData(fromUrl)) {
    storeAttribution(fromUrl);
    return fromUrl;
  }

  return readStoredAttribution();
}

function sanitizeAttribution(
  attribution: ContactAttribution,
): ContactAttribution {
  const sanitized: ContactAttribution = {};

  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = attribution[key];
    if (typeof value === "string" && value.trim()) {
      sanitized[key] = value.trim().slice(0, MAX_ATTRIBUTION_LENGTH);
    }
  }

  return sanitized;
}

export function validateAttributionField(
  key: AttributionParamKey,
  value: unknown,
): string | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > MAX_ATTRIBUTION_LENGTH) return undefined;

  return trimmed;
}
