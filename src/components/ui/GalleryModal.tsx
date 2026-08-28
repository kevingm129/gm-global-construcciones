"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Lightbox de galería de fotos reales de proyecto (banco de
 * assets/images/galeria/, ver docs/DESIGN-TOKENS.md §6 "Modal").
 */
export function GalleryModal({ images, projectName }: { images: string[]; projectName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <div>
      <button
        onClick={() => setOpenIndex(0)}
        className="inline-flex items-center gap-2 border border-brand-primary px-6 py-3 text-sm font-medium text-teal-700 transition-colors duration-[250ms] hover:bg-brand-primary hover:text-white"
      >
        Ver galería de fotos ({images.length})
      </button>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${projectName}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--dark)]/80 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            onClick={() => setOpenIndex(null)}
            aria-label="Cerrar galería"
            className="absolute right-4 top-4 text-3xl leading-none text-white"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
                }}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-4xl leading-none text-white sm:left-4"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
                }}
                aria-label="Foto siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-4xl leading-none text-white sm:right-4"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative aspect-[4/3] w-full max-w-3xl shadow-[var(--shadow-lg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={`${projectName} — foto ${openIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
