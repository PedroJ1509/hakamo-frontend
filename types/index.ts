export interface Valor {
  titulo: string
  descripcion: string
}

export interface Division {
  id: number
  documentId: string
  nombre: string
  slug: string
  descripcion: string
  tagline?: string
  mision?: string
  vision?: string
  valores?: Valor[]
  colorPrimario: string
  colorSecundario: string
  activo: boolean
  imagenHero: StrapiMedia | null
  logo: StrapiMedia | null
  proyectos: Proyecto[]
  clientes: Cliente[]
  servicios: Servicio[]
  posts: Post[]
}

export interface Proyecto {
  id: number
  documentId: string
  titulo: string
  slug: string
  descripcion: string
  estado: 'en_proceso' | 'completado' | 'destacado'
  fecha: string
  imagenes: StrapiMedia[]
  division: Division
}

export interface Cliente {
  id: number
  documentId: string
  nombre: string
  testimonio: string
  sitioWeb: string
  logo: StrapiMedia | null
  division: Division
}

export interface Servicio {
  id: number
  documentId: string
  titulo: string
  descripcion: string
  icono: string
  orden: number
  activo: boolean
  division: Division
}

export interface Post {
  id: number
  documentId: string
  titulo: string
  slug: string
  resumen: string
  contenido: string
  fechaPublicacion: string
  activo: boolean
  imagenPortada: StrapiMedia | null
  division: Division
}

export interface HeroSlide {
  id: number
  documentId: string
  titulo: string
  subtitulo: string
  descripcion: string
  imagen: StrapiMedia | null
  ctaTexto: string
  ctaUrl: string
  orden: number
  activo: boolean
}

export interface Vacante {
  id: number
  documentId: string
  titulo: string
  slug: string
  descripcion: string
  requisitos: string
  ubicacion: string
  modalidad: 'presencial' | 'remoto' | 'hibrido'
  tipo: 'tiempo_completo' | 'medio_tiempo' | 'contrato'
  salario: string
  estado: 'activa' | 'cerrada'
  fechaPublicacion: string
  fechaCierre: string
  division: Division
}

export interface StrapiMedia {
  id: number
  url: string
  name: string
  width: number
  height: number
  formats: {
    thumbnail: { url: string }
    small: { url: string }
    medium: { url: string }
    large: { url: string }
  }
}

export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
