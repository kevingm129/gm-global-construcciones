"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Replica el comportamiento de scroll-reveal del js/main.js original:
 * IntersectionObserver sobre [data-animate], clase "visible" al entrar
 * en viewport, con un pequeño stagger entre elementos consecutivos.
 * Se re-escanea en cada cambio de ruta porque el layout persiste entre
 * navegaciones del App Router.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-animate]:not(.visible)");
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), idx * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
