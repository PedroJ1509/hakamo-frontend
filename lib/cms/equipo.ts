import { metadataDesde, POPULATE_SECCION, resolverSeccion, type Seccion, type SeccionCms, type Seo } from './comun'
import { getPagina } from './strapi'

interface EquipoCms {
  seo: Seo
  portada: SeccionCms
  miembros: SeccionCms
  cierre: SeccionCms
}

export interface ContenidoEquipo {
  portada: Seccion
  /** Cada persona: etiqueta = iniciales, título = nombre, subtítulo = cargo, texto = bio, imagen = foto. */
  miembros: Seccion
  cierre: Seccion
}

const RESPALDO_SEO = {
  title: 'Nuestro Equipo — Hakamo Outsourcing',
  description: 'Conoce al equipo de profesionales detrás de Hakamo Outsourcing.',
}

const POPULATE = {
  seo: { populate: ['imagenCompartir'] },
  portada: POPULATE_SECCION,
  miembros: POPULATE_SECCION,
  cierre: POPULATE_SECCION,
}

const leerEquipo = () => getPagina<EquipoCms>('pagina-equipo', POPULATE)

export async function metadataEquipo() {
  const cms = await leerEquipo()
  return metadataDesde(cms?.seo, RESPALDO_SEO)
}

export async function contenidoEquipo(): Promise<ContenidoEquipo> {
  const cms = await leerEquipo()
  const portada = resolverSeccion(
    cms?.portada,
    {
      antetitulo: 'Las personas detrás',
      titulo: 'Nuestro Equipo',
      texto: 'Profesionales comprometidos con el crecimiento de tu empresa.',
    },
    'claro',
  )
  if (!portada.fondo.color && !portada.fondo.imagen) portada.fondo = { ...portada.fondo, color: '#1E3A5F' }

  return {
    portada,
    miembros: resolverSeccion(
      cms?.miembros,
      {
        texto: 'Datos del equipo próximamente — actualiza esta sección con información real',
        elementos: [
          { etiqueta: 'DG', titulo: 'Nombre del CEO', subtitulo: 'Director General', texto: 'Líder visionario con amplia experiencia en gestión empresarial.' },
          { etiqueta: 'RH', titulo: 'Gerente de RRHH', subtitulo: 'Recursos Humanos', texto: 'Especialista en reclutamiento y desarrollo del talento humano.' },
          { etiqueta: 'CO', titulo: 'Coordinador Operativo', subtitulo: 'Operaciones', texto: 'Responsable de la ejecución y coordinación de los procesos internos.' },
          { etiqueta: 'AT', titulo: 'Analista de Talento', subtitulo: 'Selección de Personal', texto: 'Experto en identificar y atraer los mejores perfiles del mercado.' },
        ],
      },
      'oscuro',
    ),
    cierre: resolverSeccion(
      cms?.cierre,
      {
        titulo: 'Únete a nuestro equipo',
        texto: '¿Tienes talento y quieres crecer? Revisa nuestras vacantes disponibles.',
        boton: { texto: 'Ver vacantes →', url: '/empleos' },
      },
      'oscuro',
    ),
  }
}
