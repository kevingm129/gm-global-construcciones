import Link from "next/link";
import { serviceCategories, type Service } from "@/lib/data";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

function categoryHrefFor(serviceSlug: string): string {
  const category = serviceCategories.find((cat) => cat.serviceSlugs.includes(serviceSlug));
  return category ? `/servicios/${category.slug}#${serviceSlug}` : "/servicios";
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      data-animate
      className="group relative overflow-hidden border border-border-default bg-white p-8 transition-all duration-[250ms] hover:-translate-y-[5px] hover:border-brand-primary hover:shadow-[var(--shadow-hover)]"
    >
      <div className="card-corner-accent" aria-hidden />
      <div
        className="mb-5 flex h-[50px] w-[50px] items-center justify-center bg-surface-dark transition-[background] duration-[250ms] group-hover:bg-[image:var(--gradient-brand)]"
        aria-hidden
      >
        <ServiceIcon
          slug={service.slug}
          className="h-[22px] w-[22px] stroke-teal-light transition-colors duration-[250ms] group-hover:stroke-white"
        />
      </div>
      <h3 className="text-xl text-text-heading">{service.name}</h3>
      <p className="mt-3 text-sm text-text-muted">{service.description}</p>
      <Link
        href={categoryHrefFor(service.slug)}
        className="mt-4 inline-block text-sm font-medium text-teal-700 hover:text-brand-primary-hover"
      >
        Conocer este servicio →
      </Link>
    </div>
  );
}
