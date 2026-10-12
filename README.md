# Hakamo — frontend

Sitio público de [Hakamo](https://hakamo.com.do), outsourcing de gestión humana para construcción e industria en República Dominicana. El visitante elige una de dos experiencias: **empresas** (contratar personal) o **empleos** (buscar trabajo).

Next.js 16 (App Router), React 19 y Tailwind CSS 4. El contenido institucional vive en el repositorio. Vacantes, blog y formularios pueden salir de Strapi; si el CMS no responde, las vacantes usan datos de demostración.

La referencia completa de arquitectura, datos y animaciones está en [docs/proyecto.md](docs/proyecto.md).

## Requisitos

- Node.js 20 o superior
- npm

## Arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |

## Variables de entorno

Crea `.env.local` en la raíz. Sin estas variables el sitio institucional sigue funcionando; vacantes y blog caen a su respaldo.

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_STRAPI_URL` | URL del CMS, sin barra final. Ejemplo: `https://cms.ejemplo.com` |
| `NEXT_PUBLIC_DIVISION_SLUG` | División de Strapi. Por defecto `hakamo-outsourcing`. Filtra los posts relacionados en `/blog/[slug]` |

Imágenes remotas permitidas en `next.config.ts`: `res.cloudinary.com`.

## Mapa del sitio

La puerta de entrada es `/`. Desde ahí se entra a empresas o a empleos.

### Empresas

| Ruta | Página |
| --- | --- |
| `/` | Puerta: Empresas o Busco empleo |
| `/empresas` | Inicio para empresas |
| `/nosotros` | Historia, misión, valores, equipo y clientes |
| `/servicios` | Catálogo, proceso, sectores y marco legal |
| `/proyectos` | Obras y material de campo |
| `/contacto` | Canales y ruta |
| `/empresas/solicitar` | Formulario por pasos: personal, reunión o mensaje |
| `/faq` | Preguntas frecuentes |
| `/privacidad` | Aviso de privacidad |
| `/agendar-visita` | Redirige a `/empresas/solicitar` |
| `/como-llegar` | Redirige a `/contacto#ruta` |

### Empleos

| Ruta | Página |
| --- | --- |
| `/empleos` | Vacantes y constructor o carga de CV |
| `/empleos/vacantes` | Listado filtrable (`?categoria=` y `?q=`) |
| `/empleos/vacantes/[id]` | Detalle de una vacante |
| `/empleo` | Cultura y cómo es trabajar en Hakamo |
| `/empleos/[id]` | Redirige al detalle en `/empleos/vacantes/[id]` |
| `/cv`, `/cv/tu-cv`, `/cv/vacantes` | Redirigen a las rutas actuales de empleos |

### Sitio con cabecera compartida

Estas rutas usan el layout de `app/(site)` (cabecera y pie propios), no el de las landings.

| Ruta | Página |
| --- | --- |
| `/blog` | Listado de posts de Strapi |
| `/blog/[slug]` | Artículo |
| `/equipo` | Equipo. Hoy es contenido de relleno, pendiente de datos reales |

## Dónde se edita el contenido

| Qué cambiar | Archivo |
| --- | --- |
| Textos institucionales, servicios, FAQ, equipo, clientes | `lib/data.ts` |
| Navegación, textos de hero y fondos | `lib/visual-kit/hakamo.ts` |
| Obras de la página Proyectos | `lib/demo-proyectos.ts` |
| Vacantes de respaldo | `lib/demo-vacantes.ts` |
| Llamadas a Strapi | `lib/api.ts` |

Cada página de `app/(hub)` es delgada: exporta metadata y renderiza una landing en `app/components/visual-kit/landing/`.

## Estructura

```
app/
  (hub)/          landings públicas y empleos
  (site)/         blog y equipo
  components/     visual-kit (sitio actual) y ui (piezas anteriores)
  globals.css     tokens de color y fuentes
  visual-kit.css  estilos de landings y animaciones
lib/              datos, API, CV y configuración visual
public/           logos, heroes y fotos de obras
types/            tipos de Strapi
```

El alias `@/` apunta a la raíz del proyecto.

## Animaciones

Las páginas de empresas comparten el mismo lenguaje:

- El hero entra en secuencia con la clase `visit-rise`.
- Las secciones de más abajo aparecen al hacer scroll con el componente `Reveal`.
- Proyectos añade zoom en la foto principal, la franja de imágenes y el botón de reproducción.
- Solicitar anima el cambio de paso del formulario.
- Servicios anima la apertura del detalle de cada servicio.

Quien tenga `prefers-reduced-motion: reduce` ve el contenido sin esas animaciones.
