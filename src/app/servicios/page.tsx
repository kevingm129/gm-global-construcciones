import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { serviceCategories, services } from "@/lib/data";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Construcción, remodelación e inspección de inmuebles: 11 especialidades constructivas y una línea de inspección para compradores y constructoras.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      {services.map((service) => (
        <script
          key={service.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
        />
      ))}
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]} />
      <PageHero
        eyebrow="Portafolio de servicios"
        title="Dos líneas de servicio, un solo equipo"
        subtitle="Construcción y remodelación integral, e inspección de inmuebles para quienes compran o entregan."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div data-animate className="border border-border-default bg-white p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-primary">Línea 1</p>
            <h2 className="mt-2 text-2xl text-text-heading">Construcción y ejecución</h2>
            <p className="mt-3 text-text-muted">
              11 especialidades constructivas para particulares, propietarios, empresas, constructoras, contratistas
              y promotores.
            </p>
            <Link href="#especialidades" className="mt-4 inline-block text-sm font-medium text-brand-primary">
              Ver especialidades →
            </Link>
          </div>
          <div data-animate className="border border-border-default bg-white p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-primary">Línea 2</p>
            <h2 className="mt-2 text-2xl text-text-heading">Inspección, recepción y entrega de inmuebles</h2>
            <p className="mt-3 text-text-muted">
              Inspección visual y técnica según el alcance contratado, para compradores y constructoras.
            </p>
            <Link href="/inspeccion-inmuebles" className="mt-4 inline-block text-sm font-medium text-brand-primary">
              Conocer este servicio →
            </Link>
          </div>
        </div>
      </section>

      <section id="especialidades" className="bg-surface-alt px-6 py-16 md:py-24">
        <SectionHeader
          eyebrow="Línea 1 — Construcción"
          title="11 especialidades"
          subtitle="Agrupadas en 5 categorías para facilitar la navegación."
        />
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {serviceCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/servicios/${cat.slug}`}
              className="rounded-[var(--radius-pill)] border border-brand-primary px-5 py-2 text-sm font-medium text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
