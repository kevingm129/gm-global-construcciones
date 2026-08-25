import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { InspectionDisclaimer } from "@/components/InspectionDisclaimer";

export const metadata: Metadata = {
  title: "Inspección para constructoras",
  description: "Apoyo técnico en revisión previa a entrega, punch lists y reinspección para constructoras en Cartagena de Indias.",
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
        <div data-animate className="rounded-[var(--radius-md)] border border-dashed border-border-strong bg-surface-alt p-6 text-center text-sm text-text-muted">
          [AGREGAR INFORMACIÓN REAL] — mensajería y casos específicos para constructoras (punch lists, reinspección).
        </div>
        <div data-animate className="mt-10 text-center">
          <Button href="/cotizacion?tipo=inspeccion">Agendar inspección</Button>
        </div>
      </section>
    </>
  );
}
