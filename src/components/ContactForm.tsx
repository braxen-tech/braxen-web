"use client";

import { useState } from "react";
import { buildBraxenWhatsAppUrl } from "@/lib/contact";

type Status = "idle" | "error";

type ContactFormProps = {
  source?: string;
  messagePlaceholder?: string;
  submitMicrocopy?: string;
};

export function ContactForm({
  source,
  messagePlaceholder = "Conte-nos sobre o seu projeto…",
  submitMicrocopy = "Abre o WhatsApp com sua mensagem",
}: ContactFormProps = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    try {
      const url = buildBraxenWhatsAppUrl({ ...form, source });
      window.open(url, "_blank", "noopener,noreferrer");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Could not open WhatsApp.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-hairline p-8 md:p-12 text-left space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Field
          label="Nome"
          id="name"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          required
          maxLength={100}
        />
        <Field
          label="E-mail"
          id="email"
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          required
          maxLength={255}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          required
          minLength={5}
          maxLength={2000}
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base resize-none transition-colors"
          placeholder={messagePlaceholder}
        />
      </div>

      {status === "error" && (
        <p className="text-destructive text-sm">{errorMsg}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          {submitMicrocopy}
        </p>
        <button
          type="submit"
          className="btn btn-lg btn-outline btn-outline-primary cursor-pointer tracking-[0.3em]"
        >
          Enviar pelo WhatsApp
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  maxLength,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base transition-colors"
      />
    </div>
  );
}
