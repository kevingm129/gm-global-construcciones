/**
 * Plantilla del FORMATO en que se documentará un caso real una vez
 * exista (línea de negocio nueva, sin historial todavía — ver
 * docs/ARQUITECTURA-INFORMACION.md). No es un caso real ni un ejemplo
 * narrativo: son los 4 campos que tendría la ficha, vacíos entre
 * corchetes, para que quede claro que la estructura existe pero el
 * contenido no se ha inventado.
 */
const stages = [
  { label: "Situación", placeholder: "[Situación del caso — tipo de inmueble y motivo de la inspección]" },
  { label: "Hallazgo", placeholder: "[Hallazgo identificado durante la inspección, con su clasificación]" },
  { label: "Acción", placeholder: "[Acción tomada — reinspección, ajuste solicitado a la constructora, etc.]" },
  { label: "Resultado", placeholder: "[Resultado final del caso]" },
] as const;

export function CaseTemplatePreview() {
  return (
    <div data-animate className="border border-dashed border-border-strong bg-surface-alt p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Plantilla de formato — sin casos reales todavía
      </p>
      <p className="mt-1 text-sm text-text-muted">Así se documentará cada caso una vez exista uno real:</p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {stages.map((stage, idx) => (
          <li key={stage.label} className="border border-border-default bg-white p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-primary">
              {idx + 1}. {stage.label}
            </span>
            <p className="mt-1 text-sm italic text-text-muted">{stage.placeholder}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
