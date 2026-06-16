export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  source?: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  body: unknown,
): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Dados inválidos." };
  }

  const { name, email, message, source } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return { ok: false, error: "Informe seu nome." };
  }

  if (name.trim().length > 100) {
    return { ok: false, error: "Nome muito longo." };
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return { ok: false, error: "Informe um e-mail válido." };
  }

  if (email.trim().length > 255) {
    return { ok: false, error: "E-mail muito longo." };
  }

  if (typeof message !== "string" || message.trim().length < 5) {
    return { ok: false, error: "A mensagem deve ter pelo menos 5 caracteres." };
  }

  if (message.trim().length > 2000) {
    return { ok: false, error: "Mensagem muito longa." };
  }

  if (source !== undefined && typeof source !== "string") {
    return { ok: false, error: "Origem inválida." };
  }

  if (typeof source === "string" && source.length > 120) {
    return { ok: false, error: "Origem inválida." };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      source: typeof source === "string" ? source.trim() : undefined,
    },
  };
}
