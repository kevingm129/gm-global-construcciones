import { StatusBadge } from "@/components/ui/Badge";
import { findingLevels } from "@/lib/data";

/**
 * Vista previa ILUSTRATIVA del formato de un informe de hallazgos —
 * no corresponde a ninguna inspección real (línea de negocio nueva, sin
 * historial todavía, ver docs/ARQUITECTURA-INFORMACION.md). Los 4 ítems
 * son ejemplos genéricos de la industria, sin dirección, cliente ni
 * fecha, solo para mostrar cómo luce la clasificación aplicada a un
 * hallazgo real una vez que existan casos.
 */
const exampleFindings = [
  { levelKey: "critico", item: "Filtración de humedad en muro exterior — fachada posterior" },
  { levelKey: "alta", item: "Fuga menor en grifería de baño principal" },
  { levelKey: "pendiente", item: "Ajuste de nivelación pendiente en piso de balcón" },
  { levelKey: "conforme", item: "Acabado de pintura e instalaciones eléctricas de cocina" },
] as const;

export function ExampleFindingsPreview() {
  return (
    <div data-animate className="border border-dashed border-border-strong bg-surface-alt p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Ejemplo ilustrativo — no corresponde a una inspección real
      </p>
      <p className="mt-1 text-sm text-text-muted">
        Así se vería un fragmento del informe una vez clasificados los hallazgos de una inspección:
      </p>
      <ul className="mt-4 space-y-3">
        {exampleFindings.map((finding) => {
          const level = findingLevels.find((l) => l.key === finding.levelKey)!;
          return (
            <li key={finding.item} className="flex items-start gap-3 border border-border-default bg-white p-3">
              <StatusBadge level={level} />
              <span className="text-sm text-text-body">{finding.item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
