import type { Metadata } from 'next'
import { ProjectsLanding } from '@/app/components/visual-kit/landing/projects-landing'

export const metadata: Metadata = {
  title: 'Proyectos — Hakamo',
  description:
    'Obras, energía e infraestructura donde Hakamo sostiene el talento en campo. Portafolio y galería de operaciones en República Dominicana.',
}

export default function ProyectosPage() {
  return <ProjectsLanding />
}
