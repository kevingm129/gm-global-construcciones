# SEO técnico + Analítica — GM Global Construcciones S.A.S.
**Fecha:** 2026-08-25
**Fase:** 4 — SEO técnico y analítica, sobre el MVP de `docs/PLAN-MIGRACION-DOMINIO.md` (Fase 3, ya en PR).
**Base:** `docs/ARQUITECTURA-INFORMACION.md` (sitemap y datos reales confirmados), `src/lib/data.ts` (fuente única de contenido real).

Regla aplicada: ningún dato estructurado usa información inventada. Donde no existe contenido real que
respalde un tipo de Schema.org (caso de `FAQPage`, ver §1.5), se omite en vez de rellenarlo.

---

## 1. Datos estructurados (Schema.org / JSON-LD)

Implementados en `src/lib/schema.ts`, con las funciones generadoras separadas del renderizado para
poder reutilizarlas en cualquier página.

### 1.1 `Organization` + `LocalBusiness`
Se emite **una sola entidad** con `@type: ["Organization", "LocalBusiness", "GeneralContractor"]` en vez de
dos bloques JSON-LD separados: los tres tipos describen los mismos datos reales (nombre legal, NIT
implícito vía `company`, dirección, teléfono, correo, redes sociales) y `GeneralContractor` (subtipo de
`LocalBusiness` en schema.org) es el tipo más preciso para la actividad real de la empresa. Se renderiza
una vez, a nivel de sitio, en `src/app/layout.tsx` — antes vivía duplicado solo en la Home
(`src/app/page.tsx`), se centralizó para que todas las páginas lo emitan.

Todos los valores provienen de `company` en `src/lib/data.ts` (Fase 1-2, aprobado): NIT, dirección,
teléfonos, correos, redes. No se agregó ningún dato nuevo.

### 1.2 `Service`
Un bloque `Service` por cada una de las 11 especialidades reales, renderizado en `/servicios` (el índice
que efectivamente muestra las 11 — se evitó duplicarlo también en `/servicios/[categoria]` para no repetir
la misma entidad en dos URLs). Cada `Service` referencia a la organización vía `@id` y usa `areaServed:
["Cartagena de Indias", "Bolívar"]`, consistente con el alcance de SEO local (§3).

### 1.3 `BreadcrumbList`
Se generó a partir de los mismos `items` que ya recibía el componente `<Breadcrumb>`
(`src/components/ui/Breadcrumb.tsx`), así que el schema queda sincronizado por construcción con lo que
el usuario ve en pantalla — no hay dos fuentes de verdad para la ruta de navegación. Se emite en las 12
páginas que ya usaban `<Breadcrumb>`.

### 1.4 Página de inicio
No lleva `<Breadcrumb>` (es la raíz), pero sí recibe el `Organization`/`LocalBusiness` vía `layout.tsx`.

### 1.5 `FAQPage` — omitido deliberadamente
No existe todavía contenido real de preguntas frecuentes en ningún lugar del sitio. El único `Accordion`
implementado (`/inspeccion-inmuebles`) muestra los 7 pasos de la metodología de inspección
(Agenda → Cierre), que es contenido de proceso, no un formato pregunta/respuesta. Como la regla no
negociable de esta fase prohíbe inventar datos estructurados, **no se generó `FAQPage`**. Queda pendiente
de implementarse el día que el cliente aporte preguntas frecuentes reales — en ese momento se puede
envolver ese contenido con el mismo patrón de `src/lib/schema.ts`.

---

## 2. Meta tags

- `metadataBase` ya apuntaba a `https://www.gmglobalconstrucciones.co` (sin cambios).
- Se agregó `alternates.canonical` en las 13 páginas del sitemap (home vía `layout.tsx`, las 12 restantes
  en su propio `metadata`/`generateMetadata`), incluyendo las rutas dinámicas `/servicios/[categoria]` y
  `/proyectos/[slug]` con su slug real.
- `/recursos/[slug]` (placeholder del backlog de blog, sin `generateStaticParams` ni contenido real) se
  marcó `robots: { index: false, follow: false }` en vez de canonical — indexarla generaría páginas
  delgadas duplicadas por cualquier slug arbitrario que alguien solicite.
- `verification.google` se agrega solo si existe `NEXT_PUBLIC_GSC_VERIFICATION` (ver README) — sin esa
  variable no se renderiza ninguna meta tag de verificación.
- Open Graph, `title.template` y `description` de `layout.tsx` ya existían de la Fase 3 y no se
  modificaron.

---

## 3. `sitemap.xml` y `robots.txt`

Implementados con las convenciones nativas de Next.js App Router (`src/app/sitemap.ts` y
`src/app/robots.ts`), que generan los archivos en build — no son archivos estáticos en `public/`.

- `sitemap.ts` enumera únicamente rutas reales del sitemap aprobado (§1 de
  `docs/ARQUITECTURA-INFORMACION.md`): las 10 páginas estáticas, las 5 categorías de `/servicios/[categoria]`
  y los 5 proyectos de `/proyectos/[slug]`. **No incluye** `/recursos/[slug]` (sin contenido real, ver §2).
- `robots.ts` permite rastrear todo el sitio salvo `/api/*` (rutas de los 3 formularios, no contenido
  indexable) y declara el sitemap.

## SEO local — alcance Cartagena y Bolívar

Todo el `areaServed` de los schemas (`LocalBusiness`/`GeneralContractor` y cada `Service`) se limita
explícitamente a `"Cartagena de Indias"` y `"Bolívar"` — **no se agregó ninguna otra ciudad**, siguiendo la
instrucción de esta fase de no expandir el alcance geográfico hasta que GM Global tenga capacidad real
fuera de Cartagena. Si en el futuro la empresa opera en otra ciudad, el cambio es puntual: agregar el
valor a los arrays `areaServed` en `src/lib/schema.ts`.

---

## 4. Analítica — estructura lista, sin credenciales activas

Se dejó la integración funcional pero **inactiva por defecto**: cada pieza solo se renderiza/envía si su
variable de entorno correspondiente existe (ver README, sección "Analítica (opcional, Fase 4)").

| Plataforma | Componente | Variable de entorno | Comportamiento sin la variable |
|---|---|---|---|
| Google Analytics 4 | `src/components/analytics/GoogleAnalytics.tsx` | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No se inyecta ningún `<script>` |
| Meta Pixel | `src/components/analytics/MetaPixel.tsx` | `NEXT_PUBLIC_META_PIXEL_ID` | No se inyecta ningún `<script>` |
| Google Search Console | meta tag `verification.google` en `layout.tsx` | `NEXT_PUBLIC_GSC_VERIFICATION` | No se renderiza la meta tag |

`src/lib/analytics.ts` expone `trackEvent(nombre, params?)`, que llama a `window.gtag` / `window.fbq`
**solo si existen** (comprobación con `?.`) — con las 3 variables sin configurar, todas las llamadas son
no-ops seguros, sin errores en consola ni referencias rotas.

---

## 5. Eventos de conversión instrumentados

| Evento | Dónde se dispara | Implementación |
|---|---|---|
| `click_whatsapp` | Enlace de WhatsApp en el footer (todas las páginas) y en `/contacto` | `TrackedLink` (`src/components/ui/TrackedLink.tsx`) sobre `company.whatsapp` |
| `click_phone` | Cada número de teléfono real, ahora convertido en enlace `tel:` clicable, en el footer y en `/contacto` | `TrackedLink` |
| `click_cotizacion` | Los 4 botones "Solicitar cotización" que enlazan a `/cotizacion` (Home ×2, `/contacto`, ficha de proyecto) | prop `trackEvent` en `src/components/ui/Button.tsx` |
| `submit_cotizacion` | Envío exitoso del formulario de cotización (después de `res.ok`, antes de mostrar el mensaje de éxito) | `src/components/forms/QuoteForm.tsx` |
| `submit_inspeccion` | Envío exitoso del formulario de inspección | `src/components/forms/InspectionForm.tsx` |
| `submit_constructora` | Envío exitoso del formulario de constructoras | `src/components/forms/ConstructorasForm.tsx` |
| `view_project` | Carga de una ficha de proyecto (`/proyectos/[slug]`) | `src/components/ViewTracker.tsx`, dispara una vez al montar con el `slug` como parámetro |

Nota técnica: `company.whatsapp` (`https://wa.me/573186668908`) no es un dato nuevo — es el primer
teléfono real ya confirmado (`+57 318 6668908`), solo formateado como enlace de WhatsApp. Antes de esta
fase ningún teléfono del sitio era clicable (ni `tel:` ni `wa.me`); se agregó porque los eventos
`click_whatsapp`/`click_phone` que pide esta fase no tenían ningún elemento real del que colgarse.

---

## 6. Resumen de las 4 fases completadas

| Fase | Entregable | Estado |
|---|---|---|
| 0 — Auditoría técnica | `docs/AUDITORIA-TECNICA.md` | ✅ Completa |
| 1 — Arquitectura de información | `docs/ARQUITECTURA-INFORMACION.md` | ✅ Completa y aprobada |
| 2 — Copy + sistema de diseño | `docs/COPY.md`, `docs/DESIGN-TOKENS.md` | ✅ Completa y aprobada |
| 3 — Desarrollo MVP | Next.js en `feature/rediseno-web-v3`, `docs/PLAN-MIGRACION-DOMINIO.md`, PR #1 | ✅ Completa, en revisión |
| 4 — SEO técnico + analítica | Este documento | ✅ Completa, pendiente de aprobación para Fase 5 |

## 7. Placeholders `[AGREGAR INFORMACIÓN REAL]` que siguen pendientes

Sin cambios respecto al cierre de Fase 3 — esta fase no agregó ni resolvió ninguno, solo trabajó sobre
datos ya confirmados:

- `/empresa`: años de experiencia/historia, certificaciones, fotos de equipo u oficina.
- `/servicios/[categoria]`: copy introductorio propio de cada una de las 5 categorías.
- `/inspeccion-inmuebles/compradores` y `/constructoras`: mensajería detallada por audiencia.
- `/proyectos/[slug]`: metros cuadrados, presupuesto y fotos antes/después por proyecto.
- `/constructoras`: descripción del programa de alianza y reseñas de Google.
- Certificación real de cumplimiento NSR-10 (si se aporta, se reincorpora el stat cuantificado del hero).
- **Nuevo de esta fase:** contenido real de preguntas frecuentes, si el cliente decide incorporarlo — es
  el único requisito para poder agregar `FAQPage` (§1.5).

**Detente aquí y espera aprobación antes de pasar a la Fase 5.**
