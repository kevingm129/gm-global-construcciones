import Image from "next/image";
import Link from "next/link";
import { serviceCategories, type Service } from "@/lib/data";

function categoryHrefFor(serviceSlug: string): string {
  const category = serviceCategories.find((cat) => cat.serviceSlugs.includes(serviceSlug));
  return category ? `/servicios/${category.slug}#${serviceSlug}` : "/servicios";
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      data-animate
      className="group relative overflow-hidden border border-border-default bg-white transition-all duration-[250ms] hover:-translate-y-[5px] hover:border-brand-primary hover:shadow-[var(--shadow-hover)]"
    >
      <div className="card-corner-accent" aria-hidden />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-[250ms] group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl text-text-heading">{service.name}</h3>
        <p className="mt-2 text-sm text-text-muted">{service.description}</p>
        <Link
          href={categoryHrefFor(service.slug)}
          className="mt-4 inline-block text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
        >
          Conocer este servicio →
        </Link>
      </div>
    </div>
  );
}
