import { ProjectsHistory } from '@/app/components/visual-kit/landing/projects-history'
import { contenidoHistorial, metadataHistorial } from '@/lib/cms/proyectos'

export const generateMetadata = metadataHistorial

export default async function HistorialProyectosPage({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>
}) {
  const [{ sector }, contenido] = await Promise.all([searchParams, contenidoHistorial()])
  return <ProjectsHistory contenido={contenido} sectorInicial={sector ?? null} />
}
