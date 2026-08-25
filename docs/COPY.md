# Copy — GM Global Construcciones S.A.S.
**Fecha:** 2026-08-23
**Fase:** 2 — Copy + sistema de diseño (parte 1 de 2, ver `docs/DESIGN-TOKENS.md` para la parte visual)
**Base:** `docs/ARQUITECTURA-INFORMACION.md` (Fase 1, aprobado)

### Regla aplicada
Ningún dato factual nuevo (cifras, años, certificaciones, clientes) se inventa en este copy. Donde una alternativa necesitaría un número que no está confirmado (p. ej. cantidad de proyectos entregados, pendiente de decisión según §6.2 de la Fase 1), se deja el marcador `[NÚMERO A CONFIRMAR]` en vez de rellenarlo. El copy es creativo en la forma, nunca en el contenido.

### Microcopy global (aplicado en todo el sitio)
| Genérico | Usar |
|---|---|
| "Enviar" | **Solicitar cotización** |
| "Contacto" | **Hablar con GM Global** |
| "Más información" | **Conocer este servicio** |

---

## 1. Hero de Home — 3 alternativas

### Alternativa A — Precisión técnica
**Propuesta de valor:** Construcción con precisión técnica, en Cartagena
**Subtítulo:** Estructura, obra gris, acabados y remodelación bajo un mismo equipo. Coordinamos cada disciplina constructiva para que su proyecto avance sin sorpresas.
**CTA principal:** Solicitar cotización
**CTA secundario:** Ver proyectos realizados

### Alternativa B — Transformación de espacios (tagline real)
**Propuesta de valor:** *Creamos futuro* — construimos y remodelamos en Cartagena de Indias
**Subtítulo:** De la estructura al acabado final: convertimos ideas en espacios funcionales y bien construidos, con acompañamiento en cada etapa del proyecto.
**CTA principal:** Solicitar cotización
**CTA secundario:** Hablar con GM Global

### Alternativa C — Acompañamiento integral
**Propuesta de valor:** Un solo equipo para todo su proyecto de construcción
**Subtítulo:** Desde la obra gris hasta el acabado final, coordinamos las 11 especialidades que su proyecto necesita — sin que usted tenga que gestionar contratistas por separado.
**CTA principal:** Solicitar cotización
**CTA secundario:** Ver proyectos realizados

> **RESUELTO (2026-08-23):** los stats del hero quedaron ajustados en `docs/ARQUITECTURA-INFORMACION.md` §0 — "6+ proyectos" pasa a **5** (cifra real confirmada en el repo) y "100% Cumplimiento NSR-10" pierde el porcentaje no verificable, quedando solo la orientación cualitativa ya usada en el sitio actual. Cualquiera de las 3 alternativas puede incorporar `11 especialidades · 5 proyectos entregados · Cartagena de Indias` como fila de stats, replicando el patrón visual del hero actual con los números correctos.

> **Alternativa adoptada como base de trabajo: B** (usa la tagline real "Creamos futuro", ya presente en el sitio, y no requiere ningún stat numérico en el titular). Queda abierta a cambio si el cliente prefiere A o C al ver el sitio maquetado.

---

## 2. Hero de la landing de Inspección de Inmuebles — 3 alternativas

Audiencia dual (compradores + constructoras) en esta página general, antes de bifurcar a `/inspeccion-inmuebles/compradores` y `/inspeccion-inmuebles/constructoras`. Tono: prevención, tranquilidad, documentación, acompañamiento — nunca alarmista ni insinuando que la constructora entregará defectos.

### Alternativa A — Tranquilidad para quien compra
**Propuesta de valor:** Revise antes de recibir, con criterio técnico
**Subtítulo:** Le acompañamos en la inspección visual y técnica de su inmueble antes de la entrega, con un informe claro y evidencia documentada — para que reciba con información, no con dudas.
**CTA principal:** Agendar inspección
**CTA secundario:** Hablar con GM Global

### Alternativa B — Aliado para constructoras
**Propuesta de valor:** Un aliado técnico para su proceso de entrega
**Subtítulo:** Apoyamos a constructoras en la revisión previa a entrega, elaboración de punch lists y reinspección — para que la entrega a su cliente sea ordenada, documentada y sin contratiempos de última hora.
**CTA principal:** Agendar inspección
**CTA secundario:** Hablar con GM Global

### Alternativa C — Proceso y documentación
**Propuesta de valor:** Inspección con proceso claro, de principio a fin
**Subtítulo:** Agenda, inspección en sitio, identificación de hallazgos, evidencia fotográfica, informe y reinspección si aplica. Un proceso ordenado para compradores y constructoras que buscan claridad antes de firmar el recibido.
**CTA principal:** Agendar inspección
**CTA secundario:** Conocer este servicio

**Disclaimer obligatorio** (debe acompañar visualmente el hero de esta página y sus dos sub-rutas, no solo mencionarse una vez en el pie): *"Este es un servicio de inspección visual y técnica según el alcance contratado. No constituye peritaje, certificación ni dictamen estructural."*

> **Alternativa adoptada como base de trabajo: C** (es la única de las 3 que funciona igual de bien para las dos audiencias — compradores y constructoras — antes de que el usuario elija su sub-ruta; A y C quedan disponibles como copy ya redactado para usarse tal cual en `/compradores` y `/constructoras` respectivamente, donde sí hay audiencia única). Queda abierta a cambio si el cliente prefiere otro ángulo.
>
> **CTA "Agendar inspección" — RESUELTO (2026-08-23):** enlaza a `/cotizacion` con el campo "Tipo de servicio" preseleccionado en "Inspección de inmuebles". No se crea una ruta nueva fuera del sitemap aprobado en Fase 1 — se reutiliza el mismo formulario ya definido para `/cotizacion`.

---

## 3. Metodología de inspección — 7 pasos (contenido conceptual)

Se presenta como el proceso de trabajo del servicio, no como historial de proyectos ejecutados por la empresa — es contenido nuevo para una línea de negocio nueva, sin datos reales de casos previos que citar.

**1. Agenda**
Coordinamos fecha, dirección y alcance de la visita según lo que necesite: inmueble nuevo antes de entrega, reinspección o punch list para constructora.

**2. Inspección**
Recorrido técnico y visual del inmueble siguiendo el alcance acordado, revisando los aspectos constructivos y de acabados definidos previamente con usted.

**3. Identificación**
Registramos cada hallazgo encontrado durante el recorrido y lo clasificamos según su nivel de atención requerida (ver sistema de clasificación abajo).

**4. Evidencia**
Cada hallazgo se documenta con fotografía y ubicación precisa dentro del inmueble, para que el informe final sea trazable y verificable.

**5. Informe**
Entregamos un informe organizado con los hallazgos clasificados, su evidencia y ubicación — un documento de referencia claro para conversar con la constructora o gestionar los ajustes necesarios.

**6. Reinspección**
Si se acordó, verificamos en una segunda visita que los hallazgos priorizados hayan sido atendidos, dejando constancia del estado final de cada uno.

**7. Cierre**
Entrega del informe final consolidado, con el estado de cada hallazgo — el respaldo documentado con el que usted recibe o entrega el inmueble con información, no con incertidumbre.

---

## 4. Sistema de clasificación de hallazgos

**Declaración obligatoria en cualquier lugar donde se muestre esta clasificación:** *"Esta clasificación es una herramienta interna de organización del trabajo de inspección de GM Global Construcciones. No constituye una certificación legal, peritaje ni dictamen estructural."*

| Nivel | Etiqueta | Uso |
|---|---|---|
| 🔴 | **Crítico** | Hallazgo que requiere atención antes de continuar con la entrega o el siguiente paso del proceso, según el criterio técnico documentado en el informe. |
| 🟠 | **Prioridad alta** | Hallazgo relevante que debe atenderse en el corto plazo, sin bloquear necesariamente el avance del proceso. |
| 🟡 | **Pendiente** | Hallazgo identificado que queda registrado para seguimiento, sin urgencia inmediata según el alcance de la inspección. |
| 🟢 | **Conforme** | Aspecto revisado que no presenta observaciones dentro del alcance inspeccionado. |

Uso previsto en UI: badge de color junto a cada ítem del informe (ver especificación de componente "Badge" en `docs/DESIGN-TOKENS.md`), nunca como sello o sistema de puntuación agregado tipo "score" — eso corresponde al backlog ("score de inmueble"), explícitamente fuera de esta fase.

---

## 5. Estado de pendientes (actualizado 2026-08-23)

| # | Pendiente | Estado |
|---|---|---|
| 1 | Elegir alternativa de Hero de Home | ✅ Resuelto — Alternativa B adoptada como base de trabajo |
| 2 | Elegir alternativa de Hero de Inspección | ✅ Resuelto — Alternativa C adoptada para la landing general; A y C ya redactadas para reutilizar en `/compradores` y `/constructoras` |
| 3 | Ruta del CTA "Agendar inspección" | ✅ Resuelto — `/cotizacion` con tipo de servicio preseleccionado |
| 4 | Stats pendientes de Fase 1 | ✅ Resuelto — ver `docs/ARQUITECTURA-INFORMACION.md` §0 y §6 |

Todas las alternativas seleccionadas son decisiones de trabajo, no definitivas — el cliente puede pedir cambio de ángulo en cualquier momento sin que eso afecte ningún dato factual ya verificado.
