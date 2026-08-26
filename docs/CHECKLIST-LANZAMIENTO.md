# Checklist de lanzamiento — GM Global Construcciones S.A.S.
**Fecha:** 2026-08-25
**Fase:** 5 — QA final y despliegue a producción.
**Estado general: MVP validado en código y localmente. El corte de dominio, la activación de
analítica real y el merge a `main` NO se han ejecutado — requieren acceso o decisiones que no
son mías: cuenta de Vercel, panel DNS del dominio, y credenciales reales del cliente.**

---

## 1. QA de código y funcional — completado

### 1.1 Formularios (los 3 probados contra el servidor real, no simulado)

| Prueba | Cotización | Inspección | Constructoras |
|---|---|---|---|
| Rechaza sin `consentimiento` (HTTP 400, validado en servidor, no solo en el checkbox del cliente) | ✅ | ✅ | ✅ |
| Rechaza campos obligatorios faltantes (HTTP 400) | ✅ | ✅ | ✅ |
| Sin `RESEND_API_KEY`/`RESEND_FROM` configuradas, falla explícito (HTTP 503) — **nunca** reporta éxito falso | ✅ | ✅ | ✅ |
| Checkbox de consentimiento con `required` + Ley 1581 de 2012 visible antes de poder enviar | ✅ | ✅ | ✅ |

Probado con `npm run build && npm run start` contra `http://localhost` real, con `curl` simulando
envíos válidos e inválidos — no contra mocks.

**Pendiente, fuera de mi alcance:** una prueba de extremo a extremo con **credenciales reales de
Resend** (que el correo efectivamente llegue a `info@gmglobalconstrucciones.co`). Esto requiere que
el cliente proporcione `RESEND_API_KEY` y un remitente verificado en Resend — no se puede simular
sin esas credenciales, y no corresponde inventar ni usar una cuenta de prueba en producción.

### 1.2 Accesibilidad (revisión de código)

- Los 3 formularios usan `<label htmlFor>` enlazado a cada campo, `aria-invalid` en error y
  mensajes de error con `role="alert"` (`src/components/ui/FormField.tsx`).
- Las 3 imágenes con contenido variable (`ProjectCard`, `ServiceCard`, `GalleryModal`) tienen `alt`
  descriptivo generado desde datos reales (nombre de proyecto/servicio), no genérico.
- `Accordion` usa `<button>` nativo con `aria-expanded`/`aria-controls` — operable por teclado sin
  JS adicional.
- `GalleryModal` cierra con `Escape`, y tiene `aria-modal="true"` + `aria-label` en el diálogo y el
  botón de cierre.
- Contraste de color: los tokens de `docs/DESIGN-TOKENS.md` se definieron pensando en contraste
  AA, pero **no se ejecutó una auditoría automatizada (ej. Lighthouse/axe) en esta fase** — no
  tengo un navegador real disponible en este entorno para correrla.

### 1.3 Responsive / Core Web Vitals

**No pude verificarlo visualmente** — este entorno no tiene un navegador real ni herramienta de
Lighthouse/PageSpeed disponible. Lo que sí se verificó:
- El build de producción (`npm run build`) compila y prerrenderiza las 28 rutas sin errores.
- Todas las imágenes usan `next/image` (optimización automática, lazy loading por defecto).
- Las clases Tailwind de los componentes ya usan variantes `sm:`/`md:`/`lg:` de forma consistente
  (mobile-first), heredado de la Fase 3.

**Recomendación:** correr Lighthouse/PageSpeed Insights sobre el dominio de preview de Vercel una
vez desplegado (paso 2 de la migración, §3) — ahí sí hay un entorno real que medir.

### 1.4 Eventos de conversión (Fase 4)

Verificado a nivel de código y con el servidor local que cada evento se dispara en el punto
correcto (`trackEvent(...)` en el código fuente, confirmado con `grep` y con la respuesta real de
los 3 endpoints). **No se pudo verificar la llegada real a GA4/Meta** porque, por diseño, esas
integraciones están inactivas sin `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_META_PIXEL_ID`
(ver §4). Se recomienda verificar en tiempo real con el DebugView de GA4 una vez conectadas las
credenciales reales.

---

## 2. Placeholders `[AGREGAR INFORMACIÓN REAL]` pendientes de completar por el cliente

Lista verificada directamente contra el código fuente (no solo contra los docs de fases previas),
13 apariciones literales en 6 páginas:

| Página | Qué falta |
|---|---|
| `/empresa` | Años de experiencia / historia de la empresa |
| `/empresa` | Certificaciones |
| `/empresa` | Fotos de equipo / oficina |
| `/servicios/construccion`, `/obra-civil`, `/mamposteria`, `/acabados`, `/remodelacion` | Copy introductorio propio de cada una de las 5 categorías (las descripciones de los 11 servicios individuales sí son reales y ya están) |
| `/inspeccion-inmuebles/compradores` | Mensajería y casos específicos para audiencia compradora |
| `/inspeccion-inmuebles/constructoras` | Mensajería y casos específicos para constructoras (punch lists, reinspección) |
| `/proyectos/[slug]` (5 proyectos) | Metros cuadrados, presupuesto y fotos antes/después por proyecto |
| `/constructoras` | Descripción del programa de alianza |
| `/constructoras` | Reseñas de Google |

Adicional, no bloqueante: certificación real de cumplimiento NSR-10 (si se aporta, se reincorpora
el stat cuantificado del hero — hoy usa solo la versión cualitativa) y contenido real de preguntas
frecuentes (única condición para agregar `FAQPage`, ver `docs/SEO-IMPLEMENTACION.md` §1.5).

**No se publicó contenido inventado en ninguno de estos espacios** — todos muestran el marcador
literal en producción hasta que el cliente los complete.

---

## 3. Migración de dominio — NO ejecutada

Según el plan de `docs/PLAN-MIGRACION-DOMINIO.md` (Fase 3):

| Paso | Estado |
|---|---|
| 1. Desplegar en Vercel con dominio de preview | ❌ No ejecutado — requiere una cuenta de Vercel conectada a este repositorio, que no tengo acceso a crear ni operar desde este entorno |
| 2. Validar el preview contra el checklist de QA (§1) | Pendiente del paso 1 |
| 3. Configurar `www.gmglobalconstrucciones.co` en Vercel y actualizar DNS/CNAME | ❌ No ejecutado — el panel DNS del dominio no es visible ni accesible desde este repositorio (confirmado desde la Fase 0) |
| 4. Mantener el `CNAME` de GitHub Pages como respaldo durante la propagación | El `CNAME` sigue intacto en el repo, sin tocar |
| 5. Retirar GitHub Pages una vez confirmado el tráfico en Vercel | Pendiente de los pasos anteriores |

**Ningún cambio de DNS se ha ejecutado.** El sitio actual en GitHub Pages sigue siendo la única
versión en producción.

---

## 4. Activación de analítica real — NO ejecutada

`docs/SEO-IMPLEMENTACION.md` (Fase 4) dejó la integración de GA4, Meta Pixel y Search Console lista
pero inactiva por diseño. Para activarla en producción se necesita que el cliente proporcione:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — de una propiedad GA4 real del cliente.
- `NEXT_PUBLIC_META_PIXEL_ID` — de un Business Manager de Meta real del cliente.
- `NEXT_PUBLIC_GSC_VERIFICATION` — código de verificación de una propiedad real en Search Console.

No se generaron ni se usaron credenciales de prueba — configurar variables de entorno en Vercel
con estos valores reales es un paso que debe ejecutar quien tenga acceso al proyecto en Vercel.

---

## 5. Cierre — merge a `main`

**No se hizo merge del PR #1 (`feature/rediseno-web-v3` → `main`).** Según la regla no negociable
de esta fase, el merge solo debe ocurrir después de que el dominio ya esté apuntando a Vercel y
validado — eso todavía no ha pasado (§3). El PR sigue abierto en
`https://github.com/kevingm129/gm-global-construcciones/pull/1`, con todos los commits de las
Fases 3 y 4 ya incluidos.

**Fecha/hora del corte de DNS:** N/A — no se ha ejecutado ningún corte.

---

## 6. Qué necesito de ti para continuar

1. Acceso para desplegar en Vercel (o que lo despliegues tú y me compartas la URL de preview para
   validar).
2. Acceso al panel DNS de `gmglobalconstrucciones.co` (o que tú ejecutes el cambio siguiendo
   `docs/PLAN-MIGRACION-DOMINIO.md` §Paso 4, y me confirmes cuándo está hecho).
3. Las 3 credenciales reales de analítica (§4), cuando el cliente las tenga listas.
4. Confirmación explícita para hacer el merge a `main`, una vez el dominio real esté validado.
