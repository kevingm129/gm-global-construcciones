import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de construcción y remodelación ejecutados por GM Global Construcciones S.A.S. en Cartagena de Indias.",
};

export default function ProyectosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Proyectos" }]} />
      <PageHero
        eyebrow="Nuestra obra"
        title="Proyectos destacados"
        subtitle="Obras ejecutadas en Cartagena de Indias con excelencia técnica y cumplimiento normativo."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
