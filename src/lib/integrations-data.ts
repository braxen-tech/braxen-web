export type IntegrationLucideIcon = "webhook" | "sms";

export type IntegrationItem = {
  key: string;
  slug?: string;
  lucide?: IntegrationLucideIcon;
};

export const integrationRow1: IntegrationItem[] = [
  { key: "whatsapp", slug: "whatsapp" },
  { key: "telegram", slug: "telegram" },
  { key: "gmail", slug: "gmail" },
  { key: "sms", lucide: "sms" },
  { key: "livechat", slug: "livechat" },
  { key: "stripe", slug: "stripe" },
];

export const integrationRow2: IntegrationItem[] = [
  { key: "googlecalendar", slug: "googlecalendar" },
  { key: "caldotcom", slug: "caldotcom" },
  { key: "stripe", slug: "stripe" },
  { key: "apis", slug: "openapiinitiative" },
  { key: "webhooks", lucide: "webhook" },
  { key: "pix", slug: "pix" },
];
