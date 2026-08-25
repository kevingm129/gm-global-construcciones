# Plan de migración de dominio — CNAME / DNS
**Fecha:** 2026-08-25
**Fase:** 3 — Desarrollo MVP (Next.js)
**Base:** `docs/AUDITORIA-TECNICA.md` §7 (Fase 0, análisis previo sin ejecutar cambios)

Este documento describe **qué hay que hacer**, en qué orden y con qué ventana de riesgo, para
mover `www.gmglobalconstrucciones.co` de GitHub Pages (sitio estático) a Vercel (Next.js) **sin
tumbar el sitio en producción**. No se ejecuta ningún cambio de DNS como parte de esta fase —
es un plan a aprobar antes de tocar producción.

---

## 0. Por qué no se puede hacer "in place"

El sitio actual vive en GitHub Pages, que es hosting 100% estático: no ejecuta código de
servidor. El `CNAME` en la raíz del repo le dice a GitHub Pages qué dominio personalizado
servir; el registro DNS real (que no es visible desde este repositorio) vive en el proveedor
DNS del dominio `gmglobalconstrucciones.co`.

Next.js con API routes (usadas aquí para los 3 formularios, ver `src/app/api/*/route.ts`)
**requiere un runtime de servidor**. GitHub Pages no lo ofrece. Por eso el destino elegido es
Vercel (stack explícitamente aprobado en el brief de Fase 3: "compatible con Vercel").

Esto significa que el corte no es un simple `git push` — implica mover el registro DNS del
dominio hacia una infraestructura distinta, lo cual sí tiene tiempo de propagación y sí puede
causar una ventana de inaccesibilidad si no se coordina bien.

---

## 1. Qué NO se toca todavía

- El archivo `CNAME` en la raíz de este repositorio (heredado del sitio estático) **se conserva
  sin modificar** mientras GitHub Pages siga sirviendo producción. Borrarlo antes de tiempo
  puede hacer que GitHub Pages descarte la configuración de dominio personalizado.
- No se ha tocado ningún registro DNS real. Este documento es un plan, no una ejecución.
- El sitio estático actual (`index.html`, `css/`, `js/`) puede seguir desplegado en GitHub
  Pages en paralelo mientras el nuevo sitio Next.js se valida — recomendado mantenerlo así
  hasta el paso 5.

---

## 2. Pasos, en orden

### Paso 1 — Desplegar el proyecto Next.js en Vercel bajo un dominio de prueba
Conectar este repositorio (rama `feature/rediseno-web-v3`, luego `main` tras el merge) a un
proyecto nuevo en Vercel. Vercel asigna automáticamente un dominio de prueba tipo
`gm-global-construcciones.vercel.app` — **sin tocar DNS todavía**. Este paso no afecta
producción en absoluto porque el dominio real sigue apuntando a GitHub Pages.

### Paso 2 — Validar en el dominio de prueba
Antes de mover cualquier DNS: probar los 3 formularios (con `RESEND_API_KEY` real configurada
en las variables de entorno de Vercel — ver `src/lib/email.ts`), navegación completa,
imágenes, y que el build de producción (`next build`) no tenga errores.

### Paso 3 — Configurar el dominio personalizado en Vercel
Agregar `www.gmglobalconstrucciones.co` como dominio del proyecto en Vercel. Vercel indicará
el registro DNS exacto a crear (normalmente un `CNAME` de `www` hacia `cname.vercel-dns.com`,
o registros `A`/`ALIAS` si en algún momento se quiere servir también el apex
`gmglobalconstrucciones.co`). Este paso solo **prepara** el destino — el dominio real sigue sin
apuntar ahí hasta el paso 4.

### Paso 4 — Ventana de corte (el único paso que afecta producción)
Este es el paso que requiere aprobación explícita y una ventana coordinada, porque **sí puede
causar una interrupción visible**:

1. Reducir el TTL del registro DNS actual de `www` a un valor bajo (p. ej. 300s) con
   suficiente antelación (idealmente 24-48h antes del corte), para acortar el tiempo de
   propagación cuando se haga el cambio real.
2. En el proveedor DNS del dominio (fuera de este repositorio — administrado por quien
   gestione `gmglobalconstrucciones.co`), reemplazar el registro `CNAME` de `www` que hoy
   apunta a la infraestructura de GitHub Pages por el que indique Vercel en el Paso 3.
3. Verificar propagación (`dig www.gmglobalconstrucciones.co`, o el checker de dominios de
   Vercel) y confirmar que el sitio Next.js responde correctamente en el dominio real.
4. Tiempo de propagación esperable: minutos hasta 48h según el TTL previo y el resolver DNS
   del visitante — por eso el paso 1 de bajar el TTL con antelación es importante.

### Paso 5 — Retirar GitHub Pages como servidor de este dominio
Una vez confirmado que el tráfico real llega a Vercel sin problemas (recomendado: esperar al
menos el tiempo del TTL anterior más un margen, p. ej. 24-48h de observación):
- Se puede eliminar el `CNAME` del repositorio estático o desactivar GitHub Pages para ese
  repo, ya que el dominio ya no apunta ahí.
- El sitio estático original queda como referencia histórica en el repositorio (rama/tag), no
  se borra el código.

---

## 3. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| El dominio queda inaccesible durante la propagación DNS | Bajar el TTL 24-48h antes del corte (Paso 4.1); hacer el corte en horario de bajo tráfico |
| El formulario de contacto deja de "funcionar" (aunque antes tampoco funcionaba de verdad, ver `docs/AUDITORIA-TECNICA.md` §6) | Validar `RESEND_API_KEY` / `RESEND_FROM` en Vercel **antes** del corte (Paso 2), no después |
| GitHub Pages descarta el dominio personalizado por ausencia del `CNAME` | No tocar/borrar el `CNAME` del repo hasta completar el Paso 5 |
| Certificado SSL del nuevo dominio no está listo en Vercel al momento del corte | Configurar el dominio en Vercel (Paso 3) con antelación — Vercel emite el certificado automáticamente al verificar el DNS, puede tardar minutos tras la propagación |
| Cambios DNS quedan en manos de alguien sin visibilidad de este repo | Este documento debe compartirse con quien administre el DNS real del dominio antes del Paso 4 |

---

## 4. Pendiente de decisión del cliente antes de ejecutar el Paso 4

- Confirmar quién tiene acceso al panel DNS de `gmglobalconstrucciones.co` (no visible desde
  este repositorio).
- Confirmar ventana de corte preferida (día/hora de menor tráfico).
- Confirmar que `RESEND_API_KEY` (o el proveedor de correo real que se decida) está
  configurado en Vercel antes del corte, para que los 3 formularios functen de verdad desde
  el primer minuto en producción.

**Ningún cambio de DNS se ejecuta como parte de esta fase.** Este documento es el plan a
aprobar antes de tocar producción.
