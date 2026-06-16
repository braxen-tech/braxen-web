export const BRAXEN_WHATSAPP_NUMBER = "5521973118404";

export function buildBraxenWhatsAppUrl(form: {
  name: string;
  email: string;
  message: string;
  source?: string;
}): string {
  const lines = [
    "Olá!",
    "",
    `Nome: ${form.name.trim()}`,
    `E-mail: ${form.email.trim()}`,
  ];

  if (form.source?.trim()) {
    lines.push(`Página: ${form.source.trim()}`);
  }

  lines.push("", form.message.trim());

  const text = lines.join("\n");

  return `https://wa.me/${BRAXEN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
