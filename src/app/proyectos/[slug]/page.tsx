import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { TagBadge } from "@/components/ui/Badge";
import { GalleryModal } from "@/components/ui/GalleryModal";
import { ViewTracker } from "@/components/ViewTracker";
import { galleryImages, projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <ViewTracker event="view_project" params={{ project: project.slug }} />
      <Breadcrumb
        items={[{ label: "Inicio", href: "/" }, { label: "Proyectos", href: "/proyectos" }, { label: project.name }]}
      />

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div data-animate className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)]">
          <Image src={project.image} alt={project.name} fill sizes="100vw" className="object-cover" priority />
        </div>

        <div data-animate className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl text-text-heading">{project.name}</h1>
            <p className="mt-1 text-text-muted">
              {project.location}
              {project.duration ? ` · ${project.duration}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TagBadge key={tag}>{tag}</TagBadge>
            ))}
            <TagBadge tone="green">{project.status}</TagBadge>
          </div>
        </div>

        <p data-animate className="mt-6 max-w-3xl text-text-body">
          {project.summary}
        </p>

        <div data-animate className="mt-16">
          <h2 className="text-2xl text-text-heading">Galería de obras GM Global</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Banco fotográfico general de obras ejecutadas por GM Global Construcciones. Estas fotos no están
            necesariamente asociadas a este proyecto específico — quedan pendientes de clasificación por proyecto
            cuando se confirme con el cliente.
          </p>
          <div className="mt-6">
            <GalleryModal images={galleryImages} projectName="GM Global Construcciones" />
          </div>
        </div>

        <div data-animate className="mt-16 text-center">
          <Button href="/cotizacion" trackEvent="click_cotizacion">Solicitar cotización para un proyecto similar</Button>
        </div>
      </section>
    </>
  );
}
