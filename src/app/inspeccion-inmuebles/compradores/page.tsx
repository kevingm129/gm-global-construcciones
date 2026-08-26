import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { InspectionDisclaimer } from "@/components/InspectionDisclaimer";
import { CaseTemplatePreview } from "@/components/CaseTemplatePreview";

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
        <p data-animate className="text-center text-xs font-semibold uppercase tracking-wide text-text-muted">
          Ejemplo ilustrativo — copy genérico, pendiente de aprobación del cliente
        </p>
        <p data-animate className="mt-4">
          Como comprador, quiere recibir su inmueble con la certeza de que todo está en orden — no con la sorpresa
          de encontrar detalles pendientes después de firmar el recibido.
        </p>
        <ul data-animate className="mt-6 space-y-3">
          {[
            "Identifique hallazgos antes de la entrega, no después",
            "Reciba un informe claro con evidencia fotográfica de cada hallazgo",
            "Tome la decisión de recibir con información, no con dudas",
            "Solicite ajustes a la constructora con respaldo documentado",
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
        <div className="mt-6">
          <CaseTemplatePreview />
        </div>
        <div data-animate className="mt-10 text-center">
          <Button href="/cotizacion?tipo=inspeccion">Agendar inspección</Button>
        </div>
      </section>
    </>
  );
}
