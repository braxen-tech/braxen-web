"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { trackGenerateLead } from "@/lib/analytics";
import {
  captureAttributionFromUrl,
  readStoredAttribution,
  type ContactAttribution,
} from "@/lib/attribution";

type Status = "idle" | "loading" | "success" | "error";

type ContactFormProps = {
  source?: string;
  messagePlaceholder?: string;
  submitMicrocopy?: string;
};

export function ContactForm({
  source,
  messagePlaceholder,
  submitMicrocopy,
}: ContactFormProps = {}) {
  const t = useTranslations("contactForm");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [attribution, setAttribution] = useState<ContactAttribution>({});

  const placeholder = messagePlaceholder ?? t("defaultPlaceholder");
  const microcopy = submitMicrocopy ?? tCommon("microcopy24h");

  useEffect(() => {
    setAttribution(captureAttributionFromUrl());
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const currentAttribution =
      hasAttribution(attribution) ? attribution : readStoredAttribution();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source,
          locale,
          ...currentAttribution,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? t("genericError"));
      }

      trackGenerateLead({ source, attribution: currentAttribution });

      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("genericError"));
    }
  }

  if (status === "success") {
    return (
      <div className="border-hairline p-8 md:p-12 text-left text-center">
        <p className="font-sans text-2xl md:text-3xl mb-4">
          {t("successTitle")}
        </p>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors cursor-pointer"
        >
          {t("sendAnother")}
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
          label={t("name")}
          id="name"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          required
          maxLength={100}
          disabled={status === "loading"}
        />
        <Field
          label={t("email")}
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
          {t("message")}
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
          placeholder={placeholder}
        />
      </div>

      {status === "error" && (
        <p className="text-destructive text-sm">{errorMsg}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          {microcopy}
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-lg btn-outline btn-outline-primary cursor-pointer tracking-[0.3em] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? tCommon("sending") : tCommon("sendMessage")}
          {status !== "loading" && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}

function hasAttribution(attribution: ContactAttribution): boolean {
  return Object.values(attribution).some((value) => value?.length > 0);
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
