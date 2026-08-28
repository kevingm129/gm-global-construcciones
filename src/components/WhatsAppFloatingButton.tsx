"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

/**
 * Botón flotante de WhatsApp con burbuja de saludo estilo chat —
 * es un enlace real a wa.me (mismo company.whatsapp usado en Footer/
 * /contacto), no un bot real. La burbuja solo simula la apariencia de
 * un widget de chat para que se sienta más acogedor al abrir.
 */
export function WhatsAppFloatingButton() {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  function openChat() {
    trackEvent("click_whatsapp");
    window.open(company.whatsapp, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {showBubble && !dismissed && (
        <div className="relative w-[280px] animate-[fade-in-up_0.3s_ease-out] border border-border-default bg-white p-4 shadow-[var(--shadow-lg)]">
          <button
            onClick={() => setDismissed(true)}
            aria-label="Cerrar"
            className="absolute right-2 top-2 text-lg leading-none text-text-muted hover:text-text-heading"
          >
            ×
          </button>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold text-white"
              style={{ backgroundImage: "var(--gradient-brand)" }}
              aria-hidden
            >
              GM
            </div>
            <div>
              <p className="text-sm font-semibold text-text-heading">{company.shortName}</p>
              <p className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
                En línea
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-text-body">
            ¡Hola! 👋 ¿En qué podemos ayudarle con su proyecto?
          </p>
          <button
            onClick={openChat}
            className="mt-3 w-full bg-[image:var(--gradient-brand)] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-opacity duration-[250ms] hover:opacity-90"
          >
            Iniciar chat
          </button>
        </div>
      )}

      <button
        onClick={() => {
          if (dismissed || !showBubble) {
            openChat();
          } else {
            setDismissed((v) => !v);
          }
        }}
        aria-label="Chatear por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-lg)] transition-transform duration-[250ms] hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
          <path d="M12.02 2C6.5 2 2 6.5 2 12.02c0 1.77.46 3.5 1.34 5.02L2 22l5.09-1.33a10 10 0 004.93 1.31h.01c5.52 0 10.02-4.5 10.02-10.02C22.05 6.5 17.55 2 12.02 2zm0 18.14h-.01a8.1 8.1 0 01-4.14-1.13l-.3-.18-3.02.79.8-2.95-.2-.31a8.1 8.1 0 01-1.25-4.33c0-4.5 3.66-8.14 8.13-8.14 2.17 0 4.21.85 5.75 2.38a8.07 8.07 0 012.38 5.75c0 4.48-3.66 8.13-8.14 8.13zm4.46-6.1c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </button>
    </div>
  );
}
