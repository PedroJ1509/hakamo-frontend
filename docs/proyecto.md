# Documentación del frontend Hakamo

Sitio público de Hakamo Gestión Humana & Outsourcing. El producto tiene dos audiencias:

- **Empresas** que necesitan personal, nómina, cumplimiento o supervisión en obra.
- **Candidatos** que buscan empleo y dejan su perfil o su CV.

La puerta `/` obliga a elegir. No hay un home único que mezcle las dos experiencias.

## Stack

| Pieza | Versión / nota |
| --- | --- |
| Next.js | 16.2.2, App Router, Turbopack en desarrollo |
| React | 19.2.4 |
| TypeScript | 5, `strict` |
| Tailwind CSS | 4, vía `@tailwindcss/postcss` |
| Fuentes | Fraunces (display), Inter (UI), Space Grotesk, Geist |
| Motion | `framer-motion` en el formulario de solicitar; el resto es CSS |
| CMS | Strapi, opcional, por `NEXT_PUBLIC_STRAPI_URL` |
| PDF del CV | `jspdf` |
| 3D | `three`, `@react-three/fiber`, `drei`, `rapier`. Piezas sueltas en `app/components/ui`, no forman el flujo principal de las landings |

`next.config.ts` transpila `three` y `meshline`, marca `@react-three/rapier` como paquete externo de servidor y permite imágenes de `res.cloudinary.com`.

## Cómo correrlo

```bash
npm install
npm run dev
```

| Script | Efecto |
| --- | --- |
| `npm run dev` | [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve ese build |
| `npm run lint` | ESLint con `eslint-config-next` |

Node 20 o superior.

### Entorno

Archivo `.env.local` en la raíz. Las dos variables son públicas porque el navegador también llama a Strapi (formularios y CV).

| Variable | Efecto si falta |
| --- | --- |
| `NEXT_PUBLIC_STRAPI_URL` | Vacantes usan `lib/demo-vacantes.ts`. Blog queda vacío. El formulario de solicitar igual abre WhatsApp y el correo |
| `NEXT_PUBLIC_DIVISION_SLUG` | Se usa `hakamo-outsourcing`. Hoy solo filtra los posts relacionados del artículo de blog |

No hace falta CMS para ver empresas, nosotros, servicios, proyectos, contacto ni FAQ. Ese copy está en el repositorio.

## Arquitectura

```
app/
  layout.tsx                 html, fuentes, metadata global
  globals.css                tokens --paper, --ink, --night, --accent, --glow
  visual-kit.css             landings, reveal, visitas, proyectos, servicios
  (hub)/                     experiencia actual. Layout solo monta acciones flotantes
  (site)/                    blog y equipo, con cabecera y pie compartidos
  components/
    visual-kit/              landings, chrome, CV, reveal
    visual-kit/landing/      una landing por página
    ui/                      componentes anteriores (3D, parallax, formularios)
    layout/                  header y footer heredados
lib/
  data.ts                    copy institucional
  api.ts                     cliente de Strapi
  load-vacantes.ts           Strapi con caída a demo
  demo-vacantes.ts
  demo-proyectos.ts
  visual-kit/hakamo.ts       nav, heroes, textos de landing
  visual-kit/styles.ts       clases de botones
  cv/                        tipos, PDF y envío de candidatos
types/index.ts               formas de Strapi
public/                      estáticos
```

El alias `@/*` resuelve desde la raíz (`tsconfig.json`).

### Grupos de rutas

`(hub)` y `(site)` no aparecen en la URL. Solo agrupan layouts.

- **`(hub)`** no pone cabecera global. Cada landing monta su propio `LandingHeader`, grano, progreso de scroll y `PublicFooter`. El layout añade `FloatingActionsLazy` (volver arriba y WhatsApp).
- **`(site)`** envuelve con `PublicHeader` y `PublicFooter` leyendo `SITE_NAV` y `SITE_PUBLIC`.
- **`empleos` y `cv`** además usan `PostulateLayout`, la cromática del portal de talento.

Las páginas de `(hub)` son server components cortos: metadata y un componente cliente. La excepción son empleos y vacantes, que son async y llaman a `loadVacantes()`.

En Next.js 16, `params` y `searchParams` de las páginas llegan como `Promise` y se esperan con `await`.

## Rutas

### Puerta y empresas

| URL | Archivo | Componente | Qué muestra |
| --- | --- | --- | --- |
| `/` | `app/(hub)/page.tsx` | `GateLanding` | Elección Empresas / Busco empleo. Fondo, líneas animadas y prueba social |
| `/empresas` | `app/(hub)/empresas/page.tsx` | `HomeLanding` | Home B2B: stats, oferta y copy de `hakamo.ts` |
| `/nosotros` | `app/(hub)/nosotros/page.tsx` | `AboutLanding` | Trayectoria, misión y visión, valores, pilares, equipo, formación, actividades y clientes |
| `/servicios` | `app/(hub)/servicios/page.tsx` | `ServicesLanding` | Catálogo (`ServiceTimeline`), HSE, valor, proceso, sectores, marco legal y cierre |
| `/proyectos` | `app/(hub)/proyectos/page.tsx` | `ProjectsLanding` | Hero, franja de fotos, obra destacada, resto de obras, clip de campo y cierre |
| `/contacto` | `app/(hub)/contacto/page.tsx` | `ContactLanding` | Canales y panel de ruta (`#ruta`) |
| `/empresas/solicitar` | `app/(hub)/empresas/solicitar/page.tsx` | `VisitLanding` | Wizard: Personal, Reunión o Contactar |
| `/faq` | `app/(hub)/faq/page.tsx` | `FaqLanding` | `FAQ` de `lib/data.ts` |
| `/privacidad` | `app/(hub)/privacidad/page.tsx` | página propia | Texto legal |
| `/agendar-visita` | redirect permanente | — | `/empresas/solicitar` |
| `/como-llegar` | redirect permanente | — | `/contacto#ruta` |

Navegación de empresas, en `EMPRESAS_NAV` / `SITE_NAV`: Empresas, Nosotros, Servicios, Proyectos, Contacto, Solicitar. El acceso a empleos es el enlace secundario «Busco empleo».

### Empleos y CV

| URL | Comportamiento |
| --- | --- |
| `/empleos` | `CvLanding` con vacantes y divisiones de `loadVacantes()` |
| `/empleos/vacantes` | `VacantesListing`. Filtros `categoria` y `q` |
| `/empleos/vacantes/[id]` | `JobsDetail` |
| `/empleo` | `EmploymentLanding`, cultura del colaborador |
| `/empleos/[id]` | Redirect a `/empleos/vacantes/[id]` |
| `/cv` | Redirect a `/empleos` |
| `/cv/tu-cv` | Redirect a `/empleos#tu-cv` |
| `/cv/vacantes` | Redirect a `/empleos/vacantes`, conserva `categoria` |
| `/cv/vacantes/[id]` | Redirect a `/empleos/vacantes/[id]` |

Navegación de talento, `TALENTOS_NAV`: Empleos, Áreas, Vacantes, Postularte, Tu CV, Cultura.

### Blog y equipo

| URL | Notas |
| --- | --- |
| `/blog` | `getPosts()`. Si Strapi falla, la lista queda vacía |
| `/blog/[slug]` | `getPost(slug)` |
| `/equipo` | Datos locales de relleno. El comentario del archivo pide sustituirlos cuando exista fuente real. El equipo que se ve en `/nosotros` sale de `EQUIPO` en `lib/data.ts` y no es esta página |

## Datos

Hay tres capas. No mezclarlas al editar copy.

### 1. Copy institucional — `lib/data.ts`

Fuente de verdad de lo que se lee en empresas. Exporta, entre otros:

- `COMPANY_INFO`: nombre, tagline, correos, teléfonos, WhatsApp, Montecristi, Instagram y LinkedIn
- `STATS`, `QUIENES_SOMOS`, `HISTORIA`, `CLIENTES`
- `SERVICIOS` (seis: outsourcing, reclutamiento, payroll, cumplimiento, supervisión, HSE)
- `MARCO_LEGAL`, `COMPROMISO_HSE`, `COBERTURA`
- `PROCESO_EMPRESAS`, `PROCESO_CANDIDATOS`, `PLANES`
- `VALORES`, `PILARES`, `SECTORES`, `VALOR_HAKAMO`
- `MISION_VISION`, `FORMACION`, `FERIA_TRABAJO`, `ACTIVIDADES_COLABORADORES`, `EQUIPO`
- `FAQ`, `AREAS_EMPLEO`, `NIVELES_EXPERIENCIA`

### 2. Configuración visual — `lib/visual-kit/hakamo.ts`

Arma la navegación y los textos cortos de hero a partir de `lib/data.ts`. También define `LANDING_HERO_BACKGROUNDS`, las fotos de `public/visual-kit/`.

`SITE_PUBLIC` concentra teléfono, correo, CTA «Solicitar personal» (`/empresas/solicitar`) y el enlace «Busco empleo» (`/empleos`).

### 3. Demostración y CMS

- `lib/demo-proyectos.ts`: obras de `/proyectos` (`PROJECT_FEATURES`) y la galería o clips de campo (`PROJECT_FIELD_GALLERY`). Esta página no consulta Strapi.
- `lib/demo-vacantes.ts`: vacantes y divisiones de respaldo, más `withJobImages`.
- `lib/load-vacantes.ts`: pide `getVacantes()` y `getDivisiones()`. Si la petición falla, usa la demo. Si Strapi responde con menos de 6 vacantes, sustituye la lista entera por la demo. Si no hay divisiones, usa las divisiones de demo.
- `lib/api.ts`: fetches a Strapi. Colecciones usadas: `divisions`, `proyectos`, `clientes`, `servicios`, `posts`, `hero-slides`, `vacantes`, `candidatos`.

Los tipos de esas colecciones están en `types/index.ts`.

## Flujos

### Solicitar personal, reunión o mensaje

`VisitLanding` es un cliente con tres intenciones. Cada una arma sus pasos:

| Intención | Pasos |
| --- | --- |
| Personal | Datos, tipo de personal, detalle, confirmar |
| Reunión | Datos, modalidad y fecha, detalle, confirmar |
| Contactar | Datos, mensaje, confirmar |

Validación en el cliente: nombre, teléfono y correo obligatorios; correo con forma válida; tipo de personal u modalidad según el caso; la fecha de reunión no puede ser anterior a hoy; el detalle o el mensaje no pueden ir vacíos.

Al confirmar:

1. `POST` a `{STRAPI}/api/mensajes` con nombre, email, teléfono y el texto armado. El error de red no bloquea el envío.
2. Abre WhatsApp `wa.me/18296790671` con ese texto.
3. A los 400 ms abre `mailto:` hacia `COMPANY_INFO.email`.
4. Muestra la pantalla «Solicitud preparada» por si el navegador bloqueó alguna ventana.

`ContactForm` y `EmpleoForm`, en `app/components/ui`, son formularios anteriores que también postean a `/api/mensajes` y `/api/candidatos`. Las landings actuales no dependen de ellos.

### Vacantes

`loadVacantes()` corre en el servidor de `/empleos` y `/empleos/vacantes`. El listado filtra por categoría y texto. El detalle está en `jobs-detail.tsx` y vuelve a mirar `NEXT_PUBLIC_STRAPI_URL` para la ficha.

### CV

Dos caminos en el portal de empleos:

- **Constructor.** `lib/cv/types.ts` describe el formulario. `generateCvPdf` produce el PDF con jsPDF. `submitCvBuilder` lo manda como `multipart` a `/api/candidatos` (campo `files.cv`). Si Strapi no está o el esquema no coincide, el fallo se traga y se deja un `console.log`.
- **Carga de archivo.** `submitCvUpload` en el mismo módulo.

`downloadBlob` y `cvFilename` permiten bajar el PDF en el navegador.

## Sistema visual

Tokens en `:root` de `app/globals.css`, expuestos a Tailwind como colores:

| Token | Uso | Valor base |
| --- | --- | --- |
| `--paper` | Fondos claros | `#F8FAFC` |
| `--ink` | Texto | `#0F172A` |
| `--muted` | Texto secundario | `#64748B` |
| `--night` | Fondos oscuros de hero y bloques | `#1E3A5F` |
| `--accent` | Acentos en claro | `#2563EB` |
| `--glow` | Acentos sobre noche | `#93C5FD` |

Hay un bloque `.dark` con los mismos roles, más fríos. El `html` lleva `lang="es"` y `suppressHydrationWarning`.

Tipografía:

- Títulos de landing: Fraunces, clase `font-display`, a menudo itálica.
- UI: Inter.
- Algunos bloques de empleos: Space Grotesk.

`app/visual-kit.css` concentra lo que Tailwind no expresa bien: heroes, grano, botones magnéticos, timeline de servicios, formulario de visita y animaciones. `lib/visual-kit/styles.ts` exporta combinaciones de botón (`btnGlow`, `btnGhostOnNight`).

Fotos de hero en `public/visual-kit/heroes/`. Logos en `public/logo-azul.png` y `public/hakamo-logo-blanco.png`. Logos de clientes en `public/clientes/`.

## Animaciones

Todas respetan `prefers-reduced-motion: reduce`.

### Compartidas

`Reveal` (`app/components/visual-kit/reveal.tsx`) observa el bloque y le añade `is-visible`. Las clases `.reveal-up`, `.reveal-left` y `.reveal-right` desplazan unos 22 px y suben la opacidad en 560 ms. En viewports menores a 768 px, izquierda y derecha también entran desde abajo para no recortar contenido.

`.visit-rise` hace la entrada del hero (opacidad y 22 px) con `animation-delay` en línea. Se usa en Solicitar, Proyectos, Servicios y Nosotros. El relleno es `backwards`, así el hover puede volver a usar `transform` cuando la animación termina.

### Por página

| Página | Qué se mueve |
| --- | --- |
| `/` | `.gate-in` en la cabecera y `.gate-lines` en el fondo |
| `/empresas/solicitar` | Hero y tarjetas con `visit-rise`. Al elegir intención, `.visit-panel`. Cada paso entra y sale con `framer-motion` (`AnimatePresence`). Campos, opciones y filas del resumen usan `.visit-stagger`. El error de validación usa `.visit-error` (sacudida corta). La barra de progreso interpola el ancho en 500 ms |
| `/proyectos` | Hero con `visit-rise`. Franja `.projects-strip-in`. Foto destacada `.projects-hero-in` (de escala 1.08 a 1). Hover de fotos a escala 1.06. El icono de play pulsa con `.projects-play-pulse`. Obra, filas, clip y cierre usan `Reveal` |
| `/servicios` | Hero con `visit-rise`. Catálogo, seguridad, valor, proceso, sectores, marco legal y cierre usan `Reveal`. Al abrir «Ver detalle», `.service-detail-in` |
| `/nosotros` | Hero con `visit-rise`. Trayectoria, misión y visión, valores, pilares, equipo, formación, actividades y clientes usan `Reveal`, con retardo por índice |

El catálogo de servicios ya revelaba cada fila antes de esta pasada. Solicitar, Proyectos, Servicios y Nosotros quedaron alineados al mismo ritmo.

## Componentes que conviene conocer

| Componente | Rol |
| --- | --- |
| `LandingHeader` / `chrome-header` | Barra de las landings, con menú en móvil |
| `LandingHeroSection` | Foto a sangre, velo y viñeta. El children es el texto |
| `CinematicTitle` | Título en dos líneas. La segunda usa color `glow` |
| `MagneticButton` | CTA con seguimiento leve del cursor |
| `PublicFooter` | Pie de las landings: datos de `SITE_PUBLIC` y `SITE_NAV` |
| `Grain` | Ruido fijo sobre la página |
| `ScrollProgress` | Barra de lectura |
| `ServiceTimeline` | Lista de `SERVICIOS` con detalle expandible |
| `Logo` | Marca, invierte a blanco con `inverted` |
| `FloatingActionsLazy` | WhatsApp y volver arriba, cargados en diferido |

`app/components/ui` guarda experimentos y piezas viejas (parallax, masonry, lanyard, splash cursor, formularios). No hace falta tocarlas para cambiar una landing.

## Strapi: contratos que el front ya llama

Base: `NEXT_PUBLIC_STRAPI_URL`.

| Método | Ruta | Quién la usa |
| --- | --- | --- |
| GET | `/api/vacantes` | Listado de empleos |
| GET | `/api/vacantes?filters[slug][$eq]=` | Detalle |
| GET | `/api/divisions` | Filtros de categoría |
| GET | `/api/posts` y filtro por `slug` | Blog |
| POST | `/api/mensajes` | Solicitar y `ContactForm`. Body `{ data: { nombre, email, telefono, mensaje } }` |
| POST | `/api/candidatos` | CV y `EmpleoForm`. JSON o `FormData` con `files.cv` |

También hay helpers en `lib/api.ts` para proyectos, clientes, servicios y hero slides por división. Las landings de empresas no los consumen hoy: ese contenido es local.

Si el `POST` falla, solicitar igual abre WhatsApp y correo. El CV registra el intento en consola y no muestra un error bloqueante.

## Assets

| Carpeta | Contenido |
| --- | --- |
| `public/visual-kit/heroes/` | Fondos de home, nosotros, servicios, contacto, empleos, cultura y detalle de vacante |
| `public/visual-kit/contact/` | Reunión, lobby, espacio de trabajo |
| `public/visual-kit/obra.jpg` | Obra, también hero de proyectos |
| `public/clientes/` | Energía 2000, Lindsayca, Grupo Ramos, TSK |
| `public/logo-azul.png`, `hakamo-logo-blanco.png` | Marca |
| `public/lanyard/` | Texturas del componente 3D de cordón |

## Convenciones al cambiar el sitio

- Un texto institucional se edita en `lib/data.ts`. Si es un rótulo de navegación o de hero, también mira `lib/visual-kit/hakamo.ts`.
- Una página nueva de empresas sigue el patrón: `app/(hub)/ruta/page.tsx` con metadata y una landing en `app/components/visual-kit/landing/`.
- La landing lleva `"use client"` si tiene estado. La página que la importa puede seguir siendo de servidor para el `metadata`.
- Las entradas al hacer scroll usan `Reveal`. Las del primer pantallazo usan `visit-rise` con retardos de unos 90 ms.
- No envolver un `<li>` dentro de `Reveal`: el componente renderiza un `div`. El `Reveal` va dentro del `<li>`, o el `div` sustituye al artículo cuando no hay lista.
- Clases `first:` y `nth-child` que ajustan padding tienen que vivir en el hijo directo de la grilla. Si ese hijo pasa a ser `Reveal`, la clase se mueve al `className` de `Reveal`.
- Mantener el atajo «Saltar al contenido» y los `scroll-margin` que ya usan `var(--header-h)`.

## Estado conocido

- `/equipo` no está alimentado por `lib/data.ts`. Sigue con nombres genéricos.
- `/blog` depende por completo de Strapi.
- `/proyectos` es estático (`demo-proyectos.ts`), aunque `lib/api.ts` ya sepa pedir `/api/proyectos`.
- Las vacantes reales solo aparecen si Strapi responde con al menos seis. Con menos, se sustituye la lista por la demo.
- `app/components/ui` y páginas como el blog conviven con el visual kit. El sitio que se navega desde `/` es el kit.
