"use client";

import { useEffect } from "react";
import { trackEvent, type ConversionEvent } from "@/lib/analytics";

/** Dispara un evento de conversión una vez al montar — usado para vistas de página (ej. view_project). */
export function ViewTracker({ event, params }: { event: ConversionEvent; params?: Record<string, string> }) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
