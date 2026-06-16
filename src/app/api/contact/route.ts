import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/send-contact-email";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  const validation = validateContactPayload(body);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    await sendContactEmail(validation.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);

    return NextResponse.json(
      {
        error:
          "Não foi possível enviar sua mensagem. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }
}
