import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GalleryModal } from "@/components/ui/GalleryModal";
import { galleryImages, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de construcción y remodelación ejecutados por GM Global Construcciones S.A.S. en Cartagena de Indias.",
  alternates: { canonical: "/proyectos" },
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

        <div data-animate className="mt-16 text-center">
          <h2 className="text-2xl text-text-heading">Galería de obras GM Global</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-text-muted">
            Banco fotográfico general de obras ejecutadas por GM Global Construcciones. Estas fotos no están
            necesariamente asociadas a un proyecto específico de los de arriba — quedan pendientes de
            clasificación por proyecto cuando se confirme con el cliente.
          </p>
          <div className="mt-6 flex justify-center">
            <GalleryModal images={galleryImages} projectName="GM Global Construcciones" />
          </div>
        </div>
      </section>
    </>
  );
}
