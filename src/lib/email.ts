import { company } from "@/lib/data";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type EmailAttachment = { filename: string; content: string };

/**
 * Envía un correo real vía Resend (https://resend.com) si RESEND_API_KEY
 * está configurada. Si no lo está, lanza un error explícito — a
 * diferencia del sitio original, esta API nunca reporta éxito sin haber
 * intentado un envío real (ver hallazgo en docs/AUDITORIA-TECNICA.md §6).
 *
 * Configuración pendiente en producción: variables de entorno
 * RESEND_API_KEY y RESEND_FROM (remitente verificado en Resend), y
 * RESEND_TO (buzón de destino, por defecto el correo de info@).
 */
export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
  attachments,
}: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO ?? company.emails[0];

  if (!apiKey || !from) {
    throw new Error(
      "Envío de correo no configurado: faltan las variables de entorno RESEND_API_KEY y/o RESEND_FROM."
    );
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      reply_to: replyTo,
      attachments,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend respondió ${res.status}: ${body}`);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
