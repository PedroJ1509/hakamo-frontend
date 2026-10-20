import { ProjectsLanding } from '@/app/components/visual-kit/landing/projects-landing'
import { contenidoProyectos, metadataProyectos } from '@/lib/cms/proyectos'

export const generateMetadata = metadataProyectos

export default async function ProyectosPage() {
  return <ProjectsLanding contenido={await contenidoProyectos()} />
}
