import type { ReactNode } from "react";
import type { findingLevels } from "@/lib/data";

type FindingKey = (typeof findingLevels)[number]["key"];

const statusStyles: Record<FindingKey, string> = {
  critico: "bg-status-critico-bg text-status-critico-fg border-status-critico-border",
  alta: "bg-status-alta-bg text-status-alta-fg border-status-alta-border",
  pendiente: "bg-status-pendiente-bg text-status-pendiente-fg border-status-pendiente-border",
  conforme: "bg-status-conforme-bg text-status-conforme-fg border-status-conforme-border",
};

/** Badge de tag neutro — para categorías de proyecto (equivalente a .project-tag) */
export function TagBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "green" }) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium ${
        tone === "green"
          ? "bg-green-50 text-green-700 border-green-100"
          : "bg-neutral-50 text-text-muted border-border-default"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Badge de clasificación de hallazgos. Incluye siempre el emoji + la
 * etiqueta de texto juntos (nunca solo el color) — accesibilidad y
 * porque la clasificación debe declararse explícitamente como interna.
 */
export function StatusBadge({
  level,
}: {
  level: (typeof findingLevels)[number];
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium ${statusStyles[level.key as FindingKey]}`}
    >
      <span aria-hidden>{level.emoji}</span>
      {level.label}
    </span>
  );
}
