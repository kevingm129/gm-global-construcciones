import { NextResponse } from "next/server";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Cuerpo de solicitud inválido." }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim();
  const empresa = String(body.empresa ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();
  const interes = String(body.interes ?? "").trim();
  const mensaje = String(body.mensaje ?? "").trim();
  const consentimiento = body.consentimiento;

  if (!nombre || !empresa || !email || !interes || !mensaje) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
  }
  if (!consentimiento) {
    return NextResponse.json({ error: "Debe autorizar el tratamiento de datos personales." }, { status: 400 });
  }

  try {
    await sendNotificationEmail({
      subject: `Nuevo contacto de constructora — ${empresa}`,
      replyTo: email,
      html: `
        <h2>Nuevo contacto de constructora</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Empresa:</strong> ${escapeHtml(empresa)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono || "No indicado")}</p>
        <p><strong>Tipo de interés:</strong> ${escapeHtml(interes)}</p>
        <p><strong>Mensaje:</strong><br>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (error) {
    console.error("Error enviando contacto de constructora:", error);
    return NextResponse.json(
      { error: "No se pudo enviar la solicitud en este momento." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
