import {
  validateAttributionField,
  type ContactAttribution,
} from "@/lib/attribution";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  source?: string;
  locale: Locale;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseAttributionFields(
  body: Record<string, unknown>,
): ContactAttribution {
  return {
    utm_source: validateAttributionField("utm_source", body.utm_source),
    utm_medium: validateAttributionField("utm_medium", body.utm_medium),
    utm_campaign: validateAttributionField("utm_campaign", body.utm_campaign),
    utm_term: validateAttributionField("utm_term", body.utm_term),
    utm_content: validateAttributionField("utm_content", body.utm_content),
    gclid: validateAttributionField("gclid", body.gclid),
  };
}

function resolveLocale(value: unknown): Locale {
  if (typeof value === "string" && (routing.locales as readonly string[]).includes(value)) {
    return value as Locale;
  }
  return routing.defaultLocale;
}

export async function validateContactPayload(
  body: unknown,
): Promise<ContactValidationResult> {
  if (!body || typeof body !== "object") {
    const t = await getTranslations({
      locale: routing.defaultLocale,
      namespace: "contactForm.errors",
    });
    return { ok: false, error: t("invalidData") };
  }

  const record = body as Record<string, unknown>;
  const locale = resolveLocale(record.locale);
  const t = await getTranslations({ locale, namespace: "contactForm.errors" });

  const { name, email, message, source } = record;

  if (typeof name !== "string" || !name.trim()) {
    return { ok: false, error: t("nameRequired") };
  }

  if (name.trim().length > 100) {
    return { ok: false, error: t("nameTooLong") };
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return { ok: false, error: t("emailInvalid") };
  }

  if (email.trim().length > 255) {
    return { ok: false, error: t("emailTooLong") };
  }

  if (typeof message !== "string" || message.trim().length < 5) {
    return { ok: false, error: t("messageTooShort") };
  }

  if (message.trim().length > 2000) {
    return { ok: false, error: t("messageTooLong") };
  }

  if (source !== undefined && typeof source !== "string") {
    return { ok: false, error: t("sourceInvalid") };
  }

  if (typeof source === "string" && source.length > 120) {
    return { ok: false, error: t("sourceInvalid") };
  }

  const attribution = parseAttributionFields(record);

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      source: typeof source === "string" ? source.trim() : undefined,
      locale,
      ...attribution,
    },
  };
}
