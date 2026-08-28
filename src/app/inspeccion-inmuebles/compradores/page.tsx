import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { InspectionDisclaimer } from "@/components/InspectionDisclaimer";

export const metadata: Metadata = {
  title: "Inspección para compradores",
  description: "Revise su inmueble antes de recibirlo, con criterio técnico y un informe claro. Inspección visual y técnica en Cartagena de Indias.",
  alternates: { canonical: "/inspeccion-inmuebles/compradores" },
};

export default function CompradoresPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Inspección de inmuebles", href: "/inspeccion-inmuebles" },
          { label: "Compradores" },
        ]}
      />
      <PageHero
        eyebrow="Para compradores"
        title="Revise antes de recibir, con criterio técnico"
        subtitle="Le acompañamos en la inspección visual y técnica de su inmueble antes de la entrega, con un informe claro y evidencia documentada — para que reciba con información, no con dudas."
      />

      <section className="mx-auto max-w-3xl px-6 py-10">
        <InspectionDisclaimer />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 text-text-body">
        <p data-animate>
          Ya sea un inmueble nuevo antes de entrega o una reventa, revisamos el alcance que usted defina y le
          entregamos un informe con cada hallazgo clasificado y su evidencia fotográfica.
        </p>
        <ul data-animate className="mt-6 space-y-3">
          {[
            "Coordinamos la visita según su disponibilidad y el tipo de inmueble",
            "Clasificamos cada hallazgo por nivel de atención — ver el sistema completo abajo",
            "Si se acuerda, verificamos en una reinspección que los ajustes quedaron resueltos",
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
          . Aún no tenemos casos de compradores publicados — se incorporarán aquí cuando existan.
        </p>
        <div data-animate className="mt-10 text-center">
          <Button href="/cotizacion?tipo=inspeccion">Agendar inspección</Button>
        </div>
      </section>
    </>
  );
}
