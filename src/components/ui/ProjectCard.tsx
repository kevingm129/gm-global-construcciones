import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { TagBadge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      data-animate
      className="group block overflow-hidden rounded-[var(--radius-lg)] border border-border-default bg-white shadow-[var(--shadow-sm)] transition-shadow duration-[250ms] hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[250ms] group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-sm text-white">{project.label}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl text-text-heading">{project.name}</h3>
        <p className="mt-1 text-sm text-text-muted">
          {project.location}
          {project.duration ? ` · ${project.duration}` : ""}
        </p>
        <p className="mt-3 text-sm text-text-body">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagBadge key={tag}>{tag}</TagBadge>
          ))}
          <TagBadge tone="green">{project.status}</TagBadge>
        </div>
      </div>
    </Link>
  );
}
