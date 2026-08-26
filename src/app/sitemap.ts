import type { MetadataRoute } from "next";
import { projects, serviceCategories } from "@/lib/data";

const SITE_URL = "https://www.gmglobalconstrucciones.co";

/**
 * Rutas reales del MVP (docs/ARQUITECTURA-INFORMACION.md §1). No incluye
 * /recursos/[slug]: es un placeholder sin slugs ni contenido real
 * (ver robots: noindex en esa página).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/empresa`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/inspeccion-inmuebles`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/inspeccion-inmuebles/compradores`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/inspeccion-inmuebles/constructoras`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/proyectos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/constructoras`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/cotizacion`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = serviceCategories.map((cat) => ({
    url: `${SITE_URL}/servicios/${cat.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/proyectos/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes];
}
