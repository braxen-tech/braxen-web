"use client";

import { useState } from "react";

type Status = "idle" | "error";

function buildWhatsAppUrl(form: {
  name: string;
  email: string;
  message: string;
}) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!phone) {
    throw new Error("WhatsApp is not configured.");
  }

  const text = [
    "Hello Braxen,",
    "",
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    "",
    form.message.trim(),
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    try {
      const url = buildWhatsAppUrl(form);
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
          label="Name"
          id="name"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          required
          maxLength={100}
        />
        <Field
          label="Email"
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
          Message
        </label>
        <textarea
          id="message"
          required
          minLength={5}
          maxLength={2000}
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-base resize-none transition-colors"
          placeholder="Tell us about the project…"
        />
      </div>

      {status === "error" && (
        <p className="text-destructive text-sm">{errorMsg}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Opens WhatsApp with your message
        </p>
        <button
          type="submit"
          className="cursor-pointer inline-flex items-center justify-center gap-3 border-hairline px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Send via WhatsApp
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
        className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-base transition-colors"
      />
    </div>
  );
}
