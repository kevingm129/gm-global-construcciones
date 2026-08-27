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
        <p data-animate>
          Coordinamos con su equipo la revisión previa a entrega, elaboramos el punch list y hacemos la
          reinspección de seguimiento — con un informe que le sirve como respaldo frente a su cliente.
        </p>
        <ul data-animate className="mt-6 space-y-3">
          {[
            "Coordinamos la visita según su cronograma de entrega",
            "Elaboramos el punch list con cada hallazgo clasificado por nivel de atención",
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
        <p data-animate className="mt-6 text-sm text-text-muted">
          Vea el detalle completo del{" "}
          <a href="/inspeccion-inmuebles#proceso" className="font-medium text-teal-700 hover:text-brand-primary-hover">
            proceso de 7 pasos
          </a>{" "}
          y del{" "}
          <a href="/inspeccion-inmuebles#clasificacion" className="font-medium text-teal-700 hover:text-brand-primary-hover">
            sistema de clasificación de hallazgos
          </a>
          . Aún no tenemos casos de constructoras publicados — se incorporarán aquí cuando existan.
        </p>
        <div data-animate className="mt-10 text-center">
          <Button href="/cotizacion?tipo=inspeccion">Agendar inspección</Button>
        </div>
      </section>
    </>
  );
}
