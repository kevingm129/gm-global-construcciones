# Arquitectura de Información — GM Global Construcciones S.A.S.
**Fecha:** 2026-08-23
**Fase:** 1 — Arquitectura de información (sitemap + matriz de contenido). No se genera código ni copy final en esta fase.
**Base:** `docs/AUDITORIA-TECNICA.md` (Fase 0)

Regla aplicada en todo el documento: ningún cliente, proyecto, cifra, certificación, testimonio o año de experiencia se inventa. Donde falta información real se marca literalmente `[AGREGAR INFORMACIÓN REAL]`.

---

## 0. Verificación de los datos de partida contra el repositorio

| Dato de partida | Verificación contra `index.html` | Resultado |
|---|---|---|
| 11 servicios listados | Coinciden exactamente los 11 `<h3>` de `.service-card` (Estructura, Plomería, Mampostería, Pañete, Alistado de pisos, Enchapes, Estucos y pintura, Construcciones livianas, Gestión de proyectos, Remodelaciones, Aseo grueso y fino) | ✅ Confirmado |
| 5 proyectos reales (Ksyar, Lazuli Towers, Doral Suites, Iglesia Misión Boston, El Tesillo) | Coinciden los 5 `.project-card` con mismos nombres, ubicación, duración y tags | ✅ Confirmado |
| 3 testimonios (Ksyar, Lazuli Towers, Iglesia Misión Boston) | Coinciden los 3 `.testimonio-card` con las mismas citas y atribución | ✅ Confirmado |
| Contacto: dirección, teléfonos, correos, NIT | Coincide exactamente con `.contact-item` y `footer-copy` | ✅ Confirmado |
| "100% Cumplimiento NSR-10" (hero stat) | Existe en `index.html:64-65` como estadística del hero, sin ningún certificado, número de radicado o documento de soporte en el repo | **RESUELTO (2026-08-23):** se retira el porcentaje cuantificado "100%" por no ser verificable. Se conserva la orientación cualitativa a NSR-10 (ya presente y no cuestionada en `.about-box-accent`, línea 227: "Cumplimiento total de normativas NSR-10...") sin convertirla en estadística numérica del hero. Si el cliente aporta el soporte documental, el stat cuantificado puede reincorporarse. |
| "6+ Proyectos destacados" (hero stat) | El sitio solo presenta **5** proyectos reales en `#proyectos`. "6+" no cuadra con el inventario actual | **RESUELTO (2026-08-23):** se ajusta a la cifra real confirmada en el repo: **5 proyectos**. No es un dato inventado — es el conteo verificado de `.project-card` en `index.html`. Si se suma un 6º proyecto real, el stat se actualiza en ese momento. |

**Hallazgo adicional no señalado en la lista de partida:** en `.about-checks` (línea 239) hay una afirmación genérica de empresa — *"Cero accidentes laborales: seguridad como prioridad absoluta"* — presentada como hecho corporativo permanente, sin fuente. Es distinto del mismo texto que aparece dentro de la ficha real del proyecto Doral Suites (línea 303, *"Cero accidentes laborales durante todo el proyecto"*), que sí forma parte del contenido de proyecto ya aprobado como real. **Se flaggea solo la versión genérica/corporativa como no verificada.**

**RESUELTO (2026-08-23):** la afirmación genérica de accidentalidad cero no se puede verificar desde el repositorio y no se inventa evidencia. Se reemplaza por un enunciado de valores (no de récord/cifra) que no requiere soporte estadístico: *"La seguridad es una prioridad en cada obra que ejecutamos."* El dato específico de Doral Suites (ligado a ese proyecto puntual, ya validado como contenido real) se conserva sin cambios.

---

## 1. Sitemap definitivo (alcance MVP)

Fuera de alcance en esta fase (van a backlog, no se diseña ni construye contenido para ellos todavía): **blog**, **cotizador inteligente**, **score de inmueble**.

```
/                                    Home
/empresa                             Quiénes somos, filosofía, equipo
/servicios                           Índice de las 2 líneas de negocio (construcción + inspección) y las 11 especialidades
/servicios/construccion              Categoría: obra estructural y gestión
/servicios/obra-civil                Categoría: obra gris / civil
/servicios/mamposteria               Categoría: mampostería
/servicios/acabados                  Categoría: acabados (pañete, enchapes, estucos y pintura)
/servicios/remodelacion              Categoría: remodelación, construcción liviana, plomería, aseo
/inspeccion-inmuebles                Línea 2 — landing general de inspección/recepción/entrega
/inspeccion-inmuebles/compradores    Línea 2 — audiencia: compradores de inmueble
/inspeccion-inmuebles/constructoras  Línea 2 — audiencia: constructoras (punch lists, reinspección)
/proyectos                           Listado de proyectos ejecutados
/proyectos/[slug]                    Ficha de detalle por proyecto
/constructoras                       Constructoras aliadas / relación B2B
/contacto                            Formulario + datos de contacto
/cotizacion                          Solicitud de cotización (formulario dedicado, NO calculadora)
```

Nota de alcance: `/cotizacion` es un formulario de solicitud —equivalente en profundidad al formulario de contacto actual— no el "cotizador inteligente" del backlog, que implica lógica de cálculo automático y queda fuera del MVP.

---

## 2. Mapeo: 11 servicios reales → 5 categorías de `/servicios/*`

**RESUELTO (2026-08-23):** el sitemap agrupa los 11 servicios reales en 5 páginas de categoría. Esta agrupación es una decisión de arquitectura de información — no un dato factual — y se **adopta como base de trabajo** para avanzar; no proviene del repositorio (el sitio actual no tiene categorías, solo una grilla plana de 11 tarjetas). Queda revisable si el cliente pide otra agrupación al ver el sitio implementado:

| Categoría (`/servicios/*`) | Servicios reales que agruparía |
|---|---|
| `construccion` | Estructura, Gestión de proyectos |
| `obra-civil` | Alistado de pisos, (obra gris en general) |
| `mamposteria` | Mampostería (única, sin agrupar) |
| `acabados` | Pañete, Enchapes, Estucos y pintura |
| `remodelacion` | Remodelaciones, Construcciones livianas, Plomería, Aseo grueso y fino |

Si en algún momento el cliente rechaza esta agrupación, la alternativa ya documentada es no categorizar y mantener `/servicios` como listado plano de las 11 especialidades sin las 5 sub-rutas — cambio de bajo costo porque no afecta ningún dato factual, solo la navegación.

---

## 3. Matriz de contenido por ruta

Leyenda: **Conservar** = texto/dato real ya existente, se reutiliza tal cual · **Reescribir** = existe base real pero se debe reorganizar/expandir para la nueva IA · **Nuevo — `[AGREGAR INFORMACIÓN REAL]`** = no existe contenido real en el repo, no se inventa.

### `/` — Home
| Bloque | Estado | Detalle |
|---|---|---|
| Hero (título, subtítulo, CTAs) | Conservar | Texto real existente en `index.html` |
| Stat "11 Especialidades" | Conservar | Verificado (§0) |
| Stat "6+ Proyectos destacados" | **Corregir** | No coincide con inventario real (5). Ajustar a dato real o `[AGREGAR INFORMACIÓN REAL]` |
| Stat "100% Cumplimiento NSR-10" | **Verificar con cliente** | Sin soporte documental en el repo |
| Grilla de 11 servicios | Reescribir | Contenido base real (nombre + descripción por servicio), pero se recomienda reemplazar los íconos SVG genéricos por las 11 fotos reales ya disponibles en `assets/images/servicios/` (correspondencia 1 a 1 confirmada en Fase 0) |
| Sección "Nosotros" (resumen) | Conservar | Texto real existente, se resume aquí y se expande en `/empresa` |
| Claim "Cero accidentes laborales" (genérico) | **Verificar con cliente** | No es un dato de proyecto específico, es una afirmación corporativa sin fuente (§0) |
| Testimonios (3) | Conservar | Verificado (§0) |
| CTA contacto | Conservar | Enlaza a `/contacto` |

### `/empresa`
| Bloque | Estado | Detalle |
|---|---|---|
| "Quiénes somos" / filosofía | Reescribir | Base real existe en `#nosotros` de `index.html`, se expande como página propia |
| Fotos de equipo/oficina | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Confirmado en Fase 0: no hay banco identificado como fotos de equipo/oficina; `nosotros.webp` existe en `assets/images/` pero su contenido real no está confirmado — no asumir que es foto de equipo sin verificarlo visualmente con el cliente |
| Años de experiencia / historia | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | No hay ningún dato de fecha de fundación ni años de trayectoria en el repo |
| Certificaciones | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Ninguna certificación documentada |

### `/servicios`
| Bloque | Estado | Detalle |
|---|---|---|
| Introducción a las 2 líneas de negocio | Nuevo — parcial | La Línea 1 (construcción) tiene base real; la Línea 2 (inspección) es 100% nueva, ver más abajo |
| Listado/índice de 11 servicios reales | Conservar | Nombres y descripciones cortas ya existen |
| Fotos por servicio | Reescribir | Reutilizar las 11 imágenes reales de `assets/images/servicios/` en vez de SVG |

### `/servicios/construccion`, `/servicios/obra-civil`, `/servicios/mamposteria`, `/servicios/acabados`, `/servicios/remodelacion`
| Bloque | Estado | Detalle |
|---|---|---|
| Agrupación de servicios | **Propuesta pendiente de validación** | Ver mapeo §2, no es un hecho confirmado del repo |
| Descripciones por servicio individual dentro de cada categoría | Conservar | Las descripciones de cada uno de los 11 servicios ya son reales y se reutilizan sin cambio de contenido, solo de organización |
| Copy introductorio de cada categoría (texto que sí es nuevo, distinto al de cada servicio) | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | No existe hoy ningún texto de categoría, solo de servicio individual |

### `/inspeccion-inmuebles` (y sus 2 sub-rutas)
| Bloque | Estado | Detalle |
|---|---|---|
| Existencia de la línea de negocio | Confirmado por el usuario como línea nueva | No proviene del repo — es información que el cliente aportó directamente para esta fase |
| Descripción del servicio, alcance, proceso | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Sin contenido real todavía |
| Disclaimer obligatorio | Conservar (instrucción del cliente) | Debe declarar siempre: es inspección visual y técnica según alcance contratado — **nunca** presentarla como peritaje, certificación o dictamen estructural |
| `/compradores`: mensajería para audiencia compradora | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Solo se confirma la audiencia, no el copy |
| `/constructoras`: punch lists, reinspección | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Los conceptos (punch list, reinspección) están confirmados como parte del alcance por el cliente; el copy detallado no existe |
| Casos/ejemplos de inspección | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | No hay ningún proyecto de inspección documentado (es línea nueva, sin historial) |

### `/proyectos`
| Bloque | Estado | Detalle |
|---|---|---|
| Listado de 5 proyectos reales | Conservar | Verificado (§0) |
| Ampliar con `proyecto5.webp` / `proyecto6.webp` (sin usar hoy) | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Las imágenes existen en `assets/images/proyectos-R/` pero no hay ficha de proyecto (nombre, cliente, alcance) asociada — no se puede publicar una imagen como "proyecto" sin sus datos reales |

### `/proyectos/[slug]`
| Bloque | Estado | Detalle |
|---|---|---|
| Datos base (nombre, ubicación, duración, alcance, tags, estado) | Conservar | Ya existen para los 5 proyectos reales |
| Narrativa extendida, metros cuadrados, presupuesto, fotos antes/después | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Nada de esto existe hoy más allá del párrafo breve por proyecto |

### `/constructoras`
| Bloque | Estado | Detalle |
|---|---|---|
| Identidad de las 4 imágenes en `assets/images/clientes/` | **RESUELTO (2026-08-23) — parcial** | Se inspeccionaron los 4 archivos directamente: cada logo trae su nombre legible como texto en la propia imagen. `cliente1.webp` = **Invercolombia**, `cliente2.webp` = **Iglesia Cristiana Evangélica Misión Boston** (coincide con el proyecto/testimonio ya confirmado en Fase 0), `cliente3.webp` = **Project Constructions**, `cliente4.webp` = **Terracolona**. Esto es observación directa del archivo, no un dato inventado. |
| Naturaleza de la relación con Invercolombia, Project Constructions y Terracolona | ✅ **RESUELTO (2026-08-23)** — confirmado directamente por el cliente: son relaciones comerciales reales y autorizadas para publicarse. | Los 4 logos (Invercolombia, Iglesia Cristiana Misión Boston, Project Constructions, Terracolona) quedan habilitados para `/constructoras` sin restricción adicional. |
| Descripción del programa/relación de alianza | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | No existe ningún texto al respecto en el repo |
| Reseñas de Google | Nuevo — `[AGREGAR INFORMACIÓN REAL]` | Confirmado como faltante por el cliente |

### `/contacto`
| Bloque | Estado | Detalle |
|---|---|---|
| Datos de contacto (dirección, teléfonos, correos, NIT) | Conservar | Verificado (§0) |
| Copy del formulario (campos, texto de confirmación "menos de 24 horas hábiles") | Conservar | Texto real reutilizable |
| Funcionalidad de envío | **No es tema de esta fase de contenido** — remite a hallazgo técnico de `docs/AUDITORIA-TECNICA.md` §6: el formulario actual es simulado (no envía nada). Debe resolverse en fase de implementación, no de arquitectura de información. | |

### `/cotizacion`
| Bloque | Estado | Detalle |
|---|---|---|
| Estructura de formulario | Reescribir | Puede reutilizar los mismos campos reales del formulario de contacto actual (nombre, email, teléfono, tipo de servicio, mensaje) adaptados a "solicitar cotización" |
| Promesa de tiempo de respuesta | Conservar | "Nos comunicaremos con usted en menos de 24 horas hábiles" ya es copy real existente |
| Lógica de cálculo/estimación automática | **Fuera de alcance MVP** | Corresponde al "cotizador inteligente" del backlog, no a esta fase |

---

## 4. Banco de imágenes real disponible para nutrir el sitemap (referencia cruzada con Fase 0)

Del inventario de 126 imágenes confirmado en `docs/AUDITORIA-TECNICA.md`:
- `assets/images/servicios/` (11 fotos) → usar en `/servicios` y sus categorías, reemplazando los SVG genéricos.
- `assets/images/proyectos-R/` (8 fotos, 5 en uso) → `/proyectos` y `/proyectos/[slug]`; las 3 sin usar requieren ficha de proyecto real antes de publicarse.
- `assets/images/clientes/` (4 fotos) → identidad confirmada por inspección directa y relación comercial confirmada por el cliente (Invercolombia, Iglesia Cristiana Misión Boston, Project Constructions, Terracolona) — habilitadas para `/constructoras` sin pendientes.
- `assets/images/galeria/` (84 fotos, ninguna en uso) — **RESUELTO (2026-08-23):** se adopta la propuesta de Fase 1: se incorporan como galería de fotos dentro de `/proyectos/[slug]` (componente Modal, ver `docs/DESIGN-TOKENS.md` §6), sin crear una ruta `/galeria` nueva fuera del sitemap aprobado. Decisión de arquitectura, no requiere dato factual adicional para adoptarse — usa banco de fotos real ya existente.

---

## 5. Backlog explícito (fuera del alcance de esta fase)

- Blog
- Cotizador inteligente (calculadora automática de presupuesto)
- Score de inmueble

---

## 6. Estado de pendientes (actualizado 2026-08-23)

| # | Pendiente | Estado |
|---|---|---|
| 1 | Mapeo de 11 servicios → 5 categorías | ✅ Resuelto — adoptado como base de trabajo (§2), revisable |
| 2 | Stats no verificados del hero ("6+", "100% NSR-10") y claim genérico "Cero accidentes laborales" | ✅ Resuelto — ajustados a datos reales confirmados o reformulados sin cifra no verificable (§0) |
| 3 | Identidad de las 4 imágenes de `assets/images/clientes/` | ✅ Resuelto por inspección directa del archivo (§ `/constructoras`) |
| 3b | Relación comercial real con Invercolombia, Project Constructions y Terracolona | ✅ Resuelto — confirmado por el cliente (2026-08-23): son relaciones comerciales reales, autorizadas para publicarse |
| 4 | Destino de las 84 imágenes de `assets/images/galeria/` | ✅ Resuelto — se incorporan como galería modal en `/proyectos/[slug]` |
| 5 | Aprobación para avanzar de fase | Otorgada por el usuario para Fase 2; pendiente para Fase 3 |

**Único punto que sigue abierto en todo el documento:** aportar certificación real, si existe, que respalde una futura reincorporación del stat "Cumplimiento NSR-10" cuantificado (hoy se usa solo la versión cualitativa, ver §0). No bloquea ninguna otra decisión.
