import type { ReactElement, SVGProps } from "react";

/**
 * Íconos SVG inline exactos del sitio estático original (index.html,
 * commit 9b0e54b, recuperado del historial de git) — se restauran en vez
 * de las fotos reales de assets/images/servicios/ que se habían adoptado
 * en la Fase 1. Nota fiel al original: las últimas 4 especialidades
 * (construcciones-livianas, gestion-proyectos, remodelaciones, aseo) ya
 * compartían el mismo ícono de "casa" en el HTML original.
 */
const paths: Record<string, ReactElement> = {
  estructura: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  plomeria: (
    <>
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </>
  ),
  mamposteria: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </>
  ),
  panete: (
    <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41-6.6 6.6A2 2 0 005 16v3h3a2 2 0 001.42-.59l6.6-6.6 1.41 1.42 1.42-1.42-1.42-1.41 3.12-3.12a1 1 0 000-1.65z" />
  ),
  "alistado-pisos": (
    <>
      <rect x="2" y="15" width="20" height="7" rx="1" />
      <path d="M6 15V7a2 2 0 012-2h8a2 2 0 012 2v8" />
    </>
  ),
  enchapes: <path d="M2 2h9v9H2zM13 2h9v9h-9zM2 13h9v9H2zM13 13h9v9h-9z" />,
  "estucos-pintura": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2 2 4-4" />
    </>
  ),
  "construcciones-livianas": (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  "gestion-proyectos": (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  remodelaciones: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  aseo: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
};

export function ServiceIcon({ slug, ...props }: { slug: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {paths[slug] ?? paths["construcciones-livianas"]}
    </svg>
  );
}
