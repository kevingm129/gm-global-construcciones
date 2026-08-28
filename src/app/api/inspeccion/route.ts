import { NextResponse } from "next/server";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Cuerpo de solicitud inválido." }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();
  const tipoInspeccion = String(body.tipoInspeccion ?? "").trim();
  const direccionInmueble = String(body.direccionInmueble ?? "").trim();
  const mensaje = String(body.mensaje ?? "").trim();
  const consentimiento = body.consentimiento;

  if (!nombre || !email || !telefono || !direccionInmueble || !mensaje) {
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
      subject: `Nueva solicitud de inspección — ${nombre}`,
      replyTo: email,
      html: `
        <h2>Nueva solicitud de inspección de inmueble</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
        <p><strong>Tipo de inspección:</strong> ${escapeHtml(tipoInspeccion || "No indicado")}</p>
        <p><strong>Dirección del inmueble:</strong> ${escapeHtml(direccionInmueble)}</p>
        <p><strong>Mensaje:</strong><br>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>
        <p><em>${escapeHtml(
          "Este es un servicio de inspección visual y técnica según el alcance contratado. No constituye peritaje, certificación ni dictamen estructural."
        )}</em></p>
      `,
    });
  } catch (error) {
    console.error("Error enviando solicitud de inspección:", error);
    return NextResponse.json(
      { error: "No se pudo enviar la solicitud en este momento." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
