import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import type { ContactPayload } from "@/lib/contact-schema";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function getContactEnv(locale: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const fromName = process.env.RESEND_FROM_NAME ?? "Braxen Tech";
  const toEmail = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !fromEmail || !toEmail) {
    const t = await getTranslations({
      locale,
      namespace: "contactForm.errors",
    });
    throw new Error(t("emailConfigMissing"));
  }

  return { apiKey, fromEmail, fromName, toEmail };
}

function buildAttributionLines(payload: ContactPayload): string {
  const lines: string[] = [];

  if (payload.utm_source) {
    lines.push(`<p><strong>utm_source:</strong> ${escapeHtml(payload.utm_source)}</p>`);
  }
  if (payload.utm_medium) {
    lines.push(`<p><strong>utm_medium:</strong> ${escapeHtml(payload.utm_medium)}</p>`);
  }
  if (payload.utm_campaign) {
    lines.push(
      `<p><strong>utm_campaign:</strong> ${escapeHtml(payload.utm_campaign)}</p>`,
    );
  }
  if (payload.utm_term) {
    lines.push(`<p><strong>utm_term:</strong> ${escapeHtml(payload.utm_term)}</p>`);
  }
  if (payload.utm_content) {
    lines.push(
      `<p><strong>utm_content:</strong> ${escapeHtml(payload.utm_content)}</p>`,
    );
  }
  if (payload.gclid) {
    lines.push(`<p><strong>gclid:</strong> ${escapeHtml(payload.gclid)}</p>`);
  }

  if (lines.length === 0) return "";

  return `<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e4e4e7;">${lines.join("")}</div>`;
}

function buildQualificationLines(
  payload: ContactPayload,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string {
  const lines: string[] = [];

  if (payload.phone) {
    lines.push(`<p><strong>${escapeHtml(t("labels.phone"))}:</strong> ${escapeHtml(payload.phone)}</p>`);
  }
  if (payload.segment) {
    lines.push(`<p><strong>${escapeHtml(t("labels.segment"))}:</strong> ${escapeHtml(payload.segment)}</p>`);
  }
  if (payload.teamSize) {
    lines.push(`<p><strong>${escapeHtml(t("labels.teamSize"))}:</strong> ${escapeHtml(payload.teamSize)}</p>`);
  }
  if (payload.monthlyConversations) {
    lines.push(
      `<p><strong>${escapeHtml(t("labels.monthlyConversations"))}:</strong> ${escapeHtml(payload.monthlyConversations)}</p>`,
    );
  }

  return lines.join("");
}

async function buildContactEmailHtml(payload: ContactPayload): Promise<string> {
  const t = await getTranslations({
    locale: payload.locale,
    namespace: "email",
  });

  const sourceLine = payload.source
    ? `<p><strong>${escapeHtml(t("labels.source"))}:</strong> ${escapeHtml(payload.source)}</p>`
    : "";

  return `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px;">${escapeHtml(t("title"))}</h2>
      <p><strong>${escapeHtml(t("labels.name"))}:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>${escapeHtml(t("labels.email"))}:</strong> ${escapeHtml(payload.email)}</p>
      ${sourceLine}
      ${buildQualificationLines(payload, t)}
      <p><strong>${escapeHtml(t("labels.message"))}:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
      ${buildAttributionLines(payload)}
      <p style="margin-top: 16px; color: #6b7280; font-size: 12px;">locale: ${escapeHtml(payload.locale)}</p>
    </div>
  `.trim();
}

export async function sendContactEmail(payload: ContactPayload) {
  const { apiKey, fromEmail, fromName, toEmail } = await getContactEnv(
    payload.locale,
  );
  const resend = new Resend(apiKey);

  const t = await getTranslations({
    locale: payload.locale,
    namespace: "email",
  });

  const subject = payload.source
    ? t("subjectWithSource", { name: payload.name, source: payload.source })
    : t("subjectDefault", { name: payload.name });

  const html = await buildContactEmailHtml(payload);

  const { data, error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [toEmail],
    replyTo: payload.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
