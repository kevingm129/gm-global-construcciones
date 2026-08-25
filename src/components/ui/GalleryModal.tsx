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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, idx) => (
          <button
            key={src}
            onClick={() => setOpenIndex(idx)}
            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label={`Ver foto ${idx + 1} de ${projectName} en tamaño completo`}
          >
            <Image src={src} alt={`${projectName} — foto ${idx + 1}`} fill sizes="25vw" className="object-cover" />
          </button>
        ))}
      </div>

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
        </div>
      )}
    </div>
  );
}
