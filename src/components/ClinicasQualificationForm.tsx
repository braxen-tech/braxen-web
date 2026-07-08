"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { trackGenerateLead } from "@/lib/analytics";
import {
  captureAttributionFromUrl,
  readStoredAttribution,
  type ContactAttribution,
} from "@/lib/attribution";

type Status = "idle" | "loading" | "success" | "error";

type QualificationFormState = {
  name: string;
  email: string;
  phone: string;
  segment: string;
  teamSize: string;
  monthlyConversations: string;
};

const EMPTY_FORM: QualificationFormState = {
  name: "",
  email: "",
  phone: "",
  segment: "",
  teamSize: "",
  monthlyConversations: "",
};

type ClinicasQualificationFormProps = {
  source?: string;
};

export function ClinicasQualificationForm({
  source,
}: ClinicasQualificationFormProps = {}) {
  const t = useTranslations("clinicas.contact.form");
  const tContactForm = useTranslations("contactForm");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState<QualificationFormState>(EMPTY_FORM);
  const [attribution] = useState<ContactAttribution>(() =>
    captureAttributionFromUrl(),
  );

  const segmentOptions = t.raw("segmentOptions") as string[];
  const teamSizeOptions = t.raw("teamSizeOptions") as string[];
  const monthlyConversationsOptions = t.raw(
    "monthlyConversationsOptions",
  ) as string[];

  function update<K extends keyof QualificationFormState>(
    key: K,
    value: QualificationFormState[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const currentAttribution = hasAttribution(attribution)
      ? attribution
      : readStoredAttribution();

    const message = [
      form.segment && `Segmento: ${form.segment}`,
      form.teamSize && `Equipe de agendamento: ${form.teamSize}`,
      form.monthlyConversations &&
        `Conversas/mês no WhatsApp: ${form.monthlyConversations}`,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message,
          phone: form.phone,
          segment: form.segment,
          teamSize: form.teamSize,
          monthlyConversations: form.monthlyConversations,
          source,
          locale,
          ...currentAttribution,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? tContactForm("genericError"));
      }

      trackGenerateLead({ source, attribution: currentAttribution });

      setForm(EMPTY_FORM);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : tContactForm("genericError"),
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border p-8 md:p-10 text-center shadow-sm">
        <p className="font-sans text-2xl md:text-3xl mb-4">
          {tContactForm("successTitle")}
        </p>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          {tContactForm("successBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors cursor-pointer"
        >
          {tContactForm("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border p-8 md:p-10 text-left space-y-6 shadow-sm"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <TextField
          label={t("name")}
          id="name"
          value={form.name}
          onChange={(v) => update("name", v)}
          required
          maxLength={100}
          disabled={status === "loading"}
        />
        <TextField
          label={t("email")}
          id="email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          required
          maxLength={255}
          disabled={status === "loading"}
        />
      </div>

      <TextField
        label={t("phone")}
        id="phone"
        type="tel"
        value={form.phone}
        onChange={(v) => update("phone", v)}
        required
        maxLength={30}
        disabled={status === "loading"}
      />

      <SelectField
        label={t("segmentLabel")}
        id="segment"
        value={form.segment}
        onChange={(v) => update("segment", v)}
        options={segmentOptions}
        disabled={status === "loading"}
      />

      <SelectField
        label={t("teamSizeLabel")}
        id="teamSize"
        value={form.teamSize}
        onChange={(v) => update("teamSize", v)}
        options={teamSizeOptions}
        disabled={status === "loading"}
      />

      <SelectField
        label={t("monthlyConversationsLabel")}
        id="monthlyConversations"
        value={form.monthlyConversations}
        onChange={(v) => update("monthlyConversations", v)}
        options={monthlyConversationsOptions}
        disabled={status === "loading"}
      />

      {status === "error" && (
        <p className="text-destructive text-sm">{errorMsg}</p>
      )}

      <div className="pt-2 space-y-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg py-3.5 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          style={{ backgroundColor: "#EAB308", color: "#18181b" }}
        >
          {status === "loading" ? tCommon("sending") : t("submitLabel")}
        </button>
        <p className="text-[11px] leading-relaxed text-muted-foreground text-center">
          {t("privacyConsent")}
        </p>
      </div>
    </form>
  );
}

function hasAttribution(attribution: ContactAttribution): boolean {
  return Object.values(attribution).some((value) => value?.length > 0);
}

function TextField({
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

function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
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
      <select
        id={id}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-base transition-colors disabled:opacity-60"
      >
        <option value="" disabled>
          {" "}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
