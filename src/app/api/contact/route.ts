import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { validateContactPayload } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/send-contact-email";
import { routing } from "@/i18n/routing";

function resolveLocaleFromBody(body: unknown): string {
  if (
    body &&
    typeof body === "object" &&
    "locale" in body &&
    typeof (body as { locale?: unknown }).locale === "string" &&
    (routing.locales as readonly string[]).includes(
      (body as { locale: string }).locale,
    )
  ) {
    return (body as { locale: string }).locale;
  }
  return routing.defaultLocale;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    const t = await getTranslations({
      locale: routing.defaultLocale,
      namespace: "contactForm.errors",
    });
    return NextResponse.json({ error: t("invalidBody") }, { status: 400 });
  }

  const validation = await validateContactPayload(body);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    await sendContactEmail(validation.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    const locale = resolveLocaleFromBody(body);
    const t = await getTranslations({
      locale,
      namespace: "contactForm.errors",
    });

    return NextResponse.json({ error: t("sendFailed") }, { status: 500 });
  }
}
