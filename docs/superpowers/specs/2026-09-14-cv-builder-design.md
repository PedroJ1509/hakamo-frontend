# CV Builder — Design Spec

**Date:** 2026-09-14  
**Status:** Approved

## Goal

Replace the `/cv` placeholder with a guided CV builder and an upload path. Candidates send to Hakamo first, then can download the PDF. Navbar CTA: **Postúlate aquí** → `/cv`.

## Flows

### A — Crear mi CV
1. Datos personales (nombre, apellido, teléfono, email, área de interés, cargo objetivo)
2. Experiencia laboral (1+ entradas: empresa, cargo, periodo, descripción)
3. Estudios (1+ entradas: institución, título, periodo)
4. Habilidades (texto libre / lista)
5. Revisión → **Descargar PDF** y/ o **Enviar a Hakamo** (acciones independientes)

### B — Ya tengo un CV
1. Datos de contacto + área
2. Subir archivo (PDF o Word, máx. ~5 MB)
3. **Enviar a Hakamo** (archivo + datos)

## Outcomes
- PDF: plantilla simple profesional, generado en el navegador
- Envío: POST a candidatos (mismo patrón que `/empleo`); si Strapi falla, UX de éxito local como EmpleoForm
- Sin login; una plantilla v1

## UI
- Tema paper claro existente en `cv-landing`
- Wizard en `#formulario`; tarjetas de opción activan el modo
- Estilos: `fieldClass` / `btnPrimary` / `btnSecondary` del visual kit
