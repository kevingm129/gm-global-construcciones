# GM Global Construcciones S.A.S. — sitio web

Sitio web de GM Global Construcciones S.A.S., empresa de construcción, remodelación e
inspección de inmuebles en Cartagena de Indias, Colombia.

Migrado desde un sitio estático HTML/CSS/JS (preservado en el historial de git, commit
`chore: baseline del sitio estático actual (pre-migración Next.js)`) a **Next.js**, como parte
de un rediseño en fases documentado en `docs/`:

- `docs/AUDITORIA-TECNICA.md` — Fase 0, auditoría del sitio original.
- `docs/ARQUITECTURA-INFORMACION.md` — Fase 1, sitemap y matriz de contenido.
- `docs/COPY.md` / `docs/DESIGN-TOKENS.md` — Fase 2, copy y sistema de diseño.
- `docs/PLAN-MIGRACION-DOMINIO.md` — Fase 3, plan de corte de DNS de GitHub Pages a Vercel.
- `docs/SEO-IMPLEMENTACION.md` — Fase 4, SEO técnico, datos estructurados y analítica.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (tokens de diseño en `src/app/globals.css`, ver
  `docs/DESIGN-TOKENS.md`)
- Envío de formularios vía [Resend](https://resend.com) (ver `src/lib/email.ts`)
- Pensado para desplegarse en [Vercel](https://vercel.com)

## Requisitos

- Node.js 20+ (probado con Node 24 LTS)

## Instalación y desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Los 3 formularios del sitio (`/cotizacion`, `/constructoras` y la solicitud de inspección)
envían correo real a través de Resend. Sin estas variables configuradas, las rutas de API
devuelven un error explícito en vez de simular un envío exitoso (a diferencia del formulario
del sitio original, ver hallazgo en `docs/AUDITORIA-TECNICA.md` §6).

Crear un archivo `.env.local` (no se versiona) con:

```bash
RESEND_API_KEY=   # API key de Resend
RESEND_FROM=      # remitente verificado en Resend, ej: notificaciones@gmglobalconstrucciones.co
RESEND_TO=        # opcional — buzón de destino, por defecto info@gmglobalconstrucciones.co
```

### Analítica (opcional, Fase 4)

El sitio incluye la integración lista para GA4, Meta Pixel y la verificación de Search
Console (ver `docs/SEO-IMPLEMENTACION.md`), pero no se activa nada sin estas variables:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=      # ej: G-XXXXXXXXXX — sin esto, GA4 no se carga
NEXT_PUBLIC_META_PIXEL_ID=          # ID numérico de Meta Pixel — sin esto, no se carga
NEXT_PUBLIC_GSC_VERIFICATION=       # código de la meta tag de Google Search Console
```

## Build de producción

```bash
npm run build
npm start
```

## Despliegue

Ver `docs/PLAN-MIGRACION-DOMINIO.md` para el plan completo de corte del dominio
`www.gmglobalconstrucciones.co` desde GitHub Pages (sitio estático original) hacia Vercel,
incluyendo la ventana de riesgo de DNS. **Ningún cambio de DNS se ha ejecutado todavía.**

## Estructura del proyecto

```
src/
  app/                    Rutas (App Router) — una carpeta por página del sitemap
  components/
    layout/               Navbar, Footer
    ui/                   Componentes reutilizables (Button, Badge, Card, Tabs, Accordion...)
    forms/                Los 3 formularios (cotización, inspección, constructoras)
  lib/
    data.ts               Fuente única de contenido real de la empresa
    email.ts              Envío de correo (Resend)
public/
  images/                 Banco de imágenes real (copiado de assets/images/ del sitio original)
docs/                     Documentación de las Fases 0-3
```

## Placeholders de contenido pendiente

El sitio usa el marcador literal `[AGREGAR INFORMACIÓN REAL]` en los bloques donde no existe
todavía contenido real verificado (ver el detalle completo en
`docs/ARQUITECTURA-INFORMACION.md` §3). Resumen de lo pendiente al cierre de la Fase 3:

- `/empresa`: fotos de equipo u oficina (años de fundación y certificaciones ya confirmados
  por el cliente el 2026-08-25 — ver `company.founded`/`company.certifications` en
  `src/lib/data.ts`).
- `/servicios/[categoria]`: copy introductorio propio de cada categoría (las descripciones de
  cada uno de los 11 servicios sí son reales).
- `/inspeccion-inmuebles/compradores` y `/constructoras`: casos reales de compradores y
  constructoras (la línea de negocio, su alcance y la mensajería general ya están confirmados).
- `/proyectos/[slug]`: metros cuadrados, presupuesto y fotos antes/después por proyecto.
- `/constructoras`: descripción detallada del programa de alianza y reseñas de Google.
