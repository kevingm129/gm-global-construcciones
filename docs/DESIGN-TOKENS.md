# Sistema de diseño — GM Global Construcciones S.A.S.
**Fecha:** 2026-08-23
**Fase:** 2 — Copy + sistema de diseño (parte 2 de 2, ver `docs/COPY.md` para el texto)
**Formato:** especificación de tokens en CSS custom properties. El proyecto sigue siendo HTML/CSS estático (confirmado en `docs/AUDITORIA-TECNICA.md` — no hay Next.js ni Tailwind todavía), así que esta es la fuente de verdad del sistema; cuando se migre a Next.js estos mismos valores se trasladan a `tailwind.config`.

### Punto de partida (no se inventa paleta nueva desde cero)
Los 11 valores de color y las 2 tipografías ya existen en `css/style.css:8-22` y se **conservan exactamente**. Este documento los toma como semilla y construye la escala completa (tonos claros/oscuros derivados, tokens semánticos, espaciado, tipografía, componentes) que hoy no existe en el CSS actual.

Estética objetivo: premium, sobria, moderna, técnica. Evitar fotografía de stock evidente — priorizar las fotos reales catalogadas en la Fase 0 (`assets/images/servicios/`, `proyectos-R/`, `clientes/`, `galeria/`). Evitar animaciones excesivas — el sitio actual ya usa una sola transición de scroll-reveal (`[data-animate]`, 0.6s), ese nivel de sobriedad se mantiene como techo, no como piso a superar.

---

## 1. Color

### 1.1 Tokens existentes (conservados tal cual, `css/style.css:10-21`)
```css
--teal:        #1ABCAD;   /* turquesa oscuro */
--teal-light:  #29D9CB;   /* turquesa claro  */
--green:       #3EC99A;   /* verde menta     */
--green-light: #6EDBB8;   /* verde claro     */
--dark:        #1A2A2A;   /* oscuro base     */
--dark-mid:    #1E3535;   /* oscuro medio    */
--white:       #FFFFFF;
--sand:        #F4FAF8;   /* fondo claro con tinte verde */
--text:        #1A2020;
--text-muted:  #4A6060;
--border:      #D0EAE5;
```

### 1.2 Escala extendida (propuesta nueva — pendiente de validación visual antes de usarse en producción)
Derivada de los dos colores semilla (`--teal`, `--green`) para dar rango tonal a componentes que hoy no existen (badges, tabs, hover states, disabled states). Son decisiones de diseño, no datos factuales de la empresa.

```css
/* Teal — escala */
--teal-50:  #EAFBFA;
--teal-100: #CFF5F2;
--teal-300: #6FE0D6;
--teal-500: #1ABCAD;  /* = --teal existente */
--teal-600: #159A8E;
--teal-700: #107870;

/* Green — escala */
--green-50:  #F0FBF6;
--green-100: #D7F5E6;
--green-300: #8FE3C0;
--green-500: #3EC99A;  /* = --green existente */
--green-600: #2FA37B;
--green-700: #227D5E;

/* Neutros — escala (ancla en --dark / --sand / --text existentes) */
--neutral-0:   #FFFFFF;  /* = --white */
--neutral-50:  #F4FAF8;  /* = --sand */
--neutral-100: #E4EFEC;
--neutral-300: #B8CCC7;
--neutral-500: #4A6060;  /* = --text-muted */
--neutral-700: #1E3535;  /* = --dark-mid */
--neutral-900: #1A2A2A;  /* = --dark */
```

### 1.3 Tokens semánticos (nuevos)
```css
--surface-base:      var(--white);
--surface-alt:       var(--sand);
--surface-dark:      var(--dark);
--surface-dark-mid:  var(--dark-mid);

--brand-primary:     var(--teal-500);
--brand-primary-hover: var(--teal-600);
--brand-secondary:   var(--green-500);
--brand-secondary-hover: var(--green-600);

--text-heading:      var(--text);
--text-body:         var(--text);
--text-muted:        var(--neutral-500);
--text-on-dark:      var(--white);
--text-on-dark-muted: var(--neutral-300);

--border-default:    var(--border);
--border-strong:     var(--neutral-300);
```

### 1.4 Clasificación de hallazgos (línea de Inspección — ver `docs/COPY.md` §4)
Colores nuevos, elegidos por convención semántica estándar (rojo/naranja/amarillo/verde) y ajustados para armonizar con la paleta turquesa/verde existente sin generar ambigüedad con `--brand-secondary` (verde de marca) — por eso el verde de "Conforme" es una variante más saturada, distinguible del verde menta corporativo en contexto de badge.
```css
--status-critico-bg:     #FDEDEC;
--status-critico-fg:     #C0392B;
--status-critico-border: #F5B7B1;

--status-alta-bg:        #FDF2E3;
--status-alta-fg:        #C6720A;
--status-alta-border:    #F8D7A3;

--status-pendiente-bg:   #FCF6DA;
--status-pendiente-fg:   #9A7D0A;
--status-pendiente-border: #F0E1A0;

--status-conforme-bg:    #E4F7ED;
--status-conforme-fg:    #1E8A54;
--status-conforme-border: #A9E6C4;
```

---

## 2. Tipografía

Conservadas: `Playfair Display` (títulos, itálica para énfasis puntual) + `Barlow` (cuerpo) — ya cargadas vía Google Fonts en `index.html:10`.

```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body:    'Barlow', -apple-system, sans-serif;
```

### Escala tipográfica (nueva — el CSS actual no define una escala, usa tamaños ad-hoc por selector)
| Token | rem | Uso |
|---|---|---|
| `--text-xs` | 0.75rem (12px) | microcopy, badges, etiquetas |
| `--text-sm` | 0.875rem (14px) | texto secundario, form notes |
| `--text-base` | 1rem (16px) | cuerpo estándar |
| `--text-lg` | 1.125rem (18px) | subtítulos de card, lead text corto |
| `--text-xl` | 1.375rem (22px) | subtítulos de sección |
| `--text-2xl` | 1.75rem (28px) | H3 |
| `--text-3xl` | 2.25rem (36px) | H2 |
| `--text-4xl` | 3rem (48px) | H1 interior (heroes de página secundaria) |
| `--text-5xl` | 3.75rem (60px) | H1 de Home hero |

Line-height: `1.15` en headings (`--font-heading`), `1.6` en cuerpo (`--font-body`). Letter-spacing: `-0.01em` en headings grandes (≥`--text-3xl`) para compensar el tracking abierto de Playfair Display a tamaños grandes.

---

## 3. Espaciado

Escala de 4px, consistente con los valores ya usados en el CSS actual (`padding: 0 2.5rem`, `height: 64px` en navbar, etc.):
```css
--space-1: 0.25rem;   /* 4px  */
--space-2: 0.5rem;    /* 8px  */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.5rem;    /* 24px */
--space-6: 2rem;      /* 32px */
--space-7: 2.5rem;    /* 40px  — = padding actual de #navbar */
--space-8: 3rem;      /* 48px */
--space-10: 4rem;     /* 64px — = altura actual de #navbar */
--space-12: 6rem;     /* 96px — separación entre secciones grandes */
```

## 4. Radios, sombras, transición
```css
--radius-sm: 2px;   /* = radio ya usado en .btn-submit del CSS actual */
--radius-md: 6px;
--radius-lg: 12px;
--radius-pill: 999px;

--shadow-sm: 0 2px 8px rgba(26,42,42,0.08);
--shadow-md: 0 4px 20px rgba(26,42,42,0.12);   /* ~ mismo valor que la sombra de scroll de #navbar existente */
--shadow-lg: 0 12px 32px rgba(26,42,42,0.16);

--transition: 0.25s ease;  /* = token ya existente, conservado */
```

## 5. Breakpoints
No hay breakpoints con nombre en el CSS actual (revisar media queries existentes al migrar). Se propone:
```css
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

---

## 6. Componentes reutilizables

Cada componente parte de una clase ya existente en el sitio actual cuando aplica, y se extiende para lo que falta.

### Botón
- **Primario** (`.btn-primary`, ya existe): fondo `--brand-primary`, texto `--white`, hover `--brand-primary-hover`, radius `--radius-sm`, padding `--space-3 --space-6`.
- **Outline** (`.btn-outline`, ya existe): borde `--brand-primary`, texto `--brand-primary`, fondo transparente, hover fondo `--brand-primary` texto `--white`.
- **Submit** (`.btn-submit`, ya existe): igual que primario, ancho completo en formularios, estado disabled con opacidad 0.6 (ya usado en `js/main.js` al enviar).
- **Nuevo — Ghost**: sin borde, texto `--brand-primary`, para acciones terciarias tipo "Conocer este servicio" dentro de una card.

### Card
- **Servicio** (`.service-card`, ya existe): hoy usa ícono SVG inline + `.service-corner` decorativo. Se especifica variante con imagen real (`aspect-ratio: 4/3`, `object-fit: cover`) para reemplazar el ícono con las fotos de `assets/images/servicios/`.
- **Proyecto** (`.project-card`, ya existe): imagen + `.project-label` + tags — se conserva, se añade slot opcional para badge de estado de hallazgo si en el futuro se usa en fichas de inspección.
- **Testimonio** (`.testimonio-card`, ya existe): se conserva tal cual.
- **Nuevo — Hallazgo** (para el informe de inspección, `/inspeccion-inmuebles`): título del ítem + badge de clasificación (§1.4) + descripción corta + miniatura de evidencia fotográfica.

### Input / Select / Textarea
Ya existen (`.form-group input/select/textarea`, formulario de contacto). Se conserva el estilo visual; se añaden estados nuevos que hoy no están definidos explícitamente en el CSS:
- `:focus` → borde `--brand-primary`, sin cambio de fondo.
- `:invalid` (una vez el formulario tenga validación real, ver hallazgo técnico en `docs/AUDITORIA-TECNICA.md` §6) → borde `--status-critico-fg`.
- `:disabled` → fondo `--neutral-100`, texto `--text-muted`.

### Badge
Nuevo componente (no existe hoy salvo `.project-tag`, que se reutiliza como base visual). Dos variantes:
- **Tag neutro** (ya existe como `.project-tag` / `.tag-green`): para categorías de proyecto.
- **Status** (nuevo, para clasificación de hallazgos §1.4): fondo `--status-*-bg`, texto `--status-*-fg`, borde 1px `--status-*-border`, radius `--radius-pill`, incluye el emoji de color (🔴🟠🟡🟢) + etiqueta de texto siempre juntos — nunca solo el color, por accesibilidad y porque el copy exige declarar explícitamente que es clasificación interna, no un semáforo genérico.

### Tabs
Nuevo (no existe hoy). Uso previsto: alternar entre `/inspeccion-inmuebles/compradores` y `/constructoras` desde la landing general, o entre categorías dentro de `/servicios`. Estilo: subrayado inferior `--brand-primary` en tab activo sobre fondo `--surface-base`, sin fondo de "pastilla" — mantiene la estética sobria.

### Accordion
Nuevo. Uso previsto: preguntas frecuentes o el detalle expandible de cada uno de los 7 pasos de metodología en `/inspeccion-inmuebles`. Header con ícono +/− (no chevron genérico, para diferenciarse visualmente de los `<select>` del formulario), contenido con transición de altura `--transition`.

### Modal
Nuevo. Uso previsto principal: lightbox de galería de fotos reales de proyecto (banco de `assets/images/galeria/`, hoy sin usar — ver Fase 1 §4). Fondo `--dark` a 80% opacidad, contenido centrado con `--shadow-lg`, cierre por click fuera o `Esc`.

### Breadcrumb
Nuevo — necesario por las rutas anidadas del sitemap (`/servicios/mamposteria`, `/inspeccion-inmuebles/compradores`, `/proyectos/[slug]`). Texto `--text-sm`, separador `/` en `--text-muted`, último ítem (página actual) en `--text-heading` sin link.

### Hero
Dos variantes:
- **Home** (`.hero`, ya existe): full-bleed, `--text-5xl` en H1, incluye `.hero-stats`.
- **Nuevo — Interior**: banner más corto (sin `.hero-stats`), `--text-4xl`, para `/empresa`, `/servicios`, `/inspeccion-inmuebles` y sus sub-rutas, `/proyectos`, `/constructoras`. Mantiene el mismo `--hero-bg-pattern` decorativo del hero actual para consistencia de marca, a menor escala.

### Footer
Ya existe (`footer-inner`, `footer-left`, `footer-links`, `footer-city`). Se conserva la estructura; se añade slot opcional para el disclaimer de inspección cuando el footer se renderiza dentro de `/inspeccion-inmuebles/*`.

---

## 7. Fotografía — lineamiento de uso

- Prioridad siempre a fotos reales ya catalogadas (Fase 0): `servicios/` para tarjetas de servicio, `proyectos-R/` para proyectos, `clientes/` para `/constructoras` (una vez confirmada la identidad de cada una), `galeria/` como banco para el modal de galería por proyecto.
- No usar fotografía de stock genérica (manos con casco de plástico, planos sobre mesa sin contexto real) — si falta una foto real para un espacio del layout, se dejará el espacio marcado `[AGREGAR FOTO REAL]` en el momento de maquetación, en vez de rellenar con stock.
- Tratamiento consistente: todas las fotos de card usan el mismo `aspect-ratio` y `object-fit: cover` dentro de su tipo de componente, para que el grid se vea uniforme aun con fotos de proporciones originales distintas.

---

## 8. Estado de pendientes (actualizado 2026-08-23)

| # | Pendiente | Estado |
|---|---|---|
| 1 | Validar escala de color extendida (§1.2) y colores de estado de hallazgos (§1.4) | ✅ Resuelto — son tokens propios (no assets de marca del cliente ni datos factuales), se adoptan como sistema de trabajo. Validación visual fina queda para QA en implementación (Fase 3+), no bloquea el diseño del sistema. |
| 2 | Componentes dependientes de banco de fotos/copy sin resolver | ✅ Resuelto — Modal de galería confirmado (Fase 1 §6 ítem 4 ya resuelto: se usa `galeria/` en `/proyectos/[slug]`); Card de Hallazgo y Badge de status confirmados (copy de clasificación adoptado en `docs/COPY.md` §4) |
| 3 | Aprobación para avanzar a Fase 3 | Pendiente de indicación explícita del usuario |

La relación comercial con las 4 constructoras identificadas fue confirmada por el cliente (2026-08-23, ver `docs/ARQUITECTURA-INFORMACION.md` §6) — el componente Card de `/constructoras` se maqueta con los 4 logos reales sin restricción.
