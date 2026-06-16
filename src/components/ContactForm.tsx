"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type ContactFormProps = {
  source?: string;
  messagePlaceholder?: string;
  submitMicrocopy?: string;
};

export function ContactForm({
  source,
  messagePlaceholder = "Conte-nos sobre o seu projeto…",
  submitMicrocopy = "Retorno em até 24 horas",
}: ContactFormProps = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível enviar sua mensagem.");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Não foi possível enviar sua mensagem.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border-hairline p-8 md:p-12 text-left text-center">
        <p className="font-sans text-2xl md:text-3xl mb-4">
          Mensagem enviada.
        </p>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          Recebemos seu contato e retornamos em até 24 horas.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors cursor-pointer"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
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
          disabled={status === "loading"}
        />
        <Field
          label="E-mail"
          id="email"
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          required
          maxLength={255}
          disabled={status === "loading"}
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
          disabled={status === "loading"}
          className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base resize-none transition-colors disabled:opacity-60"
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
          disabled={status === "loading"}
          className="btn btn-lg btn-outline btn-outline-primary cursor-pointer tracking-[0.3em] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Enviando…" : "Enviar mensagem"}
          {status !== "loading" && <span aria-hidden>→</span>}
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
  disabled,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
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
        disabled={disabled}
        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base transition-colors disabled:opacity-60"
      />
    </div>
  );
}
