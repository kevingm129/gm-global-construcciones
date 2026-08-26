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
        <div data-animate className="rounded-[var(--radius-md)] border border-dashed border-border-strong bg-surface-alt p-6 text-center text-sm text-text-muted">
          [AGREGAR INFORMACIÓN REAL] — mensajería y casos específicos para audiencia compradora.
        </div>
        <div data-animate className="mt-10 text-center">
          <Button href="/cotizacion?tipo=inspeccion">Agendar inspección</Button>
        </div>
      </section>
    </>
  );
}
