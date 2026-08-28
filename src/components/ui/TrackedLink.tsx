"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent, type ConversionEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { trackAs: ConversionEvent };

/** Enlace normal (tel:, wa.me, etc.) que además dispara un evento de conversión al hacer clic. */
export function TrackedLink({ trackAs, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(trackAs);
        onClick?.(e);
      }}
    />
  );
}
