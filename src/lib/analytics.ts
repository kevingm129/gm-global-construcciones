/**
 * Puente entre eventos de conversión del sitio y GA4 / Meta Pixel.
 * No falla si las plataformas no están configuradas todavía (no hay
 * credenciales activas, ver docs/SEO-IMPLEMENTACION.md) — cada llamada
 * es un no-op seguro mientras `window.gtag` / `window.fbq` no existan.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type ConversionEvent =
  | "click_whatsapp"
  | "click_phone"
  | "click_cotizacion"
  | "submit_cotizacion"
  | "submit_inspeccion"
  | "submit_constructora"
  | "view_project";

export function trackEvent(event: ConversionEvent, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  window.fbq?.("trackCustom", event, params);
}
