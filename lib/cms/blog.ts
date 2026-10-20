import { metadataDesde, POPULATE_SECCION, resolverSeccion, type Boton, type Seccion, type SeccionCms, type Seo } from './comun'
import { getPagina, texto } from './strapi'

interface BlogCms {
  seo: Seo
  portada: SeccionCms
  sinArticulos: SeccionCms
  textoLeer: string
  cierre: SeccionCms
  textoVolver: string
  textoTodos: string
  botonArticulo: Boton | null
  tituloRelacionados: string
  recuadroArticulo: SeccionCms
}

export interface ContenidoBlog {
  portada: Seccion
  sinArticulos: Seccion
  textoLeer: string
  cierre: Seccion
  textoVolver: string
  textoTodos: string
  botonArticulo: Boton
  tituloRelacionados: string
  recuadroArticulo: Seccion
}

const RESPALDO_SEO = {
  title: 'Blog — Hakamo Outsourcing',
  description: 'Noticias, consejos y artículos sobre outsourcing de personal, talento humano y gestión empresarial.',
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_SECCION,
  sinArticulos: POPULATE_SECCION,
  cierre: POPULATE_SECCION,
  botonArticulo: true,
  recuadroArticulo: POPULATE_SECCION,
}

const leerBlog = () => getPagina<BlogCms>('pagina-blog', POPULATE)

export async function metadataBlog() {
  const cms = await leerBlog()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoBlog(): Promise<ContenidoBlog> {
  const cms = await leerBlog()
  const portada = resolverSeccion(
    cms?.portada,
    {
      antetitulo: 'Noticias y artículos',
      titulo: 'Blog',
      texto: 'Insights, consejos y novedades sobre recursos humanos y outsourcing de personal.',
    },
    'claro',
  )
  // La portada del blog es azul si el CMS no pone otro fondo.
  if (!portada.fondo.color && !portada.fondo.imagen) portada.fondo = { ...portada.fondo, color: '#1E3A5F' }

  return {
    portada,
    sinArticulos: resolverSeccion(
      cms?.sinArticulos,
      { titulo: 'No hay artículos publicados aún.', texto: 'Vuelve pronto para leer nuestro contenido.' },
      'oscuro',
    ),
    textoLeer: texto(cms?.textoLeer, 'Leer artículo →'),
    cierre: resolverSeccion(
      cms?.cierre,
      {
        titulo: '¿Tienes alguna duda?',
        texto: 'Nuestro equipo está disponible para responder todas tus preguntas.',
        boton: { texto: 'Contáctanos →', url: '/contacto' },
      },
      'oscuro',
    ),
    textoVolver: texto(cms?.textoVolver, '← Volver al blog'),
    textoTodos: texto(cms?.textoTodos, '← Todos los artículos'),
    botonArticulo:
      cms?.botonArticulo?.texto && cms.botonArticulo.url ? cms.botonArticulo : { texto: 'Contáctanos →', url: '/contacto' },
    tituloRelacionados: texto(cms?.tituloRelacionados, 'Artículos relacionados'),
    recuadroArticulo: resolverSeccion(
      cms?.recuadroArticulo,
      {
        titulo: '¿Necesitas personal?',
        texto: 'Hablemos sobre cómo Hakamo puede ayudar a tu empresa.',
        boton: { texto: 'Obtener Cotización', url: '/contacto' },
      },
      'claro',
    ),
  }
}
