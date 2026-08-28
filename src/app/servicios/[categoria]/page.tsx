import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { serviceCategories, services } from "@/lib/data";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return serviceCategories.map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const category = serviceCategories.find((cat) => cat.slug === categoria);
  if (!category) return {};
  return {
    title: category.name,
    description: `Servicios de ${category.name.toLowerCase()} en Cartagena de Indias — GM Global Construcciones S.A.S.`,
    alternates: { canonical: `/servicios/${category.slug}` },
  };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { categoria } = await params;
  const category = serviceCategories.find((cat) => cat.slug === categoria);
  if (!category) notFound();

  const categoryServices = services.filter((s) => category.serviceSlugs.includes(s.slug));

  return (
    <>
      <Breadcrumb
        items={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: category.name }]}
      />
      <PageHero eyebrow="Servicios" title={category.name} />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div data-animate className="mx-auto max-w-2xl border border-dashed border-border-strong bg-surface-alt p-6 text-center text-sm text-text-muted">
          {category.intro} — copy introductorio de esta categoría pendiente de contenido real del cliente.
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryServices.map((service) => (
            <div key={service.slug} id={service.slug} className="scroll-mt-24">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
