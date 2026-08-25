# Auditoría técnica — GM Global Construcciones S.A.S.
**Fecha:** 2026-08-23
**Alcance:** Fase 0 — auditoría sobre el proyecto ya presente en disco (sin clonar). No se propone ni genera código en este documento.

---

## 0. Estado del control de versiones

**No es un repositorio git.** No existe carpeta `.git/` en el directorio raíz. Por lo tanto:
- No se creó ninguna rama (`feature/rediseno-web-v3` u otra).
- No se ejecutó `git init` ni ningún comando git de escritura.

Queda pendiente de instrucción explícita si se desea inicializar el repo localmente y conectarlo al remoto `https://github.com/kevingm129/gm-global-construcciones.git`, o si el usuario prefiere hacerlo manualmente.

---

## 1. Confirmación de carpeta de trabajo

Directorio actual: `c:\Users\info\OneDrive\Documentos\gm-global-construcciones`

Archivos/carpetas requeridos, todos presentes:

| Elemento | Estado |
|---|---|
| `index.html` | ✅ presente |
| `css/style.css` | ✅ presente |
| `js/main.js` | ✅ presente |
| `assets/images/` | ✅ presente |
| `CNAME` | ✅ presente |
| `README.md` | ✅ presente (contenido corrupto, ver §5) |

---

## 2. Stack confirmado

Sitio **estático HTML/CSS/JS puro**. No hay `package.json`, `node_modules/`, build system, bundler ni framework (no React/Next.js todavía).

| Archivo | Líneas |
|---|---|
| `index.html` | 526 (ver defectos estructurales en §3.1) |
| `css/style.css` | 376 |
| `js/main.js` | 118 |
| `README.md` | 3 líneas de contenido, con problema de encoding |

Recursos externos cargados en `<head>`:
- Google Fonts: `Playfair Display` (400/700, itálica 400) y `Barlow` (300/400/500/600) vía `fonts.googleapis.com`.
- **Hallazgo:** `<link rel="stylesheet" href="http://cdn.jsdelivr.net/npm/@heroicons/react@2.0.18/outline/24.css">` — cargado por **HTTP sin cifrar** (mixed content en un sitio servido por HTTPS vía GitHub Pages) y es una hoja de estilos pensada para un paquete de React (`@heroicons/react`), no para HTML plano. No hay evidencia en el HTML de que sus clases se usen; todos los íconos del sitio están implementados como SVG inline. Es candidato a eliminarse — no confirmo si es intencional, solo lo señalo como hallazgo, no lo modifiqué.

Despliegue: pensado para **GitHub Pages con dominio personalizado**. `CNAME` contiene exactamente:
```
www.gmglobalconstrucciones.co
```
(sin salto de línea final).

Hay un bloque JSON-LD (`schema.org`/`ConstruccionCompany`) al final de `index.html` con datos de contacto y dirección — ver defecto en §3.1.

---

## 3. Estructura de carpetas

```
gm-global-construcciones/
├── CNAME
├── README.md
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── (19 archivos sueltos en la raíz de images/)
        ├── clientes/       (4 archivos)
        ├── galeria/        (84 archivos)
        ├── proyectos-R/    (8 archivos)
        └── servicios/      (11 archivos)
```

No hay carpetas `docs/` (creada ahora para este entregable), `dist/`, `build/`, ni configuración de CI/CD (no hay `.github/workflows/`).

### 3.1 Defectos estructurales encontrados en `index.html` (hallazgos, no corregidos en esta fase)

1. **HTML mal cerrado en la sección `#proyectos`** (líneas ~330-348): la quinta project-card ("Almacen y restaurante el tesillo") abre `.project-card` → `.project-body` → tags, pero después de `</div>` de `.project-tags` solo hay **un** `</div>` de cierre antes de saltar directamente a `<!-- TESTIMONIOS -->`. Faltan los cierres de `.project-body`, `.project-card`, `.projects-grid` y `.section`. El navegador lo tolera por auto-corrección de parser, pero es HTML inválido y puede romper el layout de las secciones siguientes dependiendo del CSS.
2. **JSON-LD inválido** (líneas 497-523):
   - La etiqueta de apertura del script tiene texto pegado por error: `<script type="application/ld+json"> == $0` — el `== $0` es un artefacto típico de copiar/pegar desde las DevTools del navegador (Chrome muestra `== $0` junto al elemento seleccionado en el inspector). Esto invalida el JSON.
   - Dentro del objeto JSON falta una coma entre `"email": "info@gmglobalconstrucciones.co"` y `"url": "https://www.gmglobalconstrucciones.co"` (línea 515-516) — JSON sintácticamente inválido, por lo que buscadores no podrán parsear estos datos estructurados.
3. **No hay etiquetas Open Graph** (`og:title`, `og:image`, etc.) en `<head>`, a pesar de que existe `assets/images/og-image.jpg` en el banco de imágenes — el archivo está disponible pero no referenciado.

Estos tres puntos son hallazgos de auditoría; no se tocó el código.

---

## 4. Inventario completo de imágenes reales (`assets/images/`)

**Total: 126 archivos** (más de lo estimado en la auditoría previa, que hablaba de 83+11+7+4=105 sin contar la raíz de `images/`).

### 4.1 Raíz de `assets/images/` (19 archivos — no catalogados en la auditoría previa)
```
assets/images/Adobe Express - file.png     ← nombre con espacios, revisar antes de referenciar en código
assets/images/cover (1).png                ← nombre con espacios y paréntesis
assets/images/estuco.jpg
assets/images/favicon.ico
assets/images/hero-bg.webp
assets/images/icon.png
assets/images/logo3.png                    ← usado en nav y footer
assets/images/nosotros.webp
assets/images/og-image.jpg                 ← existe pero no referenciado en <head>
assets/images/P10.jpg
assets/images/P11.jpg
assets/images/P13.jpg
assets/images/P14.jpg
assets/images/P16.jpg
assets/images/P3.jpg
assets/images/P7.jpeg
assets/images/proyecto14.jpg
assets/images/proyecto6.jpg
assets/images/s.jpg
```
Ninguno de estos 19 archivos está referenciado directamente en `index.html` salvo `logo3.png` y `favicon.ico`. Los demás (`hero-bg.webp`, `nosotros.webp`, series `P*.jpg`, `proyecto6.jpg`, `proyecto14.jpg`, etc.) son banco de imágenes disponible sin usar todavía — nombres sugieren que podrían ser fondo de hero, sección "nosotros" y proyectos adicionales, pero esto es una inferencia por nombre de archivo, no un hecho confirmado en el código.

### 4.2 `assets/images/clientes/` (4 archivos — coincide con auditoría previa)
```
assets/images/clientes/cliente1.webp
assets/images/clientes/cliente2.webp
assets/images/clientes/cliente3.webp
assets/images/clientes/cliente4.webp
```
**No están referenciados en `index.html`.** La sección `#testimonios` actual usa iniciales de texto (`KC`, `LT`, `MB`) en vez de logos/fotos de cliente.

### 4.3 `assets/images/servicios/` (11 archivos — coincide con auditoría previa)
```
assets/images/servicios/alistado.webp
assets/images/servicios/aseo.webp
assets/images/servicios/cliviana.webp
assets/images/servicios/enchape.webp
assets/images/servicios/estructura.webp
assets/images/servicios/g-proyectos.webp
assets/images/servicios/obragr.webp
assets/images/servicios/personal.webp
assets/images/servicios/pintura.webp
assets/images/servicios/plomeria.webp
assets/images/servicios/remodelaciones.webp
```
**No están referenciados en `index.html`.** Los 11 `.service-card` actuales usan íconos SVG inline en vez de estas fotos — hay una foto disponible por cada una de las 11 especialidades listadas en el HTML (correspondencia 1 a 1 por nombre).

### 4.4 `assets/images/proyectos-R/` (**8 archivos**, no 7 como decía la auditoría previa)
```
assets/images/proyectos-R/construccion%20liviana.webp   ← nombre de archivo literal contiene "%20" (no es un espacio codificado, es texto literal en el nombre)
assets/images/proyectos-R/proyecto1.webp   ← usado (Ksyar Constructores)
assets/images/proyectos-R/proyecto2.webp   ← usado (Iglesia Misión Boston)
assets/images/proyectos-R/proyecto3.webp   ← usado (Lazuli Towers)
assets/images/proyectos-R/proyecto4.webp   ← usado (Doral Suites)
assets/images/proyectos-R/proyecto5.webp   ← NO usado en index.html
assets/images/proyectos-R/proyecto6.webp   ← NO usado en index.html
assets/images/proyectos-R/proyecto7.webp   ← usado (Almacén y restaurante El Tesillo)
```
5 de 8 están en uso en la sección `#proyectos`; `proyecto5.webp`, `proyecto6.webp` y `construccion%20liviana.webp` son banco disponible sin usar.

### 4.5 `assets/images/galeria/` (**84 archivos**, no 83 como decía la auditoría previa)
Nomenclatura: `galeria.webp`, `galeria1.webp` … `galeria58.webp` (58 archivos `.webp`), `galeria9.jpg` (1 archivo suelto en `.jpg` dentro del rango numerado bajo), y `galeria59.jpg` … `galeria83.jpg` (25 archivos `.jpg`).
```
assets/images/galeria/galeria.webp
assets/images/galeria/galeria1.webp ... galeria58.webp   (formato .webp, con galeria9.jpg como excepción en .jpg dentro de este rango)
assets/images/galeria/galeria59.jpg ... galeria83.jpg    (formato .jpg)
```
Listado completo (84 rutas) verificado con `find` sobre disco; disponible para revisión íntegra si se requiere en un anexo aparte. **Ninguna imagen de esta carpeta está referenciada en `index.html`.** No existe sección de galería en la página actual — es banco de imágenes sin consumir.

### 4.6 Resumen de uso real vs. banco disponible

| Carpeta | Archivos | Referenciados en `index.html` | Sin usar |
|---|---|---|---|
| `images/` (raíz) | 19 | 2 (`logo3.png`, `favicon.ico`) | 17 |
| `clientes/` | 4 | 0 | 4 |
| `servicios/` | 11 | 0 (se usan SVG inline) | 11 |
| `proyectos-R/` | 8 | 5 | 3 |
| `galeria/` | 84 | 0 | 84 |
| **Total** | **126** | **7** | **119** |

**El sitio publicado usa activamente solo 7 de las 126 imágenes disponibles.** Hay banco fotográfico real y sustancial para nutrir secciones de servicios, testimonios/clientes, proyectos adicionales y una galería completa que hoy no existe en la página.

---

## 5. `README.md` — hallazgo de encoding

El archivo tiene problema de codificación: al leerlo aparece con caracteres nulos/espaciado extraño entre cada letra (`# g m - g l o b a l - c o n s t r u c c i o n e s`), repetido 3 veces, precedido de bytes de reemplazo (`�`). Esto es consistente con un archivo guardado en UTF-16 (probablemente con BOM) y luego interpretado/leído como si fuera UTF-8, o corrupción del archivo. No aporta documentación real del proyecto — solo contiene el nombre del repo repetido. No se corrigió en esta fase (Fase 0 es solo auditoría).

---

## 6. Lógica del formulario de contacto actual

**Confirmado: no funciona de verdad — es una simulación pura de frontend.**

- **Un solo formulario** en todo el sitio: `#contactForm` dentro de `<section class="contact" id="contacto">` (`index.html` líneas 433-471).
- Campos: `nombre` (texto, requerido), `email` (email, requerido), `telefono` (tel, opcional), `servicio` (select con 9 opciones + placeholder, opcional), `mensaje` (textarea, requerido). El atributo `novalidate` está puesto en el `<form>`, así que la validación HTML5 nativa está desactivada a propósito y todo depende del JS.
- **Manejo en `js/main.js` (líneas 55-95):**
  1. `e.preventDefault()` — nunca se hace un submit real ni un `fetch`/`XHR` a ningún servidor.
  2. Valida en cliente: campos requeridos no vacíos (`nombre`, `email`, `mensaje` — nota: `telefono` y `servicio` no se validan igual que se documentó, son opcionales) y formato de email con una regex simple.
  3. Bloque comentado explícitamente rotulado `/* === Aquí va su integración real === */` con dos ejemplos **inactivos**:
     - Opción A: Formspree (`fetch('https://formspree.io/f/XXXXXXXX', ...)`) — placeholder `XXXXXXXX`, no es un endpoint real.
     - Opción B: endpoint propio (`fetch('/api/contacto', ...)`) — no existe tal endpoint en un sitio estático sin backend.
  4. Cambia el botón a "Enviando..." y lo deshabilita.
  5. **`setTimeout(..., 1500)`** simplemente muestra un mensaje de éxito (`showAlert('¡Mensaje enviado! ...', 'success')`), resetea el formulario y reactiva el botón — **sin que el mensaje haya salido del navegador en ningún momento.**

**Conclusión:** cualquier dato que un visitante escriba en el formulario se pierde. El usuario ve un mensaje de "enviado" que es falso. No hay backend, no hay servicio de terceros conectado, no hay ningún registro del envío.

---

## 7. Migración a Next.js — implicaciones para `CNAME` / DNS

Esto es un análisis de lo que implicaría la migración, **no una ejecución** — ningún cambio de DNS ni de hosting se ha hecho.

### 7.1 Qué es el `CNAME` de GitHub Pages y qué NO hay que romper
El archivo `CNAME` en la raíz del repo (`www.gmglobalconstrucciones.co`) le dice a GitHub Pages qué dominio personalizado debe servir. GitHub Pages, a su vez, depende de que exista un registro DNS externo (gestionado por quien administre el dominio `gmglobalconstrucciones.co`, no visible desde este repo) apuntando ese subdominio `www` a la infraestructura de GitHub Pages (típicamente un `CNAME` DNS hacia `<usuario>.github.io`, o registros `A`/`ALIAS` si es el apex).

**No tengo visibilidad del proveedor DNS ni de los registros actuales** — eso vive fuera de este repositorio y no puedo confirmarlo ni asumirlo.

### 7.2 Riesgos concretos si se migra a Next.js manteniendo GitHub Pages
- Si Next.js se despliega con `next export` / modo estático hacia GitHub Pages: el archivo `CNAME` debe **seguir existiendo en la carpeta de salida publicada** (`out/` o la que corresponda), porque GitHub Pages lo relee en cada deploy desde la rama/carpeta servida (normalmente `gh-pages` o `/docs` en `main`, según cómo esté configurado Pages en este repo — no confirmado, porque no hay `.git/` ni workflow visible en este entorno). Si el `CNAME` no se incluye en el build de Next.js, GitHub Pages puede des-configurar el dominio personalizado y el sitio caería a la URL default de `github.io`.
- Si Next.js requiere SSR/API routes reales (por ejemplo, para el formulario de contacto §6), **GitHub Pages no sirve** — es hosting 100% estático sin backend. Eso implicaría mover el hosting a otra plataforma (Vercel, Netlify, etc.), lo cual sí exige cambios DNS reales: mover el registro `www` (y posiblemente el apex) del proveedor DNS actual hacia el nuevo proveedor de hosting.
- Cualquier cambio de DNS tiene **tiempo de propagación** (minutos a 48h según TTL) — durante ese lapso el dominio puede quedar inaccesible o servir contenido inconsistente si no se coordina bien la ventana de corte.

### 7.3 Recomendación general (sin ejecutar nada todavía)
- Mantener el sitio actual funcionando en GitHub Pages sin tocar DNS mientras se construye la versión Next.js en paralelo (otra rama o repo).
- Decidir explícitamente con el usuario, antes de tocar DNS: ¿se queda en GitHub Pages (limitado a estático) o se migra el hosting? Esa decisión determina si el formulario de contacto puede tener backend real o debe seguir dependiendo de un servicio de terceros tipo Formspree.
- El corte de DNS, si aplica, debe planearse como un paso explícito y aprobado — no autónomo — dado que puede tumbar el sitio en producción (`www.gmglobalconstrucciones.co` está en vivo).

---

## 8. Discrepancias frente a la auditoría previa (resumen)

| Dato de la auditoría previa | Confirmado en disco ahora |
|---|---|
| 83 imágenes en `/galeria` | **84** |
| 11 imágenes en `/servicios` | 11 ✅ coincide |
| 7 imágenes en `/proyectos-R` | **8** |
| 4 imágenes en `/clientes` | 4 ✅ coincide |
| (no mencionado) | **19 imágenes sueltas** en la raíz de `assets/images/`, sin catalogar antes |
| `index.html` 526 líneas | 526 ✅ coincide, pero con HTML mal cerrado en `#proyectos` (§3.1) y JSON-LD inválido |
| `css/style.css` 376 líneas | 376 ✅ coincide |
| `js/main.js` 118 líneas | 118 ✅ coincide |
| Formulario simulado con `setTimeout`, Formspree/endpoint comentados | ✅ confirmado exactamente |
| Repo git existente | **No existe `.git/` — no es un repositorio git todavía** |

---

## 9. Pendiente de aprobación antes de Fase 1

- Confirmar si se debe `git init` este directorio (y con qué remoto) antes de crear la rama `feature/rediseno-web-v3`.
- Decisión sobre hosting final (GitHub Pages estático vs. otro proveedor) que condiciona la arquitectura de Next.js y la solución real del formulario de contacto.
- Aprobación explícita para avanzar a Fase 1.
