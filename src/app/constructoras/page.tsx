import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { ConstructorasForm } from "@/components/forms/ConstructorasForm";
import { constructoras } from "@/lib/data";

export const metadata: Metadata = {
  title: "Constructoras",
  description: "Constructoras aliadas de GM Global Construcciones S.A.S. en Cartagena de Indias.",
};

export default function ConstructorasPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Constructoras" }]} />
      <PageHero
        eyebrow="Relaciones comerciales"
        title="Constructoras aliadas"
        subtitle="Empresas con las que hemos trabajado en Cartagena de Indias."
      />

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {constructoras.map((c) => (
            <div
              key={c.slug}
              data-animate
              className="flex aspect-square items-center justify-center rounded-[var(--radius-lg)] border border-border-default bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="relative h-full w-full">
                <Image src={c.logo} alt={c.name} fill sizes="200px" className="object-contain" />
              </div>
            </div>
          ))}
        </div>

        <div data-animate className="mt-10 rounded-[var(--radius-md)] border border-dashed border-border-strong bg-surface-alt p-6 text-center text-sm text-text-muted">
          [AGREGAR INFORMACIÓN REAL] — descripción del programa de alianza con constructoras.
        </div>

        <div data-animate className="mt-10 rounded-[var(--radius-md)] border border-dashed border-border-strong bg-surface-alt p-6 text-center text-sm text-text-muted">
          [AGREGAR INFORMACIÓN REAL] — reseñas de Google.
        </div>
      </section>

      <section className="bg-surface-alt px-6 py-16 md:py-24">
        <div data-animate className="mx-auto max-w-xl">
          <h2 className="text-2xl text-text-heading">¿Es usted una constructora?</h2>
          <p className="mt-2 text-text-muted">
            Cuéntenos sobre su empresa y el tipo de apoyo que necesita — ejecución de obra o inspección/punch list
            para su proceso de entrega.
          </p>
          <div className="mt-8">
            <ConstructorasForm />
          </div>
        </div>
      </section>
    </>
  );
}
