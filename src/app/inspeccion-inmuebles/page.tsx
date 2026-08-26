import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { InspectionDisclaimer } from "@/components/InspectionDisclaimer";
import { FindingClassification } from "@/components/FindingClassification";
import { ExampleFindingsPreview } from "@/components/ExampleFindingsPreview";
import { inspectionSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Inspección de inmuebles",
  description:
    "Inspección visual y técnica de inmuebles antes de la entrega, con informe claro y evidencia documentada. Para compradores y constructoras en Cartagena de Indias.",
  alternates: { canonical: "/inspeccion-inmuebles" },
};

export default function InspeccionInmueblesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Inspección de inmuebles" }]} />
      <PageHero
        eyebrow="Inspección, recepción y entrega"
        title="Inspección con proceso claro, de principio a fin"
        subtitle="Agenda, inspección en sitio, identificación de hallazgos, evidencia fotográfica, informe y reinspección si aplica. Un proceso ordenado para compradores y constructoras que buscan claridad antes de firmar el recibido."
      />

      <section className="mx-auto max-w-4xl px-6 py-10">
        <InspectionDisclaimer />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2">
          <div data-animate className="border border-border-default bg-white p-6">
            <h3 className="text-lg text-text-heading">¿Va a recibir un inmueble?</h3>
            <p className="mt-2 text-sm text-text-muted">
              Le acompañamos en la inspección visual y técnica de su inmueble antes de la entrega.
            </p>
            <Button href="/inspeccion-inmuebles/compradores" variant="ghost" className="mt-3">
              Ver información para compradores →
            </Button>
          </div>
          <div data-animate className="border border-border-default bg-white p-6">
            <h3 className="text-lg text-text-heading">¿Es una constructora?</h3>
            <p className="mt-2 text-sm text-text-muted">
              Apoyo en revisión previa a entrega, elaboración de punch lists y reinspección.
            </p>
            <Button href="/inspeccion-inmuebles/constructoras" variant="ghost" className="mt-3">
              Ver información para constructoras →
            </Button>
          </div>
        </div>
      </section>

      <section id="proceso" className="scroll-mt-20 bg-surface-alt px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 data-animate className="text-center text-3xl text-text-heading">
            Nuestro proceso, en 7 pasos
          </h2>
          <div className="mt-10">
            <Accordion items={inspectionSteps.map((step) => ({ title: step.title, content: step.description }))} />
          </div>
        </div>
      </section>

      <section id="clasificacion" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6">
          <FindingClassification />
          <ExampleFindingsPreview />
        </div>
      </section>

      <section className="bg-surface-dark px-6 py-16 text-center text-white md:py-24">
        <h2 className="text-3xl">¿Necesita agendar una inspección?</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/cotizacion?tipo=inspeccion">Agendar inspección</Button>
          <Button href="/contacto" variant="outline" className="border-white text-white hover:bg-white hover:text-surface-dark">
            Hablar con GM Global
          </Button>
        </div>
      </section>
    </>
  );
}
