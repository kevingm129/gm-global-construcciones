import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ConstructorasForm } from "@/components/forms/ConstructorasForm";
import { constructoras } from "@/lib/data";

export const metadata: Metadata = {
  title: "Constructoras",
  description: "Constructoras aliadas de GM Global Construcciones S.A.S. en Cartagena de Indias.",
  alternates: { canonical: "/constructoras" },
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
        <SectionHeader
          eyebrow="Aliados"
          title="Empresas con las que hemos trabajado"
          subtitle="Relaciones comerciales reales en Cartagena de Indias."
        />
        <div className="mx-auto mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {constructoras.map((c) => (
            <div
              key={c.slug}
              data-animate
              className="border border-border-default bg-white p-6 transition-all duration-[250ms] hover:-translate-y-[5px] hover:border-brand-primary hover:shadow-[var(--shadow-hover)]"
            >
              <div className="relative aspect-square w-full">
                <Image src={c.logo} alt={c.name} fill sizes="200px" className="object-contain" />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-text-heading">{c.name}</p>
              {(c.address || c.phone || c.nit) && (
                <div className="mt-2 space-y-0.5 text-center text-xs text-text-muted">
                  {c.address && <p>{c.address}</p>}
                  {c.phone && <p>{c.phone}</p>}
                  {c.nit && <p>NIT: {c.nit}</p>}
                </div>
              )}
            </div>
          ))}
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
