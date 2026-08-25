import { NextResponse } from "next/server";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Cuerpo de solicitud inválido." }, { status: 400 });
  }

  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const servicio = String(formData.get("servicio") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  const consentimiento = formData.get("consentimiento");
  const archivo = formData.get("archivo");

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
  }
  if (!consentimiento) {
    return NextResponse.json({ error: "Debe autorizar el tratamiento de datos personales." }, { status: 400 });
  }

  const attachments = [];
  if (archivo instanceof File && archivo.size > 0) {
    const buffer = Buffer.from(await archivo.arrayBuffer());
    attachments.push({ filename: archivo.name, content: buffer.toString("base64") });
  }

  try {
    await sendNotificationEmail({
      subject: `Nueva solicitud de cotización — ${nombre}`,
      replyTo: email,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <h2>Nueva solicitud de cotización</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono || "No indicado")}</p>
        <p><strong>Tipo de servicio:</strong> ${escapeHtml(servicio || "No indicado")}</p>
        <p><strong>Mensaje:</strong><br>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (error) {
    console.error("Error enviando solicitud de cotización:", error);
    return NextResponse.json(
      { error: "No se pudo enviar la solicitud en este momento." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
