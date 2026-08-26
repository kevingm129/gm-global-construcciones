import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HomeHero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { company, projects, services, testimonials } from "@/lib/data";

const needPaths = [
  {
    title: "Quiero construir o remodelar",
    description: "Obra nueva, remodelación o un proyecto integral con acompañamiento de principio a fin.",
    href: "/cotizacion",
    cta: "Solicitar cotización",
  },
  {
    title: "Voy a recibir un inmueble",
    description: "Inspección visual y técnica antes de la entrega, con informe claro y evidencia documentada.",
    href: "/inspeccion-inmuebles/compradores",
    cta: "Conocer este servicio",
  },
  {
    title: "Soy una constructora",
    description: "Apoyo en revisión previa a entrega, punch lists y reinspección para su proceso de entrega.",
    href: "/inspeccion-inmuebles/constructoras",
    cta: "Conocer este servicio",
  },
  {
    title: "No sé qué necesito",
    description: "Cuéntenos su situación y le orientamos hacia el servicio correcto para su proyecto.",
    href: "/contacto",
    cta: "Hablar con GM Global",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero
        eyebrow={`${company.address.city}, ${company.address.country}`}
        title={
          <>
            <em className="italic text-teal-light">{company.tagline}</em>
            <br />
            construimos y remodelamos en Cartagena de Indias
          </>
        }
        subtitle="De la estructura al acabado final: convertimos ideas en espacios funcionales y bien construidos, con acompañamiento en cada etapa del proyecto."
        primaryCta={
          <Button href="/cotizacion" variant="primary" trackEvent="click_cotizacion">
            Solicitar cotización
          </Button>
        }
        secondaryCta={
          <Button href="/contacto" variant="outline" className="border-white text-white hover:bg-white hover:text-surface-dark">
            Hablar con GM Global
          </Button>
        }
        stats={[
          { value: "11", label: "Especialidades" },
          { value: "5", label: "Proyectos entregados" },
          { value: String(company.address.city), label: "Cartagena de Indias" },
        ]}
      />

      {/* Selector de 4 caminos */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <SectionHeader eyebrow="¿Qué necesita?" title="Encuentre el camino correcto para su proyecto" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {needPaths.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              data-animate
              className="group flex flex-col rounded-[var(--radius-lg)] border border-border-default bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow duration-[250ms] hover:shadow-[var(--shadow-md)]"
            >
              <h3 className="text-lg text-text-heading">{path.title}</h3>
              <p className="mt-2 flex-1 text-sm text-text-muted">{path.description}</p>
              <span className="mt-4 text-sm font-medium text-brand-primary group-hover:text-brand-primary-hover">
                {path.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-surface-alt px-6 py-16 md:px-10 md:py-24" id="servicios">
        <SectionHeader
          eyebrow="Portafolio de servicios"
          title="Lo que ofrecemos"
          subtitle="Soluciones constructivas integrales para proyectos residenciales, comerciales e institucionales en Cartagena y alrededores."
        />
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/servicios" variant="outline">
            Ver todos los servicios
          </Button>
        </div>
      </section>

      {/* Nosotros (resumen) */}
      <section className="px-6 py-16 md:px-10 md:py-24" id="nosotros">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div data-animate>
            <p className="text-sm font-medium uppercase tracking-wide text-brand-primary">Nuestra filosofía</p>
            <h2 className="mt-2 text-3xl text-text-heading">
              Eficiencia, precisión y profesionalismo en Cartagena y alrededores
            </h2>
            <p className="mt-4 text-text-body">
              Nos basamos en principios de eficiencia, precisión y profesionalismo, posicionándonos como una opción
              confiable en Cartagena y alrededores. Nuestros servicios están pensados específicamente para
              potenciar su proyecto.
            </p>
            <Button href="/empresa" variant="ghost" className="mt-4">
              Conocer más sobre GM Global →
            </Button>
          </div>
          <div data-animate className="bg-surface-dark p-10 text-white">
            <h3 className="font-heading text-xl text-teal-light">Quiénes somos</h3>
            <p className="mt-4 text-[14px] font-light leading-[1.78] text-white/75">
              Somos una empresa dedicada a la construcción y remodelación, especializada en obras de alta calidad
              que cumplen con los estándares más rigurosos de la industria.
            </p>
            <div
              className="mt-5 flex items-center gap-4 p-6"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              <p className="text-xs font-semibold leading-[1.45] tracking-[0.3px] text-white">
                Cumplimiento total de normativas NSR-10 y estándares de seguridad estructural colombianos. La
                seguridad es una prioridad en cada obra que ejecutamos.
              </p>
            </div>
            <p className="mt-5 border-l-[3px] border-brand-primary bg-brand-primary/[0.06] px-6 py-3.5 font-heading text-xl italic tracking-wide text-brand-primary">
              {company.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="bg-surface-alt px-6 py-16 md:px-10 md:py-24" id="proyectos">
        <SectionHeader
          eyebrow="Nuestra obra"
          title="Proyectos destacados"
          subtitle="Obras ejecutadas en Cartagena de Indias con excelencia técnica y cumplimiento normativo."
        />
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/proyectos" variant="outline">
            Ver todos los proyectos
          </Button>
        </div>
      </section>

      {/* Testimonios */}
      <section className="px-6 py-16 md:px-10 md:py-24" id="testimonios">
        <SectionHeader eyebrow="Lo que dicen nuestros clientes" title="Satisfacción garantizada" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* CTA contacto */}
      <section className="bg-surface-dark px-6 py-16 text-center text-white md:px-10 md:py-24">
        <h2 className="text-3xl">¿Tiene un proyecto en mente?</h2>
        <p className="mx-auto mt-4 max-w-xl text-text-on-dark-muted">
          Contáctenos y convirtamos sus ideas en espacios funcionales y estéticamente atractivos.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/cotizacion" trackEvent="click_cotizacion">Solicitar cotización</Button>
          <Button href="/contacto" variant="outline" className="border-white text-white hover:bg-white hover:text-surface-dark">
            Hablar con GM Global
          </Button>
        </div>
      </section>
    </>
  );
}
