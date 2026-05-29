export const BRAXEN_WHATSAPP_NUMBER = "5521973118404";

export function buildBraxenWhatsAppUrl(form: {
  name: string;
  email: string;
  message: string;
}): string {
  const text = [
    "Olá!",
    "",
    `Nome: ${form.name.trim()}`,
    `E-mail: ${form.email.trim()}`,
    "",
    form.message.trim(),
  ].join("\n");

  return `https://wa.me/${BRAXEN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
