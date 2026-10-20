# Hakamo — frontend

Sitio público de [Hakamo](https://hakamo.com.do), outsourcing de gestión humana para construcción e industria en República Dominicana. El visitante elige una de dos experiencias: **empresas** (contratar personal) o **empleos** (buscar trabajo).

Next.js 16 (App Router), React 19 y Tailwind CSS 4. Todo el contenido (textos, imágenes, fondos, menús, contacto) se edita en Strapi. El texto original de cada página queda en el repositorio como respaldo: si el CMS no responde, el sitio se ve igual que antes.

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

Crea `.env.local` en la raíz. Sin estas variables el sitio funciona con el texto de respaldo.

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_STRAPI_URL` | URL del CMS, sin barra final. Ejemplo: `https://cms.ejemplo.com` |
| `REVALIDAR_SECRETO` | Clave que Strapi manda al avisar de un cambio (`POST /api/revalidar`). La misma que `SITIO_REVALIDAR_SECRETO` en el CMS. Sin ella, los cambios se ven como mucho un minuto después. |

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
| `/empleos/vacantes` | Listado con búsqueda, área, ciudad, contrato y modalidad. Paginación de 10, 20, 30 o todas. `?categoria=` y `?q=` |
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

En el panel de Strapi. Cada página es un tipo único «Página · …» y lo que se repite en todas está en «Configuración del sitio».

| Qué cambiar | En Strapi |
| --- | --- |
| Logo, teléfonos, correos, dirección, punto del mapa, redes, menús, pie, botón de WhatsApp | Configuración del sitio |
| Textos, imágenes y fondos de una página | Página · (nombre de la página) |
| Servicios del catálogo | Servicio |
| Obras de Proyectos | Proyecto |
| Clientes | Cliente |
| Vacantes y áreas del portal | Vacante y División |
| Artículos del blog | Post |
| Mensajes y postulaciones recibidos | Mensaje y Postulacion |

Cómo leer los campos:

- Cada bloque de página tiene **mostrar** (ocultar la sección), textos, una lista de elementos, botones y **fondo**.
- **Fondo**: imagen o video, color, color y opacidad de la capa, y **tono del texto** (claro sobre fondos oscuros, oscuro sobre fondos claros). Un color sin imagen deja la sección en color plano.
- Un salto de línea en el título de una portada lo parte en dos líneas.
- En enlaces se puede escribir `whatsapp`, `telefono` o `correo`; en textos, `{correo}`, `{correoReclutamiento}`, `{telefono}` y `{direccion}`. Se cambian por los datos de Configuración del sitio.
- Un texto o botón vacío no se muestra. El texto de respaldo solo aparece si la página no llega del CMS.

Un cambio publicado tarda hasta un minuto en verse: el sitio guarda cada página 60 segundos (`lib/cms/strapi.ts`).

| En el código | Archivo |
| --- | --- |
| Lectura del CMS y respaldo de cada página | `lib/cms/` |
| Datos originales usados como respaldo | `lib/data.ts`, `lib/visual-kit/hakamo.ts`, `lib/demo-*.ts` |
| Vacantes de demostración (solo en desarrollo y si Strapi no tiene ninguna; en producción nunca) | `lib/demo-vacantes.ts`, `lib/load-vacantes.ts` |
| Envío de postulaciones y CV (`POST /api/postulaciones/enviar`) | `lib/cv/enviar-postulacion.ts` |

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

## Diseño adaptable

Las landings públicas se leen de 320 px en adelante sin scroll horizontal. En teléfono el contenido se apila y la navegación pasa a un menú.

| Barra | Teléfono | Desde |
| --- | --- | --- |
| Empresas (`LandingHeader`) | Logo y menú | 1024 px: enlaces en la barra |
| Empleos (`PostulateHeader`) | Logo y menú | 768 px: enlaces y «Empresas». «Talentos» solo desde 1280 px |

Una ruta inexistente muestra `app/not-found.tsx`: foto a sangre, el bloque centrado y dos salidas (empresas y empleos).

## Animaciones

Las páginas de empresas comparten el mismo lenguaje:

- El hero entra en secuencia con la clase `visit-rise`.
- Las secciones de más abajo aparecen al hacer scroll con el componente `Reveal`.
- Proyectos añade zoom en la foto principal, la franja de imágenes y el botón de reproducción.
- Solicitar anima el cambio de paso del formulario.
- Servicios anima la apertura del detalle de cada servicio.

Quien tenga `prefers-reduced-motion: reduce` ve el contenido sin esas animaciones.
