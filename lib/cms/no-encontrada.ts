import { LANDING_HERO_BACKGROUNDS } from '@/lib/visual-kit/hakamo'
import { POPULATE_SECCION, resolverFondo, resolverSeccion, type Seccion, type SeccionCms } from './comun'
import { getPagina } from './strapi'

/**
 * Página 404. Antetítulo = número grande; cada elemento es una salida
 * (etiqueta, título, texto, subtítulo = texto del enlace, enlace);
 * botón = enlace de abajo; botón secundario = enlace de arriba.
 */
export async function contenidoNoEncontrada(): Promise<Seccion> {
  const cms = await getPagina<{ contenido: SeccionCms }>('pagina-no-encontrada', { contenido: POPULATE_SECCION })
  const seccion = resolverSeccion(
    cms?.contenido,
    {
      antetitulo: '404',
      titulo: 'Esta página no existe',
      texto: 'El enlace está roto o la ruta ya no está. Elige por dónde seguir.',
      elementos: [
        { etiqueta: 'Empresas', titulo: 'Busco personal', texto: 'Soluciones para tu obra o proyecto.', subtitulo: 'Entrar →', enlace: '/empresas' },
        { etiqueta: 'Empleos', titulo: 'Busco trabajo', texto: 'Vacantes y tu perfil en Hakamo.', subtitulo: 'Entrar →', enlace: '/empleos' },
      ],
      boton: { texto: 'O escríbenos', url: '/contacto' },
      botonSecundario: { texto: 'Inicio', url: '/' },
    },
    'claro',
  )
  // Sin imagen ni color en el CMS, la foto de siempre.
  const foto = LANDING_HERO_BACKGROUNDS.home
  seccion.fondo = resolverFondo(cms?.contenido?.fondo, {
    imagen: foto.src,
    posicion: foto.objectPosition,
    tono: 'claro',
  })
  return seccion
}
