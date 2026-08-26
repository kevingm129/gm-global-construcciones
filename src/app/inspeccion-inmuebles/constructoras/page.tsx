import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { InspectionDisclaimer } from "@/components/InspectionDisclaimer";

export const metadata: Metadata = {
  title: "Inspección para constructoras",
  description: "Apoyo técnico en revisión previa a entrega, punch lists y reinspección para constructoras en Cartagena de Indias.",
  alternates: { canonical: "/inspeccion-inmuebles/constructoras" },
};

export default function ConstructorasInspeccionPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Inspección de inmuebles", href: "/inspeccion-inmuebles" },
          { label: "Constructoras" },
        ]}
      />
      <PageHero
        eyebrow="Para constructoras"
        title="Un aliado técnico para su proceso de entrega"
        subtitle="Apoyamos a constructoras en la revisión previa a entrega, elaboración de punch lists y reinspección — para que la entrega a su cliente sea ordenada, documentada y sin contratiempos de última hora."
      />

      <section className="mx-auto max-w-3xl px-6 py-10">
        <InspectionDisclaimer />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 text-text-body">
        <p data-animate className="text-center text-xs font-semibold uppercase tracking-wide text-text-muted">
          Ejemplo ilustrativo — copy genérico, pendiente de aprobación del cliente
        </p>
        <p data-animate className="mt-4">
          Antes de entregar un inmueble a su cliente, un punch list ordenado evita reclamos posteriores y protege
          la relación comercial con quien recibe.
        </p>
        <ul data-animate className="mt-6 space-y-3">
          {[
            "Detecte y corrija hallazgos antes de la entrega formal",
            "Documente el estado del inmueble con evidencia clara y trazable",
            "Reduzca reclamos post-entrega con un proceso ordenado",
            "Reinspección para verificar que los ajustes priorizados quedaron resueltos",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 border border-border-default bg-white p-4 text-sm">
              <span
                aria-hidden
                className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[10px] text-white"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div data-animate className="mt-6 border border-dashed border-border-strong bg-surface-alt p-4 text-center text-xs text-text-muted">
          [AGREGAR INFORMACIÓN REAL] — casos reales de constructoras, pendientes de que el cliente los aporte.
        </div>
        <div data-animate className="mt-10 text-center">
          <Button href="/cotizacion?tipo=inspeccion">Agendar inspección</Button>
        </div>
      </section>
    </>
  );
}
