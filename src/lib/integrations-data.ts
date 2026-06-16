export type IntegrationLucideIcon = "webhook" | "sms";

export type IntegrationItem = {
  name: string;
  slug?: string;
  lucide?: IntegrationLucideIcon;
};

export const integrationRow1: IntegrationItem[] = [
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Telegram", slug: "telegram" },
  { name: "Gmail", slug: "gmail" },
  { name: "SMS", lucide: "sms" },
  { name: "Chat no site", slug: "livechat" },
  { name: "Stripe", slug: "stripe" },
];

export const integrationRow2: IntegrationItem[] = [
  { name: "G Calendar", slug: "googlecalendar" },
  { name: "Cal.com", slug: "caldotcom" },
  { name: "Stripe", slug: "stripe" },
  { name: "APIs", slug: "openapiinitiative" },
  { name: "Webhooks", lucide: "webhook" },
  { name: "PIX", slug: "pix" },
];
