import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Empresa",
  description: "Quiénes somos: filosofía y forma de trabajo de GM Global Construcciones S.A.S. en Cartagena de Indias.",
  alternates: { canonical: "/empresa" },
};

const checks = [
  "Obras de alta calidad bajo estándares rigurosos de la industria",
  "Coordinación efectiva de todas las disciplinas constructivas",
  "Cumplimiento total de cronograma y especificaciones técnicas",
  "La seguridad es una prioridad en cada obra que ejecutamos",
  "Entrega de espacios funcionales con acabados de alta calidad",
];

export default function EmpresaPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Empresa" }]} />
      <PageHero eyebrow="Quiénes somos" title="Eficiencia, precisión y profesionalismo" />

      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2">
          <div data-animate>
            <p className="text-sm font-medium uppercase tracking-wide text-brand-primary">Nuestra filosofía</p>
            <div className="mt-2 space-y-4 text-text-body">
              <p>
                Nos basamos en principios de eficiencia, precisión y profesionalismo, posicionándonos como una
                opción confiable en Cartagena y alrededores. Nuestros servicios están pensados específicamente
                para potenciar su proyecto.
              </p>
            </div>
            <ul className="mt-6 flex flex-col gap-2.5">
              {checks.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[10px] text-white"
                    style={{ backgroundImage: "var(--gradient-brand)" }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-animate className="bg-surface-dark p-10 text-white">
            <h3 className="font-heading text-xl text-teal-light">Quiénes somos</h3>
            <p className="mt-4 text-[14px] font-light leading-[1.78] text-white/75">
              Somos una empresa dedicada a la construcción y remodelación, especializada en obras de alta calidad
              que cumplen con los estándares más rigurosos de la industria. Nos enorgullece trabajar de la mano
              con nuestros clientes para materializar sus ideas y convertirlas en espacios funcionales y
              estéticamente atractivos.
            </p>
            <div className="mt-5 flex items-center gap-4 p-6" style={{ backgroundImage: "var(--gradient-brand)" }}>
              <p className="text-xs font-semibold leading-[1.45] tracking-[0.3px] text-white">
                Cumplimiento total de normativas NSR-10 y estándares de seguridad estructural colombianos.
              </p>
            </div>
            <p className="mt-5 border-l-[3px] border-brand-primary bg-brand-primary/[0.06] px-6 py-3.5 font-heading text-xl italic tracking-wide text-brand-primary">
              {company.tagline}
            </p>
          </div>
        </div>

        <div data-animate className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
          <div className="border border-border-default bg-white p-6 text-center">
            <span className="font-heading text-2xl text-brand-primary">Desde 2023</span>
            <p className="mt-1 text-xs text-text-muted">
              Constituida el{" "}
              {new Date(company.founded).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="border border-border-default bg-white p-6 text-center">
            <span className="font-heading text-base text-brand-primary">Certificaciones</span>
            <ul className="mt-2 space-y-1 text-xs text-text-muted">
              {company.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>

        <p data-animate className="mx-auto mt-6 max-w-5xl text-center text-xs text-text-muted">
          [AGREGAR INFORMACIÓN REAL] — fotos de equipo y oficina, pendientes de que el cliente las aporte.
        </p>

        <div data-animate className="mt-12 text-center">
          <Button href="/proyectos" variant="outline">
            Ver proyectos realizados
          </Button>
        </div>
      </section>
    </>
  );
}
