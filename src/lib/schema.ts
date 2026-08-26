/**
 * Generadores de datos estructurados (JSON-LD). Usan únicamente datos
 * reales confirmados en `company` / `services` (docs/ARQUITECTURA-INFORMACION.md,
 * docs/AUDITORIA-TECNICA.md) — ver docs/SEO-IMPLEMENTACION.md para el
 * detalle de qué tipos de Schema.org se implementan y por qué se omite
 * FAQPage por ahora.
 */
import { company, type Service } from "@/lib/data";

const SITE_URL = "https://www.gmglobalconstrucciones.co";

/**
 * Organization + LocalBusiness combinados en una sola entidad con
 * `@type` múltiple: la empresa es a la vez una organización y un negocio
 * local con dirección física, y `GeneralContractor` (subtipo de
 * LocalBusiness en schema.org) describe con precisión su actividad.
 * Evita declarar dos entidades JSON-LD separadas para los mismos datos.
 */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
    "@id": `${SITE_URL}/#organization`,
    name: company.legalName,
    alternateName: company.shortName,
    description:
      "Empresa de construcción y remodelación en Cartagena de Indias, Colombia. Ofrecemos servicios de obra gris, acabados, construcciones livianas, gestión de proyectos e inspección de inmuebles con cumplimiento de normativas NSR-10.",
    image: `${SITE_URL}/images/logo3.png`,
    logo: `${SITE_URL}/images/logo3.png`,
    telephone: company.phones[0],
    email: company.emails[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    areaServed: ["Cartagena de Indias", "Bolívar"],
    url: SITE_URL,
    sameAs: Object.values(company.social),
  };
}

/** Un Service por especialidad real — usado en /servicios (índice completo). */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    description: service.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["Cartagena de Indias", "Bolívar"],
    url: `${SITE_URL}/servicios#${service.slug}`,
  };
}

export type SchemaCrumb = { label: string; href?: string };

/** BreadcrumbList generado a partir de los mismos `items` que renderiza <Breadcrumb>. */
export function breadcrumbListSchema(items: SchemaCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}
