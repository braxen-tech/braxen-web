"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactStrip() {
  const t = useTranslations("home.contactStrip");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "—", email, message: "Contato via email strip", source: "homepage-strip" }),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <h2 className="text-display-3">
            {t("headingLead")}{" "}
            <em className="italic">{t("headingEm")}</em>{" "}
            {t("headingTail")}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm outline-none focus:border-[var(--accent-gold)] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-pill whitespace-nowrap"
            >
              {status === "sending" ? "…" : status === "sent" ? "✓" : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
