import { Resend } from "resend";
import type { ContactPayload } from "@/lib/contact-schema";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getContactEnv() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const fromName = process.env.RESEND_FROM_NAME ?? "Braxen Tech";
  const toEmail = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !fromEmail || !toEmail) {
    throw new Error("Configuração de e-mail incompleta.");
  }

  return { apiKey, fromEmail, fromName, toEmail };
}

function buildContactEmailHtml(payload: ContactPayload): string {
  const sourceLine = payload.source
    ? `<p><strong>Página:</strong> ${escapeHtml(payload.source)}</p>`
    : "";

  return `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px;">Novo contato pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(payload.email)}</p>
      ${sourceLine}
      <p><strong>Mensagem:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();
}

export async function sendContactEmail(payload: ContactPayload) {
  const { apiKey, fromEmail, fromName, toEmail } = getContactEnv();
  const resend = new Resend(apiKey);

  const subject = payload.source
    ? `[Site] ${payload.name} — ${payload.source}`
    : `[Site] Novo contato de ${payload.name}`;

  const { data, error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [toEmail],
    replyTo: payload.email,
    subject,
    html: buildContactEmailHtml(payload),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
