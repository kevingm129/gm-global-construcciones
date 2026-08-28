import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Recursos",
  // Placeholder sin contenido real ni slugs definidos (generateStaticParams no
  // existe todavía) — se excluye de indexación para no crear páginas delgadas
  // duplicadas por cada slug arbitrario que se solicite.
  robots: { index: false, follow: false },
};

/**
 * Ruta preparada para el backlog de "blog" (fuera de alcance del MVP —
 * ver docs/ARQUITECTURA-INFORMACION.md §5). Sin lógica de contenido todavía.
 */
export default function RecursoPlaceholderPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Recursos" }]} />
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl text-text-heading">Próximamente</h1>
        <p className="mt-4 text-text-muted">
          Esta sección de recursos está en construcción. Mientras tanto, puede contactarnos directamente.
        </p>
        <div className="mt-8">
          <Button href="/contacto">Hablar con GM Global</Button>
        </div>
      </section>
    </>
  );
}
