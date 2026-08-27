import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { TagBadge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      data-animate
      className="group block overflow-hidden border border-border-default bg-white transition-all duration-[250ms] hover:-translate-y-[5px] hover:border-brand-primary hover:shadow-[var(--shadow-hover)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[250ms] group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-black/[0.48] px-4 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-[2px] text-teal-light">{project.label}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl text-text-heading">{project.name}</h3>
        <p className="mt-1 text-xs font-semibold tracking-wide text-teal-700">
          {project.location}
          {project.duration ? ` · ${project.duration}` : ""}
        </p>
        <p className="mt-3 text-sm text-text-body">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagBadge key={tag}>{tag}</TagBadge>
          ))}
          <TagBadge tone="green">{project.status}</TagBadge>
        </div>
      </div>
    </Link>
  );
}
